import * as vscode from 'vscode';

// TODO: close terminal once all tasks terminate? Leave it open if something fails?
// How to transparently notify user of what's happening?
export function setupGradingEnvironment() {
	vscode.window.showInformationMessage("Setting up Feedback environment");

	const commands: string[] = [
		"echo 'Setting up feedback environment. Executing commands below.'",
		"git clone git@github.com:ianclement/grading-tools.git",
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