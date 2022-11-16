'use strict';

import * as vscode from 'vscode';

let specificFeedbackIdCounter = 1;

function generateSpecificFeedbackId() {
	return specificFeedbackIdCounter++;
}

export class SpecificFeedback {
	specificFeedbackId: number;
	constructor(
		parentFeedbackId: number,
		points: number,
		specificText: string | vscode.MarkdownString,
	) {
		this.specificFeedbackId = generateSpecificFeedbackId();
	}
}