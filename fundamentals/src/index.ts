import { OpenAI } from "openai";
import { encoding_for_model } from "tiktoken";
import "dotenv/config.js";

// Create an instance of the OpenAI class
if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set");
}
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const main = async () => {
  // Define the prompt
  const prompt =
    "I need to start resistance training. Can you create a 7-day detailed workout plan for me to ease into it? Limit it in 100 words or less.";

  // send api request
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          'You respond with a greeting in the beginning. And you always respond in JSON format, like this: {"greeting": "greeting here", "plan": "plan here"}',
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 60,
    n: 2,
    frequency_penalty: 1.5,
    seed: 88888,
  });

  // Print the response
  // this will be role "assistant" in the response
  console.log(response.choices[0].message);
  console.log(response.choices[1].message);
};

const encodePrompt = (prompt: string) => {
  // create an encoder for the model
  const encoder = encoding_for_model("gpt-3.5-turbo");
  // encode the prompt
  const tokens = encoder.encode(prompt);
  console.log(tokens);
};

encodePrompt(
  "I need to start resistance training. Can you create a 7-day workout plan for me to ease into it? Limit it in 100 words or less."
);

main();
