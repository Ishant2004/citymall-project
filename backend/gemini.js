const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateCaption = async (tags) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Funny caption for meme with tags: ${tags.join(', ')}`;
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (e) {
        return "HODL the vibes!";
    }
};

module.exports = { generateCaption };