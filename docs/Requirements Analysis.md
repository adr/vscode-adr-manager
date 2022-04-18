# Requirements Analysis

# Table of Contents

1. [Requirements extracted from the ADR Manager](#requirements-extracted-from-the-adr-manager)
2. [Additional Requirements](#additional-requirements)
3. [Modules / Libraries from the ADR Manager](#modules--libraries-from-the-adr-manager)

<br/>

# Requirements extracted from the ADR Manager

The following requirements are extracted directly from the study of the original ADR Manager.<br/>
Each requirement is additionally labeled with a verdict, along with a short explanation, indicating if the requirement will be kept, modified or dropped from the requirements of the IDE extension.

| Title                                            | Description                                                                                                             | Type                                | Verdict         | Reason                                                                                                                                                                                                      |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Management of ADRs                               | Users should be able to add, edit or delete ADRs in GitHub repositories                                                 | functional                          | modify but keep | core functionality, but management only inside current workspace                                                                                                                                            |
| Provide MADR template                            | Provide a MADR template such that the user can quickly document an ADR                                                  | non-functional (UI)                 | keep as is      | Core functionality, minimal adaptation needed (if any)                                                                                                                                                      |
| Add GitHub repositories                          | Users should be able to add GitHub repositories                                                                         | functional                          | drop            | support for version control systems already embedded in the workflow of using the IDE                                                                                                                       |
| Automatically detect ADRs in GitHub repositories | Automatically list ADRs that are stored inside a repository                                                             | functional                          | modify but keep | core functionality, but rather detect ADRs in the current workspace to fit IDE environment                                                                                                                  |
| Push ADRs to GitHub repositories                 | Enable users to push ADRs directly onto GitHub repositories                                                             | functional                          | drop            | support for version control systems already embedded in the workflow of using the IDE                                                                                                                       |
| Focus mode                                       | Users should be able to hide optional fields when creating/editing an ADR using the MADR template                       | functional / non-functional (UI)    | drop            | Users from the user evaluation perceived the different editor modes as difficult to understand and unclear. Maybe provide a single editor mode with all fields, with optional fields labelled/shown as such |
| Basic linting of ADRs                            | the UI should check if all required fields are present when adding/editing an ADR                                       | functional                          | keep as is      | Giving users feedback for their inputs is important for usability, minimal adaptation needed (if any)                                                                                                       |
| Data accessibility                               | Stored data should be made easily accessible and readable as plain text, Markdown rendering and MADR-specific rendering | non-functional (UI / accessibility) | drop            | different options to display ADRs are already supported by the IDE                                                                                                                                          |
| Usability                                        | The UI should be easy to learn and be used intuitively                                                                  | non-functional (UI)                 | keep as is      | even more important in an IDE environment as the extension should not interfere with the workflow of using the IDE itself, but rather complement it                                                         |
| Reorder functionality                            | Users should be able to reorder options and their pros and cons of an ADR as the order may imply their importance       | functional                          | keep as is      | core functionality of managing ADRs, especially when editing ADRs                                                                                                                                           |
| User error protection                            | The UI should help prevent and correct user-made errors, e.g. be able to modify section titles of a predefined template | non-functional (robustness)         | keep as is      | correctness of ADRs should be preserved at all times                                                                                                                                                        |
| No complex infrastructure needed                 | The application must not need additional server-side components                                                         | non-functional (availability)       | keep as is      | extension should be able to function without any other external modules or systems                                                                                                                          |

<br/>

# Additional requirements

The following table illustrates new requirements that have not been implemented in the original ADR Manager, but may be valuable in the context of the extension or suggested via the previous study with the ADR Manager:

| Title                                 | Description                                                                                                                                                    | Type       | Reason                                                                                                                                  |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Supporting images in an ADR           | The user should be able to embed images in an ADR                                                                                                              | functional | highly requested feature, ADRs are often accompanied by visualizations, p.ex., diagrams                                                 |
| Provide ADR templates other than MADR | The user should be able to choose from various templates other than MADR, like Y-statements or the Nygard format                                               | functional | give the user more freedom over how the ADR should be documented, covering more use cases for this extension                            |
| Superseding ADRs                      | The user should be able to add ADRs that supersede older ADRs. The superseded ADR will have its status set accordingly and have a link to the superseding ADR. | functional | it is not uncommon that an ADR will be outdated because of a new ADR, and showing the relations between ADRs may help to structure them |

<br/>

# Modules / Libraries from the ADR Manager

As the extension is based on the ADR Manager, there are modules which may be extracted and reused in this extension:

-   ArchitecturalDecisionRecord class: A class definition is needed in order to represent an ADR in Typescript. The ArchitecturalDecisionRecord class from the ADR Manager can serve as a base class from which other classes may be derived (p.ex. for providing different types of ADRs).
-   MADR Parser and Converter: As the general structure of the MADR template will remain the same, the MADR parser and converter can be reused and potentially modified or extended.
-   Frontend components: By using Webviews from the Extension API, some frontend components used in the ADR Manager may be reused in the extension, although they may have to be rewritten depending on the frontend framework used (e.g. [Svelte](https://svelte.dev/)).
-   Helper functions used in the ADR Manager
