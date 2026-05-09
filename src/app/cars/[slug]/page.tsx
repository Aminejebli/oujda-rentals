import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";

type CarDetailRedirectProps = {
  params: Promise<{ slug: string }>;
};

export default async function CarDetailRedirect({ params }: CarDetailRedirectProps) {
  const { slug } = await params;
  redirect(`/${defaultLocale}/cars/${slug}`);
}
