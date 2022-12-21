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

  const run = async () => {
    const currentPage = figma.currentPage;
    currentPage.name = PAGES[0].pageName;

    for (const pageData of PAGES.slice(1)) {
      const newPage = figma.createPage();
      newPage.name = pageData.pageName;
      if (pageData.pageName === "Cover") {
        // Load the font
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });

        const textNode = figma.createText();

        // Set the text of the text node
        textNode.characters = filename;

        // Set the font and styles of the text node
        textNode.fontName = { family: "Inter", style: "Regular" };
        textNode.fontSize = 80;

        // Position the text node
        textNode.x = 100;
        textNode.y = 386;

        // Create a frame around the text node
        const frame = figma.createFrame();
        frame.resize(1600, 1015);

        // Add the text node to the frame
        frame.appendChild(textNode);

        // Add the frame to the page
        newPage.insertChild(0, frame);

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
