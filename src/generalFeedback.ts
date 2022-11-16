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
}

/**
 * Guides user throught the creation of a new general feedback.
 * @returns promise of GeneraFeedback or empty promise if creation process is aborted.
 */
export async function buildGeneralFeedback(): Promise<GeneralFeedback | undefined> {

	// TODO: show list of existing questions to pick from
	const parentQuestionId = await getTextInput("Enter question Id of parent question", "Q1");
	const generalFeedbackText = await getTextInput("Enter feedback title", "General Feedback Example");

	let questionPoints = await getTextInput("Enter question total points", "-0.5");
	// Ensure floating point
	while (isNaN(parseFloat(questionPoints)) && questionPoints != "") {
		questionPoints = await getTextInput("Invalid number. Enter question points", "-0.5");
	}

	// If user hits Enter or Esc on prompt, we get an empty string. Abort the process.
	if (parentQuestionId == "" || generalFeedbackText == "" || questionPoints == "") return;

	const feedback = new GeneralFeedback(
		parentQuestionId, generalFeedbackText, parseFloat(questionPoints)
	);
	console.log(JSON.stringify(feedback)); // Dev-only
	return feedback;
}

// export async function selectFeedbackFromList(feedbackList: GeneralFeedback[]) {

// }