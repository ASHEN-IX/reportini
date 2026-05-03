import fs from "fs";
import path from "path";
import { analyzeMarkdown } from "../services/ai.service.js";
import { markdownToLatex } from "../services/latex.service.js";
import { generatePDF } from "../services/pdf.service.js";

export default async function analyze(file, options) {
  try {
    const inputPath = path.resolve(file);
    const outputDir = path.resolve(options.output);

    if (!fs.existsSync(inputPath)) {
      console.error("❌ File not found");
      return;
    }

    const markdown = fs.readFileSync(inputPath, "utf-8");

    console.log("⚡ Sending to AI service...");
    const result = await analyzeMarkdown(markdown, options.type);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save enhanced markdown
    const enhancedPath = path.join(outputDir, "enhanced.md");
    fs.writeFileSync(enhancedPath, result.final_markdown);

    console.log("🧠 Converting to LaTeX...");
    const latex = markdownToLatex(result.final_markdown);

    const texPath = path.join(outputDir, "report.tex");
    fs.writeFileSync(texPath, latex);

    console.log("📄 Generating PDF...");
    await generatePDF(texPath, outputDir);

    console.log("✅ Done! Output in:", outputDir);

  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}