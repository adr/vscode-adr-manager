# Study Design

This markdown serves as a description of each phase listed in the timeline, laying out goals and methodology for each phase in the development of the extension.

The tasks detailed in each phase may be completed in parallel.

<br/>

# Table of Contents

1. [Preparation Phase](#preparation-phase)
2. [Design Phase](#design-phase)
3. [Refinement Phase](#refinement-phase)
4. [Evaluation Phase](#evaluation-phase)
5. [Analysis Phase](#analysis-phase)
6. [Correction Phase](#correction-phase)

<br/>

# Preparation Phase 

The first phase of the study aims at acquiring the knowledge and skills necessary for this study, mainly focussing on the acquisition of requirements for the extension.

**Goal**: At the end of this phase, there should not only be a concrete list of requirements that the future extension should satisfy, but also some rough ideas on how to implement these requirements using the VS Code Extension API and Typescript.

<br/>

## Analyzing the ADR Manager

Because this extension is based on the already existing [ADR Manager](https://github.com/adr/adr-manager), the core functionality of this extension should not differ too much from the original.

As such, the majority of the functional requirements will be extracted directly from the web-based tool as well as the study made on the ADR Manager, especially taking into account its evaluation results in order to incorporate the given feedback of the previous testers.

Because the environment in which this extension is used is different from the web-based application, further considerations have to be made for every functionality regarding its actual implementation: While some functions could be adapted (or even improved) with minimal adaptations, there might be requirements which need to be refactored to fit in the limitations of the Extension API; some functions may have to be omitted entirely because they are either unfeasible to implement or become obsolete in the IDE environment.<br/>
Due to the similarity between the web application and the extension, one may also identify parts of the ADR Manager that can be used as modules or libraries in the extension, as the code for the ADR Manager is written in Javascript and can thus easily be reused. This not only eases the workload of programming the extension, but also may help in maintaining the "feel" of the original web application when using the IDE extension.

To structure the requirements extracted from the original ADR Manager, a categorization scheme will be used which groups the different requirements based on the type of requirement, e.g., "functional", "non-functional" etc.. A verdict  will be added to each requirement, signalling how the requirement from the original ADR Manager will be adapted to the extension. Possible verdicts are "keep as is", "keep but modify" and "drop".<br/>
In an effort to make the verdict transparent, a short explanation (reason) for the verdict should also be documented in this scheme:

<br/>

| Title | Description | Type | Verdict | Reason |
| ----- | ----------- | ---- | ------- | ------ |
| Provide MADR template | Provide a MADR template such that the user only has to fill out relevant information | functional | keep as is | core functionality, minimal adaptation needed |
| GitHub integration | Enable users to push ADRs directly onto GitHub repositories | functional | drop | Support for version control systems already embedded in the workflow of using the IDE |
| ... |  |  |  | |

<i>Categorization scheme for extracted requirements.</i>

<br/>

For new requirements that are not implemented in the original ADR Manager, a similar scheme may be used, omitting the verdict but keeping the reason, changing its meaning to why the requirement should be considered.

To assess the quality of the requirements, not only internal, but also external stakeholders, e.g., experts from the industry or academia, should be integrated in the process of requirements validation as multiple views on the same requirements may offer valuable insights.

The resulting list of requirements will be the basis of the design sketches and prototypes that will be created in the following phases of this study.

<br/>

# Design Phase 

This phase of the study targets the challenge of transforming the elicited requirements into a possible implementation within the context of a VS Code extension.

This process mostly has creative character, starting from rough sketches (e.g., on paper, digital sketches etc.) and ending with a mock-up of the extension within VS Code itself.

At every point of this phase, discussions with internal and external stakeholders will be beneficial to generate feedback for the prototype before moving on to the next phase.

**Goal**: At the end of this phase, a horizontal, high-fidelity prototype within VS Code should be ready for refinement in the next phase, i.e., the prototype should be able to display the whole breadth of functionality, but may not necessarily be fully implemented yet.

<br/>

## Design Process

For each requirement in the requirements list, the process will be as follows:

1. Assess alternatives to realize the particular requirement with the Extension API and Typescript
2. Create simple sketch in the form of a paper prototype or other comparable method according to "best"<sup>1</sup> implementation possibility
3. Implement mock-up of requirement in VS Code based on the sketch

<sup>1</sup> see next subsection for what makes a "good" alternative to realize a particular requirement

<br/>

### Assessing alternatives to realize requirements

When looking for different alternatives for implementing a requirement, there may be some alternatives that can be implemented more easily or that fulfill the requirement better than other alternatives. Following the KISS principle, the easier an alternative can be implemented (while still adequately fulfilling the requirement), the better an alternative is suited for realizing the requirement, and the more it should be prioritized over other alternatives.<br/>
Besides the complexity and the degree of fulfillment, the aspect of usability also plays a non-negligible role when comparing different alternatives: The user should be able to use the extension as a whole with minimal effort in order to achieve his goals.

For this, each alternative can be categorized into groups based on their suitability, e.g., "well suited", "moderately suited" and "not suited". Ideally, only an alternative from the category "well suited" would then be chosen to be sketched and implemented in the next steps.

<br/>

### Creating a simple sketch

To get a first visual impression of the chosen implementation, a rough sketch should be created in the form of a paper prototype or another form of prototype that can be done quickly and with minimal effort.<br/>
This serves not only as a guideline for the actual implementation, but also as the basis of discussing whether or not to proceed with the chosen alternative, since there has not been too much effort put into the implementation of the particular requirement at this stage of the process. 

<br/>

### Implement mock-up in VS Code

After the chosen alternative has been agreed upon, the alternative may be implemented as a mock-up in the real extension. The priority should herein be with realizing the user interface and establishing the workflow of using the particular function rather than the functionality itself as it may be more difficult to adjust the interface to the functionality rather than the other way around.

<br/>

A block diagram according to the [Fundamental Modeling Concepts](http://www.fmc-modeling.org/home) may be suitable for documenting the architecture of the extension.

<br/>

# Refinement Phase

In this phase of the study, the functionality of the prototype will be implemented in an iterative rapid prototyping approach to quickly generate feedback and continuously improving the prototype into a functional extension.

**Goal**: At the end of this phase, the extension should be matured enough so that it is ready for user evaluation in the next phase, i.e., every requirement should be realized by the extension.

<br/>

## Iterative Prototyping

The aim of this prototyping approach is to gain adequate feedback for each functional implementation of a requirement, based on which the extension can be further improved. Ideally, there should be at least one meeting with internal stakeholders (i.e., the supervisor) per implemented requirement such that in every meeting, the feedback will be specifically directed at the newly implemented requirement.

While external stakeholders would also bring invaluable insights on the prototypes, the frequency of prototype evaluations may not be as high as with internal stakeholders due to different scopes of feedback: While it is more feasible for internal stakeholders to give feedback about the implementation in detail, the feel of the extension as a whole should be the focus of an external stakeholder, as they may not know every technical and theoretical aspect of the extension. Additionally, difficulties in scheduling meetings may not allow a high frequency either way.

<br/>

# Evaluation Phase 

With the extension being fully implemented, a number of external testers will now be invited to conduct an online user evaluation for the extension. The generated feedback will then be analyzed and used to further adjust and improve the extension. 

**Goal**: At the end of this phase, the user evaluation sould be conducted succesfully and raw feedback data should be available and ready for analyzing.

For the evaluation process, a document stating the general structure and purpose of the evaluation will be created and be made available. This document will also contain a privacy policy which the potential participants will have to agree upon before participating in this evaluation. The evaluation process will take place in real time using an online video conference tool, i.e., Webex, which will be recorded for analysis purposes only, after which they will be deleted immediately. Furthermore, each participant will also be given an ID at random for anonymization purposes.

For each participant, the evaluation consists of four parts: 

1. Introduction of the participant, i.e., their background, experience in the field, experience in using ADRs etc.
2. Short introduction to the extension and its functionalities
3. Solving a number of given tasks using the extension
4. Interview with the participant about using the extension

<br/>

## Solving Tasks

The participants are given tasks which are divided into smaller steps that can be followed to complete a given task. Each step should be abstract enough such that participants have to come up with a solution for that particular step on their own, i.e., it should not be a step-by-step guide to solve a task. On the other hand, the steps should not be too big to avoid overwhelming the participants, so that the participants can focus on one direction at a time.<br/>
The tasks should, in combination, cover most of the extension's functionality.

While solving the tasks, the participants will be encouraged to "think aloud", meaning to voice their thoughts while navigating the extension. These thought processes can then be used to analyze how the extension is perceived at first glance and thus aid in improving the extension.

The conductors of this evaluation will try to avoid intervening during this process; only if a participant is stuck at a step for a given amount of time, hints will be given out by the conductors in order to progress the evaluation.

<br/>

## Interviewing the participants

After the participants have solved the given tasks, they are asked to give feedback, mainly in form of the [System Usability Scale](http://www.tbistafftraining.info/smartphones/documents/b5_during_the_trial_usability_scale_v1_09aug11.pdf) (SUS), developed by John Brooke in 1996. The SUS is used to assess the perceived usability of the extension with regard to the given tasks.

Afterwards, participants are also welcome to freely voice their opinion and suggestions about the extension and to give a final verdict on whether they would use this extension in their day-to-day work or, if not, what it would take to convince them of this extension.

<br/>

# Analysis Phase 

TODO

<br/>

# Correction Phase 

TODO
