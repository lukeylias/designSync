figma.showUI(__html__);

figma.ui.resize(320, 300);

interface Page {
  pageName: string;
  componentKey: string | null;
}

// pages we will generate and associated component keys (component keys are how we get Figma components)
const PAGES: Page[] = [
  {
    pageName: "🏖 Sandbox",
    componentKey: null,
  },
  {
    pageName: "💀 Archive",
    componentKey: null,
  },
  {
    pageName: "–––––",
    componentKey: null,
  },
  {
    pageName: "↪️ Developer Handoff",
    componentKey: "07c76dbfb1d4c259f757fae81ebe43c1ac6a8f1e",
  },
  {
    pageName: "–––––",
    componentKey: null,
  },
  {
    pageName: "🧩 File Components",
    componentKey: "3c6a06413cb26c37032bd26503e055da754064c1",
  },
  {
    pageName: "Cover",
    componentKey: null,
  },
];

const themeColors = [
  {
    name: "Accessibility and Inclusion",
    color: "#D1FADF",
  },
  {
    name: "Onboarding",
    color: "#FEE4E2",
  },
  {
    name: "Dashboard and Navigation",
    color: "#F6F8F9",
  },
  {
    name: "Moving Money",
    color: "#FEF0C7",
  },
  {
    name: "Cards and wallets",
    color: "#E0F2FE",
  },
  {
    name: "Choosing and setting up products",
    color: "#FBE8FF",
  },
  {
    name: "View and use banking products",
    color: "#FEF7C3",
  },
  {
    name: "Messaging and Alerts",
    color: "#E6F4D7",
  },
  {
    name: "Security and Access",
    color: "#FECDCA",
  },
  {
    name: "Open Banking",
    color: "#F4F4D5",
  },
  {
    name: "Customer Information",
    color: "#ECE9FE",
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
        await figma.loadFontAsync({ family: "Inter", style: "Bold" });

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
        filenameTextNode.fontName = { family: "Inter", style: "Bold" };
        filenameTextNode.fontSize = 128;
        filenameTextNode.resize(1400, filenameTextNode.height);
        filenameTextNode.x = 100;
        filenameTextNode.y = 479;

        currentPage.appendChild(filenameTextNode);

        // Create a frame around the text nodes
        const frame = figma.createFrame();
        frame.resize(1600, 1015);
        frame.name = "Cover";

        // Set the frame color based on the theme selected by the user
        if (theme) {
          const themeColor = themeColors.find((color) => color.name === theme);
          if (themeColor) {
            // Create a solid color object with the color specified in the themeColors array
            const colorHex = themeColor.color.replace("#", "");
            const r = parseInt(colorHex.substr(0, 2), 16) / 255;
            const g = parseInt(colorHex.substr(2, 2), 16) / 255;
            const b = parseInt(colorHex.substr(4, 2), 16) / 255;
            const solidColor = { r, g, b };
            frame.fills = [{ type: "SOLID", color: solidColor }];
          }
        }

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

          // Detach instance
          templateInstance.detachInstance();

          // Zoom to fit the template in view
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
