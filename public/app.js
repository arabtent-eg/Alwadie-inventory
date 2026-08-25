/* ============ ICONS ============ */
const ICONS = {
  home:'M3 11.2 12 4l9 7.2M5.5 9.8V20h5v-6.2h3V20h5V9.8',
  box:'M3 7.5 12 3l9 4.5-9 4.5-9-4.5Zm0 0v9L12 21m0-8.5V21m9-13.5v9L12 21',
  list:'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  chart:'M4 20V11M10 20V4M16 20v-7M3 20h18',
  refresh:'M4 4v6h6M20 20v-6h-6M5.6 15a8 8 0 0 0 13.9-5.3M18.4 9A8 8 0 0 0 4.5 14.3',
  search:'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM21 21l-4.35-4.35',
  plus:'M12 5v14M5 12h14',
  minus:'M5 12h14',
  alert:'M12 3 2 20h20L12 3Zm0 6v5m0 4h.01',
  check:'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-4-9 3 3 5-6',
  x:'M6 6l12 12M18 6 6 18',
  chevdown:'M6 9l6 6 6-6',
  download:'M12 3v12m-5-5 5 5 5-5M5 21h14',
  edit:'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4.5 1 1-4.5L16.5 3.5Z',
  tent:'M4 20 12 4l8 16M8.3 20 12 11l3.7 9M12 4v3',
  sync2:'M17 2.1 21 6l-4 3.9M3 12a9 9 0 0 1 15-6.7L21 6M7 21.9 3 18l4-3.9M21 12a9 9 0 0 1-15 6.7L3 18',
  clock:'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5l3.5 2',
  arrowup:'M12 19V5m-6 6 6-6 6 6',
  arrowdown:'M12 5v14m6-6-6 6-6-6',
  receipt:'M6 2.5h12v19l-3-2-3 2-3-2-3 2v-19Z M9 7.5h6M9 11h6M9 14.5h3.5',
  trash:'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6',
  eye:'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Zm10 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z',
  lock:'M6 11V8a6 6 0 1 1 12 0v3M5 11h14v10H5V11Zm7 5v2',
  users:'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 9c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a3 3 0 1 0 0-6M21 20c0-2.8-2-5.1-4.6-5.8',
  logout:'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
  storeline:'M3 9.5 4.5 4h15L21 9.5M4 9.5V20h16V9.5M4 9.5h16M10 20v-6h4v6',
};
function icon(name, size=18){
  const d = ICONS[name] || ICONS.box;
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${
    d.split('M').filter(Boolean).map(seg=>`<path d="M${seg}"/>`).join('')
  }</svg>`;
}
function catColor(rank){ return ['var(--c1)','var(--c2)','var(--c3)','var(--c4)','var(--c5)','var(--c6)','var(--c7)','var(--c8)'][rank] || 'var(--c8)'; }
function fmtNum(n){ if(n===null||n===undefined) return '—'; return Number(n).toLocaleString('en-US'); }
function fmtDate(iso){ if(!iso) return '—'; const d=new Date(iso); return d.toLocaleString('ar-SA',{dateStyle:'medium',timeStyle:'short'}); }
function escAttr(s){ return String(s??'').replace(/"/g,'&quot;'); }
function escHtml(s){ return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* ============ API ============ */
async function api(path, opts={}){
  const res = await fetch(path, {
    credentials:'same-origin',
    headers: opts.body ? {'Content-Type':'application/json'} : {},
    ...opts,
  });
  if(res.status===401){ me=null; renderLogin(); throw {status:401}; }
  let body = null;
  try{ body = await res.json(); }catch(e){}
  if(!res.ok){ const err = body || {}; err.status = res.status; throw err; }
  return body;
}

/* ============ STATE ============ */
let me = null;
let products = [], movements = [], sales = [], summary = {}, categories = [], topProducts = [], lowStock = [], storeSales = null, users = [];
let ui = { tab:'dashboard', search:'', catFilter:'', stockFilter:'', modal:null };

function todayStr(){ return new Date().toISOString().slice(0,10); }

/* ============ BOOT ============ */
async function boot(){
  try{
    me = await api('/api/auth/me');
    await loadAll();
    renderShell();
  }catch(e){
    renderLogin();
  }
}
async function loadAll(){
  const calls = [
    api('/api/products').then(d=>products=d),
    api('/api/movements').then(d=>movements=d),
    api('/api/sales').then(d=>sales=d),
    api('/api/reports/summary').then(d=>summary=d),
    api('/api/reports/categories').then(d=>categories=d),
    api('/api/reports/top-products').then(d=>topProducts=d),
    api('/api/reports/low-stock').then(d=>lowStock=d),
    api('/api/reports/store-sales').then(d=>storeSales=d),
  ];
  if(me.role==='manager') calls.push(api('/api/users').then(d=>users=d));
  await Promise.all(calls);
}
async function refreshAndRender(){ await loadAll(); renderShell(); }

/* ============ LOGIN ============ */
function renderLogin(){
  const appEl = document.getElementById('app');
  appEl.className = '';
  appEl.innerHTML = `
  <div class="login-shell">
    <div class="glass login-card">
      <div class="login-mark">${icon('tent',26)}</div>
      <h1>مخزون وادي الخيام</h1>
      <div class="sub">سجّل دخولك للوصول إلى نظام إدارة المخزون</div>
      <div class="login-err" id="login-err"></div>
      <form id="login-form">
        <div class="field"><label>اسم المستخدم</label><input id="login-username" autocomplete="username" required /></div>
        <div class="field"><label>كلمة المرور</label><input id="login-password" type="password" autocomplete="current-password" required /></div>
        <button class="btn btn-accent" type="submit">${icon('lock',15)} تسجيل الدخول</button>
      </form>
    </div>
  </div>`;
  document.getElementById('login-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const errEl = document.getElementById('login-err');
    errEl.classList.remove('show');
    try{
      me = await api('/api/auth/login', {method:'POST', body: JSON.stringify({username, password})});
      await loadAll();
      renderShell();
    }catch(err){
      errEl.textContent = 'اسم المستخدم أو كلمة المرور غير صحيحة';
      errEl.classList.add('show');
    }
  });
}

/* ============ NAV / SHELL ============ */
function navItems(){
  const items = [
    {key:'dashboard', label:'لوحة المعلومات', icon:'home'},
    {key:'stock', label:'المخزون', icon:'box'},
    {key:'sales', label:'المبيعات', icon:'receipt'},
    {key:'movements', label:'سجل الحركات', icon:'list'},
    {key:'store', label:'أداء المتجر', icon:'storeline'},
    {key:'reports', label:'التقارير', icon:'chart'},
    {key:'sync', label:'المزامنة', icon:'sync2'},
  ];
  if(me.role==='manager') items.push({key:'settings', label:'الإعدادات', icon:'users'});
  return items;
}
const TAB_TITLES = {dashboard:'لوحة المعلومات', stock:'المخزون', sales:'المبيعات', movements:'سجل الحركات', store:'أداء المتجر على سلة', reports:'التقارير والإحصائيات', sync:'مزامنة سلة', settings:'الإعدادات'};
const ROLE_LABEL = {manager:'مدير', accountant:'محاسب', user:'مستخدم'};
function canWrite(){ return me.role==='manager' || me.role==='accountant'; }

function renderShellHTML(){
  const navHtml = navItems().map(n=>`
    <button class="nav-item ${ui.tab===n.key?'active':''}" data-nav="${n.key}">${icon(n.icon,19)}<span>${n.label}</span></button>`).join('');
  const unsynced = movements.filter(m=>!m.synced).length;
  return `
  <div class="sidebar glass">
    <div class="brand">
      <div class="brand-mark">${icon('tent',20)}</div>
      <div><div class="brand-name">مؤسسة وادي الخيام</div><div class="brand-sub">إدارة مخزون المستودع</div></div>
    </div>
    <div class="nav">${navHtml}</div>
    <div class="nav-foot">
      <div class="role-chip"><span class="dot"></span>${escHtml(me.display_name)} · ${ROLE_LABEL[me.role]}</div>
      <div class="role-chip">${icon('sync2',13)} ${unsynced>0? unsynced+' حركة بانتظار المزامنة' : 'كل الحركات متزامنة'}</div>
      <button class="btn btn-sm btn-ghost" id="logout-btn" style="justify-content:flex-start;">${icon('logout',14)} تسجيل الخروج</button>
    </div>
  </div>
  <div class="main">
    <div class="topbar glass">
      <h1>${TAB_TITLES[ui.tab]}</h1>
      <div class="topbar-actions">
        <div class="search-box">${icon('search',15)}<input id="global-search" placeholder="ابحث عن صنف بالاسم…" value="${escAttr(ui.search)}" /></div>
        <button class="btn btn-accent" id="open-move" ${canWrite()?'':'disabled'}>${icon('plus',16)} تسجيل حركة</button>
      </div>
    </div>
    <div id="view">${renderView()}</div>
    <div class="footer-note">مؤسسة وادي الخيام — نظام داخلي لإدارة مخزون المستودع · مزامَن تلقائياً مع سلة</div>
  </div>`;
}
function renderShell(){
  const appEl = document.getElementById('app');
  appEl.className = 'shell';
  appEl.innerHTML = renderShellHTML();
  renderOverlay();
  bindOnce();
  wireTopbar();
}
function wireTopbar(){
  const s = document.getElementById('global-search');
  if(s) s.addEventListener('input', e=>{ ui.search = e.target.value; updateView(); });
  const lo = document.getElementById('logout-btn');
  if(lo) lo.addEventListener('click', async ()=>{ await api('/api/auth/logout', {method:'POST'}); me=null; renderLogin(); });
}
function updateView(){ const v=document.getElementById('view'); if(v) v.innerHTML = renderView(); }

function renderView(){
  if(ui.tab==='dashboard') return viewDashboard();
  if(ui.tab==='stock') return viewStock();
  if(ui.tab==='sales') return viewSales();
  if(ui.tab==='movements') return viewMovements();
  if(ui.tab==='store') return viewStore();
  if(ui.tab==='reports') return viewReports();
  if(ui.tab==='sync') return viewSync();
  if(ui.tab==='settings') return viewSettings();
  return '';
}
function emptyState(ic,title,sub){ return `<div class="empty">${icon(ic,34)}<div class="empty-title">${title}</div><div class="empty-sub">${sub}</div></div>`; }

/* ============ DASHBOARD ============ */
function viewDashboard(){
  const invPct = summary.total_products? Math.round(summary.inventoried/summary.total_products*100):0;
  const kpis = `
  <div class="grid kpis">
    <div class="glass kpi"><div class="kpi-icon">${icon('box',18)}</div><div class="kpi-val">${fmtNum(summary.total_products)}</div><div class="kpi-label">إجمالي الأصناف</div></div>
    <div class="glass kpi"><div class="kpi-icon">${icon('check',18)}</div><div class="kpi-val">${fmtNum(summary.total_qty)}</div><div class="kpi-label">إجمالي الكمية بالمستودع</div></div>
    <div class="glass kpi"><div class="kpi-icon">${icon('list',18)}</div><div class="kpi-val">${fmtNum(summary.today_moves)}</div><div class="kpi-label">حركات اليوم</div></div>
    <div class="glass kpi"><div class="kpi-icon" style="${summary.low_stock?'background:var(--crit-soft);color:var(--crit)':''}">${icon('alert',18)}</div><div class="kpi-val">${fmtNum(summary.low_stock)}</div><div class="kpi-label">تنبيهات نقص مخزون</div></div>
    <div class="glass kpi"><div class="kpi-icon">${icon('sync2',18)}</div><div class="kpi-val" style="font-size:15px;">${summary.last_sync_at? fmtDate(summary.last_sync_at): 'لم تتم بعد'}</div><div class="kpi-label">آخر مزامنة مع سلة</div></div>
  </div>`;
  const onboarding = summary.inventoried < summary.total_products ? `
  <div class="glass banner" style="margin-top:16px;">
    <div class="banner-icon">${icon('edit',20)}</div>
    <div style="flex:1;">
      <div class="banner-title">أكمل الجرد الافتتاحي للمخزون</div>
      <div class="banner-sub">تم جرد ${summary.inventoried} من أصل ${summary.total_products} صنفاً (${invPct}%) — أدخل الكمية الحالية من شاشة «المخزون».</div>
      <div style="display:flex;align-items:center;gap:10px;margin-top:10px;">
        <div class="progress-wrap"><div class="progress-bar" style="width:${invPct}%"></div></div>
        <button class="btn btn-sm" data-nav="stock">فتح شاشة المخزون</button>
      </div>
    </div>
  </div>` : '';
  const donut = donutChart(categories);
  const area = areaChart(movements.length? null : null);
  const barChart = topProducts.length? topProducts.map((p,i)=>`
    <div class="bar-row"><div class="bar-label">${escHtml(p.name)}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${topProducts[0].qty? (p.qty/topProducts[0].qty*100):0}%;background:${catColor(i%8)}"></div></div>
      <div class="bar-val">${fmtNum(p.qty)}</div></div>`).join('') : emptyState('list','لا توجد حركات مسجلة بعد','ستظهر هنا أكثر المنتجات حركة فور تسجيل أول عملية وارد أو صادر.');
  const lowHtml = lowStock.length? `<table><thead><tr><th>الصنف</th><th>الفئة</th><th class="num">المتبقي</th><th class="num">الحد الأدنى</th></tr></thead><tbody>
    ${lowStock.slice(0,6).map(p=>`<tr><td class="prod-name">${escHtml(p.name)}</td><td class="muted">${escHtml(p.category)}</td><td class="num" style="color:${p.stock<=0?'var(--crit)':'var(--warn)'};font-weight:700;">${fmtNum(p.stock)}</td><td class="num muted">${fmtNum(p.threshold)}</td></tr>`).join('')}
    </tbody></table>` : emptyState('check','لا توجد أصناف منخفضة المخزون','كل الأصناف التي تم جردها أعلى من الحد الأدنى المسموح به حالياً.');
  return `${kpis}${onboarding}
  <div class="grid row2" style="margin-top:16px;">
    <div class="glass card"><div class="card-head"><div class="card-title">حركة المخزون (وارد مقابل صادر) — آخر 14 يوماً</div></div>${area}</div>
    <div class="glass card"><div class="card-head"><div><div class="card-title">توزيع الأصناف حسب الفئة</div><div class="card-sub">عدد المنتجات في كل فئة</div></div></div>${donut}</div>
  </div>
  <div class="grid row2" style="margin-top:16px;">
    <div class="glass card"><div class="card-head"><div class="card-title">تنبيهات نقص المخزون</div><button class="btn btn-sm btn-ghost" data-nav="stock">عرض الكل</button></div>${lowHtml}</div>
    <div class="glass card"><div class="card-head"><div class="card-title">الأكثر حركة</div><button class="btn btn-sm btn-ghost" data-nav="movements">عرض السجل</button></div>${barChart}</div>
  </div>`;
}

/* ============ STOCK ============ */
function stockStatus(p){
  if(p.stock===null||p.stock===undefined) return {key:'none',label:'بدون جرد',cls:'pill-muted'};
  if(p.stock<=0) return {key:'out',label:'نفذ',cls:'pill-crit'};
  if(p.stock<=p.threshold) return {key:'low',label:'منخفض',cls:'pill-warn'};
  return {key:'ok',label:'متوفر',cls:'pill-good'};
}
function filteredProducts(){
  let list = products;
  const q = ui.search.trim().toLowerCase();
  if(q) list = list.filter(p=>p.name.toLowerCase().includes(q) || (p.sku||'').toLowerCase().includes(q) || p.id.includes(q));
  if(ui.catFilter) list = list.filter(p=>p.category===ui.catFilter);
  if(ui.stockFilter==='none') list = list.filter(p=>p.stock===null);
  if(ui.stockFilter==='low') list = list.filter(p=>p.stock!==null && p.stock<=p.threshold);
  if(ui.stockFilter==='out') list = list.filter(p=>p.stock!==null && p.stock<=0);
  if(ui.stockFilter==='ok') list = list.filter(p=>p.stock!==null && p.stock>p.threshold);
  return list;
}
function viewStock(){
  const cats = [...new Set(products.map(p=>p.category))];
  return `
  <div class="glass card">
    <div class="controls-row">
      <select class="filter" id="cat-filter"><option value="">كل الفئات</option>${cats.map(c=>`<option value="${escAttr(c)}" ${ui.catFilter===c?'selected':''}>${escHtml(c)}</option>`).join('')}</select>
      <select class="filter" id="stock-filter">
        <option value="">كل حالات المخزون</option>
        <option value="none" ${ui.stockFilter==='none'?'selected':''}>بدون جرد</option>
        <option value="ok" ${ui.stockFilter==='ok'?'selected':''}>متوفر</option>
        <option value="low" ${ui.stockFilter==='low'?'selected':''}>منخفض</option>
        <option value="out" ${ui.stockFilter==='out'?'selected':''}>نافذ</option>
      </select>
      <span class="muted" style="font-size:12px;">${filteredProducts().length} من ${products.length} صنفاً</span>
      <span style="flex:1;"></span>
      <button class="btn btn-sm" id="export-stock-csv">${icon('download',14)} تصدير CSV</button>
      <button class="btn btn-sm btn-accent" id="open-add-product" ${canWrite()?'':'disabled'}>${icon('plus',14)} إضافة صنف غير مدرج</button>
    </div>
    <div id="stock-results">${renderStockRows()}</div>
  </div>`;
}
function renderStockRows(){
  const list = filteredProducts();
  if(!list.length) return emptyState('search','لا توجد نتائج','جرّب تعديل كلمة البحث أو الفلاتر المستخدمة.');
  return `<div style="overflow-x:auto;"><table><thead><tr>
    <th>الصنف</th><th>الفئة</th><th class="num">السعر</th><th class="num">الكمية بالمستودع</th><th>الحالة</th><th></th>
  </tr></thead><tbody>
  ${list.map(p=>{
    const st = stockStatus(p);
    return `<tr>
      <td><div class="prod-cell">
        <div class="cat-icon" style="background:color-mix(in srgb, ${catColor(p.cat_rank)} 18%, transparent);color:${catColor(p.cat_rank)};">${icon(p.icon,15)}</div>
        <div><div class="prod-name">${escHtml(p.name)}</div><div class="prod-meta">#${p.id}</div></div>
      </div></td>
      <td class="muted">${escHtml(p.category)}</td>
      <td class="num">${fmtNum(p.price)} SAR</td>
      <td class="num" style="font-weight:700;">${fmtNum(p.stock)}</td>
      <td><span class="pill ${st.cls}">${icon(st.key==='ok'?'check':st.key==='none'?'edit':'alert',11)} ${st.label}</span></td>
      <td><button class="btn btn-sm btn-ghost" data-quick-move="${p.id}" ${canWrite()?'':'disabled'}>${icon('edit',13)} حركة</button></td>
    </tr>`;
  }).join('')}
  </tbody></table></div>`;
}
function updateStockResults(){ const el=document.getElementById('stock-results'); if(el) el.innerHTML = renderStockRows(); }

/* ============ SALES ============ */
function nextInvoiceNo(){ return 'INV-' + String(sales.length+1).padStart(4,'0'); }
function viewSales(){
  const today = todayStr();
  const todaySales = sales.filter(s=>(s.ts||'').slice(0,10)===today);
  const todayTotal = todaySales.reduce((s,v)=>s+Number(v.total),0);
  const totalAll = sales.reduce((s,v)=>s+Number(v.total),0);
  return `
  <div class="grid row-eq" style="grid-template-columns:repeat(3,1fr);">
    <div class="glass kpi"><div class="kpi-icon">${icon('receipt',18)}</div><div class="kpi-val">${fmtNum(sales.length)}</div><div class="kpi-label">إجمالي عدد الفواتير</div></div>
    <div class="glass kpi"><div class="kpi-icon" style="background:var(--good-soft);color:var(--good);">${icon('check',18)}</div><div class="kpi-val">${fmtNum(totalAll)} SAR</div><div class="kpi-label">إجمالي قيمة المبيعات</div></div>
    <div class="glass kpi"><div class="kpi-icon">${icon('arrowup',18)}</div><div class="kpi-val">${fmtNum(todayTotal)} SAR</div><div class="kpi-label">مبيعات اليوم (${todaySales.length} فاتورة)</div></div>
  </div>
  <div class="glass card" style="margin-top:16px;">
    <div class="controls-row">
      <span class="muted" style="font-size:12px;">فواتير البيع اللي بتسحب مباشرة من مخزون المستودع</span>
      <span style="flex:1;"></span>
      <button class="btn btn-sm btn-accent" id="open-sale" ${canWrite()?'':'disabled'}>${icon('plus',14)} فاتورة بيع جديدة</button>
    </div>
    ${sales.length? `<div style="overflow-x:auto;"><table><thead><tr>
      <th>رقم الفاتورة</th><th>التاريخ</th><th>العميل</th><th class="num">عدد الأصناف</th><th class="num">الإجمالي</th><th>الحالة</th><th></th>
    </tr></thead><tbody>
    ${sales.map(s=>`<tr>
        <td class="prod-name">${escHtml(s.invoice_no)}</td>
        <td class="muted" style="white-space:nowrap;">${fmtDate(s.ts)}</td>
        <td class="muted">${escHtml(s.customer||'—')}</td>
        <td class="num">${s.item_count}</td>
        <td class="num" style="font-weight:700;">${fmtNum(s.total)} SAR</td>
        <td>${s.synced? `<span class="pill pill-good">${icon('check',11)} متزامن</span>` : `<span class="pill pill-muted">${icon('clock',11)} بالانتظار</span>`}</td>
        <td><button class="btn btn-sm btn-ghost" data-view-sale="${s.id}">${icon('eye',13)} التفاصيل</button></td>
      </tr>`).join('')}
    </tbody></table></div>` : emptyState('receipt','لا توجد فواتير بيع بعد','استخدم زر «فاتورة بيع جديدة» لتسجيل أول عملية بيع تُسحب من مخزون المستودع مباشرة.')}
  </div>`;
}

/* ============ MOVEMENTS ============ */
function viewMovements(){
  const list = movements;
  return `
  <div class="glass card">
    <div class="controls-row"><span class="muted" style="font-size:12px;">${list.length} حركة مسجلة (آخر 500)</span></div>
    ${list.length? `<div style="overflow-x:auto;"><table><thead><tr>
      <th>التاريخ</th><th>الصنف</th><th>النوع</th><th class="num">الكمية</th><th>ملاحظة</th><th>الحالة</th>
    </tr></thead><tbody>
    ${list.map(m=>{
      const typeInfo = m.type==='in'? {l:'وارد للمستودع',c:'pill-good',i:'arrowdown'} : m.type==='out'? {l:'صادر من المستودع',c:'pill-crit',i:'arrowup'} : {l:'تعديل جرد',c:'pill-muted',i:'edit'};
      return `<tr>
        <td class="muted" style="white-space:nowrap;">${fmtDate(m.ts)}</td>
        <td class="prod-name">${escHtml(m.product_name)}</td>
        <td><span class="pill ${typeInfo.c}">${icon(typeInfo.i,11)} ${typeInfo.l}</span></td>
        <td class="num" style="font-weight:700;">${fmtNum(m.qty)}</td>
        <td class="muted">${escHtml(m.note||'—')}</td>
        <td>${m.synced? `<span class="pill pill-good">${icon('check',11)} متزامن</span>` : m.sync_error? `<span class="pill pill-crit">${icon('alert',11)} فشل</span>` : `<span class="pill pill-muted">${icon('clock',11)} بالانتظار</span>`}</td>
      </tr>`;
    }).join('')}
    </tbody></table></div>` : emptyState('list','لا توجد حركات مسجلة بعد','استخدم زر «تسجيل حركة» أعلى الصفحة.')}
  </div>`;
}

/* ============ REPORTS ============ */
function viewReports(){
  const inCount = movements.filter(m=>m.type==='in').reduce((s,m)=>s+Number(m.qty),0);
  const outCount = movements.filter(m=>m.type==='out').reduce((s,m)=>s+Number(m.qty),0);
  return `
  <div class="grid kpis" style="grid-template-columns:repeat(3,1fr);">
    <div class="glass kpi"><div class="kpi-icon" style="background:var(--good-soft);color:var(--good);">${icon('arrowdown',18)}</div><div class="kpi-val">${fmtNum(inCount)}</div><div class="kpi-label">إجمالي الوارد للمستودع</div></div>
    <div class="glass kpi"><div class="kpi-icon" style="background:var(--crit-soft);color:var(--crit);">${icon('arrowup',18)}</div><div class="kpi-val">${fmtNum(outCount)}</div><div class="kpi-label">إجمالي الصادر من المستودع</div></div>
    <div class="glass kpi"><div class="kpi-icon">${icon('list',18)}</div><div class="kpi-val">${fmtNum(movements.length)}</div><div class="kpi-label">إجمالي عدد الحركات</div></div>
  </div>
  <div class="grid row2" style="margin-top:16px;">
    <div class="glass card"><div class="card-head"><div class="card-title">حركة المخزون خلال آخر 14 يوماً</div></div>${areaChart()}</div>
    <div class="glass card"><div class="card-head"><div class="card-title">توزيع الأصناف حسب الفئة</div></div>${donutChart(categories)}</div>
  </div>
  <div class="grid row-eq" style="margin-top:16px;">
    <div class="glass card"><div class="card-head"><div class="card-title">الأكثر حركة</div></div>
      ${topProducts.length? topProducts.map((p,i)=>`<div class="bar-row"><div class="bar-label">${escHtml(p.name)}</div><div class="bar-track"><div class="bar-fill" style="width:${topProducts[0].qty?(p.qty/topProducts[0].qty*100):0}%;background:${catColor(i%8)}"></div></div><div class="bar-val">${fmtNum(p.qty)}</div></div>`).join('') : emptyState('list','لا توجد بيانات بعد','ستظهر هنا الأصناف الأكثر حركة.')}
    </div>
    <div class="glass card"><div class="card-head"><div class="card-title">أصناف بحاجة لإعادة تعبئة</div></div>
      ${lowStock.length? `<table><thead><tr><th>الصنف</th><th class="num">المتبقي</th></tr></thead><tbody>${lowStock.slice(0,8).map(p=>`<tr><td class="prod-name">${escHtml(p.name)}</td><td class="num" style="color:${p.stock<=0?'var(--crit)':'var(--warn)'};font-weight:700;">${fmtNum(p.stock)}</td></tr>`).join('')}</tbody></table>` : emptyState('check','لا شيء يحتاج انتباهك الآن','جميع الأصناف المجرودة ضمن الحدود الآمنة.')}
    </div>
  </div>`;
}

/* ============ STORE PERFORMANCE (real Salla data) ============ */
function viewStore(){
  const data = storeSales && storeSales.data;
  if(!data){
    return `<div class="glass card">${emptyState('storeline','بيانات أداء المتجر لسه ما وصلتش','بتتحدث هذه الشاشة تلقائياً كل ساعة من بيانات مبيعات متجركم الحقيقية على سلة عبر مهمة المزامنة. لو فاضية لفترة طويلة، تواصل معايا وأنا أراجعها.')}</div>`;
  }
  const days = data.daily || [];
  const maxTotal = Math.max(1, ...days.map(d=>d.total));
  const totalRevenue = days.reduce((s,d)=>s+d.total,0);
  const totalOrders = days.reduce((s,d)=>s+(d.orders_count||0),0);
  const bars = days.map(d=>`
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;flex:1;">
      <div style="font-size:10.5px;color:var(--ink-3);font-variant-numeric:tabular-nums;">${fmtNum(d.total)}</div>
      <div style="width:100%;height:120px;display:flex;align-items:flex-end;">
        <div style="width:100%;border-radius:8px 8px 3px 3px;background:linear-gradient(180deg,var(--c1),color-mix(in srgb, var(--c1) 60%, transparent));height:${Math.max(4,d.total/maxTotal*120)}px;"></div>
      </div>
      <div style="font-size:10px;color:var(--ink-3);">${(d.date||'').slice(5)}</div>
    </div>`).join('');
  const top = data.top_products || [];
  return `
  <div class="grid row-eq" style="grid-template-columns:repeat(3,1fr);">
    <div class="glass kpi"><div class="kpi-icon" style="background:var(--good-soft);color:var(--good);">${icon('check',18)}</div><div class="kpi-val">${fmtNum(totalRevenue)} SAR</div><div class="kpi-label">مبيعات المتجر (${days.length} يوم)</div></div>
    <div class="glass kpi"><div class="kpi-icon">${icon('receipt',18)}</div><div class="kpi-val">${fmtNum(totalOrders)}</div><div class="kpi-label">إجمالي الطلبات</div></div>
    <div class="glass kpi"><div class="kpi-icon">${icon('clock',18)}</div><div class="kpi-val" style="font-size:14px;">${storeSales.captured_at? fmtDate(storeSales.captured_at):'—'}</div><div class="kpi-label">آخر تحديث لبيانات سلة</div></div>
  </div>
  <div class="glass card" style="margin-top:16px;">
    <div class="card-head"><div><div class="card-title">مبيعات المتجر يومياً</div><div class="card-sub">بيانات فعلية من طلبات سلة</div></div></div>
    <div style="display:flex;gap:6px;align-items:flex-end;">${bars || emptyState('chart','لا توجد بيانات كافية','')}</div>
  </div>
  <div class="glass card" style="margin-top:16px;">
    <div class="card-head"><div class="card-title">المنتجات الأكثر مبيعاً على المتجر</div></div>
    ${top.length? `<table><thead><tr><th>المنتج</th><th class="num">الكمية المباعة</th><th class="num">الإيراد</th></tr></thead><tbody>
      ${top.map(p=>`<tr><td class="prod-name">${escHtml(p.name)}</td><td class="num" style="font-weight:700;">${fmtNum(p.qty)}</td><td class="num">${fmtNum(p.revenue)} SAR</td></tr>`).join('')}
    </tbody></table>` : emptyState('receipt','لا توجد بيانات بعد','')}
    <div class="perf-note">${icon('sync2',13)} تتحدث هذه البيانات تلقائياً كل ساعة من متجركم الفعلي على سلة</div>
  </div>`;
}

/* ============ SYNC ============ */
function viewSync(){
  const pend = movements.filter(m=>!m.synced);
  const failed = pend.filter(m=>m.sync_error);
  return `
  <div class="grid row-eq">
    <div class="glass kpi"><div class="kpi-icon">${icon('clock',18)}</div><div class="kpi-val" style="font-size:16px;">${summary.last_sync_at? fmtDate(summary.last_sync_at):'لم تتم أي مزامنة بعد'}</div><div class="kpi-label">آخر مزامنة ناجحة مع سلة</div></div>
    <div class="glass kpi"><div class="kpi-icon" style="${pend.length?'background:var(--warn-soft);color:var(--warn)':''}">${icon('sync2',18)}</div><div class="kpi-val">${fmtNum(pend.length)}</div><div class="kpi-label">حركة بانتظار المزامنة</div></div>
  </div>
  <div class="glass card" style="margin-top:16px;">
    <div class="card-title" style="margin-bottom:10px;">كيف تعمل المزامنة مع سلة؟</div>
    <div style="font-size:13px;line-height:2;color:var(--ink-2);">
      كل حركة صادر أو وارد أو فاتورة بيع تُسجَّل هنا تُحفظ فوراً في قاعدة بيانات النظام، ثم تتم مزامنتها تلقائياً كل ساعة مع كمية المنتج الفعلية على متجركم في سلة عبر مهمة مجدولة، فتنعكس زيادة أو نقصان الكمية مباشرة على سلة دون أي تدخل يدوي.
    </div>
  </div>
  ${failed.length? `<div class="glass card" style="margin-top:16px;">
    <div class="card-title" style="margin-bottom:10px;color:var(--crit);">حركات فشلت مزامنتها</div>
    <table><thead><tr><th>الصنف</th><th class="num">الكمية</th><th>الخطأ</th></tr></thead><tbody>
    ${failed.map(m=>`<tr><td class="prod-name">${escHtml(m.product_name)}</td><td class="num">${fmtNum(m.qty)}</td><td class="muted">${escHtml(m.sync_error)}</td></tr>`).join('')}
    </tbody></table></div>`:''}`;
}

/* ============ SETTINGS (manager only) ============ */
function viewSettings(){
  if(me.role!=='manager') return emptyState('lock','هذه الصفحة للمدير فقط','لا تملك صلاحية الوصول لإعدادات النظام.');
  return `
  <div class="glass card settings-section">
    <div class="controls-row">
      <div><h4>المستخدمون</h4><div class="hint">إدارة حسابات الدخول: مدير (تحكم كامل)، محاسب (حركات وفواتير المخزون)، مستخدم (عرض فقط).</div></div>
      <span style="flex:1;"></span>
      <button class="btn btn-sm btn-accent" id="open-user">${icon('plus',14)} مستخدم جديد</button>
    </div>
    <table><thead><tr><th>الاسم</th><th>اسم المستخدم</th><th>الدور</th><th>الحالة</th><th></th></tr></thead><tbody>
      ${users.map(u=>`<tr>
        <td class="prod-name">${escHtml(u.display_name)}</td>
        <td class="muted">${escHtml(u.username)}</td>
        <td><span class="role-badge role-${u.role}">${ROLE_LABEL[u.role]}</span></td>
        <td>${u.active? `<span class="pill pill-good">${icon('check',11)} نشط</span>` : `<span class="pill pill-muted">${icon('x',11)} معطّل</span>`}</td>
        <td><div class="user-row-actions">
          <button class="btn btn-sm btn-ghost" data-edit-user="${u.id}">${icon('edit',13)}</button>
          ${u.id!==me.id? `<button class="btn btn-sm btn-ghost" data-delete-user="${u.id}">${icon('trash',13)}</button>`:''}
        </div></td>
      </tr>`).join('')}
    </tbody></table>
  </div>`;
}

/* ============ CHARTS ============ */
function donutChart(cats){
  if(!cats || !cats.length) return emptyState('chart','لا توجد بيانات','لا توجد أصناف مصنّفة بعد.');
  const total = cats.reduce((s,c)=>s+c.count,0);
  const R=54, C=2*Math.PI*R;
  let offset=0;
  const segs = cats.map((c,i)=>{
    const frac = c.count/total, len = frac*C;
    const seg = `<circle data-idx="${i}" cx="70" cy="70" r="${R}" fill="none" stroke="${catColor(c.rank)}" stroke-width="16" stroke-dasharray="${len} ${C-len}" stroke-dashoffset="${-offset}" transform="rotate(-90 70 70)" class="donut-seg"/>`;
    offset += len; return seg;
  }).join('');
  const legend = cats.map((c,i)=>`<div class="legend-row" data-idx="${i}"><span class="legend-dot" style="background:${catColor(c.rank)}"></span><span class="legend-name">${escHtml(c.name)}</span><span class="legend-val">${fmtNum(c.count)}</span></div>`).join('');
  return `<div class="donut-wrap">
    <svg width="140" height="140" viewBox="0 0 140 140" id="donut-svg">
      <circle cx="70" cy="70" r="${R}" fill="none" stroke="var(--glass-border)" stroke-width="16"/>${segs}
      <text x="70" y="66" text-anchor="middle" font-size="20" font-weight="700" fill="var(--ink)">${fmtNum(total)}</text>
      <text x="70" y="84" text-anchor="middle" font-size="10" fill="var(--ink-3)">صنف</text>
    </svg>
    <div class="legend" id="donut-legend" style="flex:1;">${legend}</div>
  </div>`;
}
function last14Days(){ const days=[]; for(let i=13;i>=0;i--){ const d=new Date(); d.setDate(d.getDate()-i); days.push(d.toISOString().slice(0,10)); } return days; }
function movementsByDayLocal(){
  const days = last14Days();
  const map = Object.fromEntries(days.map(d=>[d,{in:0,out:0}]));
  movements.forEach(m=>{ const d=(m.ts||'').slice(0,10); if(map[d]){ if(m.type==='in') map[d].in+=Number(m.qty); else if(m.type==='out') map[d].out+=Number(m.qty); } });
  return days.map(d=>({d, in:map[d].in, out:map[d].out}));
}
function areaChart(){
  if(!movements.length) return emptyState('chart','لا توجد بيانات حركة كافية بعد','سيظهر هنا رسم بياني لحركة الوارد والصادر بعد تسجيل حركات المخزون.');
  const days = movementsByDayLocal();
  const W=560,H=180,pad=28;
  const maxV = Math.max(1, ...days.map(d=>Math.max(d.in,d.out)));
  const x = i => pad + i*((W-pad*2)/(days.length-1));
  const y = v => H-pad - (v/maxV)*(H-pad*1.6);
  const lineIn = days.map((d,i)=>`${x(i)},${y(d.in)}`).join(' ');
  const lineOut = days.map((d,i)=>`${x(i)},${y(d.out)}`).join(' ');
  const areaIn = `${pad},${H-pad} ${lineIn} ${x(days.length-1)},${H-pad}`;
  const gridY = [0,.5,1].map(f=>H-pad-f*(H-pad*1.6));
  const points = days.map((d,i)=>`<circle class="hover-pt" data-i="${i}" cx="${x(i)}" cy="${y(d.in)}" r="10" fill="transparent"/>`).join('');
  return `<div class="area-wrap">
  <svg width="100%" viewBox="0 0 ${W} ${H}" id="area-svg" preserveAspectRatio="none" style="overflow:visible;">
    ${gridY.map(gy=>`<line x1="${pad}" y1="${gy}" x2="${W-pad}" y2="${gy}" stroke="var(--glass-border)" stroke-width="1"/>`).join('')}
    <polygon points="${areaIn}" fill="var(--c1)" opacity=".12"/>
    <polyline points="${lineIn}" fill="none" stroke="var(--c1)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <polyline points="${lineOut}" fill="none" stroke="var(--c2)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${x(days.length-1)}" cy="${y(days[days.length-1].in)}" r="4" fill="var(--c1)"/>
    <circle cx="${x(days.length-1)}" cy="${y(days[days.length-1].out)}" r="4" fill="var(--c2)"/>${points}
  </svg><div class="area-tooltip" id="area-tip"></div></div>
  <div class="legend" style="flex-direction:row;gap:18px;margin-top:10px;">
    <div class="legend-row"><span class="legend-dot" style="background:var(--c1)"></span><span class="legend-name">وارد</span></div>
    <div class="legend-row"><span class="legend-dot" style="background:var(--c2)"></span><span class="legend-name">صادر</span></div>
  </div>`;
}

/* ============ MODALS ============ */
function renderOverlay(){
  const root = document.getElementById('overlay-root');
  if(!root) return;
  if(!ui.modal){ root.innerHTML=''; return; }
  if(ui.modal.type==='move') root.innerHTML = moveModal();
  else if(ui.modal.type==='addProduct') root.innerHTML = addProductModal();
  else if(ui.modal.type==='sale') root.innerHTML = saleModal();
  else if(ui.modal.type==='saleView') root.innerHTML = saleViewModal();
  else if(ui.modal.type==='user') root.innerHTML = userModal();
  else root.innerHTML='';
}
function moveModal(){
  const preset = ui.modal.productId ? products.find(p=>p.id===ui.modal.productId) : null;
  const mtype = ui.modal.moveType || 'out';
  return `
  <div class="overlay" id="overlay-bg">
    <div class="glass modal">
      <button class="close-x" data-close>${icon('x',14)}</button>
      <h3>تسجيل حركة مخزون</h3>
      <div class="sub">سجّل صنفاً خرج من المستودع أو وصل إليه، وسيتم تحديث المخزون هنا ومزامنته مع سلة تلقائياً.</div>
      <div class="field"><label>نوع الحركة</label>
        <div class="seg" id="move-type-seg">
          <button type="button" data-mtype="out" class="${mtype==='out'?'active':''}">صادر من المستودع</button>
          <button type="button" data-mtype="in" class="${mtype==='in'?'active':''}">وارد للمستودع</button>
          <button type="button" data-mtype="adjust" class="${mtype==='adjust'?'active':''}">تعديل جرد</button>
        </div>
      </div>
      <div class="field"><label>الصنف</label>
        ${preset? `<div class="picked"><span>${escHtml(preset.name)}</span><button type="button" class="btn btn-sm btn-ghost" id="clear-pick">تغيير</button></div>` : `
        <input id="move-search" placeholder="ابحث بالاسم أو رقم المنتج…" autocomplete="off" value="${escAttr(ui.moveSearch||'')}" />
        <div class="suggest" id="move-suggest">${moveSuggestions()}</div>`}
      </div>
      <div class="field"><label>${mtype==='adjust'? 'الكمية الفعلية بعد الجرد' : 'الكمية'}</label><input type="number" min="0" id="move-qty" placeholder="0" /></div>
      <div class="field"><label>ملاحظة (اختياري)</label><input id="move-note" placeholder="مثال: طلب رقم 1042" /></div>
      <div class="modal-actions"><button class="btn btn-ghost" data-close>إلغاء</button><button class="btn btn-accent" id="save-move">${icon('check',15)} حفظ الحركة</button></div>
    </div>
  </div>`;
}
function moveSuggestions(){
  const q = (ui.moveSearch||'').trim().toLowerCase();
  const list = (q? products.filter(p=>p.name.toLowerCase().includes(q)||p.id.includes(q)) : products).slice(0,30);
  if(!list.length) return `<div class="suggest-item muted">لا توجد نتائج</div>`;
  return list.map(p=>`<div class="suggest-item" data-pick="${p.id}">${escHtml(p.name)} <span class="muted">#${p.id}</span></div>`).join('');
}
function addProductModal(){
  return `
  <div class="overlay" id="overlay-bg">
    <div class="glass modal">
      <button class="close-x" data-close>${icon('x',14)}</button>
      <h3>إضافة صنف غير مدرج</h3>
      <div class="sub">أدخل رقم المنتج كما يظهر في رابط المنتج بلوحة تحكم سلة حتى تتم مزامنة كمياته بشكل صحيح.</div>
      <div class="field"><label>اسم الصنف</label><input id="np-name" /></div>
      <div class="field"><label>رقم المنتج في سلة</label><input id="np-id" inputmode="numeric" /></div>
      <div class="field"><label>الفئة</label><input id="np-cat" placeholder="مثال: خيام الرحلات" /></div>
      <div class="field"><label>السعر (اختياري)</label><input id="np-price" type="number" min="0" /></div>
      <div class="field"><label>الكمية الافتتاحية</label><input id="np-qty" type="number" min="0" /></div>
      <div class="modal-actions"><button class="btn btn-ghost" data-close>إلغاء</button><button class="btn btn-accent" id="save-add-product">${icon('check',15)} إضافة الصنف</button></div>
    </div>
  </div>`;
}
function saleModal(){
  const items = ui.modal.items;
  const pickedIds = items.filter(it=>it.productId).map(it=>it.productId);
  const rowsHtml = items.map((it,idx)=>{
    const p = it.productId ? products.find(x=>x.id===it.productId) : null;
    if(p){
      return `<div class="field" id="sale-row-${idx}" data-row data-product-id="${p.id}">
        <div class="picked" style="align-items:center;">
          <span style="flex:1;">${escHtml(p.name)}</span>
          <input type="number" min="1" class="row-qty" value="${it.qty||1}" style="width:64px;padding:6px 8px;border-radius:8px;margin-inline-end:6px;" />
          <input type="number" min="0" class="row-price" value="${it.price ?? p.price}" style="width:78px;padding:6px 8px;border-radius:8px;margin-inline-end:6px;" />
          <button type="button" class="btn btn-sm btn-ghost" data-row-clear="${idx}">${icon('x',12)}</button>
          ${items.length>1? `<button type="button" class="btn btn-sm btn-ghost" data-row-remove="${idx}">${icon('trash',12)}</button>`:''}
        </div></div>`;
    }
    return `<div class="field" id="sale-row-${idx}" data-row>
      <input data-row-search="${idx}" placeholder="ابحث عن صنف بالاسم أو الرقم…" autocomplete="off" value="${escAttr(it.search||'')}" />
      <div class="suggest" id="row-suggest-${idx}">${saleRowSuggestions(idx, pickedIds)}</div>
      ${items.length>1? `<button type="button" class="btn btn-sm btn-ghost" data-row-remove="${idx}" style="margin-top:6px;">${icon('trash',12)} حذف السطر</button>`:''}
    </div>`;
  }).join('');
  return `
  <div class="overlay" id="overlay-bg">
    <div class="glass modal" style="width:min(560px,100%);">
      <button class="close-x" data-close>${icon('x',14)}</button>
      <h3>فاتورة بيع جديدة</h3>
      <div class="sub">أصناف الفاتورة تُخصم مباشرة من مخزون المستودع وتُزامن مع سلة تلقائياً.</div>
      <div class="grid row-eq" style="margin-bottom:6px;">
        <div class="field"><label>رقم الفاتورة</label><input id="sale-invoice-no" value="${escAttr(ui.modal.invoice_no)}" /></div>
        <div class="field"><label>اسم العميل (اختياري)</label><input id="sale-customer" value="${escAttr(ui.modal.customer||'')}" /></div>
      </div>
      <label style="font-size:12.5px;font-weight:600;color:var(--ink-2);">أصناف الفاتورة</label>
      <div id="sale-rows" style="margin-top:6px;">${rowsHtml}</div>
      <button type="button" class="btn btn-sm" id="sale-add-row" style="margin-top:4px;">${icon('plus',13)} إضافة صنف آخر</button>
      <div class="picked" style="margin-top:16px;background:var(--surface-solid);border:1px solid var(--glass-border);"><span>الإجمالي</span><b id="sale-total-val">0 SAR</b></div>
      <div class="modal-actions"><button class="btn btn-ghost" data-close>إلغاء</button><button class="btn btn-accent" id="save-sale">${icon('check',15)} حفظ الفاتورة</button></div>
    </div>
  </div>`;
}
function saleRowSuggestions(idx, pickedIds){
  const q = (ui.modal.items[idx].search||'').trim().toLowerCase();
  let list = products.filter(p=>!pickedIds.includes(p.id) || p.id===ui.modal.items[idx].productId);
  if(q) list = list.filter(p=>p.name.toLowerCase().includes(q) || p.id.includes(q));
  list = list.slice(0,25);
  if(!list.length) return `<div class="suggest-item muted">لا توجد نتائج</div>`;
  return list.map(p=>`<div class="suggest-item" data-row-pick="${idx}" data-pid="${p.id}">${escHtml(p.name)} <span class="muted">#${p.id}</span></div>`).join('');
}
function recalcSaleTotal(){
  const rows = document.querySelectorAll('#sale-rows [data-row][data-product-id]');
  let total = 0;
  rows.forEach(r=>{ const qty=Number(r.querySelector('.row-qty')?.value)||0; const price=Number(r.querySelector('.row-price')?.value)||0; total+=qty*price; });
  const el = document.getElementById('sale-total-val'); if(el) el.textContent = fmtNum(total)+' SAR';
}
function saleViewModal(){
  const s = ui.modal.sale;
  if(!s) return '';
  return `
  <div class="overlay" id="overlay-bg">
    <div class="glass modal">
      <button class="close-x" data-close>${icon('x',14)}</button>
      <h3>فاتورة ${escHtml(s.invoice_no)}</h3>
      <div class="sub">${fmtDate(s.ts)} ${s.customer? '· '+escHtml(s.customer):''}</div>
      <table><thead><tr><th>الصنف</th><th class="num">الكمية</th><th class="num">السعر</th><th class="num">الإجمالي</th></tr></thead><tbody>
      ${s.items.map(it=>`<tr><td class="prod-name">${escHtml(it.name)}</td><td class="num">${fmtNum(it.qty)}</td><td class="num">${fmtNum(it.price)}</td><td class="num" style="font-weight:700;">${fmtNum(it.qty*it.price)}</td></tr>`).join('')}
      </tbody></table>
      <div class="picked" style="margin-top:14px;background:var(--surface-solid);border:1px solid var(--glass-border);"><span>الإجمالي</span><b>${fmtNum(s.total)} SAR</b></div>
      <div class="modal-actions"><button class="btn btn-ghost" data-close style="flex:1;">إغلاق</button></div>
    </div>
  </div>`;
}
function userModal(){
  const editing = ui.modal.editUser;
  return `
  <div class="overlay" id="overlay-bg">
    <div class="glass modal">
      <button class="close-x" data-close>${icon('x',14)}</button>
      <h3>${editing? 'تعديل مستخدم' : 'مستخدم جديد'}</h3>
      <div class="sub">${editing? 'عدّل الدور أو الحالة أو أعد تعيين كلمة المرور.' : 'حدد اسم مستخدم وكلمة مرور ودور الحساب.'}</div>
      ${!editing? `<div class="field"><label>اسم المستخدم (بالإنجليزي، للدخول)</label><input id="u-username" /></div>`:''}
      <div class="field"><label>الاسم الظاهر</label><input id="u-name" value="${escAttr(editing?editing.display_name:'')}" /></div>
      <div class="field"><label>الدور</label>
        <select id="u-role">
          <option value="manager" ${editing&&editing.role==='manager'?'selected':''}>مدير — تحكم كامل بالنظام</option>
          <option value="accountant" ${editing&&editing.role==='accountant'?'selected':''}>محاسب — حركات المخزون والفواتير</option>
          <option value="user" ${(!editing||editing.role==='user')?'selected':''}>مستخدم — عرض فقط</option>
        </select>
      </div>
      <div class="field"><label>${editing? 'كلمة مرور جديدة (اتركها فارغة للإبقاء عليها)':'كلمة المرور'}</label><input id="u-password" type="password" minlength="6" /></div>
      ${editing? `<div class="field"><label>الحالة</label>
        <div class="seg"><button type="button" data-u-active="true" class="${editing.active?'active':''}">نشط</button><button type="button" data-u-active="false" class="${!editing.active?'active':''}">معطّل</button></div>
      </div>`:''}
      <div class="modal-actions"><button class="btn btn-ghost" data-close>إلغاء</button><button class="btn btn-accent" id="save-user">${icon('check',15)} حفظ</button></div>
    </div>
  </div>`;
}

/* ============ EVENTS ============ */
let bound=false;
function bindOnce(){
  if(bound) return; bound=true;
  document.body.addEventListener('click', onClick);
  document.body.addEventListener('change', onChange);
  document.body.addEventListener('input', onInput);
  document.body.addEventListener('keydown', e=>{ if(e.key==='Escape' && ui.modal){ ui.modal=null; renderOverlay(); } });
  document.body.addEventListener('mouseover', onHover);
  document.body.addEventListener('mouseout', onHoverOut);
}
async function onClick(e){
  const nav = e.target.closest('[data-nav]');
  if(nav){ ui.tab = nav.getAttribute('data-nav'); ui.search=''; ui.catFilter=''; ui.stockFilter=''; renderShell(); return; }
  if(e.target.closest('#open-move')){ ui.modal={type:'move',moveType:'out',productId:null}; ui.moveSearch=''; renderOverlay(); return; }
  const qm = e.target.closest('[data-quick-move]');
  if(qm){ const id=qm.getAttribute('data-quick-move'); const p=products.find(x=>x.id===id); ui.modal={type:'move',moveType:(p&&p.stock===null?'adjust':'out'),productId:id}; renderOverlay(); return; }
  if(e.target.closest('#open-add-product')){ ui.modal={type:'addProduct'}; renderOverlay(); return; }
  if(e.target.closest('#open-sale')){ ui.modal={type:'sale', invoice_no: nextInvoiceNo(), customer:'', items:[{productId:null, search:'', qty:1, price:0}]}; renderOverlay(); return; }
  if(e.target.closest('#open-user')){ ui.modal={type:'user', editUser:null}; renderOverlay(); return; }
  const editUserBtn = e.target.closest('[data-edit-user]');
  if(editUserBtn){ const u=users.find(x=>x.id===editUserBtn.getAttribute('data-edit-user')); ui.modal={type:'user', editUser:{...u}}; renderOverlay(); return; }
  const delUserBtn = e.target.closest('[data-delete-user]');
  if(delUserBtn){
    if(confirm('هل أنت متأكد من حذف هذا المستخدم؟')){
      await api('/api/users/'+delUserBtn.getAttribute('data-delete-user'), {method:'DELETE'});
      users = await api('/api/users'); updateView();
    }
    return;
  }
  const viewSaleBtn = e.target.closest('[data-view-sale]');
  if(viewSaleBtn){ const full = await api('/api/sales/'+viewSaleBtn.getAttribute('data-view-sale')); ui.modal={type:'saleView', sale:full}; renderOverlay(); return; }
  if(e.target.closest('#sale-add-row')){ ui.modal.items.push({productId:null, search:'', qty:1, price:0}); renderOverlay(); return; }
  const rowRemove = e.target.closest('[data-row-remove]');
  if(rowRemove){ ui.modal.items.splice(+rowRemove.getAttribute('data-row-remove'),1); renderOverlay(); return; }
  const rowClear = e.target.closest('[data-row-clear]');
  if(rowClear){ ui.modal.items[+rowClear.getAttribute('data-row-clear')]={productId:null, search:'', qty:1, price:0}; renderOverlay(); return; }
  const rowPick = e.target.closest('[data-row-pick]');
  if(rowPick){
    const i=+rowPick.getAttribute('data-row-pick'), pid=rowPick.getAttribute('data-pid');
    const p = products.find(x=>x.id===pid);
    ui.modal.items[i] = {productId:pid, search:'', qty:1, price:p?p.price:0};
    renderOverlay(); return;
  }
  if(e.target.closest('#close-x') || e.target.closest('[data-close]') || e.target.id==='overlay-bg'){ ui.modal=null; renderOverlay(); return; }
  const mtype = e.target.closest('[data-mtype]');
  if(mtype){ ui.modal.moveType = mtype.getAttribute('data-mtype'); renderOverlay(); return; }
  const pick = e.target.closest('[data-pick]');
  if(pick){ ui.modal.productId = pick.getAttribute('data-pick'); renderOverlay(); return; }
  if(e.target.closest('#clear-pick')){ ui.modal.productId=null; ui.moveSearch=''; renderOverlay(); return; }
  const uActive = e.target.closest('[data-u-active]');
  if(uActive){ ui.modal.editUser.active = uActive.getAttribute('data-u-active')==='true'; renderOverlay(); return; }
  if(e.target.closest('#save-move')) return doSaveMove();
  if(e.target.closest('#save-add-product')) return doSaveAddProduct();
  if(e.target.closest('#save-sale')) return doSaveSale();
  if(e.target.closest('#save-user')) return doSaveUser();
  if(e.target.closest('#export-stock-csv')) return exportCsv('stock');
}
function onChange(e){
  if(e.target.id==='cat-filter'){ ui.catFilter = e.target.value; updateStockResults(); return; }
  if(e.target.id==='stock-filter'){ ui.stockFilter = e.target.value; updateStockResults(); return; }
}
function onInput(e){
  if(e.target.id==='move-search'){ ui.moveSearch = e.target.value; const s=document.getElementById('move-suggest'); if(s) s.innerHTML = moveSuggestions(); return; }
  const rs = e.target.closest('[data-row-search]');
  if(rs){ const idx=+rs.getAttribute('data-row-search'); ui.modal.items[idx].search = rs.value; const pickedIds = ui.modal.items.filter(it=>it.productId).map(it=>it.productId); const s=document.getElementById('row-suggest-'+idx); if(s) s.innerHTML = saleRowSuggestions(idx, pickedIds); return; }
  if(e.target.classList && (e.target.classList.contains('row-qty') || e.target.classList.contains('row-price'))){ recalcSaleTotal(); return; }
}
function onHover(e){
  const lr = e.target.closest('.legend-row[data-idx]');
  if(lr){ const idx=lr.getAttribute('data-idx');
    document.querySelectorAll('.legend-row[data-idx]').forEach(el=>el.classList.toggle('dim', el.getAttribute('data-idx')!==idx));
    document.querySelectorAll('.donut-seg').forEach(el=>el.style.opacity = el.getAttribute('data-idx')===idx?1:.28);
  }
  if(e.target.classList && e.target.classList.contains('hover-pt')){
    const i = +e.target.getAttribute('data-i');
    const days = movementsByDayLocal(); const d = days[i];
    const tip = document.getElementById('area-tip');
    if(tip && d){
      const rect = e.target.closest('.area-wrap').getBoundingClientRect();
      const pt = e.target.getBoundingClientRect();
      tip.style.left = (pt.left-rect.left+pt.width/2)+'px'; tip.style.top = (pt.top-rect.top)+'px'; tip.style.opacity=1;
      tip.innerHTML = `<b>${d.d}</b><br/>وارد: ${d.in} · صادر: ${d.out}`;
    }
  }
}
function onHoverOut(e){
  if(e.target.closest('#donut-legend') || e.target.closest('#donut-svg')){
    document.querySelectorAll('.legend-row[data-idx]').forEach(el=>el.classList.remove('dim'));
    document.querySelectorAll('.donut-seg').forEach(el=>el.style.opacity=1);
  }
  if(e.target.classList && e.target.classList.contains('hover-pt')){ const tip=document.getElementById('area-tip'); if(tip) tip.style.opacity=0; }
}

async function doSaveMove(){
  const type = ui.modal.moveType, productId = ui.modal.productId;
  const qty = Number(document.getElementById('move-qty')?.value);
  const note = document.getElementById('move-note')?.value.trim();
  if(!productId){ toast('اختر الصنف أولاً','err'); return; }
  if(!qty || qty<0){ toast('أدخل كمية صحيحة','err'); return; }
  try{
    await api('/api/movements', {method:'POST', body: JSON.stringify({product_id:productId, type, qty, note})});
    ui.modal=null; toast('تم حفظ الحركة بنجاح','ok');
    await refreshAndRender();
  }catch(err){ toast('تعذّر حفظ الحركة','err'); }
}
async function doSaveAddProduct(){
  const name = document.getElementById('np-name').value.trim();
  const id = document.getElementById('np-id').value.trim();
  const category = document.getElementById('np-cat').value.trim() || 'غير مصنف';
  const price = Number(document.getElementById('np-price').value)||0;
  const qty = document.getElementById('np-qty').value;
  if(!name || !id){ toast('يرجى إدخال الاسم ورقم المنتج في سلة','err'); return; }
  try{
    await api('/api/products', {method:'POST', body: JSON.stringify({id, name, category, price, stock: qty===''?null:Number(qty)})});
    ui.modal=null; toast('تمت إضافة الصنف','ok');
    await refreshAndRender();
  }catch(err){ toast(err.error==='product_exists'?'هذا الصنف موجود بالفعل':'تعذّرت الإضافة','err'); }
}
async function doSaveSale(){
  const invoice_no = document.getElementById('sale-invoice-no')?.value.trim();
  const customer = document.getElementById('sale-customer')?.value.trim();
  const rowEls = [...document.querySelectorAll('#sale-rows [data-row][data-product-id]')];
  if(!rowEls.length){ toast('أضف صنفاً واحداً على الأقل للفاتورة','err'); return; }
  const items = [];
  for(const r of rowEls){
    const product_id = r.getAttribute('data-product-id');
    const qty = Number(r.querySelector('.row-qty')?.value);
    const price = Number(r.querySelector('.row-price')?.value);
    if(!qty || qty<=0){ toast('تأكد من إدخال كمية صحيحة لكل صنف','err'); return; }
    items.push({product_id, qty, price});
  }
  if(!invoice_no){ toast('أدخل رقم الفاتورة','err'); return; }
  try{
    await api('/api/sales', {method:'POST', body: JSON.stringify({invoice_no, customer, items})});
    ui.modal=null; toast('تم حفظ الفاتورة وخصم الكمية من المخزون','ok');
    await refreshAndRender();
  }catch(err){ toast(err.error==='invoice_no_taken'?'رقم الفاتورة مستخدم بالفعل':'تعذّر حفظ الفاتورة','err'); }
}
async function doSaveUser(){
  const editing = ui.modal.editUser;
  const display_name = document.getElementById('u-name').value.trim();
  const role = document.getElementById('u-role').value;
  const password = document.getElementById('u-password').value;
  try{
    if(editing){
      const body = {display_name, role, active: editing.active};
      if(password) body.password = password;
      await api('/api/users/'+editing.id, {method:'PATCH', body: JSON.stringify(body)});
    }else{
      const username = document.getElementById('u-username').value.trim();
      if(!username || !password){ toast('أدخل اسم المستخدم وكلمة المرور','err'); return; }
      if(password.length<6){ toast('كلمة المرور 6 أحرف على الأقل','err'); return; }
      await api('/api/users', {method:'POST', body: JSON.stringify({username, password, display_name, role})});
    }
    ui.modal=null; toast('تم الحفظ','ok');
    users = await api('/api/users'); renderOverlay(); updateView();
  }catch(err){ toast(err.error==='username_taken'?'اسم المستخدم مستخدم بالفعل':'تعذّر الحفظ','err'); }
}
function exportCsv(kind){
  let rows, filename;
  if(kind==='stock'){
    rows = [['الصنف','الفئة','السعر','الكمية بالمستودع','رقم المنتج']];
    filteredProducts().forEach(p=>rows.push([p.name,p.category,p.price,p.stock??'',p.id]));
    filename='مخزون-وادي-الخيام.csv';
  }
  const csv = '﻿'+rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\r\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download=filename; document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}
function toast(msg, kind='ok'){
  const wrap = document.getElementById('toast-wrap'); if(!wrap) return;
  const el = document.createElement('div');
  el.className = 'toast ' + (kind==='ok'?'ok':kind==='err'?'err':'info');
  el.textContent = msg; wrap.appendChild(el);
  setTimeout(()=>el.remove(), 3400);
}

boot();
