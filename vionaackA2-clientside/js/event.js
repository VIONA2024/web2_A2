async function initEvent(){
  const wrap = document.getElementById('event-wrap');
  const usp = new URLSearchParams(location.search);
  const id = usp.get('id');
  if(!id){
    wrap.innerHTML = '<div class="alert">Missing event id.</div>';
    return;
  }
  try{
    const ev = await apiGet('/events/' + id);
    const pct = progressPct(ev.goal_amount, ev.progress_amount);
    wrap.innerHTML = `
      <div class="row" style="gap:16px;align-items:flex-start;flex-wrap:wrap;">
        <img src="${ev.image_url || 'https://picsum.photos/seed/ch/'+Math.floor(Math.random()*1000)+'/800/500'}" style="width:360px;height:220px;object-fit:cover;border-radius:12px;">
        <div style="flex:1;min-width:260px;">
          <h2>${ev.name}</h2>
          <div class="muted">${ev.category_name || ''} · ${ev.organisation_name || ''}</div>
          <p class="muted">${fmtDate(ev.event_date)} ${fmtTime(ev.event_time||'')} · ${ev.location}, ${ev.city}</p>
          <p>${ev.full_description || ev.description || ''}</p>
          <p><strong>${ev.ticket_price > 0 ? ('Ticket ' + money(ev.ticket_price)) : 'Free event'}</strong></p>
          <div>
            <div class="row" style="justify-content:space-between">
              <span>Goal: ${money(ev.goal_amount)}</span>
              <span>Raised: ${money(ev.progress_amount)}</span>
            </div>
            <div class="progress" title="${pct}%">
              <div style="width:${pct}%"></div>
            </div>
          </div>
          <div style="margin-top:12px;">
            <button class="btn" id="btn-register">Register</button>
          </div>
        </div>
      </div>
    `;
    document.getElementById('btn-register').addEventListener('click', () => {
      alert('This feature is currently under construction.');
    });
  }catch(e){
    console.error(e);
    wrap.innerHTML = '<div class="alert">Failed to load event.</div>';
  }
}
document.addEventListener('DOMContentLoaded', initEvent);
