grammar MADR;

start:
	(yaml wslbs)? HEADING_PREFIX title NEWLINE wslbs (CONTEXT_AND_PROBLEM_STATEMENT wslbs)? (
		NEWLINE contextAndProblemStatement wslbs
	)? (
		DECISION_DRIVERS_HEADING (WS OPTIONAL_MAKER)? wslbs decisionDrivers wslbs
	)? (CONSIDERED_OPTIONS_HEADING wslbs consideredOptions wslbs)? (
		DECISION_OUTCOME_HEADING wslbs decisionOutcome wslbs
	)? (
		PROS_AND_CONS_OF_THE_OPTIONS_HEADING (WS OPTIONAL_MAKER)? wslbs prosAndConsOfOptions wslbs
	)? (MORE_INFORMATION_HEADING (WS OPTIONAL_MAKER)? wslbs moreInformation wslbs)? EOF;

yaml: YAML_MARKER multilineText YAML_MARKER;

title: textLine;

contextAndProblemStatement: multilineText;

decisionDrivers: list;

consideredOptions: list;

decisionOutcome:
	wslbs chosenOptionAndExplanation (
		wslbs CONSEQUENCES_HEADING (WS OPTIONAL_MAKER)? consequences
	)? (
		wslbs CONFIRMATION_HEADING (WS OPTIONAL_MAKER)? confirmation
	)?;

prosAndConsOfOptions: (optionSection wslbs)+;

optionSection:
	SUBSUBHEADING_PREFIX optionTitle NEWLINE (
		wslbs optionDescription
	)? (wslbs argumentList)?;

chosenOptionAndExplanation: multilineText;
consequences: list;
confirmation: multilineText;

optionTitle: textLine;
optionDescription: multilineText;
argumentList: (wslbs LIST_MARKER ('Good, because ' | 'Neutral, because ' | 'Bad, because ') textLine)+;

moreInformation: multilineText;

list: (wslbs LIST_MARKER textLine?)+;

textLine: (any | WS)+?;

multilineText: (any | wslb)+?; // Any (possibly multi-line) text

any: (
		WORD
		| CHARACTER
		| LIST_MARKER
		| HEADING_PREFIX
		| SUBSUBSUBHEADING_PREFIX
		| YAML_MARKER
	);

wslb: ( WS | NEWLINE);
wslbs: wslb*;

/// Tokenization / Lexer rules

WORD: CHARACTER+;
CHARACTER: (~[\n\t\r\f ]);

WS: [\f\t ]; // White Space
NEWLINE: [\r]? [\n]; // Line Breaks

LIST_MARKER: NEWLINE ('* ' | '- ');
OPTIONAL_MAKER: '<!-- optional -->';
YAML_MARKER: '---' NEWLINE;

HEADING_PREFIX: '# '; // Start of a Heading
SUBSUBHEADING_PREFIX:
	NEWLINE '### '; // Start of a Sub sub heading (e. g. an option section)
SUBSUBSUBHEADING_PREFIX: '###' '#'+ ' ';
// Start of a sub sub sub heading (no special meaning, should be accepted in multiline text)

// Headings
CONTEXT_AND_PROBLEM_STATEMENT:
	NEWLINE (
		'## Context And Problem Statement'
		| '## Context and Problem Statement'
		| '## Context and problem statement'
		| '## context and problem statement'
	);
DECISION_DRIVERS_HEADING:
	NEWLINE (
		'## Decision Drivers'
		| '## Decision drivers'
		| '## decision drivers'
	);
CONSIDERED_OPTIONS_HEADING:
	NEWLINE (
		'## Considered Options'
		| '## Considered options'
		| '## considered options'
	);
DECISION_OUTCOME_HEADING:
	NEWLINE (
		'## Decision Outcome'
		| '## Decision outcome'
		| '## decision outcome'
	);
CONSEQUENCES_HEADING:
	NEWLINE (
		'### Consequences'
		| '### consequences'
	);
CONFIRMATION_HEADING:
	NEWLINE (
		'### Confirmation'
		| '### confirmation'
	);
PROS_AND_CONS_OF_THE_OPTIONS_HEADING:
	NEWLINE (
		'## Pros and Cons of the Options'
		| '## Pros and cons of the options'
		| '## pros and cons of the options'
	);
MORE_INFORMATION_HEADING:
	NEWLINE (
		'## More Information'
		| '## More information'
		| '## more information'
	);
