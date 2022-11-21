'use strict';

import * as vscode from 'vscode';
import { Question, buildQuestion, questionQuickPick } from './questions';
import { Student } from './student';
import { GeneralFeedback, buildGeneralFeedback, selectFeedbackFromList } from './generalFeedback';

const questions: Question[] = [];
let students: Student[];

export function listQuestionsToConsole() {
	console.log("Printing list of questions");

	questions.forEach(question => {
		console.log(JSON.stringify(question, null, 2));
	});
}

export function addNewQuestions(newQuestions: Question[]): void{
	questions.push(...newQuestions);
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
	const question = await questionQuickPick(questions, "Select question Id of parent question");
	if (question) {
		const newGeneralFeedback = await buildGeneralFeedback(question.id);
		if (!newGeneralFeedback) vscode.window.showErrorMessage("Feedback creation aborted");
		else {
			question.generalFeedback.push(newGeneralFeedback);
		}
	} else vscode.window.showErrorMessage("No question found with provided Id.");
}
export async function selectGeneralFeedback() {
	const question = await questionQuickPick(questions, "Select question");
	if (question) {
		const selectedFeedback = await selectFeedbackFromList(question.id, question.generalFeedback);
		if (selectedFeedback) vscode.window.showInformationMessage(selectedFeedback.generalFeedbackText);
	}
}