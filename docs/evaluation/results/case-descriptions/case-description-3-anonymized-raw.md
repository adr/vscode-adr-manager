# Case Description 3 Anonymized Raw Data


## General (before tasks)

* Occupation/role: PhD student in software engineering
* Years of professional experience: 6 years
* Experience with ADRs
  * How long have you used ADRs: does not use ADRs
  * ADR formats used: none
  * Experience in MADR: none
  * Experience with ADR tooling: none
  * Experience with web-based ADR Manager: experience from the original ADR Manager study


## Task completion times

* Tasks without extension: 13 minutes
* Tasks with extension: 16 minutes


## Observations while solving tasks

### Tasks without extension


Task 1:

* skimmed through the provided basic and professional MADR templates before reading the meeting summary
* created a new MADR in the correct subdirectory
* correctly named the new Markdown file according to the decision made in the meeting summary
* copied the basic template to the newly created MADR file because the participant thought that it would be enough to document the meeting summary
* formulated the context and problem statement in their own words
* manually filled out the considered options (not copied and pasted)
* realized that the basic template did not have enough fields, copy and pasted the remaining fields from the professional template
* added the pros and cons section right below the list of considered options
* manually filled out the pros and cons of the options according to the MADR template, using the wording from the template ('Good, because...' and 'Bad, because...')
* noticed that the MADR template places the pros and cons of the options below the decision outcome, decided to adjust the MADR file according to the template
* added chosen option of the MADR
* wrote 'not documented' as the explanation for the chosen option as there was no information given in the meeting summary
* organizer hinted about missing metadata, participant added metadata to the MADR
* checked professional template for any missing fields, did not find any
* realized that the professional template is the basic template but with additional, optional elements


Task 2:

* immediately notices the missing title of the MADR, organizer revealed that the error has been fixed
* participant initially wanted to open the professional MADR template on the side and compare the two files


### Tasks with extension

Task 1:

* used the command 'Add New ADR' to create the ADR
* unsure how to specify the target location of the new ADR, suspected that the location can be chosen upon clicking on the 'Create ADR' button
* started to fill out the fields of the basic editor with the help of the provided tooltips
* switched to professional editor mode upon adding the first option
* confused where the options can be expanded, thought the arrow would collapse the option even further (i.e. arrows are reversed)
* when entering the pros and cons of an option, participant noted that it's a nice feature to have new input fields pop up automatically
* switched back to the basic editor mode to add a new option
* switches back again to the professional editor mode to add a description and pros and cons of the newly aded option
* noted that in the professional editor mode, the 'Title' labels of the considered options is redundant when an option is collapsed, the label distracts the user from the title itself
* found the rendering of the options good when using the basic editor mode
* the semantics behind arranging the options were unclear, participant was not sure whether to put the chosen option in the front or not
* found the yellow warning text helpful that is displayed in the basic editor mode when an optional field has been filled out
* realizes that clicking an options leads to selecting the clicked option as the decision outcome, participant previously thought that clicking the option (and the differently colored options) would indicate that an option is currently being edited
* suggested to add a more precise text for choosing an option as the decision outcome
* could not find an explanation to the decision outcome, so the participant added an 'arbitrary' explanation to fulfill the restriction of the editor
* noted that the input fields of the consequences were hard to see (could happen with particular VS Code color themes)
* added the consequences to the ADR
* thinks that the provided editor modes could be used nicely in a meeting
* found that the editors guide the user well
* unsure whether to enter the date of the meeting or the current date because the ADR file will be created at the current date, interprets the tooltip as the date on which the ADR file has been last updated
* filled in the rest of the metadata
* thought that the basic editor mode is redundant because the professional editor mode already provides all fields that the basic editor mode has, and more
* found that the yellow warning text in the basic editor mode is too big, to the point where it becomes obnoxious
* found that the 'Delete' button for ADRs in the main webview may be dangerously placed
* liked that the editor modes only apply changes when clicking on the 'Save ADR' button
* organizer noticed a bug where the metadata has not been added to the newly created Markdown file
* thought that the tool saves time by automatically creating the ADR file with the MADR template filled in

Task 2:

* immediately saw the linting error and fixed it
* wanted to see what happens when opening the file with the ADR Manager
* organizer noted another bug where the extension automatically adds options to the list of considered options if the Markdown file contains pros and cons for an option that is not in the list of considered options (potentially a bug with the ADR parser)
* found the distinction between severity levels of the linter good


## Personal feedback for the VS Code Extension of the ADR Manager (free form)

* found the extension very well integrated in VS Code (e.g. commands, workspace concept)
* easy to use
* input fields may be difficult to see (with particular VS Code color themes)
* tooltips are good for user who don't have much experience with ADRs
* having only the professional editor mode would be better
* UI looks good, sans serif font looks better for normal text (non code)
* way easier to use than the MADR text templates because the user doesn't need to manually copy and paste templates and placeholders
* preferred the extension over the text templates e.g. in meetings
* good that the ADRs are based on text files / Markdown files and not a custom file format, good for Git etc.


## System Usability Scale

For each item in the System Usability Scale (SUS), choose a number from 1 to 5 where 1 stands for 'Strongly disagree' and 5 stands for 'Strongly agree'.

1. I think that I would like to use this system frequently: 4
2. I found the system unnecessarily complex: 2
3. I thought the system was easy to use: 5
4. I think that I would need the support of a technical person to be able to use this system: 1
5. I found the various functions in this system were well integrated: 5
6. I thought there was too much inconsistency in this system: 2
7. I would imagine that most people would learn to use this system very quickly: 5
8. I found the system very awkward to use: 1
9. I felt very confident using the system: 4
10. I needed to learn a lot of things before I could get going with this system: 2

