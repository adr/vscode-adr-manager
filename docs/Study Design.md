Study Design
=============

This markdown serves as a description of each phase listed in the timeline, laying out goals and methodology for each phase in the development of the extension.<br/>

The tasks detailed in each phase may be completed in parallel.

<br/>

Table of Contents
=================

1. [Preparation Phase](#preparation-phase)
2. [Design Phase](#design-phase)
3. [Refinement Phase](#refinement-phase)
4. [Evaluation Phase](#evaluation-phase)
5. [Analysis Phase](#analysis-phase)
6. [Correction Phase](#correction-phase)

<br/>

# Preparation Phase 

The first phase of the study aims at acquiring the knowledge and skills necessary for this study, mainly focussing on the acquisition of requirements for the extension.<br/>

**Goal**: At the end of this phase, there should not only be a concrete list of requirements that the future extension should satisfy, but also some rough ideas on how to implement these requirements using the VS Code Extension API and Typescript.

<br/>

## Analyzing the ADR Manager

Because this extension is based on the already existing [ADR Manager](https://github.com/adr/adr-manager), the core functionality of this extension should not differ too much from the original.<br/>

As such, the majority of the functional requirements will be extracted directly from the web-based tool as well as the study made on the ADR Manager, especially taking into account its evaluation results in order to incorporate the given feedback of the previous testers.<br/>

Because the environment in which this extension is used is different from the web-based application, further considerations have to be made for every functionality regarding its actual implementation: While some functions could be adapted (or even improved) with minimal adaptations, there might be requirements which need to be refactored to fit in the limitations of the Extension API; some functions may have to be omitted entirely because they are either unfeasible to implement or become obsolete in the IDE environment.<br/>
Due to the similarity between the web application and the extension, one may also identify parts of the ADR Manager that can be used as modules or libraries in the extension, as the code for the ADR Manager is written in Javascript and can thus easily be reused. This not only eases the workload of programming the extension, but also may help in maintaining the "feel" of the original web application when using the IDE extension.

To structure the requirements extracted from the original ADR Manager, a categorization scheme will be used which groups the different requirements based on the type of requirement, e.g. "functional", "non-functional" etc.. A verdict  will be added to each requirement, signalling how the requirement from the original ADR Manager will be adapted to the extension. Possible verdicts are "keep as is", "keep but modify" and "drop".<br/>
In an effort to make the verdict transparent, a short explanation (reason) for the verdict should also be documented in this scheme:

<br/>

| Title | Description | Type | Verdict | Reason |
| ----- | ----------- | ---- | ------- | ------ |
| Provide MADR template | Provide a MADR template such that the user only has to fill out relevant information | functional | keep as is | core functionality, minimal adaptation needed |
| GitHub integration | Enable users to push ADRs directly onto GitHub repositories | functional | drop | Support for version control systems already embedded in the workflow of using the IDE |
| ... |  |  |  | |

<i>Categorization scheme for extracted requirements</i>

<br/>

For new requirements that are not implemented in the original ADR Manager, a similar scheme may be used, omitting the verdict but keeping the reason, changing its meaning to why the requirement should be considered.<br/>

To assess the quality of the requirements, not only internal, but also external stakeholders, e.g. experts from the industry or academia, should be integrated in the process of requirements validation as multiple views on the same requirements may offer valuable insights.

The resulting list of requirements will be the basis of the design sketches and prototypes that will be created in the following phases of this study.

<br/>

# Design Phase 

This phase of the study targets the challenge of transforming the elicited requirements into a possible implementation within the context of a VS Code extension.<br/>
This process mostly has a creative character, starting from rough sketches (e.g. on paper, digital sketches etc.) and ending with a mock-up of the extension within VS Code itself.<br/>

**Goal**: At the end of this phase, a horizontal, high-fidelity prototype within VS Code should be ready for refinement in the next phase, i.e. the prototype should be able to display the whole breadth of functionality, but may not necessarily be fully implemented yet.

<br/>

## Design Process

For each requirement in the requirements list, the process will be as follows:<br/>

1. Assess alternatives to realize the particular requirement with the Extension API and Typescript
2. Create simple sketch in the form of a paper prototype or other comparable method according to "best"<sup>1</sup> implementation possibility
3. Implement mock-up of requirement in VS Code based on the sketch

<sup>1</sup> see next subsection for what makes a "good" alternative to realize a particular requirement

<br/>

### Assessing alternatives to realize requirements

When looking for different alternatives for implementing a requirement, there may be some alternatives that can be implemented more easily or that fulfill the requirement better than other alternatives. Following the KISS principle, the easier an alternative can be implemented (while still adequately fulfilling the requirement), the better an alternative is suited for realizing the requirement, and the more it should be prioritized over other alternatives.<br/>
Besides the complexity and the degree of fulfillment, the aspect of usability also plays a non-negligible role when comparing different alternatives: The user should be able to use the extension as a whole with minimal effort in order to achieve his goals.

For this, each alternative can be categorized into groups based on their suitability, e.g. "well suited", "moderately suited" and "not suited". Ideally, only an alternative from the category "well suited" would then be chosen to be sketched and implemented in the next steps.

<br/>

### Creating a simple sketch

To get a first visual impression of the chosen implementation, a rough sketch should be created in the form of a paper prototype or another form of prototype that can be done quickly and with minimal effort.<br/>
This serves not only as a guideline for the actual implementation, but also as the basis of discussing whether or not to proceed with the chosen alternative, since there has not been too much effort put into the implementation of the particular requirement at this stage of the process. 

<br/>

### Implement mock-up in VS Code

After the chosen alternative has been agreed upon, the alternative may be implemented as a mock-up in the real extension. The priority should herein be with realizing the user interface and establishing the workflow of using the particular function rather than the functionality itself as it may be more difficult to adjust the interface to the functionality rather than the other way around.

<br/>

At every point of this phase, discussions with internal and external stakeholders will be beneficial to generate feedback for the prototype before moving on to the next phase.

<br/>

# Refinement Phase

TODO

<br/>

# Evaluation Phase 

TODO

<br/>

# Analysis Phase 

TODO

<br/>

# Correction Phase 

TODO

