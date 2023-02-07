'use strict';

import * as vscode from 'vscode';
import { GeneralFeedback } from './generalFeedback';
import { getTextInput } from './utils/userInput';
import * as jsonQuestions from './sampleJson/sampleQuestion.json';

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

	static FromJSON(rawQuestion: any): Question{
		const newQuestion = new Question(
			rawQuestion.title,
			rawQuestion.id,
			rawQuestion.totalPoints
		);
		newQuestion.generalFeedback = rawQuestion.generalFeedback.map((rawFeedback: any) => {
			return GeneralFeedback.FromJSON(rawFeedback);
		});
		
		return newQuestion;
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

export async function questionQuickPick( existingQuestions: Question[], selectionText: string ): Promise<Question | undefined> {
	
	// Map question array to QuickPickItem array
	const feedbackPickItems: vscode.QuickPickItem[] = existingQuestions.map(question => (
		{ label: question.id }
	));
	// TODO: Add questions on the fly, similar to General Feedback
	const pick = await vscode.window.showQuickPick(feedbackPickItems,
		{
			title: selectionText,
			placeHolder: selectionText 
		}
	);
	if(pick){
		return existingQuestions.find(question => question.id === pick.label );
	}
}

export function readJsonQuestions(): Question[] {

	const loadedQuestions: Question[] = [];

	jsonQuestions.questions.forEach(question => {
		console.log(JSON.stringify(question, null, 2));

		try {
			loadedQuestions.push(Question.FromJSON(question));

			console.log("Loaded questions");
			loadedQuestions.forEach(question => {
				console.log(JSON.stringify(question, null, 2));
			});

		} catch (error) {
			vscode.window.showErrorMessage("Failed to load json file");
		}
	});
	return loadedQuestions;
}