import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please upload a PDF");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/translate", formData, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "translated.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert("Translation failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">PDF Translator (English → Hindi)</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        {loading ? "Translating..." : "Upload & Translate"}
      </button>
    </div>
  );
}

export default App;