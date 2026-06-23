import * as vscode from "vscode";

import { md2adr } from "./plugins/parser";
import { getAllMDs } from "./extension-functions";
import { ArchitecturalDecisionRecord } from "./plugins/classes";
import { TcCategory, TcConfidence } from "./plugins/tc-types";

type AdrEntry = {
	adr: ArchitecturalDecisionRecord;
	fullPath: string;
	fileName: string;
};

type TreeNode = CategoryNode | AdrNode | DetailNode;

class CategoryNode extends vscode.TreeItem {
	readonly kind = "category" as const;
	constructor(public readonly category: TcCategory | "unannotated" | "uncategorized", public readonly adrs: AdrEntry[]) {
		const label =
			category === "unannotated" ? "Unannotated" :
			category === "uncategorized" ? "Uncategorized (has TC fields)" :
			category;
		super(`${label} (${adrs.length})`, vscode.TreeItemCollapsibleState.Expanded);
		this.iconPath = new vscode.ThemeIcon(
			category === "unannotated" ? "question" :
			category === "uncategorized" ? "warning" :
			"tag"
		);
		this.contextValue = "tcCategory";
	}
}

class AdrNode extends vscode.TreeItem {
	readonly kind = "adr" as const;
	constructor(public readonly entry: AdrEntry) {
		const tc = entry.adr.tc;
		super(entry.adr.title || entry.fileName, vscode.TreeItemCollapsibleState.Collapsed);
		const conformWarning = entry.adr.conforming ? "" : "  ⚠ MADR parse issues";
		this.description = (tc ? confidenceLabel(tc.confidence) : "no TC annotation") + conformWarning;
		this.tooltip = tc?.benefit ?? "";
		this.iconPath = entry.adr.conforming ? confidenceIcon(tc?.confidence) : new vscode.ThemeIcon("warning");
		this.contextValue = "tcAdr";
		this.resourceUri = vscode.Uri.file(entry.fullPath);
		this.command = {
			command: "vscode.open",
			title: "Open ADR file",
			arguments: [this.resourceUri],
		};
	}
}

class DetailNode extends vscode.TreeItem {
	readonly kind = "detail" as const;
	constructor(label: string, value: string, icon?: string) {
		super(`${label}: ${value}`, vscode.TreeItemCollapsibleState.None);
		this.tooltip = value;
		if (icon) {
			this.iconPath = new vscode.ThemeIcon(icon);
		}
	}
}

const CONFIDENCE_NAMES = ["", "speculative", "low", "moderate", "high", "evidenced"];

function confidenceLabel(c: TcConfidence | undefined): string {
	if (!c) {
		return "";
	}
	return `${"●".repeat(c)}${"○".repeat(5 - c)}  ${CONFIDENCE_NAMES[c]}`;
}

const CONFIDENCE_COLORS: string[] = ["", "charts.red", "charts.orange", "charts.yellow", "charts.green", "terminal.ansiGreen"];

function confidenceIcon(c: TcConfidence | undefined): vscode.ThemeIcon {
	if (!c) {
		return new vscode.ThemeIcon("circle-outline");
	}
	return new vscode.ThemeIcon("circle-filled", new vscode.ThemeColor(CONFIDENCE_COLORS[c]));
}

export class TcDashboardProvider implements vscode.TreeDataProvider<TreeNode> {
	private readonly _onDidChangeTreeData = new vscode.EventEmitter<TreeNode | undefined | void>();
	readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: TreeNode): vscode.TreeItem {
		return element;
	}

	async getChildren(element?: TreeNode): Promise<TreeNode[]> {
		if (!element) {
			return this.getCategoryNodes();
		}
		if (element.kind === "category") {
			return element.adrs.map((e) => new AdrNode(e));
		}
		if (element.kind === "adr") {
			return this.getDetailNodes(element.entry);
		}
		return [];
	}

	private async getCategoryNodes(): Promise<CategoryNode[]> {
		if (!vscode.workspace.workspaceFolders?.length) {
			const placeholder = new CategoryNode("unannotated", []);
			placeholder.label = "No workspace open";
			placeholder.collapsibleState = vscode.TreeItemCollapsibleState.None;
			return [placeholder];
		}

		let mds: Awaited<ReturnType<typeof getAllMDs>>;
		try {
			mds = await getAllMDs();
		} catch (e) {
			const placeholder = new CategoryNode("unannotated", []);
			placeholder.label = "Could not read ADR directory";
			placeholder.collapsibleState = vscode.TreeItemCollapsibleState.None;
			return [placeholder];
		}
		if (!mds.length) {
			const placeholder = new CategoryNode("unannotated", []);
			placeholder.label = "No ADRs found in ADR directory";
			placeholder.collapsibleState = vscode.TreeItemCollapsibleState.None;
			return [placeholder];
		}

		const entries: AdrEntry[] = mds.map((m) => ({
			adr: md2adr(m.adr),
			fullPath: m.fullPath,
			fileName: m.fileName,
		}));

		const buckets = new Map<TcCategory | "unannotated" | "uncategorized", AdrEntry[]>();
		for (const e of entries) {
			let key: TcCategory | "unannotated" | "uncategorized";
			if (!e.adr.tc) {
				key = "unannotated";
			} else if (!e.adr.tc.category) {
				key = "uncategorized";
			} else {
				key = e.adr.tc.category;
			}
			const list = buckets.get(key) ?? [];
			list.push(e);
			buckets.set(key, list);
		}

		return [...buckets.entries()]
			.sort(([a], [b]) => {
				// unannotated and uncategorized sort last
				if (a === "unannotated") {return 1;}
				if (b === "unannotated") {return -1;}
				if (a === "uncategorized") {return 1;}
				if (b === "uncategorized") {return -1;}
				return a.localeCompare(b);
			})
			.map(([category, adrs]) => new CategoryNode(category as TcCategory | "unannotated", adrs));
	}

	private getDetailNodes(entry: AdrEntry): DetailNode[] {
		const tc = entry.adr.tc;
		if (!tc) {
			return [new DetailNode("Status", "No tc-* fields in this ADR", "info")];
		}
		const nodes: DetailNode[] = [
			new DetailNode("Benefit", tc.benefit || "—", "lightbulb"),
			new DetailNode("Category", tc.category, "tag"),
			new DetailNode("Conditions", tc.conditions || "—", "list-tree"),
			new DetailNode("Confidence", confidenceLabel(tc.confidence), "shield"),
			new DetailNode(
				"Signals",
				tc.signals.tags.length ? tc.signals.tags.join(", ") : "—",
				"pulse"
			),
		];
		if (tc.signals.note) {
			nodes.push(new DetailNode("Signal note", tc.signals.note, "comment"));
		}
		if (tc.status) {
			nodes.push(new DetailNode("Status", tc.status, "milestone"));
		}
		if (tc.related?.length) {
			nodes.push(new DetailNode("Related", tc.related.join(", "), "references"));
		}
		return nodes;
	}
}