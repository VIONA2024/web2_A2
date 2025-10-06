function fmtDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const dd = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${dd}`;
}

function fmtTime(timeStr) {
  if (!timeStr) return '';
  // Expecting HH:MM:SS
  const [hh, mm] = timeStr.split(':');
  return `${hh}:${mm}`;
}

function money(n, c='USD') {
  const val = Number(n||0);
  return new Intl.NumberFormat(undefined, {style:'currency', currency:c}).format(val);
}

function isPast(dateStr) {
  const today = new Date();
  today.setHours(0,0,0,0);
  const d = new Date(dateStr);
  d.setHours(0,0,0,0);
  return d.getTime() < today.getTime();
}

function progressPct(goal, progress) {
  const g = Number(goal||0);
  const p = Number(progress||0);
  if (g <= 0) return 0;
  return Math.min(100, Math.round((p/g)*100));
}
