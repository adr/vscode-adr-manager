# Case Description 5 Anonymized Raw Data


## General (before tasks)

* Occupation/role: Scientific Researcher, Project Manager
* Years of professional experience: 4.5 years
* Experience with ADRs
  * How long have you used ADRs: 5 years
  * ADR formats used: MADR
  * Experience in MADR: 5 years, used in projects
  * Experience with ADR tooling: tool for rendering ADRs nicely
  * Experience with web-based ADR Manager: none


## Task completion times

* Tasks without extension: 9 minutes
* Tasks with extension: 7 minutes


## Observations while solving tasks

### Tasks without extension

Task 1:

* created a new MADR file in the correct subfolder, correctly named the file according to the naming convention of MADR (including using the decision outcome as a title)
* copied the professional template to the newly created file
* started to copy the information of the meeting summary to the template
* left out fields that were not documented in the meeting summary
* deleted the section 'Chosen option: "...", because ...' of the decision outcome and replaced it with the text that was documented in the 'Outcome' section of the meeting summary
* used the positive arguments of the chosen option as positive consequences and the negative arguments of the chosen arguments as the negative consequences of the decision outcome
* documented every detail of the meeting summary in the new MADR file


Task 2:

* immediately noticed the missing title header and fixed the issue


### Tasks with extension

Task 1:

* opened the main webview of the extension by right-clicking on an ADR directory and clicking on the menu item 'Open ADR Manager'
* confused where to select the 'IT' subfolder as the location to save the new ADR upon clicking on the 'Add ADR' button, conductor pointed out that the location can be chosen upon clicking on the 'Create ADR' button in the ADR editor of the extension
* started to paste the title of the ADR from the meeting summary using the Basic Editor
* switched to Professional Editor after noticing that metadata can not be documented in the Basic Editor
* started to fill in the fields of the Professional Editor with information that were given in the meeting summary
* pointed out that the label 'Add Option' should also be clickable (in addition to the green '+' symbol)
* suggested that option containers should immediately show in the editor with an empty title field upon adding a new option
* pasted every positive consequence into a single input field, realized that each input field were meant to contain one consequence each
* did not find where the pros and cons of the options can be documented, conductor pointed at the arrow in the option containers
* pointed out that the arrows should be reversed
* copied the pros and cons to the options
* said that the editor should point out that lists expect one list item for every input field
* pointed out that the extension should give more information on expanding the option containers (instead of only having an arrow at the top right corner)


Task 2:

* conductor hinted at a bug that made it impossible for the participant to detect the issue with the ADR editor, instructed the participant to open the ADR with the VS Code Markdown editor
* saw the error upon opening the Markdown file in the Markdown editor, thought that the decision drivers were the chosen option
* fixed the error by adding the missing option to the list of considered options



## Personal feedback for the VS Code Extension of the ADR Manager (free form)

* duplicate warning for options would be nice
* thought that the extension was practical for the use case of documenting ADRs
* found the information tooltips for ADR fields good
* suggested that the ADR editor should guide the user more on what/how to put in certain fields (e.g. one list item per input field in lists, expanding options to enter additional information,...)
* found the extension good overall


## System Usability Scale

For each item in the System Usability Scale (SUS), choose a number from 1 to 5 where 1 stands for 'Strongly disagree' and 5 stands for 'Strongly agree'.

1. I think that I would like to use this system frequently: 4
2. I found the system unnecessarily complex: 2
3. I thought the system was easy to use: 5
4. I think that I would need the support of a technical person to be able to use this system: 1
5. I found the various functions in this system were well integrated: 4
6. I thought there was too much inconsistency in this system: 2
7. I would imagine that most people would learn to use this system very quickly: 5
8. I found the system very awkward to use: 1
9. I felt very confident using the system: 5
10. I needed to learn a lot of things before I could get going with this system: 1

