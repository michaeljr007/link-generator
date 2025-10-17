import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Link from "@/models/Link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  await connectDB();

  const link = await Link.findOne({ slug });

  if (!link) {
    return <h1>Link not found</h1>;
  }

  link.clicks++;
  await link.save();

  redirect(link.original);
}
