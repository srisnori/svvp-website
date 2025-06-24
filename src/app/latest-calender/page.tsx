'use client';

import React, { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import './latestCalender.css';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const calendarFiles = [
  'Jan-2025.pdf', 'February-2025.pdf', 'March-2025.pdf', 'May-2025.pdf', 
  'June-2025.pdf', 'July-2025.pdf', 'August-2025.pdf', 'September-2025.pdf',
  'October-2025.pdf', 'November-2025.pdf', 'December-2025.pdf'
];

const monthMap = [
  'Jan', 'February', 'March', 'May', 'June', 'July', 'August', 
  'September', 'October', 'November', 'December'
];


export default function CalendarViewer() {
  const currentMonth = monthMap[new Date().getMonth()];
  const initialFile = calendarFiles.find(file => file.toLowerCase().startsWith(currentMonth.toLowerCase())) || calendarFiles[0];
  const [selectedFile, setSelectedFile] = useState(initialFile);

  return (
    <div className="calendar-container">
      <select value={selectedFile} onChange={(e) => setSelectedFile(e.target.value)}>
        {calendarFiles.map(file => (
          <option key={file} value={file}>{file.replace('.pdf', '')}</option>
        ))}
      </select>

      <div className="pdf-wrapper">
        <Document file={`/pdfs/${selectedFile}`}><Page pageNumber={1}/></Document>
      </div>

    </div>
  );
}