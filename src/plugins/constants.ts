// File for storing useful constants

import * as vscode from "vscode";

// Extension constants
export const EXTENSION = vscode.extensions.getExtension("StevenChen.vscode-adr-manager");
export const EXTENSION_URI = vscode.Uri.parse(EXTENSION!.extensionPath);

// Static VS Code style sheets
export const VSCODE_STYLE_URI = vscode.Uri.joinPath(EXTENSION_URI, "web/static", "vscode.css");
export const VSCODE_RESET_URI = vscode.Uri.joinPath(EXTENSION_URI, "web/static", "reset.css");
