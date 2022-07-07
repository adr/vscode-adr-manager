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
 *
 * @param title string to be shortened
 * @returns a shortened string based on the input string
 */
export function createShortTitle(title: string) {
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
	return result;
}
