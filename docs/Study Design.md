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

The first phase of the study aims at acquiring the knowledge and skills necessary for this study.<br/>

**Goal**: At the end of this phase, there should not only be a concrete list of requirements that the future extension should satisfy, but also some rough ideas on how to implement these requirements using the VS Code Extension API and Typescript.

<br/>

## Learning Typescript / Basics of VS Code Extension Programming

Since working with the VS Code Extension API and programming in Typescript is mostly unfamiliar territory, the majority of the first weeks of this study is dedicated to learning the basics of programming a VS Code extension in Typescript as it's the core and the foundation of this study.<br/>

This is mostly done via "learning by doing", trying to implement several small extensions which use different parts of the Extension API in order to get a grasp of the workflow of programming an extension.<br/>

Some useful resources for this task are:

- [VS Code Extension API](https://code.visualstudio.com/api)
- [VS Code Extension Samples Repository](https://github.com/microsoft/vscode-extension-samples)
- Online Tutorials, e.g. Youtube,...
- Stack Overflow

<br/>

## Refreshing HCI Principles

An extension should make a specific task easier or more enjoyable for the user. But to maximize the satisfaction, an extension should also feel intuitive and be easy to use. That's why principles of Human-Computer interaction, especially those concerning the usability, also play a non-negligible role for this extension and should not be underestimated.<br/>

For this, knowledge about Human-Computer interaction from previous lectures need to be revised, and additional literature may be considered in order to decide what and how principles can be applied to this extension.

<br/>

## Analyzing the ADR Manager

Because this extension is based on the already existing [ADR Manager](https://github.com/adr/adr-manager), the core functionality of this extension should not differ too much from the original.<br/>

As such, the majority of the functional requirements will be extracted directly from the web-based tool as well as the study made on the ADR Manager, especially taking into account its evaluation results in order to incorporate the given feedback of the previous testers.<br/>

Because the environment in which this extension is used is different from the web-based application, further considerations have to be made for every functionality regarding its actual implementation: While some functions could be adapted (or even improved) with minimal adaptations, there might be requirements which need to be refactored to fit in the limitations of the Extension API; some functions may have to be omitted entirely because they are either unfeasible to implement or become obsolete in the IDE environment.<br/>

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

