"use client";
import { useState } from "react";

export default function Home() {
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [url, setUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [original, setOriginal] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/shorten", {
      method: "POST",
      body: JSON.stringify({ url, phone, message, isWhatsApp }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setShortLink(data.shortUrl);
    setOriginal(data.original);
  };

  return (
    <main style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h1>Link Shortener</h1>

      <label style={{ display: "block", marginBottom: "1rem" }}>
        <input
          type="checkbox"
          checked={isWhatsApp}
          onChange={(e) => setIsWhatsApp(e.target.checked)}
        />{" "}
        Generate WhatsApp link
      </label>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        {!isWhatsApp && (
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a long URL"
            required
          />
        )}

        {isWhatsApp && (
          <>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="WhatsApp phone number"
              required
            />
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Default message"
              required
            />
          </>
        )}

        <button type="submit">Generate & Shorten</button>
      </form>

      {original && (
        <p style={{ marginTop: "1rem" }}>
          Original: <a href={original}>{original}</a>
        </p>
      )}
      {shortLink && (
        <p>
          Shortened: <a href={shortLink}>{shortLink}</a>
        </p>
      )}
    </main>
  );
}
