import express from "express";
import geminiResponse from "../gemini.js";

const router = express.Router();

router.get("/test-gemini", async (req, res) => {
  const response = await geminiResponse("Hello, who are you?", "SujataAI", "Sujata");
  res.json({ response });
});

export default router;
