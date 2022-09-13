# Case Description 6 Anonymized Raw Data


## General (before tasks)

* Occupation/role: Cloud Architect
* Years of professional experience: 10 years
* Experience with ADRs
  * How long have you used ADRs: 7 years
  * ADR formats used: MADR
  * Experience in MADR: 5 years, used in projects
  * Experience with ADR tooling: no practical experience
  * Experience with web-based ADR Manager: experience from the original ADR Manager study


## Task completion times

* Tasks without extension: 14 minutes
* Tasks with extension: 11 minutes


## Observations while solving tasks

### Tasks without extension

Task 1:

* copied the professional MADR template file to the correct subfolder
* enamed the copied file according to the naming convention of MADR (including using the decision outcome as a title)
* noted that the meeting summary file(s) are already very close to an ADR format and do not reflect a real life scenario, might introduce a bias to the evaluation study, task seems artificial
* started to fill out the fields of the professional MADR template
* discussed the possibility to formulate the title header as a problem or as the solution to a problem, chose to formulate the header as the solution to a problem in order to adhere to the structure of the existing MADRs
* stated that a solution-oriented header is logical for 'only' documentation purposes, a problem-oriented header is better for understanding decisions in the future
* copied the content of the 'Context' section of the meeting summary to the 'Technical Story' section of the template, then moved the content to the section 'Context and Problem Statement' and deleted the 'Technical Story' section
* did not see any decision drivers explicitly documented in the meeting summary, chose to derive decision drivers from the context as they are one of the most important fields of the ADR
* started copying the remaining information from the meeting summary to the MADR template
* used decision drivers to derive a justification for the decision outcome
* used the pros and cons of the chosen option as positive and negative consequences of the decision outcome
* copied the pros and cons of the options from the meeting summary to the template 'as-is', thereby removing the 'Good, because ...' And 'Bad, because ...' texts


Task 2:

* immediately found the missing title header


### Tasks with extension

Task 1:

* opened the main webview of the extension using the command 'Open ADR Manager' and clicked on the 'Add ADR' button
* filled in the fields of the basic editor mode
* liked that the basic editor mode lets the user focus on the essential fields of an ADR, thereby not overloading the user
* entered arbitrary justification (was not given in the meeting summary)
* liked the basic editor mode to quickly create the basic structure of an ADR
* switched to the professional editor mode
* filled in remaining fields of the professional editor
* liked the overall functionality of the ADR editors
* copied all consequences into a single input field (including Markdown list markers), realized that each input field corresponds to a single list item and fixed the mistake
* noted that the 'X' to delete a list item should be consistent with the look and feel of the rest of the UI: rather use the trash bin icon for deleting list items
* created the new ADR in the correct subfolder
* conductor hinted at the missing pros and cons of the options, and that the options can be expanded
* expanded the options and added the pros and cons of the options
* confused about the information message upon saving the changes of an ADR
* did not expect to be able to open the raw Markdown file after saving changes, suggested that opening a rendered view of the Markdown file would be more practical as the need for raw Markdown would be diminished because of the tool


Task 2:

* conductor hinted at a bug that made it impossible for the participant to detect the issue with the ADR editor, instructed the participant to open the ADR with the VS Code Markdown editor
* opened the faulty MADR along with the rendered Markdown preview
* saw the issue by looking at the preview instead of the raw Markdown editor
* added the missing option using the ADR editor of the extension
* main webview: list overview of the ADRs may become too large in practice, suggested a tree-like structure where ADR directories can be collapsed and expanded (like in the file explorer of VS Code)
* also suggested a filtering option for the ADRs in the main webview for providing a quicker way to acces specific ADRs
* after the task, conductor pointed the linting features of the extension
* loved the linting feature


## Personal feedback for the VS Code Extension of the ADR Manager (free form)

* liked the extension very much
* thought that the extension really does bring value when managing ADRs
* said that the UI is good, efficient
* one could quickly work with the extension
* said they will use the extension in practice
* extension did not distract from the goal of documenting ADRs (unlike the raw Markdown editor with linting issues etc.)
* thought that extension could replace the need to write raw Markdown


## System Usability Scale

For each item in the System Usability Scale (SUS), choose a number from 1 to 5 where 1 stands for 'Strongly disagree' and 5 stands for 'Strongly agree'.

1. I think that I would like to use this system frequently: 5
2. I found the system unnecessarily complex: 1
3. I thought the system was easy to use: 4
4. I think that I would need the support of a technical person to be able to use this system: 1
5. I found the various functions in this system were well integrated: 4
6. I thought there was too much inconsistency in this system: 1
7. I would imagine that most people would learn to use this system very quickly: 5
8. I found the system very awkward to use: 1
9. I felt very confident using the system: 5
10. I needed to learn a lot of things before I could get going with this system: 1

