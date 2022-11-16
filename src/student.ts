'use strict';

import * as vscode from 'vscode';
import {SpecificFeedback} from './specificFeedback';

export class Student {

	studentFeedback?: SpecificFeedback[];
	constructor(
		public studentNumber: number
	) { }
}