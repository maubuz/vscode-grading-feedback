# VS Code Grading Feedback Extension

A VS Code extension that uses the Comments API to easily create, reuse and manage grading feedback on code assignments.

## References & Inspirations

- VSC Extension [Textfile Comments](https://marketplace.visualstudio.com/items?itemName=JJKorpershoek.textfile-comments) by Jan-Jaap Korpershoek
	- GitHub: [JJK96](https://github.com/JJK96) / **[vscode-textfile-comments](https://github.com/JJK96/vscode-textfile-comments)**

- VSC Extension [Code Annotation](https://marketplace.visualstudio.com/items?itemName=tkcandrade.code-annotation) by Thamara Andrade
	- Github: [thamara](https://github.com/thamara) / **[vscode-code-annotation](https://github.com/thamara/vscode-code-annotation)**

- VSC Extension [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) by GitHub
	- Github: [microsoft](https://github.com/microsoft) / **[vscode-pull-request-github](https://github.com/microsoft/vscode-pull-request-github)**

## Origianl Commenting API Example

Code was started from VS Code's extension [example on using the Comments API](https://github.com/microsoft/vscode-extension-samples/tree/main/comment-sample)

This sample shows

- How to create a comment controller.
- How to support comment thread creation for documents.
- How to update comment actions dynamically.

![demo](./wiki-demo.gif)

## Running the Sample

- Run `npm install` in terminal to install dependencies
- Run the `Run Extension` target in the Debug View. This will:
	- Start a task `npm: watch` to compile the code
	- Run the extension in a new VS Code window
