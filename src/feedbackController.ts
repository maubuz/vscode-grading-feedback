'use strict';

import * as vscode from 'vscode';
import { Question, buildQuestion } from './questions';
import { Student } from './student';
import { GeneralFeedback, buildGeneralFeedback } from './generalFeedback';

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

function findQuestionFromId(questionId: string): Question | undefined {
	return questions.find(question => question.id === questionId);
}

export async function createGeneralFeedback() {
	const generalFeedback = await buildGeneralFeedback();
	if (!generalFeedback) vscode.window.showErrorMessage("Feedback creation aborted");
	else {
		const question = findQuestionFromId(generalFeedback.parentQuestionId);
		if (!question) vscode.window.showErrorMessage("No question found with provided Id.");
		else question.generalFeedback.push(generalFeedback);
	}
}