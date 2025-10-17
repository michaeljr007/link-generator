"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, Phone, MessageCircle, Scissors } from "lucide-react";
import Navbar from "@/components/Navbar";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

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
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-dark-surface p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white dark:bg-dark-elevated rounded-2xl shadow-xl p-6"
        >
          <h1 className="text-2xl font-bold text-red-800 dark:text-white mb-6 flex items-center gap-2">
            <Scissors className="w-6 h-6" />
            Link Shortener
          </h1>

          <label className="flex items-center gap-2 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={isWhatsApp}
              onChange={(e) => setIsWhatsApp(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="text-gray-700 dark:text-gray-200 flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              Generate WhatsApp link
            </span>
          </label>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isWhatsApp ? (
                <motion.div
                  key="url-input"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Paste a long URL"
                      required
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="whatsapp-inputs"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <PhoneInput
                      country={"ng"}
                      value={phone}
                      onChange={(value) => setPhone(value)}
                      inputClass="!w-full !py-2 !pl-12 !pr-4 !text-gray-900 dark:!text-white !bg-gray-50 dark:!bg-gray-700 !border !border-gray-300 dark:!border-gray-600 !rounded-lg"
                      containerClass="!w-full"
                      buttonClass="!border-gray-300 dark:!border-gray-600 !bg-gray-100 dark:!bg-gray-800"
                    />
                  </div>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Default message"
                      required
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <Scissors className="w-5 h-5" />
              Generate & Shorten
            </motion.button>
          </form>

          <AnimatePresence>
            {original && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="mt-6 text-gray-700 dark:text-gray-200"
              >
                Original:{" "}
                <a
                  href={original}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                >
                  {original}
                </a>
              </motion.p>
            )}
            {shortLink && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="mt-2 text-gray-700 dark:text-gray-200"
              >
                Shortened:{" "}
                <a
                  href={shortLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                >
                  {shortLink}
                </a>
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </>
  );
}
