// Minimal API client
async function apiGet(path) {
  const r = await fetch(`${API_BASE}${path}`);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const data = await r.json();
  if (!data.success) throw new Error(data.message || 'API error');
  return data.data;
}
