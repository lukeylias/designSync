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
    console.log(theme);

    // Get the filename from the message
    filename = pluginMessage.filename;
    console.log(filename);

    // Get the filename from the message
    number = pluginMessage.number;
    console.log(number);

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

          // Create a new frame

          const frame = figma.createFrame();

          // // Set the name of the frame to "coverFrame"
          // frame.name = "test";

          // Insert the template instance into the frame
          frame.insertChild(0, templateInstance);

          // Resize the frame to fit the component instance
          frame.resize(templateInstance.width, templateInstance.height);

          // Set the frame as the thumbnail for the page
          figma.setFileThumbnailNodeAsync(frame);

          // Add the frame to the page
          newPage.insertChild(0, frame);

          // Zoom to fit in view
          figma.viewport.scrollAndZoomIntoView([templateInstance]);
        }
      }
    }
  };

  // Notify the user
  figma.notify("🎉 Pages created");

  // Run the function
  run();
};
