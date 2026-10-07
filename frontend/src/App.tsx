import { useState } from "react";
import "./App.css";

type AnalysisResult = {
  type: string;
  urgency: string;
  deadline: string;
  action: string;
};

type Mode = "text" | "pdf" | "photo";

const EXAMPLE_LETTER = "Du skal betale 500 kr. senest den 15. oktober.";

function App() {
  const [mode, setMode] = useState<Mode>("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function switchMode(newMode: Mode) {
    setMode(newMode);
    setFile(null);
    setError("");
  }

  async function sendRequest(path: string, options: RequestInit) {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000${path}`, options);
      const data = await response.json();
      if (!response.ok) {
        setError(data.detail ?? "Something went wrong.");
        return;
      }
      setResult(data);
    } catch {
      setError("Could not reach the server. Is it running?");
    } finally {
      setLoading(false);
    }
  }

  function handleAnalyze() {
    setError("");

    if (mode === "text") {
      if (text.trim() === "") {
        setError("Please paste a letter first.");
        return;
      }
      sendRequest("/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text }),
      });
      return;
    }

    if (!file) {
      setError(
        mode === "pdf"
          ? "Please choose a PDF first."
          : "Please choose a photo first.",
      );
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    sendRequest("/analyze-file", { method: "POST", body: formData });
  }

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <span className="logo">DL</span>
          <span className="brand">Danish Letter Helper</span>
        </div>
      </header>

      <div className="container">
        <h1>Understand your Danish letter</h1>
        <p className="subtitle">
          Add a letter to see its type, deadline and what you need to do.
        </p>

        <div className="panel">
          <div className="tabs">
            <button
              className={mode === "text" ? "tab active" : "tab"}
              onClick={() => switchMode("text")}
            >
              Paste text
            </button>
            <button
              className={mode === "pdf" ? "tab active" : "tab"}
              onClick={() => switchMode("pdf")}
            >
              Upload PDF
            </button>
            <button
              className={mode === "photo" ? "tab active" : "tab"}
              onClick={() => switchMode("photo")}
            >
              Upload photo
            </button>
          </div>

          {mode === "text" ? (
            <textarea
              rows={7}
              placeholder="Paste your Danish letter here"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          ) : (
            <input
              key={mode}
              className="file-input"
              type="file"
              accept={
                mode === "pdf" ? "application/pdf" : "image/png,image/jpeg"
              }
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          )}

          <div className="actions">
            {mode === "text" ? (
              <button className="link" onClick={() => setText(EXAMPLE_LETTER)}>
                Use an example letter
              </button>
            ) : (
              <span />
            )}
            <button onClick={handleAnalyze} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>

          {error && <p className="error">{error}</p>}
        </div>

        {result && (
          <div className="result">
            <div className="result-head">
              <div>
                <span className="eyebrow">Letter type</span>
                <span className="result-type">{result.type}</span>
              </div>
              <span className={`badge ${result.urgency}`}>
                {result.urgency}
              </span>
            </div>

            <div className="result-grid">
              <div className="result-item">
                <span className="label">Deadline</span>
                <strong>{result.deadline}</strong>
              </div>
              <div className="result-item">
                <span className="label">What to do</span>
                <strong>{result.action}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
