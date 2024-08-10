import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
const API_KEY = "AIzaSyCPxqAAWnUrKJGCJ07bGoye8ZUd-zNQnVo";
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run() {
  const prompt = "Write a story about an AI and magic";
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
