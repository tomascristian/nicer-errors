import vscode from 'vscode';
import { pipe, map, forEach, groupBy, minBy, values, entries } from "./util";
import { decorations } from "./decorations";

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.languages.onDidChangeDiagnostics(updateDecorations),
		vscode.window.onDidChangeVisibleTextEditors(updateDecorations)
	);

	function updateDecorations() {
		updateEditorDecorations();
		updateGutterDecorations();
	}

	function updateEditorDecorations() {
		vscode.window.visibleTextEditors.forEach(editor => {
			const diagnostics = vscode.languages.getDiagnostics(editor.document.uri);
			const bySeverity = groupBy(diagnostics, d => d.severity);
			for (const [severity, decoration] of Object.entries(decorations.editor)) {
				const ranges = bySeverity[severity]?.map(d => d.range) || [];
				editor.setDecorations(decoration, ranges);
			}
		});
	}

	function updateGutterDecorations() {
		vscode.window.visibleTextEditors.forEach(editor => {
			const diagnostics = vscode.languages.getDiagnostics(editor.document.uri);
			const bySeverity = pipe(
				diagnostics,
				groupBy(d => d.range.start.line),
				values,
				map(getMostSeverePerLine),
				groupBy(d => d.severity),
			);
			for (const [severity, decoration] of Object.entries(decorations.gutter)) {
				const ranges = bySeverity[severity]?.map(d => d.range) || [];
				editor.setDecorations(decoration, ranges);
			}
		});
	}

};

const getMostSeverePerLine = minBy((d: vscode.Diagnostic) => d.severity); // Lower number means higher severity
