import * as vscode from 'vscode';
import { NoteComment } from './noteComment';


/**
 * This class captures functionality included with the VS Code Comments API Example.
 * This functionality is not directly used by grading-feedback extension but was
 * left here for future reference and in order to not break the comments API
 */

// TODO: Remove all functions here after confirming that they are not necessary

export class CommentsAPI {
	private commands: vscode.Disposable[] = [];
	private context: vscode.ExtensionContext;


	constructor(context: vscode.ExtensionContext) {
		this.context = context;
	}

	registerCommands() {

		this.context.subscriptions.push(vscode.commands.registerCommand('grading_feedback.createNote', (reply: vscode.CommentReply) => {
			replyNote(reply);
		}));

		this.context.subscriptions.push(vscode.commands.registerCommand('grading_feedback.replyNote', (reply: vscode.CommentReply) => {
			replyNote(reply);
		}));

		this.context.subscriptions.push(vscode.commands.registerCommand('grading_feedback.startDraft', (reply: vscode.CommentReply) => {
			const thread = reply.thread;
			thread.contextValue = 'draft';
			const newComment = new NoteComment(reply.text, vscode.CommentMode.Preview, { name: 'vscode' }, thread);
			newComment.label = 'pending';
			thread.comments = [...thread.comments, newComment];
		}));

		this.context.subscriptions.push(vscode.commands.registerCommand('grading_feedback.finishDraft', (reply: vscode.CommentReply) => {
			const thread = reply.thread;

			if (!thread) {
				return;
			}

			thread.contextValue = undefined;
			thread.collapsibleState = vscode.CommentThreadCollapsibleState.Collapsed;
			if (reply.text) {
				const newComment = new NoteComment(reply.text, vscode.CommentMode.Preview, { name: 'vscode' }, thread);
				thread.comments = [...thread.comments, newComment].map(comment => {
					comment.label = undefined;
					return comment;
				});
			}
		}));

		this.context.subscriptions.push(vscode.commands.registerCommand('grading_feedback.deleteNoteComment', (comment: NoteComment) => {
			const thread = comment.parent;
			if (!thread) {
				return;
			}

			thread.comments = thread.comments.filter(cmt => (cmt as NoteComment).id !== comment.id);

			if (thread.comments.length === 0) {
				thread.dispose();
			}
		}));

		this.context.subscriptions.push(vscode.commands.registerCommand('grading_feedback.deleteNote', (thread: vscode.CommentThread) => {
			thread.dispose();
		}));

		this.context.subscriptions.push(vscode.commands.registerCommand('grading_feedback.cancelsaveNote', (comment: NoteComment) => {
			if (!comment.parent) {
				return;
			}

			comment.parent.comments = comment.parent.comments.map(cmt => {
				if ((cmt as NoteComment).id === comment.id) {
					cmt.body = (cmt as NoteComment).savedBody;
					cmt.mode = vscode.CommentMode.Preview;
				}

				return cmt;
			});
		}));

		this.context.subscriptions.push(vscode.commands.registerCommand('grading_feedback.saveNote', (comment: NoteComment) => {
			if (!comment.parent) {
				return;
			}

			comment.parent.comments = comment.parent.comments.map(cmt => {
				if ((cmt as NoteComment).id === comment.id) {
					(cmt as NoteComment).savedBody = cmt.body;
					cmt.mode = vscode.CommentMode.Preview;
				}

				return cmt;
			});
		}));

		this.context.subscriptions.push(vscode.commands.registerCommand('grading_feedback.editNote', (comment: NoteComment) => {
			if (!comment.parent) {
				return;
			}

			comment.parent.comments = comment.parent.comments.map(cmt => {
				if ((cmt as NoteComment).id === comment.id) {
					cmt.mode = vscode.CommentMode.Editing;
				}

				return cmt;
			});
		}));

		function replyNote(reply: vscode.CommentReply) {
			const thread = reply.thread;
			const newComment = new NoteComment(reply.text, vscode.CommentMode.Preview, { name: 'vscode' },
				thread, thread.comments.length ? 'canDelete' : undefined);
			if (thread.contextValue === 'draft') {
				newComment.label = 'pending';
			}

			thread.comments = [...thread.comments, newComment];
		}
	}
}