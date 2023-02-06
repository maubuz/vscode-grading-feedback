import * as vscode from 'vscode';

/**
 * Basic note comment for VS Code Comment API
 * Included in the sample extension for the Comment API and moved to it's own file
 */

let commentId = 1;

export class NoteComment implements vscode.Comment {
	id: number;
	label: string | undefined;
	savedBody: string | vscode.MarkdownString; // for the Cancel button
	constructor(
		// Using parameter properties shorthand
		public body: string | vscode.MarkdownString,
		public mode: vscode.CommentMode,
		public author: vscode.CommentAuthorInformation,
		public parent?: vscode.CommentThread,
		public contextValue?: string
	) {
		this.id = ++commentId;
		this.savedBody = this.body;
	}
}