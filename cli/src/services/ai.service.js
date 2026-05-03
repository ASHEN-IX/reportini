import axios from "axios";

export async function analyzeMarkdown(markdown, type) {
  const res = await axios.post("http://localhost:8000/analyze", {
    markdown,
    project_type: type
  });

  return res.data;
}