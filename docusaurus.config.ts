// docusaurus.config.js

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Core Cast Documentation",
  tagline: "Scalable, Multi-User Remote SDR Documentation",
  favicon: "/favicon.svg",

  // Set the production URL of your site here
  url: "https://docs.corecastsdr.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: "/",

  scripts: [
    {
      src: "https://plausible.io/js/script.js",
      defer: true,
      "data-domain": "docs.corecastsdr.com",
    },
  ],

  // Your GitHub org/user name and repo name
  organizationName: "corecastsdr",
  projectName: "corecast-docs",

  // This is the main plugin bundle
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          // This tells Docusaurus to use your sidebar file
          sidebarPath: "./sidebars.js",
        },
        blog: false, // Disables the blog plugin
        theme: {
          // This points to your blue theme file
          customCss: "./src/css/custom.css",
        },
      },
    ],
  ],

  // This is the correct, top-level key for the markdown settings
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  // This adds your Apple Touch Icon link to the <head>
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png", // Assumes static/apple-touch-icon.png exists
      },
    },
  ],

  // This is where all your theme customizations go
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      // 1. Sets Dark Mode as the default
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },

      // 2. Sets your custom logos for light/dark mode
      navbar: {
        title: "Core Cast Docs",
        logo: {
          alt: "Core Cast Logo",
          src: "img/corecast-b.svg",
          srcDark: "img/corecast-w.svg",
        },

        // === THIS IS THE UPDATED SECTION ===
        items: [
          // Link to your main docs page
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Docs",
          },
          // New link: "Host Setup"
          {
            type: "doc", // Use 'doc' for a specific page
            docId: "host-setup/installation", // <--- UPDATE THIS PATH
            position: "left",
            label: "Host Setup",
          },
          // New link: "Server Setup"
          {
            type: "doc",
            docId: "server-setup/setup", // <--- UPDATE THIS PATH
            position: "left",
            label: "Server Setup",
          },

          // New link: GitHub Icon on the right
          {
            href: "https://github.com/corecastsdr",
            position: "right",
            className: "header-github-link", // <-- This is the important part
            "aria-label": "GitHub repository",
          },
        ],
        // ===================================
      },

      // 3. Your footer configuration
      footer: {
        copyright: "Copyright (c) 2025-Present Core Cast.",
      },
    },
};

module.exports = config;
