# ADR Manager VS Code Extension

Repository for the Visual Studio Code (VS Code) extension of the ADR Manager and relevant artifacts.

The VS Code extension is part of a Bachelor Thesis written at the University of Stuttgart by Steven Chen.

<br/>

## Repo Structure

In the following, the main structure and most important files will be briefly described:

* `docs`: Stores all artifacts regarding the documentation of this Bachelor thesis. Used for convenient sharing of artifacts. <br/>
  
* `src`: Stores all source code for the extension that is written in TypeScript.
    * `plugins`: Stores useful modules and libraries that will be reused throughout the extension.
    * `extension.ts`: The main TypeScript file in which the extension will be set up (i.e. registering VS Code commands and their functionality etc.).
    * `WebPanel.ts`: This TypeScript file is used to handle the webview panel for rendering different custom HTML content.

* `web`: Stores all files relevant to Vue for specifying what to render in the webview, i.e. components, views etc.
    * `pages`: Because we don't have access to a router, we can simulate that using different TypeScript files that specify different views to mount to the DOM. Each TypeScript file stored in this directory will be compiled into separate JavaScript files using [rollup.js](https://rollupjs.org/guide/en/) that will be used to render the webview by specifying a specific key when fetching the HTML content for the webview.

* `package.json`: Besides the usual things like dependencies or scripts, this JSON file defines extension-specific settings like the extension ID or the so-called [Contribution Points](https://code.visualstudio.com/api/references/contribution-points), e.g., activation events for the extension, VS Code commands, custom menus, snippets etc.

<br/>

## Extension Architecture

Here is a diagram that illustrates the architecture of the VS Code extension:

<img src="docs/images/Extension%20Architecture.png"></img><br/>
<i>Visualization of the extension architecture.</i>

The extension consists of two main components:

* The main extension where all of the extension's logic is managed and
* The webview that is being rendered by the extension via a webview panel.

The user has two ways of interacting with the extension:

1. He can directly interact with the extension by using the provided contribution points (i.e. VS Code commands, snippets, custom menus etc.)
2. He can use the UI that is provided by the extension's webview

While there is no direct communication between the extension's logic and the extension's webview, they can indirectly communicate through the VS Code Extension API that is exposed to both components. Thus, this architecture has some similarities to a Model-View-Controller design pattern that is often seen in the context of web applications.

<br/>

## Starting the Extension

Here is a step-by-step guide on how to start the extension:

1. Clone this repository to your local computer.
2. Run the `npm install` command inside of the cloned directory.
3. Open the cloned directory with VS Code.
4. Press F5 to run the extension. Another VS Code window will open where the extension's functionality will be available.
5. Activate the extension by triggering one of the activation events specified in `package.json`. Currently, executing one of the provided commands will activate the extension.

<br/>

## VS Code Commands

 These commands are supported through the Command Palette:

* `Open Home Page`: Opens the webview panel and renders the view with the text "This is a home page" and a button that will open the "About" page.
* `Open About Page`: Opens the webview panel and renders the view with the text "This is an about page" and a button that will open the "Home" page.

As of right now, the commands are only dummy commands used for testing, mainly for testing the navigation between different views using the webview.


