/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebPanel = void 0;
const vscode = __webpack_require__(1);
const utils_1 = __webpack_require__(3);
const constants_1 = __webpack_require__(4);
class WebPanel {
    constructor(panel, extensionUri, page) {
        this._disposables = [];
        this._panel = panel;
        this._extensionUri = extensionUri;
        // Set the webview's initial html content
        this._update(page);
        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programmatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        // Handle messages from the webview to the VS Code API, mainly used for page navigation
        this._panel.webview.onDidReceiveMessage((e) => {
            switch (e.type) {
                case "home":
                    vscode.commands.executeCommand("vscode-adr-manager.showHome");
                    return;
                case "about":
                    vscode.commands.executeCommand("vscode-adr-manager.showAbout");
                    return;
            }
        });
    }
    /**
     * Creates or shows a panel that displays a webview with the specified view using a string key.
     * @param extensionUri The URI of the context the extension is running in (provided by VS Code)
     * @param page A string key for a specific web view page
     */
    static createOrShow(extensionUri, page) {
        const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
        // If we already have a panel, show it.
        if (WebPanel.currentPanel) {
            WebPanel.currentPanel._update(page);
            WebPanel.currentPanel._panel.reveal(column);
            return;
        }
        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(WebPanel.viewType, "ADR Manager", column || vscode.ViewColumn.One, {
            enableScripts: true,
            retainContextWhenHidden: true,
            localResourceRoots: [
                vscode.Uri.joinPath(extensionUri, "dist-web"),
                vscode.Uri.joinPath(extensionUri, "web/static"),
            ],
        });
        WebPanel.currentPanel = new WebPanel(panel, extensionUri, page);
    }
    /**
     * This function is called upon closing the web panel, disposing the web panel in the process.
     */
    dispose() {
        WebPanel.currentPanel = undefined;
        // Clean up our resources
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
    /**
     * Renders the specified view in the webview using a string key.
     * @param page A string key for a specific web view page
     */
    _update(page) {
        const webview = this._panel.webview;
        this._updatePanelTitle(page);
        this._panel.webview.html = this._getHtmlForWebview(webview, page);
    }
    /**
     * Updates the title of the webview panel to match the specified view by using a string key
     * @param page A string key for a specific web view page
     */
    _updatePanelTitle(page) {
        switch (page) {
            case "home":
                this._panel.title = "ADR Manager - Home";
                break;
            case "about":
                this._panel.title = "ADR Manager - About";
                break;
        }
    }
    /**
     * Returns the HTML content that should be rendered by the specified webview.
     * @param webview The webview that renders the HTML content
     * @param page A string key for a specific web view page
     * @returns The HTML content to be rendered by the webview as a string. Note that Vue mounts the div with the
     * 			ID "app" depending on the specified web view page.
     */
    _getHtmlForWebview(webview, page) {
        // Get URIs to VS Code styling
        const VSCODE_STYLE_WEB_URI = webview.asWebviewUri(constants_1.VSCODE_STYLE_URI);
        const VSCODE_RESET_WEB_URI = webview.asWebviewUri(constants_1.VSCODE_RESET_URI);
        // Local path to main script run in the webview
        const SCRIPT_URI = vscode.Uri.joinPath(this._extensionUri, "dist-web", `${page}.js`);
        // URI to load the script in the webview
        const SCRIPT_WEB_URI = webview.asWebviewUri(SCRIPT_URI);
        // Local path to css styles
        const STYLE_URI = vscode.Uri.joinPath(this._extensionUri, "dist-web", `${page}.css`);
        // Uri to load styles into webview
        const STYLE_WEB_URI = webview.asWebviewUri(STYLE_URI);
        // Use a NONCE to only allow specific scripts to be run
        const NONCE = (0, utils_1.getNonce)();
        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${VSCODE_RESET_WEB_URI}" rel="stylesheet">
				<link href="${VSCODE_STYLE_WEB_URI}" rel="stylesheet">
				<link href="${STYLE_WEB_URI}" rel="stylesheet">
				<title>Vue Webview Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script NONCE="${NONCE}">
					const vscode = acquireVsCodeApi();
				</script>
				<script NONCE="${NONCE}" src="${SCRIPT_WEB_URI}"></script>
			</body>
			</html>`;
    }
}
exports.WebPanel = WebPanel;
WebPanel.viewType = "ADR-Manager";


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNonce = void 0;
/**
 * Returns a randomly generated string with length 32 which may contain uppercase letters, lowercase letters and integers.
 * @returns A randomly generated string with length 32
 */
function getNonce() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
exports.getNonce = getNonce;


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// File for storing useful constants
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VSCODE_RESET_URI = exports.VSCODE_STYLE_URI = exports.EXTENSION_URI = exports.EXTENSION = void 0;
const vscode = __webpack_require__(1);
// Extension constants
exports.EXTENSION = vscode.extensions.getExtension("StevenChen.vscode-adr-manager");
exports.EXTENSION_URI = vscode.Uri.parse(exports.EXTENSION.extensionPath);
// Static VS Code style sheets
exports.VSCODE_STYLE_URI = vscode.Uri.joinPath(exports.EXTENSION_URI, "web/static", "vscode.css");
exports.VSCODE_RESET_URI = vscode.Uri.joinPath(exports.EXTENSION_URI, "web/static", "reset.css");


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
const WebPanel_1 = __webpack_require__(2);
/**
 * Sets up the extension to be used in VS Code.
 * This function is automatically called when the extension is activated via an activation event specified in package.json.
 * @param context The context of the extension (automatically provided by the extension)
 */
function activate(context) {
    // Register Home View
    vscode.commands.registerCommand("vscode-adr-manager.showHome", () => {
        WebPanel_1.WebPanel.createOrShow(context.extensionUri, "home");
    });
    // Register About View
    vscode.commands.registerCommand("vscode-adr-manager.showAbout", () => {
        WebPanel_1.WebPanel.createOrShow(context.extensionUri, "about");
    });
}
exports.activate = activate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map