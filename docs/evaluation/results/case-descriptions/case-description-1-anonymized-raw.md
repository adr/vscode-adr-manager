# Case Description 1 Anonymized Raw Data

## General (before tasks)

* Occupation/role: Professor for software quality and architecture
* Years of professional experience: 12 years
* Experience with ADRs:
  * How long have you used ADRs: 4 years
  * ADR formats used: only MADR, else text-based in free form
  * Experience in MADR: 4 years
  * Experience with ADR tooling: text editor
  * Experience with web-based ADR Manager: experience from the original ADR Manager study


## Task completion times

* Tasks without extension: 13 minutes 
* Tasks with extension: 14 minutes


## Observations while solving tasks

### Tasks without extension

Task 1:

* at first unsure where to create the new MADR, chose the correct subfolder in the end
* copied the existing MADR in the subfolder and replaced data with the given data from the summary file
* formulated context and problem statement in own words, said that the reason for the decision was not given
* used pros and cons to formulate the explanation of the chosen option (because an explanation was not given)
* used the professional MADR template to add additional fields that were not contained in the sample MADR
* copied pros and cons of the options directly from the summary file, reformatted to match the MADR format
* inspected professional MADR template for any missing fields, then noticed that status, date and deciders were missing and correctly added these fields to the new MADR

Task 2:

* noticed right away that the title heading is missing
* checked other fields for errors: commented that the pros and cons of the options were missing


### Tasks with extension

Task 1:

* confused at the second option to 'not use data', interpreted it as 'do nothing new'
* wanted to add the new MADR to the 'Marketing' subfolder, then added the new MADR to the 'IT' subfolder
* after clicking on the 'ADD ADR' button: on the main webview: unsure whether the option to choose the location to save the MADR, assumed that the choice will come up once the 'Create ADR' button will be clicked
* filled every field in the basic editor mode, did not need the help of tooltips, no problem with selecting the chosen option
* (redundantly) added pros to the explanation of the chosen option
* created a basic MADR, opened the newly created MADR and switched to the professional editor mode fill out other fields
* misread the date, conductor informed participant about this small mistake
* did not see decision drivers (there weren't any explicit drivers listed in the meeting summary), decided to derive decision drivers from positive consequences
* tried to enter two drivers in the same field, realized that each field is meant for one driver and fixed the mistake
* skipped the options and filled out positive and negative consequences first (by copy and pasting)
* noted that the structure of the summary file is beneficial for retrieving the required information
* realized that pros and cons of the options needed to be noted, had no problems with expanding each option and filling out the pros and cons (also by copy and pasting)
* noted that the process of filling out a MADR using raw Markdown as well as the editor modes feel intuitive if one knows where the data should be placed
* felt that the UI can be learned relatively quick

Task 2:

* opened the faulty MADR with the ADR editor from the extension in basic mode, sees a message that notifies about non-empty fields not shown in the basic editor mode: liked the message
* conductor noticed bug with the extension automatically adding an option that is not listed in the 'Considered Options' section, participant opens the file in raw Markdown
* saw that the 'Considered Options' section is not a list: only one option is listed
* did not notice the error underlined by the Markdown editor
* initially thought that the Chosen option is a syntax error, checks with the template and sees that it's formatted correctly
* thought that pros and cons are not present, conductor informs that options have their own lists for pros and cons
* conductor hinted at the red underlining, participant saw the error: pointed out that the error was implicitly detected by the participant (by not having multiple options in the 'Considered Options' list)
* thought that it was nice for the extension to explicitly mark the error
* noted that the inconsistency in the MADR led to inconsistencies in the extension: the sub-sub header for the 'non-existing' chosen option should also be marked as an error
* discussed alternatives of marking the MADR inconsistency in the extension, points out that this is tricky
* pointed out that a single considered option should also be an error as then there wouldn't be a need for a MADR
* thinks that showing the MADR inconsistency inside of the UI template would be better for template users


## Personal feedback for the VS Code Extension of the ADR Manager (free form)

* found that one can work quite well with the extension 
* thought that the extension was well integrated in the IDE
* understood the UI relatively quickly
* UI is graphically pleasing, modern and engaging
* found that drag & dropping, grabbing to rearrange items and icons like the edit icon (pen) have a native feel
* would still use raw Markdown to edit MADRs because it would be faster
* noted that the switch between the basic and professional editor modes was realized very well: very accessible, easy to find
* stated the previous compliment regarding the 'missing fields message' once more: said that it could be an advantage over raw Markdown 


## System Usability Scale

For each item in the System Usability Scale (SUS), choose a number from 1 to 5 where 1 stands for 'Strongly disagree' and 5 stands for 'Strongly agree'.

1. I think that I would like to use this system frequently: 4
2. I found the system unnecessarily complex: 1
3. I thought the system was easy to use: 4
4. I think that I would need the support of a technical person to be able to use this system: 1
5. I found the various functions in this system were well integrated: 4
6. I thought there was too much inconsistency in this system: 2
7. I would imagine that most people would learn to use this system very quickly: 4
8. I found the system very awkward to use: 1
9. I felt very confident using the system: 5
10. I needed to learn a lot of things before I could get going with this system: 1

