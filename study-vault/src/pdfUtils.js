// pdfUtils.js

import * as pdfjsLib from 'pdfjs-dist';

// Set the workerSrc property to point to the worker script in the public directory
pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

export const extractTextFromPDF = async (file) => {
  const typedArray = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjsLib.getDocument(typedArray).promise;
  let fullText = '';

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item) => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
};

export const searchPDFs = async (files, query) => {
  const results = [];

  for (const file of files) {
    if (file.type === 'application/pdf' && file.extractedText) {
      const lines = file.extractedText.split('\n');
      const matchedLines = [];

      lines.forEach((line, index) => {
        if (line.toLowerCase().includes(query.toLowerCase())) {
          matchedLines.push({
            lineNumber: index + 1, // Line numbers start at 1
            text: line.trim(),
          });
        }
      });

      if (matchedLines.length > 0) {
        results.push({
          fileName: file.name,
          matches: matchedLines,
        });
      }
    }
  }

  return results;
};
