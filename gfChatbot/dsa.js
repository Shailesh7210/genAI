import { GoogleGenAI } from "@google/genai";
import readline from "readline";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBtQPCjQsBBBWiJ_g"
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function askQuestion() {
  rl.question("Ask your question: ", async (userInput) => {
    if (userInput.toLowerCase() === "exit") {
      console.log("Chat ended.");
      rl.close();
      return;
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userInput,
        config: {
          systemInstruction: `
You are a Data Structures and Algorithms instructor.

Rules:
1. Only answer DSA-related questions.
2. Explain in simple terms.
3. If question is unrelated, reply:
"Please ask DSA-related questions only."
`
        }
      });

      console.log("\nAI:", response.text);
      console.log("--------------------------------");

      askQuestion(); // keep asking again
    } catch (error) {
      console.error("Error:", error.message);
      askQuestion();
    }
  });
}

askQuestion();
