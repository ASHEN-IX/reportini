export function markdownToLatex(md) {
  let latex = `
\\documentclass{article}
\\usepackage[utf8]{inputenc}

\\begin{document}
`;

  const lines = md.split("\n");

  lines.forEach(line => {
    if (line.startsWith("# ")) {
      latex += `\\section{${line.replace("# ", "")}}\n`;
    } else if (line.startsWith("## ")) {
      latex += `\\subsection{${line.replace("## ", "")}}\n`;
    } else {
      latex += line + "\n\n";
    }
  });

  latex += "\\end{document}";
  return latex;
}