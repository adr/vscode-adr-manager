# Implementation Alternatives

This document lists several alternatives to implement a certain requirement. Each alternative is labeled with a suitability to fulfill the requirement which is determined by how usable the alternative is and how easy it is to implement the alternative in VS Code. The suitability can be 'well suited', 'moderately suited' and 'not suited'.

Each implementation alternative of a requirement will be given an ID in the form AX (where X is replaced with a number)that is unique for the particular requirement. To adress specific implementation alternatives, the combination of requirement ID and alternative ID can be used, e.g., the first alternative of the first requirement would be R1A1.

For more information about the requirements, click [here](https://docs.google.com/spreadsheets/d/1jqxMSwVLYWOTZtjuJ9Ix26yQEV8KIrDDW062dvgHv1E/edit?usp=sharing)

<br/>

## Terminology

For this document, it is useful to establish some terminology that will be used throughout:

<br/>

<b><i>VS Code command</i></b>:
A VS Code command (or just command) is a trigger that the user can use to execute certain actions in VS Code. Besides built-in commands, extensions may also be managed and used by providing custom commands.<br/>
The user can execute commands by either opening the VS Code Command Palette (by pressing Ctrl+Shift+P or Cmd+Shift+P) or by setting a command to a key bind.

<b><i>VS Code workspace</i></b>:
A VS Code workspace (or just workspace) is 'the collection of one or more folders that are opened in a VS Code window (instance)' (from the [official VS Code website](https://code.visualstudio.com/docs/editor/workspaces)). Once a folder has been added to the workspace, it is possible to navigate through that folder by using the explorer on the left side in VS Code.<br/>
For this extension, we will only look at single-root workspaces, i.e., there will be only one root folder opened per VS Code workspace.

<b><i>VS Code Webview API</i></b>:
The [VS Code Webview API](https://code.visualstudio.com/api/extension-guides/webview) (in the following called webview) allows the user to render custom HTML content in a separate frame that is controlled by the extension. The communication between the webview and the extension takes place via sending and receiving messages. Webviews can be displayed as distinct editors using <i>Webview Panels</i> or in the sidebar or panel areas of VS Code using <i>Webview views</i>.<br/>
The advantage of using webviews is the flexibility to build custom user interfaces that would otherwise not be possible using only the VS Code API. Also, frameworks like Vue.js can be built on top of webviews to further enhance the functionality, making it possible to integrate whole websites into VS Code.

<b><i>Vue.js</i></b>:
[Vue.js](https://vuejs.org/) (or Vue) is one of the most popular JavaScript framework for creating web user interfaces. One of its main features is the ability to modularize the interface into single <i>components</i> that can be reused across multiple websites. This makes the website more maintainable and reduces redundancy.<br/>
It is important to note that the original ADR Manager itself is built using Vue 2, which would reduce the workload and help to maintain the feel of the original if Vue would be used in the extension as well.

## Implementation Alternatives for each Requirement

### R1: Adding new ADRs to the local repository

| ID  | Alternative                                                                        | Description                                                                                                                                                                                                                                                                 | Suitability       | Reason                                                                                                                                                                                                |
| --- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | Using a command to render a webview with multiple input fields for adding new ADRs | The user executes a command to open a webview (potentially built with Vue) with a user interface where he can enter and edit ADR information to his liking, along with a 'Save' button at the bottom that creates a Markdown file of the ADR and saves it in the workspace. | well suited       | By using a webview, the user interface of the ADR Manager can be reused or at least be based off of it, thus making the implementation easy and reminiscent of the original ADR Manager.              |
| A2  | Using a command to ask the user to input the ADR information one field at a time   | The user executes a command which prompts him to enter all ADR information one field at a time. The input field appears at the top of the window (where the command palette would appear).                                                                                  | moderately suited | While being unobtrusive, the user won't be able to change their inputs once a field has been filled out. This makes the implementation susceptible to user errors which negatively impacts usability. |

<br/>

### R2: Editing existing ADRs

| ID  | Alternative                                                                                | Description                                                                                                                                                                                                                                                                                          | Suitability       | Reason                                                                                                                                                                                                                                                                                                              |
| --- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | Using a command to render a webview where an ADR can be chosen to be edited                | The user executes a command to open a webview (potentially built with Vue) where he can choose between ADRs that exist inside a specific path on the workspace. The webview then displays multiple input fields that are filled with existing information which can be edited and saved by the user. | well suited       | By using a webview, the user interface of the ADR Manager can be reused or at least be based off of it, thus making the implementation easy and reminiscent of the original ADR Manager (see also R1A1).<br/>                                                                                                       |
| A2  | Using a command to edit specific fields of an ADR                                          | The user executes a command which prompts him to specify a certain field of the ADR that he would like to change. The user is then shown the current value of the requested field and is asked to update the value.                                                                                  | not suited        | The user should be able to see all fields of an ADR and their corresponding values at once such that the user doesn't have to know beforehand which fields need changes. It is also impractical to be able to change only one field at a time compared to changing multiple filds at once.                          |
| A3  | Using the Markdown editor provided by VS Code to edit ADRs 'by hand' (built-in in VS Code) | The user opens the existing ADR that he wants to edit using the built-in Markdown editor to make and save changes.                                                                                                                                                                                   | moderately suited | While this method may be quick (especially for power users), there may be users who are not familiar with writing raw Markdown. Additionally, the user may run into a problem with formatting and keeping the ADR consistent to other ADRs, which would otherwise be handled by a template with given input fields. |

<br/>

### R3: Provide MADR template

| ID  | Alternative                                                                                                                   | Description                                                                                                                     | Suitability       | Reason                                                                                                                                                                                                                                                                                                                    |
| --- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | Using a webview (potentially built with Vue) to display the MADR template along with input fields which the user can fill out | The user can let the extension render a webview which provides multiple input fields with labels that follow the MADR template. | well suited       | By using a webview, the user interface of the ADR Manager can be reused or at least be based off of it, thus making the implementation easy and reminiscent of the original ADR Manager (see also R1A1 and R2A1).                                                                                                         |
| A2  | Using a command to generate a Markdown file that follows the MADR template                                                    | The user can execute a command which generates a template Markdown file for which he can fill out the fields.                   | moderately suited | Although very easy to implement, it would make more sense to let the user directly fill out an ADR upon generation rather than having the user to separately generate and fill out an ADR. If the user still wants to have a blank template, he may leave every field empty, resulting in a blank Markdown template file. |

<br/>

### R4: Provide an ADR parser and converter

| ID  | Alternative                                                                        | Description                                                                            | Suitability | Reason                                                                                                                                                                                                                                      |
| --- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | Import and use the ADR parser and converter of the original ADR Manager as modules | Reuse the parser and the converter that has been written for the original ADR Manager. | well suited | Because the original ADR Manager is written in JavaScript, it is possible to reuse the code of the ADR Manager. This reduces the workload and may be less prone to bugs and errors compared to writing a parser and converter from scratch. |
