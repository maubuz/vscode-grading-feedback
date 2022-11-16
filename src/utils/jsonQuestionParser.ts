import * as vscode from 'vscode';
import * as jsonQuestions from '../sampleJson/sampleQuestion.json';
import { Question } from "../questions";

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