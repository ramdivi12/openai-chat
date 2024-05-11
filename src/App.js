import { useState } from "react";
import axios from "axios";
import "./App.scss";

const HTTP_ENDPOINT = "http://localhost:8080/chatbot";

async function sendPrompt(prompt) {
  try {
    const response = await axios.post(HTTP_ENDPOINT, { prompt });
    return response.data;
  } catch (error) {
    console.error("Failed to send prompt:", error);
    throw error;
  }
}

const OpenAIChatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!prompt.trim()) return;
    setError("");

    try {
      const resData = await sendPrompt(prompt);
      setResponse(resData);
    } catch (error) {
      setError("Failed to fetch response. Please try again.");
    }

    setPrompt(""); 
  };

  const handlePrompt = (event) => {
    setPrompt(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="title">Ramesh Chatbot</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>Ask a question</label>
        <div className="form-container">
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter your question here ..."
              value={prompt}
              onChange={handlePrompt}
            />
          </div>
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
      {error && <div className="error">{error}</div>} {/* Display error if any */}
      <div className="response">
        <p>
          {response || "Submit your question in the text field above ..."}
        </p>
      </div>
    </div>
  );
}

export default OpenAIChatbot;