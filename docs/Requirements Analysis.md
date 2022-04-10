# Requirements Analysis

# Table of Contents

1. [Requirements extracted from the ADR Manager](#requirements-extracted-from-the-adr-manager)
2. [Additional Requirements](#additional-requirements)
3. [Modules / Libraries from the ADR Manager](#modules--libraries-from-the-adr-manager)

## Requirements extracted from the ADR Manager

The following requirements are extracted directly from the study of the original ADR Manager.<br/>
Each requirement is additionally labeled with a verdict, along with a short explanation, indicating if the requirement will be kept, modified or dropped from the requirements of the IDE extension.

| Title | Description | Type | Verdict | Reason |
| ----- | ----------- | ---- | ------- | ------ |
| Management of ADRs | Users should be able to add, edit or delete ADRs in GitHub repositories | functional | modify but keep | Core functionality, but management only inside current workspace |
| Provide MADR template | Provide a MADR template such that the user can quickly document an ADR | non-functional (UI) | keep as is | Core functionality, minimal adaptation needed (if any) |
| Add GitHub repositories | Users should be able to add GitHub repositories | functional | drop | Support for version control systems already embedded in the workflow of using the IDE |
| Automatically detect ADRs in GitHub repositories | Automatically list ADRs that are stored inside a repository | functional | modify but keep | Core functionality, but rather detect ADRs in the current workspace to fit IDE environment |
| Push ADRs to GitHub repositories | Enable users to push ADRs directly onto GitHub repositories | functional | drop | Support for version control systems already embedded in the workflow of using the IDE |
Focus mode | Users should be able to hide optional fields when creating/editing an ADR using the MADR template | functional / non-functional (UI) | drop | Users from the user evaluation perceived the different editor modes as difficult to understand and unclear. Maybe provide a single editor mode with all fields, with optional fields labelled as such |
| Basic linting for ADRs | The UI should check if all required fields are present when adding/editing an ADR | functional | keep as is | Giving users feedback for their inputs is important for usability, minimal adaptation needed (if any) |
| Data accessibility | Stored data should be made easily accessible and readable as plain text, Markdown rendering and MADR-specific rendering | non-functional (UI / accessibility) | drop | Different options to display ADRs are already supported by the IDE |
| Usability | The UI should be easy to learn and be used intuitively | non-functional (UI) | keep as is | Even more important in an IDE environment as the extension should not interfere with the workflow of using the IDE itself, but rather complement it |
| Reorder functionality | Users should be able to reorder options and their pros and cons of an ADR as the order may imply their importance | functional | keep as is | Core functionality of managing ADRs, especially when editing ADRs |
| User error protection | The UI should help prevent and correct user-made errors, e.g. be able to modify section titles of a predefined template | non-functional (robustness) | keep as is | correctness of ADRs should be preserved at all times |
| No complex infrastructure needed | The application must not need additional server-side components | non-functional (availability) | keep as is | The extension should be able to function without any other external modules or systems

<br/>

## Additional requirements 

TODO

<br/>

## Modules / Libraries from the ADR Manager

TODO