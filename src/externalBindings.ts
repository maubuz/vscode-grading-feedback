import * as vscode from 'vscode';

// TODO: close terminal once all tasks terminate? Leave it open if something fails?
// How to transparently notify user of what's happening?
export function setupGradingEnvironment() {
	vscode.window.showInformationMessage("Setting up Feedback environment");

	const commands: string[] = [
		"echo 'Setting up feedback environment. Executing commands below.'",
		"git clone -b vscode-integration git@github.com:maujac/grading-tools.git",
		"./grading-tools/correct/correct init",
		"cp ./grading-tools/correct/test/questions-csv-sample.csv ."
	];

	const terminal = vscode.window.createTerminal(
		{
			name: "Feedback Setup",
			hideFromUser: false,
		}

	);
	terminal.show();
	commands.forEach( command =>{
		terminal.sendText(command);
	});
}

export function loadGeneralFeedbackFromCSV() {
	vscode.window.showInformationMessage("Load General Feedback Questions from CSV file");

	const commands: string[] = [
		"./grading-tools/correct/correct csv ./questions.csv",
	];

	const terminal = vscode.window.createTerminal(
		{
			name: "Load CSV Questions",
			hideFromUser: false,
		}

	);
	terminal.show();
	commands.forEach( command =>{
		terminal.sendText(command);
	});
}