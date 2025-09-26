import { useState } from "react";
import axios from "axios";
import top from "./assets/top.jpeg";
import bottom from "./assets/bottom.png";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please upload a PDF");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await axios.post(
        "https://pdf-backend-vf56.onrender.com/translate",
        formData,
        { responseType: "blob" }
      );

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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #f9fafb, #f3f4f6)",
        position: "relative", // needed for absolute positioning
        overflow: "hidden",
      }}
    >
      {/* Top Decoration (top-right corner) */}
      <img
        src={top}
        alt="Top Decoration"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "200px",
          height: "auto",
          objectFit: "contain",
          pointerEvents: "none", // so it doesn’t block clicks
        }}
      />

      {/* Main Card */}
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          padding: "2rem",
          width: "100%",
          maxWidth: "480px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 1, // ensure it stays above decorations
        }}
      >
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: "800",
            color: "#1f2937",
            marginBottom: "1rem",
          }}
        >
          PDF Translator
        </h1>
        <p
          style={{ fontSize: "0.9rem", color: "#4b5563", marginBottom: "1.5rem" }}
        >
          Translate your PDF files from{" "}
          <span style={{ fontWeight: "600" }}>English → Hindi</span>
        </p>

        {/* File input */}
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          style={{
            marginBottom: "1.5rem",
            fontSize: "0.9rem",
            color: "#374151",
            padding: "0.4rem",
          }}
        />

        {/* Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "12px",
            fontWeight: "600",
            fontSize: "1rem",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            transition: "all 0.2s ease",
            cursor: loading ? "not-allowed" : "pointer",
            background: loading ? "#9ca3af" : "#2563eb",
            color: "#fff",
            border: "none",
          }}
          onMouseOver={(e) => {
            if (!loading) e.currentTarget.style.background = "#1d4ed8";
          }}
          onMouseOut={(e) => {
            if (!loading) e.currentTarget.style.background = "#2563eb";
          }}
        >
          {loading ? "Translating..." : "Upload & Translate"}
        </button>
      </div>

      {/* Bottom Decoration (bottom-left corner) */}
      <img
        src={bottom}
        alt="Bottom Decoration"
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          width: "200px",
          height: "auto",
          objectFit: "contain",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default App;
