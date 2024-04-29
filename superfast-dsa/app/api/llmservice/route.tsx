import { useState } from "react";
// export const runtime = "edge";

// export async function GET(request: Request) {
//   return new Response("hello world", { status: 200 });
// }

const API_URL = "https://api.openai.com/v1/chat/completions";
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessages = [
      ...messages,
      {
        role: "user",
        content: message,
      },
    ];

    setMessages(newMessages);
    setMessage("");

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: newMessages,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const newMessages2 = [...newMessages, data.choices[0].message];
        setMessages(newMessages2);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Sticky navbar */}
      <nav className="bg-white shadow w-full px-4 py-2 fixed top-0 z-10">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-lg font-bold">Jobot</h1>
        </div>
      </nav>
      <div className="flex-1 max-w-xl mx-auto px-4 py-8 flex flex-col">
        {messages.map(({ role, content }, idx) => (
          <div key={idx} className="border rounded-md p-4 mb-4 w-full">
            <div className="text-sm font-bold">
              {role == "user" ? "You" : "Jobot"}
            </div>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ))}
      </div>

      <div className="max-w-xl mx-auto ">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="flex-1 border border-gray-400 rounded-lg px-4 py-4 mr-4"
          placeholder="Paste your API Key here"
        />
        <form onSubmit={handleSubmit} className="px-4 py-2 flex items-center ">
          {/* Chat input box */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border border-gray-400 rounded-lg px-4 py-4 mr-4"
            placeholder="Send a message"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

llmService.registerTemplate({
  id: "leetcode-assistant",
  systemPrompt:
    'You are a virtual evaluator coding questions. Given a question and some code written by a student, your job is to determine whether the code correctly solves the question. If it\'s correct, simply reply "CORRECT". If it is incorrect, reply "INCORRECT" and in the next few lines, explain why the code is incorrect using bullet points without giving away the answer. Keep your explanations short.',
  userPrompt: `
  PROBLEM:
  {{problem}}
  
  --END OF PROBLEM--
  
  MY CODE: 
  {{code}}
  
  --END OF CODE--
  
  `,
  model: "gpt-3.5-turbo",
  temperature: 0.8,
  max_tokens: 1000,
});

export async function POST(request: Request) {
  const body = await request.json();

  // check if the user is authentication

  // perform some rate limiting

  try {
    const data = await llmService.handle(body);
    return new Response(data, { status: 200 });
  } catch (error) {
    return new Response((error as Error).message, { status: 400 });
  }
}