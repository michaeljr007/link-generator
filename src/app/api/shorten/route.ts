// app/api/shorten/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Link from "@/models/Link";

function generateSlug() {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

export async function POST(req: Request) {
  const { url, phone, message, isWhatsApp } = await req.json();
  await connectDB();

  let targetUrl = url;

  // WhatsApp mode
  if (isWhatsApp && phone && message) {
    const cleanedPhone = phone.replace(/[^\d+]/g, ""); // keep "+" if it's the first character
    const normalizedPhone = cleanedPhone.startsWith("+")
      ? cleanedPhone.slice(1) // remove the "+"
      : cleanedPhone; // already numeric
    const encodedMsg = encodeURIComponent(message);
    targetUrl = `https://wa.me/${normalizedPhone}?text=${encodedMsg}`;
  }

  if (!targetUrl) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  const slug = generateSlug();
  const newLink = await Link.create({ slug, original: targetUrl });

  return NextResponse.json({
    shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${newLink.slug}`,
    original: targetUrl,
  });
}
