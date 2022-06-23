# ADR Manager VS Code Extension

Repository for the Visual Studio Code (VS Code) extension of the ADR Manager and relevant artifacts.

The VS Code extension is part of a Bachelor Thesis written at the University of Stuttgart by Steven Chen.

<br/>

## Repo Structure

In the following, the main structure and most important files will be briefly described:

* `docs:` Stores all artifacts regarding the documentation of this Bachelor thesis. Used for convenient sharing of artifacts. <br/>
  
* `src:` Stores all source code for the extension that is written in TypeScript.
    * `plugins:` Stores useful modules and libraries that will be reused throughout the extension.
    * `extension.ts:` The main TypeScript file in which the extension will be set up (i.e. registering VS Code commands and their functionality etc.).
    * `WebPanel.ts:` This TypeScript file is used to handle the webview panel for rendering different custom HTML content.

* `web:` Stores all files relevant to Vue for specifying what to render in the webview, i.e. components, views etc.
    * `pages:` Because we don't have access to a router, we can simulate that using different TypeScript files that specify different views to mount to the DOM. Each TypeScript file stored in this directory will be compiled into separate JavaScript files using [rollup.js](https://rollupjs.org/guide/en/) that will be used to render the webview by specifying a specific key when fetching the HTML content for the webview.

* `package.json:` Besides the usual things like dependencies or scripts, this JSON file defines extension-specific settings like the extension ID or the so-called [Contribution Points](https://code.visualstudio.com/api/references/contribution-points), e.g., activation events for the extension, VS Code commands, custom menus, snippets etc.