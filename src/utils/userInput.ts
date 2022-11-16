import * as vscode from 'vscode';

export async function getTextInput(inputQuestion: string, preFilledText: string): Promise<string> {
	// async getInput(inputQuestion: string, preFilledText: string): Promise<string> {
	const editor = vscode.window.activeTextEditor;
	if (editor == undefined) throw new Error("Editor is undefined");

	// TODO: Improve UX with InputBox.

	const annotationText = await vscode.window.showInputBox({
		title: inputQuestion,
		placeHolder: inputQuestion,
		value: preFilledText,
	});
	return annotationText ? annotationText : "";
}