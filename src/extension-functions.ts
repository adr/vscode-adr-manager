// Functions using the VS Code Extension API
import * as vscode from "vscode";
import { ArchitecturalDecisionRecord } from "./plugins/classes";
import { adrTemplatemarkdownContent, initialMarkdownContent, readmeMarkdownContent } from "./plugins/constants";
import { adr2md, md2adr } from "./plugins/parser";
import { cleanPathString, matchesMadrTitleFormat, naturalCase2snakeCase } from "./plugins/utils";
var _ = require("lodash");

/**
 * Returns the workspace folders opened in the current VS Code instance.
 * @returns The current workspace folders of the VS Code instance, or an empty WorkspaceFolder array if there is no folder open
 */
export function getWorkspaceFolders(): readonly vscode.WorkspaceFolder[] {
	if (isWorkspaceOpened()) {
		return vscode.workspace.workspaceFolders!;
	}
	return [];
}

/**
 * Returns the string of the ADR directory specified by the user in the user/workspace settings
 * @returns The ADR directory specified by the user
 */
function getAdrDirectoryString(): string {
	return vscode.workspace.getConfiguration("adrManager").get("adrDirectory")!;
}

/**
 * Returns the string of the preferred editor mode specified by the user in the user/workspace setting
 * when adding a new ADR
 * @returns The preferred editor mode when adding a new ADR
 */
export function getAddEditorMode(): string {
	return vscode.workspace.getConfiguration("adrManager.editorMode").get("addAdrEditorMode")!;
}

/**
 * Returns the string of the preferred editor mode specified by the user in the user/workspace setting
 * when editing an existing ADR
 * @returns The preferred editor mode when editing an existing ADR
 */
export function getViewEditorMode(): string {
	return vscode.workspace.getConfiguration("adrManager.editorMode").get("viewAdrEditorMode")!;
}

/**
 * Returns either "basic" or "professional" based on the sufficiency of the MADR template
 * when editing an existing ADR specified by the file URI.
 * @param mdString The Markdown string of the ADR to be edited
 */
export async function determineViewEditorMode(mdString: string): Promise<string> {
	const adr = md2adr(mdString);
	if (isProfessionalAdr(adr)) {
		return "professional";
	} else {
		return "basic";
	}
}

/**
 * Returns true iff the specified ADR object contains at least one non-empty optional field.
 * @param adr The ADR object to check for grade of detail
 * @returns True iff the specified ADR object has any non-empty optional fields
 */
function isProfessionalAdr(adr: ArchitecturalDecisionRecord) {
	return (
		adr.status ||
		adr.deciders ||
		adr.date ||
		adr.technicalStory ||
		adr.decisionDrivers.length ||
		adr.consideredOptions.some((option) => {
			return option.pros.length || option.cons.length;
		}) ||
		adr.decisionOutcome.positiveConsequences.length ||
		adr.decisionOutcome.negativeConsequences.length ||
		adr.links.length
	);
}

/**
 * Returns true iff there is a folder opened in the current workspace of the VS Code instance.
 * @returns True iff a folder is opened in the current workspace of the VS Code instance
 */
export function isWorkspaceOpened(): boolean {
	return vscode.workspace.workspaceFolders !== undefined && vscode.workspace.workspaceFolders.length > 0;
}

/**
 * Returns true iff the current workspace is a single-root workspace, i.e. iff there is exactly one root folder opened in the current workspace.
 * @returns True iff there is exactly one root folder opened in the current workspace
 */
export function isSingleRootWorkspace(): boolean {
	return isWorkspaceOpened() && getWorkspaceFolders().length === 1;
}

/**
 * Returns true iff the specified folder only contains other folders, implying that the specified folder is
 * the root folder for many other root folders which may have ADR directories.
 * @param folderUri The URI of a folder
 * @returns True iff the folder only contains other folders, indicating that the specified folder is
 *			the root folder of multiple root folders
 */
export async function containsOnlyRootFolders(folderUri: vscode.Uri): Promise<boolean> {
	const directory = await vscode.workspace.fs.readDirectory(folderUri);
	for (const [name, type] of directory) {
		// skip ".DS_Store" files which may cause problems with macOS users
		if (type !== vscode.FileType.Directory && name !== ".DS_Store") {
			return false;
		}
	}
	return true;
}

/**
 * Returns an array of URIs of all the child root folders of the specified folder.
 * If the specified folder is not a folder of root folders (i.e. it has files other than folders inside of it),
 * then this returns an empty array.
 * @param rootFolderUri The URI of the highest-level root folder (containing all other child root folders)
 * @returns An array of URIs of all the child root folders within the highest-level root folder, or
 * 			an empty array if the specified folder does not only have other folders inside of it
 */
export async function getAllChildRootFolders(rootFolderUri: vscode.Uri): Promise<vscode.Uri[]> {
	const childRootFolderUris: vscode.Uri[] = [];
	if (await containsOnlyRootFolders(rootFolderUri)) {
		const rootFolderDirectory = await vscode.workspace.fs.readDirectory(rootFolderUri);
		for (const [name, type] of rootFolderDirectory) {
			if (type === vscode.FileType.Directory) {
				childRootFolderUris.push(vscode.Uri.joinPath(rootFolderUri, name));
			}
		}
	}
	return childRootFolderUris;
}

/**
 * Returns an array of strings of all the child root folder names of the specified folder.
 * If the specified folder is not a folder of root folders (i.e. it has files other than folders inside of it),
 * then this returns an empty array.
 * @param rootFolderUri The URI of the highest-level root folder (containing all other child root folders)
 * @returns An array of strings of all the child root folder names within the highest-level root folder, or
 * 			an empty array if the specified folder does not only have other folders inside of it
 */
async function getAllChildRootFoldersAsStrings(rootFolderUri: vscode.Uri): Promise<string[]> {
	const childRootFolderStrings: string[] = [];
	if (await containsOnlyRootFolders(rootFolderUri)) {
		const rootFolderDirectory = await vscode.workspace.fs.readDirectory(rootFolderUri);
		for (const [name, type] of rootFolderDirectory) {
			if (type === vscode.FileType.Directory) {
				childRootFolderStrings.push(name);
			}
		}
	}
	return childRootFolderStrings;
}

/**
 * Initializes the ADR directory in the specified root folder.
 * Initialization includes the creation of the ADR directory, along with filling the directory with boilerplate Markdown files.
 * @param rootFolderUri The URI of the root folder where the ADR directory should be initialized
 */
export async function initializeAdrDirectory(rootFolderUri: vscode.Uri) {
	if (!(await adrDirectoryExists(rootFolderUri))) {
		const adrFolderUri = vscode.Uri.joinPath(rootFolderUri, getAdrDirectoryString());
		await vscode.workspace.fs.createDirectory(adrFolderUri);
		await fillAdrDirectory(adrFolderUri);
	} else {
		const selection = await vscode.window.showInformationMessage(
			"The ADR directory already exists. Do you want to fill the directory with boilerplate Markdown files?",
			"Yes",
			"Cancel"
		);
		if (selection === "Yes") {
			const adrFolderUri = vscode.Uri.joinPath(rootFolderUri, getAdrDirectoryString());
			await fillAdrDirectory(adrFolderUri);
		}
	}
}

/**
 * Returns true iff there exists the ADR directory in the given workspace folder in the current VS Code instance (default: docs/decisions).
 * @param folderUri The URI to the directory in the current workspace
 * @returns True iff there exists the ADR directory in the given workspace folder in the current VS Code instance
 *
 */
export async function adrDirectoryExists(folderUri: vscode.Uri) {
	if (isWorkspaceOpened()) {
		const subDirectories = cleanPathString(getAdrDirectoryString()).split("/");
		let currentUri = folderUri;
		let currentDirectoryFound = true;

		// Iterate through subdirectories
		for (let i = 0; i < subDirectories.length; i++) {
			if (currentDirectoryFound) {
				currentDirectoryFound = false;
				let currentDirectory = await vscode.workspace.fs.readDirectory(currentUri);
				for (const [name, type] of currentDirectory) {
					if (type === vscode.FileType.Directory && name === subDirectories[i]) {
						currentDirectoryFound = true;
						if (i === subDirectories.length - 1) {
							return true; // last subdirectory found
						} else {
							break; // check next subdirectory
						}
					}
				}
				currentUri = vscode.Uri.joinPath(currentUri, subDirectories[i]);
			} else {
				return false;
			}
		}
	}

	return false;
}

/**
 * Fills the specified directory with README, an ADR template and a sample ADR.
 * @param folderUri The URI of the directory to be filled
 */
export async function fillAdrDirectory(folderUri: vscode.Uri) {
	await createMarkdownFile(folderUri, "0000-use-markdown-architectural-decision-records.md", initialMarkdownContent);
	await createMarkdownFile(folderUri, "README.md", readmeMarkdownContent);
	await createMarkdownFile(folderUri, "adr-template.md", adrTemplatemarkdownContent);
}

/**
 * Creates a Markdown file in the specified URI with the specified name and content.
 * @param folderUri The URI of the folder in which the Markdown file should be created
 * @param name The name of the Markdown file
 * @param content The content of the Markdown file
 */
export async function createMarkdownFile(folderUri: vscode.Uri, name: string, content: string) {
	await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(folderUri, name), new TextEncoder().encode(content));
}

/**
 * Returns an array of the folder names that are open in the current workspace.
 * @returns A string array of all folder names currently opened in the workspace
 */
export function getWorkspaceFolderNames(): string[] {
	let names: string[] = [];
	if (isWorkspaceOpened()) {
		getWorkspaceFolders().forEach((folder) => {
			names.push(folder.name);
		});
	}
	return names;
}

/**
 * Returns an array of potential MADRs in the form of Markdown strings that are located in the root folders of the current workspace.
 * @returns A Promise which resolves in a string array of all potential MADR strings in the whole workspace
 */
export async function getAllMDs(): Promise<
	{ adr: string; fullPath: string; relativePath: string; fileName: string }[]
> {
	let mds: { adr: string; fullPath: string; relativePath: string; fileName: string }[] = [];
	if (isWorkspaceOpened()) {
		const workspaceFolders = getWorkspaceFolders();
		// Check if single-root folder is root folder of other root folders
		if (isSingleRootWorkspace() && (await containsOnlyRootFolders(workspaceFolders[0].uri))) {
			const childRootFolderUris = await getAllChildRootFolders(workspaceFolders[0].uri);
			for (let i = 0; i < childRootFolderUris.length; i++) {
				if (await adrDirectoryExists(childRootFolderUris[i])) {
					mds = [
						...mds,
						...(await getMDsFromFolder(
							vscode.Uri.joinPath(childRootFolderUris[i], getAdrDirectoryString())
						)),
					];
				}
			}
		} else {
			for (let i = 0; i < workspaceFolders.length; i++) {
				if (await adrDirectoryExists(workspaceFolders[i].uri)) {
					mds = [
						...mds,
						...(await getMDsFromFolder(
							vscode.Uri.joinPath(workspaceFolders[i].uri, getAdrDirectoryString())
						)),
					];
				}
			}
		}
	}
	return mds;
}

/**
 * Returns an array of potential MADRs in the form of strings that are located in the specified folder.
 * @param folderUri The URI of the directory to be scanned for MADRs
 * @returns A Promise which resolves in a string array of potential MADRs
 */
export async function getMDsFromFolder(
	folderUri: vscode.Uri
): Promise<{ adr: string; fullPath: string; relativePath: string; fileName: string }[]> {
	let adrs: { adr: string; fullPath: string; relativePath: string; fileName: string }[] = [];
	const directory = await vscode.workspace.fs.readDirectory(folderUri);
	for (const [name, type] of directory) {
		if (type === vscode.FileType.File && matchesMadrTitleFormat(name)) {
			const content = await vscode.workspace.fs.readFile(vscode.Uri.joinPath(folderUri, name));
			adrs.push({
				adr: new TextDecoder().decode(content),
				fullPath: vscode.Uri.joinPath(folderUri, name).fsPath,
				relativePath: getAdrPathRelativeFromRootFolder(vscode.Uri.joinPath(folderUri, name)),
				fileName: name,
			});
		}
	}
	return adrs;
}

/**
 * Creates a new  ArchitecturalDecision object with the minimum required fields (short ADR) and
 * saves the ADR as a Markdown file in the ADR directory.
 * @param fields The fields of the new short ADR
 */
export function createShortAdr(fields: {
	title: string;
	contextAndProblemStatement: string;
	consideredOptions: string[];
	chosenOption: string;
	explanation: string;
}) {
	// Get Considered Options
	const consideredOptions = getConsideredOptionsFromStrings(fields.consideredOptions);

	// Get Decision Outcome
	const decisionOutcome: {
		chosenOption: string;
		explanation: string;
		positiveConsequences: string[];
		negativeConsequences: string[];
	} = {
		chosenOption: fields.chosenOption,
		explanation: fields.explanation,
		positiveConsequences: [],
		negativeConsequences: [],
	};

	// Create ADR object
	const newAdr = new ArchitecturalDecisionRecord({
		title: fields.title,
		contextAndProblemStatement: fields.contextAndProblemStatement,
		consideredOptions: consideredOptions,
		decisionOutcome: decisionOutcome,
	});

	// Convert ADR object to Markdown and save it in the ADR directory
	const newMD = adr2md(newAdr);
	saveMarkdownToAdrDirectory(newMD, newAdr.title);
}

/**
 * Saves any changes made to an ADR in the corresponding file, overwriting existing data.
 * @param fields The fields of the edited short ADR
 * @param oldTitle The old title of the ADR, used for locating the Markdown file to edit
 */
export async function saveShortAdr(
	fields: {
		title: string;
		contextAndProblemStatement: string;
		consideredOptions: string[];
		chosenOption: string;
		explanation: string;
	},
	oldTitle: string
) {
	// Get Considered Options
	const consideredOptions = getConsideredOptionsFromStrings(fields.consideredOptions);

	// Get Decision Outcome
	const decisionOutcome: {
		chosenOption: string;
		explanation: string;
		positiveConsequences: string[];
		negativeConsequences: string[];
	} = {
		chosenOption: fields.chosenOption,
		explanation: fields.explanation,
		positiveConsequences: [],
		negativeConsequences: [],
	};

	// Create ADR object
	const newAdr = new ArchitecturalDecisionRecord({
		title: fields.title,
		contextAndProblemStatement: fields.contextAndProblemStatement,
		consideredOptions: consideredOptions,
		decisionOutcome: decisionOutcome,
	});

	// Convert ADR object to Markdown and save
	const newMD = adr2md(newAdr);
	const fileUri = await getExistingAdrUri(oldTitle);
	if (fileUri) {
		const newUri = getRenamedUri(fileUri, newAdr.title);
		await vscode.workspace.fs.rename(fileUri, newUri);
		await vscode.workspace.fs.writeFile(newUri, new TextEncoder().encode(newMD));
	} else {
		vscode.window.showWarningMessage("ADR could not be found in the workspace.");
	}
}

/**
 * Returns a URI of the Markdown file iff there exists an ADR that has the same title as the specified string.
 * @param title The title of an existing ADR
 * @returns The URI of the existing ADR corresponding to the specified ADR title
 */
async function getExistingAdrUri(title: string): Promise<vscode.Uri | undefined> {
	const allMDs = await getAllMDs();
	for (const md of allMDs) {
		if (md2adr(md.adr).title === title) {
			return vscode.Uri.parse(md.fullPath);
		}
	}
}

function getRenamedUri(fileUri: vscode.Uri, newName: string): vscode.Uri {
	const uriWithoutTitleInFileName = fileUri.toString().substring(0, fileUri.toString().lastIndexOf("/") + 6);
	const newUriString = uriWithoutTitleInFileName.concat(naturalCase2snakeCase(newName), ".md");
	return vscode.Uri.parse(newUriString);
}

/**
 * Returns an array of objects that each represent one considered option.
 * @param options A string array of option titles
 * @returns An array of objects which each represent an option with only a title
 */
function getConsideredOptionsFromStrings(
	options: string[]
): { title: string; description: string; pros: string[]; cons: string[] }[] {
	const consideredOptions: { title: string; description: string; pros: string[]; cons: string[] }[] = [];
	for (const option of options) {
		consideredOptions.push({
			title: option,
			description: "",
			pros: [],
			cons: [],
		});
	}
	return consideredOptions;
}

/**
 * Returns an array of strings that each represent the title of one considered option. This
 * @param options An array of considered option objects
 * @returns An array of strings which each represent an option
 */
export function getOptionStringsFromConsideredOptions(
	options: {
		title: string;
		description: string;
		pros: string[];
		cons: string[];
	}[]
): string[] {
	const optionStrings: string[] = [];
	for (const option of options) {
		optionStrings.push(option.title);
	}
	return optionStrings;
}

/**
 * Saves the specified Markdown string in the ADR directory specified by the user
 * @param md The content of the Markdown file as a string
 * @param title The title of the ADR
 */
async function saveMarkdownToAdrDirectory(md: string, title: string) {
	if (!isWorkspaceOpened()) {
		vscode.window.showErrorMessage("Please open a workspace folder to initialize ADR directory");
	} else {
		if (isSingleRootWorkspace()) {
			// Check if single-root folder is root folder of other root folders
			if (await containsOnlyRootFolders(getWorkspaceFolders()[0].uri)) {
				const childRootFolder = await vscode.window.showQuickPick(
					getAllChildRootFoldersAsStrings(getWorkspaceFolders()[0].uri),
					{ title: "Choose the folder to save the ADR to:" }
				);
				if (childRootFolder) {
					const fileName = `${_.padStart((await getHighestAdrNumber()) + 1, 4, "0")}-${naturalCase2snakeCase(
						title
					)}.md`;
					const fileUri = vscode.Uri.joinPath(
						getWorkspaceFolders()[0].uri,
						childRootFolder,
						getAdrDirectoryString(),
						fileName
					);
					await vscode.workspace.fs.writeFile(fileUri, new TextEncoder().encode(md));
					// Show success message and open file in separate editor
					vscode.window.showTextDocument(await vscode.workspace.openTextDocument(fileUri));
					await vscode.window.showInformationMessage("ADR created successfully");
				}
			} else {
				// "Real" single-root workspace
				const fileName = `${_.padStart((await getHighestAdrNumber()) + 1, 4, "0")}-${naturalCase2snakeCase(
					title
				)}.md`;
				const fileUri = vscode.Uri.joinPath(getWorkspaceFolders()[0].uri, getAdrDirectoryString(), fileName);
				await vscode.workspace.fs.writeFile(fileUri, new TextEncoder().encode(md));
				// Show success message and open file in separate editor
				vscode.window.showTextDocument(await vscode.workspace.openTextDocument(fileUri));
				vscode.window.showInformationMessage("ADR created successfully");
			}
		} else {
			// Multi-root workspace
			const destinationFolder = await vscode.window.showWorkspaceFolderPick();
			if (destinationFolder) {
				const fileName = `${_.padStart((await getHighestAdrNumber()) + 1, 4, "0")}-${naturalCase2snakeCase(
					title
				)}.md`;
				const fileUri = vscode.Uri.joinPath(destinationFolder.uri, getAdrDirectoryString(), fileName);
				await vscode.workspace.fs.writeFile(fileUri, new TextEncoder().encode(md));
				// Show success message and open file in separate editor
				vscode.window.showTextDocument(await vscode.workspace.openTextDocument(fileUri));
				vscode.window.showInformationMessage("ADR created successfully");
			}
		}
	}
}

/**
 * Returns the highest number ADR of all ADRs detected in the current workspace.
 * @returns The highest number of all ADRs in all ADR directories of the workspace
 */
async function getHighestAdrNumber(): Promise<number> {
	const allAdrs = await getAllMDs();
	const titleNumbers = allAdrs.map((md) => {
		return Number.parseInt(
			md.fileName.substring(md.fileName.lastIndexOf("/") + 1, md.fileName.lastIndexOf("/") + 5)
		);
	});
	return titleNumbers.sort((a, b) => a - b)[titleNumbers.length - 1];
}

/**
 * Sets up a watcher that notifies the specified webview panel to update the ADR list
 * every time a change occurs in the workspace regarding Markdown files.
 * @param panel The webview panel that will be notified of changes on Markdown files
 */
export function watchMarkdownChanges(panel: vscode.WebviewPanel) {
	// Listen for file changes
	const watcher = vscode.workspace.createFileSystemWatcher("**/*.md");
	watcher.onDidCreate(async (e) => {
		let allAdrs: { adr: ArchitecturalDecisionRecord; fullPath: string; relativePath: string; fileName: string }[] =
			[];
		(await getAllMDs()).forEach((md) => {
			allAdrs.push({
				adr: md2adr(md.adr),
				fullPath: md.fullPath,
				relativePath: md.relativePath,
				fileName: md.fileName,
			});
		});
		panel.webview.postMessage({ command: "fetchAdrs", adrs: allAdrs });
	});
	watcher.onDidChange(async (e) => {
		let allAdrs: { adr: ArchitecturalDecisionRecord; fullPath: string; relativePath: string; fileName: string }[] =
			[];
		(await getAllMDs()).forEach((md) => {
			allAdrs.push({
				adr: md2adr(md.adr),
				fullPath: md.fullPath,
				relativePath: md.relativePath,
				fileName: md.fileName,
			});
		});
		panel.webview.postMessage({ command: "fetchAdrs", adrs: allAdrs });
	});
	watcher.onDidDelete(async (e) => {
		let allAdrs: { adr: ArchitecturalDecisionRecord; fullPath: string; relativePath: string; fileName: string }[] =
			[];
		(await getAllMDs()).forEach((md) => {
			allAdrs.push({
				adr: md2adr(md.adr),
				fullPath: md.fullPath,
				relativePath: md.relativePath,
				fileName: md.fileName,
			});
		});
		panel.webview.postMessage({ command: "fetchAdrs", adrs: allAdrs });
	});
}

/**
 * Returns the path of a specified ADR relative to a specified root folder.
 * This function returns a correct path iff the specified ADR is located in the
 * specified root folder or in one of its subdirectories.
 *
 * @param adrUri The URI of the file contained in the rootFolder or in one of its subfolders
 * @returns The path of the file relative to the root folder as a string
 */
function getAdrPathRelativeFromRootFolder(adrUri: vscode.Uri): string {
	let filePath = adrUri.fsPath;
	for (const folder of getWorkspaceFolders()) {
		if (filePath.match(folder.uri.fsPath)) {
			return filePath.replace(folder.uri.fsPath.substring(0, folder.uri.fsPath.lastIndexOf("/") + 1), "");
		}
	}

	return filePath;
}
