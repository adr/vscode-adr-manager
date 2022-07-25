# ADR Manager VS Code Extension

Visual Studio Code (VS Code) extension based on the [ADR Manager](https://github.com/adr/adr-manager).

The VS Code extension is part of a Bachelor Thesis written at the University of Stuttgart by Steven Chen.

<br/>

## Features

### Commands

As of now, the following commands are supported by this extension:

* `Open ADR Manager`: Opens the webview panel and renders the main webview of the ADR Manager. Here, the user can see all ADRs that are located in the specified ADR directory, relative to each root folder in the current workspace. <br/>
  
<i>Note</i>: Only Markdown files in the ADR directory that follow the naming format of MADR (NNNN-lowercase-title.md, in (lower) kebab-case and N corresponds to a number between 0-9) are listed in this webview.

* `Add New ADR`: Opens the webview panel where the user can add a new MADR using the template provided by the extension. The extension chooses the basic or the professional MADR template according to the user's preferences configured in the user/workspace settings. (Currently, only basic mode has been implemented.)

* `Initialize ADR Directory`: Upon running this command, the extension will generate the ADR directory specified in the settings (default: "docs/decisions"). In addition, the files "0000-use-markdown-architectural-decision-records.md", "adr-template.md" and "README.md" are created inside the ADR directory as boilerplate. <br/>
If the ADR directory already exists in the workspace folder, the extension will ask the user if he wants to generate the boilerplate files or not.<br/>
If the user has opened multiple folders in the same workspace, the extension will ask the user for a specific folder in which the ADR directory should be initialized.

* `Change ADR Directory`: Upon executing this command, the extension will ask the user to enter a new directory in which the extension will search for potential MADR files. Alternatively, this can be configured in the user/workspace settings.

<br/>

### Settings

As of now, this extension contributes the following settings:

* `adrManager.adrDirectory`: Specifies the path of the directory containing the ADRs, relative to the root workspace folder(s)

* `adrManager.editorMode.addAdrEditorMode`: Specifies the preferred editor mode when creating a new ADR using the extension's webview
  
* `adrManager.editorMode.viewAdrEditorMode`: Specifies the preferred editor mode when viewing/editing an existing ADR using the extension's webview

<br/>

## Known Issues

This release is a pre-release. It is aimed at generating feedback from user evaluation with select stakeholders.