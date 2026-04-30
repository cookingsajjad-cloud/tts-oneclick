const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const API_KEY = "YOUR_ELEVENLABS_API_KEY";
const VOICE_ID = "EXAVITQu4vr4xnSDxMaL";

app.post("/tts", async (req, res) => {
  try {
    const { text } = req.body;

    const response = await axios({
      method: "POST",
      url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      headers: {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json"
      },
      data: {
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8
        }
      },
      responseType: "arraybuffer"
    });

    res.set("Content-Type", "audio/mpeg");
    res.send(response.data);

  } catch (err) {
    res.status(500).send("Error generating voice");
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Server running"));
