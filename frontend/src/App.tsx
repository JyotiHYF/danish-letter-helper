import { useState } from "react";

type AnalysisResult = {
  type: string;
  urgency: string;
  deadline: string;
  action: string;
};

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    setError("");
    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text }),
      });
      const data: AnalysisResult = await response.json();
      setResult(data);
    } catch {
      setError("Could not reach the server. Is it running?");
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 16 }}>
      <h1>Danish Letter Helper</h1>
      <textarea
        rows={8}
        style={{ width: "100%" }}
        placeholder="Paste your Danish letter here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAnalyze}>Analyze</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: 8,
            padding: 16,
            marginTop: 16,
          }}
        >
          <p>
            <strong>Type:</strong> {result.type}
          </p>
          <p>
            <strong>Urgency:</strong> {result.urgency}
          </p>
          <p>
            <strong>Deadline:</strong> {result.deadline}
          </p>
          <p>
            <strong>Action:</strong> {result.action}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
