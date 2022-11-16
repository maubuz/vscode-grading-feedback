'use strict';

import * as vscode from 'vscode';
import { Question } from './questions';
import { Student } from './student';

const questions: Question[] = [];
let students: Student[];

export function listQuestionsToConsole() {
	console.log("Printing list of questions");

	questions.forEach(question => {
		console.log(JSON.stringify(question));
	});
}

/**
 * Guides user throught the creation of a new question. Question id can be any string.
 * @returns empty promise
 */
// TODO: should this return a boolean? Add typing for returning an empty promisse.
export async function createQuestion() {

	const questionId = await getInput("Enter question number", "Q1");
	const title = await getInput("Enter question title", "First Question");
	
	let points = await getInput("Enter question total points", "2");
	// Ensure floating point
	while (isNaN(parseFloat(points)) && points != "") {
		points = await getInput("Invalid number. Enter question points", "2");
	}

	// If user hits Enter or Esc on prompt, we get an empty string. Abort the process.
	if(title == "" || questionId=="" || points=="") return;

	const question = new Question(title, questionId, parseFloat(points));
	console.log(JSON.stringify(question)); // Dev-only

	questions.push(question);
}

async function getInput(inputQuestion: string, preFilledText: string): Promise<string> {
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
