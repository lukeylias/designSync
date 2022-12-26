Insert gif or link to demo


# designSync – Stacks Figma plugin
## Summary
DesignSync is a Figma plugin for designers to help standardise and organise their design files for developer handoff and better overall navigation and discoverability.

## Notes

Unfortunatly Figma APIs don't allow us to target the filename (readonly). This means the user has to manually overide the filename.
Also, we can't move files. So again, the user has to manually move the file to the correct team / project.

Essenitally this means we will automate as much as we can and help guide the user to rename and move their file.


## To-do
- Hook up close button
- Better styling for the UI
- Enhancments to the HTML after pages are generated
- Overall improvements
- Touch area for copy to clipboard


## How it works

- Run the plugin (CMD + /), type in "designSync"
- Select a theme
- Enter in a name for your file
- Enter in a Jira ticket number (if applicable)

It will generate pages, including a sandbox for concepts and a developer handoff page. It also creates a custom thumbnail and a bunch of components to help you organise your design files.

## Installation

Below are the steps to get the plugin running. You can also find instructions at:

- https://www.figma.com/plugin-docs/setup/

This plugin uses Typescript and NPM

First, download Node.js which comes with NPM. This will allow you to install TypeScript and other libraries. You can find the download link here:

- https://nodejs.org/en/download/

Next, install TypeScript using the command:

- ``npm install -g typescript``

Finally, in the directory of your plugin, get the latest type definitions for the plugin API by running:

- ``npm install --save-dev @figma/plugin-typings``


Using TypeScript requires a compiler to convert TypeScript (code.ts) into JavaScript (code.js) for the browser to run.
Open this directory in Visual Studio Code.
Compile TypeScript to JavaScript: 
- Run the ```"Terminal > Run Build Task"``` menu item, then select ``"npm: watch"``.

    
## Feedback

If you have any feedback, please reach out @lukeylias on Slack

