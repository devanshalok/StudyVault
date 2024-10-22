const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const speech = require('@google-cloud/speech');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

const client = new speech.SpeechClient({
  keyFilename: 'coral-velocity-439206-b7-6d21b05ffffe.json',
});

// Endpoint to upload videos
app.post('/upload-video', upload.single('video'), async (req, res) => {
  const videoFilePath = req.file.path;
  const audioFilePath = `${videoFilePath}.wav`;

  // Extract audio from video using FFmpeg
  ffmpeg(videoFilePath)
    .output(audioFilePath)
    .noVideo()
    .audioCodec('pcm_s16le')
    .audioChannels(1)
    .audioFrequency(16000)
    .on('end', async () => {
      // Transcribe audio
      const file = fs.readFileSync(audioFilePath);
      const audioBytes = file.toString('base64');

      const audio = {
        content: audioBytes,
      };

      const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
        enableWordTimeOffsets: true,
      };

      const request = {
        audio: audio,
        config: config,
      };

      try {
        const [response] = await client.recognize(request);
        const transcription = response.results
          .map((result) => result.alternatives[0].transcript)
          .join('\n');

        const words = [];
        response.results.forEach((result) => {
          result.alternatives[0].words.forEach((wordInfo) => {
            words.push(wordInfo);
          });
        });
        console.log(words);


        // Clean up files
        fs.unlinkSync(videoFilePath);
        fs.unlinkSync(audioFilePath);

        res.json({ transcription, words });
      } catch (error) {
        console.error('Error transcribing audio:', error);
        res.status(500).json({ error: 'Error transcribing audio' });
      }
    })
    .on('error', (err) => {
      console.error('Error extracting audio:', err);
      res.status(500).json({ error: 'Error extracting audio' });
    })
    .run();
});

app.listen(4000, () => {
  console.log('Server started on port 4000');
});
