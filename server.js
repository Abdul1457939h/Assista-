
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/ask', async (req, res) => {
  const { message } = req.body;
  console.log("📨 Incoming message:", message);

  try {
    const response = await fetch("https://logikon-benjamin-chat.hf.space/run/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [message] })
    });

    const data = await response.json();
    console.log("🤖 HF Space Reply:", data);

    const reply = data?.data?.[0] || "🤖 No response from AI.";
    res.json({ reply });

  } catch (err) {
    console.error("❌ HF Space fetch error:", err.message);
    res.status(500).json({ reply: "❌ Couldn't reach the public AI model." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});