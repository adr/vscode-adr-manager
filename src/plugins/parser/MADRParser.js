// Generated from MADR.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';
import MADRListener from './MADRListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\u0017\u00dd\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010",
    "\t\u0010\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013",
    "\u0004\u0014\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017",
    "\t\u0017\u0003\u0002\u0003\u0002\u0003\u0002\u0005\u00022\n\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0005",
    "\u0002:\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0005",
    "\u0002@\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0005\u0002E\n\u0002",
    "\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0005\u0002K\n\u0002",
    "\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0005\u0002",
    "R\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0005\u0002Y\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0005\u0002",
    "^\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0005\u0002",
    "d\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0005\u0002i\n\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0005\u0002o\n\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003",
    "\u0007\u0003\u0007\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0005",
    "\b\u0085\n\b\u0003\b\u0003\b\u0005\b\u0089\n\b\u0003\b\u0003\b\u0003",
    "\b\u0003\b\u0005\b\u008f\n\b\u0003\b\u0003\b\u0005\b\u0093\n\b\u0003",
    "\t\u0003\t\u0003\t\u0006\t\u0098\n\t\r\t\u000e\t\u0099\u0003\n\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0003\n\u0005\n\u00a2\n\n\u0003\n\u0003\n",
    "\u0003\n\u0005\n\u00a7\n\n\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003",
    "\r\u0003\r\u0003\u000e\u0003\u000e\u0003\u000f\u0003\u000f\u0003\u0010",
    "\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0006\u0010\u00b8\n",
    "\u0010\r\u0010\u000e\u0010\u00b9\u0003\u0011\u0003\u0011\u0003\u0012",
    "\u0003\u0012\u0003\u0012\u0005\u0012\u00c1\n\u0012\u0006\u0012\u00c3",
    "\n\u0012\r\u0012\u000e\u0012\u00c4\u0003\u0013\u0003\u0013\u0006\u0013",
    "\u00c9\n\u0013\r\u0013\u000e\u0013\u00ca\u0003\u0014\u0003\u0014\u0006",
    "\u0014\u00cf\n\u0014\r\u0014\u000e\u0014\u00d0\u0003\u0015\u0003\u0015",
    "\u0003\u0016\u0003\u0016\u0003\u0017\u0007\u0017\u00d8\n\u0017\f\u0017",
    "\u000e\u0017\u00db\u000b\u0017\u0003\u0017\u0004\u00ca\u00d0\u0002\u0018",
    "\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c",
    "\u001e \"$&(*,\u0002\u0005\u0003\u0002\u0003\u0005\u0006\u0002\u0006",
    "\u0007\n\n\f\r\u000f\u000f\u0003\u0002\b\t\u0002\u00e0\u00021\u0003",
    "\u0002\u0002\u0002\u0004r\u0003\u0002\u0002\u0002\u0006v\u0003\u0002",
    "\u0002\u0002\bx\u0003\u0002\u0002\u0002\nz\u0003\u0002\u0002\u0002\f",
    "|\u0003\u0002\u0002\u0002\u000e~\u0003\u0002\u0002\u0002\u0010\u0097",
    "\u0003\u0002\u0002\u0002\u0012\u009b\u0003\u0002\u0002\u0002\u0014\u00a8",
    "\u0003\u0002\u0002\u0002\u0016\u00aa\u0003\u0002\u0002\u0002\u0018\u00ac",
    "\u0003\u0002\u0002\u0002\u001a\u00ae\u0003\u0002\u0002\u0002\u001c\u00b0",
    "\u0003\u0002\u0002\u0002\u001e\u00b7\u0003\u0002\u0002\u0002 \u00bb",
    "\u0003\u0002\u0002\u0002\"\u00c2\u0003\u0002\u0002\u0002$\u00c8\u0003",
    "\u0002\u0002\u0002&\u00ce\u0003\u0002\u0002\u0002(\u00d2\u0003\u0002",
    "\u0002\u0002*\u00d4\u0003\u0002\u0002\u0002,\u00d9\u0003\u0002\u0002",
    "\u0002./\u0005\u0004\u0003\u0002/0\u0005,\u0017\u000202\u0003\u0002",
    "\u0002\u00021.\u0003\u0002\u0002\u000212\u0003\u0002\u0002\u000223\u0003",
    "\u0002\u0002\u000234\u0007\r\u0002\u000245\u0005\u0006\u0004\u00025",
    "6\u0007\t\u0002\u000269\u0005,\u0017\u000278\u0007\u0010\u0002\u0002",
    "8:\u0005,\u0017\u000297\u0003\u0002\u0002\u00029:\u0003\u0002\u0002",
    "\u0002:?\u0003\u0002\u0002\u0002;<\u0007\t\u0002\u0002<=\u0005\b\u0005",
    "\u0002=>\u0005,\u0017\u0002>@\u0003\u0002\u0002\u0002?;\u0003\u0002",
    "\u0002\u0002?@\u0003\u0002\u0002\u0002@J\u0003\u0002\u0002\u0002AD\u0007",
    "\u0011\u0002\u0002BC\u0007\b\u0002\u0002CE\u0007\u000b\u0002\u0002D",
    "B\u0003\u0002\u0002\u0002DE\u0003\u0002\u0002\u0002EF\u0003\u0002\u0002",
    "\u0002FG\u0005,\u0017\u0002GH\u0005\n\u0006\u0002HI\u0005,\u0017\u0002",
    "IK\u0003\u0002\u0002\u0002JA\u0003\u0002\u0002\u0002JK\u0003\u0002\u0002",
    "\u0002KQ\u0003\u0002\u0002\u0002LM\u0007\u0012\u0002\u0002MN\u0005,",
    "\u0017\u0002NO\u0005\f\u0007\u0002OP\u0005,\u0017\u0002PR\u0003\u0002",
    "\u0002\u0002QL\u0003\u0002\u0002\u0002QR\u0003\u0002\u0002\u0002RX\u0003",
    "\u0002\u0002\u0002ST\u0007\u0013\u0002\u0002TU\u0005,\u0017\u0002UV",
    "\u0005\u000e\b\u0002VW\u0005,\u0017\u0002WY\u0003\u0002\u0002\u0002",
    "XS\u0003\u0002\u0002\u0002XY\u0003\u0002\u0002\u0002Yc\u0003\u0002\u0002",
    "\u0002Z]\u0007\u0016\u0002\u0002[\\\u0007\b\u0002\u0002\\^\u0007\u000b",
    "\u0002\u0002][\u0003\u0002\u0002\u0002]^\u0003\u0002\u0002\u0002^_\u0003",
    "\u0002\u0002\u0002_`\u0005,\u0017\u0002`a\u0005\u0010\t\u0002ab\u0005",
    ",\u0017\u0002bd\u0003\u0002\u0002\u0002cZ\u0003\u0002\u0002\u0002cd",
    "\u0003\u0002\u0002\u0002dn\u0003\u0002\u0002\u0002eh\u0007\u0017\u0002",
    "\u0002fg\u0007\b\u0002\u0002gi\u0007\u000b\u0002\u0002hf\u0003\u0002",
    "\u0002\u0002hi\u0003\u0002\u0002\u0002ij\u0003\u0002\u0002\u0002jk\u0005",
    ",\u0017\u0002kl\u0005 \u0011\u0002lm\u0005,\u0017\u0002mo\u0003\u0002",
    "\u0002\u0002ne\u0003\u0002\u0002\u0002no\u0003\u0002\u0002\u0002op\u0003",
    "\u0002\u0002\u0002pq\u0007\u0002\u0002\u0003q\u0003\u0003\u0002\u0002",
    "\u0002rs\u0007\f\u0002\u0002st\u0005&\u0014\u0002tu\u0007\f\u0002\u0002",
    "u\u0005\u0003\u0002\u0002\u0002vw\u0005$\u0013\u0002w\u0007\u0003\u0002",
    "\u0002\u0002xy\u0005&\u0014\u0002y\t\u0003\u0002\u0002\u0002z{\u0005",
    "\"\u0012\u0002{\u000b\u0003\u0002\u0002\u0002|}\u0005\"\u0012\u0002",
    "}\r\u0003\u0002\u0002\u0002~\u007f\u0005,\u0017\u0002\u007f\u0088\u0005",
    "\u0014\u000b\u0002\u0080\u0081\u0005,\u0017\u0002\u0081\u0084\u0007",
    "\u0014\u0002\u0002\u0082\u0083\u0007\b\u0002\u0002\u0083\u0085\u0007",
    "\u000b\u0002\u0002\u0084\u0082\u0003\u0002\u0002\u0002\u0084\u0085\u0003",
    "\u0002\u0002\u0002\u0085\u0086\u0003\u0002\u0002\u0002\u0086\u0087\u0005",
    "\u0016\f\u0002\u0087\u0089\u0003\u0002\u0002\u0002\u0088\u0080\u0003",
    "\u0002\u0002\u0002\u0088\u0089\u0003\u0002\u0002\u0002\u0089\u0092\u0003",
    "\u0002\u0002\u0002\u008a\u008b\u0005,\u0017\u0002\u008b\u008e\u0007",
    "\u0015\u0002\u0002\u008c\u008d\u0007\b\u0002\u0002\u008d\u008f\u0007",
    "\u000b\u0002\u0002\u008e\u008c\u0003\u0002\u0002\u0002\u008e\u008f\u0003",
    "\u0002\u0002\u0002\u008f\u0090\u0003\u0002\u0002\u0002\u0090\u0091\u0005",
    "\u0018\r\u0002\u0091\u0093\u0003\u0002\u0002\u0002\u0092\u008a\u0003",
    "\u0002\u0002\u0002\u0092\u0093\u0003\u0002\u0002\u0002\u0093\u000f\u0003",
    "\u0002\u0002\u0002\u0094\u0095\u0005\u0012\n\u0002\u0095\u0096\u0005",
    ",\u0017\u0002\u0096\u0098\u0003\u0002\u0002\u0002\u0097\u0094\u0003",
    "\u0002\u0002\u0002\u0098\u0099\u0003\u0002\u0002\u0002\u0099\u0097\u0003",
    "\u0002\u0002\u0002\u0099\u009a\u0003\u0002\u0002\u0002\u009a\u0011\u0003",
    "\u0002\u0002\u0002\u009b\u009c\u0007\u000e\u0002\u0002\u009c\u009d\u0005",
    "\u001a\u000e\u0002\u009d\u00a1\u0007\t\u0002\u0002\u009e\u009f\u0005",
    ",\u0017\u0002\u009f\u00a0\u0005\u001c\u000f\u0002\u00a0\u00a2\u0003",
    "\u0002\u0002\u0002\u00a1\u009e\u0003\u0002\u0002\u0002\u00a1\u00a2\u0003",
    "\u0002\u0002\u0002\u00a2\u00a6\u0003\u0002\u0002\u0002\u00a3\u00a4\u0005",
    ",\u0017\u0002\u00a4\u00a5\u0005\u001e\u0010\u0002\u00a5\u00a7\u0003",
    "\u0002\u0002\u0002\u00a6\u00a3\u0003\u0002\u0002\u0002\u00a6\u00a7\u0003",
    "\u0002\u0002\u0002\u00a7\u0013\u0003\u0002\u0002\u0002\u00a8\u00a9\u0005",
    "&\u0014\u0002\u00a9\u0015\u0003\u0002\u0002\u0002\u00aa\u00ab\u0005",
    "\"\u0012\u0002\u00ab\u0017\u0003\u0002\u0002\u0002\u00ac\u00ad\u0005",
    "&\u0014\u0002\u00ad\u0019\u0003\u0002\u0002\u0002\u00ae\u00af\u0005",
    "$\u0013\u0002\u00af\u001b\u0003\u0002\u0002\u0002\u00b0\u00b1\u0005",
    "&\u0014\u0002\u00b1\u001d\u0003\u0002\u0002\u0002\u00b2\u00b3\u0005",
    ",\u0017\u0002\u00b3\u00b4\u0007\n\u0002\u0002\u00b4\u00b5\t\u0002\u0002",
    "\u0002\u00b5\u00b6\u0005$\u0013\u0002\u00b6\u00b8\u0003\u0002\u0002",
    "\u0002\u00b7\u00b2\u0003\u0002\u0002\u0002\u00b8\u00b9\u0003\u0002\u0002",
    "\u0002\u00b9\u00b7\u0003\u0002\u0002\u0002\u00b9\u00ba\u0003\u0002\u0002",
    "\u0002\u00ba\u001f\u0003\u0002\u0002\u0002\u00bb\u00bc\u0005&\u0014",
    "\u0002\u00bc!\u0003\u0002\u0002\u0002\u00bd\u00be\u0005,\u0017\u0002",
    "\u00be\u00c0\u0007\n\u0002\u0002\u00bf\u00c1\u0005$\u0013\u0002\u00c0",
    "\u00bf\u0003\u0002\u0002\u0002\u00c0\u00c1\u0003\u0002\u0002\u0002\u00c1",
    "\u00c3\u0003\u0002\u0002\u0002\u00c2\u00bd\u0003\u0002\u0002\u0002\u00c3",
    "\u00c4\u0003\u0002\u0002\u0002\u00c4\u00c2\u0003\u0002\u0002\u0002\u00c4",
    "\u00c5\u0003\u0002\u0002\u0002\u00c5#\u0003\u0002\u0002\u0002\u00c6",
    "\u00c9\u0005(\u0015\u0002\u00c7\u00c9\u0007\b\u0002\u0002\u00c8\u00c6",
    "\u0003\u0002\u0002\u0002\u00c8\u00c7\u0003\u0002\u0002\u0002\u00c9\u00ca",
    "\u0003\u0002\u0002\u0002\u00ca\u00cb\u0003\u0002\u0002\u0002\u00ca\u00c8",
    "\u0003\u0002\u0002\u0002\u00cb%\u0003\u0002\u0002\u0002\u00cc\u00cf",
    "\u0005(\u0015\u0002\u00cd\u00cf\u0005*\u0016\u0002\u00ce\u00cc\u0003",
    "\u0002\u0002\u0002\u00ce\u00cd\u0003\u0002\u0002\u0002\u00cf\u00d0\u0003",
    "\u0002\u0002\u0002\u00d0\u00d1\u0003\u0002\u0002\u0002\u00d0\u00ce\u0003",
    "\u0002\u0002\u0002\u00d1\'\u0003\u0002\u0002\u0002\u00d2\u00d3\t\u0003",
    "\u0002\u0002\u00d3)\u0003\u0002\u0002\u0002\u00d4\u00d5\t\u0004\u0002",
    "\u0002\u00d5+\u0003\u0002\u0002\u0002\u00d6\u00d8\u0005*\u0016\u0002",
    "\u00d7\u00d6\u0003\u0002\u0002\u0002\u00d8\u00db\u0003\u0002\u0002\u0002",
    "\u00d9\u00d7\u0003\u0002\u0002\u0002\u00d9\u00da\u0003\u0002\u0002\u0002",
    "\u00da-\u0003\u0002\u0002\u0002\u00db\u00d9\u0003\u0002\u0002\u0002",
    "\u001c19?DJQX]chn\u0084\u0088\u008e\u0092\u0099\u00a1\u00a6\u00b9\u00c0",
    "\u00c4\u00c8\u00ca\u00ce\u00d0\u00d9"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class MADRParser extends antlr4.Parser {

    static grammarFileName = "MADR.g4";
    static literalNames = [ null, "'Good, because '", "'Neutral, because '", 
                            "'Bad, because '", null, null, null, null, null, 
                            "'<!-- optional -->'", null, "'# '" ];
    static symbolicNames = [ null, null, null, null, "WORD", "CHARACTER", 
                             "WS", "NEWLINE", "LIST_MARKER", "OPTIONAL_MAKER", 
                             "YAML_MARKER", "HEADING_PREFIX", "SUBSUBHEADING_PREFIX", 
                             "SUBSUBSUBHEADING_PREFIX", "CONTEXT_AND_PROBLEM_STATEMENT", 
                             "DECISION_DRIVERS_HEADING", "CONSIDERED_OPTIONS_HEADING", 
                             "DECISION_OUTCOME_HEADING", "CONSEQUENCES_HEADING", 
                             "CONFIRMATION_HEADING", "PROS_AND_CONS_OF_THE_OPTIONS_HEADING", 
                             "MORE_INFORMATION_HEADING" ];
    static ruleNames = [ "start", "yaml", "title", "contextAndProblemStatement", 
                         "decisionDrivers", "consideredOptions", "decisionOutcome", 
                         "prosAndConsOfOptions", "optionSection", "chosenOptionAndExplanation", 
                         "consequences", "confirmation", "optionTitle", 
                         "optionDescription", "argumentList", "moreInformation", 
                         "list", "textLine", "multilineText", "any", "wslb", 
                         "wslbs" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = MADRParser.ruleNames;
        this.literalNames = MADRParser.literalNames;
        this.symbolicNames = MADRParser.symbolicNames;
    }

    get atn() {
        return atn;
    }



	start() {
	    let localctx = new StartContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, MADRParser.RULE_start);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 47;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.YAML_MARKER) {
	            this.state = 44;
	            this.yaml();
	            this.state = 45;
	            this.wslbs();
	        }

	        this.state = 49;
	        this.match(MADRParser.HEADING_PREFIX);
	        this.state = 50;
	        this.title();
	        this.state = 51;
	        this.match(MADRParser.NEWLINE);
	        this.state = 52;
	        this.wslbs();
	        this.state = 55;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.CONTEXT_AND_PROBLEM_STATEMENT) {
	            this.state = 53;
	            this.match(MADRParser.CONTEXT_AND_PROBLEM_STATEMENT);
	            this.state = 54;
	            this.wslbs();
	        }

	        this.state = 61;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.NEWLINE) {
	            this.state = 57;
	            this.match(MADRParser.NEWLINE);
	            this.state = 58;
	            this.contextAndProblemStatement();
	            this.state = 59;
	            this.wslbs();
	        }

	        this.state = 72;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.DECISION_DRIVERS_HEADING) {
	            this.state = 63;
	            this.match(MADRParser.DECISION_DRIVERS_HEADING);
	            this.state = 66;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
	            if(la_===1) {
	                this.state = 64;
	                this.match(MADRParser.WS);
	                this.state = 65;
	                this.match(MADRParser.OPTIONAL_MAKER);

	            }
	            this.state = 68;
	            this.wslbs();
	            this.state = 69;
	            this.decisionDrivers();
	            this.state = 70;
	            this.wslbs();
	        }

	        this.state = 79;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.CONSIDERED_OPTIONS_HEADING) {
	            this.state = 74;
	            this.match(MADRParser.CONSIDERED_OPTIONS_HEADING);
	            this.state = 75;
	            this.wslbs();
	            this.state = 76;
	            this.consideredOptions();
	            this.state = 77;
	            this.wslbs();
	        }

	        this.state = 86;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.DECISION_OUTCOME_HEADING) {
	            this.state = 81;
	            this.match(MADRParser.DECISION_OUTCOME_HEADING);
	            this.state = 82;
	            this.wslbs();
	            this.state = 83;
	            this.decisionOutcome();
	            this.state = 84;
	            this.wslbs();
	        }

	        this.state = 97;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.PROS_AND_CONS_OF_THE_OPTIONS_HEADING) {
	            this.state = 88;
	            this.match(MADRParser.PROS_AND_CONS_OF_THE_OPTIONS_HEADING);
	            this.state = 91;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
	            if(la_===1) {
	                this.state = 89;
	                this.match(MADRParser.WS);
	                this.state = 90;
	                this.match(MADRParser.OPTIONAL_MAKER);

	            }
	            this.state = 93;
	            this.wslbs();
	            this.state = 94;
	            this.prosAndConsOfOptions();
	            this.state = 95;
	            this.wslbs();
	        }

	        this.state = 108;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.MORE_INFORMATION_HEADING) {
	            this.state = 99;
	            this.match(MADRParser.MORE_INFORMATION_HEADING);
	            this.state = 102;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
	            if(la_===1) {
	                this.state = 100;
	                this.match(MADRParser.WS);
	                this.state = 101;
	                this.match(MADRParser.OPTIONAL_MAKER);

	            }
	            this.state = 104;
	            this.wslbs();
	            this.state = 105;
	            this.moreInformation();
	            this.state = 106;
	            this.wslbs();
	        }

	        this.state = 110;
	        this.match(MADRParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	yaml() {
	    let localctx = new YamlContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, MADRParser.RULE_yaml);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 112;
	        this.match(MADRParser.YAML_MARKER);
	        this.state = 113;
	        this.multilineText();
	        this.state = 114;
	        this.match(MADRParser.YAML_MARKER);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	title() {
	    let localctx = new TitleContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, MADRParser.RULE_title);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 116;
	        this.textLine();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	contextAndProblemStatement() {
	    let localctx = new ContextAndProblemStatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, MADRParser.RULE_contextAndProblemStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 118;
	        this.multilineText();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	decisionDrivers() {
	    let localctx = new DecisionDriversContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, MADRParser.RULE_decisionDrivers);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 120;
	        this.list();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	consideredOptions() {
	    let localctx = new ConsideredOptionsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, MADRParser.RULE_consideredOptions);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 122;
	        this.list();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	decisionOutcome() {
	    let localctx = new DecisionOutcomeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, MADRParser.RULE_decisionOutcome);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 124;
	        this.wslbs();
	        this.state = 125;
	        this.chosenOptionAndExplanation();
	        this.state = 134;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,12,this._ctx);
	        if(la_===1) {
	            this.state = 126;
	            this.wslbs();
	            this.state = 127;
	            this.match(MADRParser.CONSEQUENCES_HEADING);
	            this.state = 130;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
	            if(la_===1) {
	                this.state = 128;
	                this.match(MADRParser.WS);
	                this.state = 129;
	                this.match(MADRParser.OPTIONAL_MAKER);

	            }
	            this.state = 132;
	            this.consequences();

	        }
	        this.state = 144;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,14,this._ctx);
	        if(la_===1) {
	            this.state = 136;
	            this.wslbs();
	            this.state = 137;
	            this.match(MADRParser.CONFIRMATION_HEADING);
	            this.state = 140;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,13,this._ctx);
	            if(la_===1) {
	                this.state = 138;
	                this.match(MADRParser.WS);
	                this.state = 139;
	                this.match(MADRParser.OPTIONAL_MAKER);

	            }
	            this.state = 142;
	            this.confirmation();

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	prosAndConsOfOptions() {
	    let localctx = new ProsAndConsOfOptionsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, MADRParser.RULE_prosAndConsOfOptions);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 149; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 146;
	            this.optionSection();
	            this.state = 147;
	            this.wslbs();
	            this.state = 151; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===MADRParser.SUBSUBHEADING_PREFIX);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	optionSection() {
	    let localctx = new OptionSectionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, MADRParser.RULE_optionSection);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 153;
	        this.match(MADRParser.SUBSUBHEADING_PREFIX);
	        this.state = 154;
	        this.optionTitle();
	        this.state = 155;
	        this.match(MADRParser.NEWLINE);
	        this.state = 159;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,16,this._ctx);
	        if(la_===1) {
	            this.state = 156;
	            this.wslbs();
	            this.state = 157;
	            this.optionDescription();

	        }
	        this.state = 164;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,17,this._ctx);
	        if(la_===1) {
	            this.state = 161;
	            this.wslbs();
	            this.state = 162;
	            this.argumentList();

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	chosenOptionAndExplanation() {
	    let localctx = new ChosenOptionAndExplanationContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, MADRParser.RULE_chosenOptionAndExplanation);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 166;
	        this.multilineText();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	consequences() {
	    let localctx = new ConsequencesContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, MADRParser.RULE_consequences);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 168;
	        this.list();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	confirmation() {
	    let localctx = new ConfirmationContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, MADRParser.RULE_confirmation);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 170;
	        this.multilineText();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	optionTitle() {
	    let localctx = new OptionTitleContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, MADRParser.RULE_optionTitle);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 172;
	        this.textLine();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	optionDescription() {
	    let localctx = new OptionDescriptionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, MADRParser.RULE_optionDescription);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 174;
	        this.multilineText();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	argumentList() {
	    let localctx = new ArgumentListContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, MADRParser.RULE_argumentList);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 181; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 176;
	        		this.wslbs();
	        		this.state = 177;
	        		this.match(MADRParser.LIST_MARKER);
	        		this.state = 178;
	        		_la = this._input.LA(1);
	        		if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << MADRParser.T__0) | (1 << MADRParser.T__1) | (1 << MADRParser.T__2))) !== 0))) {
	        		this._errHandler.recoverInline(this);
	        		}
	        		else {
	        			this._errHandler.reportMatch(this);
	        		    this.consume();
	        		}
	        		this.state = 179;
	        		this.textLine();
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 183; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,18, this._ctx);
	        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	moreInformation() {
	    let localctx = new MoreInformationContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, MADRParser.RULE_moreInformation);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 185;
	        this.multilineText();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	list() {
	    let localctx = new ListContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 32, MADRParser.RULE_list);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 192; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 187;
	        		this.wslbs();
	        		this.state = 188;
	        		this.match(MADRParser.LIST_MARKER);
	        		this.state = 190;
	        		this._errHandler.sync(this);
	        		var la_ = this._interp.adaptivePredict(this._input,19,this._ctx);
	        		if(la_===1) {
	        		    this.state = 189;
	        		    this.textLine();

	        		}
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 194; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,20, this._ctx);
	        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	textLine() {
	    let localctx = new TextLineContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 34, MADRParser.RULE_textLine);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 198; 
	        this._errHandler.sync(this);
	        var _alt = 1+1;
	        do {
	        	switch (_alt) {
	        	case 1+1:
	        		this.state = 198;
	        		this._errHandler.sync(this);
	        		switch(this._input.LA(1)) {
	        		case MADRParser.WORD:
	        		case MADRParser.CHARACTER:
	        		case MADRParser.LIST_MARKER:
	        		case MADRParser.YAML_MARKER:
	        		case MADRParser.HEADING_PREFIX:
	        		case MADRParser.SUBSUBSUBHEADING_PREFIX:
	        		    this.state = 196;
	        		    this.any();
	        		    break;
	        		case MADRParser.WS:
	        		    this.state = 197;
	        		    this.match(MADRParser.WS);
	        		    break;
	        		default:
	        		    throw new antlr4.error.NoViableAltException(this);
	        		}
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 200; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,22, this._ctx);
	        } while ( _alt!=1 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	multilineText() {
	    let localctx = new MultilineTextContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 36, MADRParser.RULE_multilineText);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 204; 
	        this._errHandler.sync(this);
	        var _alt = 1+1;
	        do {
	        	switch (_alt) {
	        	case 1+1:
	        		this.state = 204;
	        		this._errHandler.sync(this);
	        		switch(this._input.LA(1)) {
	        		case MADRParser.WORD:
	        		case MADRParser.CHARACTER:
	        		case MADRParser.LIST_MARKER:
	        		case MADRParser.YAML_MARKER:
	        		case MADRParser.HEADING_PREFIX:
	        		case MADRParser.SUBSUBSUBHEADING_PREFIX:
	        		    this.state = 202;
	        		    this.any();
	        		    break;
	        		case MADRParser.WS:
	        		case MADRParser.NEWLINE:
	        		    this.state = 203;
	        		    this.wslb();
	        		    break;
	        		default:
	        		    throw new antlr4.error.NoViableAltException(this);
	        		}
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 206; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,24, this._ctx);
	        } while ( _alt!=1 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	any() {
	    let localctx = new AnyContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 38, MADRParser.RULE_any);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 208;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << MADRParser.WORD) | (1 << MADRParser.CHARACTER) | (1 << MADRParser.LIST_MARKER) | (1 << MADRParser.YAML_MARKER) | (1 << MADRParser.HEADING_PREFIX) | (1 << MADRParser.SUBSUBSUBHEADING_PREFIX))) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	wslb() {
	    let localctx = new WslbContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 40, MADRParser.RULE_wslb);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 210;
	        _la = this._input.LA(1);
	        if(!(_la===MADRParser.WS || _la===MADRParser.NEWLINE)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	wslbs() {
	    let localctx = new WslbsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 42, MADRParser.RULE_wslbs);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 215;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,25,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 212;
	                this.wslb(); 
	            }
	            this.state = 217;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,25,this._ctx);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

MADRParser.EOF = antlr4.Token.EOF;
MADRParser.T__0 = 1;
MADRParser.T__1 = 2;
MADRParser.T__2 = 3;
MADRParser.WORD = 4;
MADRParser.CHARACTER = 5;
MADRParser.WS = 6;
MADRParser.NEWLINE = 7;
MADRParser.LIST_MARKER = 8;
MADRParser.OPTIONAL_MAKER = 9;
MADRParser.YAML_MARKER = 10;
MADRParser.HEADING_PREFIX = 11;
MADRParser.SUBSUBHEADING_PREFIX = 12;
MADRParser.SUBSUBSUBHEADING_PREFIX = 13;
MADRParser.CONTEXT_AND_PROBLEM_STATEMENT = 14;
MADRParser.DECISION_DRIVERS_HEADING = 15;
MADRParser.CONSIDERED_OPTIONS_HEADING = 16;
MADRParser.DECISION_OUTCOME_HEADING = 17;
MADRParser.CONSEQUENCES_HEADING = 18;
MADRParser.CONFIRMATION_HEADING = 19;
MADRParser.PROS_AND_CONS_OF_THE_OPTIONS_HEADING = 20;
MADRParser.MORE_INFORMATION_HEADING = 21;

MADRParser.RULE_start = 0;
MADRParser.RULE_yaml = 1;
MADRParser.RULE_title = 2;
MADRParser.RULE_contextAndProblemStatement = 3;
MADRParser.RULE_decisionDrivers = 4;
MADRParser.RULE_consideredOptions = 5;
MADRParser.RULE_decisionOutcome = 6;
MADRParser.RULE_prosAndConsOfOptions = 7;
MADRParser.RULE_optionSection = 8;
MADRParser.RULE_chosenOptionAndExplanation = 9;
MADRParser.RULE_consequences = 10;
MADRParser.RULE_confirmation = 11;
MADRParser.RULE_optionTitle = 12;
MADRParser.RULE_optionDescription = 13;
MADRParser.RULE_argumentList = 14;
MADRParser.RULE_moreInformation = 15;
MADRParser.RULE_list = 16;
MADRParser.RULE_textLine = 17;
MADRParser.RULE_multilineText = 18;
MADRParser.RULE_any = 19;
MADRParser.RULE_wslb = 20;
MADRParser.RULE_wslbs = 21;

class StartContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_start;
    }

	HEADING_PREFIX() {
	    return this.getToken(MADRParser.HEADING_PREFIX, 0);
	};

	title() {
	    return this.getTypedRuleContext(TitleContext,0);
	};

	NEWLINE = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(MADRParser.NEWLINE);
	    } else {
	        return this.getToken(MADRParser.NEWLINE, i);
	    }
	};


	wslbs = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(WslbsContext);
	    } else {
	        return this.getTypedRuleContext(WslbsContext,i);
	    }
	};

	EOF() {
	    return this.getToken(MADRParser.EOF, 0);
	};

	yaml() {
	    return this.getTypedRuleContext(YamlContext,0);
	};

	CONTEXT_AND_PROBLEM_STATEMENT() {
	    return this.getToken(MADRParser.CONTEXT_AND_PROBLEM_STATEMENT, 0);
	};

	contextAndProblemStatement() {
	    return this.getTypedRuleContext(ContextAndProblemStatementContext,0);
	};

	DECISION_DRIVERS_HEADING() {
	    return this.getToken(MADRParser.DECISION_DRIVERS_HEADING, 0);
	};

	decisionDrivers() {
	    return this.getTypedRuleContext(DecisionDriversContext,0);
	};

	CONSIDERED_OPTIONS_HEADING() {
	    return this.getToken(MADRParser.CONSIDERED_OPTIONS_HEADING, 0);
	};

	consideredOptions() {
	    return this.getTypedRuleContext(ConsideredOptionsContext,0);
	};

	DECISION_OUTCOME_HEADING() {
	    return this.getToken(MADRParser.DECISION_OUTCOME_HEADING, 0);
	};

	decisionOutcome() {
	    return this.getTypedRuleContext(DecisionOutcomeContext,0);
	};

	PROS_AND_CONS_OF_THE_OPTIONS_HEADING() {
	    return this.getToken(MADRParser.PROS_AND_CONS_OF_THE_OPTIONS_HEADING, 0);
	};

	prosAndConsOfOptions() {
	    return this.getTypedRuleContext(ProsAndConsOfOptionsContext,0);
	};

	MORE_INFORMATION_HEADING() {
	    return this.getToken(MADRParser.MORE_INFORMATION_HEADING, 0);
	};

	moreInformation() {
	    return this.getTypedRuleContext(MoreInformationContext,0);
	};

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(MADRParser.WS);
	    } else {
	        return this.getToken(MADRParser.WS, i);
	    }
	};


	OPTIONAL_MAKER = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(MADRParser.OPTIONAL_MAKER);
	    } else {
	        return this.getToken(MADRParser.OPTIONAL_MAKER, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterStart(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitStart(this);
		}
	}


}



class YamlContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_yaml;
    }

	YAML_MARKER = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(MADRParser.YAML_MARKER);
	    } else {
	        return this.getToken(MADRParser.YAML_MARKER, i);
	    }
	};


	multilineText() {
	    return this.getTypedRuleContext(MultilineTextContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterYaml(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitYaml(this);
		}
	}


}



class TitleContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_title;
    }

	textLine() {
	    return this.getTypedRuleContext(TextLineContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterTitle(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitTitle(this);
		}
	}


}



class ContextAndProblemStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_contextAndProblemStatement;
    }

	multilineText() {
	    return this.getTypedRuleContext(MultilineTextContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterContextAndProblemStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitContextAndProblemStatement(this);
		}
	}


}



class DecisionDriversContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_decisionDrivers;
    }

	list() {
	    return this.getTypedRuleContext(ListContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterDecisionDrivers(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitDecisionDrivers(this);
		}
	}


}



class ConsideredOptionsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_consideredOptions;
    }

	list() {
	    return this.getTypedRuleContext(ListContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterConsideredOptions(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitConsideredOptions(this);
		}
	}


}



class DecisionOutcomeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_decisionOutcome;
    }

	wslbs = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(WslbsContext);
	    } else {
	        return this.getTypedRuleContext(WslbsContext,i);
	    }
	};

	chosenOptionAndExplanation() {
	    return this.getTypedRuleContext(ChosenOptionAndExplanationContext,0);
	};

	CONSEQUENCES_HEADING() {
	    return this.getToken(MADRParser.CONSEQUENCES_HEADING, 0);
	};

	consequences() {
	    return this.getTypedRuleContext(ConsequencesContext,0);
	};

	CONFIRMATION_HEADING() {
	    return this.getToken(MADRParser.CONFIRMATION_HEADING, 0);
	};

	confirmation() {
	    return this.getTypedRuleContext(ConfirmationContext,0);
	};

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(MADRParser.WS);
	    } else {
	        return this.getToken(MADRParser.WS, i);
	    }
	};


	OPTIONAL_MAKER = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(MADRParser.OPTIONAL_MAKER);
	    } else {
	        return this.getToken(MADRParser.OPTIONAL_MAKER, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterDecisionOutcome(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitDecisionOutcome(this);
		}
	}


}



class ProsAndConsOfOptionsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_prosAndConsOfOptions;
    }

	optionSection = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(OptionSectionContext);
	    } else {
	        return this.getTypedRuleContext(OptionSectionContext,i);
	    }
	};

	wslbs = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(WslbsContext);
	    } else {
	        return this.getTypedRuleContext(WslbsContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterProsAndConsOfOptions(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitProsAndConsOfOptions(this);
		}
	}


}



class OptionSectionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_optionSection;
    }

	SUBSUBHEADING_PREFIX() {
	    return this.getToken(MADRParser.SUBSUBHEADING_PREFIX, 0);
	};

	optionTitle() {
	    return this.getTypedRuleContext(OptionTitleContext,0);
	};

	NEWLINE() {
	    return this.getToken(MADRParser.NEWLINE, 0);
	};

	wslbs = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(WslbsContext);
	    } else {
	        return this.getTypedRuleContext(WslbsContext,i);
	    }
	};

	optionDescription() {
	    return this.getTypedRuleContext(OptionDescriptionContext,0);
	};

	argumentList() {
	    return this.getTypedRuleContext(ArgumentListContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterOptionSection(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitOptionSection(this);
		}
	}


}



class ChosenOptionAndExplanationContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_chosenOptionAndExplanation;
    }

	multilineText() {
	    return this.getTypedRuleContext(MultilineTextContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterChosenOptionAndExplanation(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitChosenOptionAndExplanation(this);
		}
	}


}



class ConsequencesContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_consequences;
    }

	list() {
	    return this.getTypedRuleContext(ListContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterConsequences(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitConsequences(this);
		}
	}


}



class ConfirmationContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_confirmation;
    }

	multilineText() {
	    return this.getTypedRuleContext(MultilineTextContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterConfirmation(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitConfirmation(this);
		}
	}


}



class OptionTitleContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_optionTitle;
    }

	textLine() {
	    return this.getTypedRuleContext(TextLineContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterOptionTitle(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitOptionTitle(this);
		}
	}


}



class OptionDescriptionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_optionDescription;
    }

	multilineText() {
	    return this.getTypedRuleContext(MultilineTextContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterOptionDescription(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitOptionDescription(this);
		}
	}


}



class ArgumentListContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_argumentList;
    }

	wslbs = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(WslbsContext);
	    } else {
	        return this.getTypedRuleContext(WslbsContext,i);
	    }
	};

	LIST_MARKER = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(MADRParser.LIST_MARKER);
	    } else {
	        return this.getToken(MADRParser.LIST_MARKER, i);
	    }
	};


	textLine = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(TextLineContext);
	    } else {
	        return this.getTypedRuleContext(TextLineContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterArgumentList(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitArgumentList(this);
		}
	}


}



class MoreInformationContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_moreInformation;
    }

	multilineText() {
	    return this.getTypedRuleContext(MultilineTextContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterMoreInformation(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitMoreInformation(this);
		}
	}


}



class ListContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_list;
    }

	wslbs = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(WslbsContext);
	    } else {
	        return this.getTypedRuleContext(WslbsContext,i);
	    }
	};

	LIST_MARKER = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(MADRParser.LIST_MARKER);
	    } else {
	        return this.getToken(MADRParser.LIST_MARKER, i);
	    }
	};


	textLine = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(TextLineContext);
	    } else {
	        return this.getTypedRuleContext(TextLineContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterList(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitList(this);
		}
	}


}



class TextLineContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_textLine;
    }

	any = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(AnyContext);
	    } else {
	        return this.getTypedRuleContext(AnyContext,i);
	    }
	};

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(MADRParser.WS);
	    } else {
	        return this.getToken(MADRParser.WS, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterTextLine(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitTextLine(this);
		}
	}


}



class MultilineTextContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_multilineText;
    }

	any = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(AnyContext);
	    } else {
	        return this.getTypedRuleContext(AnyContext,i);
	    }
	};

	wslb = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(WslbContext);
	    } else {
	        return this.getTypedRuleContext(WslbContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterMultilineText(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitMultilineText(this);
		}
	}


}



class AnyContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_any;
    }

	WORD() {
	    return this.getToken(MADRParser.WORD, 0);
	};

	CHARACTER() {
	    return this.getToken(MADRParser.CHARACTER, 0);
	};

	LIST_MARKER() {
	    return this.getToken(MADRParser.LIST_MARKER, 0);
	};

	HEADING_PREFIX() {
	    return this.getToken(MADRParser.HEADING_PREFIX, 0);
	};

	SUBSUBSUBHEADING_PREFIX() {
	    return this.getToken(MADRParser.SUBSUBSUBHEADING_PREFIX, 0);
	};

	YAML_MARKER() {
	    return this.getToken(MADRParser.YAML_MARKER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterAny(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitAny(this);
		}
	}


}



class WslbContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_wslb;
    }

	WS() {
	    return this.getToken(MADRParser.WS, 0);
	};

	NEWLINE() {
	    return this.getToken(MADRParser.NEWLINE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterWslb(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitWslb(this);
		}
	}


}



class WslbsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_wslbs;
    }

	wslb = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(WslbContext);
	    } else {
	        return this.getTypedRuleContext(WslbContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterWslbs(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitWslbs(this);
		}
	}


}




MADRParser.StartContext = StartContext; 
MADRParser.YamlContext = YamlContext; 
MADRParser.TitleContext = TitleContext; 
MADRParser.ContextAndProblemStatementContext = ContextAndProblemStatementContext; 
MADRParser.DecisionDriversContext = DecisionDriversContext; 
MADRParser.ConsideredOptionsContext = ConsideredOptionsContext; 
MADRParser.DecisionOutcomeContext = DecisionOutcomeContext; 
MADRParser.ProsAndConsOfOptionsContext = ProsAndConsOfOptionsContext; 
MADRParser.OptionSectionContext = OptionSectionContext; 
MADRParser.ChosenOptionAndExplanationContext = ChosenOptionAndExplanationContext; 
MADRParser.ConsequencesContext = ConsequencesContext; 
MADRParser.ConfirmationContext = ConfirmationContext; 
MADRParser.OptionTitleContext = OptionTitleContext; 
MADRParser.OptionDescriptionContext = OptionDescriptionContext; 
MADRParser.ArgumentListContext = ArgumentListContext; 
MADRParser.MoreInformationContext = MoreInformationContext; 
MADRParser.ListContext = ListContext; 
MADRParser.TextLineContext = TextLineContext; 
MADRParser.MultilineTextContext = MultilineTextContext; 
MADRParser.AnyContext = AnyContext; 
MADRParser.WslbContext = WslbContext; 
MADRParser.WslbsContext = WslbsContext; 
