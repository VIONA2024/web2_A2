async function loadCategories(){
  const sel = document.getElementById('f-category');
  try{
    const cats = await apiGet('/categories');
    cats.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name;
      sel.appendChild(opt);
    });
  }catch(e){
    console.error(e);
  }
}

function clearForm(){
  document.getElementById('f-date').value='';
  document.getElementById('f-location').value='';
  document.getElementById('f-category').value='';
}

function renderEvents(list){
  const box = document.getElementById('search-results');
  if(!list.length){
    box.innerHTML = '<div class="alert">No matching events.</div>';
    return;
  }
  box.innerHTML = list.map(ev => {
    const pct = progressPct(ev.goal_amount, ev.progress_amount);
    return `<article class="card">
      <img src="${ev.image_url || 'https://picsum.photos/seed/ch/'+Math.floor(Math.random()*1000)+'/800/500'}">
      <div class="p">
        <strong>${ev.name}</strong>
        <div class="muted">${ev.category_name || ''} · ${ev.city || ev.location || ''}</div>
        <div class="muted">${fmtDate(ev.event_date)} ${fmtTime(ev.event_time||'')}</div>
        <div class="progress"><div style="width:${pct}%"></div></div>
        <div class="row" style="justify-content:space-between;margin-top:.4rem;">
          <span>${ev.ticket_price > 0 ? ('Ticket ' + money(ev.ticket_price)) : 'Free'}</span>
          <a class="btn" href="event.html?id=${ev.id}">Details</a>
        </div>
      </div>
    </article>`;
  }).join('');
}

async function performSearch(){
  const err = document.getElementById('search-error');
  err.innerHTML='';
  const date = document.getElementById('f-date').value;
  const location = document.getElementById('f-location').value.trim();
  const category_id = document.getElementById('f-category').value;
  const qs = new URLSearchParams();
  if(date) qs.set('date', date);
  if(location) qs.set('location', location);
  if(category_id) qs.set('category_id', category_id);
  try{
    const list = await apiGet('/events/search?' + qs.toString());
    renderEvents(list);
  }catch(e){
    console.error(e);
    err.innerHTML = '<div class="alert">Failed to search events.</div>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadCategories();
  document.getElementById('btn-search').addEventListener('click', performSearch);
  document.getElementById('btn-clear').addEventListener('click', () => {
    clearForm();
    document.getElementById('search-results').innerHTML='';
  });
});
