// Generated from /Users/stevenchen/Desktop/Studium/Uni Stuttgart/Übungen/Uni Stuttgart/SS22/Bachelorarbeit/Repo/vscode-adr-manager/src/plugins/parser/MADR.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';
import MADRListener from './MADRListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\u001a\u0127\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010",
    "\t\u0010\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013",
    "\u0004\u0014\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017",
    "\t\u0017\u0004\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a",
    "\u0004\u001b\t\u001b\u0004\u001c\t\u001c\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0005\u0002<\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0005\u0002F",
    "\n\u0002\u0003\u0002\u0003\u0002\u0005\u0002J\n\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0002\u0005\u0002P\n\u0002\u0003\u0002\u0003",
    "\u0002\u0005\u0002T\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0005\u0002Z\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0005",
    "\u0002_\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0005",
    "\u0002e\n\u0002\u0003\u0002\u0003\u0002\u0005\u0002i\n\u0002\u0003\u0002",
    "\u0003\u0002\u0005\u0002m\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0005\u0002s\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0005\u0002x\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0005\u0002~\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0005\u0002\u0085\n\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0002\u0005\u0002\u008c\n\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0002\u0005\u0002\u0091\n\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0002\u0005\u0002\u0097\n\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0002\u0005\u0002\u009c\n\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0002\u0005\u0002\u00a2\n\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0004",
    "\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0007",
    "\u0003\u0007\u0003\b\u0003\b\u0003\t\u0003\t\u0003\n\u0003\n\u0003\u000b",
    "\u0003\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0005\f",
    "\u00c0\n\f\u0003\f\u0003\f\u0005\f\u00c4\n\f\u0003\f\u0003\f\u0003\f",
    "\u0003\f\u0005\f\u00ca\n\f\u0003\f\u0003\f\u0005\f\u00ce\n\f\u0003\r",
    "\u0003\r\u0003\r\u0006\r\u00d3\n\r\r\r\u000e\r\u00d4\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0005\u000e\u00dd",
    "\n\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0005\u000e\u00e2\n\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0005\u000e\u00e7\n\u000e\u0003",
    "\u000f\u0003\u000f\u0003\u0010\u0003\u0010\u0003\u0011\u0003\u0011\u0003",
    "\u0012\u0003\u0012\u0003\u0013\u0003\u0013\u0003\u0014\u0003\u0014\u0003",
    "\u0014\u0003\u0014\u0003\u0014\u0006\u0014\u00f8\n\u0014\r\u0014\u000e",
    "\u0014\u00f9\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015",
    "\u0006\u0015\u0101\n\u0015\r\u0015\u000e\u0015\u0102\u0003\u0016\u0003",
    "\u0016\u0003\u0016\u0003\u0017\u0003\u0017\u0003\u0017\u0005\u0017\u010b",
    "\n\u0017\u0006\u0017\u010d\n\u0017\r\u0017\u000e\u0017\u010e\u0003\u0018",
    "\u0003\u0018\u0006\u0018\u0113\n\u0018\r\u0018\u000e\u0018\u0114\u0003",
    "\u0019\u0003\u0019\u0006\u0019\u0119\n\u0019\r\u0019\u000e\u0019\u011a",
    "\u0003\u001a\u0003\u001a\u0003\u001b\u0003\u001b\u0003\u001c\u0007\u001c",
    "\u0122\n\u001c\f\u001c\u000e\u001c\u0125\u000b\u001c\u0003\u001c\u0004",
    "\u0114\u011a\u0002\u001d\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014",
    "\u0016\u0018\u001a\u001c\u001e \"$&(*,.0246\u0002\u0004\u0006\u0002",
    "\u0005\u0006\t\t\u000f\u0010\u0012\u0012\u0003\u0002\u0007\b\u0002\u012f",
    "\u0002;\u0003\u0002\u0002\u0002\u0004\u00a5\u0003\u0002\u0002\u0002",
    "\u0006\u00a9\u0003\u0002\u0002\u0002\b\u00ab\u0003\u0002\u0002\u0002",
    "\n\u00ad\u0003\u0002\u0002\u0002\f\u00af\u0003\u0002\u0002\u0002\u000e",
    "\u00b1\u0003\u0002\u0002\u0002\u0010\u00b3\u0003\u0002\u0002\u0002\u0012",
    "\u00b5\u0003\u0002\u0002\u0002\u0014\u00b7\u0003\u0002\u0002\u0002\u0016",
    "\u00b9\u0003\u0002\u0002\u0002\u0018\u00d2\u0003\u0002\u0002\u0002\u001a",
    "\u00d6\u0003\u0002\u0002\u0002\u001c\u00e8\u0003\u0002\u0002\u0002\u001e",
    "\u00ea\u0003\u0002\u0002\u0002 \u00ec\u0003\u0002\u0002\u0002\"\u00ee",
    "\u0003\u0002\u0002\u0002$\u00f0\u0003\u0002\u0002\u0002&\u00f7\u0003",
    "\u0002\u0002\u0002(\u0100\u0003\u0002\u0002\u0002*\u0104\u0003\u0002",
    "\u0002\u0002,\u010c\u0003\u0002\u0002\u0002.\u0112\u0003\u0002\u0002",
    "\u00020\u0118\u0003\u0002\u0002\u00022\u011c\u0003\u0002\u0002\u0002",
    "4\u011e\u0003\u0002\u0002\u00026\u0123\u0003\u0002\u0002\u000289\u0005",
    "\u0004\u0003\u00029:\u00056\u001c\u0002:<\u0003\u0002\u0002\u0002;8",
    "\u0003\u0002\u0002\u0002;<\u0003\u0002\u0002\u0002<=\u0003\u0002\u0002",
    "\u0002=>\u0007\u0010\u0002\u0002>?\u0005\u0006\u0004\u0002?@\u0007\b",
    "\u0002\u0002@I\u00056\u001c\u0002AB\u0007\n\u0002\u0002BE\u0005\b\u0005",
    "\u0002CD\u0007\u0007\u0002\u0002DF\u0007\r\u0002\u0002EC\u0003\u0002",
    "\u0002\u0002EF\u0003\u0002\u0002\u0002FG\u0003\u0002\u0002\u0002GH\u0005",
    "6\u001c\u0002HJ\u0003\u0002\u0002\u0002IA\u0003\u0002\u0002\u0002IJ",
    "\u0003\u0002\u0002\u0002JS\u0003\u0002\u0002\u0002KL\u0007\f\u0002\u0002",
    "LO\u0005\n\u0006\u0002MN\u0007\u0007\u0002\u0002NP\u0007\r\u0002\u0002",
    "OM\u0003\u0002\u0002\u0002OP\u0003\u0002\u0002\u0002PQ\u0003\u0002\u0002",
    "\u0002QR\u00056\u001c\u0002RT\u0003\u0002\u0002\u0002SK\u0003\u0002",
    "\u0002\u0002ST\u0003\u0002\u0002\u0002T^\u0003\u0002\u0002\u0002UV\u0007",
    "\u000b\u0002\u0002VY\u0005\f\u0007\u0002WX\u0007\u0007\u0002\u0002X",
    "Z\u0007\r\u0002\u0002YW\u0003\u0002\u0002\u0002YZ\u0003\u0002\u0002",
    "\u0002Z[\u0003\u0002\u0002\u0002[\\\u0007\b\u0002\u0002\\]\u00056\u001c",
    "\u0002]_\u0003\u0002\u0002\u0002^U\u0003\u0002\u0002\u0002^_\u0003\u0002",
    "\u0002\u0002_h\u0003\u0002\u0002\u0002`a\u0007\u000e\u0002\u0002ad\u0005",
    "\u000e\b\u0002bc\u0007\u0007\u0002\u0002ce\u0007\r\u0002\u0002db\u0003",
    "\u0002\u0002\u0002de\u0003\u0002\u0002\u0002ef\u0003\u0002\u0002\u0002",
    "fg\u00056\u001c\u0002gi\u0003\u0002\u0002\u0002h`\u0003\u0002\u0002",
    "\u0002hi\u0003\u0002\u0002\u0002il\u0003\u0002\u0002\u0002jk\u0007\u0013",
    "\u0002\u0002km\u00056\u001c\u0002lj\u0003\u0002\u0002\u0002lm\u0003",
    "\u0002\u0002\u0002mr\u0003\u0002\u0002\u0002no\u0007\b\u0002\u0002o",
    "p\u0005\u0010\t\u0002pq\u00056\u001c\u0002qs\u0003\u0002\u0002\u0002",
    "rn\u0003\u0002\u0002\u0002rs\u0003\u0002\u0002\u0002s}\u0003\u0002\u0002",
    "\u0002tw\u0007\u0014\u0002\u0002uv\u0007\u0007\u0002\u0002vx\u0007\r",
    "\u0002\u0002wu\u0003\u0002\u0002\u0002wx\u0003\u0002\u0002\u0002xy\u0003",
    "\u0002\u0002\u0002yz\u00056\u001c\u0002z{\u0005\u0012\n\u0002{|\u0005",
    "6\u001c\u0002|~\u0003\u0002\u0002\u0002}t\u0003\u0002\u0002\u0002}~",
    "\u0003\u0002\u0002\u0002~\u0084\u0003\u0002\u0002\u0002\u007f\u0080",
    "\u0007\u0015\u0002\u0002\u0080\u0081\u00056\u001c\u0002\u0081\u0082",
    "\u0005\u0014\u000b\u0002\u0082\u0083\u00056\u001c\u0002\u0083\u0085",
    "\u0003\u0002\u0002\u0002\u0084\u007f\u0003\u0002\u0002\u0002\u0084\u0085",
    "\u0003\u0002\u0002\u0002\u0085\u008b\u0003\u0002\u0002\u0002\u0086\u0087",
    "\u0007\u0016\u0002\u0002\u0087\u0088\u00056\u001c\u0002\u0088\u0089",
    "\u0005\u0016\f\u0002\u0089\u008a\u00056\u001c\u0002\u008a\u008c\u0003",
    "\u0002\u0002\u0002\u008b\u0086\u0003\u0002\u0002\u0002\u008b\u008c\u0003",
    "\u0002\u0002\u0002\u008c\u0096\u0003\u0002\u0002\u0002\u008d\u0090\u0007",
    "\u0019\u0002\u0002\u008e\u008f\u0007\u0007\u0002\u0002\u008f\u0091\u0007",
    "\r\u0002\u0002\u0090\u008e\u0003\u0002\u0002\u0002\u0090\u0091\u0003",
    "\u0002\u0002\u0002\u0091\u0092\u0003\u0002\u0002\u0002\u0092\u0093\u0005",
    "6\u001c\u0002\u0093\u0094\u0005\u0018\r\u0002\u0094\u0095\u00056\u001c",
    "\u0002\u0095\u0097\u0003\u0002\u0002\u0002\u0096\u008d\u0003\u0002\u0002",
    "\u0002\u0096\u0097\u0003\u0002\u0002\u0002\u0097\u00a1\u0003\u0002\u0002",
    "\u0002\u0098\u009b\u0007\u001a\u0002\u0002\u0099\u009a\u0007\u0007\u0002",
    "\u0002\u009a\u009c\u0007\r\u0002\u0002\u009b\u0099\u0003\u0002\u0002",
    "\u0002\u009b\u009c\u0003\u0002\u0002\u0002\u009c\u009d\u0003\u0002\u0002",
    "\u0002\u009d\u009e\u00056\u001c\u0002\u009e\u009f\u0005*\u0016\u0002",
    "\u009f\u00a0\u00056\u001c\u0002\u00a0\u00a2\u0003\u0002\u0002\u0002",
    "\u00a1\u0098\u0003\u0002\u0002\u0002\u00a1\u00a2\u0003\u0002\u0002\u0002",
    "\u00a2\u00a3\u0003\u0002\u0002\u0002\u00a3\u00a4\u0007\u0002\u0002\u0003",
    "\u00a4\u0003\u0003\u0002\u0002\u0002\u00a5\u00a6\u0007\u000f\u0002\u0002",
    "\u00a6\u00a7\u00050\u0019\u0002\u00a7\u00a8\u0007\u000f\u0002\u0002",
    "\u00a8\u0005\u0003\u0002\u0002\u0002\u00a9\u00aa\u0005.\u0018\u0002",
    "\u00aa\u0007\u0003\u0002\u0002\u0002\u00ab\u00ac\u0005.\u0018\u0002",
    "\u00ac\t\u0003\u0002\u0002\u0002\u00ad\u00ae\u0005.\u0018\u0002\u00ae",
    "\u000b\u0003\u0002\u0002\u0002\u00af\u00b0\u0005.\u0018\u0002\u00b0",
    "\r\u0003\u0002\u0002\u0002\u00b1\u00b2\u0005.\u0018\u0002\u00b2\u000f",
    "\u0003\u0002\u0002\u0002\u00b3\u00b4\u00050\u0019\u0002\u00b4\u0011",
    "\u0003\u0002\u0002\u0002\u00b5\u00b6\u0005,\u0017\u0002\u00b6\u0013",
    "\u0003\u0002\u0002\u0002\u00b7\u00b8\u0005,\u0017\u0002\u00b8\u0015",
    "\u0003\u0002\u0002\u0002\u00b9\u00ba\u00056\u001c\u0002\u00ba\u00c3",
    "\u0005\u001c\u000f\u0002\u00bb\u00bc\u00056\u001c\u0002\u00bc\u00bf",
    "\u0007\u0017\u0002\u0002\u00bd\u00be\u0007\u0007\u0002\u0002\u00be\u00c0",
    "\u0007\r\u0002\u0002\u00bf\u00bd\u0003\u0002\u0002\u0002\u00bf\u00c0",
    "\u0003\u0002\u0002\u0002\u00c0\u00c1\u0003\u0002\u0002\u0002\u00c1\u00c2",
    "\u0005\u001e\u0010\u0002\u00c2\u00c4\u0003\u0002\u0002\u0002\u00c3\u00bb",
    "\u0003\u0002\u0002\u0002\u00c3\u00c4\u0003\u0002\u0002\u0002\u00c4\u00cd",
    "\u0003\u0002\u0002\u0002\u00c5\u00c6\u00056\u001c\u0002\u00c6\u00c9",
    "\u0007\u0018\u0002\u0002\u00c7\u00c8\u0007\u0007\u0002\u0002\u00c8\u00ca",
    "\u0007\r\u0002\u0002\u00c9\u00c7\u0003\u0002\u0002\u0002\u00c9\u00ca",
    "\u0003\u0002\u0002\u0002\u00ca\u00cb\u0003\u0002\u0002\u0002\u00cb\u00cc",
    "\u0005 \u0011\u0002\u00cc\u00ce\u0003\u0002\u0002\u0002\u00cd\u00c5",
    "\u0003\u0002\u0002\u0002\u00cd\u00ce\u0003\u0002\u0002\u0002\u00ce\u0017",
    "\u0003\u0002\u0002\u0002\u00cf\u00d0\u0005\u001a\u000e\u0002\u00d0\u00d1",
    "\u00056\u001c\u0002\u00d1\u00d3\u0003\u0002\u0002\u0002\u00d2\u00cf",
    "\u0003\u0002\u0002\u0002\u00d3\u00d4\u0003\u0002\u0002\u0002\u00d4\u00d2",
    "\u0003\u0002\u0002\u0002\u00d4\u00d5\u0003\u0002\u0002\u0002\u00d5\u0019",
    "\u0003\u0002\u0002\u0002\u00d6\u00d7\u0007\u0011\u0002\u0002\u00d7\u00d8",
    "\u0005\"\u0012\u0002\u00d8\u00dc\u0007\b\u0002\u0002\u00d9\u00da\u0005",
    "6\u001c\u0002\u00da\u00db\u0005$\u0013\u0002\u00db\u00dd\u0003\u0002",
    "\u0002\u0002\u00dc\u00d9\u0003\u0002\u0002\u0002\u00dc\u00dd\u0003\u0002",
    "\u0002\u0002\u00dd\u00e1\u0003\u0002\u0002\u0002\u00de\u00df\u00056",
    "\u001c\u0002\u00df\u00e0\u0005&\u0014\u0002\u00e0\u00e2\u0003\u0002",
    "\u0002\u0002\u00e1\u00de\u0003\u0002\u0002\u0002\u00e1\u00e2\u0003\u0002",
    "\u0002\u0002\u00e2\u00e6\u0003\u0002\u0002\u0002\u00e3\u00e4\u00056",
    "\u001c\u0002\u00e4\u00e5\u0005(\u0015\u0002\u00e5\u00e7\u0003\u0002",
    "\u0002\u0002\u00e6\u00e3\u0003\u0002\u0002\u0002\u00e6\u00e7\u0003\u0002",
    "\u0002\u0002\u00e7\u001b\u0003\u0002\u0002\u0002\u00e8\u00e9\u00050",
    "\u0019\u0002\u00e9\u001d\u0003\u0002\u0002\u0002\u00ea\u00eb\u0005,",
    "\u0017\u0002\u00eb\u001f\u0003\u0002\u0002\u0002\u00ec\u00ed\u0005,",
    "\u0017\u0002\u00ed!\u0003\u0002\u0002\u0002\u00ee\u00ef\u0005.\u0018",
    "\u0002\u00ef#\u0003\u0002\u0002\u0002\u00f0\u00f1\u00050\u0019\u0002",
    "\u00f1%\u0003\u0002\u0002\u0002\u00f2\u00f3\u00056\u001c\u0002\u00f3",
    "\u00f4\u0007\t\u0002\u0002\u00f4\u00f5\u0007\u0003\u0002\u0002\u00f5",
    "\u00f6\u0005.\u0018\u0002\u00f6\u00f8\u0003\u0002\u0002\u0002\u00f7",
    "\u00f2\u0003\u0002\u0002\u0002\u00f8\u00f9\u0003\u0002\u0002\u0002\u00f9",
    "\u00f7\u0003\u0002\u0002\u0002\u00f9\u00fa\u0003\u0002\u0002\u0002\u00fa",
    "\'\u0003\u0002\u0002\u0002\u00fb\u00fc\u00056\u001c\u0002\u00fc\u00fd",
    "\u0007\t\u0002\u0002\u00fd\u00fe\u0007\u0004\u0002\u0002\u00fe\u00ff",
    "\u0005.\u0018\u0002\u00ff\u0101\u0003\u0002\u0002\u0002\u0100\u00fb",
    "\u0003\u0002\u0002\u0002\u0101\u0102\u0003\u0002\u0002\u0002\u0102\u0100",
    "\u0003\u0002\u0002\u0002\u0102\u0103\u0003\u0002\u0002\u0002\u0103)",
    "\u0003\u0002\u0002\u0002\u0104\u0105\u0005,\u0017\u0002\u0105\u0106",
    "\u00056\u001c\u0002\u0106+\u0003\u0002\u0002\u0002\u0107\u0108\u0005",
    "6\u001c\u0002\u0108\u010a\u0007\t\u0002\u0002\u0109\u010b\u0005.\u0018",
    "\u0002\u010a\u0109\u0003\u0002\u0002\u0002\u010a\u010b\u0003\u0002\u0002",
    "\u0002\u010b\u010d\u0003\u0002\u0002\u0002\u010c\u0107\u0003\u0002\u0002",
    "\u0002\u010d\u010e\u0003\u0002\u0002\u0002\u010e\u010c\u0003\u0002\u0002",
    "\u0002\u010e\u010f\u0003\u0002\u0002\u0002\u010f-\u0003\u0002\u0002",
    "\u0002\u0110\u0113\u00052\u001a\u0002\u0111\u0113\u0007\u0007\u0002",
    "\u0002\u0112\u0110\u0003\u0002\u0002\u0002\u0112\u0111\u0003\u0002\u0002",
    "\u0002\u0113\u0114\u0003\u0002\u0002\u0002\u0114\u0115\u0003\u0002\u0002",
    "\u0002\u0114\u0112\u0003\u0002\u0002\u0002\u0115/\u0003\u0002\u0002",
    "\u0002\u0116\u0119\u00052\u001a\u0002\u0117\u0119\u00054\u001b\u0002",
    "\u0118\u0116\u0003\u0002\u0002\u0002\u0118\u0117\u0003\u0002\u0002\u0002",
    "\u0119\u011a\u0003\u0002\u0002\u0002\u011a\u011b\u0003\u0002\u0002\u0002",
    "\u011a\u0118\u0003\u0002\u0002\u0002\u011b1\u0003\u0002\u0002\u0002",
    "\u011c\u011d\t\u0002\u0002\u0002\u011d3\u0003\u0002\u0002\u0002\u011e",
    "\u011f\t\u0003\u0002\u0002\u011f5\u0003\u0002\u0002\u0002\u0120\u0122",
    "\u00054\u001b\u0002\u0121\u0120\u0003\u0002\u0002\u0002\u0122\u0125",
    "\u0003\u0002\u0002\u0002\u0123\u0121\u0003\u0002\u0002\u0002\u0123\u0124",
    "\u0003\u0002\u0002\u0002\u01247\u0003\u0002\u0002\u0002\u0125\u0123",
    "\u0003\u0002\u0002\u0002&;EIOSY^dhlrw}\u0084\u008b\u0090\u0096\u009b",
    "\u00a1\u00bf\u00c3\u00c9\u00cd\u00d4\u00dc\u00e1\u00e6\u00f9\u0102\u010a",
    "\u010e\u0112\u0114\u0118\u011a\u0123"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class MADRParser extends antlr4.Parser {

    static grammarFileName = "MADR.g4";
    static literalNames = [ null, "'Good, because '", "'Bad, because '", 
                            null, null, null, null, null, null, null, null, 
                            "'<!-- optional -->'", null, null, "'# '" ];
    static symbolicNames = [ null, null, null, "WORD", "CHARACTER", "WS", 
                             "NEWLINE", "LIST_MARKER", "STATUS_MARKER", 
                             "DATE_MARKER", "DECIDERS_MARKER", "OPTIONAL_MAKER", 
                             "TECHNICAL_STORY_MARKER", "YAML_MARKER", "HEADING_PREFIX", 
                             "SUBSUBHEADING_PREFIX", "SUBSUBSUBHEADING_PREFIX", 
                             "CONTEXT_AND_PROBLEM_STATEMENT", "DECISION_DRIVERS_HEADING", 
                             "CONSIDERED_OPTIONS_HEADING", "DECISION_OUTCOME_HEADING", 
                             "POSITIVE_CONSEQUENCES_HEADING", "NEGATIVE_CONSEQUENCES_HEADING", 
                             "PROS_AND_CONS_OF_THE_OPTIONS_HEADING", "LINKS_HEADING" ];
    static ruleNames = [ "start", "yaml", "title", "status", "deciders", 
                         "date", "technicalStory", "contextAndProblemStatement", 
                         "decisionDrivers", "consideredOptions", "decisionOutcome", 
                         "prosAndConsOfOptions", "optionSection", "chosenOptionAndExplanation", 
                         "positiveConsequences", "negativeConsequences", 
                         "optionTitle", "optionDescription", "prolist", 
                         "conlist", "links", "list", "textLine", "multilineText", 
                         "any", "wslb", "wslbs" ];

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
	        this.state = 57;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.YAML_MARKER) {
	            this.state = 54;
	            this.yaml();
	            this.state = 55;
	            this.wslbs();
	        }

	        this.state = 59;
	        this.match(MADRParser.HEADING_PREFIX);
	        this.state = 60;
	        this.title();
	        this.state = 61;
	        this.match(MADRParser.NEWLINE);
	        this.state = 62;
	        this.wslbs();
	        this.state = 71;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.STATUS_MARKER) {
	            this.state = 63;
	            this.match(MADRParser.STATUS_MARKER);
	            this.state = 64;
	            this.status();
	            this.state = 67;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
	            if(la_===1) {
	                this.state = 65;
	                this.match(MADRParser.WS);
	                this.state = 66;
	                this.match(MADRParser.OPTIONAL_MAKER);

	            }
	            this.state = 69;
	            this.wslbs();
	        }

	        this.state = 81;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.DECIDERS_MARKER) {
	            this.state = 73;
	            this.match(MADRParser.DECIDERS_MARKER);
	            this.state = 74;
	            this.deciders();
	            this.state = 77;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
	            if(la_===1) {
	                this.state = 75;
	                this.match(MADRParser.WS);
	                this.state = 76;
	                this.match(MADRParser.OPTIONAL_MAKER);

	            }
	            this.state = 79;
	            this.wslbs();
	        }

	        this.state = 92;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.DATE_MARKER) {
	            this.state = 83;
	            this.match(MADRParser.DATE_MARKER);
	            this.state = 84;
	            this.date();
	            this.state = 87;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===MADRParser.WS) {
	                this.state = 85;
	                this.match(MADRParser.WS);
	                this.state = 86;
	                this.match(MADRParser.OPTIONAL_MAKER);
	            }

	            this.state = 89;
	            this.match(MADRParser.NEWLINE);
	            this.state = 90;
	            this.wslbs();
	        }

	        this.state = 102;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.TECHNICAL_STORY_MARKER) {
	            this.state = 94;
	            this.match(MADRParser.TECHNICAL_STORY_MARKER);
	            this.state = 95;
	            this.technicalStory();
	            this.state = 98;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
	            if(la_===1) {
	                this.state = 96;
	                this.match(MADRParser.WS);
	                this.state = 97;
	                this.match(MADRParser.OPTIONAL_MAKER);

	            }
	            this.state = 100;
	            this.wslbs();
	        }

	        this.state = 106;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.CONTEXT_AND_PROBLEM_STATEMENT) {
	            this.state = 104;
	            this.match(MADRParser.CONTEXT_AND_PROBLEM_STATEMENT);
	            this.state = 105;
	            this.wslbs();
	        }

	        this.state = 112;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.NEWLINE) {
	            this.state = 108;
	            this.match(MADRParser.NEWLINE);
	            this.state = 109;
	            this.contextAndProblemStatement();
	            this.state = 110;
	            this.wslbs();
	        }

	        this.state = 123;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.DECISION_DRIVERS_HEADING) {
	            this.state = 114;
	            this.match(MADRParser.DECISION_DRIVERS_HEADING);
	            this.state = 117;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
	            if(la_===1) {
	                this.state = 115;
	                this.match(MADRParser.WS);
	                this.state = 116;
	                this.match(MADRParser.OPTIONAL_MAKER);

	            }
	            this.state = 119;
	            this.wslbs();
	            this.state = 120;
	            this.decisionDrivers();
	            this.state = 121;
	            this.wslbs();
	        }

	        this.state = 130;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.CONSIDERED_OPTIONS_HEADING) {
	            this.state = 125;
	            this.match(MADRParser.CONSIDERED_OPTIONS_HEADING);
	            this.state = 126;
	            this.wslbs();
	            this.state = 127;
	            this.consideredOptions();
	            this.state = 128;
	            this.wslbs();
	        }

	        this.state = 137;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.DECISION_OUTCOME_HEADING) {
	            this.state = 132;
	            this.match(MADRParser.DECISION_OUTCOME_HEADING);
	            this.state = 133;
	            this.wslbs();
	            this.state = 134;
	            this.decisionOutcome();
	            this.state = 135;
	            this.wslbs();
	        }

	        this.state = 148;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.PROS_AND_CONS_OF_THE_OPTIONS_HEADING) {
	            this.state = 139;
	            this.match(MADRParser.PROS_AND_CONS_OF_THE_OPTIONS_HEADING);
	            this.state = 142;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,15,this._ctx);
	            if(la_===1) {
	                this.state = 140;
	                this.match(MADRParser.WS);
	                this.state = 141;
	                this.match(MADRParser.OPTIONAL_MAKER);

	            }
	            this.state = 144;
	            this.wslbs();
	            this.state = 145;
	            this.prosAndConsOfOptions();
	            this.state = 146;
	            this.wslbs();
	        }

	        this.state = 159;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.LINKS_HEADING) {
	            this.state = 150;
	            this.match(MADRParser.LINKS_HEADING);
	            this.state = 153;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,17,this._ctx);
	            if(la_===1) {
	                this.state = 151;
	                this.match(MADRParser.WS);
	                this.state = 152;
	                this.match(MADRParser.OPTIONAL_MAKER);

	            }
	            this.state = 155;
	            this.wslbs();
	            this.state = 156;
	            this.links();
	            this.state = 157;
	            this.wslbs();
	        }

	        this.state = 161;
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
	        this.state = 163;
	        this.match(MADRParser.YAML_MARKER);
	        this.state = 164;
	        this.multilineText();
	        this.state = 165;
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
	        this.state = 167;
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



	status() {
	    let localctx = new StatusContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, MADRParser.RULE_status);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 169;
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



	deciders() {
	    let localctx = new DecidersContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, MADRParser.RULE_deciders);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 171;
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



	date() {
	    let localctx = new DateContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, MADRParser.RULE_date);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 173;
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



	technicalStory() {
	    let localctx = new TechnicalStoryContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, MADRParser.RULE_technicalStory);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 175;
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
	    this.enterRule(localctx, 14, MADRParser.RULE_contextAndProblemStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 177;
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
	    this.enterRule(localctx, 16, MADRParser.RULE_decisionDrivers);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 179;
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
	    this.enterRule(localctx, 18, MADRParser.RULE_consideredOptions);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 181;
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
	    this.enterRule(localctx, 20, MADRParser.RULE_decisionOutcome);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 183;
	        this.wslbs();
	        this.state = 184;
	        this.chosenOptionAndExplanation();
	        this.state = 193;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
	        if(la_===1) {
	            this.state = 185;
	            this.wslbs();
	            this.state = 186;
	            this.match(MADRParser.POSITIVE_CONSEQUENCES_HEADING);
	            this.state = 189;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,19,this._ctx);
	            if(la_===1) {
	                this.state = 187;
	                this.match(MADRParser.WS);
	                this.state = 188;
	                this.match(MADRParser.OPTIONAL_MAKER);

	            }
	            this.state = 191;
	            this.positiveConsequences();

	        }
	        this.state = 203;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,22,this._ctx);
	        if(la_===1) {
	            this.state = 195;
	            this.wslbs();
	            this.state = 196;
	            this.match(MADRParser.NEGATIVE_CONSEQUENCES_HEADING);
	            this.state = 199;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,21,this._ctx);
	            if(la_===1) {
	                this.state = 197;
	                this.match(MADRParser.WS);
	                this.state = 198;
	                this.match(MADRParser.OPTIONAL_MAKER);

	            }
	            this.state = 201;
	            this.negativeConsequences();

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
	    this.enterRule(localctx, 22, MADRParser.RULE_prosAndConsOfOptions);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 208; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 205;
	            this.optionSection();
	            this.state = 206;
	            this.wslbs();
	            this.state = 210; 
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
	    this.enterRule(localctx, 24, MADRParser.RULE_optionSection);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 212;
	        this.match(MADRParser.SUBSUBHEADING_PREFIX);
	        this.state = 213;
	        this.optionTitle();
	        this.state = 214;
	        this.match(MADRParser.NEWLINE);
	        this.state = 218;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,24,this._ctx);
	        if(la_===1) {
	            this.state = 215;
	            this.wslbs();
	            this.state = 216;
	            this.optionDescription();

	        }
	        this.state = 223;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,25,this._ctx);
	        if(la_===1) {
	            this.state = 220;
	            this.wslbs();
	            this.state = 221;
	            this.prolist();

	        }
	        this.state = 228;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,26,this._ctx);
	        if(la_===1) {
	            this.state = 225;
	            this.wslbs();
	            this.state = 226;
	            this.conlist();

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
	    this.enterRule(localctx, 26, MADRParser.RULE_chosenOptionAndExplanation);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 230;
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



	positiveConsequences() {
	    let localctx = new PositiveConsequencesContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, MADRParser.RULE_positiveConsequences);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 232;
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



	negativeConsequences() {
	    let localctx = new NegativeConsequencesContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, MADRParser.RULE_negativeConsequences);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 234;
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



	optionTitle() {
	    let localctx = new OptionTitleContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 32, MADRParser.RULE_optionTitle);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 236;
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
	    this.enterRule(localctx, 34, MADRParser.RULE_optionDescription);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 238;
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



	prolist() {
	    let localctx = new ProlistContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 36, MADRParser.RULE_prolist);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 245; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 240;
	        		this.wslbs();
	        		this.state = 241;
	        		this.match(MADRParser.LIST_MARKER);
	        		this.state = 242;
	        		this.match(MADRParser.T__0);
	        		this.state = 243;
	        		this.textLine();
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 247; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,27, this._ctx);
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



	conlist() {
	    let localctx = new ConlistContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 38, MADRParser.RULE_conlist);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 254; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 249;
	        		this.wslbs();
	        		this.state = 250;
	        		this.match(MADRParser.LIST_MARKER);
	        		this.state = 251;
	        		this.match(MADRParser.T__1);
	        		this.state = 252;
	        		this.textLine();
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 256; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,28, this._ctx);
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



	links() {
	    let localctx = new LinksContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 40, MADRParser.RULE_links);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 258;
	        this.list();
	        this.state = 259;
	        this.wslbs();
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
	    this.enterRule(localctx, 42, MADRParser.RULE_list);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 266; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 261;
	        		this.wslbs();
	        		this.state = 262;
	        		this.match(MADRParser.LIST_MARKER);
	        		this.state = 264;
	        		this._errHandler.sync(this);
	        		var la_ = this._interp.adaptivePredict(this._input,29,this._ctx);
	        		if(la_===1) {
	        		    this.state = 263;
	        		    this.textLine();

	        		}
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 268; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,30, this._ctx);
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
	    this.enterRule(localctx, 44, MADRParser.RULE_textLine);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 272; 
	        this._errHandler.sync(this);
	        var _alt = 1+1;
	        do {
	        	switch (_alt) {
	        	case 1+1:
	        		this.state = 272;
	        		this._errHandler.sync(this);
	        		switch(this._input.LA(1)) {
	        		case MADRParser.WORD:
	        		case MADRParser.CHARACTER:
	        		case MADRParser.LIST_MARKER:
	        		case MADRParser.YAML_MARKER:
	        		case MADRParser.HEADING_PREFIX:
	        		case MADRParser.SUBSUBSUBHEADING_PREFIX:
	        		    this.state = 270;
	        		    this.any();
	        		    break;
	        		case MADRParser.WS:
	        		    this.state = 271;
	        		    this.match(MADRParser.WS);
	        		    break;
	        		default:
	        		    throw new antlr4.error.NoViableAltException(this);
	        		}
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 274; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,32, this._ctx);
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
	    this.enterRule(localctx, 46, MADRParser.RULE_multilineText);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 278; 
	        this._errHandler.sync(this);
	        var _alt = 1+1;
	        do {
	        	switch (_alt) {
	        	case 1+1:
	        		this.state = 278;
	        		this._errHandler.sync(this);
	        		switch(this._input.LA(1)) {
	        		case MADRParser.WORD:
	        		case MADRParser.CHARACTER:
	        		case MADRParser.LIST_MARKER:
	        		case MADRParser.YAML_MARKER:
	        		case MADRParser.HEADING_PREFIX:
	        		case MADRParser.SUBSUBSUBHEADING_PREFIX:
	        		    this.state = 276;
	        		    this.any();
	        		    break;
	        		case MADRParser.WS:
	        		case MADRParser.NEWLINE:
	        		    this.state = 277;
	        		    this.wslb();
	        		    break;
	        		default:
	        		    throw new antlr4.error.NoViableAltException(this);
	        		}
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 280; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,34, this._ctx);
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
	    this.enterRule(localctx, 48, MADRParser.RULE_any);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 282;
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
	    this.enterRule(localctx, 50, MADRParser.RULE_wslb);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 284;
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
	    this.enterRule(localctx, 52, MADRParser.RULE_wslbs);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 289;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,35,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 286;
	                this.wslb(); 
	            }
	            this.state = 291;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,35,this._ctx);
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
MADRParser.WORD = 3;
MADRParser.CHARACTER = 4;
MADRParser.WS = 5;
MADRParser.NEWLINE = 6;
MADRParser.LIST_MARKER = 7;
MADRParser.STATUS_MARKER = 8;
MADRParser.DATE_MARKER = 9;
MADRParser.DECIDERS_MARKER = 10;
MADRParser.OPTIONAL_MAKER = 11;
MADRParser.TECHNICAL_STORY_MARKER = 12;
MADRParser.YAML_MARKER = 13;
MADRParser.HEADING_PREFIX = 14;
MADRParser.SUBSUBHEADING_PREFIX = 15;
MADRParser.SUBSUBSUBHEADING_PREFIX = 16;
MADRParser.CONTEXT_AND_PROBLEM_STATEMENT = 17;
MADRParser.DECISION_DRIVERS_HEADING = 18;
MADRParser.CONSIDERED_OPTIONS_HEADING = 19;
MADRParser.DECISION_OUTCOME_HEADING = 20;
MADRParser.POSITIVE_CONSEQUENCES_HEADING = 21;
MADRParser.NEGATIVE_CONSEQUENCES_HEADING = 22;
MADRParser.PROS_AND_CONS_OF_THE_OPTIONS_HEADING = 23;
MADRParser.LINKS_HEADING = 24;

MADRParser.RULE_start = 0;
MADRParser.RULE_yaml = 1;
MADRParser.RULE_title = 2;
MADRParser.RULE_status = 3;
MADRParser.RULE_deciders = 4;
MADRParser.RULE_date = 5;
MADRParser.RULE_technicalStory = 6;
MADRParser.RULE_contextAndProblemStatement = 7;
MADRParser.RULE_decisionDrivers = 8;
MADRParser.RULE_consideredOptions = 9;
MADRParser.RULE_decisionOutcome = 10;
MADRParser.RULE_prosAndConsOfOptions = 11;
MADRParser.RULE_optionSection = 12;
MADRParser.RULE_chosenOptionAndExplanation = 13;
MADRParser.RULE_positiveConsequences = 14;
MADRParser.RULE_negativeConsequences = 15;
MADRParser.RULE_optionTitle = 16;
MADRParser.RULE_optionDescription = 17;
MADRParser.RULE_prolist = 18;
MADRParser.RULE_conlist = 19;
MADRParser.RULE_links = 20;
MADRParser.RULE_list = 21;
MADRParser.RULE_textLine = 22;
MADRParser.RULE_multilineText = 23;
MADRParser.RULE_any = 24;
MADRParser.RULE_wslb = 25;
MADRParser.RULE_wslbs = 26;

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

	STATUS_MARKER() {
	    return this.getToken(MADRParser.STATUS_MARKER, 0);
	};

	status() {
	    return this.getTypedRuleContext(StatusContext,0);
	};

	DECIDERS_MARKER() {
	    return this.getToken(MADRParser.DECIDERS_MARKER, 0);
	};

	deciders() {
	    return this.getTypedRuleContext(DecidersContext,0);
	};

	DATE_MARKER() {
	    return this.getToken(MADRParser.DATE_MARKER, 0);
	};

	date() {
	    return this.getTypedRuleContext(DateContext,0);
	};

	TECHNICAL_STORY_MARKER() {
	    return this.getToken(MADRParser.TECHNICAL_STORY_MARKER, 0);
	};

	technicalStory() {
	    return this.getTypedRuleContext(TechnicalStoryContext,0);
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

	LINKS_HEADING() {
	    return this.getToken(MADRParser.LINKS_HEADING, 0);
	};

	links() {
	    return this.getTypedRuleContext(LinksContext,0);
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



class StatusContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_status;
    }

	textLine() {
	    return this.getTypedRuleContext(TextLineContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterStatus(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitStatus(this);
		}
	}


}



class DecidersContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_deciders;
    }

	textLine() {
	    return this.getTypedRuleContext(TextLineContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterDeciders(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitDeciders(this);
		}
	}


}



class DateContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_date;
    }

	textLine() {
	    return this.getTypedRuleContext(TextLineContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterDate(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitDate(this);
		}
	}


}



class TechnicalStoryContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_technicalStory;
    }

	textLine() {
	    return this.getTypedRuleContext(TextLineContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterTechnicalStory(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitTechnicalStory(this);
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

	POSITIVE_CONSEQUENCES_HEADING() {
	    return this.getToken(MADRParser.POSITIVE_CONSEQUENCES_HEADING, 0);
	};

	positiveConsequences() {
	    return this.getTypedRuleContext(PositiveConsequencesContext,0);
	};

	NEGATIVE_CONSEQUENCES_HEADING() {
	    return this.getToken(MADRParser.NEGATIVE_CONSEQUENCES_HEADING, 0);
	};

	negativeConsequences() {
	    return this.getTypedRuleContext(NegativeConsequencesContext,0);
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

	prolist() {
	    return this.getTypedRuleContext(ProlistContext,0);
	};

	conlist() {
	    return this.getTypedRuleContext(ConlistContext,0);
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



class PositiveConsequencesContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_positiveConsequences;
    }

	list() {
	    return this.getTypedRuleContext(ListContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterPositiveConsequences(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitPositiveConsequences(this);
		}
	}


}



class NegativeConsequencesContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_negativeConsequences;
    }

	list() {
	    return this.getTypedRuleContext(ListContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterNegativeConsequences(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitNegativeConsequences(this);
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



class ProlistContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_prolist;
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
	        listener.enterProlist(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitProlist(this);
		}
	}


}



class ConlistContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_conlist;
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
	        listener.enterConlist(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitConlist(this);
		}
	}


}



class LinksContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_links;
    }

	list() {
	    return this.getTypedRuleContext(ListContext,0);
	};

	wslbs() {
	    return this.getTypedRuleContext(WslbsContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterLinks(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitLinks(this);
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
MADRParser.StatusContext = StatusContext; 
MADRParser.DecidersContext = DecidersContext; 
MADRParser.DateContext = DateContext; 
MADRParser.TechnicalStoryContext = TechnicalStoryContext; 
MADRParser.ContextAndProblemStatementContext = ContextAndProblemStatementContext; 
MADRParser.DecisionDriversContext = DecisionDriversContext; 
MADRParser.ConsideredOptionsContext = ConsideredOptionsContext; 
MADRParser.DecisionOutcomeContext = DecisionOutcomeContext; 
MADRParser.ProsAndConsOfOptionsContext = ProsAndConsOfOptionsContext; 
MADRParser.OptionSectionContext = OptionSectionContext; 
MADRParser.ChosenOptionAndExplanationContext = ChosenOptionAndExplanationContext; 
MADRParser.PositiveConsequencesContext = PositiveConsequencesContext; 
MADRParser.NegativeConsequencesContext = NegativeConsequencesContext; 
MADRParser.OptionTitleContext = OptionTitleContext; 
MADRParser.OptionDescriptionContext = OptionDescriptionContext; 
MADRParser.ProlistContext = ProlistContext; 
MADRParser.ConlistContext = ConlistContext; 
MADRParser.LinksContext = LinksContext; 
MADRParser.ListContext = ListContext; 
MADRParser.TextLineContext = TextLineContext; 
MADRParser.MultilineTextContext = MultilineTextContext; 
MADRParser.AnyContext = AnyContext; 
MADRParser.WslbContext = WslbContext; 
MADRParser.WslbsContext = WslbsContext; 
