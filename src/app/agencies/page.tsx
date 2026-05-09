import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";

export default function AgenciesRedirect() {
  redirect(`/${defaultLocale}/agencies`);
}
