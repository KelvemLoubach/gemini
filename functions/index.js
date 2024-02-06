const { onRequest } = require("firebase-functions/v2/https");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

exports.bardFunction = onRequest(async (req, res) => {

  try {

    const apiKey = req.headers.authorization

    if (apiKey == process.env.MY_APIKEY) {

      const prompt = req.query.text

      const genAI = new GoogleGenerativeAI(process.env.API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = result.response;
      const textBard = response.text();

      res.json(textBard);

    } else {
      res.status(403).send("Não autorizado, R$ 10,00/mês para usar - PIX: 28999491937")
    }
  } catch (error) {
    console.error("Erro:", error);
    console.error("Stack trace:", error.stack);
    res.status(500).send("Erro interno do servidor");
  }
});