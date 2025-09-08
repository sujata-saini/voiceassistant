import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // GEMINI_API_KEY is in .env

async function testGemini() {
  const prompt = `
You are TestBot, a helpful AI assistant.
Reply in strict JSON only like:
{
  "type": "general",
  "userInput": "hello",
  "response": "Hi! I am working."
}
The user said: "Hi how are you?"
`;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.5
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    const textOutput =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    console.log("Raw Gemini output:", textOutput);

    try {
      const parsed = JSON.parse(textOutput);
      console.log(" Parsed JSON:", parsed);
    } catch (err) {
      console.error(" JSON Parse Error:", textOutput);
    }
  } catch (err) {
    console.error(" Gemini API Error:", err.response?.data || err.message);
  }
}

testGemini();
