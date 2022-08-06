# ADR Manager VS Code Extension

Visual Studio Code (VS Code) extension based on the [ADR Manager](https://github.com/adr/adr-manager), providing features for managing Architectural Decision Records (ADRs) based on the [MADR template](https://adr.github.io/madr/) in the version 2.1.2.

This VS Code extension is part of a Bachelor Thesis written at the University of Stuttgart by Steven Chen.

## Workspace Concept

The VS Code ADR Manager provides its features on a workspace level. To be able to use its features, the user has to open at least one folder as a root folder in the workspace of a VS Code instance.

Additionally, the user has to establish an `ADR Directory`, a path to a folder inside of the workspace relative to the root of the workspace, where most of the extension's features will act upon. It defaults to `docs/decisions`, but can be changed by the user via command or in the user/workspace settings.

Depending on the number of folders opened as root folders in the same workspace, the extension will behave differently:

### Single-root Workspace

If the user has opened only one folder in the workspace as a root folder, the user will only be able to act upon that root folder with regard to the ADR Directory, e.g., only list ADRs inside of the ADR Directory in that particular folder, only add new ADRs to the ADR Directory in that particular folder etc.

### Multi-root Workspace

If the user has opened multiple folders in the workspace as root folders, the extension will try to take every root folder into account when using its features, e.g., list _every_ ADR that is inside of the ADR Directory of _every_ root folder, having the ability to choose which ADR Directory of which root folder a new ADR will be added to etc.

### Special Case: Single-root Workspace with only Subfolders

As an alternative to the Multi-root workspace, the user may also add a single root folder which _only_(!) contains multiple other subfolders (e.g., a folder with multiple cloned repositories in it). In this case, the extension will behave as if the user has opened every subfolder in the workspace as separate root folders.

If this behaviour is not desired, it can be disabled in the user/workspace settings.

## Features

### Commands

As of now, the following commands are supported by this extension:

* `Open ADR Manager`: Opens a webview panel and renders the main webview of the ADR Manager. Here, the user can see all ADRs that are located in the ADR Directory/Directories, relative to each root folder in the current workspace, add a new ADR, view and edit existing ADRs using the MADR template(s) provided by the extension or delete an existing ADR (reversible).<br/>
  
<i>Note</i>: Currently, only Markdown files that meet the following criteria will be listed in this webview:

1. Be located in the ADR Directory
2. Follow the naming convention of MADR <br/>(NNNN-lowercase-title.md, in (lower) kebab-case and N corresponds to a number between 0-9)

If the content of a potential ADR detected by the extension does not conform to MADR, an error message will be shown and the user won't be able to view the Markdown file using the provided MADR template(s).

* `Add New ADR`: Opens a webview panel where the user can add a new ADR using the MADR template(s) provided by the extension. The user can choose between a basic template with only the required fields of an ADR and the professional template, displaying all options of MADR.<br/>
The extension chooses the basic or the professional MADR template according to the user's preferences configured in the user/workspace settings.<br/>
If the user is working in a multi-root workspace (or a multi-root-like workspace), the extension will ask the user in which ADR Directory of which root folder the newly created ADR should be saved to.

* `Open ADR Manager On This File`: When having a Markdown file opened, prompts the extension to view the Markdown file using the MADR template(s) provided by the extension.<br/>
This command is not bound to the ADR Directory, i.e., the user may execute this command on an ADR even if it's not located inside of (an) ADR Directory.<br/>
This command only works if the content of the Markdown file conforms to MADR.

* `Initialize ADR Directory`: Upon running this command, the extension will generate the ADR Directory specified in the settings. In addition, the files "0000-use-markdown-architectural-decision-records.md", "adr-template.md" and "README.md" are created inside the ADR Directory as boilerplate. <br/>
If the ADR Directory already exists in the workspace folder, the extension will ask the user if he wants to generate the boilerplate files or not.<br/>
If the user is working in a multi-root workspace (or  a multi-root-like workspace), the extension will ask the user for the root folder in which the ADR Directory should be initialized.

* `Change ADR Directory`: Upon executing this command, the extension will ask the user to enter a new path to the ADR Directory. This path must be a path relative to the root folder(s).<br/>
Alternatively, this can be configured in the user/workspace settings.


### Settings

As of now, this extension contributes the following settings:

* `adrManager.adrDirectory`: Specifies the path of the directory containing the ADRs, relative to the root workspace folder(s) (default: docs/decisions)

* `adrManager.editorMode.addAdrEditorMode`: Specifies the preferred editor mode when creating a new ADR using the extension's webview (default: basic)
  
* `adrManager.editorMode.viewAdrEditorMode`: Specifies the preferred editor mode when viewing/editing an existing ADR using the extension's webview (default: sufficient; the extension will choose the template based on the content of the ADR)

* `adrManager.treatSingleRootAsMultiRoot`: Specifies whether the extension should treat single-root workspaces with only subdirectories as multi-root workspaces (default: true)


## Known Issues

This release is a prototype and may contain errors and bugs. Some features are not implemented yet and some implementations may be subject to change.<br/>
It is aimed at generating feedback from user evaluation with select stakeholders.