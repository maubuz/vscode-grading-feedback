'use strict';

import * as vscode from 'vscode';
import { SpecificFeedback } from './specificFeedback';

export class Student {

	studentFeedback: SpecificFeedback[];
	constructor(
		private firstName: string,
		private lastName: string,
		public studentNumber: string

	) {
		this.studentFeedback = [];
	}
}