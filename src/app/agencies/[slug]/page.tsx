import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";

type AgencyRedirectProps = {
  params: { slug: string };
};

export default function AgencyRedirect({ params }: AgencyRedirectProps) {
  redirect(`/${defaultLocale}/agencies/${params.slug}`);
}
