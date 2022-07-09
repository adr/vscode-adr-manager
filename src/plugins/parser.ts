import * as _ from "lodash";

import { MADRLexer } from "./parser/MADRLexer";
import {
	ChosenOptionAndExplanationContext,
	ConlistContext,
	ConsideredOptionsContext,
	ContextAndProblemStatementContext,
	DateContext,
	DecidersContext,
	DecisionDriversContext,
	LinksContext,
	MADRParser,
	NegativeConsequencesContext,
	OptionDescriptionContext,
	OptionTitleContext,
	PositiveConsequencesContext,
	ProlistContext,
	StatusContext,
	TechnicalStoryContext,
	TitleContext,
} from "./parser/MADRParser";
import { MADRListener } from "./parser/MADRListener";
import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import { ArchitecturalDecisionRecord } from "./classes";
import { createShortTitle, naturalCase2titleCase } from "./utils";
import { CharStreams } from "antlr4ts/CharStreams";
import { CommonTokenStream } from "antlr4ts/CommonTokenStream";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";

/**
 * Creates an ADR from a ParseTree by listening to a ParseTreeWalker.
 *
 * Use with '''antlr4.tree.ParseTreeWalker.DEFAULT.walk(generator, parseTree);'''
 * The parsed ADR is saved in the attribute 'adr'.
 *
 * Local variables:
 *
 * - currentOption: The current option, either the considered one or the current one handled at "Pros and Cons of the Options"
 */
class MADRGenerator implements MADRListener {
	adr: ArchitecturalDecisionRecord;
	currentOption: { title: string; description: string; pros: string[]; cons: string[]; id: number } | null;

	constructor() {
		this.adr = new ArchitecturalDecisionRecord();
		this.currentOption = null;
	}

	enterTitle(ctx: TitleContext) {
		this.adr.title = naturalCase2titleCase(ctx.textLine().text);
	}

	enterStatus(ctx: StatusContext) {
		this.adr.status = ctx.textLine().text;
	}

	enterDeciders(ctx: DecidersContext) {
		this.adr.deciders = ctx.textLine().text;
	}

	enterDate(ctx: DateContext) {
		this.adr.date = ctx.textLine().text;
	}

	enterTechnicalStory(ctx: TechnicalStoryContext) {
		this.adr.technicalStory = ctx.textLine().text;
	}

	enterContextAndProblemStatement(ctx: ContextAndProblemStatementContext) {
		this.adr.contextAndProblemStatement = ctx.multilineText().text;
	}

	enterDecisionDrivers(ctx: DecisionDriversContext) {
		this.addListItemsFromListToList(ctx.list(), this.adr.decisionDrivers);
	}

	enterConsideredOptions(ctx: ConsideredOptionsContext) {
		let tmpOptionList: string[] = [];
		this.addListItemsFromListToList(ctx.list(), tmpOptionList);
		tmpOptionList.forEach((opt) => {
			if (opt.trim() !== "") {
				this.adr.addOption({ title: opt, description: "", pros: [], cons: [] });
			}
		});
	}

	/**
	 * Handles "Decision outcome"
	 */
	enterChosenOptionAndExplanation(ctx: ChosenOptionAndExplanationContext) {
		let rawDecisionOutcome = ctx.multilineText().text;

		if (rawDecisionOutcome.startsWith("Chosen option: ")) {
			const decisionArray: string[] = rawDecisionOutcome.split(/, because */);
			decisionArray[0] = decisionArray[0].substring("Chosen option: ".length).trim(); // Remove 'Chosen option: '
			let delim = decisionArray[0].charAt(0);
			let chosenOption = "";

			if (delim === decisionArray[0].charAt(decisionArray[0].length - 1)) {
				chosenOption = decisionArray[0].substring(1, decisionArray[0].length - 1);
			} else {
				chosenOption = decisionArray[0];
			}
			let explanation = decisionArray.slice(1).join();
			this.adr.decisionOutcome.chosenOption = chosenOption;
			this.adr.decisionOutcome.explanation = explanation.trim();
		} else {
			console.log("Couldn't find chosen option.");
		}
	}

	enterPositiveConsequences(ctx: PositiveConsequencesContext) {
		this.addListItemsFromListToList(ctx.list(), this.adr.decisionOutcome.positiveConsequences);
	}

	enterNegativeConsequences(ctx: NegativeConsequencesContext) {
		this.addListItemsFromListToList(ctx.list(), this.adr.decisionOutcome.negativeConsequences);
	}

	/**
	 * Header after "Pros and Cons of the Options"
	 */
	enterOptionTitle(ctx: OptionTitleContext) {
		let title = ctx.textLine().text;
		this.currentOption = this.getMostSimilarOptionTo(title);
		if (!this.currentOption) {
			// No matching option found?
			// Create a new one (otherwise the content of the pro/con list will get missing)
			this.currentOption = this.adr.addOption({ title: title, description: "", pros: [], cons: [] });
		}
	}

	enterOptionDescription(ctx: OptionDescriptionContext) {
		if (this.currentOption) {
			this.currentOption.description = ctx.multilineText().text;
		}
	}

	enterProlist(ctx: ProlistContext) {
		if (this.currentOption) {
			this.addListItemsFromListToList(ctx, this.currentOption.pros);
		}
	}

	enterConlist(ctx: ConlistContext) {
		if (this.currentOption) {
			this.addListItemsFromListToList(ctx, this.currentOption.cons);
		}
	}

	enterLinks(ctx: LinksContext) {
		this.addListItemsFromListToList(ctx.list(), this.adr.links);
	}
	/**
	 *
	 * @param {string} optTitle the title in the "Chosen option" part
	 */
	getMostSimilarOptionTo(optTitle: string) {
		// Find the option with a very similar title.
		let opt = this.adr.consideredOptions.find((opt) => {
			this.matchOptionTitleAlmostExactly(opt.title, optTitle);
		}, this);
		if (opt) {
			// If a fitting option was found, return it.
			return opt;
		}
		// Else check if there is another (less) similar title.
		opt = this.adr.consideredOptions.find(function (opt) {
			return matchOptionTitleMoreRelaxed(opt.title, optTitle);
		}, this);
		if (opt) {
			// If a fitting option was found, return it.
			return opt;
		}
		// just set the option to not found
		return null;
	}

	/**
	 * Option titles are similar, iff they are equal after
	 *  (1) removing all white spaces
	 *  (2) lower-casing them.
	 *
	 * @param {string} optTitle1
	 * @param {string} optTitle2
	 * @returns {boolean} True, iff the option titles are very similar.
	 */
	matchOptionTitleAlmostExactly(optTitle1: string, optTitle2: string): boolean {
		let trimmed1 = optTitle1.replace(/ /g, "").toLowerCase(); // Remove whitespaces and lower-case heading
		let trimmed2 = optTitle2.replace(/ /g, "").toLowerCase();
		return trimmed1 === trimmed2;
	}

	/**
	 *
	 * @param {} parseTreeList - a list node in the parse tree.
	 * @param {string[]} targetList - a js array, where each list entry is copied into.
	 */
	addListItemsFromListToList(parseTreeList: ParserRuleContext, targetList: string[]) {
		if (parseTreeList === undefined) {
			return;
		}
		for (let i = 0; i < parseTreeList.childCount; i++) {
			if (
				parseTreeList.getChild(i).text &&
				parseTreeList
					.getChild(i)
					.text.replace("*", "")
					.replace(/^((Good)|(Bad)), because/, "")
					.trim() !== ""
			) {
				targetList.push(parseTreeList.getChild(i).text);
			}
		}
	}
}

/**
 * Converts a markdown into a MADR object.
 * @param {string} md
 * @returns {ArchitecturalDecisionRecord}
 */
export function md2adr(md: string): ArchitecturalDecisionRecord {
	const chars = CharStreams.fromString(md);
	const lexer = new MADRLexer(chars);
	const tokens = new CommonTokenStream(lexer);
	const parser = new MADRParser(tokens);
	parser.buildParseTree = true;
	parser.removeErrorListeners();

	const tree = parser.start(); // 'start' is the name of the starting rule.
	// console.log('Created Parse Tree! ', tree)
	const printer = new MADRGenerator();
	ParseTreeWalker.DEFAULT.walk(printer as MADRListener, tree);
	// console.log("Result ADR ", printer.adr);
	printer.adr.cleanUp();
	return printer.adr;
}

export function adr2md(adrToParse: ArchitecturalDecisionRecord) {
	let adr = _.cloneDeep(adrToParse);
	adr.cleanUp();
	var md = "# " + adr.title + "\n";

	if ((adr.status !== "" && adr.status !== "null") || adr.deciders.length > 0 || adr.date !== "") {
		if (adr.status !== "" && adr.status !== "null") {
			md = md.concat("\n* Status: " + adr.status.trim());
		}
		if (adr.deciders.length > 0) {
			md = md.concat("\n* Deciders: " + adr.deciders);
		}
		if (adr.date !== "") {
			md = md.concat("\n* Date: " + adr.date);
		}
		md = md.concat("\n");
	}

	if (adr.technicalStory !== "") {
		md = md.concat("\nTechnical Story: " + adr.technicalStory + "\n");
	}

	if (adr.contextAndProblemStatement !== "") {
		md = md.concat("\n## Context and Problem Statement\n\n" + adr.contextAndProblemStatement + "\n");
	}

	if (adr.decisionDrivers.length > 0) {
		md = md.concat("\n## Decision Drivers\n\n");
		for (let i in adr.decisionDrivers) {
			md = md.concat("* " + adr.decisionDrivers[i] + "\n");
		}
	}

	if (adr.consideredOptions.length > 0) {
		md = md.concat("\n## Considered Options\n\n");
		md = adr.consideredOptions.reduce(
			(total: string, opt: { title: string; description: string; pros: string[]; cons: string[] }) =>
				total + "* " + opt.title + "\n",
			md
		);
	}

	md = md.concat('\n## Decision Outcome\n\nChosen option: "' + adr.decisionOutcome.chosenOption);

	if (adr.decisionOutcome.explanation.trim() !== "") {
		let isList = adr.decisionOutcome.explanation.trim().match(/^[*-+]/);
		if (isList) {
			md = md.concat('", because\n\n' + adr.decisionOutcome.explanation + "\n");
		} else {
			md = md.concat('", because ' + adr.decisionOutcome.explanation + "\n");
		}
	} else {
		md = md.concat('"\n');
	}

	if (adr.decisionOutcome.positiveConsequences.length > 0) {
		md = md.concat("\n### Positive Consequences\n\n");
		md = adr.decisionOutcome.positiveConsequences.reduce(
			(total: string, con: string) => total + "* " + con + "\n",
			md
		);
	}
	if (adr.decisionOutcome.negativeConsequences.length > 0) {
		md = md.concat("\n### Negative Consequences\n\n");
		md = adr.decisionOutcome.negativeConsequences.reduce(
			(total: string, con: string) => total + "* " + con + "\n",
			md
		);
	}

	if (
		adr.consideredOptions.some(
			(opt: { title: string; description: string; pros: string[]; cons: string[] }) =>
				opt.description !== "" || opt.pros.length > 0 || opt.cons.length > 0
		)
	) {
		md = md.concat("\n## Pros and Cons of the Options\n");
		md = adr.consideredOptions.reduce(
			(total: string, opt: { title: string; description: string; pros: string[]; cons: string[] }) => {
				if (opt.description !== "" || opt.pros.length > 0 || opt.cons.length > 0) {
					let res = total.concat("\n### " + createShortTitle(opt.title) + "\n");
					if (opt.description !== "") {
						res = res.concat("\n" + opt.description + "\n");
					}
					res = opt.pros.reduce((total, arg) => total.concat("\n* Good, because " + arg), res);
					res = opt.cons.reduce((total, arg) => total.concat("\n* Bad, because " + arg), res);
					if (opt.pros.length > 0 || opt.cons.length > 0) {
						// insert final new line
						res = res + "\n";
					}
					return res;
				} else {
					return total;
				}
			},
			md
		);
	}
	if (adr.links.length > 0) {
		md = md.concat("\n## Links\n\n");
		md = adr.links.reduce((total: string, link: string) => total + "* " + link + "\n", md);
	}
	return md;
}

/**
 * Option titles are similar, iff
 *  a) they are equal after
 *    (1) removing all white spaces
 *    (2) lower-casing them
 * or
 *   b) one of these normalized titles is a prefix of the other title.
 * or
 *   c) the chosen option is a sub title of the given option
 *
 * @param {string} titleFromOptionList
 * @param {string} titleFromChosenOption
 * @returns {boolean} True, iff the option titles are similar
 */
export function matchOptionTitleMoreRelaxed(titleFromOptionList: string, titleFromChosenOption: string): boolean {
	let trimmedTitleFromOptionList = titleFromOptionList.replace(/ /g, "").toLowerCase(); // Remove whitespaces and lower-case heading
	let trimmedTitleFromChosenOption = titleFromChosenOption.replace(/ /g, "").toLowerCase();
	let res =
		trimmedTitleFromOptionList === trimmedTitleFromChosenOption ||
		trimmedTitleFromOptionList.startsWith(trimmedTitleFromChosenOption) ||
		trimmedTitleFromChosenOption.startsWith(trimmedTitleFromOptionList) ||
		titleFromChosenOption === createShortTitle(titleFromOptionList) ||
		// in case we have issues with the short title generation, we at least check for a match of the first letters
		// Example: "Include in [adr-tools](https://github.com/npryce/adr-tools), 924 stars as of 2018-06-14", we currently don't strip ", ..."
		createShortTitle(titleFromOptionList).startsWith(titleFromChosenOption);
	return res;
}
