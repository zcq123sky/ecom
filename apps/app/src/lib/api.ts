const API_BASE = import.meta.env.VITE_SUPABASE_URL
  ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/api`
  : "http://127.0.0.1:54321/functions/v1/api";

export async function fetchByCategory(category: string) {
  const res = await fetch(`${API_BASE}/${category}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error || `Failed to fetch ${category}`);
  return json.data;
}
