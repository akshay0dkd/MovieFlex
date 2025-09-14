// /api/ai.js
export default async function handler(req, res) {
  try {
    const { title, overview } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful AI that summarizes movies." },
          {
            role: "user",
            content: `Summarize this movie in 2-3 lines:\nTitle: ${title}\nOverview: ${overview}`,
          },
        ],
        max_tokens: 80,
      }),
    });

    const data = await response.json();
    const summary =
      data.choices?.[0]?.message?.content || "AI could not generate summary";

    res.status(200).json({ summary });
  } catch (error) {
    console.error("AI fetch error:", error);
    res.status(500).json({ error: "Failed to fetch AI summary" });
  }
}
