// Declare that the VS Code API has already been acquired in the WebPanel under the constant "vscode"
declare const vscode: any;

export default {
	methods: {
		sendMessage(message: string) {
			vscode.postMessage({
				type: message,
			});
		},
	},
};
