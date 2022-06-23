// Declare that the VS Code API has already been acquired in the WebPanel under the constant "vscode"
declare const vscode: any;
import { Vue } from "vue-class-component";

export class VSCodeMessageMixin extends Vue {
	sendMessage(message: string) {
		vscode.postMessage({
			type: message,
		});
	}
}
