'use strict';

import * as vscode from 'vscode';
import { GeneralFeedback } from './generalFeedback';

export class Question {

	generalFeedback: GeneralFeedback[];

	// TODO: strip leading and training spaces in the questionId

	// Using parameter properties shorthand
	constructor(
		public title: string,
		public questionId: string,
		public totalPoints: number,
	) {
		this.generalFeedback = [];
	}
}

/**
 * Guides user throught the creation of a new question. Question id can be any string.
 * @returns empty promise
 */
// TODO: should this return a boolean? Add typing for returning an empty promisse.
export async function buildQuestion(): Promise<Question | undefined> {
	// async createQuestion(): Promise<Question | undefined> {

	const questionId = await getInput("Enter question number", "Q1");
	const title = await getInput("Enter question title", "First Question");

	let points = await getInput("Enter question total points", "2");
	// Ensure floating point
	while (isNaN(parseFloat(points)) && points != "") {
		points = await getInput("Invalid number. Enter question points", "2");
	}

	// If user hits Enter or Esc on prompt, we get an empty string. Abort the process.
	if (title == "" || questionId == "" || points == "") return;

	const question = new Question(title, questionId, parseFloat(points));
	console.log(JSON.stringify(question)); // Dev-only

	return question;
}

async function getInput(inputQuestion: string, preFilledText: string): Promise<string> {
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
// )