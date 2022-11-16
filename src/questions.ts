'use strict';

import * as vscode from 'vscode';
import {GeneralFeedback} from './generalFeedback';

export class Question {

	generalFeedback: GeneralFeedback[];

	// TODO: strip leading and training spaces in the questionId

	// Using parameter properties shorthand
	constructor(
		public title: string,
		public questionId: string,
		public totalPoints: number,
	) {
		this.generalFeedback = [];
	}
}
