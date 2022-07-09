// Generated from src/plugins/parser/MADR.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { MADRListener } from "./MADRListener";

export class MADRParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly WORD = 3;
	public static readonly CHARACTER = 4;
	public static readonly WS = 5;
	public static readonly NEWLINE = 6;
	public static readonly LIST_MARKER = 7;
	public static readonly STATUS_MARKER = 8;
	public static readonly DATE_MARKER = 9;
	public static readonly DECIDERS_MARKER = 10;
	public static readonly OPTIONAL_MAKER = 11;
	public static readonly TECHNICAL_STORY_MARKER = 12;
	public static readonly HEADING_PREFIX = 13;
	public static readonly SUBSUBHEADING_PREFIX = 14;
	public static readonly SUBSUBSUBHEADING_PREFIX = 15;
	public static readonly CONTEXT_AND_PROBLEM_STATEMENT = 16;
	public static readonly DECISION_DRIVERS_HEADING = 17;
	public static readonly CONSIDERED_OPTIONS_HEADING = 18;
	public static readonly DECISION_OUTCOME_HEADING = 19;
	public static readonly POSITIVE_CONSEQUENCES_HEADING = 20;
	public static readonly NEGATIVE_CONSEQUENCES_HEADING = 21;
	public static readonly PROS_AND_CONS_OF_THE_OPTIONS_HEADING = 22;
	public static readonly LINKS_HEADING = 23;
	public static readonly RULE_start = 0;
	public static readonly RULE_title = 1;
	public static readonly RULE_status = 2;
	public static readonly RULE_deciders = 3;
	public static readonly RULE_date = 4;
	public static readonly RULE_technicalStory = 5;
	public static readonly RULE_contextAndProblemStatement = 6;
	public static readonly RULE_decisionDrivers = 7;
	public static readonly RULE_consideredOptions = 8;
	public static readonly RULE_decisionOutcome = 9;
	public static readonly RULE_prosAndConsOfOptions = 10;
	public static readonly RULE_optionSection = 11;
	public static readonly RULE_chosenOptionAndExplanation = 12;
	public static readonly RULE_positiveConsequences = 13;
	public static readonly RULE_negativeConsequences = 14;
	public static readonly RULE_optionTitle = 15;
	public static readonly RULE_optionDescription = 16;
	public static readonly RULE_prolist = 17;
	public static readonly RULE_conlist = 18;
	public static readonly RULE_links = 19;
	public static readonly RULE_list = 20;
	public static readonly RULE_textLine = 21;
	public static readonly RULE_multilineText = 22;
	public static readonly RULE_any = 23;
	public static readonly RULE_wslb = 24;
	public static readonly RULE_wslbs = 25;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"start", "title", "status", "deciders", "date", "technicalStory", "contextAndProblemStatement", 
		"decisionDrivers", "consideredOptions", "decisionOutcome", "prosAndConsOfOptions", 
		"optionSection", "chosenOptionAndExplanation", "positiveConsequences", 
		"negativeConsequences", "optionTitle", "optionDescription", "prolist", 
		"conlist", "links", "list", "textLine", "multilineText", "any", "wslb", 
		"wslbs",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'Good, because '", "'Bad, because '", undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, "'<!-- optional -->'", 
		undefined, "'# '",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, "WORD", "CHARACTER", "WS", "NEWLINE", 
		"LIST_MARKER", "STATUS_MARKER", "DATE_MARKER", "DECIDERS_MARKER", "OPTIONAL_MAKER", 
		"TECHNICAL_STORY_MARKER", "HEADING_PREFIX", "SUBSUBHEADING_PREFIX", "SUBSUBSUBHEADING_PREFIX", 
		"CONTEXT_AND_PROBLEM_STATEMENT", "DECISION_DRIVERS_HEADING", "CONSIDERED_OPTIONS_HEADING", 
		"DECISION_OUTCOME_HEADING", "POSITIVE_CONSEQUENCES_HEADING", "NEGATIVE_CONSEQUENCES_HEADING", 
		"PROS_AND_CONS_OF_THE_OPTIONS_HEADING", "LINKS_HEADING",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(MADRParser._LITERAL_NAMES, MADRParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return MADRParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "MADR.g4"; }

	// @Override
	public get ruleNames(): string[] { return MADRParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return MADRParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(MADRParser._ATN, this);
	}
	// @RuleVersion(0)
	public start(): StartContext {
		let _localctx: StartContext = new StartContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, MADRParser.RULE_start);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 52;
			this.match(MADRParser.HEADING_PREFIX);
			this.state = 53;
			this.title();
			this.state = 54;
			this.match(MADRParser.NEWLINE);
			this.state = 55;
			this.wslbs();
			this.state = 64;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === MADRParser.STATUS_MARKER) {
				{
				this.state = 56;
				this.match(MADRParser.STATUS_MARKER);
				this.state = 57;
				this.status();
				this.state = 60;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 0, this._ctx) ) {
				case 1:
					{
					this.state = 58;
					this.match(MADRParser.WS);
					this.state = 59;
					this.match(MADRParser.OPTIONAL_MAKER);
					}
					break;
				}
				this.state = 62;
				this.wslbs();
				}
			}

			this.state = 74;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === MADRParser.DECIDERS_MARKER) {
				{
				this.state = 66;
				this.match(MADRParser.DECIDERS_MARKER);
				this.state = 67;
				this.deciders();
				this.state = 70;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 2, this._ctx) ) {
				case 1:
					{
					this.state = 68;
					this.match(MADRParser.WS);
					this.state = 69;
					this.match(MADRParser.OPTIONAL_MAKER);
					}
					break;
				}
				this.state = 72;
				this.wslbs();
				}
			}

			this.state = 85;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === MADRParser.DATE_MARKER) {
				{
				this.state = 76;
				this.match(MADRParser.DATE_MARKER);
				this.state = 77;
				this.date();
				this.state = 80;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === MADRParser.WS) {
					{
					this.state = 78;
					this.match(MADRParser.WS);
					this.state = 79;
					this.match(MADRParser.OPTIONAL_MAKER);
					}
				}

				this.state = 82;
				this.match(MADRParser.NEWLINE);
				this.state = 83;
				this.wslbs();
				}
			}

			this.state = 95;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === MADRParser.TECHNICAL_STORY_MARKER) {
				{
				this.state = 87;
				this.match(MADRParser.TECHNICAL_STORY_MARKER);
				this.state = 88;
				this.technicalStory();
				this.state = 91;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
				case 1:
					{
					this.state = 89;
					this.match(MADRParser.WS);
					this.state = 90;
					this.match(MADRParser.OPTIONAL_MAKER);
					}
					break;
				}
				this.state = 93;
				this.wslbs();
				}
			}

			this.state = 99;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === MADRParser.CONTEXT_AND_PROBLEM_STATEMENT) {
				{
				this.state = 97;
				this.match(MADRParser.CONTEXT_AND_PROBLEM_STATEMENT);
				this.state = 98;
				this.wslbs();
				}
			}

			this.state = 105;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === MADRParser.NEWLINE) {
				{
				this.state = 101;
				this.match(MADRParser.NEWLINE);
				this.state = 102;
				this.contextAndProblemStatement();
				this.state = 103;
				this.wslbs();
				}
			}

			this.state = 116;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === MADRParser.DECISION_DRIVERS_HEADING) {
				{
				this.state = 107;
				this.match(MADRParser.DECISION_DRIVERS_HEADING);
				this.state = 110;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 10, this._ctx) ) {
				case 1:
					{
					this.state = 108;
					this.match(MADRParser.WS);
					this.state = 109;
					this.match(MADRParser.OPTIONAL_MAKER);
					}
					break;
				}
				this.state = 112;
				this.wslbs();
				this.state = 113;
				this.decisionDrivers();
				this.state = 114;
				this.wslbs();
				}
			}

			this.state = 123;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === MADRParser.CONSIDERED_OPTIONS_HEADING) {
				{
				this.state = 118;
				this.match(MADRParser.CONSIDERED_OPTIONS_HEADING);
				this.state = 119;
				this.wslbs();
				this.state = 120;
				this.consideredOptions();
				this.state = 121;
				this.wslbs();
				}
			}

			this.state = 130;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === MADRParser.DECISION_OUTCOME_HEADING) {
				{
				this.state = 125;
				this.match(MADRParser.DECISION_OUTCOME_HEADING);
				this.state = 126;
				this.wslbs();
				this.state = 127;
				this.decisionOutcome();
				this.state = 128;
				this.wslbs();
				}
			}

			this.state = 141;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === MADRParser.PROS_AND_CONS_OF_THE_OPTIONS_HEADING) {
				{
				this.state = 132;
				this.match(MADRParser.PROS_AND_CONS_OF_THE_OPTIONS_HEADING);
				this.state = 135;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 14, this._ctx) ) {
				case 1:
					{
					this.state = 133;
					this.match(MADRParser.WS);
					this.state = 134;
					this.match(MADRParser.OPTIONAL_MAKER);
					}
					break;
				}
				this.state = 137;
				this.wslbs();
				this.state = 138;
				this.prosAndConsOfOptions();
				this.state = 139;
				this.wslbs();
				}
			}

			this.state = 152;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === MADRParser.LINKS_HEADING) {
				{
				this.state = 143;
				this.match(MADRParser.LINKS_HEADING);
				this.state = 146;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 16, this._ctx) ) {
				case 1:
					{
					this.state = 144;
					this.match(MADRParser.WS);
					this.state = 145;
					this.match(MADRParser.OPTIONAL_MAKER);
					}
					break;
				}
				this.state = 148;
				this.wslbs();
				this.state = 149;
				this.links();
				this.state = 150;
				this.wslbs();
				}
			}

			this.state = 154;
			this.match(MADRParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public title(): TitleContext {
		let _localctx: TitleContext = new TitleContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, MADRParser.RULE_title);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 156;
			this.textLine();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public status(): StatusContext {
		let _localctx: StatusContext = new StatusContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, MADRParser.RULE_status);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 158;
			this.textLine();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public deciders(): DecidersContext {
		let _localctx: DecidersContext = new DecidersContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, MADRParser.RULE_deciders);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 160;
			this.textLine();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public date(): DateContext {
		let _localctx: DateContext = new DateContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, MADRParser.RULE_date);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 162;
			this.textLine();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public technicalStory(): TechnicalStoryContext {
		let _localctx: TechnicalStoryContext = new TechnicalStoryContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, MADRParser.RULE_technicalStory);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 164;
			this.textLine();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public contextAndProblemStatement(): ContextAndProblemStatementContext {
		let _localctx: ContextAndProblemStatementContext = new ContextAndProblemStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, MADRParser.RULE_contextAndProblemStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 166;
			this.multilineText();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public decisionDrivers(): DecisionDriversContext {
		let _localctx: DecisionDriversContext = new DecisionDriversContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, MADRParser.RULE_decisionDrivers);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 168;
			this.list();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public consideredOptions(): ConsideredOptionsContext {
		let _localctx: ConsideredOptionsContext = new ConsideredOptionsContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, MADRParser.RULE_consideredOptions);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 170;
			this.list();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public decisionOutcome(): DecisionOutcomeContext {
		let _localctx: DecisionOutcomeContext = new DecisionOutcomeContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, MADRParser.RULE_decisionOutcome);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 172;
			this.wslbs();
			this.state = 173;
			this.chosenOptionAndExplanation();
			this.state = 182;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 19, this._ctx) ) {
			case 1:
				{
				this.state = 174;
				this.wslbs();
				this.state = 175;
				this.match(MADRParser.POSITIVE_CONSEQUENCES_HEADING);
				this.state = 178;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 18, this._ctx) ) {
				case 1:
					{
					this.state = 176;
					this.match(MADRParser.WS);
					this.state = 177;
					this.match(MADRParser.OPTIONAL_MAKER);
					}
					break;
				}
				this.state = 180;
				this.positiveConsequences();
				}
				break;
			}
			this.state = 192;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 21, this._ctx) ) {
			case 1:
				{
				this.state = 184;
				this.wslbs();
				this.state = 185;
				this.match(MADRParser.NEGATIVE_CONSEQUENCES_HEADING);
				this.state = 188;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 20, this._ctx) ) {
				case 1:
					{
					this.state = 186;
					this.match(MADRParser.WS);
					this.state = 187;
					this.match(MADRParser.OPTIONAL_MAKER);
					}
					break;
				}
				this.state = 190;
				this.negativeConsequences();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public prosAndConsOfOptions(): ProsAndConsOfOptionsContext {
		let _localctx: ProsAndConsOfOptionsContext = new ProsAndConsOfOptionsContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, MADRParser.RULE_prosAndConsOfOptions);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 197;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 194;
					this.optionSection();
					this.state = 195;
					this.wslbs();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 199;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 22, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public optionSection(): OptionSectionContext {
		let _localctx: OptionSectionContext = new OptionSectionContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, MADRParser.RULE_optionSection);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 201;
			this.match(MADRParser.SUBSUBHEADING_PREFIX);
			this.state = 202;
			this.optionTitle();
			this.state = 203;
			this.match(MADRParser.NEWLINE);
			this.state = 207;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 23, this._ctx) ) {
			case 1:
				{
				this.state = 204;
				this.wslbs();
				this.state = 205;
				this.optionDescription();
				}
				break;
			}
			this.state = 212;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 24, this._ctx) ) {
			case 1:
				{
				this.state = 209;
				this.wslbs();
				this.state = 210;
				this.prolist();
				}
				break;
			}
			this.state = 217;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 25, this._ctx) ) {
			case 1:
				{
				this.state = 214;
				this.wslbs();
				this.state = 215;
				this.conlist();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public chosenOptionAndExplanation(): ChosenOptionAndExplanationContext {
		let _localctx: ChosenOptionAndExplanationContext = new ChosenOptionAndExplanationContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, MADRParser.RULE_chosenOptionAndExplanation);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 219;
			this.multilineText();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public positiveConsequences(): PositiveConsequencesContext {
		let _localctx: PositiveConsequencesContext = new PositiveConsequencesContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, MADRParser.RULE_positiveConsequences);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 221;
			this.list();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public negativeConsequences(): NegativeConsequencesContext {
		let _localctx: NegativeConsequencesContext = new NegativeConsequencesContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, MADRParser.RULE_negativeConsequences);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 223;
			this.list();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public optionTitle(): OptionTitleContext {
		let _localctx: OptionTitleContext = new OptionTitleContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, MADRParser.RULE_optionTitle);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 225;
			this.textLine();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public optionDescription(): OptionDescriptionContext {
		let _localctx: OptionDescriptionContext = new OptionDescriptionContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, MADRParser.RULE_optionDescription);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 227;
			this.multilineText();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public prolist(): ProlistContext {
		let _localctx: ProlistContext = new ProlistContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, MADRParser.RULE_prolist);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 234;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 229;
					this.wslbs();
					this.state = 230;
					this.match(MADRParser.LIST_MARKER);
					this.state = 231;
					this.match(MADRParser.T__0);
					this.state = 232;
					this.textLine();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 236;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 26, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public conlist(): ConlistContext {
		let _localctx: ConlistContext = new ConlistContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, MADRParser.RULE_conlist);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 243;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 238;
					this.wslbs();
					this.state = 239;
					this.match(MADRParser.LIST_MARKER);
					this.state = 240;
					this.match(MADRParser.T__1);
					this.state = 241;
					this.textLine();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 245;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 27, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public links(): LinksContext {
		let _localctx: LinksContext = new LinksContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, MADRParser.RULE_links);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 247;
			this.list();
			this.state = 248;
			this.wslbs();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public list(): ListContext {
		let _localctx: ListContext = new ListContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, MADRParser.RULE_list);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 255;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 250;
					this.wslbs();
					this.state = 251;
					this.match(MADRParser.LIST_MARKER);
					this.state = 253;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 28, this._ctx) ) {
					case 1:
						{
						this.state = 252;
						this.textLine();
						}
						break;
					}
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 257;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 29, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public textLine(): TextLineContext {
		let _localctx: TextLineContext = new TextLineContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, MADRParser.RULE_textLine);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 261;
			this._errHandler.sync(this);
			_alt = 1 + 1;
			do {
				switch (_alt) {
				case 1 + 1:
					{
					this.state = 261;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case MADRParser.WORD:
					case MADRParser.CHARACTER:
					case MADRParser.LIST_MARKER:
					case MADRParser.HEADING_PREFIX:
					case MADRParser.SUBSUBSUBHEADING_PREFIX:
						{
						this.state = 259;
						this.any();
						}
						break;
					case MADRParser.WS:
						{
						this.state = 260;
						this.match(MADRParser.WS);
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 263;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 31, this._ctx);
			} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public multilineText(): MultilineTextContext {
		let _localctx: MultilineTextContext = new MultilineTextContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, MADRParser.RULE_multilineText);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 267;
			this._errHandler.sync(this);
			_alt = 1 + 1;
			do {
				switch (_alt) {
				case 1 + 1:
					{
					this.state = 267;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case MADRParser.WORD:
					case MADRParser.CHARACTER:
					case MADRParser.LIST_MARKER:
					case MADRParser.HEADING_PREFIX:
					case MADRParser.SUBSUBSUBHEADING_PREFIX:
						{
						this.state = 265;
						this.any();
						}
						break;
					case MADRParser.WS:
					case MADRParser.NEWLINE:
						{
						this.state = 266;
						this.wslb();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 269;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 33, this._ctx);
			} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public any(): AnyContext {
		let _localctx: AnyContext = new AnyContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, MADRParser.RULE_any);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 271;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << MADRParser.WORD) | (1 << MADRParser.CHARACTER) | (1 << MADRParser.LIST_MARKER) | (1 << MADRParser.HEADING_PREFIX) | (1 << MADRParser.SUBSUBSUBHEADING_PREFIX))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public wslb(): WslbContext {
		let _localctx: WslbContext = new WslbContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, MADRParser.RULE_wslb);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 273;
			_la = this._input.LA(1);
			if (!(_la === MADRParser.WS || _la === MADRParser.NEWLINE)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public wslbs(): WslbsContext {
		let _localctx: WslbsContext = new WslbsContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, MADRParser.RULE_wslbs);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 278;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 34, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 275;
					this.wslb();
					}
					}
				}
				this.state = 280;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 34, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x19\u011C\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
		"\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12" +
		"\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17" +
		"\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x03\x02\x03\x02" +
		"\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x05\x02?\n\x02\x03\x02" +
		"\x03\x02\x05\x02C\n\x02\x03\x02\x03\x02\x03\x02\x03\x02\x05\x02I\n\x02" +
		"\x03\x02\x03\x02\x05\x02M\n\x02\x03\x02\x03\x02\x03\x02\x03\x02\x05\x02" +
		"S\n\x02\x03\x02\x03\x02\x03\x02\x05\x02X\n\x02\x03\x02\x03\x02\x03\x02" +
		"\x03\x02\x05\x02^\n\x02\x03\x02\x03\x02\x05\x02b\n\x02\x03\x02\x03\x02" +
		"\x05\x02f\n\x02\x03\x02\x03\x02\x03\x02\x03\x02\x05\x02l\n\x02\x03\x02" +
		"\x03\x02\x03\x02\x05\x02q\n\x02\x03\x02\x03\x02\x03\x02\x03\x02\x05\x02" +
		"w\n\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x05\x02~\n\x02\x03\x02" +
		"\x03\x02\x03\x02\x03\x02\x03\x02\x05\x02\x85\n\x02\x03\x02\x03\x02\x03" +
		"\x02\x05\x02\x8A\n\x02\x03\x02\x03\x02\x03\x02\x03\x02\x05\x02\x90\n\x02" +
		"\x03\x02\x03\x02\x03\x02\x05\x02\x95\n\x02\x03\x02\x03\x02\x03\x02\x03" +
		"\x02\x05\x02\x9B\n\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03\x04" +
		"\x03\x05\x03\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x03\t\x03" +
		"\t\x03\n\x03\n\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x05\v\xB5\n\v\x03\v" +
		"\x03\v\x05\v\xB9\n\v\x03\v\x03\v\x03\v\x03\v\x05\v\xBF\n\v\x03\v\x03\v" +
		"\x05\v\xC3\n\v\x03\f\x03\f\x03\f\x06\f\xC8\n\f\r\f\x0E\f\xC9\x03\r\x03" +
		"\r\x03\r\x03\r\x03\r\x03\r\x05\r\xD2\n\r\x03\r\x03\r\x03\r\x05\r\xD7\n" +
		"\r\x03\r\x03\r\x03\r\x05\r\xDC\n\r\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03" +
		"\x10\x03\x10\x03\x11\x03\x11\x03\x12\x03\x12\x03\x13\x03\x13\x03\x13\x03" +
		"\x13\x03\x13\x06\x13\xED\n\x13\r\x13\x0E\x13\xEE\x03\x14\x03\x14\x03\x14" +
		"\x03\x14\x03\x14\x06\x14\xF6\n\x14\r\x14\x0E\x14\xF7\x03\x15\x03\x15\x03" +
		"\x15\x03\x16\x03\x16\x03\x16\x05\x16\u0100\n\x16\x06\x16\u0102\n\x16\r" +
		"\x16\x0E\x16\u0103\x03\x17\x03\x17\x06\x17\u0108\n\x17\r\x17\x0E\x17\u0109" +
		"\x03\x18\x03\x18\x06\x18\u010E\n\x18\r\x18\x0E\x18\u010F\x03\x19\x03\x19" +
		"\x03\x1A\x03\x1A\x03\x1B\x07\x1B\u0117\n\x1B\f\x1B\x0E\x1B\u011A\v\x1B" +
		"\x03\x1B\x04\u0109\u010F\x02\x02\x1C\x02\x02\x04\x02\x06\x02\b\x02\n\x02" +
		"\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02" +
		"\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x02\x02\x04" +
		"\x06\x02\x05\x06\t\t\x0F\x0F\x11\x11\x03\x02\x07\b\x02\u0124\x026\x03" +
		"\x02\x02\x02\x04\x9E\x03\x02\x02\x02\x06\xA0\x03\x02\x02\x02\b\xA2\x03" +
		"\x02\x02\x02\n\xA4\x03\x02\x02\x02\f\xA6\x03\x02\x02\x02\x0E\xA8\x03\x02" +
		"\x02\x02\x10\xAA\x03\x02\x02\x02\x12\xAC\x03\x02\x02\x02\x14\xAE\x03\x02" +
		"\x02\x02\x16\xC7\x03\x02\x02\x02\x18\xCB\x03\x02\x02\x02\x1A\xDD\x03\x02" +
		"\x02\x02\x1C\xDF\x03\x02\x02\x02\x1E\xE1\x03\x02\x02\x02 \xE3\x03\x02" +
		"\x02\x02\"\xE5\x03\x02\x02\x02$\xEC\x03\x02\x02\x02&\xF5\x03\x02\x02\x02" +
		"(\xF9\x03\x02\x02\x02*\u0101\x03\x02\x02\x02,\u0107\x03\x02\x02\x02.\u010D" +
		"\x03\x02\x02\x020\u0111\x03\x02\x02\x022\u0113\x03\x02\x02\x024\u0118" +
		"\x03\x02\x02\x0267\x07\x0F\x02\x0278\x05\x04\x03\x0289\x07\b\x02\x029" +
		"B\x054\x1B\x02:;\x07\n\x02\x02;>\x05\x06\x04\x02<=\x07\x07\x02\x02=?\x07" +
		"\r\x02\x02><\x03\x02\x02\x02>?\x03\x02\x02\x02?@\x03\x02\x02\x02@A\x05" +
		"4\x1B\x02AC\x03\x02\x02\x02B:\x03\x02\x02\x02BC\x03\x02\x02\x02CL\x03" +
		"\x02\x02\x02DE\x07\f\x02\x02EH\x05\b\x05\x02FG\x07\x07\x02\x02GI\x07\r" +
		"\x02\x02HF\x03\x02\x02\x02HI\x03\x02\x02\x02IJ\x03\x02\x02\x02JK\x054" +
		"\x1B\x02KM\x03\x02\x02\x02LD\x03\x02\x02\x02LM\x03\x02\x02\x02MW\x03\x02" +
		"\x02\x02NO\x07\v\x02\x02OR\x05\n\x06\x02PQ\x07\x07\x02\x02QS\x07\r\x02" +
		"\x02RP\x03\x02\x02\x02RS\x03\x02\x02\x02ST\x03\x02\x02\x02TU\x07\b\x02" +
		"\x02UV\x054\x1B\x02VX\x03\x02\x02\x02WN\x03\x02\x02\x02WX\x03\x02\x02" +
		"\x02Xa\x03\x02\x02\x02YZ\x07\x0E\x02\x02Z]\x05\f\x07\x02[\\\x07\x07\x02" +
		"\x02\\^\x07\r\x02\x02][\x03\x02\x02\x02]^\x03\x02\x02\x02^_\x03\x02\x02" +
		"\x02_`\x054\x1B\x02`b\x03\x02\x02\x02aY\x03\x02\x02\x02ab\x03\x02\x02" +
		"\x02be\x03\x02\x02\x02cd\x07\x12\x02\x02df\x054\x1B\x02ec\x03\x02\x02" +
		"\x02ef\x03\x02\x02\x02fk\x03\x02\x02\x02gh\x07\b\x02\x02hi\x05\x0E\b\x02" +
		"ij\x054\x1B\x02jl\x03\x02\x02\x02kg\x03\x02\x02\x02kl\x03\x02\x02\x02" +
		"lv\x03\x02\x02\x02mp\x07\x13\x02\x02no\x07\x07\x02\x02oq\x07\r\x02\x02" +
		"pn\x03\x02\x02\x02pq\x03\x02\x02\x02qr\x03\x02\x02\x02rs\x054\x1B\x02" +
		"st\x05\x10\t\x02tu\x054\x1B\x02uw\x03\x02\x02\x02vm\x03\x02\x02\x02vw" +
		"\x03\x02\x02\x02w}\x03\x02\x02\x02xy\x07\x14\x02\x02yz\x054\x1B\x02z{" +
		"\x05\x12\n\x02{|\x054\x1B\x02|~\x03\x02\x02\x02}x\x03\x02\x02\x02}~\x03" +
		"\x02\x02\x02~\x84\x03\x02\x02\x02\x7F\x80\x07\x15\x02\x02\x80\x81\x05" +
		"4\x1B\x02\x81\x82\x05\x14\v\x02\x82\x83\x054\x1B\x02\x83\x85\x03\x02\x02" +
		"\x02\x84\x7F\x03\x02\x02\x02\x84\x85\x03\x02\x02\x02\x85\x8F\x03\x02\x02" +
		"\x02\x86\x89\x07\x18\x02\x02\x87\x88\x07\x07\x02\x02\x88\x8A\x07\r\x02" +
		"\x02\x89\x87\x03\x02\x02\x02\x89\x8A\x03\x02\x02\x02\x8A\x8B\x03\x02\x02" +
		"\x02\x8B\x8C\x054\x1B\x02\x8C\x8D\x05\x16\f\x02\x8D\x8E\x054\x1B\x02\x8E" +
		"\x90\x03\x02\x02\x02\x8F\x86\x03\x02\x02\x02\x8F\x90\x03\x02\x02\x02\x90" +
		"\x9A\x03\x02\x02\x02\x91\x94\x07\x19\x02\x02\x92\x93\x07\x07\x02\x02\x93" +
		"\x95\x07\r\x02\x02\x94\x92\x03\x02\x02\x02\x94\x95\x03\x02\x02\x02\x95" +
		"\x96\x03\x02\x02\x02\x96\x97\x054\x1B\x02\x97\x98\x05(\x15\x02\x98\x99" +
		"\x054\x1B\x02\x99\x9B\x03\x02\x02\x02\x9A\x91\x03\x02\x02\x02\x9A\x9B" +
		"\x03\x02\x02\x02\x9B\x9C\x03\x02\x02\x02\x9C\x9D\x07\x02\x02\x03\x9D\x03" +
		"\x03\x02\x02\x02\x9E\x9F\x05,\x17\x02\x9F\x05\x03\x02\x02\x02\xA0\xA1" +
		"\x05,\x17\x02\xA1\x07\x03\x02\x02\x02\xA2\xA3\x05,\x17\x02\xA3\t\x03\x02" +
		"\x02\x02\xA4\xA5\x05,\x17\x02\xA5\v\x03\x02\x02\x02\xA6\xA7\x05,\x17\x02" +
		"\xA7\r\x03\x02\x02\x02\xA8\xA9\x05.\x18\x02\xA9\x0F\x03\x02\x02\x02\xAA" +
		"\xAB\x05*\x16\x02\xAB\x11\x03\x02\x02\x02\xAC\xAD\x05*\x16\x02\xAD\x13" +
		"\x03\x02\x02\x02\xAE\xAF\x054\x1B\x02\xAF\xB8\x05\x1A\x0E\x02\xB0\xB1" +
		"\x054\x1B\x02\xB1\xB4\x07\x16\x02\x02\xB2\xB3\x07\x07\x02\x02\xB3\xB5" +
		"\x07\r\x02\x02\xB4\xB2\x03\x02\x02\x02\xB4\xB5\x03\x02\x02\x02\xB5\xB6" +
		"\x03\x02\x02\x02\xB6\xB7\x05\x1C\x0F\x02\xB7\xB9\x03\x02\x02\x02\xB8\xB0" +
		"\x03\x02\x02\x02\xB8\xB9\x03\x02\x02\x02\xB9\xC2\x03\x02\x02\x02\xBA\xBB" +
		"\x054\x1B\x02\xBB\xBE\x07\x17\x02\x02\xBC\xBD\x07\x07\x02\x02\xBD\xBF" +
		"\x07\r\x02\x02\xBE\xBC\x03\x02\x02\x02\xBE\xBF\x03\x02\x02\x02\xBF\xC0" +
		"\x03\x02\x02\x02\xC0\xC1\x05\x1E\x10\x02\xC1\xC3\x03\x02\x02\x02\xC2\xBA" +
		"\x03\x02\x02\x02\xC2\xC3\x03\x02\x02\x02\xC3\x15\x03\x02\x02\x02\xC4\xC5" +
		"\x05\x18\r\x02\xC5\xC6\x054\x1B\x02\xC6\xC8\x03\x02\x02\x02\xC7\xC4\x03" +
		"\x02\x02\x02\xC8\xC9\x03\x02\x02\x02\xC9\xC7\x03\x02\x02\x02\xC9\xCA\x03" +
		"\x02\x02\x02\xCA\x17\x03\x02\x02\x02\xCB\xCC\x07\x10\x02\x02\xCC\xCD\x05" +
		" \x11\x02\xCD\xD1\x07\b\x02\x02\xCE\xCF\x054\x1B\x02\xCF\xD0\x05\"\x12" +
		"\x02\xD0\xD2\x03\x02\x02\x02\xD1\xCE\x03\x02\x02\x02\xD1\xD2\x03\x02\x02" +
		"\x02\xD2\xD6\x03\x02\x02\x02\xD3\xD4\x054\x1B\x02\xD4\xD5\x05$\x13\x02" +
		"\xD5\xD7\x03\x02\x02\x02\xD6\xD3\x03\x02\x02\x02\xD6\xD7\x03\x02\x02\x02" +
		"\xD7\xDB\x03\x02\x02\x02\xD8\xD9\x054\x1B\x02\xD9\xDA\x05&\x14\x02\xDA" +
		"\xDC\x03\x02\x02\x02\xDB\xD8\x03\x02\x02\x02\xDB\xDC\x03\x02\x02\x02\xDC" +
		"\x19\x03\x02\x02\x02\xDD\xDE\x05.\x18\x02\xDE\x1B\x03\x02\x02\x02\xDF" +
		"\xE0\x05*\x16\x02\xE0\x1D\x03\x02\x02\x02\xE1\xE2\x05*\x16\x02\xE2\x1F" +
		"\x03\x02\x02\x02\xE3\xE4\x05,\x17\x02\xE4!\x03\x02\x02\x02\xE5\xE6\x05" +
		".\x18\x02\xE6#\x03\x02\x02\x02\xE7\xE8\x054\x1B\x02\xE8\xE9\x07\t\x02" +
		"\x02\xE9\xEA\x07\x03\x02\x02\xEA\xEB\x05,\x17\x02\xEB\xED\x03\x02\x02" +
		"\x02\xEC\xE7\x03\x02\x02\x02\xED\xEE\x03\x02\x02\x02\xEE\xEC\x03\x02\x02" +
		"\x02\xEE\xEF\x03\x02\x02\x02\xEF%\x03\x02\x02\x02\xF0\xF1\x054\x1B\x02" +
		"\xF1\xF2\x07\t\x02\x02\xF2\xF3\x07\x04\x02\x02\xF3\xF4\x05,\x17\x02\xF4" +
		"\xF6\x03\x02\x02\x02\xF5\xF0\x03\x02\x02\x02\xF6\xF7\x03\x02\x02\x02\xF7" +
		"\xF5\x03\x02\x02\x02\xF7\xF8\x03\x02\x02\x02\xF8\'\x03\x02\x02\x02\xF9" +
		"\xFA\x05*\x16\x02\xFA\xFB\x054\x1B\x02\xFB)\x03\x02\x02\x02\xFC\xFD\x05" +
		"4\x1B\x02\xFD\xFF\x07\t\x02\x02\xFE\u0100\x05,\x17\x02\xFF\xFE\x03\x02" +
		"\x02\x02\xFF\u0100\x03\x02\x02\x02\u0100\u0102\x03\x02\x02\x02\u0101\xFC" +
		"\x03\x02\x02\x02\u0102\u0103\x03\x02\x02\x02\u0103\u0101\x03\x02\x02\x02" +
		"\u0103\u0104\x03\x02\x02\x02\u0104+\x03\x02\x02\x02\u0105\u0108\x050\x19" +
		"\x02\u0106\u0108\x07\x07\x02\x02\u0107\u0105\x03\x02\x02\x02\u0107\u0106" +
		"\x03\x02\x02\x02\u0108\u0109\x03\x02\x02\x02\u0109\u010A\x03\x02\x02\x02" +
		"\u0109\u0107\x03\x02\x02\x02\u010A-\x03\x02\x02\x02\u010B\u010E\x050\x19" +
		"\x02\u010C\u010E\x052\x1A\x02\u010D\u010B\x03\x02\x02\x02\u010D\u010C" +
		"\x03\x02\x02\x02\u010E\u010F\x03\x02\x02\x02\u010F\u0110\x03\x02\x02\x02" +
		"\u010F\u010D\x03\x02\x02\x02\u0110/\x03\x02\x02\x02\u0111\u0112\t\x02" +
		"\x02\x02\u01121\x03\x02\x02\x02\u0113\u0114\t\x03\x02\x02\u01143\x03\x02" +
		"\x02\x02\u0115\u0117\x052\x1A\x02\u0116\u0115\x03\x02\x02\x02\u0117\u011A" +
		"\x03\x02\x02\x02\u0118\u0116\x03\x02\x02\x02\u0118\u0119\x03\x02\x02\x02" +
		"\u01195\x03\x02\x02\x02\u011A\u0118\x03\x02\x02\x02%>BHLRW]aekpv}\x84" +
		"\x89\x8F\x94\x9A\xB4\xB8\xBE\xC2\xC9\xD1\xD6\xDB\xEE\xF7\xFF\u0103\u0107" +
		"\u0109\u010D\u010F\u0118";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!MADRParser.__ATN) {
			MADRParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(MADRParser._serializedATN));
		}

		return MADRParser.__ATN;
	}

}

export class StartContext extends ParserRuleContext {
	public HEADING_PREFIX(): TerminalNode { return this.getToken(MADRParser.HEADING_PREFIX, 0); }
	public title(): TitleContext {
		return this.getRuleContext(0, TitleContext);
	}
	public NEWLINE(): TerminalNode[];
	public NEWLINE(i: number): TerminalNode;
	public NEWLINE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(MADRParser.NEWLINE);
		} else {
			return this.getToken(MADRParser.NEWLINE, i);
		}
	}
	public wslbs(): WslbsContext[];
	public wslbs(i: number): WslbsContext;
	public wslbs(i?: number): WslbsContext | WslbsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WslbsContext);
		} else {
			return this.getRuleContext(i, WslbsContext);
		}
	}
	public EOF(): TerminalNode { return this.getToken(MADRParser.EOF, 0); }
	public STATUS_MARKER(): TerminalNode | undefined { return this.tryGetToken(MADRParser.STATUS_MARKER, 0); }
	public status(): StatusContext | undefined {
		return this.tryGetRuleContext(0, StatusContext);
	}
	public DECIDERS_MARKER(): TerminalNode | undefined { return this.tryGetToken(MADRParser.DECIDERS_MARKER, 0); }
	public deciders(): DecidersContext | undefined {
		return this.tryGetRuleContext(0, DecidersContext);
	}
	public DATE_MARKER(): TerminalNode | undefined { return this.tryGetToken(MADRParser.DATE_MARKER, 0); }
	public date(): DateContext | undefined {
		return this.tryGetRuleContext(0, DateContext);
	}
	public TECHNICAL_STORY_MARKER(): TerminalNode | undefined { return this.tryGetToken(MADRParser.TECHNICAL_STORY_MARKER, 0); }
	public technicalStory(): TechnicalStoryContext | undefined {
		return this.tryGetRuleContext(0, TechnicalStoryContext);
	}
	public CONTEXT_AND_PROBLEM_STATEMENT(): TerminalNode | undefined { return this.tryGetToken(MADRParser.CONTEXT_AND_PROBLEM_STATEMENT, 0); }
	public contextAndProblemStatement(): ContextAndProblemStatementContext | undefined {
		return this.tryGetRuleContext(0, ContextAndProblemStatementContext);
	}
	public DECISION_DRIVERS_HEADING(): TerminalNode | undefined { return this.tryGetToken(MADRParser.DECISION_DRIVERS_HEADING, 0); }
	public decisionDrivers(): DecisionDriversContext | undefined {
		return this.tryGetRuleContext(0, DecisionDriversContext);
	}
	public CONSIDERED_OPTIONS_HEADING(): TerminalNode | undefined { return this.tryGetToken(MADRParser.CONSIDERED_OPTIONS_HEADING, 0); }
	public consideredOptions(): ConsideredOptionsContext | undefined {
		return this.tryGetRuleContext(0, ConsideredOptionsContext);
	}
	public DECISION_OUTCOME_HEADING(): TerminalNode | undefined { return this.tryGetToken(MADRParser.DECISION_OUTCOME_HEADING, 0); }
	public decisionOutcome(): DecisionOutcomeContext | undefined {
		return this.tryGetRuleContext(0, DecisionOutcomeContext);
	}
	public PROS_AND_CONS_OF_THE_OPTIONS_HEADING(): TerminalNode | undefined { return this.tryGetToken(MADRParser.PROS_AND_CONS_OF_THE_OPTIONS_HEADING, 0); }
	public prosAndConsOfOptions(): ProsAndConsOfOptionsContext | undefined {
		return this.tryGetRuleContext(0, ProsAndConsOfOptionsContext);
	}
	public LINKS_HEADING(): TerminalNode | undefined { return this.tryGetToken(MADRParser.LINKS_HEADING, 0); }
	public links(): LinksContext | undefined {
		return this.tryGetRuleContext(0, LinksContext);
	}
	public WS(): TerminalNode[];
	public WS(i: number): TerminalNode;
	public WS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(MADRParser.WS);
		} else {
			return this.getToken(MADRParser.WS, i);
		}
	}
	public OPTIONAL_MAKER(): TerminalNode[];
	public OPTIONAL_MAKER(i: number): TerminalNode;
	public OPTIONAL_MAKER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(MADRParser.OPTIONAL_MAKER);
		} else {
			return this.getToken(MADRParser.OPTIONAL_MAKER, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_start; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterStart) {
			listener.enterStart(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitStart) {
			listener.exitStart(this);
		}
	}
}


export class TitleContext extends ParserRuleContext {
	public textLine(): TextLineContext {
		return this.getRuleContext(0, TextLineContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_title; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterTitle) {
			listener.enterTitle(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitTitle) {
			listener.exitTitle(this);
		}
	}
}


export class StatusContext extends ParserRuleContext {
	public textLine(): TextLineContext {
		return this.getRuleContext(0, TextLineContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_status; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterStatus) {
			listener.enterStatus(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitStatus) {
			listener.exitStatus(this);
		}
	}
}


export class DecidersContext extends ParserRuleContext {
	public textLine(): TextLineContext {
		return this.getRuleContext(0, TextLineContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_deciders; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterDeciders) {
			listener.enterDeciders(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitDeciders) {
			listener.exitDeciders(this);
		}
	}
}


export class DateContext extends ParserRuleContext {
	public textLine(): TextLineContext {
		return this.getRuleContext(0, TextLineContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_date; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterDate) {
			listener.enterDate(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitDate) {
			listener.exitDate(this);
		}
	}
}


export class TechnicalStoryContext extends ParserRuleContext {
	public textLine(): TextLineContext {
		return this.getRuleContext(0, TextLineContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_technicalStory; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterTechnicalStory) {
			listener.enterTechnicalStory(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitTechnicalStory) {
			listener.exitTechnicalStory(this);
		}
	}
}


export class ContextAndProblemStatementContext extends ParserRuleContext {
	public multilineText(): MultilineTextContext {
		return this.getRuleContext(0, MultilineTextContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_contextAndProblemStatement; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterContextAndProblemStatement) {
			listener.enterContextAndProblemStatement(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitContextAndProblemStatement) {
			listener.exitContextAndProblemStatement(this);
		}
	}
}


export class DecisionDriversContext extends ParserRuleContext {
	public list(): ListContext {
		return this.getRuleContext(0, ListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_decisionDrivers; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterDecisionDrivers) {
			listener.enterDecisionDrivers(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitDecisionDrivers) {
			listener.exitDecisionDrivers(this);
		}
	}
}


export class ConsideredOptionsContext extends ParserRuleContext {
	public list(): ListContext {
		return this.getRuleContext(0, ListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_consideredOptions; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterConsideredOptions) {
			listener.enterConsideredOptions(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitConsideredOptions) {
			listener.exitConsideredOptions(this);
		}
	}
}


export class DecisionOutcomeContext extends ParserRuleContext {
	public wslbs(): WslbsContext[];
	public wslbs(i: number): WslbsContext;
	public wslbs(i?: number): WslbsContext | WslbsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WslbsContext);
		} else {
			return this.getRuleContext(i, WslbsContext);
		}
	}
	public chosenOptionAndExplanation(): ChosenOptionAndExplanationContext {
		return this.getRuleContext(0, ChosenOptionAndExplanationContext);
	}
	public POSITIVE_CONSEQUENCES_HEADING(): TerminalNode | undefined { return this.tryGetToken(MADRParser.POSITIVE_CONSEQUENCES_HEADING, 0); }
	public positiveConsequences(): PositiveConsequencesContext | undefined {
		return this.tryGetRuleContext(0, PositiveConsequencesContext);
	}
	public NEGATIVE_CONSEQUENCES_HEADING(): TerminalNode | undefined { return this.tryGetToken(MADRParser.NEGATIVE_CONSEQUENCES_HEADING, 0); }
	public negativeConsequences(): NegativeConsequencesContext | undefined {
		return this.tryGetRuleContext(0, NegativeConsequencesContext);
	}
	public WS(): TerminalNode[];
	public WS(i: number): TerminalNode;
	public WS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(MADRParser.WS);
		} else {
			return this.getToken(MADRParser.WS, i);
		}
	}
	public OPTIONAL_MAKER(): TerminalNode[];
	public OPTIONAL_MAKER(i: number): TerminalNode;
	public OPTIONAL_MAKER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(MADRParser.OPTIONAL_MAKER);
		} else {
			return this.getToken(MADRParser.OPTIONAL_MAKER, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_decisionOutcome; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterDecisionOutcome) {
			listener.enterDecisionOutcome(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitDecisionOutcome) {
			listener.exitDecisionOutcome(this);
		}
	}
}


export class ProsAndConsOfOptionsContext extends ParserRuleContext {
	public optionSection(): OptionSectionContext[];
	public optionSection(i: number): OptionSectionContext;
	public optionSection(i?: number): OptionSectionContext | OptionSectionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(OptionSectionContext);
		} else {
			return this.getRuleContext(i, OptionSectionContext);
		}
	}
	public wslbs(): WslbsContext[];
	public wslbs(i: number): WslbsContext;
	public wslbs(i?: number): WslbsContext | WslbsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WslbsContext);
		} else {
			return this.getRuleContext(i, WslbsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_prosAndConsOfOptions; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterProsAndConsOfOptions) {
			listener.enterProsAndConsOfOptions(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitProsAndConsOfOptions) {
			listener.exitProsAndConsOfOptions(this);
		}
	}
}


export class OptionSectionContext extends ParserRuleContext {
	public SUBSUBHEADING_PREFIX(): TerminalNode { return this.getToken(MADRParser.SUBSUBHEADING_PREFIX, 0); }
	public optionTitle(): OptionTitleContext {
		return this.getRuleContext(0, OptionTitleContext);
	}
	public NEWLINE(): TerminalNode { return this.getToken(MADRParser.NEWLINE, 0); }
	public wslbs(): WslbsContext[];
	public wslbs(i: number): WslbsContext;
	public wslbs(i?: number): WslbsContext | WslbsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WslbsContext);
		} else {
			return this.getRuleContext(i, WslbsContext);
		}
	}
	public optionDescription(): OptionDescriptionContext | undefined {
		return this.tryGetRuleContext(0, OptionDescriptionContext);
	}
	public prolist(): ProlistContext | undefined {
		return this.tryGetRuleContext(0, ProlistContext);
	}
	public conlist(): ConlistContext | undefined {
		return this.tryGetRuleContext(0, ConlistContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_optionSection; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterOptionSection) {
			listener.enterOptionSection(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitOptionSection) {
			listener.exitOptionSection(this);
		}
	}
}


export class ChosenOptionAndExplanationContext extends ParserRuleContext {
	public multilineText(): MultilineTextContext {
		return this.getRuleContext(0, MultilineTextContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_chosenOptionAndExplanation; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterChosenOptionAndExplanation) {
			listener.enterChosenOptionAndExplanation(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitChosenOptionAndExplanation) {
			listener.exitChosenOptionAndExplanation(this);
		}
	}
}


export class PositiveConsequencesContext extends ParserRuleContext {
	public list(): ListContext {
		return this.getRuleContext(0, ListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_positiveConsequences; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterPositiveConsequences) {
			listener.enterPositiveConsequences(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitPositiveConsequences) {
			listener.exitPositiveConsequences(this);
		}
	}
}


export class NegativeConsequencesContext extends ParserRuleContext {
	public list(): ListContext {
		return this.getRuleContext(0, ListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_negativeConsequences; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterNegativeConsequences) {
			listener.enterNegativeConsequences(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitNegativeConsequences) {
			listener.exitNegativeConsequences(this);
		}
	}
}


export class OptionTitleContext extends ParserRuleContext {
	public textLine(): TextLineContext {
		return this.getRuleContext(0, TextLineContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_optionTitle; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterOptionTitle) {
			listener.enterOptionTitle(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitOptionTitle) {
			listener.exitOptionTitle(this);
		}
	}
}


export class OptionDescriptionContext extends ParserRuleContext {
	public multilineText(): MultilineTextContext {
		return this.getRuleContext(0, MultilineTextContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_optionDescription; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterOptionDescription) {
			listener.enterOptionDescription(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitOptionDescription) {
			listener.exitOptionDescription(this);
		}
	}
}


export class ProlistContext extends ParserRuleContext {
	public wslbs(): WslbsContext[];
	public wslbs(i: number): WslbsContext;
	public wslbs(i?: number): WslbsContext | WslbsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WslbsContext);
		} else {
			return this.getRuleContext(i, WslbsContext);
		}
	}
	public LIST_MARKER(): TerminalNode[];
	public LIST_MARKER(i: number): TerminalNode;
	public LIST_MARKER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(MADRParser.LIST_MARKER);
		} else {
			return this.getToken(MADRParser.LIST_MARKER, i);
		}
	}
	public textLine(): TextLineContext[];
	public textLine(i: number): TextLineContext;
	public textLine(i?: number): TextLineContext | TextLineContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TextLineContext);
		} else {
			return this.getRuleContext(i, TextLineContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_prolist; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterProlist) {
			listener.enterProlist(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitProlist) {
			listener.exitProlist(this);
		}
	}
}


export class ConlistContext extends ParserRuleContext {
	public wslbs(): WslbsContext[];
	public wslbs(i: number): WslbsContext;
	public wslbs(i?: number): WslbsContext | WslbsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WslbsContext);
		} else {
			return this.getRuleContext(i, WslbsContext);
		}
	}
	public LIST_MARKER(): TerminalNode[];
	public LIST_MARKER(i: number): TerminalNode;
	public LIST_MARKER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(MADRParser.LIST_MARKER);
		} else {
			return this.getToken(MADRParser.LIST_MARKER, i);
		}
	}
	public textLine(): TextLineContext[];
	public textLine(i: number): TextLineContext;
	public textLine(i?: number): TextLineContext | TextLineContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TextLineContext);
		} else {
			return this.getRuleContext(i, TextLineContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_conlist; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterConlist) {
			listener.enterConlist(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitConlist) {
			listener.exitConlist(this);
		}
	}
}


export class LinksContext extends ParserRuleContext {
	public list(): ListContext {
		return this.getRuleContext(0, ListContext);
	}
	public wslbs(): WslbsContext {
		return this.getRuleContext(0, WslbsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_links; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterLinks) {
			listener.enterLinks(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitLinks) {
			listener.exitLinks(this);
		}
	}
}


export class ListContext extends ParserRuleContext {
	public wslbs(): WslbsContext[];
	public wslbs(i: number): WslbsContext;
	public wslbs(i?: number): WslbsContext | WslbsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WslbsContext);
		} else {
			return this.getRuleContext(i, WslbsContext);
		}
	}
	public LIST_MARKER(): TerminalNode[];
	public LIST_MARKER(i: number): TerminalNode;
	public LIST_MARKER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(MADRParser.LIST_MARKER);
		} else {
			return this.getToken(MADRParser.LIST_MARKER, i);
		}
	}
	public textLine(): TextLineContext[];
	public textLine(i: number): TextLineContext;
	public textLine(i?: number): TextLineContext | TextLineContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TextLineContext);
		} else {
			return this.getRuleContext(i, TextLineContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_list; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterList) {
			listener.enterList(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitList) {
			listener.exitList(this);
		}
	}
}


export class TextLineContext extends ParserRuleContext {
	public any(): AnyContext[];
	public any(i: number): AnyContext;
	public any(i?: number): AnyContext | AnyContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnyContext);
		} else {
			return this.getRuleContext(i, AnyContext);
		}
	}
	public WS(): TerminalNode[];
	public WS(i: number): TerminalNode;
	public WS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(MADRParser.WS);
		} else {
			return this.getToken(MADRParser.WS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_textLine; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterTextLine) {
			listener.enterTextLine(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitTextLine) {
			listener.exitTextLine(this);
		}
	}
}


export class MultilineTextContext extends ParserRuleContext {
	public any(): AnyContext[];
	public any(i: number): AnyContext;
	public any(i?: number): AnyContext | AnyContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnyContext);
		} else {
			return this.getRuleContext(i, AnyContext);
		}
	}
	public wslb(): WslbContext[];
	public wslb(i: number): WslbContext;
	public wslb(i?: number): WslbContext | WslbContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WslbContext);
		} else {
			return this.getRuleContext(i, WslbContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_multilineText; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterMultilineText) {
			listener.enterMultilineText(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitMultilineText) {
			listener.exitMultilineText(this);
		}
	}
}


export class AnyContext extends ParserRuleContext {
	public WORD(): TerminalNode | undefined { return this.tryGetToken(MADRParser.WORD, 0); }
	public CHARACTER(): TerminalNode | undefined { return this.tryGetToken(MADRParser.CHARACTER, 0); }
	public LIST_MARKER(): TerminalNode | undefined { return this.tryGetToken(MADRParser.LIST_MARKER, 0); }
	public HEADING_PREFIX(): TerminalNode | undefined { return this.tryGetToken(MADRParser.HEADING_PREFIX, 0); }
	public SUBSUBSUBHEADING_PREFIX(): TerminalNode | undefined { return this.tryGetToken(MADRParser.SUBSUBSUBHEADING_PREFIX, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_any; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterAny) {
			listener.enterAny(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitAny) {
			listener.exitAny(this);
		}
	}
}


export class WslbContext extends ParserRuleContext {
	public WS(): TerminalNode | undefined { return this.tryGetToken(MADRParser.WS, 0); }
	public NEWLINE(): TerminalNode | undefined { return this.tryGetToken(MADRParser.NEWLINE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_wslb; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterWslb) {
			listener.enterWslb(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitWslb) {
			listener.exitWslb(this);
		}
	}
}


export class WslbsContext extends ParserRuleContext {
	public wslb(): WslbContext[];
	public wslb(i: number): WslbContext;
	public wslb(i?: number): WslbContext | WslbContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WslbContext);
		} else {
			return this.getRuleContext(i, WslbContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MADRParser.RULE_wslbs; }
	// @Override
	public enterRule(listener: MADRListener): void {
		if (listener.enterWslbs) {
			listener.enterWslbs(this);
		}
	}
	// @Override
	public exitRule(listener: MADRListener): void {
		if (listener.exitWslbs) {
			listener.exitWslbs(this);
		}
	}
}


