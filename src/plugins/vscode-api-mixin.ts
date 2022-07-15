// Declare that the VS Code API has already been acquired in the WebPanel under the constant "vscode"
declare const vscode: any;

export default {
	methods: {
		sendMessage(command: string, data?: any | undefined) {
			vscode.postMessage({
				command: command,
				data: data,
			});
		},
	},
};
