# Changelog

* 0.2.4 - Parser and YAML serialization fixes
  * Fixed codicons (icons) not loading in packaged release — font files now bundled in assets/
  * Fixed drag-to-reorder in basic mode broken in packaged release — replaced Vue reactive class with CSS-only opacity hover approach
  * Replaced hand-rolled YAML metadata parser with js-yaml (CORE_SCHEMA) — fixes date quoting, array element quoting (e.g. ['23']), and all edge cases
  * Fixed decision-makers, consulted, and informed values gaining unnecessary single quotes on each save
  * Fixed date field not appearing in YAML frontmatter on save
  * Fixed non-conforming ADR error screen not showing in packaged release (codicons fix)
  * Added example ADRs: 0006-use-vue3-for-webview-ui and 0007-regex-post-processing-for-madr-sections
  * Added ADR Status label rename to distinguish from TC Status

* 0.2.3 - Full data persistence and parser robustness
  * Fixed status, date, decision-makers, consulted, and informed fields not appearing in YAML frontmatter when saving
  * Fixed parse failures caused by 'Good, because' / 'Bad, because' tokens in Consequences, Confirmation, and More Information sections — all three now extracted via regex, bypassing ANTLR token conflicts
  * Added Confirmation textarea to professional editor
  * Added Consulted and Informed fields to professional editor
  * Added Neutral arguments section to professional option editor
  * Links now serialized into More Information section — no longer silently discarded
  * Links and plain text in More Information now correctly separated on reload
  * All fields (tc, consulted, informed, confirmation, neutral) now preserved across basic↔professional mode switches
  * TC annotations without a benefit field but with other TC fields now correctly recognised and categorised
  * TC Dashboard now refreshes immediately after every create/save
  * TC Dashboard correctly separates annotated-but-uncategorised ADRs from unannotated ones
  * ADRs now default to opening in basic mode (setting: viewAdrEditorMode default changed from 'sufficient' to 'basic')
  * Fixed drag-to-reorder broken in basic mode (visibility: hidden instead of display: none)
  * Fixed ADR Status label to distinguish it from TC Status in professional editor

* 0.2.2 - README update
  * Updated README for marketplace listing

* 0.2.1 - Marketplace publication and polish
  * Renamed extension to TC-ADR Manager
  * Updated README with improved description for marketplace listing
  * Fixed edit/view button logic and non-conforming ADR error screen

* 0.2.0 - MADR 4.0 migration and Technical Credit annotation support
  * Migrated parser and data model from MADR 2.1.2 to MADR 4.0 (updated grammar, YAML frontmatter for status/date/decision-makers, unified Consequences section, More Information section replacing Links)
  * Added TC annotation data model: `TcAnnotation` interface with 6 fields stored as `tc-*` YAML frontmatter keys
  * Added `parseTcFromYaml` and `serializeTcToYaml` for automatic TC field read/write on every parse and save
  * Added mode-aware serialisation: pro-only fields (`tc-status`, `tc-related`) only written in professional mode
  * Added `tc-schema-version` key for future schema migration support
  * Added `validateTcAnnotation()` — validates all 6 TC field types with per-field error messages
  * Added TC annotation form fields in professional editor mode (UI)
  * Added TC inventory sidebar showing all annotated constructs with confidence indicators

* 0.1.8 - Updated project repository, added introduction repository to extension description
* 0.1.7 - Fixed bug where option description boxes after the first option were not auto-growing
* 0.1.6 - Fixed spelling error in UI
* 0.1.5 - Several bugfixes
* 0.1.4 - Several bugfixes
* 0.1.3 - Bugfix for wrongfully determining highest ADR number when the current highest number is 0
* 0.1.2 - Bugfix specifically for detecting title case headings
* 0.1.1 - Several bugfixes
* 0.1.0 - Ready for evaluation: Added more diagnostics, added snippets for generating basic and professional ADRs, ADRs may now contain '#' in their titles, bugfixes
* 0.0.4 - Added some basic linting rules using diagnostics, UI changes
* 0.0.3 - Several UI changes, loosened criteria for detecting ADRs 
* 0.0.2 - Added explorer context menu entries for ADR Directory and potential ADR files, added support for ADRs containing YAML Front Matter, user can now click an "Edit" button to open the native Markdown editor with the non-conforming ADR, fixed broken styling of webviews
* 0.0.1 - Initial release