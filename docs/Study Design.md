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
In an effort to make the verdict transparent, a short explanation (reason) for the verdict should also be documented in this scheme.

<br/>

| Title | Description | Type | Verdict | Reason |
| ----- | ----------- | ---- | ------- | ------ |
| Provide MADR template | Provide a MADR template such that the user only has to fill out relevant information | functional | keep as is | core functionality, minimal adaptation needed |
| GitHub integration | Enable users to push ADRs directly onto GitHub repositories | functional | drop | Support for version control systems already embedded in the workflow of using the IDE |
| ... |  |  |  | |


<br/>

For new requirements that are not implemented in the original ADR Manager, a similar scheme may be used, omitting the verdict but keeping the reason, changing its meaning to why the requirement should be considered.<br/>

To assess the quality of the requirements, external stakeholders, e.g. from the industry or academia should also be integrated in the process of requirements validation as multiple views on the same requirements may offer valuable insights.

The resulting list of requirements will be the basis of the design sketches and prototypes that will be created in the following phases of this study.

<br/>

# Design Phase 

TODO

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

