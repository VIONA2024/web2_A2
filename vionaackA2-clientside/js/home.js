async function initHome(){
  const wrap = document.getElementById('home-events');
  const err = document.getElementById('home-error');
  try{
    const events = await apiGet('/events/upcoming');
    if(!events.length){
      wrap.innerHTML = '<div class="alert">No upcoming events found.</div>';
      return;
    }
    wrap.innerHTML = events.map(ev => {
      const past = isPast(ev.event_date);
      const badge = past ? '<span class="badge muted">Past</span>' : '<span class="badge">Upcoming</span>';
      const pct = progressPct(ev.goal_amount, ev.progress_amount);
      return `<article class="card">
        <img src="${ev.image_url || 'https://picsum.photos/seed/ch/'+Math.floor(Math.random()*1000)+'/800/500'}" alt="event image">
        <div class="p">
          <div class="row" style="justify-content:space-between;">
            <strong>${ev.name}</strong>${badge}
          </div>
          <div class="muted">${ev.category_name || ''} · ${ev.city || ev.location || ''}</div>
          <div class="muted">${fmtDate(ev.event_date)} ${fmtTime(ev.event_time||'')}</div>
          <div class="progress" title="${pct}% toward goal">
            <div style="width:${pct}%"></div>
          </div>
          <div class="row" style="justify-content:space-between;margin-top:.4rem;">
            <span>${ev.ticket_price > 0 ? ('Ticket ' + money(ev.ticket_price)) : 'Free'}</span>
            <a class="btn" href="event.html?id=${ev.id}">View</a>
          </div>
        </div>
      </article>`;
    }).join('');
  }catch(e){
    console.error(e);
    err.innerHTML = '<div class="alert">Failed to load events. Please try again later.</div>';
  }
}
document.addEventListener('DOMContentLoaded', initHome);
