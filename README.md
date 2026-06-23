# TC-ADR Manager

**Document architectural decisions. Keep everything clean and easy to find.**

TC-ADR Manager brings [MADR 4.0](https://adr.github.io/madr/) Architectural Decision Records directly into VS Code, but with a twist. Every ADR can be annotated with **Technical Credit (TC)** metadata that captures *why* a decision creates lasting value, not just what was decided.

Most teams write ADRs and forget them. TC-ADR Manager makes them actionable:

- **Create and edit MADR 4.0 ADRs** in a structured webview — no raw Markdown required
- **Annotate decisions with Technical Credit** — record the benefit, conditions, confidence level, and observable signals that tell you whether the value is being realised
- **TC Dashboard sidebar** — see all annotated decisions across your workspace at a glance, grouped by category with confidence indicators
- **Real-time linting** — catch malformed ADRs as you type, including MADR 4.0 bullet-format rules for Consequences and Pros/Cons sections
- **IntelliSense snippets** — insert a complete MADR 4.0 template with a single keyword

TC annotations live in the YAML frontmatter of each ADR, version-controlled alongside your code, readable without tooling, and ignorable by tools that don't understand them.

> Built on the original [ADR Manager](https://github.com/adr/adr-manager) by Steven Chen (University of Stuttgart), extended with MADR 4.0 and Technical Credit support as part of the Technical Credit summer school research programme in Sydney by Northeastern students (Tali, Cesca, Owen, Maddy, Sukira).

---

## Project Context

### Why are we doing this?

Architectural decisions are routinely made but rarely documented. Existing ADR tooling (such as the web-based [ADR Manager](https://github.com/adr/adr-manager)) lives outside the developer's primary workspace, creating friction that discourages adoption. This extension brings ADR authoring directly into the IDE — where developers already work — to make decision documentation a natural part of the development workflow.

The Track B (storage) stream adds a further dimension: **Technical Credit annotations**. Just as Technical Debt tracks the cost of shortcuts, Technical Credit captures deliberate quality investments. TC metadata is stored in YAML frontmatter alongside the ADR and surfaced in a dedicated dashboard.

### What are we starting from?

This extension is based on the existing [ADR Manager](https://github.com/adr/adr-manager) web application (University of Stuttgart). It reuses the MADR parser, core ADR data model, and lessons from a prior usability evaluation, then migrates everything to MADR 4.0 and adds IDE-native editing via the VS Code Extension API.

### Research Questions

1. Does embedding ADR management inside VS Code reduce friction compared to the web-based ADR Manager?
2. What MADR 4.0 editing features matter most to developers in an IDE context?
3. Can Technical Credit annotations be integrated into the MADR workflow — stored in YAML frontmatter — without disrupting the standard ADR authoring experience?

---

## Installation

### Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/) v1.67.0 or later
- [Node.js](https://nodejs.org/) (LTS) and npm

### Run from source (development)

```bash
git clone https://github.com/OwenSweetman/SummerSchool_MADR.git
cd SummerSchool_MADR
npm install
npm run compile        # builds extension (webpack) + webview (rollup)
```

Then in VS Code:
1. Open the cloned folder
2. Press **F5** to launch the Extension Development Host
3. In the new window, open a project folder containing (or create) a `docs/decisions/` directory
4. Run **ADR Manager: Open ADR Manager** via `Ctrl+Shift+P`

### Install the packaged `.vsix`

```bash
code --install-extension tc-adr-manager-<version>.vsix
```

Or in VS Code: **Extensions → ··· → Install from VSIX…**

---

## Testing

```bash
npm test              # Jest unit suite (82 tests)
npm run lint          # ESLint on src/
```

Tests cover the MADR parser, TC annotation serialisation/deserialisation, YAML frontmatter round-trips, and ADR validation logic. All 82 tests must pass before merging to `main`.

To generate a coverage report:

```bash
npx jest --coverage
```

---

# Index

1. [Project Context](#project-context)
2. [Installation](#installation)
3. [Testing](#testing)
4. [Workspace Concept](#workspace-concept)
    1. [Single-root Workspace](#single-root-workspace)
    2. [Multi-root Workspace](#multi-root-workspace)
    3. [Special Case: Single-root Workspace with only Subfolders](#special-case-single-root-workspace-with-only-subfolders)
5. [Features](#features)
    1. [Commands](#commands)
    2. [TC Annotations](#tc-annotations)
    3. [TC Dashboard](#tc-dashboard)
    4. [Menus](#menus)
    5. [Linting](#linting)
    6. [Snippets](#snippets)
    7. [Settings](#settings)
6. [Known Issues](#known-issues)

## Workspace Concept

The VS Code ADR Manager provides its features on a workspace level. To be able to use its features, the user has to open at least one folder as a root folder in the workspace of a VS Code instance.

Additionally, the user has to establish an `ADR Directory`, a path to a folder inside of the workspace relative to the root of the workspace, where most of the extension's features will act upon. It defaults to `docs/decisions`, but can be changed by the user via command or in the user/workspace settings.

Depending on the number of folders opened as root folders in the same workspace, the extension will behave differently:

### Single-root Workspace

If the user has opened only one folder in the workspace as a root folder, the user will only be able to act upon that root folder with regard to the ADR Directory, e.g., only list ADRs inside of the ADR Directory in that particular folder, only add new ADRs to the ADR Directory in that particular folder etc.

### Multi-root Workspace

If the user has opened multiple folders in the workspace as root folders, the extension will try to take every root folder into account when using its features, e.g., list *every* ADR that is inside of the ADR Directory of *every* root folder, having the ability to choose which ADR Directory of which root folder a new ADR will be added to etc.

### Special Case: Single-root Workspace with only Subfolders

As an alternative to the Multi-root workspace, the user may also add a single root folder which *only*(!) contains multiple other subfolders (e.g., a folder with multiple cloned repositories in it). In this case, the extension will behave as if the user has opened every subfolder in the workspace as separate root folders.

If this behaviour is not desired, it can be disabled in the user/workspace settings.

## Features

### Commands

As of now, the following commands are supported by this extension:

- `Open ADR Manager`: Opens a webview panel and renders the main webview of the ADR Manager. Here, the user can see all ADRs that are located in the ADR Directory/Directories, relative to each root folder in the current workspace, add a new ADR, view and edit existing ADRs using the MADR template(s) provided by the extension or delete an existing ADR (reversible).<br/>
  
<i>Note</i>: Currently, only Markdown files that meet the following criteria will be listed in this webview:

1. Be located in the ADR Directory
2. Follow the naming convention of MADR <br/>(NNNN{-,\_}random{-,\_}title.md, in kebab-case, snake_case or a combination of these two cases, no special characters in the name (? * : " < > / \ |) due to file name limitations, and N corresponds to a number between 0-9)

If the content of a potential ADR detected by the extension does not conform to MADR 4.0, a non-conforming screen is shown with the specific parse error and a button to open the file directly in the text editor for manual correction.

- `Add New ADR`: Opens a webview panel where the user can add a new ADR using the MADR template(s) provided by the extension. The user can choose between:
  - **Basic template** — required fields only (title, context, options, decision outcome)
  - **Professional template** — all MADR 4.0 fields including YAML frontmatter (`status`, `date`, `decision-makers`, `consulted`, `informed`), decision drivers, pros/neutral/cons arguments per option, consequences (Good/Bad), confirmation, more information, links, and full TC annotation fields

  The toggle between basic and professional mode preserves all entered data — switching modes does not lose any field values. The extension chooses the default template according to the user's preferences configured in settings.<br/>
  If the user is working in a multi-root workspace (or a multi-root-like workspace), the extension will ask the user in which ADR Directory of which root folder the newly created ADR should be saved to.

- `Open ADR Manager On This File`: Only when a Markdown file is open: Prompts the extension to view the Markdown file using the MADR template(s) provided by the extension.<br/>
This command is not bound to the ADR Directory, i.e., the user may execute this command on an ADR even if it's not located inside of (an) ADR Directory.<br/>
This command only works if the content of the Markdown file conforms to MADR.

- `Change ADR Directory`: Upon executing this command, the extension will ask the user to enter a new path to the ADR Directory. This path must be a path relative to the root folder(s).<br/>
Alternatively, this can be configured in the user/workspace settings.

- `Initialize ADR Directory`: Upon running this command, the extension will generate the ADR Directory specified in the settings. In addition, the files "0000-use-markdown-architectural-decision-records.md", "adr-template.md" and "README.md" are created inside the ADR Directory as boilerplate. <br/>
If the ADR Directory already exists in the workspace folder, the extension will ask the user if he wants to generate the boilerplate files or not.<br/>
If the user is working in a multi-root workspace (or  a multi-root-like workspace), the extension will ask the user for the root folder in which the ADR Directory should be initialized.

### TC Annotations

Technical Credit (TC) annotations capture the long-term architectural value a decision creates — the opposite of technical debt. They live in the YAML front-matter of an ADR, prefixed `tc-` to avoid collision with standard MADR fields.

The schema defines four **core** fields shown in both basic and professional mode, plus two **extended** fields shown in professional mode only:

| Field | Mode | Description |
|---|---|---|
| `tc-benefit` | Both | Free text describing the long-term advantage the decision creates. Requires `tc-category` alongside. |
| `tc-category` | Both | Single tag from the TC taxonomy (e.g. `abstraction`, `modularity`, `api-stability`, `automation`, `compliance-readiness`, `knowledge-preservation`, `configurability`, `observability`, `reusability`). |
| `tc-conditions` | Both | Free text describing under what circumstances the benefit will materialise. |
| `tc-signals` | Both | List of observable-signal tags (e.g. `interface-stability`, `reduced-change-scope`, `defect-reduction`) plus an optional free-text note. |
| `tc-confidence` | Both | Ordinal value 1–5 (1 speculative · 2 low · 3 moderate · 4 high · 5 evidenced). |
| `tc-status` | Pro only | Enum updated over the ADR lifecycle: `anticipated`, `realised`, `partial`, `not-yet-assessable`, `failed`. |
| `tc-related` | Pro only | List of related ADR references, e.g. `[ADR-003, ADR-011]`, capturing TC compounding across decisions. |

When opening an ADR in the webview, TC annotation fields are surfaced alongside the standard MADR sections. The form respects the basic vs. professional mode setting — basic mode only shows the four core fields.

### TC Dashboard

The extension contributes a **TC Dashboard** sidebar panel in the VS Code Activity Bar. The dashboard scans all ADRs in the active workspace's ADR Directory and displays their TC annotations grouped by category, with confidence indicators (●●●○○) visualising the strength of each claim.

- **Categorised** — ADRs with TC annotations are grouped by `tc-category`
- **Uncategorized** — ADRs that have TC fields but no category are listed separately
- **Unannotated** — ADRs with no TC fields appear at the bottom

Clicking an ADR in the dashboard opens the file directly in the editor. The dashboard refreshes automatically when ADR files change and immediately after every save from the webview editor.

### Menus

As of now, this extension contributes the following menus:

- `Explorer Context Menu`: When right-clicking on an ADR Directory (or any directory along the way to the ADR Directory), the extension will display the option `Open ADR Manager` which executes the command with the same name.<br/>
When right-clicking on a Markdown file that follows the naming convention of MADR, the extension will display the option `View in ADR Manager`, opening the webview to view (and edit) the ADR using the template(s) provided by the extension.

### Linting

As of now, this extension provides linting for potential ADR files for the following cases:

**Required-section checks** (both MADR 2.x and 4.0):

- If there is no header for the title
- If there is no subheader for the required fields of an ADR, i.e. if there is no subheader for 'Context and Problem Statement', 'Considered Options' or 'Decision Outcome'
- If a required section (excluding the title) is empty
- If headings or subheadings are not written in title case
- If the chosen option is not listed in the list of considered options

**MADR 4.0 optional-section checks** (warnings only when the section is present but empty):

- If the `### Consequences` section is present but contains no content
- If the `### Confirmation` section is present but contains no content
- If the `## More Information` section is present but contains no content

**MADR 4.0 bullet-format checks**:

- If a bullet inside `### Consequences` does not start with `Good, because` or `Bad, because`
- If a bullet inside a Pros/Cons option subsection does not start with `Good, because`, `Neutral, because`, or `Bad, because`

### Snippets

As of now, this extension contributes the following snippets that can be inserted using IntelliSense or when typing certain keywords in a text editor:

- `Basic ADR Template`: Inserts a template with only the required fields of a MADR 4.0 ADR (keyword: `basic-madr`)
- `Professional ADR Template`: Inserts a template with all fields of a MADR 4.0 ADR including YAML front-matter (`status`, `date`, `decision-makers`, `consulted`, `informed`) and the optional `### Consequences`, `### Confirmation`, and `## More Information` sections (keyword: `professional-madr`)

### Settings

As of now, this extension contributes the following settings:

- `adrManager.adrDirectory`: Specifies the path of the directory containing the ADRs, relative to the root workspace folder(s) (default: docs/decisions)

- `adrManager.editorMode.addAdrEditorMode`: Specifies the preferred editor mode when creating a new ADR using the extension's webview (default: basic)
  
- `adrManager.editorMode.viewAdrEditorMode`: Specifies the preferred editor mode when viewing/editing an existing ADR using the extension's webview (default: basic; change to `sufficient` to auto-detect based on ADR content, or `professional` to always open in professional mode)

- `adrManager.treatSingleRootAsMultiRoot`: Specifies whether the extension should treat single-root workspaces with only subdirectories as multi-root workspaces (default: true)

- `adrManager.showDiagnostics`: Specifies if the extension shows diagnostics in the text editor when working on ADR files (default: true)

## Known Issues

Known limitations as of this release:

- **MADR 2.x compatibility** — The parser supports MADR 4.0 only. ADRs written in the legacy MADR 2.x format (e.g. `### Positive Consequences`, inline `* Status:` fields) will show as non-conforming. Open them in the text editor and update to MADR 4.0 format to edit them in the webview.
- **TC taxonomy enforcement** — TC annotation values outside the documented taxonomy (e.g. an unknown `tc-category` value) are passed through without rejection at parse time but will surface validation warnings in the editor.
- **ADR Directory scope** — The TC Dashboard and ADR list only include ADRs in the configured ADR Directory. ADRs stored elsewhere in the workspace are not included.
- **Consulted / Informed not editable in basic mode** — These MADR 4.0 frontmatter fields are only visible and editable in professional mode. They are preserved when switching to basic mode and restored when switching back to professional.
- **Links round-trip** — Links entered in the professional editor are serialised as bullet items inside `## More Information`. On reload they appear in the More Information / Technical Story field rather than as separate link items. The original link entries are not restored to the Links UI.
- **Neutral arguments** — Neutral option arguments (`Neutral, because`) are stored and serialised correctly but the professional editor Pros/Cons section does not currently have a drag-to-reorder handle for neutral items.
