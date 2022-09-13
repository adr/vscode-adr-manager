# Case Description 4 Anonymized Raw Data

## General (before tasks)

* Occupation/role: Scientific Assistant, PhD student
* Years of professional experience: 8 years
* Experience with ADRs
  * How long have you used ADRs: no practical experience, only theoretical
  * ADR formats used: Nygard's ADRs, MADR, Y-statements
  * Experience in MADR: no practical experience, only theoretical
  * Experience with ADR tooling: no practical experience, theoretical research on current tools
  * Experience with web-based ADR Manager: experience from the original ADR Manager study


**NOTE**: Participant was not familiar with VS Code, this was the first time using VS Code.

## Task completion times

* Tasks without extension: 15 minutes
* Tasks with extension: 12 minutes


## Observations while solving tasks

### Tasks without extension

Task 1:

* copied the basic template to the correct subfolder
* filled the basic template using the information given in the meeting summary using copy & paste
* added the names of the participants who suggested each option in the list of considered options
* used the positive arguments of the chosen option as the justification of the decision outcome
* gave the Markdown file the name 'YYYYMMDD_rnd meeting Documentation.md', where YYYYMMDD stands for the day that the evaluation took place, did not use ADR numbering
* accidentally discarded changes to the file by closing the file without saving. At the time, fields were still missing such as the pros and cons of the options and the metadata of the ADR (date, status, deciders)
* conductor instructs participant to move on to next task because the intention was already clear, no additional time was added (additional time as in the form of a 'penalty'), task completion time is thus skewed


Task 2:

* skimmed through the ADR, found no issue regarding the content
* conductor hinted at the type of issue, which is a formatting issue
* asked if it was necessary to know the structure of MADRs, conductor advised participant to open the professional template
* opened the professional template
* started to compare the template with the existing ADR
* conductor said that there is an issue with a mandatory field of a MADR
* found the missing title header and fixed the issue


### Tasks with extension

**NOTE**: As this was the first time using VS Code, the conductor gave the participant a quick introduction to the features of the extension and how they can be accessed in VS Code.

Task 1:

* used the 'Add ADR' button on the main webview of the extension to open the ADR editor of the extension
* switched to the Professional Editor of the extension
* started to type in the information of the information
* sets the status of the ADR as 'accepted' because it was not explicitly stated in the meeting summary
* said that it was good for the extension to highlight mandatory fields in red if there were values missing in them
* copied the context of the meeting summary to the 'Technical Story' field of the editor, conductor pointed out the mistake, participant did not see the input field for 'Context and Problem Statement' and corrected the mistake
* did not find any decision drivers in the meeting summary, used 'actual situation' as decision driver
* upon clicking on 'Add Option', the Webex overlay blocked the input field for the option name, resized the window
* added the two options from the meeting summary
* chose the correct option as decision outcome by clicking
* added the positive arguments of the option as justification for the decision outcome
* copied all positive consequences to a single input field, then separated the positive consequences and pasted every consequence in their own input field
* left the Markdown list marker in the input fields of the consequences
* created the ADR without adding the pros and cons of the options, conductor informed participant about these missing fields
* added the missing fields, saved the ADR
* found the workflow of creating ADRs logical and fitting for practical use



Task 2:

* conductor hinted at a bug that made it impossible for the participant to detect the issue with the ADR editor, instructed the participant to open the ADR with the VS Code Markdown editor
* immediately noticed that something is underlined in red
* saw that the chosen option is not in the list of the considered options, found that this feature helped to quickly identify the issue



## Personal feedback for the VS Code Extension of the ADR Manager (free form)

* participant preferred working with a graphical user interface, so they enjoyed working with the extension more than using the raw Markdown editor
* thought that the use of the extension may be considerably faster than writing raw Markdown if the user gets used to the extension
* liked that the extension is not limited to the IT domain, and that the extension could also be used for documenting all sorts of decisions
* participant found that it was easier to get into using the extension than to get into documenting ADRs using raw Markdown
* found the automatic input validation in the ADR editor and the linting features in the raw Markdown editor convenient


## System Usability Scale

For each item in the System Usability Scale (SUS), choose a number from 1 to 5 where 1 stands for 'Strongly disagree' and 5 stands for 'Strongly agree'.

1. I think that I would like to use this system frequently: 5
2. I found the system unnecessarily complex: 2
3. I thought the system was easy to use: 5
4. I think that I would need the support of a technical person to be able to use this system: 2
5. I found the various functions in this system were well integrated: 5
6. I thought there was too much inconsistency in this system: 1
7. I would imagine that most people would learn to use this system very quickly: 5
8. I found the system very awkward to use: 1
9. I felt very confident using the system: 4
10. I needed to learn a lot of things before I could get going with this system: 5

