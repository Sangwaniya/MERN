"use client";
import useLLM from "usellm";
import { useState } from "react";

export default function MyComponent() {
  const llm = useLLM("/api/llmservice");
  const [result, setResult] = useState("");

  const [problem, setProblem] = useState("");
  const [code, setCode] = useState("");

  function handleSubmit() {
    if (!problem) {
      window.alert("Problem statement is required");
      return;
    }

    if (!code) {
      window.alert("Code is required");
      return;
    }

    llm.chat({
      template: "leetcode-assistant",
      inputs: {
        problem: problem,
        code: code,
      },
      stream: true,
      onStream: (message) => setResult(message.content),
      onError: (error) => console.error("Failed to send", error),
    });
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto w-full text-center py-6">
        <h1 className="text-4xl text-gray-800 font-semibold">
          LeetCode Assistant
        </h1>
        <div className="text-xl text-gray-400 mt-2">
          Your personal programming coach powered by ChatGPT. Just share your
          solution and get instant feedback on what is going wrong.
        </div>
      </div>

      <div className="max-w-4xl w-full mx-auto px-4">
        <div className="flex flex-col mb-4">
          <label className="font-medium">Problem Statement</label>
          <textarea
            placeholder="Paste the problem statement here"
            className="border rounded p-2 mt-1"
            rows={5}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          ></textarea>
        </div>

        <div className="flex flex-col mb-4">
          <label className="font-medium">Your Code</label>
          <textarea
            placeholder="Paste your code here"
            className="border rounded p-2 mt-1 font-mono"
            rows={5}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          className="w-20 border border-blue-600 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded p-2 font-medium"
        >
          Submit
        </button>
      </div>

      {result && (
        <div className="max-w-4xl w-full mx-auto p-4 flex flex-col">
          <label className="font-medium">Assessment</label>
          <div className="text-lg whitespace-pre-wrap ">{result}</div>
        </div>
      )}
    </div>
  );
}