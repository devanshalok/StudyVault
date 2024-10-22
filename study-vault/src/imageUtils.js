// imageUtils.js

import axios from 'axios';

const HUGGING_FACE_API_TOKEN = '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';

export const extractTextFromImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/microsoft/trocr-base-handwritten",
      formData,
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_TOKEN}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const extractedText = response.data;
    return extractedText;
  } catch (error) {
    console.error('Error extracting text from image:', error);
    return null;
  }
};
