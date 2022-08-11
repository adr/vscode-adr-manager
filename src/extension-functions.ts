// Functions using the VS Code Extension API
import * as vscode from "vscode";
import { ArchitecturalDecisionRecord } from "./plugins/classes";
import {
	adrTemplatemarkdownContent,
	EXTENSION_URI,
	initialMarkdownContent,
	readmeMarkdownContent,
} from "./plugins/constants";
import { adr2md, md2adr } from "./plugins/parser";
import { cleanPathString, matchesMadrTitleFormat, naturalCase2snakeCase } from "./plugins/utils";
import { WebPanel } from "./WebPanel";
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
 * Returns the string of the ADR Directory specified by the user in the user/workspace settings.
 * Defaults to "docs/decisions" if the extension received an undefined value.
 * @returns The ADR Directory specified by the user
 */
export function getAdrDirectoryString(): string {
	return vscode.workspace.getConfiguration("adrManager").get("adrDirectory") ?? "docs/decisions";
}

/**
 * Returns if the user wants the extension to treat single-root workspaces with only subdirectories like multi-root workspaces.
 * Defaults to true if the extension received an undefined value.
 * @returns The ADR Directory specified by the user
 */
export function treatAsMultiRoot(): boolean {
	return vscode.workspace.getConfiguration("adrManager").get("treatSingleRootAsMultiRoot") ?? true;
}

/**
 * Returns the string of the preferred editor mode specified by the user in the user/workspace setting
 * when adding a new ADR. Defaults to "basic" if the extension received an undefined value.
 * @returns The preferred editor mode when adding a new ADR
 */
export function getAddEditorMode(): string {
	return vscode.workspace.getConfiguration("adrManager.editorMode").get("addAdrEditorMode") ?? "basic";
}

/**
 * Returns the string of the preferred editor mode specified by the user in the user/workspace setting
 * when editing an existing ADR. Defaults to "sufficient" if the extension received an undefined value.
 * @returns The preferred editor mode when editing an existing ADR
 */
export function getViewEditorMode(): string {
	return vscode.workspace.getConfiguration("adrManager.editorMode").get("viewAdrEditorMode") ?? "sufficient";
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
export async function getAllChildRootFoldersAsStrings(rootFolderUri: vscode.Uri): Promise<string[]> {
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
 * Initializes the ADR Directory in the specified root folder.
 * Initialization includes the creation of the ADR Directory, along with filling the directory with boilerplate Markdown files.
 * @param rootFolderUri The URI of the root folder where the ADR Directory should be initialized
 */
export async function initializeAdrDirectory(rootFolderUri: vscode.Uri) {
	if (!(await adrDirectoryExists(rootFolderUri))) {
		const adrFolderUri = vscode.Uri.joinPath(rootFolderUri, getAdrDirectoryString());
		await vscode.workspace.fs.createDirectory(adrFolderUri);
		await fillAdrDirectory(adrFolderUri);
	} else {
		const selection = await vscode.window.showInformationMessage(
			"The ADR Directory already exists. Do you want to fill the directory with boilerplate Markdown files?",
			"Yes",
			"Cancel"
		);
		if (selection === "Yes") {
			const adrFolderUri = vscode.Uri.joinPath(rootFolderUri, getAdrDirectoryString());
			await fillAdrDirectory(adrFolderUri);
		}
	}
	vscode.window.showInformationMessage("ADR Directory initialized.");
}

/**
 * Returns true iff there exists the ADR Directory in the given workspace folder in the current VS Code instance (default: docs/decisions).
 * @param folderUri The URI to the directory in the current workspace
 * @returns True iff there exists the ADR Directory in the given workspace folder in the current VS Code instance
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
		if (isSingleRootWorkspace() && treatAsMultiRoot() && (await containsOnlyRootFolders(workspaceFolders[0].uri))) {
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
				fullPath: vscode.Uri.joinPath(folderUri, name).path,
				relativePath: getAdrPathRelativeFromRootFolder(vscode.Uri.joinPath(folderUri, name)),
				fileName: name,
			});
		}
	}
	return adrs;
}

/**
 * Creates a new ArchitecturalDecision object with the minimum required fields (basic ADR) and
 * saves the ADR as a Markdown file in the ADR Directory.
 * @param fields The fields of the new short ADR
 */
export function createBasicAdr(fields: {
	title: string;
	contextAndProblemStatement: string;
	consideredOptions: {
		title: string;
		description: string;
		pros: string[];
		cons: string[];
	}[];
	chosenOption: string;
	explanation: string;
}) {
	const adrFields = {
		title: fields.title,
		contextAndProblemStatement: fields.contextAndProblemStatement,
		consideredOptions: fields.consideredOptions,
		decisionOutcome: {
			chosenOption: fields.chosenOption,
			explanation: fields.explanation,
			positiveConsequences: [],
			negativeConsequences: [],
		},
	};
	const newAdr = getAdrObjectFromFields(adrFields);

	// Convert ADR object to Markdown and save it in the ADR Directory
	const newMD = adr2md(newAdr);
	saveMarkdownToAdrDirectory(newMD, newAdr.title);
}

/**
 * Creates a new ArchitecturalDecision object with all fields the user has filled out using the professional template and
 * saves the ADR as a Markdown file in the ADR Directory.
 * @param fields The fields of the new short ADR
 */
export function createProfessionalAdr(fields: {
	title: string;
	date: string;
	status: string;
	deciders: string;
	technicalStory: string;
	contextAndProblemStatement: string;
	consideredOptions: {
		title: string;
		description: string;
		pros: string[];
		cons: string[];
	}[];
	decisionOutcome: {
		chosenOption: string;
		explanation: string;
		positiveConsequences: string[];
		negativeConsequences: string[];
	};
	links: string[];
}) {
	const newAdr = getAdrObjectFromFields(fields);

	// Convert ADR object to Markdown and save it in the ADR Directory
	const newMD = adr2md(newAdr);
	saveMarkdownToAdrDirectory(newMD, newAdr.title);
}

/**
 * Saves any changes made to an ADR in the corresponding file, overwriting existing data.
 * @param fields The fields of the edited short ADR
 */
export async function saveAdr(fields: {
	title?: string;
	date?: string;
	status?: string;
	deciders?: string;
	technicalStory?: string;
	contextAndProblemStatement?: string;
	decisionDrivers?: string[];
	consideredOptions?: {
		title: string;
		description: string;
		pros: string[];
		cons: string[];
	}[];
	decisionOutcome?: {
		chosenOption: string;
		explanation: string;
		positiveConsequences: string[];
		negativeConsequences: string[];
	};
	links?: string[];
	fullPath: string;
}): Promise<vscode.Uri | undefined> {
	// Update, convert ADR object to Markdown and save
	const fileUri = vscode.Uri.parse(fields.fullPath);
	if (fileUri) {
		const adr = md2adr(new TextDecoder().decode(await vscode.workspace.fs.readFile(fileUri)));
		adr.update({
			title: fields.title,
			date: fields.date,
			status: fields.status,
			deciders: fields.deciders,
			technicalStory: fields.technicalStory,
			contextAndProblemStatement: fields.contextAndProblemStatement,
			decisionDrivers: fields.decisionDrivers,
			consideredOptions: fields.consideredOptions,
			decisionOutcome: fields.decisionOutcome,
			links: fields.links,
		});
		const newUri = getRenamedUri(fileUri, adr.title);
		await vscode.workspace.fs.rename(fileUri, newUri);
		await vscode.workspace.fs.writeFile(newUri, new TextEncoder().encode(adr2md(adr)));
		return newUri;
	} else {
		vscode.window.showWarningMessage("ADR could not be found in the workspace.");
	}
}

/**
 * Returns a new (basic) ADR object with only the specified required fields.
 * @param fields The required fields of the basic ADR object
 * @returns A new ADR object with the specified required fields
 */
export function getAdrObjectFromFields(fields: {
	title: string;
	date?: string;
	status?: string;
	deciders?: string;
	technicalStory?: string;
	contextAndProblemStatement: string;
	decisionDrivers?: string[];
	consideredOptions: {
		title: string;
		description: string;
		pros: string[];
		cons: string[];
	}[];
	decisionOutcome: {
		chosenOption: string;
		explanation: string;
		positiveConsequences?: string[];
		negativeConsequences?: string[];
	};
	links?: string[];
}): ArchitecturalDecisionRecord {
	// Create ADR object
	const newAdr = new ArchitecturalDecisionRecord({
		title: fields.title,
		date: fields.date ?? "",
		status: fields.status ?? "",
		deciders: fields.deciders ?? "",
		technicalStory: fields.technicalStory ?? "",
		contextAndProblemStatement: fields.contextAndProblemStatement,
		decisionDrivers: fields.decisionDrivers || [],
		consideredOptions: fields.consideredOptions,
		decisionOutcome: {
			chosenOption: fields.decisionOutcome.chosenOption,
			explanation: fields.decisionOutcome.explanation,
			positiveConsequences: fields.decisionOutcome.positiveConsequences || [],
			negativeConsequences: fields.decisionOutcome.negativeConsequences || [],
		},
		links: fields.links || [],
	});

	newAdr.cleanUp();

	return newAdr;
}

/**
 * Returns a URI of a MADR file that has been renamed to the specified name.
 * The Markdown file keeps its original ADR number, only its "actual" name will be changed.
 * @param fileUri The URI of the original file that should be renamed
 * @param newName A string to which a file should be renamed to
 * @returns A new URI with the replaced file name
 */
function getRenamedUri(fileUri: vscode.Uri, newName: string): vscode.Uri {
	const uriWithoutTitleInFileName = fileUri.toString().substring(0, fileUri.toString().lastIndexOf("/") + 6);
	const newUriString = uriWithoutTitleInFileName.concat(naturalCase2snakeCase(newName), ".md");
	return vscode.Uri.parse(newUriString);
}

/**
 * Returns an array of strings that each represent the title of one considered option.
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
 * Saves the specified Markdown string in the ADR Directory specified by the user
 * @param md The content of the Markdown file as a string
 * @param title The title of the ADR
 */
async function saveMarkdownToAdrDirectory(md: string, title: string) {
	if (!isWorkspaceOpened()) {
		vscode.window.showErrorMessage("Please open a workspace folder to initialize ADR Directory");
	} else {
		if (isSingleRootWorkspace()) {
			// Check if single-root folder is root folder of other root folders
			if (treatAsMultiRoot() && (await containsOnlyRootFolders(getWorkspaceFolders()[0].uri))) {
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
					WebPanel.createOrShow(EXTENSION_URI, "main");
					// Show success message and potentially open file in separate editor
					const open = await vscode.window.showInformationMessage(
						"ADR created. Do you want to open the Markdown file?",
						"Yes",
						"Cancel"
					);
					if (open === "Yes") {
						vscode.window.showTextDocument(await vscode.workspace.openTextDocument(fileUri));
					}
				}
			} else {
				// "Real" single-root workspace
				const fileName = `${_.padStart((await getHighestAdrNumber()) + 1, 4, "0")}-${naturalCase2snakeCase(
					title
				)}.md`;
				const fileUri = vscode.Uri.joinPath(getWorkspaceFolders()[0].uri, getAdrDirectoryString(), fileName);
				await vscode.workspace.fs.writeFile(fileUri, new TextEncoder().encode(md));
				// Show success message and potentially open file in separate editor
				const open = await vscode.window.showInformationMessage(
					"ADR created successfully. Do you want to open the Markdown file?",
					"Yes",
					"Cancel"
				);
				if (open === "Yes") {
					vscode.window.showTextDocument(await vscode.workspace.openTextDocument(fileUri));
				}
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
				// Show success message and potentially open file in separate editor
				const open = await vscode.window.showInformationMessage(
					"ADR created. Do you want to open the Markdown file?",
					"Yes",
					"Cancel"
				);
				if (open === "Yes") {
					vscode.window.showTextDocument(await vscode.workspace.openTextDocument(fileUri));
				}
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
		panel.webview.postMessage({ command: "fetchAdrs", adrs: JSON.stringify(allAdrs) });
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
		panel.webview.postMessage({ command: "fetchAdrs", adrs: JSON.stringify(allAdrs) });
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
		panel.webview.postMessage({ command: "fetchAdrs", adrs: JSON.stringify(allAdrs) });
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
	let filePath = adrUri.path;
	for (const folder of getWorkspaceFolders()) {
		if (filePath.match(folder.uri.path)) {
			return filePath.replace(folder.uri.path.substring(0, folder.uri.path.lastIndexOf("/") + 1), "");
		}
	}

	return filePath;
}
