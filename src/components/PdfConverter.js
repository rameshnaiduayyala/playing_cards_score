import React, { useState } from 'react';
import download from 'file-saver';
import './PdfConverter.css';
import { exec } from 'child_process';

const PdfConverter = () => {
  const [htmlContent, setHtmlContent] = useState('');

  const convertToHTML = async () => {
    try {
      const convertedHtml = await placeholderPdfToHtml();
      setHtmlContent(convertedHtml);
    } catch (error) {
      console.error('PDF to HTML conversion error:', error);
      setHtmlContent('<div>Error occurred during conversion</div>');
    }
  };

  const downloadHtml = () => {
    if (htmlContent) {
      const blob = new Blob([htmlContent], { type: 'text/html' });
      download.saveAs(blob, 'converted.html');
    }
  };

  const placeholderPdfToHtml = async () => {
    const pdfToHtmlCommand = 'pdf2htmlEX --embed-css 0 --zoom 1.3 input.pdf -';

    return new Promise((resolve, reject) => {
      exec(pdfToHtmlCommand, (error, stdout, stderr) => {
        if (error || stderr) {
          reject(error || stderr);
        } else {
          resolve(stdout);
        }
      });
    });
  };

  return (
    <div className="pdf-converter">
      <button onClick={convertToHTML}>Convert to HTML</button>
      <button onClick={downloadHtml} disabled={!htmlContent}>
        Download HTML
      </button>
      <div className="html-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default PdfConverter;
