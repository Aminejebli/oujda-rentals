import { supabase } from "./supabase";

export type ProfileRow = {
  id: string; // auth.users.id (uuid)
  full_name: string;
  phone: string;
  avatar_url: string | null;
  role: "user" | "agency";
  created_at: string;
};

export async function getMyProfile(): Promise<ProfileRow | null> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw new Error(userError.message);
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, phone, avatar_url, role, created_at")
    .eq("id", user.id)
    .maybeSingle<ProfileRow>();

  if (error) throw new Error(error.message);
  return data ?? null;
}

export async function updateMyProfile(input: { full_name: string; phone: string; avatar_url?: string | null }) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw new Error(userError.message);
  if (!user) throw new Error("Not authenticated.");

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: input.full_name,
      phone: input.phone,
      avatar_url: input.avatar_url ?? null,
    })
    .eq("id", user.id);

  if (error) throw new Error(error.message);
}
