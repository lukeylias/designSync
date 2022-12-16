figma.showUI(__html__);

figma.ui.resize(300, 280);

interface Page {
  pageName: string;
  componentKey: string | null;
}

interface Theme {
  name: string;
  componentKey: string | null;
}

const PAGES: Page[] = [
  {
    pageName: "☀︎ Sandbox",
    componentKey: null,
  },
  {
    pageName: "Cover",
    componentKey: null,
  },
];

const THEMES: Theme[] = [
  {
    name: "Theme",
    componentKey: "7490b9dd58f1e467c94154bd8ee56aa40add6363",
  },
];

// Declare a new variable to store the filename value
let filename: string | undefined;

// Declare a new variable to store the number value
let number: string | undefined;

figma.ui.onmessage = (pluginMessage) => {
  const run = async () => {
    const currentPage = figma.currentPage;
    currentPage.name = PAGES[0].pageName;

    // Get the theme from the message
    const theme = pluginMessage.theme;

    // Get the filename from the message
    filename = pluginMessage.filename;

    // Get the filename from the message
    number = pluginMessage.number;

    // Set the component key for the Cover page to the single theme
    PAGES[1].componentKey = THEMES[0].componentKey;

    // figma.setFileThumbnailNodeAsync(theme);
    for (const pageData of PAGES.slice(1)) {
      const newPage = figma.createPage();
      newPage.name = pageData.pageName;
      if (pageData.componentKey) {
        if (typeof pageData.componentKey === "string") {
          // Only call the importComponentByKeyAsync function if componentKey is a string
          const template = await figma.importComponentByKeyAsync(
            pageData.componentKey
          );
          const templateInstance = template.createInstance();

          // Add the template to the page
          newPage.insertChild(0, templateInstance);

          // Detach instance
          templateInstance.detachInstance();

          // Zoom to fit in view
          figma.viewport.scrollAndZoomIntoView([templateInstance]);

          // Re-get the templateInstance
          const frameRef = newPage.children[0];

          // Insert the theme component into the page
          const matchingTheme = THEMES[0];
          // Define and assign the matchingTheme variable here
          if (typeof matchingTheme.componentKey === "string") {
            // Only call the importComponentByKeyAsync function if componentKey is a string
            const themeInstance = await figma.importComponentByKeyAsync(
              matchingTheme.componentKey
            );

            newPage.appendChild(themeInstance);

            // Set the file thumbnail
            figma.setFileThumbnailNodeAsync(themeInstance);

            // Remove the tmp frameRef
            frameRef.remove();
          }
        }
      }
    }
  };

  // Notify the user
  figma.notify("🎉 Pages created");

  // Run the function
  run();

  // Find the page called "Cover"
  const coverPage = figma.root.findOne(
    (node) => node.name === "Cover" && node.type === "PAGE"
  ) as FrameNode;
  if (coverPage) {
    console.log(coverPage.name);
    console.log(filename);
    console.log(number);
  }
};
