figma.showUI(__html__);

figma.ui.resize(300, 280);

interface Page {
  pageName: string;
  componentKey: string | null;
}

const PAGES: Page[] = [
  {
    pageName: "Page 1",
    componentKey: null,
  },
  {
    pageName: "Page 2",
    componentKey: "7490b9dd58f1e467c94154bd8ee56aa40add6363",
  },
  {
    pageName: "Cover",
    componentKey: null,
  },
];

figma.ui.onmessage = (pluginMessage) => {
  const filename = pluginMessage.filename;
  const number = pluginMessage.number;
  const theme = pluginMessage.theme;

  const run = async () => {
    const currentPage = figma.currentPage;
    currentPage.name = PAGES[0].pageName;

    for (const pageData of PAGES.slice(1)) {
      const newPage = figma.createPage();
      newPage.name = pageData.pageName;
      if (pageData.pageName === "Cover") {
        // Load the font
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });

        // Create a new text node for the theme
        const themeTextNode = figma.createText();
        themeTextNode.characters = theme;
        themeTextNode.fontName = { family: "Inter", style: "Regular" };
        themeTextNode.fontSize = 32;
        themeTextNode.x = 100;
        themeTextNode.y = 120;

        currentPage.appendChild(themeTextNode);

        const numberTextNode = figma.createText();
        if (number !== null) {
          numberTextNode.characters = number;
          numberTextNode.fontName = { family: "Inter", style: "Regular" };
          numberTextNode.fontSize = 80;
          numberTextNode.x = 100;
          numberTextNode.y = 382;

          currentPage.appendChild(numberTextNode);
        }

        const filenameTextNode = figma.createText();
        filenameTextNode.characters = filename;
        filenameTextNode.fontName = { family: "Inter", style: "Regular" };
        filenameTextNode.fontSize = 128;
        filenameTextNode.resize(1400, filenameTextNode.height);
        filenameTextNode.x = 100;
        filenameTextNode.y = 479;

        currentPage.appendChild(filenameTextNode);

        // Create a frame around the text nodes
        const frame = figma.createFrame();
        frame.resize(1600, 1015);

        // Add the text nodes to the frame
        frame.appendChild(themeTextNode);
        if (number !== null) {
          frame.appendChild(numberTextNode);
        }
        frame.appendChild(filenameTextNode);

        // Set the frame as the thumbnail for the page
        figma.setFileThumbnailNodeAsync(frame);

        // Add the frame to the page
        newPage.insertChild(0, frame);
      } else if (pageData.componentKey) {
        if (typeof pageData.componentKey === "string") {
          // Only call the importComponentByKeyAsync function if componentKey is a string

          const template = await figma.importComponentByKeyAsync(
            pageData.componentKey
          );

          const templateInstance = template.createInstance();

          // Add the template instance to the page
          newPage.insertChild(0, templateInstance);
        }
      }
    }
  };

  // Notify the user
  figma.notify("🎉 Pages created");

  // Run the function
  run();
};
