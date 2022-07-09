// Generated from src/plugins/parser/MADR.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { StartContext } from "./MADRParser";
import { TitleContext } from "./MADRParser";
import { StatusContext } from "./MADRParser";
import { DecidersContext } from "./MADRParser";
import { DateContext } from "./MADRParser";
import { TechnicalStoryContext } from "./MADRParser";
import { ContextAndProblemStatementContext } from "./MADRParser";
import { DecisionDriversContext } from "./MADRParser";
import { ConsideredOptionsContext } from "./MADRParser";
import { DecisionOutcomeContext } from "./MADRParser";
import { ProsAndConsOfOptionsContext } from "./MADRParser";
import { OptionSectionContext } from "./MADRParser";
import { ChosenOptionAndExplanationContext } from "./MADRParser";
import { PositiveConsequencesContext } from "./MADRParser";
import { NegativeConsequencesContext } from "./MADRParser";
import { OptionTitleContext } from "./MADRParser";
import { OptionDescriptionContext } from "./MADRParser";
import { ProlistContext } from "./MADRParser";
import { ConlistContext } from "./MADRParser";
import { LinksContext } from "./MADRParser";
import { ListContext } from "./MADRParser";
import { TextLineContext } from "./MADRParser";
import { MultilineTextContext } from "./MADRParser";
import { AnyContext } from "./MADRParser";
import { WslbContext } from "./MADRParser";
import { WslbsContext } from "./MADRParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `MADRParser`.
 */
export interface MADRListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `MADRParser.start`.
	 * @param ctx the parse tree
	 */
	enterStart?: (ctx: StartContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.start`.
	 * @param ctx the parse tree
	 */
	exitStart?: (ctx: StartContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.title`.
	 * @param ctx the parse tree
	 */
	enterTitle?: (ctx: TitleContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.title`.
	 * @param ctx the parse tree
	 */
	exitTitle?: (ctx: TitleContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.status`.
	 * @param ctx the parse tree
	 */
	enterStatus?: (ctx: StatusContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.status`.
	 * @param ctx the parse tree
	 */
	exitStatus?: (ctx: StatusContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.deciders`.
	 * @param ctx the parse tree
	 */
	enterDeciders?: (ctx: DecidersContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.deciders`.
	 * @param ctx the parse tree
	 */
	exitDeciders?: (ctx: DecidersContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.date`.
	 * @param ctx the parse tree
	 */
	enterDate?: (ctx: DateContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.date`.
	 * @param ctx the parse tree
	 */
	exitDate?: (ctx: DateContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.technicalStory`.
	 * @param ctx the parse tree
	 */
	enterTechnicalStory?: (ctx: TechnicalStoryContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.technicalStory`.
	 * @param ctx the parse tree
	 */
	exitTechnicalStory?: (ctx: TechnicalStoryContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.contextAndProblemStatement`.
	 * @param ctx the parse tree
	 */
	enterContextAndProblemStatement?: (ctx: ContextAndProblemStatementContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.contextAndProblemStatement`.
	 * @param ctx the parse tree
	 */
	exitContextAndProblemStatement?: (ctx: ContextAndProblemStatementContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.decisionDrivers`.
	 * @param ctx the parse tree
	 */
	enterDecisionDrivers?: (ctx: DecisionDriversContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.decisionDrivers`.
	 * @param ctx the parse tree
	 */
	exitDecisionDrivers?: (ctx: DecisionDriversContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.consideredOptions`.
	 * @param ctx the parse tree
	 */
	enterConsideredOptions?: (ctx: ConsideredOptionsContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.consideredOptions`.
	 * @param ctx the parse tree
	 */
	exitConsideredOptions?: (ctx: ConsideredOptionsContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.decisionOutcome`.
	 * @param ctx the parse tree
	 */
	enterDecisionOutcome?: (ctx: DecisionOutcomeContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.decisionOutcome`.
	 * @param ctx the parse tree
	 */
	exitDecisionOutcome?: (ctx: DecisionOutcomeContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.prosAndConsOfOptions`.
	 * @param ctx the parse tree
	 */
	enterProsAndConsOfOptions?: (ctx: ProsAndConsOfOptionsContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.prosAndConsOfOptions`.
	 * @param ctx the parse tree
	 */
	exitProsAndConsOfOptions?: (ctx: ProsAndConsOfOptionsContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.optionSection`.
	 * @param ctx the parse tree
	 */
	enterOptionSection?: (ctx: OptionSectionContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.optionSection`.
	 * @param ctx the parse tree
	 */
	exitOptionSection?: (ctx: OptionSectionContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.chosenOptionAndExplanation`.
	 * @param ctx the parse tree
	 */
	enterChosenOptionAndExplanation?: (ctx: ChosenOptionAndExplanationContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.chosenOptionAndExplanation`.
	 * @param ctx the parse tree
	 */
	exitChosenOptionAndExplanation?: (ctx: ChosenOptionAndExplanationContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.positiveConsequences`.
	 * @param ctx the parse tree
	 */
	enterPositiveConsequences?: (ctx: PositiveConsequencesContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.positiveConsequences`.
	 * @param ctx the parse tree
	 */
	exitPositiveConsequences?: (ctx: PositiveConsequencesContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.negativeConsequences`.
	 * @param ctx the parse tree
	 */
	enterNegativeConsequences?: (ctx: NegativeConsequencesContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.negativeConsequences`.
	 * @param ctx the parse tree
	 */
	exitNegativeConsequences?: (ctx: NegativeConsequencesContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.optionTitle`.
	 * @param ctx the parse tree
	 */
	enterOptionTitle?: (ctx: OptionTitleContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.optionTitle`.
	 * @param ctx the parse tree
	 */
	exitOptionTitle?: (ctx: OptionTitleContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.optionDescription`.
	 * @param ctx the parse tree
	 */
	enterOptionDescription?: (ctx: OptionDescriptionContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.optionDescription`.
	 * @param ctx the parse tree
	 */
	exitOptionDescription?: (ctx: OptionDescriptionContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.prolist`.
	 * @param ctx the parse tree
	 */
	enterProlist?: (ctx: ProlistContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.prolist`.
	 * @param ctx the parse tree
	 */
	exitProlist?: (ctx: ProlistContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.conlist`.
	 * @param ctx the parse tree
	 */
	enterConlist?: (ctx: ConlistContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.conlist`.
	 * @param ctx the parse tree
	 */
	exitConlist?: (ctx: ConlistContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.links`.
	 * @param ctx the parse tree
	 */
	enterLinks?: (ctx: LinksContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.links`.
	 * @param ctx the parse tree
	 */
	exitLinks?: (ctx: LinksContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.list`.
	 * @param ctx the parse tree
	 */
	enterList?: (ctx: ListContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.list`.
	 * @param ctx the parse tree
	 */
	exitList?: (ctx: ListContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.textLine`.
	 * @param ctx the parse tree
	 */
	enterTextLine?: (ctx: TextLineContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.textLine`.
	 * @param ctx the parse tree
	 */
	exitTextLine?: (ctx: TextLineContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.multilineText`.
	 * @param ctx the parse tree
	 */
	enterMultilineText?: (ctx: MultilineTextContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.multilineText`.
	 * @param ctx the parse tree
	 */
	exitMultilineText?: (ctx: MultilineTextContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.any`.
	 * @param ctx the parse tree
	 */
	enterAny?: (ctx: AnyContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.any`.
	 * @param ctx the parse tree
	 */
	exitAny?: (ctx: AnyContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.wslb`.
	 * @param ctx the parse tree
	 */
	enterWslb?: (ctx: WslbContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.wslb`.
	 * @param ctx the parse tree
	 */
	exitWslb?: (ctx: WslbContext) => void;

	/**
	 * Enter a parse tree produced by `MADRParser.wslbs`.
	 * @param ctx the parse tree
	 */
	enterWslbs?: (ctx: WslbsContext) => void;
	/**
	 * Exit a parse tree produced by `MADRParser.wslbs`.
	 * @param ctx the parse tree
	 */
	exitWslbs?: (ctx: WslbsContext) => void;
}

