// app/[slug]/page.tsx
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Link from "@/models/Link";

export default async function Page({ params }: { params: { slug: string } }) {
  await connectDB();
  const link = await Link.findOne({ slug: params.slug });

  if (!link) return <h1>Link not found</h1>;

  link.clicks++;
  await link.save();

  redirect(link.original);
}
