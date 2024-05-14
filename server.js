const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "YOUR_API_KEY",
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chatbot", async (req, res) => {
  const { prompt } = req.body;

  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: prompt,
    temperature: 0,
    max_tokens: 30,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  res.send(completion.choices[0].text);
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`);
});
