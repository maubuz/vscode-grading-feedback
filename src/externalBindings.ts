import * as vscode from 'vscode';

// TODO: close terminal once all tasks terminate? Leave it open if something fails?
// How to transparently notify user of what's happening?
function setupGradingEnvironment() {
	vscode.window.showInformationMessage("Setting up Feedback environment");

	const commands: string[] = [
		"echo 'Setting up feedback environment. Executing commands below.'",
		"git clone -b vscode-integration git@github.com:maujac/grading-tools.git",
		"cd grading-tools",
		"git pull",
		"cd ..",
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
	commands.forEach(command => {
		terminal.sendText(command);
	});
}

function loadGeneralFeedbackFromCSV() {
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
	commands.forEach(command => {
		terminal.sendText(command);
	});
}

function setupStudentSubmissions() {
	vscode.window.showInformationMessage("Rename student's submissions and create students.json");
	const commands: string[] = [
		"cp -r ./grading-tools/correct/test/original/* .", // TODO: Testing only! Remove when done.
		"./grading-tools/correct/correct students",
	];
	const terminal = vscode.window.createTerminal(
		{
			name: "student submissions",
			hideFromUser: false,
		}
	);
	terminal.show();
	commands.forEach(command => {
		terminal.sendText(command);
	});
}

export async function chooseSetupTask(): Promise<void> {

	class setupCommand {
		constructor(
			public quickPick: vscode.QuickPickItem,
			public action: () => void
		) { }
	}

	const setup = new setupCommand(
		{
			label: "setup-grading-environment",
			detail: "Install grading tool & setup environment"
		},
		setupGradingEnvironment
	);
	const submission = new setupCommand(
		{
			label: "setup-submissions",
			detail: "Rename student submissions and setup student.json"
		},
		setupStudentSubmissions
	);
	const csv = new setupCommand(
		{
			label: "load-csv-feedback",
			detail: "Load general feedback from csv file"
		},
		loadGeneralFeedbackFromCSV
	);

	const setupOptions: setupCommand[] = [setup, submission, csv];
	const pickItems: vscode.QuickPickItem[] = setupOptions.map((command: setupCommand) => {
		return command.quickPick;
	});

	const PICK_TITLE = "Select setup task";
	const PICK_PLACE_HOLDER = PICK_TITLE;

	const pick = await vscode.window.showQuickPick(pickItems,
		{
			title: PICK_TITLE,
			placeHolder: PICK_PLACE_HOLDER
		}
	);
	if (pick) {
		setupOptions.find((command: setupCommand) => {
			return (command.quickPick.label === pick.label);
		})?.action();
	}
	else vscode.window.showInformationMessage("Not a valid choice. Aborting");
}
