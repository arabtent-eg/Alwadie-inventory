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
  upload:'M12 21V9m-5 5 5-5 5 5M5 3h14',
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
  layers:'M12 3 2 8l10 5 10-5-10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5',
  globe:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 0c2.4 2.5 3.7 5.7 3.7 9s-1.3 6.5-3.7 9c-2.4-2.5-3.7-5.7-3.7-9s1.3-6.5 3.7-9ZM3.3 9h17.4M3.3 15h17.4',
  sun:'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1',
  moon:'M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z',
};
function icon(name, size=18){
  const d = ICONS[name] || ICONS.box;
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${
    d.split('M').filter(Boolean).map(seg=>`<path d="M${seg}"/>`).join('')
  }</svg>`;
}
function catColor(rank){ return ['var(--c1)','var(--c2)','var(--c3)','var(--c4)','var(--c5)','var(--c6)','var(--c7)','var(--c8)'][rank] || 'var(--c8)'; }
function fmtNum(n){ if(n===null||n===undefined||n==='') return '—'; return Number(n).toLocaleString('en-US'); }
function fmtDate(iso){ if(!iso) return '—'; const d=new Date(iso); return d.toLocaleString(LANG==='en'?'en-US':'ar-SA',{dateStyle:'medium',timeStyle:'short'}); }
function escAttr(s){ return String(s??'').replace(/"/g,'&quot;'); }
function escHtml(s){ return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* ============ I18N ============ */
let LANG = 'ar';
const I18N = {
  ar: {
    appName:'مؤسسة وادي الخيام', appSub:'إدارة مخزون المستودع', systemTitle:'نظام إدارة المخزون',
    loginSub:'سجّل دخولك للوصول إلى نظام إدارة المخزون', username:'اسم المستخدم', password:'كلمة المرور',
    loginBtn:'تسجيل الدخول', loginErr:'اسم المستخدم أو كلمة المرور غير صحيحة',
    'nav.dashboard':'لوحة المعلومات','nav.stock':'المخزون','nav.sales':'المبيعات','nav.movements':'سجل الحركات',
    'nav.store':'أداء المتجر','nav.reports':'التقارير','nav.sync':'المزامنة','nav.settings':'الإعدادات','nav.bulk':'أصناف الجملة',
    'title.store':'أداء المتجر على سلة','title.reports':'التقارير والإحصائيات','title.sync':'مزامنة سلة','title.bulk':'أصناف الجملة (باله / كرتون)',
    'role.manager':'مدير','role.accountant':'محاسب','role.user':'مستخدم',
    'sidebar.syncedAll':'كل الحركات متزامنة', 'sidebar.pendingSync':'{n} حركة بانتظار المزامنة', logout:'تسجيل الخروج',
    'theme.toggle':'تبديل الوضع الفاتح/الداكن', 'lang.toggle':'Switch to English',
    searchPlaceholder:'ابحث عن صنف بالاسم…', recordMove:'تسجيل حركة',
    welcome:'أهلاً بك، {name}',
    footerNote:'مؤسسة وادي الخيام — نظام داخلي لإدارة مخزون المستودع · مزامَن تلقائياً مع سلة',
    save:'حفظ', cancel:'إلغاء', close:'إغلاق',
    'kpi.totalProducts':'إجمالي الأصناف','kpi.totalQty':'إجمالي الكمية بالمستودع','kpi.todayMoves':'حركات اليوم',
    'kpi.lowStockAlerts':'تنبيهات نقص مخزون','kpi.lastSync':'آخر مزامنة مع سلة','kpi.neverSynced':'لم تتم بعد',
    'kpi.totalIn':'إجمالي الوارد للمستودع','kpi.totalOut':'إجمالي الصادر من المستودع','kpi.totalMovesCount':'إجمالي عدد الحركات',
    'kpi.totalSalesValue':'إجمالي قيمة المبيعات (الفترة)','kpi.totalInvoices':'عدد الفواتير (الفترة)',
    onboardTitle:'أكمل الجرد الافتتاحي للمخزون', onboardSub:'تم جرد {n} من أصل {total} صنفاً ({pct}%) — أدخل الكمية الحالية من شاشة «المخزون».',
    openStockScreen:'فتح شاشة المخزون',
    'chart.movement14':'حركة المخزون (وارد مقابل صادر) — آخر 14 يوماً','chart.catDist':'توزيع الأصناف حسب الفئة','chart.catDistSub':'عدد المنتجات في كل فئة',
    lowStockAlertsTitle:'تنبيهات نقص المخزون', viewAll:'عرض الكل', mostActive:'الأكثر حركة', viewLog:'عرض السجل',
    'empty.noLowStockTitle':'لا توجد أصناف منخفضة المخزون','empty.noLowStockSub':'كل الأصناف التي تم جردها أعلى من الحد الأدنى المسموح به حالياً.',
    'empty.noMovesTitle':'لا توجد حركات مسجلة بعد','empty.noMovesSub':'ستظهر هنا أكثر المنتجات حركة فور تسجيل أول عملية وارد أو صادر.',
    'th.item':'الصنف','th.category':'الفئة','th.price':'السعر','th.warehouseQty':'الكمية بالمستودع','th.status':'الحالة',
    'th.remaining':'المتبقي','th.minThreshold':'الحد الأدنى','th.productId':'رقم المنتج','th.notes':'ملاحظة','th.actions':'',
    'th.date':'التاريخ','th.type':'النوع','th.qty':'الكمية','th.note':'ملاحظة','th.error':'الخطأ',
    'th.invoiceNo':'رقم الفاتورة','th.customer':'العميل','th.itemCount':'عدد الأصناف','th.total':'الإجمالي',
    'stock.allCategories':'كل الفئات','stock.allStates':'كل حالات المخزون','stock.countOf':'{n} من {total} صنفاً',
    'stock.none':'بدون جرد','stock.ok':'متوفر','stock.low':'منخفض','stock.out':'نافذ',
    'stock.exportExcel':'تصدير Excel','stock.importExcel':'استيراد تحديث مخزون','stock.addUnlisted':'إضافة صنف غير مدرج','stock.move':'حركة',
    'empty.noResultsTitle':'لا توجد نتائج','empty.noResultsSub':'جرّب تعديل كلمة البحث أو الفلاتر المستخدمة.',
    'sales.totalInvoices':'إجمالي عدد الفواتير','sales.totalValue':'إجمالي قيمة المبيعات','sales.todaySales':'مبيعات اليوم ({n} فاتورة)',
    'sales.hint':'فواتير البيع اللي بتسحب مباشرة من مخزون المستودع','sales.newSale':'فاتورة بيع جديدة','sales.synced':'متزامن','sales.pending':'بالانتظار','sales.details':'التفاصيل',
    'empty.noSalesTitle':'لا توجد فواتير بيع بعد','empty.noSalesSub':'استخدم زر «فاتورة بيع جديدة» لتسجيل أول عملية بيع تُسحب من مخزون المستودع مباشرة.',
    'sale.priceLabel':'السعر','sale.qtyLabel':'الكمية',
    'sale.priceHint':'يمكنك تعديل السعر الظاهر بجانب الكمية لكل صنف عند البيع بالجملة — الأسعار المعروضة افتراضياً هي أسعار المتجر بالتجزئة.',
    'movements.recordedCount':'{n} حركة مسجلة (آخر 500)',
    'type.in':'وارد للمستودع','type.out':'صادر من المستودع','type.adjust':'تعديل جرد',
    'empty.noMovementsTitle':'لا توجد حركات مسجلة بعد','empty.noMovementsSub':'استخدم زر «تسجيل حركة» أعلى الصفحة.',
    'reports.from':'من تاريخ','reports.to':'إلى تاريخ','reports.reset':'إعادة تعيين','reports.exportReport':'تصدير التقرير Excel','reports.exportProducts':'تصدير قائمة المنتجات',
    'reports.dataNote':'التقرير يعتمد على أحدث 500 حركة مخزون وكل الفواتير المحمّلة بالنظام. اترك الحقلين فارغين لعرض كل الفترة.',
    'reports.trend14':'حركة المخزون خلال آخر 14 يوماً (غير متأثرة بالفلتر)',
    'reports.restockTitle':'أصناف بحاجة لإعادة تعبئة',
    'empty.noDataYetTitle':'لا توجد بيانات بعد','empty.noDataYetSub':'ستظهر هنا الأصناف الأكثر حركة خلال الفترة المحددة.',
    'empty.allGoodTitle':'لا شيء يحتاج انتباهك الآن','empty.allGoodSub':'جميع الأصناف المجرودة ضمن الحدود الآمنة.',
    'store.waitingTitle':'بيانات أداء المتجر لسه ما وصلتش','store.waitingSub':'بتتحدث هذه الشاشة تلقائياً كل ساعة من بيانات مبيعات متجركم الحقيقية على سلة عبر مهمة المزامنة. لو فاضية لفترة طويلة، تواصل معايا وأنا أراجعها.',
    'store.salesKpi':'مبيعات المتجر ({n} يوم)','store.totalOrders':'إجمالي الطلبات','store.lastUpdate':'آخر تحديث لبيانات سلة',
    'store.dailyTitle':'مبيعات المتجر يومياً','store.dailySub':'بيانات فعلية من طلبات سلة','store.topTitle':'المنتجات الأكثر مبيعاً على المتجر',
    'th.qtySold':'الكمية المباعة','th.revenue':'الإيراد','store.perfNote':'تتحدث هذه البيانات تلقائياً كل ساعة من متجركم الفعلي على سلة',
    'sync.lastSuccess':'آخر مزامنة ناجحة مع سلة','sync.neverSynced':'لم تتم أي مزامنة بعد','sync.pendingCount':'حركة بانتظار المزامنة',
    'sync.howTitle':'كيف تعمل المزامنة مع سلة؟',
    'sync.howBody':'كل حركة صادر أو وارد أو فاتورة بيع تُسجَّل هنا تُحفظ فوراً في قاعدة بيانات النظام، ثم تتم مزامنتها تلقائياً كل ساعة مع كمية المنتج الفعلية على متجركم في سلة عبر مهمة مجدولة، فتنعكس زيادة أو نقصان الكمية مباشرة على سلة دون أي تدخل يدوي.',
    'sync.failedTitle':'حركات فشلت مزامنتها',
    'settings.usersTitle':'المستخدمون','settings.usersHint':'إدارة حسابات الدخول: مدير (تحكم كامل)، محاسب (حركات وفواتير المخزون)، مستخدم (عرض فقط).',
    'settings.newUser':'مستخدم جديد','settings.name':'الاسم','settings.username':'اسم المستخدم','settings.role':'الدور','settings.status':'الحالة',
    'settings.active':'نشط','settings.disabled':'معطّل','settings.managerOnlyTitle':'هذه الصفحة للمدير فقط','settings.managerOnlySub':'لا تملك صلاحية الوصول لإعدادات النظام.',
    'settings.logoTitle':'شعار المؤسسة','settings.logoHint':'الشعار الحالي المعروض في النظام (الشعار الرسمي بشكل افتراضي). يمكنك رفع شعار مخصص ليحل محله.',
    'settings.uploadLogo':'رفع شعار جديد','settings.resetLogo':'استعادة الشعار الافتراضي',
    'unit.piece':'حبة','unit.carton':'كرتون','unit.pallet':'باله','unit.type':'نوع الوحدة','unit.perBundle':'الشد (عدد القطع في الوحدة)',
    'th.unit':'الوحدة','th.totalPieces':'إجمالي القطع','addProduct.notLinkedHint':'الأصناف من نوع كرتون/باله لا يتم ربطها أو مزامنتها مع سلة تلقائياً.',
    'channel.store':'المتجر','channel.warehouse':'المستودع','th.channel':'وجهة الصرف','sale.channel':'وجهة الصرف','sale.channelHint':'حدد إذا كانت هذه الفاتورة لبيع من المتجر أو من المستودع — سيتم خصم الكمية من المخزون في الحالتين.',
    'dash.storeOutToday':'صرف للمتجر اليوم','dash.warehouseOutToday':'صرف من المستودع اليوم','dash.invoicesCount':'{n} فاتورة',
    'print.invoiceTitle':'فاتورة مبيعات','print.date':'التاريخ','print.customer':'العميل','print.channel':'وجهة الصرف','print.item':'الصنف','print.qty':'الكمية','print.price':'السعر','print.total':'الإجمالي','print.grandTotal':'الإجمالي الكلي','print.printBtn':'طباعة A4',
    'bulk.hint':'أصناف تُباع بالباله أو الكرتون بالجملة — تُعرض هنا فقط لمتابعة المخزون الداخلي، ولا تتم مزامنتها مع متجركم على سلة.',
    'bulk.add':'إضافة صنف جملة','bulk.unitType':'نوع الوحدة','bulk.unitsPerBundle':'الشد (قطعة/وحدة)','bulk.bundleCount':'عدد الوحدات المتوفرة',
    'bulk.totalUnits':'إجمالي القطع','bulk.refPrice':'سعر التجزئة المرجعي','bulk.pallet':'باله','bulk.carton':'كرتون',
    'bulk.emptyTitle':'لا توجد أصناف جملة مسجلة بعد','bulk.emptySub':'استخدم زر «إضافة صنف جملة» لتسجيل أول صنف يُباع بالباله أو الكرتون.',
    'bulk.addTitle':'إضافة صنف جملة','bulk.editTitle':'تعديل صنف جملة','bulk.modalSub':'هذه الأصناف داخلية فقط لمتابعة المخزون ولا تُعرض على متجركم في سلة.',
    'bulk.name':'اسم الصنف','bulk.catPlaceholder':'مثال: خيام بالجملة','bulk.confirmDelete':'هل أنت متأكد من حذف هذا الصنف؟',
    'import.resultTitle':'نتيجة الاستيراد','import.resultSub':'تم تحديث {ok} صنفاً بنجاح، وفشل {fail}.','import.ok':'تم التحديث','import.failedRow':'فشل',
    'xls.id':'رقم المنتج','xls.name':'الاسم','xls.category':'الفئة','xls.price':'السعر','xls.qty':'الكمية بالمستودع','xls.threshold':'الحد الأدنى',
    'xls.sheetProducts':'المنتجات','xls.productsFilename':'قائمة-المنتجات-وادي-الخيام.xlsx',
    'xls.field':'البيان','xls.value':'القيمة','xls.fromDate':'من تاريخ','xls.toDate':'إلى تاريخ','xls.allTime':'كل الفترة',
    'xls.date':'التاريخ','xls.type':'النوع','xls.note':'ملاحظة','xls.sheetSummary':'ملخص','xls.sheetMovements':'الحركات','xls.sheetTop':'الأكثر حركة',
    'xls.reportFilename':'تقرير-وادي-الخيام.xlsx',
    'toast.moveSaved':'تم حفظ الحركة بنجاح','toast.moveSaveFailed':'تعذّر حفظ الحركة','toast.pickProductFirst':'اختر الصنف أولاً','toast.enterValidQty':'أدخل كمية صحيحة',
    'toast.productAdded':'تمت إضافة الصنف','toast.productExists':'هذا الصنف موجود بالفعل','toast.addFailed':'تعذّرت الإضافة',
    'toast.needOneItem':'أضف صنفاً واحداً على الأقل للفاتورة','toast.needValidQtyPerItem':'تأكد من إدخال كمية صحيحة لكل صنف','toast.enterInvoiceNo':'أدخل رقم الفاتورة',
    'toast.saleSaved':'تم حفظ الفاتورة وخصم الكمية من المخزون','toast.invoiceTaken':'رقم الفاتورة مستخدم بالفعل','toast.saleSaveFailed':'تعذّر حفظ الفاتورة',
    'toast.needUserPass':'أدخل اسم المستخدم وكلمة المرور','toast.passTooShort':'كلمة المرور 6 أحرف على الأقل','toast.saved':'تم الحفظ',
    'toast.usernameTaken':'اسم المستخدم مستخدم بالفعل','toast.saveFailed':'تعذّر الحفظ','toast.confirmDeleteUser':'هل أنت متأكد من حذف هذا المستخدم؟',
    'toast.bulkNameRequired':'أدخل اسم الصنف','toast.xlsxMissing':'تعذّر تحميل مكتبة إكسل — تحقق من اتصال الإنترنت وحاول مجدداً',
    'toast.exportDone':'تم تصدير الملف بنجاح','toast.importEmpty':'الملف فارغ أو غير صالح','toast.importNoValidRows':'لم يتم العثور على أعمدة رقم المنتج/الكمية في الملف',
    'toast.importFailed':'تعذّر استيراد الملف — تأكد من الصيغة','toast.logoTooLarge':'حجم الصورة كبير جداً (الحد الأقصى 1.3MB)','toast.logoSaved':'تم حفظ الشعار',
    'toast.logoSaveFailed':'تعذّر حفظ الشعار','toast.logoReset':'تمت استعادة الشعار الافتراضي',
    'move.title':'تسجيل حركة مخزون','move.sub':'سجّل صنفاً خرج من المستودع أو وصل إليه، وسيتم تحديث المخزون هنا ومزامنته مع سلة تلقائياً.',
    'move.type':'نوع الحركة','move.out':'صادر من المستودع','move.in':'وارد للمستودع','move.adjust':'تعديل جرد',
    'move.item':'الصنف','move.searchPlaceholder':'ابحث بالاسم أو رقم المنتج…','move.change':'تغيير',
    'move.qtyAfterCount':'الكمية الفعلية بعد الجرد','move.qty':'الكمية','move.noteOptional':'ملاحظة (اختياري)','move.notePlaceholder':'مثال: طلب رقم 1042','move.save':'حفظ الحركة',
    'add.title':'إضافة صنف غير مدرج','add.sub':'أدخل رقم المنتج كما يظهر في رابط المنتج بلوحة تحكم سلة حتى تتم مزامنة كمياته بشكل صحيح.',
    'add.name':'اسم الصنف','add.sallaId':'رقم المنتج في سلة','add.category':'الفئة','add.categoryPlaceholder':'مثال: خيام الرحلات','add.priceOptional':'السعر (اختياري)','add.openingQty':'الكمية الافتتاحية','add.save':'إضافة الصنف',
    'add.sallaIdOptionalHint':'اختياري لأصناف الكرتون/الباله — لن يتم ربط هذا الصنف بسلة.',
    'sale.title':'فاتورة بيع جديدة','sale.sub':'أصناف الفاتورة تُخصم مباشرة من مخزون المستودع وتُزامن مع سلة تلقائياً.',
    'sale.invoiceNo':'رقم الفاتورة','sale.customerOptional':'اسم العميل (اختياري)','sale.items':'أصناف الفاتورة','sale.addRow':'إضافة صنف آخر',
    'sale.searchPlaceholder':'ابحث عن صنف بالاسم أو الرقم…','sale.removeRow':'حذف السطر','sale.total':'الإجمالي','sale.save':'حفظ الفاتورة',
    'user.newTitle':'مستخدم جديد','user.editTitle':'تعديل مستخدم','user.editSub':'عدّل الدور أو الحالة أو أعد تعيين كلمة المرور.','user.newSub':'حدد اسم مستخدم وكلمة مرور ودور الحساب.',
    'user.username':'اسم المستخدم (بالإنجليزي، للدخول)','user.displayName':'الاسم الظاهر','user.role':'الدور',
    'user.roleManager':'مدير — تحكم كامل بالنظام','user.roleAccountant':'محاسب — حركات المخزون والفواتير','user.roleUser':'مستخدم — عرض فقط',
    'user.newPassword':'كلمة مرور جديدة (اتركها فارغة للإبقاء عليها)','user.password':'كلمة المرور','user.status':'الحالة','user.save':'حفظ',
  },
  en: {
    appName:'Wadie Alkhiam Est.', appSub:'Warehouse Inventory Management', systemTitle:'Inventory Management System',
    loginSub:'Sign in to access the inventory management system', username:'Username', password:'Password',
    loginBtn:'Sign In', loginErr:'Incorrect username or password',
    'nav.dashboard':'Dashboard','nav.stock':'Stock','nav.sales':'Sales','nav.movements':'Movement Log',
    'nav.store':'Store Performance','nav.reports':'Reports','nav.sync':'Sync','nav.settings':'Settings','nav.bulk':'Bulk Items',
    'title.store':'Store Performance on Salla','title.reports':'Reports & Analytics','title.sync':'Salla Sync','title.bulk':'Bulk Items (Pallet / Carton)',
    'role.manager':'Manager','role.accountant':'Accountant','role.user':'User',
    'sidebar.syncedAll':'All movements synced', 'sidebar.pendingSync':'{n} movement(s) pending sync', logout:'Log Out',
    'theme.toggle':'Toggle light/dark mode', 'lang.toggle':'التبديل للعربية',
    searchPlaceholder:'Search for an item by name…', recordMove:'Record Movement',
    welcome:'Welcome back, {name}',
    footerNote:'Wadie Alkhiam Est. — Internal warehouse inventory system · Auto-synced with Salla',
    save:'Save', cancel:'Cancel', close:'Close',
    'kpi.totalProducts':'Total Items','kpi.totalQty':'Total Warehouse Quantity','kpi.todayMoves':"Today's Movements",
    'kpi.lowStockAlerts':'Low Stock Alerts','kpi.lastSync':'Last Salla Sync','kpi.neverSynced':'Not yet',
    'kpi.totalIn':'Total Inbound','kpi.totalOut':'Total Outbound','kpi.totalMovesCount':'Total Movements',
    'kpi.totalSalesValue':'Total Sales Value (Period)','kpi.totalInvoices':'Invoice Count (Period)',
    onboardTitle:'Complete the initial stock count', onboardSub:'{n} of {total} items counted ({pct}%) — enter current quantity from the "Stock" screen.',
    openStockScreen:'Open Stock Screen',
    'chart.movement14':'Stock Movement (In vs Out) — Last 14 Days','chart.catDist':'Items by Category','chart.catDistSub':'Number of products per category',
    lowStockAlertsTitle:'Low Stock Alerts', viewAll:'View All', mostActive:'Most Active', viewLog:'View Log',
    'empty.noLowStockTitle':'No low-stock items','empty.noLowStockSub':'All counted items are currently above their minimum threshold.',
    'empty.noMovesTitle':'No movements recorded yet','empty.noMovesSub':'The most active products will appear here once the first in/out movement is recorded.',
    'th.item':'Item','th.category':'Category','th.price':'Price','th.warehouseQty':'Warehouse Qty','th.status':'Status',
    'th.remaining':'Remaining','th.minThreshold':'Min Threshold','th.productId':'Product ID','th.notes':'Note','th.actions':'',
    'th.date':'Date','th.type':'Type','th.qty':'Qty','th.note':'Note','th.error':'Error',
    'th.invoiceNo':'Invoice No.','th.customer':'Customer','th.itemCount':'Items','th.total':'Total',
    'stock.allCategories':'All Categories','stock.allStates':'All Stock States','stock.countOf':'{n} of {total} items',
    'stock.none':'Not Counted','stock.ok':'In Stock','stock.low':'Low','stock.out':'Out of Stock',
    'stock.exportExcel':'Export Excel','stock.importExcel':'Import Stock Update','stock.addUnlisted':'Add Unlisted Item','stock.move':'Move',
    'empty.noResultsTitle':'No results','empty.noResultsSub':'Try adjusting your search term or filters.',
    'sales.totalInvoices':'Total Invoices','sales.totalValue':'Total Sales Value','sales.todaySales':"Today's Sales ({n} invoices)",
    'sales.hint':'Sales invoices that draw directly from warehouse stock','sales.newSale':'New Sale Invoice','sales.synced':'Synced','sales.pending':'Pending','sales.details':'Details',
    'empty.noSalesTitle':'No sale invoices yet','empty.noSalesSub':'Use the "New Sale Invoice" button to record the first sale drawn directly from warehouse stock.',
    'sale.priceLabel':'Price','sale.qtyLabel':'Qty',
    'sale.priceHint':"You can edit the price shown next to each item's quantity for wholesale sales — the prices shown by default are the store's retail prices.",
    'movements.recordedCount':'{n} movements recorded (last 500)',
    'type.in':'Inbound','type.out':'Outbound','type.adjust':'Count Adjustment',
    'empty.noMovementsTitle':'No movements recorded yet','empty.noMovementsSub':'Use the "Record Movement" button at the top of the page.',
    'reports.from':'From date','reports.to':'To date','reports.reset':'Reset','reports.exportReport':'Export Report (Excel)','reports.exportProducts':'Export Product List',
    'reports.dataNote':'This report is based on the most recent 500 loaded stock movements and all loaded invoices. Leave both fields empty to show all time.',
    'reports.trend14':'Stock movement over the last 14 days (not affected by filter)',
    'reports.restockTitle':'Items Needing Restock',
    'empty.noDataYetTitle':'No data yet','empty.noDataYetSub':'The most active items in the selected period will appear here.',
    'empty.allGoodTitle':'Nothing needs your attention right now','empty.allGoodSub':'All counted items are within safe limits.',
    'store.waitingTitle':"Store performance data hasn't arrived yet",'store.waitingSub':"This screen updates automatically every hour from your store's real Salla sales data via the sync job. If it stays empty for a long time, reach out and I'll check it.",
    'store.salesKpi':'Store Sales ({n} days)','store.totalOrders':'Total Orders','store.lastUpdate':'Last Salla Data Update',
    'store.dailyTitle':'Daily Store Sales','store.dailySub':'Actual data from Salla orders','store.topTitle':'Best-Selling Products in Store',
    'th.qtySold':'Qty Sold','th.revenue':'Revenue','store.perfNote':'This data updates automatically every hour from your live Salla store',
    'sync.lastSuccess':'Last Successful Salla Sync','sync.neverSynced':'No sync has happened yet','sync.pendingCount':'Movements Pending Sync',
    'sync.howTitle':'How does syncing with Salla work?',
    'sync.howBody':'Every outbound/inbound movement or sale invoice recorded here is saved instantly in the system database, then automatically synced every hour with the actual product quantity on your Salla store via a scheduled job — reflecting quantity increases or decreases directly on Salla with no manual intervention.',
    'sync.failedTitle':'Movements That Failed to Sync',
    'settings.usersTitle':'Users','settings.usersHint':'Manage login accounts: Manager (full control), Accountant (stock movements & invoices), User (view only).',
    'settings.newUser':'New User','settings.name':'Name','settings.username':'Username','settings.role':'Role','settings.status':'Status',
    'settings.active':'Active','settings.disabled':'Disabled','settings.managerOnlyTitle':'This page is for managers only','settings.managerOnlySub':'You do not have permission to access system settings.',
    'settings.logoTitle':'Company Logo','settings.logoHint':'The logo currently shown across the system (the official logo by default). You can upload a custom logo to replace it.',
    'settings.uploadLogo':'Upload New Logo','settings.resetLogo':'Restore Default Logo',
    'unit.piece':'Piece','unit.carton':'Carton','unit.pallet':'Pallet','unit.type':'Unit Type','unit.perBundle':'Units per Bundle',
    'th.unit':'Unit','th.totalPieces':'Total Pieces','addProduct.notLinkedHint':'Carton/pallet items are not linked or synced to Salla automatically.',
    'channel.store':'Store','channel.warehouse':'Warehouse','th.channel':'Channel','sale.channel':'Channel','sale.channelHint':'Choose whether this invoice is a sale from the store or from the warehouse — stock is deducted either way.',
    'dash.storeOutToday':'Store Outbound Today','dash.warehouseOutToday':'Warehouse Outbound Today','dash.invoicesCount':'{n} invoices',
    'print.invoiceTitle':'Sales Invoice','print.date':'Date','print.customer':'Customer','print.channel':'Channel','print.item':'Item','print.qty':'Qty','print.price':'Price','print.total':'Total','print.grandTotal':'Grand Total','print.printBtn':'Print A4',
    'bulk.hint':'Items sold by pallet or carton in bulk — shown here only for internal stock tracking, and not synced to your Salla store.',
    'bulk.add':'Add Bulk Item','bulk.unitType':'Unit Type','bulk.unitsPerBundle':'Units per Bundle','bulk.bundleCount':'Bundles Available',
    'bulk.totalUnits':'Total Units','bulk.refPrice':'Reference Retail Price','bulk.pallet':'Pallet','bulk.carton':'Carton',
    'bulk.emptyTitle':'No bulk items recorded yet','bulk.emptySub':'Use the "Add Bulk Item" button to record the first item sold by pallet or carton.',
    'bulk.addTitle':'Add Bulk Item','bulk.editTitle':'Edit Bulk Item','bulk.modalSub':'These items are for internal stock tracking only and are not shown on your Salla store.',
    'bulk.name':'Item Name','bulk.catPlaceholder':'e.g. Wholesale Tents','bulk.confirmDelete':'Are you sure you want to delete this item?',
    'import.resultTitle':'Import Result','import.resultSub':'{ok} item(s) updated successfully, {fail} failed.','import.ok':'Updated','import.failedRow':'Failed',
    'xls.id':'Product ID','xls.name':'Name','xls.category':'Category','xls.price':'Price','xls.qty':'Warehouse Qty','xls.threshold':'Min Threshold',
    'xls.sheetProducts':'Products','xls.productsFilename':'wadi-alkhiam-product-list.xlsx',
    'xls.field':'Field','xls.value':'Value','xls.fromDate':'From date','xls.toDate':'To date','xls.allTime':'All time',
    'xls.date':'Date','xls.type':'Type','xls.note':'Note','xls.sheetSummary':'Summary','xls.sheetMovements':'Movements','xls.sheetTop':'Most Active',
    'xls.reportFilename':'wadi-alkhiam-report.xlsx',
    'toast.moveSaved':'Movement saved successfully','toast.moveSaveFailed':'Could not save the movement','toast.pickProductFirst':'Choose an item first','toast.enterValidQty':'Enter a valid quantity',
    'toast.productAdded':'Item added','toast.productExists':'This item already exists','toast.addFailed':'Could not add the item',
    'toast.needOneItem':'Add at least one item to the invoice','toast.needValidQtyPerItem':'Make sure each item has a valid quantity','toast.enterInvoiceNo':'Enter the invoice number',
    'toast.saleSaved':'Invoice saved and quantity deducted from stock','toast.invoiceTaken':'This invoice number is already used','toast.saleSaveFailed':'Could not save the invoice',
    'toast.needUserPass':'Enter a username and password','toast.passTooShort':'Password must be at least 6 characters','toast.saved':'Saved',
    'toast.usernameTaken':'This username is already taken','toast.saveFailed':'Could not save','toast.confirmDeleteUser':'Are you sure you want to delete this user?',
    'toast.bulkNameRequired':'Enter the item name','toast.xlsxMissing':'Could not load the Excel library — check your internet connection and try again',
    'toast.exportDone':'File exported successfully','toast.importEmpty':'The file is empty or invalid','toast.importNoValidRows':'Could not find product ID/quantity columns in the file',
    'toast.importFailed':'Could not import the file — check the format','toast.logoTooLarge':'Image is too large (max 1.3MB)','toast.logoSaved':'Logo saved',
    'toast.logoSaveFailed':'Could not save the logo','toast.logoReset':'Default logo restored',
    'move.title':'Record Stock Movement','move.sub':'Record an item leaving or arriving at the warehouse — stock will update here and sync with Salla automatically.',
    'move.type':'Movement Type','move.out':'Outbound','move.in':'Inbound','move.adjust':'Count Adjustment',
    'move.item':'Item','move.searchPlaceholder':'Search by name or product ID…','move.change':'Change',
    'move.qtyAfterCount':'Actual quantity after count','move.qty':'Quantity','move.noteOptional':'Note (optional)','move.notePlaceholder':'e.g. Order #1042','move.save':'Save Movement',
    'add.title':'Add Unlisted Item','add.sub':'Enter the product ID as it appears in the product link on the Salla dashboard so its quantity syncs correctly.',
    'add.name':'Item Name','add.sallaId':'Product ID on Salla','add.category':'Category','add.categoryPlaceholder':'e.g. Camping Tents','add.priceOptional':'Price (optional)','add.openingQty':'Opening Quantity','add.save':'Add Item',
    'add.sallaIdOptionalHint':'Optional for carton/pallet items — this item will not be linked to Salla.',
    'sale.title':'New Sale Invoice','sale.sub':'Invoice items are deducted directly from warehouse stock and synced with Salla automatically.',
    'sale.invoiceNo':'Invoice Number','sale.customerOptional':'Customer Name (optional)','sale.items':'Invoice Items','sale.addRow':'Add Another Item',
    'sale.searchPlaceholder':'Search for an item by name or ID…','sale.removeRow':'Remove Row','sale.total':'Total','sale.save':'Save Invoice',
    'user.newTitle':'New User','user.editTitle':'Edit User','user.editSub':'Edit the role, status, or reset the password.','user.newSub':'Set a username, password, and account role.',
    'user.username':'Username (English, for login)','user.displayName':'Display Name','user.role':'Role',
    'user.roleManager':'Manager — full system control','user.roleAccountant':'Accountant — stock movements & invoices','user.roleUser':'User — view only',
    'user.newPassword':'New password (leave blank to keep it)','user.password':'Password','user.status':'Status','user.save':'Save',
  },
};
function t(key, vars){
  let s = (I18N[LANG] && I18N[LANG][key]) ?? I18N.ar[key] ?? key;
  if(vars) Object.keys(vars).forEach(k=>{ s = s.replace(new RegExp('\\{'+k+'\\}','g'), vars[k]); });
  return s;
}
function initLang(){
  try{ LANG = localStorage.getItem('wadi_lang') || 'ar'; }catch(e){ LANG = 'ar'; }
  applyLangAttrs();
}
function applyLangAttrs(){
  document.documentElement.dir = LANG==='en' ? 'ltr' : 'rtl';
  document.documentElement.lang = LANG==='en' ? 'en' : 'ar';
}
function setLang(l){
  LANG = l;
  try{ localStorage.setItem('wadi_lang', l); }catch(e){}
  applyLangAttrs();
  if(me) renderShell(); else renderLogin();
}

/* ============ THEME (light/dark) ============ */
let THEME = 'system';
function effectiveTheme(){
  if(THEME==='light'||THEME==='dark') return THEME;
  try{ return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'; }
  catch(e){ return 'light'; }
}
function initTheme(){
  try{ THEME = localStorage.getItem('wadi_theme') || 'system'; }catch(e){ THEME = 'system'; }
  applyThemeAttrs();
}
function applyThemeAttrs(){
  if(THEME==='light'||THEME==='dark') document.documentElement.setAttribute('data-theme', THEME);
  else document.documentElement.removeAttribute('data-theme');
}
function toggleTheme(){
  THEME = effectiveTheme()==='dark' ? 'light' : 'dark';
  try{ localStorage.setItem('wadi_theme', THEME); }catch(e){}
  applyThemeAttrs();
  if(me) renderShell(); else renderLogin();
}
function themeToggleHtml(){
  const isDark = effectiveTheme()==='dark';
  return `<button type="button" class="glass-btn" id="theme-toggle-btn" title="${t('theme.toggle')}">${icon(isDark?'sun':'moon',17)}</button>`;
}
function langToggleCompactHtml(){
  return `<button type="button" class="glass-btn" id="lang-toggle-btn" title="${t('lang.toggle')}">${icon('globe',17)}</button>`;
}
function tabTitle(key){
  return {
    dashboard:t('nav.dashboard'), stock:t('nav.stock'), sales:t('nav.sales'), movements:t('nav.movements'),
    store:t('title.store'), reports:t('title.reports'), sync:t('title.sync'), settings:t('nav.settings'),
  }[key] || '';
}
function roleLabel(role){ return {manager:t('role.manager'), accountant:t('role.accountant'), user:t('role.user')}[role] || role; }
function langToggleHtml(){
  return `<div class="lang-toggle">${icon('globe',13)}
    <button type="button" data-lang="ar" class="${LANG==='ar'?'active':''}">العربية</button>
    <button type="button" data-lang="en" class="${LANG==='en'?'active':''}">English</button>
  </div>`;
}

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
let appLogo = null;
let products = [], movements = [], sales = [], summary = {}, categories = [], topProducts = [], lowStock = [], storeSales = null, users = [];
let ui = { tab:'dashboard', search:'', catFilter:'', stockFilter:'', modal:null, reportFrom:'', reportTo:'' };

function todayStr(){ return new Date().toISOString().slice(0,10); }

/* ============ LOGO ============ */
async function loadLogo(){
  try{ const d = await fetch('/api/settings/logo',{credentials:'same-origin'}).then(r=>r.json()); appLogo = d.logo || null; }
  catch(e){ appLogo = null; }
}
function logoMarkHtml(){
  if(appLogo) return `<img src="${appLogo}" alt="logo" />`;
  return `<img class="logo-light" src="/assets/logo-navy-mark.png" alt="logo" /><img class="logo-dark" src="/assets/logo-gold-mark.png" alt="logo" />`;
}
function logoFullHtml(){
  if(appLogo) return `<img src="${appLogo}" alt="${escAttr(t('appName'))}" />`;
  return `<img class="logo-light" src="/assets/logo-navy-full.png" alt="${escAttr(t('appName'))}" /><img class="logo-dark" src="/assets/logo-gold-full.png" alt="${escAttr(t('appName'))}" />`;
}

/* ============ BOOT ============ */
async function boot(){
  initLang();
  initTheme();
  await loadLogo();
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
      <div style="display:flex;justify-content:center;align-items:center;gap:8px;margin-bottom:16px;">${langToggleHtml()}${themeToggleHtml()}</div>
      <div class="login-mark has-logo">${logoFullHtml()}</div>
      <h1 style="font-size:14.5px;color:var(--ink-2);font-weight:600;">${t('systemTitle')}</h1>
      <div class="sub">${t('loginSub')}</div>
      <div class="login-err" id="login-err"></div>
      <form id="login-form">
        <div class="field"><label>${t('username')}</label><input id="login-username" autocomplete="username" required /></div>
        <div class="field"><label>${t('password')}</label><input id="login-password" type="password" autocomplete="current-password" required /></div>
        <button class="btn btn-accent" type="submit">${icon('lock',15)} ${t('loginBtn')}</button>
      </form>
      <div class="dev-credit">Developed by Mohamed Emad</div>
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
      errEl.textContent = t('loginErr');
      errEl.classList.add('show');
    }
  });
  document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click', ()=>setLang(b.getAttribute('data-lang'))));
  const loginTh = document.getElementById('theme-toggle-btn');
  if(loginTh) loginTh.addEventListener('click', toggleTheme);
}

/* ============ NAV / SHELL ============ */
function navItems(){
  const items = [
    {key:'dashboard', label:t('nav.dashboard'), icon:'home'},
    {key:'stock', label:t('nav.stock'), icon:'box'},
    {key:'sales', label:t('nav.sales'), icon:'receipt'},
    {key:'movements', label:t('nav.movements'), icon:'list'},
    {key:'store', label:t('nav.store'), icon:'storeline'},
    {key:'reports', label:t('nav.reports'), icon:'chart'},
    {key:'sync', label:t('nav.sync'), icon:'sync2'},
  ];
  if(me.role==='manager') items.push({key:'settings', label:t('nav.settings'), icon:'users'});
  return items;
}
function canWrite(){ return me.role==='manager' || me.role==='accountant'; }

function renderShellHTML(){
  const navHtml = navItems().map(n=>`
    <button class="nav-item ${ui.tab===n.key?'active':''}" data-nav="${n.key}">${icon(n.icon,19)}<span>${n.label}</span></button>`).join('');
  const unsynced = movements.filter(m=>!m.synced).length;
  return `
  <div class="sidebar glass">
    <div class="brand">
      <div class="brand-mark has-logo">${logoMarkHtml()}</div>
      <div><div class="brand-name">${escHtml(t('appName'))}</div><div class="brand-sub">${t('appSub')}</div></div>
    </div>
    <div class="nav">${navHtml}</div>
    <div class="nav-foot">
      <div class="role-chip"><span class="dot"></span>${escHtml(me.display_name)} · ${roleLabel(me.role)}</div>
      <div class="role-chip">${icon('sync2',13)} ${unsynced>0? t('sidebar.pendingSync',{n:unsynced}) : t('sidebar.syncedAll')}</div>
    </div>
  </div>
  <div class="main">
    <div class="topbar glass">
      <h1>${tabTitle(ui.tab)}</h1>
      <div class="topbar-actions">
        <div class="search-box">${icon('search',15)}<input id="global-search" placeholder="${t('searchPlaceholder')}" value="${escAttr(ui.search)}" /></div>
        <div class="icon-actions">
          ${themeToggleHtml()}
          ${langToggleCompactHtml()}
          <button type="button" class="glass-btn" id="logout-btn" title="${t('logout')}">${icon('logout',17)}</button>
        </div>
        <button class="btn btn-accent" id="open-move" ${canWrite()?'':'disabled'}>${icon('plus',16)} ${t('recordMove')}</button>
      </div>
    </div>
    <div id="view">${renderView()}</div>
    <div class="footer-note">${t('footerNote')}</div>
    <div class="dev-credit">Developed by Mohamed Emad</div>
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
  const th = document.getElementById('theme-toggle-btn');
  if(th) th.addEventListener('click', toggleTheme);
  const lg = document.getElementById('lang-toggle-btn');
  if(lg) lg.addEventListener('click', ()=>setLang(LANG==='ar'?'en':'ar'));
  document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click', ()=>setLang(b.getAttribute('data-lang'))));
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
  const welcome = `<div class="welcome-line">${t('welcome',{name:'<b>'+escHtml(me.display_name)+'</b>'})}</div>`;
  const kpis = `
  <div class="grid kpis">
    <div class="glass kpi"><div class="kpi-icon">${icon('box',18)}</div><div class="kpi-val">${fmtNum(summary.total_products)}</div><div class="kpi-label">${t('kpi.totalProducts')}</div></div>
    <div class="glass kpi"><div class="kpi-icon">${icon('check',18)}</div><div class="kpi-val">${fmtNum(summary.total_qty)}</div><div class="kpi-label">${t('kpi.totalQty')}</div></div>
    <div class="glass kpi"><div class="kpi-icon">${icon('list',18)}</div><div class="kpi-val">${fmtNum(summary.today_moves)}</div><div class="kpi-label">${t('kpi.todayMoves')}</div></div>
    <div class="glass kpi"><div class="kpi-icon" style="${summary.low_stock?'background:var(--crit-soft);color:var(--crit)':''}">${icon('alert',18)}</div><div class="kpi-val">${fmtNum(summary.low_stock)}</div><div class="kpi-label">${t('kpi.lowStockAlerts')}</div></div>
    <div class="glass kpi"><div class="kpi-icon">${icon('sync2',18)}</div><div class="kpi-val" style="font-size:15px;">${summary.last_sync_at? fmtDate(summary.last_sync_at): t('kpi.neverSynced')}</div><div class="kpi-label">${t('kpi.lastSync')}</div></div>
  </div>`;
  const onboarding = summary.inventoried < summary.total_products ? `
  <div class="glass banner" style="margin-top:16px;">
    <div class="banner-icon">${icon('edit',20)}</div>
    <div style="flex:1;">
      <div class="banner-title">${t('onboardTitle')}</div>
      <div class="banner-sub">${t('onboardSub',{n:summary.inventoried,total:summary.total_products,pct:invPct})}</div>
      <div style="display:flex;align-items:center;gap:10px;margin-top:10px;">
        <div class="progress-wrap"><div class="progress-bar" style="width:${invPct}%"></div></div>
        <button class="btn btn-sm" data-nav="stock">${t('openStockScreen')}</button>
      </div>
    </div>
  </div>` : '';
  const donut = donutChart(categories);
  const barChart = topProducts.length? topProducts.map((p,i)=>`
    <div class="bar-row"><div class="bar-label">${escHtml(p.name)}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${topProducts[0].qty? (p.qty/topProducts[0].qty*100):0}%;background:${catColor(i%8)}"></div></div>
      <div class="bar-val">${fmtNum(p.qty)}</div></div>`).join('') : emptyState('list',t('empty.noMovesTitle'),t('empty.noMovesSub'));
  const lowHtml = lowStock.length? `<table><thead><tr><th>${t('th.item')}</th><th>${t('th.category')}</th><th class="num">${t('th.remaining')}</th><th class="num">${t('th.minThreshold')}</th></tr></thead><tbody>
    ${lowStock.slice(0,6).map(p=>`<tr><td class="prod-name">${escHtml(p.name)}</td><td class="muted">${escHtml(p.category)}</td><td class="num" style="color:${p.stock<=0?'var(--crit)':'var(--warn)'};font-weight:700;">${fmtNum(p.stock)}</td><td class="num muted">${fmtNum(p.threshold)}</td></tr>`).join('')}
    </tbody></table>` : emptyState('check',t('empty.noLowStockTitle'),t('empty.noLowStockSub'));
  const storeOut = summary.today_store_out || {invoices:0, qty:0, value:0};
  const whOut = summary.today_warehouse_out || {invoices:0, qty:0, value:0};
  const channelStats = `
  <div class="grid row2" style="margin-top:16px;">
    <div class="glass card">
      <div class="card-head"><div class="card-title">${t('dash.storeOutToday')}</div></div>
      <div class="grid row-eq">
        <div class="glass kpi"><div class="kpi-icon" style="background:var(--good-soft);color:var(--good);">${icon('storeline',18)}</div><div class="kpi-val">${fmtNum(storeOut.qty)}</div><div class="kpi-label">${t('th.qty')}</div></div>
        <div class="glass kpi"><div class="kpi-icon">${icon('receipt',18)}</div><div class="kpi-val">${fmtNum(storeOut.invoices)}</div><div class="kpi-label">${t('th.invoiceNo')}</div></div>
        <div class="glass kpi"><div class="kpi-icon">${icon('check',18)}</div><div class="kpi-val">${fmtNum(storeOut.value)} SAR</div><div class="kpi-label">${t('th.total')}</div></div>
      </div>
    </div>
    <div class="glass card">
      <div class="card-head"><div class="card-title">${t('dash.warehouseOutToday')}</div></div>
      <div class="grid row-eq">
        <div class="glass kpi"><div class="kpi-icon">${icon('box',18)}</div><div class="kpi-val">${fmtNum(whOut.qty)}</div><div class="kpi-label">${t('th.qty')}</div></div>
        <div class="glass kpi"><div class="kpi-icon">${icon('receipt',18)}</div><div class="kpi-val">${fmtNum(whOut.invoices)}</div><div class="kpi-label">${t('th.invoiceNo')}</div></div>
        <div class="glass kpi"><div class="kpi-icon">${icon('check',18)}</div><div class="kpi-val">${fmtNum(whOut.value)} SAR</div><div class="kpi-label">${t('th.total')}</div></div>
      </div>
    </div>
  </div>`;
  return `${welcome}${kpis}${onboarding}${channelStats}
  <div class="grid row2" style="margin-top:16px;">
    <div class="glass card"><div class="card-head"><div class="card-title">${t('chart.movement14')}</div></div>${areaChart()}</div>
    <div class="glass card"><div class="card-head"><div><div class="card-title">${t('chart.catDist')}</div><div class="card-sub">${t('chart.catDistSub')}</div></div></div>${donut}</div>
  </div>
  <div class="grid row2" style="margin-top:16px;">
    <div class="glass card"><div class="card-head"><div class="card-title">${t('lowStockAlertsTitle')}</div><button class="btn btn-sm btn-ghost" data-nav="stock">${t('viewAll')}</button></div>${lowHtml}</div>
    <div class="glass card"><div class="card-head"><div class="card-title">${t('mostActive')}</div><button class="btn btn-sm btn-ghost" data-nav="movements">${t('viewLog')}</button></div>${barChart}</div>
  </div>`;
}

/* ============ STOCK ============ */
function stockStatus(p){
  if(p.stock===null||p.stock===undefined) return {key:'none',label:t('stock.none'),cls:'pill-muted'};
  if(p.stock<=0) return {key:'out',label:t('stock.out'),cls:'pill-crit'};
  if(p.stock<=p.threshold) return {key:'low',label:t('stock.low'),cls:'pill-warn'};
  return {key:'ok',label:t('stock.ok'),cls:'pill-good'};
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
      <select class="filter" id="cat-filter"><option value="">${t('stock.allCategories')}</option>${cats.map(c=>`<option value="${escAttr(c)}" ${ui.catFilter===c?'selected':''}>${escHtml(c)}</option>`).join('')}</select>
      <select class="filter" id="stock-filter">
        <option value="">${t('stock.allStates')}</option>
        <option value="none" ${ui.stockFilter==='none'?'selected':''}>${t('stock.none')}</option>
        <option value="ok" ${ui.stockFilter==='ok'?'selected':''}>${t('stock.ok')}</option>
        <option value="low" ${ui.stockFilter==='low'?'selected':''}>${t('stock.low')}</option>
        <option value="out" ${ui.stockFilter==='out'?'selected':''}>${t('stock.out')}</option>
      </select>
      <span class="muted" style="font-size:12px;">${t('stock.countOf',{n:filteredProducts().length,total:products.length})}</span>
      <span style="flex:1;"></span>
      <button class="btn btn-sm" id="export-products-xlsx">${icon('download',14)} ${t('stock.exportExcel')}</button>
      ${canWrite()? `<button class="btn btn-sm" id="trigger-import-stock">${icon('upload',14)} ${t('stock.importExcel')}</button>
      <input type="file" accept=".xlsx,.xls,.csv" class="import-input" id="import-stock-input" />` : ''}
      <button class="btn btn-sm btn-accent" id="open-add-product" ${canWrite()?'':'disabled'}>${icon('plus',14)} ${t('stock.addUnlisted')}</button>
    </div>
    <div id="stock-results">${renderStockRows()}</div>
  </div>`;
}
function unitLabel(unitType){
  return unitType==='pallet'? t('unit.pallet') : unitType==='carton'? t('unit.carton') : t('unit.piece');
}
function renderStockRows(){
  const list = filteredProducts();
  if(!list.length) return emptyState('search',t('empty.noResultsTitle'),t('empty.noResultsSub'));
  return `<div style="overflow-x:auto;"><table><thead><tr>
    <th>${t('th.item')}</th><th>${t('th.category')}</th><th>${t('th.unit')}</th><th class="num">${t('th.price')}</th><th class="num">${t('th.warehouseQty')}</th><th class="num">${t('th.totalPieces')}</th><th>${t('th.status')}</th><th></th>
  </tr></thead><tbody>
  ${list.map(p=>{
    const st = stockStatus(p);
    const unitType = p.unit_type || 'piece';
    const bundle = Number(p.units_per_bundle||1);
    const totalPieces = unitType==='piece' ? null : (p.stock===null? null : Number(p.stock)*bundle);
    return `<tr>
      <td><div class="prod-cell">
        <div class="cat-icon" style="background:color-mix(in srgb, ${catColor(p.cat_rank)} 18%, transparent);color:${catColor(p.cat_rank)};">${icon(p.icon,15)}</div>
        <div><div class="prod-name">${escHtml(p.name)}</div><div class="prod-meta">#${p.id}</div></div>
      </div></td>
      <td class="muted">${escHtml(p.category)}</td>
      <td><span class="unit-badge ${unitType==='pallet'?'unit-pallet':unitType==='carton'?'unit-carton':''}">${unitLabel(unitType)}</span></td>
      <td class="num">${fmtNum(p.price)} SAR</td>
      <td class="num" style="font-weight:700;">${fmtNum(p.stock)}</td>
      <td class="num muted">${totalPieces===null? '—' : fmtNum(totalPieces)}</td>
      <td><span class="pill ${st.cls}">${icon(st.key==='ok'?'check':st.key==='none'?'edit':'alert',11)} ${st.label}</span></td>
      <td><button class="btn btn-sm btn-ghost" data-quick-move="${p.id}" ${canWrite()?'':'disabled'}>${icon('edit',13)} ${t('stock.move')}</button></td>
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
    <div class="glass kpi"><div class="kpi-icon">${icon('receipt',18)}</div><div class="kpi-val">${fmtNum(sales.length)}</div><div class="kpi-label">${t('sales.totalInvoices')}</div></div>
    <div class="glass kpi"><div class="kpi-icon" style="background:var(--good-soft);color:var(--good);">${icon('check',18)}</div><div class="kpi-val">${fmtNum(totalAll)} SAR</div><div class="kpi-label">${t('sales.totalValue')}</div></div>
    <div class="glass kpi"><div class="kpi-icon">${icon('arrowup',18)}</div><div class="kpi-val">${fmtNum(todayTotal)} SAR</div><div class="kpi-label">${t('sales.todaySales',{n:todaySales.length})}</div></div>
  </div>
  <div class="glass card" style="margin-top:16px;">
    <div class="controls-row">
      <span class="muted" style="font-size:12px;">${t('sales.hint')}</span>
      <span style="flex:1;"></span>
      <button class="btn btn-sm btn-accent" id="open-sale" ${canWrite()?'':'disabled'}>${icon('plus',14)} ${t('sales.newSale')}</button>
    </div>
    ${sales.length? `<div style="overflow-x:auto;"><table><thead><tr>
      <th>${t('th.invoiceNo')}</th><th>${t('th.date')}</th><th>${t('th.customer')}</th><th>${t('th.channel')}</th><th class="num">${t('th.itemCount')}</th><th class="num">${t('th.total')}</th><th>${t('th.status')}</th><th></th>
    </tr></thead><tbody>
    ${sales.map(s=>`<tr>
        <td class="prod-name">${escHtml(s.invoice_no)}</td>
        <td class="muted" style="white-space:nowrap;">${fmtDate(s.ts)}</td>
        <td class="muted">${escHtml(s.customer||'—')}</td>
        <td><span class="pill ${s.channel==='store'?'pill-good':'pill-muted'}">${s.channel==='store'?t('channel.store'):t('channel.warehouse')}</span></td>
        <td class="num">${s.item_count}</td>
        <td class="num" style="font-weight:700;">${fmtNum(s.total)} SAR</td>
        <td>${s.synced? `<span class="pill pill-good">${icon('check',11)} ${t('sales.synced')}</span>` : `<span class="pill pill-muted">${icon('clock',11)} ${t('sales.pending')}</span>`}</td>
        <td><button class="btn btn-sm btn-ghost" data-view-sale="${s.id}">${icon('eye',13)} ${t('sales.details')}</button></td>
      </tr>`).join('')}
    </tbody></table></div>` : emptyState('receipt',t('empty.noSalesTitle'),t('empty.noSalesSub'))}
  </div>`;
}

/* ============ MOVEMENTS ============ */
function viewMovements(){
  const list = movements;
  return `
  <div class="glass card">
    <div class="controls-row"><span class="muted" style="font-size:12px;">${t('movements.recordedCount',{n:list.length})}</span></div>
    ${list.length? `<div style="overflow-x:auto;"><table><thead><tr>
      <th>${t('th.date')}</th><th>${t('th.item')}</th><th>${t('th.type')}</th><th class="num">${t('th.qty')}</th><th>${t('th.note')}</th><th>${t('th.status')}</th>
    </tr></thead><tbody>
    ${list.map(m=>{
      const typeInfo = m.type==='in'? {l:t('type.in'),c:'pill-good',i:'arrowdown'} : m.type==='out'? {l:t('type.out'),c:'pill-crit',i:'arrowup'} : {l:t('type.adjust'),c:'pill-muted',i:'edit'};
      return `<tr>
        <td class="muted" style="white-space:nowrap;">${fmtDate(m.ts)}</td>
        <td class="prod-name">${escHtml(m.product_name)}</td>
        <td><span class="pill ${typeInfo.c}">${icon(typeInfo.i,11)} ${typeInfo.l}</span></td>
        <td class="num" style="font-weight:700;">${fmtNum(m.qty)}</td>
        <td class="muted">${escHtml(m.note||'—')}</td>
        <td>${m.synced? `<span class="pill pill-good">${icon('check',11)} ${t('sales.synced')}</span>` : m.sync_error? `<span class="pill pill-crit">${icon('alert',11)} فشل</span>` : `<span class="pill pill-muted">${icon('clock',11)} ${t('sales.pending')}</span>`}</td>
      </tr>`;
    }).join('')}
    </tbody></table></div>` : emptyState('list',t('empty.noMovementsTitle'),t('empty.noMovementsSub'))}
  </div>`;
}

/* ============ REPORTS ============ */
function reportDateRange(){ return {from: ui.reportFrom||null, to: ui.reportTo||null}; }
function inReportRange(dateStr){
  const {from,to} = reportDateRange();
  const d = (dateStr||'').slice(0,10);
  if(from && d<from) return false;
  if(to && d>to) return false;
  return true;
}
function filteredMovementsForReport(){ return movements.filter(m=>inReportRange(m.ts)); }
function filteredSalesForReport(){ return sales.filter(s=>inReportRange(s.ts)); }
function topProductsForReport(fm){
  const map = {};
  fm.forEach(m=>{ map[m.product_name] = (map[m.product_name]||0) + Number(m.qty); });
  return Object.entries(map).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([name,qty])=>({name,qty}));
}
function viewReports(){
  const fm = filteredMovementsForReport();
  const fs = filteredSalesForReport();
  const inCount = fm.filter(m=>m.type==='in').reduce((s,m)=>s+Number(m.qty),0);
  const outCount = fm.filter(m=>m.type==='out').reduce((s,m)=>s+Number(m.qty),0);
  const salesTotal = fs.reduce((s,v)=>s+Number(v.total),0);
  const topFiltered = topProductsForReport(fm);
  return `
  <div class="glass card" style="margin-bottom:16px;">
    <div class="controls-row">
      <div class="field" style="margin:0;"><label>${t('reports.from')}</label><input type="date" class="filter" id="report-from" value="${escAttr(ui.reportFrom||'')}" /></div>
      <div class="field" style="margin:0;"><label>${t('reports.to')}</label><input type="date" class="filter" id="report-to" value="${escAttr(ui.reportTo||'')}" /></div>
      <button class="btn btn-sm" id="report-reset">${t('reports.reset')}</button>
      <span style="flex:1;"></span>
      <button class="btn btn-sm" id="export-report-xlsx">${icon('download',14)} ${t('reports.exportReport')}</button>
      <button class="btn btn-sm" id="export-products-xlsx-2">${icon('download',14)} ${t('reports.exportProducts')}</button>
    </div>
    <div class="muted" style="font-size:11.5px;">${t('reports.dataNote')}</div>
  </div>
  <div class="grid kpis" style="grid-template-columns:repeat(5,1fr);">
    <div class="glass kpi"><div class="kpi-icon" style="background:var(--good-soft);color:var(--good);">${icon('arrowdown',18)}</div><div class="kpi-val">${fmtNum(inCount)}</div><div class="kpi-label">${t('kpi.totalIn')}</div></div>
    <div class="glass kpi"><div class="kpi-icon" style="background:var(--crit-soft);color:var(--crit);">${icon('arrowup',18)}</div><div class="kpi-val">${fmtNum(outCount)}</div><div class="kpi-label">${t('kpi.totalOut')}</div></div>
    <div class="glass kpi"><div class="kpi-icon">${icon('list',18)}</div><div class="kpi-val">${fmtNum(fm.length)}</div><div class="kpi-label">${t('kpi.totalMovesCount')}</div></div>
    <div class="glass kpi"><div class="kpi-icon" style="background:var(--good-soft);color:var(--good);">${icon('check',18)}</div><div class="kpi-val">${fmtNum(salesTotal)} SAR</div><div class="kpi-label">${t('kpi.totalSalesValue')}</div></div>
    <div class="glass kpi"><div class="kpi-icon">${icon('receipt',18)}</div><div class="kpi-val">${fmtNum(fs.length)}</div><div class="kpi-label">${t('kpi.totalInvoices')}</div></div>
  </div>
  <div class="grid row2" style="margin-top:16px;">
    <div class="glass card"><div class="card-head"><div class="card-title">${t('reports.trend14')}</div></div>${areaChart()}</div>
    <div class="glass card"><div class="card-head"><div class="card-title">${t('chart.catDist')}</div></div>${donutChart(categories)}</div>
  </div>
  <div class="grid row-eq" style="margin-top:16px;">
    <div class="glass card"><div class="card-head"><div class="card-title">${t('mostActive')}</div></div>
      ${topFiltered.length? topFiltered.map((p,i)=>`<div class="bar-row"><div class="bar-label">${escHtml(p.name)}</div><div class="bar-track"><div class="bar-fill" style="width:${topFiltered[0].qty?(p.qty/topFiltered[0].qty*100):0}%;background:${catColor(i%8)}"></div></div><div class="bar-val">${fmtNum(p.qty)}</div></div>`).join('') : emptyState('list',t('empty.noDataYetTitle'),t('empty.noDataYetSub'))}
    </div>
    <div class="glass card"><div class="card-head"><div class="card-title">${t('reports.restockTitle')}</div></div>
      ${lowStock.length? `<table><thead><tr><th>${t('th.item')}</th><th class="num">${t('th.remaining')}</th></tr></thead><tbody>${lowStock.slice(0,8).map(p=>`<tr><td class="prod-name">${escHtml(p.name)}</td><td class="num" style="color:${p.stock<=0?'var(--crit)':'var(--warn)'};font-weight:700;">${fmtNum(p.stock)}</td></tr>`).join('')}</tbody></table>` : emptyState('check',t('empty.allGoodTitle'),t('empty.allGoodSub'))}
    </div>
  </div>`;
}

/* ============ STORE PERFORMANCE (real Salla data) ============ */
function viewStore(){
  const data = storeSales && storeSales.data;
  if(!data){
    return `<div class="glass card">${emptyState('storeline',t('store.waitingTitle'),t('store.waitingSub'))}</div>`;
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
    <div class="glass kpi"><div class="kpi-icon" style="background:var(--good-soft);color:var(--good);">${icon('check',18)}</div><div class="kpi-val">${fmtNum(totalRevenue)} SAR</div><div class="kpi-label">${t('store.salesKpi',{n:days.length})}</div></div>
    <div class="glass kpi"><div class="kpi-icon">${icon('receipt',18)}</div><div class="kpi-val">${fmtNum(totalOrders)}</div><div class="kpi-label">${t('store.totalOrders')}</div></div>
    <div class="glass kpi"><div class="kpi-icon">${icon('clock',18)}</div><div class="kpi-val" style="font-size:14px;">${storeSales.captured_at? fmtDate(storeSales.captured_at):'—'}</div><div class="kpi-label">${t('store.lastUpdate')}</div></div>
  </div>
  <div class="glass card" style="margin-top:16px;">
    <div class="card-head"><div><div class="card-title">${t('store.dailyTitle')}</div><div class="card-sub">${t('store.dailySub')}</div></div></div>
    <div style="display:flex;gap:6px;align-items:flex-end;">${bars || emptyState('chart',t('empty.noDataYetTitle'),'')}</div>
  </div>
  <div class="glass card" style="margin-top:16px;">
    <div class="card-head"><div class="card-title">${t('store.topTitle')}</div></div>
    ${top.length? `<table><thead><tr><th>${t('th.item')}</th><th class="num">${t('th.qtySold')}</th><th class="num">${t('th.revenue')}</th></tr></thead><tbody>
      ${top.map(p=>`<tr><td class="prod-name">${escHtml(p.name)}</td><td class="num" style="font-weight:700;">${fmtNum(p.qty)}</td><td class="num">${fmtNum(p.revenue)} SAR</td></tr>`).join('')}
    </tbody></table>` : emptyState('receipt',t('empty.noDataYetTitle'),'')}
    <div class="perf-note">${icon('sync2',13)} ${t('store.perfNote')}</div>
  </div>`;
}

/* ============ SYNC ============ */
function viewSync(){
  const pend = movements.filter(m=>!m.synced);
  const failed = pend.filter(m=>m.sync_error);
  return `
  <div class="grid row-eq">
    <div class="glass kpi"><div class="kpi-icon">${icon('clock',18)}</div><div class="kpi-val" style="font-size:16px;">${summary.last_sync_at? fmtDate(summary.last_sync_at):t('sync.neverSynced')}</div><div class="kpi-label">${t('sync.lastSuccess')}</div></div>
    <div class="glass kpi"><div class="kpi-icon" style="${pend.length?'background:var(--warn-soft);color:var(--warn)':''}">${icon('sync2',18)}</div><div class="kpi-val">${fmtNum(pend.length)}</div><div class="kpi-label">${t('sync.pendingCount')}</div></div>
  </div>
  <div class="glass card" style="margin-top:16px;">
    <div class="card-title" style="margin-bottom:10px;">${t('sync.howTitle')}</div>
    <div style="font-size:13px;line-height:2;color:var(--ink-2);">${t('sync.howBody')}</div>
  </div>
  ${failed.length? `<div class="glass card" style="margin-top:16px;">
    <div class="card-title" style="margin-bottom:10px;color:var(--crit);">${t('sync.failedTitle')}</div>
    <table><thead><tr><th>${t('th.item')}</th><th class="num">${t('th.qty')}</th><th>${t('th.error')}</th></tr></thead><tbody>
    ${failed.map(m=>`<tr><td class="prod-name">${escHtml(m.product_name)}</td><td class="num">${fmtNum(m.qty)}</td><td class="muted">${escHtml(m.sync_error)}</td></tr>`).join('')}
    </tbody></table></div>`:''}`;
}

/* ============ SETTINGS (manager only) ============ */
function viewSettings(){
  if(me.role!=='manager') return emptyState('lock', t('settings.managerOnlyTitle'), t('settings.managerOnlySub'));
  return `
  <div class="glass card settings-section">
    <div class="controls-row">
      <div><h4>${t('settings.usersTitle')}</h4><div class="hint">${t('settings.usersHint')}</div></div>
      <span style="flex:1;"></span>
      <button class="btn btn-sm btn-accent" id="open-user">${icon('plus',14)} ${t('settings.newUser')}</button>
    </div>
    <table><thead><tr><th>${t('settings.name')}</th><th>${t('settings.username')}</th><th>${t('settings.role')}</th><th>${t('settings.status')}</th><th></th></tr></thead><tbody>
      ${users.map(u=>`<tr>
        <td class="prod-name">${escHtml(u.display_name)}</td>
        <td class="muted">${escHtml(u.username)}</td>
        <td><span class="role-badge role-${u.role}">${roleLabel(u.role)}</span></td>
        <td>${u.active? `<span class="pill pill-good">${icon('check',11)} ${t('settings.active')}</span>` : `<span class="pill pill-muted">${icon('x',11)} ${t('settings.disabled')}</span>`}</td>
        <td><div class="user-row-actions">
          <button class="btn btn-sm btn-ghost" data-edit-user="${u.id}">${icon('edit',13)}</button>
          ${u.id!==me.id? `<button class="btn btn-sm btn-ghost" data-delete-user="${u.id}">${icon('trash',13)}</button>`:''}
        </div></td>
      </tr>`).join('')}
    </tbody></table>
  </div>
  <div class="glass card settings-section">
    <div class="controls-row">
      <div><h4>${t('settings.logoTitle')}</h4><div class="hint">${t('settings.logoHint')}</div></div>
    </div>
    <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap;">
      <div class="logo-preview">${appLogo? `<img src="${appLogo}" alt="logo" />` : `<img class="logo-light" src="/assets/logo-navy-full.png" alt="logo" /><img class="logo-dark" src="/assets/logo-gold-full.png" alt="logo" />`}</div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <button class="btn btn-sm btn-accent" id="upload-logo-btn">${icon('upload',14)} ${t('settings.uploadLogo')}</button>
        ${appLogo? `<button class="btn btn-sm btn-ghost" id="reset-logo-btn">${icon('x',13)} ${t('settings.resetLogo')}</button>` : ''}
        <input type="file" accept="image/*" class="import-input" id="logo-file-input" />
      </div>
    </div>
  </div>`;
}

/* ============ CHARTS ============ */
function donutChart(cats){
  if(!cats || !cats.length) return emptyState('chart',t('empty.noDataYetTitle'),'');
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
      <text x="70" y="84" text-anchor="middle" font-size="10" fill="var(--ink-3)">${LANG==='en'?'items':'صنف'}</text>
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
  if(!movements.length) return emptyState('chart',t('empty.noMovesTitle'),t('empty.noMovesSub'));
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
    <div class="legend-row"><span class="legend-dot" style="background:var(--c1)"></span><span class="legend-name">${t('type.in')}</span></div>
    <div class="legend-row"><span class="legend-dot" style="background:var(--c2)"></span><span class="legend-name">${t('type.out')}</span></div>
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
  else if(ui.modal.type==='importResult') root.innerHTML = importResultModal();
  else root.innerHTML='';
}
function moveModal(){
  const preset = ui.modal.productId ? products.find(p=>p.id===ui.modal.productId) : null;
  const mtype = ui.modal.moveType || 'out';
  return `
  <div class="overlay" id="overlay-bg">
    <div class="glass modal">
      <button class="close-x" data-close>${icon('x',14)}</button>
      <h3>${t('move.title')}</h3>
      <div class="sub">${t('move.sub')}</div>
      <div class="field"><label>${t('move.type')}</label>
        <div class="seg" id="move-type-seg">
          <button type="button" data-mtype="out" class="${mtype==='out'?'active':''}">${t('move.out')}</button>
          <button type="button" data-mtype="in" class="${mtype==='in'?'active':''}">${t('move.in')}</button>
          <button type="button" data-mtype="adjust" class="${mtype==='adjust'?'active':''}">${t('move.adjust')}</button>
        </div>
      </div>
      <div class="field"><label>${t('move.item')}</label>
        ${preset? `<div class="picked"><span>${escHtml(preset.name)}</span><button type="button" class="btn btn-sm btn-ghost" id="clear-pick">${t('move.change')}</button></div>` : `
        <input id="move-search" placeholder="${t('move.searchPlaceholder')}" autocomplete="off" value="${escAttr(ui.moveSearch||'')}" />
        <div class="suggest" id="move-suggest">${moveSuggestions()}</div>`}
      </div>
      <div class="field"><label>${mtype==='adjust'? t('move.qtyAfterCount') : t('move.qty')}</label><input type="number" min="0" id="move-qty" placeholder="0" /></div>
      <div class="field"><label>${t('move.noteOptional')}</label><input id="move-note" placeholder="${t('move.notePlaceholder')}" /></div>
      <div class="modal-actions"><button class="btn btn-ghost" data-close>${t('cancel')}</button><button class="btn btn-accent" id="save-move">${icon('check',15)} ${t('move.save')}</button></div>
    </div>
  </div>`;
}
function moveSuggestions(){
  const q = (ui.moveSearch||'').trim().toLowerCase();
  const list = (q? products.filter(p=>p.name.toLowerCase().includes(q)||p.id.includes(q)) : products).slice(0,30);
  if(!list.length) return `<div class="suggest-item muted">${t('empty.noResultsTitle')}</div>`;
  return list.map(p=>`<div class="suggest-item" data-pick="${p.id}">${escHtml(p.name)} <span class="muted">#${p.id}</span></div>`).join('');
}
function addProductModal(){
  const utype = ui.modal.unitType || 'piece';
  const isBulkUnit = utype!=='piece';
  return `
  <div class="overlay" id="overlay-bg">
    <div class="glass modal">
      <button class="close-x" data-close>${icon('x',14)}</button>
      <h3>${t('add.title')}</h3>
      <div class="sub">${t('add.sub')}</div>
      <div class="field"><label>${t('add.name')}</label><input id="np-name" /></div>
      <div class="field"><label>${t('unit.type')}</label>
        <div class="seg" id="unit-type-seg">
          <button type="button" data-utype="piece" class="${utype==='piece'?'active':''}">${t('unit.piece')}</button>
          <button type="button" data-utype="carton" class="${utype==='carton'?'active':''}">${t('unit.carton')}</button>
          <button type="button" data-utype="pallet" class="${utype==='pallet'?'active':''}">${t('unit.pallet')}</button>
        </div>
      </div>
      ${isBulkUnit? `<div class="field"><label>${t('unit.perBundle')}</label><input type="number" min="1" id="np-units-per-bundle" value="1" /></div>` : ''}
      <div class="field"><label>${t('add.sallaId')}</label><input id="np-id" inputmode="numeric" />
        ${isBulkUnit? `<div class="muted" style="font-size:12px;margin-top:4px;">${t('add.sallaIdOptionalHint')}</div>` : ''}
      </div>
      <div class="field"><label>${t('add.category')}</label><input id="np-cat" placeholder="${t('add.categoryPlaceholder')}" /></div>
      <div class="field"><label>${t('add.priceOptional')}</label><input id="np-price" type="number" min="0" /></div>
      <div class="field"><label>${t('add.openingQty')}</label><input id="np-qty" type="number" min="0" /></div>
      <div class="modal-actions"><button class="btn btn-ghost" data-close>${t('cancel')}</button><button class="btn btn-accent" id="save-add-product">${icon('check',15)} ${t('add.save')}</button></div>
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
          <input type="number" min="1" class="row-qty" title="${t('sale.qtyLabel')}" value="${it.qty||1}" style="width:64px;padding:6px 8px;border-radius:8px;margin-inline-end:6px;" />
          <input type="number" min="0" class="row-price" title="${t('sale.priceHint')}" value="${it.price ?? p.price}" style="width:78px;padding:6px 8px;border-radius:8px;margin-inline-end:6px;" />
          <button type="button" class="btn btn-sm btn-ghost" data-row-clear="${idx}">${icon('x',12)}</button>
          ${items.length>1? `<button type="button" class="btn btn-sm btn-ghost" data-row-remove="${idx}">${icon('trash',12)}</button>`:''}
        </div></div>`;
    }
    return `<div class="field" id="sale-row-${idx}" data-row>
      <input data-row-search="${idx}" placeholder="${t('sale.searchPlaceholder')}" autocomplete="off" value="${escAttr(it.search||'')}" />
      <div class="suggest" id="row-suggest-${idx}">${saleRowSuggestions(idx, pickedIds)}</div>
      ${items.length>1? `<button type="button" class="btn btn-sm btn-ghost" data-row-remove="${idx}" style="margin-top:6px;">${icon('trash',12)} ${t('sale.removeRow')}</button>`:''}
    </div>`;
  }).join('');
  return `
  <div class="overlay" id="overlay-bg">
    <div class="glass modal" style="width:min(560px,100%);">
      <button class="close-x" data-close>${icon('x',14)}</button>
      <h3>${t('sale.title')}</h3>
      <div class="sub">${t('sale.sub')}</div>
      <div class="grid row-eq" style="margin-bottom:6px;">
        <div class="field"><label>${t('sale.invoiceNo')}</label><input id="sale-invoice-no" value="${escAttr(ui.modal.invoice_no)}" /></div>
        <div class="field"><label>${t('sale.customerOptional')}</label><input id="sale-customer" value="${escAttr(ui.modal.customer||'')}" /></div>
      </div>
      <div class="field">
        <label>${t('sale.channel')}</label>
        <div class="seg" id="sale-channel-seg">
          <button type="button" data-channel="warehouse" class="${(ui.modal.channel||'warehouse')==='warehouse'?'active':''}">${t('channel.warehouse')}</button>
          <button type="button" data-channel="store" class="${ui.modal.channel==='store'?'active':''}">${t('channel.store')}</button>
        </div>
        <div class="hint" style="font-size:11px;color:var(--ink-3);margin-top:4px;">${t('sale.channelHint')}</div>
      </div>
      <label style="font-size:12.5px;font-weight:600;color:var(--ink-2);">${t('sale.items')}</label>
      <div id="sale-rows" style="margin-top:6px;">${rowsHtml}</div>
      <div class="hint" style="font-size:11px;color:var(--ink-3);margin:6px 0 0;">${t('sale.priceHint')}</div>
      <button type="button" class="btn btn-sm" id="sale-add-row" style="margin-top:8px;">${icon('plus',13)} ${t('sale.addRow')}</button>
      <div class="picked" style="margin-top:16px;background:var(--surface-solid);border:1px solid var(--glass-border);"><span>${t('sale.total')}</span><b id="sale-total-val">0 SAR</b></div>
      <div class="modal-actions"><button class="btn btn-ghost" data-close>${t('cancel')}</button><button class="btn btn-accent" id="save-sale">${icon('check',15)} ${t('sale.save')}</button></div>
    </div>
  </div>`;
}
function saleRowSuggestions(idx, pickedIds){
  const q = (ui.modal.items[idx].search||'').trim().toLowerCase();
  let list = products.filter(p=>!pickedIds.includes(p.id) || p.id===ui.modal.items[idx].productId);
  if(q) list = list.filter(p=>p.name.toLowerCase().includes(q) || p.id.includes(q));
  list = list.slice(0,25);
  if(!list.length) return `<div class="suggest-item muted">${t('empty.noResultsTitle')}</div>`;
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
      <h3>${LANG==='en'?'Invoice':'فاتورة'} ${escHtml(s.invoice_no)}</h3>
      <div class="sub">${fmtDate(s.ts)} ${s.customer? '· '+escHtml(s.customer):''} · <span class="pill ${s.channel==='store'?'pill-good':'pill-muted'}" style="display:inline-flex;">${s.channel==='store'?t('channel.store'):t('channel.warehouse')}</span></div>
      <table><thead><tr><th>${t('th.item')}</th><th class="num">${t('th.qty')}</th><th class="num">${t('th.price')}</th><th class="num">${t('th.total')}</th></tr></thead><tbody>
      ${s.items.map(it=>`<tr><td class="prod-name">${escHtml(it.name)}</td><td class="num">${fmtNum(it.qty)}</td><td class="num">${fmtNum(it.price)}</td><td class="num" style="font-weight:700;">${fmtNum(it.qty*it.price)}</td></tr>`).join('')}
      </tbody></table>
      <div class="picked" style="margin-top:14px;background:var(--surface-solid);border:1px solid var(--glass-border);"><span>${t('sale.total')}</span><b>${fmtNum(s.total)} SAR</b></div>
      <div class="modal-actions">
        <button class="btn btn-ghost" data-close style="flex:1;">${t('close')}</button>
        <button class="btn btn-accent" id="print-sale-btn">${icon('download',15)} ${t('print.printBtn')}</button>
      </div>
    </div>
  </div>`;
}
function printInvoiceHtml(s){
  const rowsHtml = s.items.map(it=>`<tr><td>${escHtml(it.name)}</td><td class="num">${fmtNum(it.qty)}</td><td class="num">${fmtNum(it.price)}</td><td class="num">${fmtNum(it.qty*it.price)}</td></tr>`).join('');
  const dir = LANG==='ar'?'rtl':'ltr';
  return `<!doctype html><html dir="${dir}" lang="${LANG}"><head><meta charset="utf-8" />
  <title>${escHtml(t('print.invoiceTitle'))} ${escHtml(s.invoice_no)}</title>
  <style>
    @page { size: A4; margin: 18mm; }
    body{ font-family: 'Segoe UI', Tahoma, Arial, sans-serif; color:#1a1a1a; direction:${dir}; }
    h1{ font-size:20px; margin:0 0 4px; }
    .meta{ font-size:13px; color:#444; margin-bottom:18px; }
    .meta div{ margin-bottom:3px; }
    table{ width:100%; border-collapse:collapse; font-size:13px; }
    th,td{ border:1px solid #ccc; padding:8px 10px; text-align:${dir==='rtl'?'right':'left'}; }
    th{ background:#f3f3f3; }
    td.num, th.num{ text-align:${dir==='rtl'?'left':'right'}; }
    .total-row{ margin-top:16px; display:flex; justify-content:${dir==='rtl'?'flex-start':'flex-end'}; font-size:15px; font-weight:700; }
    .dev-credit{ margin-top:40px; font-size:10px; color:#999; text-align:center; }
  </style></head>
  <body>
    <h1>${escHtml(t('print.invoiceTitle'))} — ${escHtml(s.invoice_no)}</h1>
    <div class="meta">
      <div>${escHtml(t('print.date'))}: ${fmtDate(s.ts)}</div>
      <div>${escHtml(t('print.customer'))}: ${escHtml(s.customer||'—')}</div>
      <div>${escHtml(t('print.channel'))}: ${s.channel==='store'?escHtml(t('channel.store')):escHtml(t('channel.warehouse'))}</div>
    </div>
    <table><thead><tr><th>${escHtml(t('print.item'))}</th><th class="num">${escHtml(t('print.qty'))}</th><th class="num">${escHtml(t('print.price'))}</th><th class="num">${escHtml(t('print.total'))}</th></tr></thead>
    <tbody>${rowsHtml}</tbody></table>
    <div class="total-row">${escHtml(t('print.grandTotal'))}: ${fmtNum(s.total)} SAR</div>
    <div class="dev-credit">Developed by Mohamed Emad</div>
    <script>window.onload = function(){ window.print(); };<\/script>
  </body></html>`;
}
function printSaleInvoice(s){
  const win = window.open('', '_blank');
  if(!win){ toast(t('toast.saveFailed'),'err'); return; }
  win.document.open();
  win.document.write(printInvoiceHtml(s));
  win.document.close();
}
function userModal(){
  const editing = ui.modal.editUser;
  return `
  <div class="overlay" id="overlay-bg">
    <div class="glass modal">
      <button class="close-x" data-close>${icon('x',14)}</button>
      <h3>${editing? t('user.editTitle') : t('user.newTitle')}</h3>
      <div class="sub">${editing? t('user.editSub') : t('user.newSub')}</div>
      ${!editing? `<div class="field"><label>${t('user.username')}</label><input id="u-username" /></div>`:''}
      <div class="field"><label>${t('user.displayName')}</label><input id="u-name" value="${escAttr(editing?editing.display_name:'')}" /></div>
      <div class="field"><label>${t('user.role')}</label>
        <select id="u-role">
          <option value="manager" ${editing&&editing.role==='manager'?'selected':''}>${t('user.roleManager')}</option>
          <option value="accountant" ${editing&&editing.role==='accountant'?'selected':''}>${t('user.roleAccountant')}</option>
          <option value="user" ${(!editing||editing.role==='user')?'selected':''}>${t('user.roleUser')}</option>
        </select>
      </div>
      <div class="field"><label>${editing? t('user.newPassword') : t('user.password')}</label><input id="u-password" type="password" minlength="6" /></div>
      ${editing? `<div class="field"><label>${t('user.status')}</label>
        <div class="seg"><button type="button" data-u-active="true" class="${editing.active?'active':''}">${t('settings.active')}</button><button type="button" data-u-active="false" class="${!editing.active?'active':''}">${t('settings.disabled')}</button></div>
      </div>`:''}
      <div class="modal-actions"><button class="btn btn-ghost" data-close>${t('cancel')}</button><button class="btn btn-accent" id="save-user">${icon('check',15)} ${t('user.save')}</button></div>
    </div>
  </div>`;
}
function importResultModal(){
  const r = ui.modal.result;
  return `
  <div class="overlay" id="overlay-bg">
    <div class="glass modal">
      <button class="close-x" data-close>${icon('x',14)}</button>
      <h3>${t('import.resultTitle')}</h3>
      <div class="sub">${t('import.resultSub',{ok:r.succeeded,fail:r.failed})}</div>
      ${r.results && r.results.length? `<div style="max-height:280px;overflow:auto;"><table><thead><tr><th>${t('th.productId')}</th><th>${t('th.item')}</th><th>${t('th.status')}</th></tr></thead><tbody>
        ${r.results.map(row=>`<tr><td class="muted">${escHtml(row.product_id||'—')}</td><td class="prod-name">${escHtml(row.name||'—')}</td><td>${row.ok? `<span class="pill pill-good">${icon('check',11)} ${t('import.ok')}</span>` : `<span class="pill pill-crit">${icon('alert',11)} ${escHtml(row.error||t('import.failedRow'))}</span>`}</td></tr>`).join('')}
      </tbody></table></div>` : ''}
      <div class="modal-actions"><button class="btn btn-ghost" data-close style="flex:1;">${t('close')}</button></div>
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
  const langBtn = e.target.closest('[data-lang]');
  if(langBtn){ setLang(langBtn.getAttribute('data-lang')); return; }
  const nav = e.target.closest('[data-nav]');
  if(nav){ ui.tab = nav.getAttribute('data-nav'); ui.search=''; ui.catFilter=''; ui.stockFilter=''; renderShell(); return; }
  if(e.target.closest('#open-move')){ ui.modal={type:'move',moveType:'out',productId:null}; ui.moveSearch=''; renderOverlay(); return; }
  const qm = e.target.closest('[data-quick-move]');
  if(qm){ const id=qm.getAttribute('data-quick-move'); const p=products.find(x=>x.id===id); ui.modal={type:'move',moveType:(p&&p.stock===null?'adjust':'out'),productId:id}; renderOverlay(); return; }
  if(e.target.closest('#open-add-product')){ ui.modal={type:'addProduct'}; renderOverlay(); return; }
  if(e.target.closest('#open-sale')){ ui.modal={type:'sale', invoice_no: nextInvoiceNo(), customer:'', channel:'warehouse', items:[{productId:null, search:'', qty:1, price:0}]}; renderOverlay(); return; }
  if(e.target.closest('#open-user')){ ui.modal={type:'user', editUser:null}; renderOverlay(); return; }
  const utypeBtn = e.target.closest('[data-utype]');
  if(utypeBtn){ ui.modal.unitType = utypeBtn.getAttribute('data-utype'); renderOverlay(); return; }
  const channelBtn = e.target.closest('[data-channel]');
  if(channelBtn){ ui.modal.channel = channelBtn.getAttribute('data-channel'); renderOverlay(); return; }
  const editUserBtn = e.target.closest('[data-edit-user]');
  if(editUserBtn){ const u=users.find(x=>x.id===editUserBtn.getAttribute('data-edit-user')); ui.modal={type:'user', editUser:{...u}}; renderOverlay(); return; }
  const delUserBtn = e.target.closest('[data-delete-user]');
  if(delUserBtn){
    if(confirm(t('toast.confirmDeleteUser'))){
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
  if(e.target.closest('#print-sale-btn')){ if(ui.modal && ui.modal.sale) printSaleInvoice(ui.modal.sale); return; }
  if(e.target.closest('#save-user')) return doSaveUser();
  if(e.target.closest('#export-products-xlsx') || e.target.closest('#export-products-xlsx-2')) return exportProductsXlsx();
  if(e.target.closest('#export-report-xlsx')) return exportReportXlsx();
  if(e.target.closest('#trigger-import-stock')){ const inp=document.getElementById('import-stock-input'); if(inp) inp.click(); return; }
  if(e.target.closest('#report-reset')){ ui.reportFrom=''; ui.reportTo=''; updateView(); return; }
  if(e.target.closest('#upload-logo-btn')){ const inp=document.getElementById('logo-file-input'); if(inp) inp.click(); return; }
  if(e.target.closest('#reset-logo-btn')) return doResetLogo();
}
function onChange(e){
  if(e.target.id==='cat-filter'){ ui.catFilter = e.target.value; updateStockResults(); return; }
  if(e.target.id==='stock-filter'){ ui.stockFilter = e.target.value; updateStockResults(); return; }
  if(e.target.id==='report-from'){ ui.reportFrom = e.target.value; updateView(); return; }
  if(e.target.id==='report-to'){ ui.reportTo = e.target.value; updateView(); return; }
  if(e.target.id==='import-stock-input' && e.target.files && e.target.files[0]){ handleImportStockFile(e.target.files[0]); e.target.value=''; return; }
  if(e.target.id==='logo-file-input' && e.target.files && e.target.files[0]){ handleLogoFile(e.target.files[0]); e.target.value=''; return; }
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
      tip.innerHTML = `<b>${d.d}</b><br/>${t('type.in')}: ${d.in} · ${t('type.out')}: ${d.out}`;
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
  if(!productId){ toast(t('toast.pickProductFirst'),'err'); return; }
  if(!qty || qty<0){ toast(t('toast.enterValidQty'),'err'); return; }
  try{
    await api('/api/movements', {method:'POST', body: JSON.stringify({product_id:productId, type, qty, note})});
    ui.modal=null; toast(t('toast.moveSaved'),'ok');
    await refreshAndRender();
  }catch(err){ toast(t('toast.moveSaveFailed'),'err'); }
}
async function doSaveAddProduct(){
  const name = document.getElementById('np-name').value.trim();
  const unit_type = ui.modal.unitType || 'piece';
  const isBulkUnit = unit_type!=='piece';
  let id = document.getElementById('np-id').value.trim();
  const category = document.getElementById('np-cat').value.trim() || 'غير مصنف';
  const price = Number(document.getElementById('np-price').value)||0;
  const qty = document.getElementById('np-qty').value;
  const units_per_bundle = isBulkUnit ? (Number(document.getElementById('np-units-per-bundle')?.value)||1) : 1;
  if(!name || (!id && !isBulkUnit)){ toast(t('add.sub'),'err'); return; }
  if(!id && isBulkUnit){ id = 'LOC-' + Date.now(); }
  try{
    await api('/api/products', {method:'POST', body: JSON.stringify({id, name, category, price, stock: qty===''?null:Number(qty), unit_type, units_per_bundle, salla_linked: !isBulkUnit})});
    ui.modal=null; toast(t('toast.productAdded'),'ok');
    await refreshAndRender();
  }catch(err){ toast(err.error==='product_exists'?t('toast.productExists'):t('toast.addFailed'),'err'); }
}
async function doSaveSale(){
  const invoice_no = document.getElementById('sale-invoice-no')?.value.trim();
  const customer = document.getElementById('sale-customer')?.value.trim();
  const rowEls = [...document.querySelectorAll('#sale-rows [data-row][data-product-id]')];
  if(!rowEls.length){ toast(t('toast.needOneItem'),'err'); return; }
  const items = [];
  for(const r of rowEls){
    const product_id = r.getAttribute('data-product-id');
    const qty = Number(r.querySelector('.row-qty')?.value);
    const price = Number(r.querySelector('.row-price')?.value);
    if(!qty || qty<=0){ toast(t('toast.needValidQtyPerItem'),'err'); return; }
    items.push({product_id, qty, price});
  }
  if(!invoice_no){ toast(t('toast.enterInvoiceNo'),'err'); return; }
  const channel = ui.modal.channel==='store' ? 'store' : 'warehouse';
  try{
    await api('/api/sales', {method:'POST', body: JSON.stringify({invoice_no, customer, items, channel})});
    ui.modal=null; toast(t('toast.saleSaved'),'ok');
    await refreshAndRender();
  }catch(err){ toast(err.error==='invoice_no_taken'?t('toast.invoiceTaken'):t('toast.saleSaveFailed'),'err'); }
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
      if(!username || !password){ toast(t('toast.needUserPass'),'err'); return; }
      if(password.length<6){ toast(t('toast.passTooShort'),'err'); return; }
      await api('/api/users', {method:'POST', body: JSON.stringify({username, password, display_name, role})});
    }
    ui.modal=null; toast(t('toast.saved'),'ok');
    users = await api('/api/users'); renderOverlay(); updateView();
  }catch(err){ toast(err.error==='username_taken'?t('toast.usernameTaken'):t('toast.saveFailed'),'err'); }
}
/* ============ EXCEL EXPORT / IMPORT ============ */
function ensureXLSX(){
  if(typeof XLSX==='undefined'){ toast(t('toast.xlsxMissing'),'err'); return false; }
  return true;
}
function exportProductsXlsx(){
  if(!ensureXLSX()) return;
  const rows = products.map(p=>({
    [t('xls.id')]: p.id,
    [t('xls.name')]: p.name,
    [t('xls.category')]: p.category,
    [t('xls.price')]: Number(p.price),
    [t('xls.qty')]: p.stock===null?'':Number(p.stock),
    [t('xls.threshold')]: Number(p.threshold),
  }));
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, t('xls.sheetProducts'));
  XLSX.writeFile(wb, t('xls.productsFilename'));
  toast(t('toast.exportDone'),'ok');
}
function exportReportXlsx(){
  if(!ensureXLSX()) return;
  const fm = filteredMovementsForReport();
  const fs = filteredSalesForReport();
  const inQty = fm.filter(m=>m.type==='in').reduce((s,m)=>s+Number(m.qty),0);
  const outQty = fm.filter(m=>m.type==='out').reduce((s,m)=>s+Number(m.qty),0);
  const salesTotal = fs.reduce((s,v)=>s+Number(v.total),0);
  const {from,to} = reportDateRange();
  const summaryRows = [
    {[t('xls.field')]: t('xls.fromDate'), [t('xls.value')]: from||t('xls.allTime')},
    {[t('xls.field')]: t('xls.toDate'), [t('xls.value')]: to||t('xls.allTime')},
    {[t('xls.field')]: t('kpi.totalIn'), [t('xls.value')]: inQty},
    {[t('xls.field')]: t('kpi.totalOut'), [t('xls.value')]: outQty},
    {[t('xls.field')]: t('kpi.totalMovesCount'), [t('xls.value')]: fm.length},
    {[t('xls.field')]: t('kpi.totalSalesValue'), [t('xls.value')]: salesTotal},
    {[t('xls.field')]: t('kpi.totalInvoices'), [t('xls.value')]: fs.length},
  ];
  const movesRows = fm.map(m=>({
    [t('xls.date')]: fmtDate(m.ts),
    [t('xls.name')]: m.product_name,
    [t('xls.type')]: m.type==='in'?t('type.in'):m.type==='out'?t('type.out'):t('type.adjust'),
    [t('xls.qty')]: Number(m.qty),
    [t('xls.note')]: m.note||'',
  }));
  const topRows = topProductsForReport(fm).map(r=>({[t('xls.name')]: r.name, [t('xls.qty')]: r.qty}));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(summaryRows), t('xls.sheetSummary'));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(movesRows), t('xls.sheetMovements'));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(topRows), t('xls.sheetTop'));
  XLSX.writeFile(wb, t('xls.reportFilename'));
  toast(t('toast.exportDone'),'ok');
}
async function handleImportStockFile(file){
  if(!ensureXLSX()) return;
  try{
    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf, {type:'array'});
    const ws = wb.Sheets[wb.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(ws, {defval:''});
    if(!json.length){ toast(t('toast.importEmpty'),'err'); return; }
    const idKeys = ['رقم المنتج','id','product_id','product id'];
    const qtyKeys = ['الكمية بالمستودع','الكمية','qty','quantity'];
    const rows = json.map(row=>{
      const keys = Object.keys(row);
      const idKey = keys.find(k=>idKeys.includes(k.trim().toLowerCase()));
      const qtyKey = keys.find(k=>qtyKeys.includes(k.trim().toLowerCase()));
      return { product_id: idKey!==undefined? String(row[idKey]).trim() : '', qty: qtyKey!==undefined? row[qtyKey] : '' };
    }).filter(r=>r.product_id!=='');
    if(!rows.length){ toast(t('toast.importNoValidRows'),'err'); return; }
    const res = await api('/api/movements/bulk-import', {method:'POST', body: JSON.stringify({rows})});
    ui.modal = {type:'importResult', result: res};
    renderOverlay();
    await loadAll();
    updateView();
  }catch(err){ toast(t('toast.importFailed'),'err'); }
}
function handleLogoFile(file){
  if(file.size > 1_300_000){ toast(t('toast.logoTooLarge'),'err'); return; }
  const reader = new FileReader();
  reader.onload = async ()=>{
    try{
      await api('/api/settings/logo', {method:'POST', body: JSON.stringify({logo: reader.result})});
      appLogo = reader.result;
      toast(t('toast.logoSaved'),'ok');
      renderShell();
    }catch(err){ toast(t('toast.logoSaveFailed'),'err'); }
  };
  reader.readAsDataURL(file);
}
async function doResetLogo(){
  try{
    await api('/api/settings/logo', {method:'DELETE'});
    appLogo = null; toast(t('toast.logoReset'),'ok'); renderShell();
  }catch(err){ toast(t('toast.logoSaveFailed'),'err'); }
}

function toast(msg, kind='ok'){
  const wrap = document.getElementById('toast-wrap'); if(!wrap) return;
  const el = document.createElement('div');
  el.className = 'toast ' + (kind==='ok'?'ok':kind==='err'?'err':'info');
  el.textContent = msg; wrap.appendChild(el);
  setTimeout(()=>el.remove(), 3400);
}

boot();
