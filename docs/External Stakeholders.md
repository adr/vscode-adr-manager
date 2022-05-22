# External Stakeholders

For this Bachelor thesis study, there will be external stakeholders needed who will be incorporated multiple times throughout the study process. This document will briefly list requirements and tasks for external stakeholders.

<br/>

## Requirements

Since this Bachelor thesis revolves around Architectural Decision Records (ADRs), external stakeholders should already bring experience in working with ADRs, whether in the industrial or academic field. Since the experience with ADRs may vary between individual stakeholders, a short summary of how ADRs are understood in this study will be given to each external stakeholder such that everybody is on the same page moving on in this study.

For this study, knowledge about the use of the IDE [Visual Studio Code](https://code.visualstudio.com) (VS Code) is recommended as this thesis is about the integration of ADR management into VS Code in form of a VS Code extension. This includes the usage of VS Code commands, workspaces and version control systems in VS Code. In particular, external stakeholders should be able to use their version control system of their choice (e.g., [git](https://git-scm.com/), [svn](https://subversion.apache.org/) etc.) in VS Code.

<br/>

## Tasks

The following section briefly describes the tasks that an external stakeholders will be doing for this study, along with a rough time approximation for each task.

### Validation of elicited requirements

Before the actual development of the VS Code extension, a list of requirements will be elicited that the extension should implement.

These requirements should be evaluated iteratively by external stakeholders as well, giving feedback and commenting on if the elicited requirements are reasonable and needed, if there are any requirements missing etc.

This will be done asynchronously using a Google Docs Sheet (found [here](https://docs.google.com/spreadsheets/d/1jqxMSwVLYWOTZtjuJ9Ix26yQEV8KIrDDW062dvgHv1E/edit?usp=sharing)), primarily using comments whereby every external stakeholder will be given an extra sheet for organizational purposes. For each evaluation iteration, an estimated 15-30 minutes will be needed until a general consensus has been reached between everybody.

Note that although it would be beneficial, it is not absolutely required for every external stakeholder participating in this study to give feedback on the requirements due to the time constraints of this study.

<br/>

### Evaluating Prototype Sketches

Before implementing the prototype of the extension, several sketches will be made by using quick prototyping techniques such as paper sketches or similar in order to visualize how the verified requirements can be implemented in the extension.

These implementation ideas will also have to be evaluated based on criteria like plausibility,usefulness etc.

Ideally, this will take place in a synchronous meeting with some stakeholders where we will discuss the sketches. It is also sufficient that only some stakeholders will participate in this, 2-3 should be a good number to aim for. The plan is to briefly discuss the sketches in approximately 45 minutes to 1 hour, but no longer than 1.5 hours.

If a synchronous meeting cannot be arranged, then the discussion may also take place asynchronously similar to the process of requirements verification described above.

<br/>

### _Optional_: Evaluation of the fully functional prototype

After the requirements have been fully implemented, some external stakeholders may be invited to give feedback on the implementation, before moving on to the actual user evaluation where every external stakeholder will test the prototype thoroughly.

This will again take place in an online meeting where the prototype and its features will be briefly covered. External stakeholders then have the chance to give feedback about the prototype as a whole: Are the requirements implemented adequately? Can the prototype be used in an intuitive way in the IDE environment?

This meeting should take no longer than 1 hour.

This task is optional, but serves as a final chance to refine the prototype in order to further refine the prototype for the user evaluation.

<br/>

### Final user evaluation

After the prototype is fully functional and the requirements have been implemented, the external stakeholders will take place in the user evaluation.

Every external stakeholder will individually take place in synchronous online sessions where - after an introduction of themselves and the prototype itself - they have to solve a number of given tasks aimed at ADR management. Specifically, there will be tasks which will be done without the help of the prototype and tasks that will be solved with the help of the prototype so that the task completion times can be compared.

Afterwards, an interview about the prototype will be held, and the prototype will be rated by the participant. The participant will also have the chance to freely express their opinion about the prototype and whether the integration of ADR management into an IDE can be counted as a success.

The goal is that each session should take no longer than 1.5 hours.
