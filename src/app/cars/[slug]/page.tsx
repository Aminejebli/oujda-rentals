import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";

type CarDetailRedirectProps = {
  params: { slug: string };
};

export default function CarDetailRedirect({ params }: CarDetailRedirectProps) {
  redirect(`/${defaultLocale}/cars/${params.slug}`);
}
