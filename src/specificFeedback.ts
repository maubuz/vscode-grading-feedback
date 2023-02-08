'use strict';

import * as vscode from 'vscode';

let specificFeedbackIdCounter = 1;

function generateSpecificFeedbackId() {
	return specificFeedbackIdCounter++;
}

export class SpecificFeedback {
	specificFeedbackId: number;
	constructor(
		private parentFeedbackId: number,
		private studentNumber: string,
		// private points: number,
		// private specificText: string | vscode.MarkdownString,
	) {
		this.specificFeedbackId = generateSpecificFeedbackId();
	}

	static FromJSON(rawFeedback: any): SpecificFeedback {
		const newSpecificFeedback = new SpecificFeedback(
			rawFeedback.parentFeedbackId,
			rawFeedback.studentNumber,	
			// rawFeedback.points,
			// rawFeedback.specificText
		);
		newSpecificFeedback.specificFeedbackId = rawFeedback.specificFeedbackId;

		return newSpecificFeedback;
	}
}