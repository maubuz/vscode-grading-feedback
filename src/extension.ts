'use strict';

import * as vscode from 'vscode';
import { createGeneralFeedback, createQuestion,
	listQuestionsToConsole, selectGeneralFeedback, loadJsonQuestions } from './feedbackController';
import { setupGradingEnvironment, loadGeneralFeedbackFromCSV } from "./externalBindings";
import { CommentsAPI } from './commentsAPI';

export function activate(context: vscode.ExtensionContext) {
	// A `CommentController` is able to provide comments for documents.
	const commentController = vscode.comments.createCommentController('grading_feedback', 'Grading Feedback');
	context.subscriptions.push(commentController);

	// A `CommentingRangeProvider` controls where gutter decorations that allow adding comments are shown
	commentController.commentingRangeProvider = {
		provideCommentingRanges: (document: vscode.TextDocument, token: vscode.CancellationToken) => {
			const lineCount = document.lineCount;
			return [new vscode.Range(0, 0, lineCount - 1, 0)];
		}
	};

	const commentsApiCommands = new CommentsAPI(context);
	commentsApiCommands.registerCommands();

	// Register all commands that came built-in with the Comments API extension example
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"grading_feedback.createQuetion",
			async () => {
				console.log("Asking user to create question");
				createQuestion();
			},
		),
	);
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"grading_feedback.listQuetions",
			() => {
				console.log("Listing created questions");
				listQuestionsToConsole();
			},
		),
	);
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"grading_feedback.createGeneralFeedback",
			async () => {
				console.log("Asking user to create general feedback");
				createGeneralFeedback();
			},
		),
	);
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"grading_feedback.selectGeneralFeedback",
			async () => {
				console.log("Select feedback from a list");
				selectGeneralFeedback();
			},
		),
	);
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"grading_feedback.readJsonQuestions",
			async () => {
				console.log("Load Feedback Questions from Json File ");
				loadJsonQuestions();
			},
		),
	);
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"grading_feedback.setupGradingEnvironment",
			() => {
				console.log("Setting up environment for grading tools");
				setupGradingEnvironment();
			},
		),
	);
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"grading_feedback.loadCSVQuetions",
			() => {
				console.log("Loading General Feedback Questions from CSV file");
				loadGeneralFeedbackFromCSV();
			},
		),
	);
	context.subscriptions.push(vscode.commands.registerCommand('grading_feedback.dispose', () => {
		commentController.dispose();
	}));
}
