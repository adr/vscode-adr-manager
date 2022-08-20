/**
 * Returns a randomly generated string with length 32 which may contain uppercase letters, lowercase letters and integers.
 * @returns A randomly generated string
 */
export function getNonce(): string {
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

/**
 * Returns true if the specified string is a valid name for a directory. Otherwise returns false.
 * The name must not start with a whitespace character, end with a dot (.) or a whitespace character or
 * contain any of the following characters: ? * : " ; < > | / \
 * @param name The directory name to be verified
 * @returns True if the specified name is a valid directory name, else false
 */
export function validateDirectoryName(name?: string | undefined): boolean {
	if (typeof name === "undefined") {
		return false;
	}

	const test = /^[^\s\x00-\x1f\\?*:"";<>|\/][^\x00-\x1f\\?*:"";<>|\/]*[^\s^\x00-\x1f\\?*:"";<>|\/.]+$/g;

	return test.test(name);
}

/**
 * Helper function for clean up.
 * If a string is passed, it is trimmed. Otherwise, an empty string is returned.
 * @param {string|undefined|null} string
 * @returns {string} the trimmed string or an empty string
 */
export function cleanUpString(string: string): string {
	if (typeof string === "string") {
		return string.trim();
	} else {
		return "";
	}
}

/**
 * Returns a shortened string from a given string. Specifically, the shortened string will have the following stripped off:
 *
 * - the short description (marked with a "-"), if it has one
 * - Markdown links (marked with [...](...)), if it has any
 * - backticks (`), if it has any
 *
 * @param title string to be shortened
 * @returns a shortened string based on the input string
 */
export function createShortTitle(title: string): string {
	if (!title) {
		return "";
	}
	let result = title;

	// Strip off short description text in the title
	// Example:
	//   In: [MADR](https://adr.github.io/madr/) 2.1.2 – The Markdown Architectural Decision Records
	//   Out: [MADR](https://adr.github.io/madr/) 2.1.2
	let idx = title.indexOf(" - ");
	if (idx > 0) {
		result = title.substr(0, idx);
	} else {
		idx = title.indexOf(" – ");
		if (idx > 0) {
			result = title.substr(0, idx);
		} else {
			idx = title.indexOf(" | ");
			if (idx > 0) {
				result = title.substr(0, idx);
			} else {
				idx = title.indexOf(", e.g.");
				if (idx > 0) {
					result = title.substr(0, idx);
				} else {
					// Handle case "Add `* Category: CATEGORY` directly under the heading (similar to https://gist.github.com/FaKeller/2f9c63b6e1d436abb7358b68bf396f57)"
					// --> content of braces should be removed for short title
					idx = title.indexOf(" (");
					let idxClosing = title.indexOf(")");
					if (idx > 0 && idxClosing === title.length - 1 && (idx = title.lastIndexOf(" ("))) {
						result = title.substr(0, idx);
					}
				}
			}
		}
	}

	// Strip out markdown link
	// Example:
	//   In: [MADR](https://adr.github.io/madr/) 2.1.2
	//   Out: MADR 2.1.2
	// Example 2:
	//   In: Include in [adr-tools](https://github.com/npryce/adr-tools)
	//   Out: Include in adr-tools
	// Quick solution; better: Use RegEx or ANTLR
	let idxOpeningBracket = result.indexOf("[");
	let idxClosingBracket = result.indexOf("]");
	let idxOpeningRoundedBracket = result.indexOf("(");
	let idxClosingRoundedBracket = result.indexOf(")");
	if (
		idxOpeningBracket >= 0 &&
		idxOpeningBracket < idxClosingBracket &&
		idxOpeningRoundedBracket === idxClosingBracket + 1 &&
		idxClosingRoundedBracket > idxOpeningRoundedBracket
	) {
		result =
			(idxOpeningBracket > 0 ? result.substr(0, idxOpeningBracket) : "") +
			result.substr(idxOpeningBracket + 1, idxClosingBracket - idxOpeningBracket - 1) +
			(result.length > idxClosingRoundedBracket + 1 ? result.substr(idxClosingRoundedBracket + 1) : "");
	}

	// Strip out backticks (`)
	result = result.replace(/`/g, "");

	return result;
}

/**
 * Converts an string in snake case into an natural-language-like string.
 *
 * Example: '0001-add-status-field' is converted to '0001 Add Status Field'
 *
 * @param {string} snake - a string in snake case
 */
export function snakeCase2naturalCase(snake: string): string {
	return snake.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace("-", " ").replace("_", " "));
}

/**
 * Converts an string in natural case into a snake case string.
 *
 * Can be used to generate a file name from the title of an ADR.
 *
 * Example: 'Add status Field' is converted to 'add-status-field'
 *
 * @param {string} natural - a string in natural case
 */
export function naturalCase2snakeCase(natural: string): string {
	return natural.trim().toLowerCase().replace(/  +/g, " ").split(" ").join("-");
}

/**
 * Converts an string in natural case into a title case string.
 *
 * Example: 'Add status field' is converted to 'Add Status Field'
 *
 * @param {string} natural - a string in natural case
 */
export function naturalCase2titleCase(natural: string): string {
	// Certain minor words should be left lowercase unless
	// they are the first or last words in the string
	let lowers = [
		"A",
		"An",
		"The",
		"And",
		"But",
		"Or",
		"For",
		"Nor",
		"As",
		"At",
		"By",
		"For",
		"From",
		"In",
		"Into",
		"Near",
		"Of",
		"On",
		"Onto",
		"To",
		"With",
	];
	// Certain words such as initialisms or acronyms should be left uppercase
	let uppers = ["ID", "TV", "ADR", "CC0", "MADR"];

	let str = natural.replace(/([^\W_]+[^\s-]*) */g, (txt) => {
		return txt.charAt(0).toUpperCase() + txt.substring(1);
	});

	for (let i = 0, j = lowers.length; i < j; i++) {
		str = str.replace(new RegExp("\\s" + lowers[i] + "\\s", "g"), function (txt) {
			return txt.toLowerCase();
		});
	}

	for (let i = 0, j = uppers.length; i < j; i++) {
		let regex = new RegExp(`\\b${uppers[i]}\\b`, "gi");
		str = str.replace(regex, uppers[i].toUpperCase());
	}

	// Leave plural "s" of uppers lowercase
	for (let i = 0, j = uppers.length; i < j; i++) {
		let regex = new RegExp(`\\b${uppers[i]}s\\b`, "gi");
		str = str.replace(regex, uppers[i] + "s");
	}

	return str.trim();
}

/**
 * Returns true if the given string matches the format of a MADR or is similar to it,
 * i.e. if the string starts with a four-digit number, is in kebab-case, snake_case or a combination of these two cases
 * and ends in .md.
 * Due to complications when parsing URIs, the characters '#' and '?' are prohibited in a file name.
 * @param name The string to be checked
 */
export function matchesMadrTitleFormat(name: string) {
	return name.match(/^\d{4}((-|_)[^\s-_?*:\"<>|/\\]+)+\.md$/);
}

/**
 * Replaces every instance of "\\" with "/" and multiple occurences of "/" in a row with a single "/"
 * in the specified string.
 * @param path The string to be cleaned
 */
export function cleanPathString(path: string): string {
	return path
		.replace(/\\/g, "/")
		.replace(/(\\\\)+\\*/g, "/")
		.replace(/(\/\/)+\/*/g, "/");
}
