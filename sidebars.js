// sidebars.js

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus finds a sidebar with the 'tutorialSidebar' ID
  tutorialSidebar: [
    'intro', // This is your docs/intro.md file

    // This creates the "Host Setup" category
    {
      type: 'category',
      label: 'Host Setup',
      link: {
        type: 'doc',
        id: 'host-setup/installation', // Links to the main page for this category
      },
      items: [
        // You can add more pages here later, like:
        // 'host-setup/troubleshooting',
      ],
    },

    // This creates the "Server Setup" category
    {
      type: 'category',
      label: 'Server Setup',
      link: {
        type: 'doc',
        id: 'server-setup/setup', // Links to the main page for this category
      },
      items: [
        // 'server-setup/configuration',
      ],
    },
  ],
};

module.exports = sidebars;
