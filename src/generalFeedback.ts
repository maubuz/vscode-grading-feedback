'use strict';

import * as vscode from 'vscode';
import { SpecificFeedback } from './specificFeedback';
import { getTextInput } from './utils/userInput';

// TODO: Create a way to update feedbackIdCounter once the feedback is read from the 
// Json file.
let feedbackIdCounter = 1;

function generateGeneralFeedbackId() {
	return feedbackIdCounter++;
}

export class GeneralFeedback {
	feedbackId: number;
	specificFeedback: SpecificFeedback[];

	constructor(
		public parentQuestionId: string,
		public generalFeedbackText: string,
		public questionPoints: number,
	) {
		this.feedbackId = generateGeneralFeedbackId();
		this.specificFeedback = [];
	}

	static FromJSON(rawFeedback: any): GeneralFeedback {
		const newGeneralFeedback = new GeneralFeedback(
			rawFeedback.parentQuestionId,
			rawFeedback.generalFeedback,
			rawFeedback.questionPoints
		);
		newGeneralFeedback.feedbackId = rawFeedback.feedbackId;

		newGeneralFeedback.specificFeedback = rawFeedback.specificFeedback.map((rawSpecificFeedback: any) =>{
			return SpecificFeedback.FromJSON(rawSpecificFeedback);
		});
		// newGeneralFeedback.specificFeedback = new SpecificFeedback.FromJSON(feedback.specificFeedback)
		return newGeneralFeedback;
	}
}

/**
 * Guides user throught the creation of a new general feedback.
 * @returns promise of GeneraFeedback or empty promise if creation process is aborted.
 */
export async function buildGeneralFeedback(questionId: string): Promise<GeneralFeedback | undefined> {

	const generalFeedbackText = await getTextInput("Enter feedback title", "General Feedback Example 1");

	let questionPoints = await getTextInput("Enter feedback points", "-0.5");
	// Ensure floating point
	while (isNaN(parseFloat(questionPoints)) && questionPoints != "") {
		questionPoints = await getTextInput("Invalid number. Enter feedback points", "-0.5");
	}

	// If user hits Enter or Esc on prompt, we get an empty string. Abort the process.
	if (generalFeedbackText == "" || questionPoints == "") return;

	const feedback = new GeneralFeedback(
		questionId, generalFeedbackText, parseFloat(questionPoints)
	);
	console.log(JSON.stringify(feedback)); // Dev-only
	return feedback;
}

/**
 * Show the user a list of existing general feedback and let user make a selection
 * @param existingFeedback 
 * @returns promise with selected feedback or undefined if operation is aborted
 */
export async function selectFeedbackFromList(parentQuestionId: string, existingFeedback: GeneralFeedback[]): Promise<GeneralFeedback | undefined> {
	const feedbackPickItems: vscode.QuickPickItem[] = existingFeedback.map(feedback => (
		{
			label: "(" + feedback.questionPoints + ") " + feedback.feedbackId + " - " + feedback.generalFeedbackText,
			description: feedback.feedbackId.toString()
		}
	));

	// Add an option to create a new Feedback if it doesn't exists in the list
	// TODO: Find better way to add items on the fly.
	feedbackPickItems.push({
		label: "Create new general feedback",
		description: "0"
	});
	const pick = await vscode.window.showQuickPick(feedbackPickItems,
		{
			title: "Select General Feedback from List",
			placeHolder: "Select General Feedback from List"
		}
	);
	// If user wants to create a new feedback item, create it an add it to the existing Feedback list
	if (pick && pick.description === "0") {
		const newFeedback = await buildGeneralFeedback(parentQuestionId);
		if (newFeedback) {
			existingFeedback.push(newFeedback);
			return newFeedback;
		}

	} else if (pick) {
		// TODO: find better way to return feedback from picked item.
		const selectedFeedback = existingFeedback.find(item => {
			if (pick.description) { // This check seems uncessary by I can't proceed otherwise
				return item.feedbackId == parseInt(pick.description);
			}
		});
		if (selectedFeedback) {
			vscode.window.showInformationMessage(selectedFeedback.generalFeedbackText);
			return selectedFeedback;
		}
	} else {
		vscode.window.showErrorMessage("Could not select item from list");
		return undefined;
	}
}