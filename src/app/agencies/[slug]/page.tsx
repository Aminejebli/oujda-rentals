import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";

type AgencyRedirectProps = {
  params: Promise<{ slug: string }>;
};

export default async function AgencyRedirect({ params }: AgencyRedirectProps) {
  const { slug } = await params;
  redirect(`/${defaultLocale}/agencies/${slug}`);
}
