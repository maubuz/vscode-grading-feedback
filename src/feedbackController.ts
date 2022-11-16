'use strict';

import * as vscode from 'vscode';
import { Question, buildQuestion } from './questions';
import { Student } from './student';

const questions: Question[] = [];
let students: Student[];

export function listQuestionsToConsole() {
	console.log("Printing list of questions");

	questions.forEach(question => {
		console.log(JSON.stringify(question));
	});
}

export async function createQuestion() {
	const question = await buildQuestion();
	if (question) questions.push(question);
	else vscode.window.showErrorMessage("Feedback question creation aborted");
}
