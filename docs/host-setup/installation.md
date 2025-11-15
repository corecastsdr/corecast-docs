# Core Cast Host Setup

The Core Cast host software is the application that runs on your remote SDR (e.g., a Raspberry Pi). Its job is to connect to your local `soapyremote-server` and create a secure SOCKS proxy tunnel to the main Core Cast server, allowing it to access your SDR.

There are two methods to run the host software:

1.  **Recommended: `systemd` Service:** (This guide) You build and install a `.deb` package that runs the host software as a reliable, auto-restarting background service.
2.  **Manual: CLI:** You run the script directly from your terminal, which is useful for development and testing.

---

## Method 1: Recommended Setup (systemd Service)

This method bundles all scripts into a single Debian package that you can install, manage, and remove cleanly.

### Prerequisites

Before you begin, you must have the following tools installed on your host machine:

* `git`
* `dpkg-deb` (part of the `dpkg` package)
* `sshpass`

You must also have `soapyremote-server` installed and running, as this script depends on it.

### Step 1: Clone the Repository

First, clone the Core Cast repository onto your host machine (the one with the SDR) and navigate into the `host` directory.

```bash
# Clone the main repository
git clone https://github.com/corecastsdr/corecast-host.git

# Navigate into the host build directory
cd corecast/host
````

### Step 2: Build the `.deb` Package

Run the included build script to create the package.

```bash
# Make the build script executable
chmod +x build.sh

# Run the script
./build.sh
```

If successful, this will create a new file named `corecast-host-1.0.0.deb` (or similar) in your current directory.

### Step 3: Install the Package

Install the package using `dpkg`. This will copy all the files to their correct locations, as defined in `build.sh`.

```bash
# Install the package
sudo dpkg -i corecast-host-1.0.0.deb
```

The installation script (`postinst`) will automatically create the `corecast` user, set permissions, and enable the `systemd` service.

### Step 4: Configure the Service

The service is now installed, but it won't start until you provide the configuration. The service is hardcoded to look for a file at `/etc/corecast/.env`.

1.  Create the directory:

    ```bash
    sudo mkdir -p /etc/corecast
    ```

2.  Create and edit the `.env` file:

    ```bash
    sudo nano /etc/corecast/.env
    ```

3.  Paste the following content into the file, using the example file as a guide. **You must change these values.**

    ```ini
    # /etc/corecast/.env

    # --- Server Connection ---
    # IP address of your main Core Cast server
    CORECAST_SERVER_IP=10.0.0.8

    # Port for the SSH server (from server's docker-compose.yml)
    CORECAST_SERVER_PORT=2222

    # SSH user (from server's .env file)
    CORECAST_SSH_USER=sdr_host

    # --- Local Soapy Server ---
    # The port your local soapyremote-server is running on
    SOAPY_SERVER_PORT=55132

    # --- Security ---
    # The password for the sdr_host (from server's .env file)
    CORECAST_SERVER_PASS=Your-Super-Secret-Password-From-Server
    ```

4.  Set secure permissions for this file:

    ```bash
    # Set the 'corecast' user as the owner
    sudo chown corecast:corecast /etc/corecast/.env

    # Make it readable only by the owner (the service)
    sudo chmod 600 /etc/corecast/.env
    ```

### Step 5: Start the Service

The package is installed and configured. Now, just start the service.

```bash
# Reload the systemd daemon (if you just installed)
sudo systemctl daemon-reload

# Enable the service to start on boot
sudo systemctl enable corecast-host.service

# Start the service now
sudo systemctl start corecast-host.service
```

You can check its status at any time:

```bash
sudo systemctl status corecast-host.service
```

-----

## Method 2: Manual (CLI) Setup

This method is ideal for development, testing, or for systems that don't use `.deb` packages. It runs the exact same script, but directly in your terminal.

### Step 1: Clone the Repository

Follow Step 1 from the method above to clone the repo and `cd` into the `host` directory.

### Step 2: Configure

The `start_corecast_host.sh` script is designed to auto-load a `.env` file from its own directory if it's not already running as a service.

1.  Find the example `.env` file in the repository (e.g., `corecast-host.env.example`).
2.  Copy it to the `host` directory and name it `.env`:
    ```bash
    # Assuming you are in the corecast/host directory
    cp corecast-host.env.example .env
    ```
3.  Edit the `.env` file with your credentials:
    ```bash
    nano .env
    ```
    Fill in the same variables as in Step 4 of the recommended method.

### Step 3: Run the Script

Make the script executable and run it.

```bash
# Make the script executable
chmod +x start_corecast_host.sh

# Run it!
./start_corecast_host.sh
```

The script will find the `.env` file, load the variables, check for the `soapy_server`, and then launch the SSH tunnel.

:::tip[Alternative Run Command]
You can also manually source the variables before running, which is useful for debugging. This is the command you provided:

```bash
source .env && ./start_corecast_host.sh
```

:::

