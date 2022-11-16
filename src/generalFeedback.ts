'use strict';

import * as vscode from 'vscode';
import {SpecificFeedback} from './specificFeedback';

let feedbackIdCounter = 1;

function generateGeneralFeedbackId() {
	return feedbackIdCounter++;
}

export class GeneralFeedback {
	feedbackId:number;
	specificFeedback?: SpecificFeedback[];

	constructor(
		parentQuestionId: number,
		commentText: string | vscode.MarkdownString,
		totalPoints?: number,
		parentThread?: vscode.CommentThread,
	) {
		this.feedbackId = generateGeneralFeedbackId();
	}
}