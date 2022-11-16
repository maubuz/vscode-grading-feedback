'use strict';

import * as vscode from 'vscode';
import { GeneralFeedback } from './generalFeedback';
import { getTextInput } from './utils/userInput';

export class Question {

	generalFeedback: GeneralFeedback[];

	// TODO: strip leading and training spaces in the questionId

	// Using parameter properties shorthand
	constructor(
		public title: string,
		public id: string,
		public totalPoints: number,
	) {
		this.generalFeedback = [];
	}
}

/**
 * Guides user throught the creation of a new question. Question id can be any string.
 * @returns question promise or empty promise if creation is aborted (press Esc)
 */
export async function buildQuestion(): Promise<Question | undefined> {

	const questionId = await getTextInput("Enter question number", "Q1");
	const title = await getTextInput("Enter question title", "First Question");

	let points = await getTextInput("Enter question total points", "2");
	// Ensure floating point
	while (isNaN(parseFloat(points)) && points != "") {
		points = await getTextInput("Invalid number. Enter question points", "2");
	}

	// If user hits Enter or Esc on prompt, we get an empty string. Abort the process.
	if (title == "" || questionId == "" || points == "") return;

	const question = new Question(title, questionId, parseFloat(points));
	console.log(JSON.stringify(question)); // Dev-only

	return question;
}

// )