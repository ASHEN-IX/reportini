import { exec } from "child_process";
import path from "path";

export function generatePDF(texPath, outputDir) {
  return new Promise((resolve, reject) => {
    const cmd = `pdflatex -output-directory=${outputDir} ${texPath}`;

    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error(stderr);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}