import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const main = async () => {
  //Define the prompt
  const prompt = "How big os Singapore?";

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  console.log(response.choices[0].message.content);
};
