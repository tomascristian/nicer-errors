import vscode from "vscode";

enum Color {
  Error = "crimson",
  Warning = "orange",
  Information = "skyblue",
  Hint = "skyblue"
}

const { Error, Warning, Information, Hint } = vscode.DiagnosticSeverity;

export const decorations = {
  editor: {
    [Error]: createEditorDecoration(Color.Error),
    [Warning]: createEditorDecoration(Color.Warning),
    [Information]: createEditorDecoration(Color.Information),
    [Hint]: createEditorDecoration(Color.Hint)
  },
  gutter: {
    [Error]: createGutterDecoration(Color.Error),
    [Warning]: createGutterDecoration(Color.Warning),
    [Information]: createGutterDecoration(Color.Information),
    [Hint]: createGutterDecoration(Color.Hint)
  }
};


function createEditorDecoration(color: vscode.ThemeColor | Color) {
  return vscode.window.createTextEditorDecorationType({
    border: `1px dashed`,
    borderColor: color
  });
}

function createGutterDecoration(color: Color) {
  const icon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect x="0" y="0" width="100" height="100" rx="10" ry="10" fill="${color}"/>
  </svg>`;

  return vscode.window.createTextEditorDecorationType({
    gutterIconPath: vscode.Uri.parse(createSVGDataURI(icon)),
    gutterIconSize: "40%"
  });

  function createSVGDataURI(svg: string) {
    const encoded = encodeURIComponent(svg.replace(/\n/g, ""));
    return `data:image/svg+xml,${encoded}`;
  }
}