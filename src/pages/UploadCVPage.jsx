import * as pdfjsLib from "pdfjs-dist";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Gunakan worker dari CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function UploadCVPage() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
      const reader = new FileReader();
      reader.onload = async function () {
        try {
          const extractedText = await extractTextFromPDF(reader.result);
          setText(extractedText);
        } catch (error) {
          alert("Gagal membaca file PDF. Silakan coba file lain.");
          console.error("Error extracting text from PDF: ", error);
        }
      };
      reader.onerror = function () {
        alert("Terjadi kesalahan saat membaca file PDF.");
        console.error("FileReader error: ", reader.error);
      };
      reader.readAsArrayBuffer(uploadedFile);
    } else {
      alert("Hanya file PDF yang diizinkan.");
    }
  };
  
  const extractTextFromPDF = async (arrayBuffer) => {
    try {
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";
  
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item) => item.str);
        fullText += strings.join(" ");
      }
  
      fullText += `|PAGES=${pdf.numPages}`;
      return fullText;
    } catch (error) {
      console.error("Error extracting PDF content: ", error);
      throw new Error("Gagal mengextract teks dari file PDF.");
    }
  };
  

  const calculateScore = (text) => {
    let score = 0;

    if (text.toLowerCase().includes("profile")) score += 10;
    if (text.toLowerCase().includes("skill")) score += 10;

    const pageMatch = text.match(/\|PAGES=(\d+)/);
    if (pageMatch && parseInt(pageMatch[1]) > 2) score += 10;

    return score;
  };

  const handleScore = () => {
    const score = calculateScore(text);
    navigate("/result", { state: { score } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-2xl font-bold mb-2">Upload Your CV</h1>
      <p className="text-gray-500 mb-6 text-center">
        Upload your PDF CV and get a score instantly based on content structure.
      </p>

      <label
        htmlFor="cv-upload"
        className="border-2 border-dashed border-blue-400 p-16 rounded-lg cursor-pointer"
      >
        <div className="flex flex-col items-center">
          <img
            src="https://img.icons8.com/ios-filled/100/cloud-upload.png"
            alt="Upload"
            className="mb-4"
          />
          <p className="text-blue-500">
            {file ? `${file.name} uploaded ✔️` : "Click or drag to upload PDF"}
          </p>
        </div>
        <input
          id="cv-upload"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleUpload}
        />
      </label>

      {text && (
        <button
          onClick={handleScore}
          className="mt-8 bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition"
        >
          Get CV Score
        </button>
      )}

      <button
        onClick={() => window.history.back()}
        className="mt-4 text-blue-500 underline"
      >
        Back
      </button>
    </div>
  );
}
