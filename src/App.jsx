import { useState, useEffect, useRef, useCallback } from "react";

// ==================== DATA ====================
const PERSONAL_CRONCH = [
  { trabajador: "JUAN DAVID BARRIOS MONCADA", tipoDoc: "cédula de ciudadanía", cc: "1071062013", cargo: "COCINERO", tipoContrato: "TÉRMINO FIJO", ingreso: "2025-10-16", salario: 1750905 },
  { trabajador: "CRISTIAN CAMILO BUITRAGO HERNANDEZ", tipoDoc: "cédula de ciudadanía", cc: "1057597180", cargo: "COCINERO", tipoContrato: "TÉRMINO FIJO", ingreso: "2024-04-15", salario: 1750905 },
  { trabajador: "YURI ANDREA CARRASCO VALENCIA", tipoDoc: "cédula de ciudadanía", cc: "1070616500", cargo: "ATENCION AL CLIENTE", tipoContrato: "TÉRMINO FIJO", ingreso: "2024-04-12", salario: 1750905 },
  { trabajador: "YINETH YISED CRUZ HUERFANO", tipoDoc: "cédula de ciudadanía", cc: "39583757", cargo: "AUXILIAR CONTABLE", tipoContrato: "TÉRMINO FIJO", ingreso: "2025-01-05", salario: 1750905 },
  { trabajador: "CARLOS GUILLERMO DONCEL BARRERO", tipoDoc: "cédula de ciudadanía", cc: "1070590158", cargo: "ATENCION AL CLIENTE", tipoContrato: "TÉRMINO FIJO", ingreso: "2025-01-02", salario: 1750905 },
  { trabajador: "JUAN DAVID FRAYLE SUAREZ", tipoDoc: "cédula de ciudadanía", cc: "1014658459", cargo: "ATENCION AL CLIENTE", tipoContrato: "TÉRMINO FIJO", ingreso: "2025-01-08", salario: 1750905 },
  { trabajador: "FAIBER NICOLAS GOMEZ GARCIA", tipoDoc: "cédula de ciudadanía", cc: "1070615687", cargo: "COORDINADOR DE VENTAS", tipoContrato: "TÉRMINO FIJO", ingreso: "2022-01-07", salario: 2956000 },
  { trabajador: "CESAR ANDRES GONZALEZ REYES", tipoDoc: "cédula de ciudadanía", cc: "1070602266", cargo: "LIDER DE COCINA", tipoContrato: "TÉRMINO FIJO", ingreso: "2023-08-07", salario: 1750905 },
  { trabajador: "JACKELINE KATIUSCA GUAIMARO MESSIAS", tipoDoc: "permiso de proteccion temporal", cc: "5839135", cargo: "COCINERO", tipoContrato: "TÉRMINO FIJO", ingreso: "2025-01-02", salario: 1750905 },
  { trabajador: "NAREN TRIANA GUTERREZ", tipoDoc: "cédula de ciudadanía", cc: "1010027717", cargo: "COCINERO", tipoContrato: "TÉRMINO FIJO", ingreso: "2025-01-02", salario: 1750905 },
  { trabajador: "JULIO CESAR GUTIERREZ GUZMAN", tipoDoc: "cédula de ciudadanía", cc: "1010016961", cargo: "ATENCION AL CLIENTE", tipoContrato: "TÉRMINO FIJO", ingreso: "2025-01-01", salario: 1750905 },
  { trabajador: "ROMERO DANIELA GUTIERREZ", tipoDoc: "cédula de ciudadanía", cc: "1010005354", cargo: "ATENCION AL CLIENTE", tipoContrato: "TÉRMINO FIJO", ingreso: "2024-01-10", salario: 1750905 },
  { trabajador: "EDUARDO JOSE JOHNSON NIETO", tipoDoc: "cédula de ciudadanía", cc: "1070614431", cargo: "ALMACENISTA", tipoContrato: "TÉRMINO FIJO", ingreso: "2025-10-16", salario: 1750905 },
  { trabajador: "CAMILO ANDRES LINDARTE LINDARTE VELEZ", tipoDoc: "cédula de ciudadanía", cc: "1106893759", cargo: "COCINERO", tipoContrato: "TÉRMINO FIJO", ingreso: "2025-01-05", salario: 1750905 },
  { trabajador: "SERGIO LOPEZ LOZANO", tipoDoc: "cédula de ciudadanía", cc: "1070607437", cargo: "DIRECTOR DE OPERACIONES", tipoContrato: "TÉRMINO INDEFINIDO", ingreso: "2025-11-13", salario: 5000000 },
  { trabajador: "ERIZHANDRA LOPEZ VIZCAINO", tipoDoc: "cédula de ciudadanía", cc: "5032682", cargo: "ATENCION AL CLIENTE", tipoContrato: "TÉRMINO FIJO", ingreso: "2022-09-21", salario: 1750905 },
  { trabajador: "DAMARIS JOHANA MEJIA FIERRO", tipoDoc: "cédula de ciudadanía", cc: "1110569444", cargo: "ATENCION AL CLIENTE", tipoContrato: "TÉRMINO FIJO", ingreso: "2021-01-11", salario: 1750905 },
  { trabajador: "DANIEL FELIPE MUÑOZ CUENCA", tipoDoc: "cédula de ciudadanía", cc: "1006814450", cargo: "COORDINADOR DE OPERACIONES", tipoContrato: "TÉRMINO FIJO", ingreso: "2025-01-03", salario: 1750905 },
  { trabajador: "DUVAN AUGUSTO OLIVEROS OSPINA", tipoDoc: "cédula de ciudadanía", cc: "89801349", cargo: "COCINERO", tipoContrato: "TÉRMINO FIJO", ingreso: "2025-10-16", salario: 1750905 },
  { trabajador: "JESSICA LORENA PARRAGA CABEZAS", tipoDoc: "cédula de ciudadanía", cc: "1069717679", cargo: "ATENCION AL CLIENTE", tipoContrato: "TÉRMINO FIJO", ingreso: "2024-04-15", salario: 1750905 },
  { trabajador: "NICOL NATALIA PUENTES SANCHEZ", tipoDoc: "cédula de ciudadanía", cc: "1092334723", cargo: "COORDINADORA COMPRAS", tipoContrato: "TÉRMINO FIJO", ingreso: "2025-01-03", salario: 1978523 },
  { trabajador: "ANGIE YINESKA RINCON PALACIOS", tipoDoc: "cédula de ciudadanía", cc: "1030677957", cargo: "DIRECTORA DE MARKETING", tipoContrato: "TÉRMINO INDEFINIDO", ingreso: "2021-04-16", salario: 2847000 },
  { trabajador: "JOHANNA CATHERINE RODRIGUEZ CRUZ", tipoDoc: "cédula de ciudadanía", cc: "1070608721", cargo: "COORDINADORA DE INVENTARIOS", tipoContrato: "TÉRMINO FIJO", ingreso: "2023-01-08", salario: 1978523 },
  { trabajador: "LAURA VALENTINA RODRIGUEZ RONDON", tipoDoc: "cédula de ciudadanía", cc: "1093292021", cargo: "COCINERO", tipoContrato: "TÉRMINO FIJO", ingreso: "2025-01-02", salario: 1750905 },
  { trabajador: "MELANNY TATIANA USECHE ESCOBAR", tipoDoc: "cédula de ciudadanía", cc: "1126908169", cargo: "ATENCION AL CLIENTE", tipoContrato: "TÉRMINO FIJO", ingreso: "2021-01-12", salario: 1750905 },
  { trabajador: "JEFFERSON CAMILO VALENCIA TELLEZ", tipoDoc: "cédula de ciudadanía", cc: "1016079724", cargo: "GERENTE GENERAL", tipoContrato: "TÉRMINO INDEFINIDO", ingreso: "2021-04-16", salario: 4380000 },
  { trabajador: "LEIDY JOHANNA VARGAS ALBINO", tipoDoc: "cédula de ciudadanía", cc: "1072098270", cargo: "COORDINADORA CONTABLE", tipoContrato: "TÉRMINO FIJO", ingreso: "2023-01-08", salario: 2500000 },
];

const CARGOS = ["Atención al cliente","Cocinero","Líder de cocina","Líder de atención al cliente","Coordinador de compras","Coordinador de inventarios","Auxiliar contable","Gerente general","Directora de marketing","Director operativo","Almacenista","Coordinador de mantenimientos","Coordinador de ventas","Coordinadora contable"];
const SEDES = ["Oficinas","Bachué","Olímpica","Fusa","Producción","Digital"];
const SUB_DIRECCIONES = ["Administrativo","Comercial","Operativo"];
const TIPOS_DOC = ["CC","CE","PT","TI"];
const TIPOS_VINCULACION = ["Contrato","Apoyo"];
const TALLAS_CAMISA = ["S","M","L","XL"];
const TALLAS_PANTALON = ["6","8","10","12","14","16"];
const TALLAS_ZAPATOS = ["35","36","37","38","39","40","41","42","43","44","45"];
const DOTACION_ITEMS = ["Camisa","Pantalón","Delantal","Pañoleta","Chaqueta","Sudadera","Cofia","Zapatos","Camiseta Team Blanca","Camiseta Team Negra"];
const TIPOS_NOVEDAD = ["Incapacidades","Vacaciones","Retiro de empleado","Permiso remunerado","Inasistencia al trabajo","Licencia","Justificada","Otro"];
const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

const formatCurrency = (n) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);
const formatDate = (d) => { const dt = new Date(d); return dt.toLocaleDateString('es-CO'); };
const today = () => new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
const todayISO = () => new Date().toISOString().split('T')[0];

// ==================== STORAGE HELPERS ====================
const KEYS = {
  empleados: 'cronch-empleados',
  inventario: 'cronch-inventario',
  entregas: 'cronch-entregas',
  solicitudes: 'cronch-solicitudes',
  certificados: 'cronch-certificados',
  novedades: 'cronch-novedades',
  vacaciones: 'cronch-vacaciones',
  user: 'cronch-user',
};

const loadData = async (key, fallback) => {
  try {
    const r = await window.storage.get(key);
    return r ? JSON.parse(r.value) : fallback;
  } catch { return fallback; }
};
const saveData = async (key, data) => {
  try { await window.storage.set(key, JSON.stringify(data)); } catch(e) { console.error(e); }
};

// ==================== STYLES ====================
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:wght@500;600;700&display=swap');

* { margin:0; padding:0; box-sizing:border-box; }
:root {
  --blue-50: #f0f5ff; --blue-100: #dbe8fe; --blue-200: #b6d0fd; --blue-300: #8ab4fa;
  --blue-400: #5e95f7; --blue-500: #3b76f0; --blue-600: #2a5cc7;
  --beige-50: #fdf8f3; --beige-100: #f8edd9; --beige-200: #f0dbb8; --beige-300: #e5c48e;
  --beige-400: #d4a85c; --beige-500: #c49244;
  --gray-50: #f9fafb; --gray-100: #f3f4f6; --gray-200: #e5e7eb; --gray-300: #d1d5db;
  --gray-500: #6b7280; --gray-700: #374151; --gray-800: #1f2937; --gray-900: #111827;
  --white: #ffffff; --danger: #ef4444; --success: #22c55e; --warning: #f59e0b;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05); --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 30px rgba(0,0,0,0.1); --radius: 12px; --radius-sm: 8px;
}
body { font-family: 'DM Sans', sans-serif; background: var(--beige-50); color: var(--gray-800); }
h1,h2,h3 { font-family: 'Playfair Display', serif; }

.app { display:flex; min-height:100vh; }
.sidebar { width:260px; background: linear-gradient(180deg, var(--blue-600) 0%, #1e3a6e 100%); padding:0; display:flex; flex-direction:column; position:fixed; top:0; left:0; bottom:0; z-index:100; transition: transform 0.3s ease; }
.sidebar-header { padding:24px 20px 16px; border-bottom:1px solid rgba(255,255,255,0.1); }
.sidebar-header h2 { color:#fff; font-size:22px; letter-spacing:-0.5px; }
.sidebar-header p { color: rgba(255,255,255,0.6); font-size:12px; margin-top:4px; }
.sidebar-nav { flex:1; overflow-y:auto; padding:12px 10px; }
.nav-item { display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:var(--radius-sm); cursor:pointer; color:rgba(255,255,255,0.7); font-size:13.5px; font-weight:500; transition:all .2s; margin-bottom:2px; border:none; background:none; width:100%; text-align:left; }
.nav-item:hover { background:rgba(255,255,255,0.1); color:#fff; }
.nav-item.active { background:rgba(255,255,255,0.18); color:#fff; box-shadow: inset 3px 0 0 var(--beige-300); }
.nav-icon { font-size:18px; width:24px; text-align:center; }
.sidebar-footer { padding:16px 20px; border-top:1px solid rgba(255,255,255,0.1); }
.user-badge { display:flex; align-items:center; gap:10px; color:rgba(255,255,255,0.8); font-size:13px; }
.user-avatar { width:32px; height:32px; border-radius:50%; background:var(--beige-300); display:flex; align-items:center; justify-content:center; font-weight:700; color:var(--blue-600); font-size:14px; }

.main { margin-left:260px; flex:1; padding:28px 36px; min-height:100vh; }
.page-header { margin-bottom:28px; }
.page-header h1 { font-size:28px; color:var(--gray-900); letter-spacing:-0.5px; }
.page-header p { color:var(--gray-500); font-size:14px; margin-top:4px; }

.card { background:var(--white); border-radius:var(--radius); box-shadow:var(--shadow-sm); border:1px solid var(--gray-200); padding:24px; margin-bottom:20px; }
.card-title { font-family:'Playfair Display',serif; font-size:18px; font-weight:600; margin-bottom:16px; color:var(--gray-900); }

.stats-grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap:16px; margin-bottom:24px; }
.stat-card { background:var(--white); border-radius:var(--radius); padding:20px; border:1px solid var(--gray-200); box-shadow:var(--shadow-sm); }
.stat-label { font-size:12px; color:var(--gray-500); text-transform:uppercase; letter-spacing:0.5px; font-weight:600; }
.stat-value { font-size:28px; font-weight:700; color:var(--blue-600); margin-top:4px; font-family:'DM Sans',sans-serif; }
.stat-card.warning { border-left:4px solid var(--warning); }
.stat-card.success { border-left:4px solid var(--success); }
.stat-card.blue { border-left:4px solid var(--blue-400); }
.stat-card.danger { border-left:4px solid var(--danger); }

.form-grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(260px,1fr)); gap:16px; }
.form-group { display:flex; flex-direction:column; gap:5px; }
.form-group label { font-size:12.5px; font-weight:600; color:var(--gray-700); text-transform:uppercase; letter-spacing:0.3px; }
.form-group input, .form-group select, .form-group textarea { padding:10px 12px; border:1.5px solid var(--gray-200); border-radius:var(--radius-sm); font-size:14px; font-family:'DM Sans',sans-serif; background:var(--gray-50); transition:border .2s; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline:none; border-color:var(--blue-400); background:#fff; box-shadow:0 0 0 3px var(--blue-100); }
.form-group input.error, .form-group select.error { border-color: var(--danger); }

.btn { padding:10px 20px; border-radius:var(--radius-sm); font-size:14px; font-weight:600; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; display:inline-flex; align-items:center; gap:8px; }
.btn-primary { background:var(--blue-500); color:#fff; }
.btn-primary:hover { background:var(--blue-600); transform:translateY(-1px); box-shadow:var(--shadow-md); }
.btn-secondary { background:var(--beige-100); color:var(--gray-800); border:1px solid var(--beige-200); }
.btn-secondary:hover { background:var(--beige-200); }
.btn-danger { background:var(--danger); color:#fff; }
.btn-danger:hover { opacity:0.9; }
.btn-success { background:var(--success); color:#fff; }
.btn-sm { padding:6px 14px; font-size:13px; }

table { width:100%; border-collapse:collapse; font-size:13px; }
table th { background:var(--blue-50); color:var(--blue-600); font-weight:600; text-transform:uppercase; font-size:11px; letter-spacing:0.5px; padding:10px 12px; text-align:left; border-bottom:2px solid var(--blue-200); position:sticky; top:0; }
table td { padding:10px 12px; border-bottom:1px solid var(--gray-100); color:var(--gray-700); }
table tr:hover td { background:var(--blue-50); }
.table-wrap { max-height:500px; overflow:auto; border-radius:var(--radius-sm); border:1px solid var(--gray-200); }

.badge { display:inline-block; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:600; }
.badge-blue { background:var(--blue-100); color:var(--blue-600); }
.badge-beige { background:var(--beige-100); color:var(--beige-500); }
.badge-green { background:#dcfce7; color:#16a34a; }
.badge-red { background:#fee2e2; color:#dc2626; }
.badge-yellow { background:#fef3c7; color:#b45309; }

.alert { padding:14px 18px; border-radius:var(--radius-sm); margin-bottom:16px; font-size:13.5px; display:flex; align-items:center; gap:10px; }
.alert-warning { background:#fef3c7; border:1px solid #fde68a; color:#92400e; }
.alert-info { background:var(--blue-50); border:1px solid var(--blue-200); color:var(--blue-600); }
.alert-success { background:#dcfce7; border:1px solid #bbf7d0; color:#166534; }

.login-page { min-height:100vh; display:flex; align-items:center; justify-content:center; background: linear-gradient(135deg, var(--blue-100) 0%, var(--beige-50) 50%, var(--beige-100) 100%); }
.login-card { background:var(--white); border-radius:16px; padding:48px 40px; box-shadow:var(--shadow-lg); max-width:420px; width:100%; text-align:center; }
.login-card h1 { font-size:32px; color:var(--blue-600); margin-bottom:4px; }
.login-card p { color:var(--gray-500); margin-bottom:28px; }
.login-card .form-group { text-align:left; margin-bottom:16px; }
.login-card .btn { width:100%; justify-content:center; margin-top:8px; padding:12px; font-size:15px; }

.tabs { display:flex; gap:4px; margin-bottom:20px; border-bottom:2px solid var(--gray-200); padding-bottom:0; }
.tab { padding:10px 18px; cursor:pointer; font-size:13.5px; font-weight:600; color:var(--gray-500); border:none; background:none; border-bottom:2px solid transparent; margin-bottom:-2px; transition:all .2s; }
.tab.active { color:var(--blue-600); border-bottom-color:var(--blue-500); }
.tab:hover { color:var(--blue-500); }

.modal-overlay { position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center; z-index:1000; }
.modal { background:var(--white); border-radius:var(--radius); padding:28px; max-width:600px; width:95%; max-height:85vh; overflow-y:auto; box-shadow:var(--shadow-lg); }
.modal h3 { font-family:'Playfair Display',serif; font-size:20px; margin-bottom:16px; }

.sig-canvas { border:2px dashed var(--gray-300); border-radius:var(--radius-sm); cursor:crosshair; background:#fff; }
.photo-preview { width:120px; height:120px; border-radius:var(--radius-sm); object-fit:cover; border:2px solid var(--gray-200); }

.hamburger { display:none; position:fixed; top:16px; left:16px; z-index:200; background:var(--blue-600); color:#fff; border:none; border-radius:8px; width:40px; height:40px; font-size:20px; cursor:pointer; }
@media(max-width:768px) {
  .sidebar { transform:translateX(-100%); }
  .sidebar.open { transform:translateX(0); }
  .main { margin-left:0; padding:20px 16px; padding-top:60px; }
  .hamburger { display:flex; align-items:center; justify-content:center; }
  .form-grid { grid-template-columns:1fr; }
  .stats-grid { grid-template-columns:1fr 1fr; }
}

.fade-in { animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

.empty-state { text-align:center; padding:48px 20px; color:var(--gray-500); }
.empty-state .icon { font-size:48px; margin-bottom:12px; }
.empty-state p { font-size:14px; }

.search-bar { position:relative; margin-bottom:16px; }
.search-bar input { width:100%; padding:10px 12px 10px 38px; border:1.5px solid var(--gray-200); border-radius:var(--radius-sm); font-size:14px; background:var(--gray-50); }
.search-bar input:focus { outline:none; border-color:var(--blue-400); background:#fff; }
.search-icon { position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--gray-500); }
`;

// ==================== COMPONENTS ====================

function SignaturePad({ onSave, onCancel }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  const getPos = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX - r.left, y: t.clientY - r.top };
  };

  const start = (e) => { e.preventDefault(); setDrawing(true); const ctx = canvasRef.current.getContext('2d'); ctx.beginPath(); const p = getPos(e); ctx.moveTo(p.x, p.y); };
  const draw = (e) => { if (!drawing) return; e.preventDefault(); const ctx = canvasRef.current.getContext('2d'); const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.stroke(); };
  const stop = () => setDrawing(false);
  const clear = () => { const ctx = canvasRef.current.getContext('2d'); ctx.clearRect(0, 0, 400, 150); };

  return (
    <div>
      <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: 8 }}>Dibuje su firma:</p>
      <canvas ref={canvasRef} width={400} height={150} className="sig-canvas"
        onMouseDown={start} onMouseMove={draw} onMouseUp={stop} onMouseLeave={stop}
        onTouchStart={start} onTouchMove={draw} onTouchEnd={stop} />
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button className="btn btn-secondary btn-sm" onClick={clear}>Limpiar</button>
        <button className="btn btn-primary btn-sm" onClick={() => onSave(canvasRef.current.toDataURL())}>Guardar Firma</button>
        <button className="btn btn-secondary btn-sm" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}

function PhotoCapture({ onCapture }) {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setPreview(ev.target.result); onCapture(ev.target.result); };
    reader.readAsDataURL(f);
  };
  return (
    <div>
      <input type="file" accept="image/*" capture="environment" ref={fileRef} onChange={handleFile} style={{ display: 'none' }} />
      <button className="btn btn-secondary btn-sm" onClick={() => fileRef.current.click()}>📷 Tomar / Subir Foto</button>
      {preview && <img src={preview} alt="preview" className="photo-preview" style={{ marginTop: 8, display: 'block' }} />}
    </div>
  );
}

// ==================== MAIN APP ====================
export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [panel, setPanel] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // DATA STATES
  const [empleados, setEmpleados] = useState([]);
  const [inventario, setInventario] = useState({});
  const [entregas, setEntregas] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [certificados, setCertificados] = useState([]);
  const [novedades, setNovedades] = useState([]);
  const [vacaciones, setVacaciones] = useState([]);

  useEffect(() => {
    (async () => {
      const u = await loadData(KEYS.user, null);
      if (u) setUser(u);
      const emp = await loadData(KEYS.empleados, []);
      setEmpleados(emp);
      const inv = await loadData(KEYS.inventario, {});
      const defaultInv = {};
      DOTACION_ITEMS.forEach(it => { defaultInv[it] = { stock: 0, precio: 0 }; });
      setInventario(Object.keys(inv).length ? inv : defaultInv);
      setEntregas(await loadData(KEYS.entregas, []));
      setSolicitudes(await loadData(KEYS.solicitudes, []));
      setCertificados(await loadData(KEYS.certificados, []));
      setNovedades(await loadData(KEYS.novedades, []));
      setVacaciones(await loadData(KEYS.vacaciones, []));
      setLoading(false);
    })();
  }, []);

  const save = useCallback(async (key, data) => { await saveData(key, data); }, []);

  if (loading) return <div style={{ display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'DM Sans',color:'#3b76f0' }}><div style={{textAlign:'center'}}><div style={{fontSize:48,marginBottom:12}}>🍽️</div><p>Cargando CRONCH...</p></div></div>;

  if (!user) return <LoginPage onLogin={(u) => { setUser(u); save(KEYS.user, u); }} />;

  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Informes' },
    { id: 'registro', icon: '👤', label: 'Registro Personal' },
    { id: 'dotacion', icon: '👕', label: 'Inventario Dotación' },
    { id: 'solicitudes', icon: '📋', label: 'Solicitud Certificados' },
    { id: 'certificados', icon: '📄', label: 'Certificados Laborales' },
    { id: 'novedades', icon: '📝', label: 'Novedades Personal' },
    { id: 'vacaciones', icon: '🏖️', label: 'Vacaciones' },
    { id: 'alertas', icon: '🔔', label: 'Alertas' },
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h2>🍽️ CRONCH</h2>
            <p>Gestión de Personal</p>
          </div>
          <nav className="sidebar-nav">
            {navItems.map(n => (
              <button key={n.id} className={`nav-item ${panel === n.id ? 'active' : ''}`}
                onClick={() => { setPanel(n.id); setSidebarOpen(false); }}>
                <span className="nav-icon">{n.icon}</span>{n.label}
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div className="user-badge">
              <div className="user-avatar">{user.nombre?.[0] || 'U'}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{user.nombre}</div>
                <div style={{ fontSize: 11, opacity: 0.6 }}>{user.email}</div>
              </div>
            </div>
            <button className="btn btn-secondary btn-sm" style={{ width:'100%', marginTop:10, fontSize:12 }}
              onClick={() => { setUser(null); save(KEYS.user, null); }}>Cerrar sesión</button>
          </div>
        </aside>

        <main className="main">
          <div className="fade-in">
            {panel === 'dashboard' && <DashboardPanel empleados={empleados} entregas={entregas} solicitudes={solicitudes} certificados={certificados} novedades={novedades} inventario={inventario} />}
            {panel === 'registro' && <RegistroPanel empleados={empleados} setEmpleados={(e)=>{setEmpleados(e);save(KEYS.empleados,e);}} />}
            {panel === 'dotacion' && <DotacionPanel inventario={inventario} setInventario={(i)=>{setInventario(i);save(KEYS.inventario,i);}} entregas={entregas} setEntregas={(e)=>{setEntregas(e);save(KEYS.entregas,e);}} empleados={empleados} user={user} />}
            {panel === 'solicitudes' && <SolicitudesPanel solicitudes={solicitudes} setSolicitudes={(s)=>{setSolicitudes(s);save(KEYS.solicitudes,s);}} />}
            {panel === 'certificados' && <CertificadosPanel certificados={certificados} setCertificados={(c)=>{setCertificados(c);save(KEYS.certificados,c);}} />}
            {panel === 'novedades' && <NovedadesPanel novedades={novedades} setNovedades={(n)=>{setNovedades(n);save(KEYS.novedades,n);}} empleados={empleados} user={user} />}
            {panel === 'vacaciones' && <VacacionesPanel empleados={empleados} vacaciones={vacaciones} setVacaciones={(v)=>{setVacaciones(v);save(KEYS.vacaciones,v);}} novedades={novedades} />}
            {panel === 'alertas' && <AlertasPanel empleados={empleados} entregas={entregas} />}
          </div>
        </main>
      </div>
    </>
  );
}

// ==================== LOGIN ====================
function LoginPage({ onLogin }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = () => {
    const e = {};
    if (!nombre.trim()) e.nombre = true;
    if (!email.trim() || !email.includes('@')) e.email = true;
    setErrors(e);
    if (Object.keys(e).length === 0) onLogin({ nombre: nombre.trim(), email: email.trim() });
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="login-page">
        <div className="login-card">
          <h1>🍽️ CRONCH</h1>
          <p style={{ fontSize: 15 }}>Sistema de Gestión de Personal</p>
          <p style={{ fontSize: 12, color: '#9ca3af', marginTop: -16, marginBottom: 24 }}>Artesanalmente Oblea S.A.S</p>
          <div className="form-group">
            <label>Nombre completo *</label>
            <input className={errors.nombre ? 'error' : ''} value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Tu nombre" />
          </div>
          <div className="form-group">
            <label>Correo electrónico *</label>
            <input className={errors.email ? 'error' : ''} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="correo@ejemplo.com" />
          </div>
          <button className="btn btn-primary" onClick={handleLogin}>Ingresar</button>
        </div>
      </div>
    </>
  );
}

// ==================== DASHBOARD / INFORMES ====================
function DashboardPanel({ empleados, entregas, solicitudes, certificados, novedades, inventario }) {
  const contrato = empleados.filter(e => e.tipoVinculacion === 'Contrato').length;
  const apoyo = empleados.filter(e => e.tipoVinculacion === 'Apoyo').length;

  const empleadosConDotacion = new Set(entregas.map(e => e.empleadoDoc)).size;
  const empleadosSinDotacion = empleados.length - empleadosConDotacion;

  const costoInventario = Object.values(inventario).reduce((s, v) => s + (v.stock * v.precio), 0);

  const novedadesPorMes = {};
  MESES.forEach(m => { novedadesPorMes[m] = 0; });
  novedades.forEach(n => { if (novedadesPorMes[n.mes] !== undefined) novedadesPorMes[n.mes]++; });

  // Vacaciones desde VACACIONES_DATA
  const vacCritica = VACACIONES_DATA.filter(v => v.diasPendientes > 30).length;
  const vacAlta = VACACIONES_DATA.filter(v => v.diasPendientes > 15 && v.diasPendientes <= 30).length;
  const vacNormal = VACACIONES_DATA.filter(v => v.diasPendientes > 0 && v.diasPendientes <= 15).length;
  const vacAlDia = VACACIONES_DATA.filter(v => v.diasPendientes <= 0).length;
  const totalConPendientes = VACACIONES_DATA.filter(v => v.diasPendientes > 0).length;
  const totalDiasPend = VACACIONES_DATA.reduce((s, v) => s + Math.max(0, v.diasPendientes), 0);

  return (
    <div>
      <div className="page-header"><h1>Panel de Informes</h1><p>Resumen general de la gestión de personal</p></div>
      <div className="stats-grid">
        <div className="stat-card blue"><div className="stat-label">Empleados con Contrato</div><div className="stat-value">{contrato}</div></div>
        <div className="stat-card warning"><div className="stat-label">Personal de Apoyo</div><div className="stat-value">{apoyo}</div></div>
        <div className="stat-card blue"><div className="stat-label">Solicitudes de Certificados</div><div className="stat-value">{solicitudes.length}</div></div>
        <div className="stat-card success"><div className="stat-label">Certificados Generados</div><div className="stat-value">{certificados.length}</div></div>
        <div className="stat-card success"><div className="stat-label">Empleados con Dotación</div><div className="stat-value">{empleadosConDotacion}</div></div>
        <div className="stat-card danger"><div className="stat-label">Pendientes de Dotación</div><div className="stat-value">{empleadosSinDotacion}</div></div>
        <div className="stat-card blue"><div className="stat-label">Total Empleados Registrados</div><div className="stat-value">{empleados.length}</div></div>
        <div className="stat-card warning"><div className="stat-label">Costo Inventario en Bodega</div><div className="stat-value" style={{fontSize:20}}>{formatCurrency(costoInventario)}</div></div>
      </div>

      <div className="card" style={{background:'linear-gradient(135deg, #f0f5ff 0%, #fef3c7 100%)',border:'2px solid #fde68a'}}>
        <div className="card-title">🏖️ Indicador de Vacaciones Pendientes</div>
        {totalConPendientes > 0 && (
          <div className="alert alert-warning" style={{marginBottom:16}}>⚠️ Se le deben vacaciones a <strong>{totalConPendientes}</strong> de {VACACIONES_DATA.length} empleados — Total: <strong>{totalDiasPend} días</strong> pendientes en la empresa</div>
        )}
        <div className="stats-grid" style={{marginBottom:16}}>
          <div className="stat-card danger">
            <div className="stat-label">🔴 Urgencia Crítica (+30 días)</div>
            <div className="stat-value" style={{color:'#dc2626'}}>{vacCritica}</div>
            <div style={{fontSize:11,color:'#6b7280',marginTop:4}}>Requieren programación inmediata</div>
          </div>
          <div className="stat-card warning">
            <div className="stat-label">🟡 Urgencia Alta (16-30 días)</div>
            <div className="stat-value" style={{color:'#b45309'}}>{vacAlta}</div>
            <div style={{fontSize:11,color:'#6b7280',marginTop:4}}>Programar pronto</div>
          </div>
          <div className="stat-card blue">
            <div className="stat-label">🔵 Normal (1-15 días)</div>
            <div className="stat-value" style={{color:'#2563eb'}}>{vacNormal}</div>
            <div style={{fontSize:11,color:'#6b7280',marginTop:4}}>Pendientes controlados</div>
          </div>
          <div className="stat-card success">
            <div className="stat-label">🟢 Al Día (0 días)</div>
            <div className="stat-value" style={{color:'#16a34a'}}>{vacAlDia}</div>
            <div style={{fontSize:11,color:'#6b7280',marginTop:4}}>Sin pendientes</div>
          </div>
        </div>

        <div style={{width:'100%',height:28,background:'#e5e7eb',borderRadius:14,overflow:'hidden',display:'flex',marginBottom:12}}>
          {vacCritica > 0 && <div style={{width:`${(vacCritica/VACACIONES_DATA.length)*100}%`,background:'#dc2626',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:11,fontWeight:700}}>{vacCritica}</div>}
          {vacAlta > 0 && <div style={{width:`${(vacAlta/VACACIONES_DATA.length)*100}%`,background:'#f59e0b',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:11,fontWeight:700}}>{vacAlta}</div>}
          {vacNormal > 0 && <div style={{width:`${(vacNormal/VACACIONES_DATA.length)*100}%`,background:'#3b82f6',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:11,fontWeight:700}}>{vacNormal}</div>}
          {vacAlDia > 0 && <div style={{width:`${(vacAlDia/VACACIONES_DATA.length)*100}%`,background:'#22c55e',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:11,fontWeight:700}}>{vacAlDia}</div>}
        </div>
        <div style={{display:'flex',gap:16,fontSize:11,color:'#6b7280',flexWrap:'wrap'}}>
          <span>🔴 Crítica: {Math.round((vacCritica/VACACIONES_DATA.length)*100)}%</span>
          <span>🟡 Alta: {Math.round((vacAlta/VACACIONES_DATA.length)*100)}%</span>
          <span>🔵 Normal: {Math.round((vacNormal/VACACIONES_DATA.length)*100)}%</span>
          <span>🟢 Al día: {Math.round((vacAlDia/VACACIONES_DATA.length)*100)}%</span>
        </div>

        {vacCritica > 0 && (
          <div style={{marginTop:16}}>
            <p style={{fontSize:13,fontWeight:700,color:'#dc2626',marginBottom:8}}>⚠️ Empleados con urgencia CRÍTICA:</p>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {VACACIONES_DATA.filter(v=>v.diasPendientes>30).map((v,i)=>(
                <div key={i} style={{background:'#fee2e2',border:'1px solid #fca5a5',borderRadius:8,padding:'8px 14px',fontSize:12}}>
                  <strong>{v.nombre}</strong> — <span style={{color:'#dc2626',fontWeight:700}}>{v.diasPendientes} días</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-title">Inventario Disponible en Bodega</div>
        <div className="table-wrap">
          <table><thead><tr><th>Artículo</th><th>Stock</th><th>Precio Unitario</th><th>Valor Total</th></tr></thead>
            <tbody>
              {DOTACION_ITEMS.map(it => (
                <tr key={it}><td>{it}</td><td>{inventario[it]?.stock || 0}</td><td>{formatCurrency(inventario[it]?.precio || 0)}</td><td>{formatCurrency((inventario[it]?.stock || 0) * (inventario[it]?.precio || 0))}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Novedades por Mes</div>
        <div className="table-wrap">
          <table><thead><tr><th>Mes</th><th>Cantidad</th></tr></thead>
            <tbody>{MESES.map(m => <tr key={m}><td>{m}</td><td><span className="badge badge-blue">{novedadesPorMes[m]}</span></td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==================== REGISTRO PERSONAL ====================
function RegistroPanel({ empleados, setEmpleados }) {
  const empty = { apellidos:'',nombres:'',tipoDoc:'CC',documento:'',fechaNac:'',sexo:'Femenino',direccion:'',telefono:'',cargo:CARGOS[0],subDireccion:SUB_DIRECCIONES[0],sede:SEDES[0],tipoVinculacion:TIPOS_VINCULACION[0],fechaIngreso:'',tallaCamisa:TALLAS_CAMISA[0],tallaPantalon:TALLAS_PANTALON[0],tallaZapatos:TALLAS_ZAPATOS[0] };
  const [form, setForm] = useState({...empty});
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const required = ['apellidos','nombres','documento','fechaNac','direccion','telefono','fechaIngreso'];
  const handleChange = (k, v) => setForm(p => ({...p,[k]:v}));

  const handleSubmit = () => {
    const e = {};
    required.forEach(f => { if (!form[f]?.trim()) e[f] = true; });
    setErrors(e);
    if (Object.keys(e).length) return;
    if (editIdx !== null) {
      const updated = [...empleados];
      updated[editIdx] = {...form};
      setEmpleados(updated);
      setEditIdx(null);
    } else {
      setEmpleados([...empleados, {...form}]);
    }
    setForm({...empty});
    setShowForm(false);
  };

  const handleEdit = (i) => { setForm({...empleados[i]}); setEditIdx(i); setShowForm(true); };
  const handleDelete = (i) => { if (confirm('¿Eliminar este empleado?')) setEmpleados(empleados.filter((_,j) => j !== i)); };

  const filtered = empleados.filter(e => {
    const s = search.toLowerCase();
    return !s || `${e.nombres} ${e.apellidos} ${e.documento}`.toLowerCase().includes(s);
  });

  return (
    <div>
      <div className="page-header">
        <h1>Registro de Personal</h1><p>Gestión de empleados del restaurante</p>
      </div>

      <div style={{display:'flex',gap:12,marginBottom:20,flexWrap:'wrap'}}>
        <button className="btn btn-primary" onClick={()=>{setForm({...empty});setEditIdx(null);setShowForm(!showForm);}}>
          {showForm ? '✕ Cerrar Formulario' : '+ Nuevo Empleado'}
        </button>
      </div>

      {showForm && (
        <div className="card fade-in">
          <div className="card-title">{editIdx !== null ? 'Editar Empleado' : 'Registrar Nuevo Empleado'}</div>
          <div className="form-grid">
            <div className="form-group"><label>Apellidos *</label><input className={errors.apellidos?'error':''} value={form.apellidos} onChange={e=>handleChange('apellidos',e.target.value)} /></div>
            <div className="form-group"><label>Nombres *</label><input className={errors.nombres?'error':''} value={form.nombres} onChange={e=>handleChange('nombres',e.target.value)} /></div>
            <div className="form-group"><label>Tipo Documento</label><select value={form.tipoDoc} onChange={e=>handleChange('tipoDoc',e.target.value)}>{TIPOS_DOC.map(t=><option key={t}>{t}</option>)}</select></div>
            <div className="form-group"><label>Nº Documento *</label><input className={errors.documento?'error':''} value={form.documento} onChange={e=>handleChange('documento',e.target.value)} /></div>
            <div className="form-group"><label>Fecha Nacimiento *</label><input type="date" className={errors.fechaNac?'error':''} value={form.fechaNac} onChange={e=>handleChange('fechaNac',e.target.value)} /></div>
            <div className="form-group"><label>Sexo</label><select value={form.sexo} onChange={e=>handleChange('sexo',e.target.value)}><option>Femenino</option><option>Masculino</option></select></div>
            <div className="form-group"><label>Dirección *</label><input className={errors.direccion?'error':''} value={form.direccion} onChange={e=>handleChange('direccion',e.target.value)} /></div>
            <div className="form-group"><label>Teléfono *</label><input className={errors.telefono?'error':''} value={form.telefono} onChange={e=>handleChange('telefono',e.target.value)} /></div>
            <div className="form-group"><label>Cargo</label><select value={form.cargo} onChange={e=>handleChange('cargo',e.target.value)}>{CARGOS.map(c=><option key={c}>{c}</option>)}</select></div>
            <div className="form-group"><label>Sub Dirección</label><select value={form.subDireccion} onChange={e=>handleChange('subDireccion',e.target.value)}>{SUB_DIRECCIONES.map(s=><option key={s}>{s}</option>)}</select></div>
            <div className="form-group"><label>Sede</label><select value={form.sede} onChange={e=>handleChange('sede',e.target.value)}>{SEDES.map(s=><option key={s}>{s}</option>)}</select></div>
            <div className="form-group"><label>Tipo Vinculación</label><select value={form.tipoVinculacion} onChange={e=>handleChange('tipoVinculacion',e.target.value)}>{TIPOS_VINCULACION.map(t=><option key={t}>{t}</option>)}</select></div>
            <div className="form-group"><label>Fecha Ingreso *</label><input type="date" className={errors.fechaIngreso?'error':''} value={form.fechaIngreso} onChange={e=>handleChange('fechaIngreso',e.target.value)} /></div>
            <div className="form-group"><label>Talla Camisa</label><select value={form.tallaCamisa} onChange={e=>handleChange('tallaCamisa',e.target.value)}>{TALLAS_CAMISA.map(t=><option key={t}>{t}</option>)}</select></div>
            <div className="form-group"><label>Talla Pantalón</label><select value={form.tallaPantalon} onChange={e=>handleChange('tallaPantalon',e.target.value)}>{TALLAS_PANTALON.map(t=><option key={t}>{t}</option>)}</select></div>
            <div className="form-group"><label>Talla Zapatos</label><select value={form.tallaZapatos} onChange={e=>handleChange('tallaZapatos',e.target.value)}>{TALLAS_ZAPATOS.map(t=><option key={t}>{t}</option>)}</select></div>
          </div>
          <div style={{marginTop:20,display:'flex',gap:10}}>
            <button className="btn btn-primary" onClick={handleSubmit}>{editIdx!==null ? 'Guardar Cambios' : 'Registrar Empleado'}</button>
            <button className="btn btn-secondary" onClick={()=>{setShowForm(false);setEditIdx(null);}}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="card">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input placeholder="Buscar por nombre o documento..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        {filtered.length === 0 ? (
          <div className="empty-state"><div className="icon">👤</div><p>No hay empleados registrados aún</p></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Nombre</th><th>Documento</th><th>Cargo</th><th>Sede</th><th>Vinculación</th><th>Ingreso</th><th>Acciones</th></tr></thead>
              <tbody>
                {filtered.map((e,i) => (
                  <tr key={i}>
                    <td style={{fontWeight:500}}>{e.nombres} {e.apellidos}</td>
                    <td>{e.tipoDoc} {e.documento}</td>
                    <td>{e.cargo}</td>
                    <td><span className="badge badge-beige">{e.sede}</span></td>
                    <td><span className={`badge ${e.tipoVinculacion==='Contrato'?'badge-green':'badge-yellow'}`}>{e.tipoVinculacion}</span></td>
                    <td>{e.fechaIngreso}</td>
                    <td>
                      <button className="btn btn-secondary btn-sm" onClick={()=>handleEdit(empleados.indexOf(e))} style={{marginRight:4}}>✏️</button>
                      <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(empleados.indexOf(e))}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== DOTACIÓN (INVENTARIO + ENTREGAS) ====================
function DotacionPanel({ inventario, setInventario, entregas, setEntregas, empleados, user }) {
  const [tab, setTab] = useState('inventario');
  const [entregaForm, setEntregaForm] = useState({ empleadoNombre: '', empleadoDoc: '', items: [], responsable: '', firma: null, foto: null, fecha: todayISO() });
  const [showEntregaForm, setShowEntregaForm] = useState(false);
  const [showSigPad, setShowSigPad] = useState(false);
  const [entregaItems, setEntregaItems] = useState([{ articulo: DOTACION_ITEMS[0], cantidad: 1 }]);

  const handleInvChange = (item, field, val) => {
    const updated = { ...inventario, [item]: { ...inventario[item], [field]: Number(val) || 0 } };
    setInventario(updated);
  };

  const addEntregaItem = () => setEntregaItems([...entregaItems, { articulo: DOTACION_ITEMS[0], cantidad: 1 }]);
  const removeEntregaItem = (i) => setEntregaItems(entregaItems.filter((_, j) => j !== i));

  const submitEntrega = () => {
    if (!entregaForm.empleadoNombre || !entregaForm.empleadoDoc || !entregaForm.responsable || entregaItems.length === 0) {
      alert('Todos los campos son obligatorios'); return;
    }
    // Descontar del inventario
    const updatedInv = { ...inventario };
    entregaItems.forEach(ei => {
      if (updatedInv[ei.articulo]) {
        updatedInv[ei.articulo] = { ...updatedInv[ei.articulo], stock: Math.max(0, updatedInv[ei.articulo].stock - ei.cantidad) };
      }
    });
    setInventario(updatedInv);

    const newEntrega = {
      ...entregaForm,
      items: entregaItems,
      id: Date.now(),
      fechaCreacion: new Date().toISOString(),
    };

    // Generar PDF del acta de entrega
    const itemsHTML = entregaItems.map(ei => `<tr><td style="border:1px solid #ccc;padding:8px;">${ei.articulo}</td><td style="border:1px solid #ccc;padding:8px;text-align:center;">${ei.cantidad}</td></tr>`).join('');
    const firmaImg = entregaForm.firma ? `<img src="${entregaForm.firma}" style="height:60px;" />` : '<p style="margin-top:40px;">_________________________</p>';
    const fotoImg = entregaForm.foto ? `<img src="${entregaForm.foto}" style="height:100px;border-radius:8px;" />` : '';
    const actaHTML = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Acta de Entrega - ${entregaForm.empleadoNombre}</title>
    <style>
      @page { size: letter; margin: 2cm 2.5cm; }
      body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.6; color: #000; }
      h1 { text-align: center; font-size: 16pt; margin-bottom: 5px; }
      h2 { text-align: center; font-size: 13pt; font-weight: normal; color: #555; margin-bottom: 20px; }
      .info { margin: 15px 0; }
      .info p { margin: 4px 0; }
      table { width: 100%; border-collapse: collapse; margin: 15px 0; }
      th { background: #2a5cc7; color: #fff; padding: 8px; text-align: left; }
      .firmas { display: flex; justify-content: space-between; margin-top: 40px; }
      .firma-box { text-align: center; width: 45%; }
      @media print { body { -webkit-print-color-adjust: exact; } }
    </style></head><body>
      <h1>ACTA DE ENTREGA DE DOTACIÓN</h1>
      <h2>Cronch Artesanalmente Oblea S.A.S — NIT 901.481.136-4</h2>
      <hr style="border:1px solid #2a5cc7;margin-bottom:20px;">
      <div class="info">
        <p><strong>Fecha:</strong> ${entregaForm.fecha}</p>
        <p><strong>Empleado:</strong> ${entregaForm.empleadoNombre}</p>
        <p><strong>Documento:</strong> ${entregaForm.empleadoDoc}</p>
        <p><strong>Responsable de entrega:</strong> ${entregaForm.responsable}</p>
      </div>
      <table>
        <thead><tr><th>Artículo</th><th style="text-align:center;">Cantidad</th></tr></thead>
        <tbody>${itemsHTML}</tbody>
      </table>
      <p style="margin-top:20px;text-align:justify;">Yo, <strong>${entregaForm.empleadoNombre}</strong>, identificado(a) con documento N° <strong>${entregaForm.empleadoDoc}</strong>, declaro haber recibido a mi entera satisfacción los elementos de dotación relacionados anteriormente, comprometiéndome a darles buen uso y cuidado.</p>
      <div class="firmas">
        <div class="firma-box">
          <p><strong>Quien recibe:</strong></p>
          ${firmaImg}
          <p>${entregaForm.empleadoNombre}</p>
          <p>CC. ${entregaForm.empleadoDoc}</p>
        </div>
        <div class="firma-box">
          <p><strong>Quien entrega:</strong></p>
          <p style="margin-top:40px;">_________________________</p>
          <p>${entregaForm.responsable}</p>
        </div>
      </div>
      ${fotoImg ? '<div style="margin-top:20px;"><p><strong>Foto del empleado:</strong></p>' + fotoImg + '</div>' : ''}
    </body></html>`;
    const ventanaActa = window.open('', '_blank');
    ventanaActa.document.write(actaHTML);
    ventanaActa.document.close();
    setTimeout(() => { ventanaActa.print(); }, 500);

    setEntregas([...entregas, newEntrega]);
    setEntregaForm({ empleadoNombre: '', empleadoDoc: '', items: [], responsable: '', firma: null, foto: null, fecha: todayISO() });
    setEntregaItems([{ articulo: DOTACION_ITEMS[0], cantidad: 1 }]);
    setShowEntregaForm(false);
    alert('✅ Acta de entrega registrada correctamente');
  };

  return (
    <div>
      <div className="page-header"><h1>Inventario de Dotación</h1><p>Stock, entregas y actas de dotación</p></div>
      <div className="tabs">
        <button className={`tab ${tab==='inventario'?'active':''}`} onClick={()=>setTab('inventario')}>📦 Stock</button>
        <button className={`tab ${tab==='entregas'?'active':''}`} onClick={()=>setTab('entregas')}>📋 Entregas</button>
        <button className={`tab ${tab==='nueva'?'active':''}`} onClick={()=>{setTab('nueva');setShowEntregaForm(true);}}>+ Nueva Entrega</button>
      </div>

      {tab === 'inventario' && (
        <div className="card fade-in">
          <div className="card-title">Stock de Dotación</div>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>Ingrese la cantidad disponible y el precio de compra de cada artículo.</p>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Artículo</th><th>Stock Actual</th><th>Precio Unitario</th><th>Valor Total</th></tr></thead>
              <tbody>
                {DOTACION_ITEMS.map(it => (
                  <tr key={it}>
                    <td style={{fontWeight:500}}>{it}</td>
                    <td><input type="number" min="0" style={{width:80,padding:'6px 8px',border:'1.5px solid #e5e7eb',borderRadius:6}} value={inventario[it]?.stock||0} onChange={e=>handleInvChange(it,'stock',e.target.value)} /></td>
                    <td><input type="number" min="0" style={{width:110,padding:'6px 8px',border:'1.5px solid #e5e7eb',borderRadius:6}} value={inventario[it]?.precio||0} onChange={e=>handleInvChange(it,'precio',e.target.value)} /></td>
                    <td>{formatCurrency((inventario[it]?.stock||0)*(inventario[it]?.precio||0))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'entregas' && (
        <div className="card fade-in">
          <div className="card-title">Historial de Entregas</div>
          {entregas.length === 0 ? (
            <div className="empty-state"><div className="icon">📋</div><p>No hay entregas registradas</p></div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead><tr><th>Fecha</th><th>Empleado</th><th>Documento</th><th>Artículos</th><th>Responsable</th><th>Firma</th><th>Foto</th><th>Acta</th></tr></thead>
                <tbody>
                  {entregas.map((e,i) => (
                    <tr key={i}>
                      <td>{e.fecha}</td>
                      <td style={{fontWeight:500}}>{e.empleadoNombre}</td>
                      <td>{e.empleadoDoc}</td>
                      <td>{e.items?.map(it => `${it.articulo} (${it.cantidad})`).join(', ')}</td>
                      <td>{e.responsable}</td>
                      <td>{e.firma ? '✅' : '—'}</td>
                      <td>{e.foto ? '📷' : '—'}</td>
                      <td><button className="btn btn-primary btn-sm" onClick={()=>{
                        const itemsH = e.items?.map(ei => `<tr><td style="border:1px solid #ccc;padding:8px;">${ei.articulo}</td><td style="border:1px solid #ccc;padding:8px;text-align:center;">${ei.cantidad}</td></tr>`).join('');
                        const fImg = e.firma ? `<img src="${e.firma}" style="height:60px;" />` : '<p style="margin-top:40px;">_________________________</p>';
                        const pImg = e.foto ? `<div style="margin-top:20px;"><p><strong>Foto:</strong></p><img src="${e.foto}" style="height:100px;border-radius:8px;" /></div>` : '';
                        const h = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Acta - ${e.empleadoNombre}</title><style>@page{size:letter;margin:2cm 2.5cm}body{font-family:'Times New Roman',serif;font-size:12pt;line-height:1.6}h1{text-align:center;font-size:16pt}h2{text-align:center;font-size:13pt;font-weight:normal;color:#555}table{width:100%;border-collapse:collapse;margin:15px 0}th{background:#2a5cc7;color:#fff;padding:8px}.firmas{display:flex;justify-content:space-between;margin-top:40px}.firma-box{text-align:center;width:45%}@media print{body{-webkit-print-color-adjust:exact}}</style></head><body><h1>ACTA DE ENTREGA DE DOTACIÓN</h1><h2>Cronch Artesanalmente Oblea S.A.S — NIT 901.481.136-4</h2><hr style="border:1px solid #2a5cc7;margin-bottom:20px"><div><p><strong>Fecha:</strong> ${e.fecha}</p><p><strong>Empleado:</strong> ${e.empleadoNombre}</p><p><strong>Documento:</strong> ${e.empleadoDoc}</p><p><strong>Responsable:</strong> ${e.responsable}</p></div><table><thead><tr><th>Artículo</th><th>Cantidad</th></tr></thead><tbody>${itemsH}</tbody></table><p style="margin-top:20px;text-align:justify">Yo, <strong>${e.empleadoNombre}</strong>, identificado(a) con documento N° <strong>${e.empleadoDoc}</strong>, declaro haber recibido a mi entera satisfacción los elementos de dotación relacionados.</p><div class="firmas"><div class="firma-box"><p><strong>Quien recibe:</strong></p>${fImg}<p>${e.empleadoNombre}</p></div><div class="firma-box"><p><strong>Quien entrega:</strong></p><p style="margin-top:40px">_________________________</p><p>${e.responsable}</p></div></div>${pImg}</body></html>`;
                        const w = window.open('','_blank'); w.document.write(h); w.document.close(); setTimeout(()=>{w.print();},500);
                      }}>📄 PDF</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {(tab === 'nueva' || showEntregaForm) && (
        <div className="card fade-in">
          <div className="card-title">Nueva Acta de Entrega</div>
          <div className="form-grid">
            <div className="form-group"><label>Empleado (Nombre) *</label>
              <select value={entregaForm.empleadoNombre} onChange={e => {
                const emp = empleados.find(em => `${em.nombres} ${em.apellidos}` === e.target.value);
                setEntregaForm({...entregaForm, empleadoNombre: e.target.value, empleadoDoc: emp?.documento || ''});
              }}>
                <option value="">Seleccionar...</option>
                {empleados.map((em,i) => <option key={i} value={`${em.nombres} ${em.apellidos}`}>{em.nombres} {em.apellidos}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Documento</label><input value={entregaForm.empleadoDoc} readOnly style={{background:'#f3f4f6'}} /></div>
            <div className="form-group"><label>Responsable de Entrega *</label><input value={entregaForm.responsable} onChange={e=>setEntregaForm({...entregaForm,responsable:e.target.value})} /></div>
            <div className="form-group"><label>Fecha</label><input type="date" value={entregaForm.fecha} onChange={e=>setEntregaForm({...entregaForm,fecha:e.target.value})} /></div>
          </div>

          <div style={{marginTop:20}}>
            <p style={{fontWeight:600,fontSize:13,marginBottom:10,color:'#374151'}}>ARTÍCULOS A ENTREGAR</p>
            {entregaItems.map((ei, idx) => (
              <div key={idx} style={{display:'flex',gap:10,alignItems:'center',marginBottom:8}}>
                <select value={ei.articulo} onChange={e=>{const u=[...entregaItems];u[idx].articulo=e.target.value;setEntregaItems(u);}} style={{flex:1,padding:'8px 10px',border:'1.5px solid #e5e7eb',borderRadius:6}}>
                  {DOTACION_ITEMS.map(it=><option key={it}>{it}</option>)}
                </select>
                <input type="number" min="1" value={ei.cantidad} onChange={e=>{const u=[...entregaItems];u[idx].cantidad=Number(e.target.value);setEntregaItems(u);}} style={{width:70,padding:'8px',border:'1.5px solid #e5e7eb',borderRadius:6}} />
                {entregaItems.length > 1 && <button className="btn btn-danger btn-sm" onClick={()=>removeEntregaItem(idx)}>✕</button>}
              </div>
            ))}
            <button className="btn btn-secondary btn-sm" onClick={addEntregaItem} style={{marginTop:4}}>+ Agregar artículo</button>
          </div>

          <div style={{marginTop:20,display:'flex',gap:24,flexWrap:'wrap'}}>
            <div>
              <p style={{fontWeight:600,fontSize:13,marginBottom:8,color:'#374151'}}>FIRMA DIGITAL</p>
              {entregaForm.firma ? (
                <div><img src={entregaForm.firma} alt="firma" style={{height:60,border:'1px solid #e5e7eb',borderRadius:6}} /><button className="btn btn-secondary btn-sm" style={{marginLeft:8}} onClick={()=>setEntregaForm({...entregaForm,firma:null})}>Cambiar</button></div>
              ) : showSigPad ? (
                <SignaturePad onSave={(d)=>{setEntregaForm({...entregaForm,firma:d});setShowSigPad(false);}} onCancel={()=>setShowSigPad(false)} />
              ) : (
                <button className="btn btn-secondary btn-sm" onClick={()=>setShowSigPad(true)}>✍️ Firmar</button>
              )}
            </div>
            <div>
              <p style={{fontWeight:600,fontSize:13,marginBottom:8,color:'#374151'}}>FOTO</p>
              <PhotoCapture onCapture={(d)=>setEntregaForm({...entregaForm,foto:d})} />
            </div>
          </div>

          <div style={{marginTop:24,display:'flex',gap:10}}>
            <button className="btn btn-primary" onClick={submitEntrega}>✅ Registrar Entrega</button>
            <button className="btn btn-secondary" onClick={()=>{setTab('inventario');setShowEntregaForm(false);}}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== SOLICITUDES DE CERTIFICADOS ====================
function SolicitudesPanel({ solicitudes, setSolicitudes }) {
  const [cc, setCc] = useState('');
  const [result, setResult] = useState(null);

  const buscar = () => {
    const found = PERSONAL_CRONCH.find(p => p.cc === cc.trim());
    if (found) {
      setResult({ found: true, data: found });
    } else {
      setResult({ found: false });
    }
  };

  const enviarSolicitud = () => {
    const newSol = { ...result.data, fecha: new Date().toISOString(), id: Date.now() };
    setSolicitudes([...solicitudes, newSol]);
    setResult(null);
    setCc('');
    alert('✅ Solicitud de certificado enviada correctamente');
  };

  return (
    <div>
      <div className="page-header"><h1>Solicitud de Certificados</h1><p>Los empleados con contrato activo pueden solicitar su certificado laboral</p></div>

      <div className="card">
        <div className="card-title">Consultar Elegibilidad</div>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>Ingrese su número de cédula para verificar si tiene contrato activo.</p>
        <div style={{display:'flex',gap:10,alignItems:'flex-end',flexWrap:'wrap'}}>
          <div className="form-group" style={{flex:1,minWidth:200}}>
            <label>Número de Cédula</label>
            <input value={cc} onChange={e=>setCc(e.target.value)} placeholder="Ej: 1070615687" />
          </div>
          <button className="btn btn-primary" onClick={buscar} style={{height:42}}>Buscar</button>
        </div>

        {result && !result.found && (
          <div className="alert alert-warning" style={{marginTop:16}}>⚠️ No te encuentras con contrato activo. Si crees que es un error, contacta a recursos humanos.</div>
        )}
        {result && result.found && (
          <div style={{marginTop:16}} className="fade-in">
            <div className="alert alert-success">✅ Empleado encontrado con contrato activo</div>
            <div style={{background:'#f0f5ff',borderRadius:8,padding:16,marginTop:8}}>
              <p><strong>Nombre:</strong> {result.data.trabajador}</p>
              <p><strong>Cargo:</strong> {result.data.cargo}</p>
              <p><strong>Tipo Contrato:</strong> {result.data.tipoContrato}</p>
              <p><strong>Fecha Ingreso:</strong> {result.data.ingreso}</p>
            </div>
            <button className="btn btn-primary" onClick={enviarSolicitud} style={{marginTop:12}}>📋 Enviar Solicitud de Certificado</button>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-title">Solicitudes Realizadas ({solicitudes.length})</div>
        {solicitudes.length === 0 ? (
          <div className="empty-state"><div className="icon">📋</div><p>No hay solicitudes registradas</p></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Fecha</th><th>Trabajador</th><th>CC</th><th>Cargo</th></tr></thead>
              <tbody>
                {solicitudes.map((s,i) => (
                  <tr key={i}><td>{new Date(s.fecha).toLocaleDateString('es-CO')}</td><td>{s.trabajador}</td><td>{s.cc}</td><td>{s.cargo}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== CERTIFICADOS LABORALES ====================
function CertificadosPanel({ certificados, setCertificados }) {
  const [selectedCC, setSelectedCC] = useState('');
  const [preview, setPreview] = useState(null);

  const generar = () => {
    const emp = PERSONAL_CRONCH.find(p => p.cc === selectedCC);
    if (!emp) { alert('Seleccione un empleado válido'); return; }
    const cert = {
      ...emp,
      id: Date.now(),
      fechaGeneracion: new Date().toISOString(),
      fechaTexto: today(),
    };
    setPreview(cert);
  };

  const descargarPDF = (cert) => {
    const salarioTexto = cert.salario === 1750905 ? 'un salario mínimo legal vigente' : formatCurrency(cert.salario);
    const fechaTexto = cert.fechaTexto || today();
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Certificado Laboral - ${cert.trabajador}</title>
    <style>
      @page { size: letter; margin: 2.5cm 3cm; }
      body { font-family: 'Times New Roman', Times, serif; font-size: 13pt; line-height: 1.8; color: #000; }
      .header { text-align: center; margin-bottom: 30px; }
      .header h2 { font-size: 14pt; margin: 0; }
      .body-text { text-align: justify; margin: 20px 0; }
      .firma { margin-top: 60px; }
      .firma p { margin: 2px 0; }
      @media print { body { -webkit-print-color-adjust: exact; } }
    </style></head><body>
      <p>Girardot, ${fechaTexto}</p>
      <div class="header">
        <h2>GERENTE GENERAL DE CRONCH ARTESANALMENTE OBLEA SAS</h2>
        <h2>CERTIFICA:</h2>
      </div>
      <div class="body-text">
        <p>Que ${cert.tipoDoc === 'cédula de ciudadanía' ? 'el(la) señor(a)' : 'el(la) titular'} <strong>${cert.trabajador}</strong> identificado(a) con ${cert.tipoDoc} N° <strong>${Number(cert.cc).toLocaleString('es-CO')}</strong> se encuentra vinculado(a) a la empresa Cronch Artesanalmente Oblea S.A.S con NIT 901.481.136-4, en la cual desempeña labores como <strong>${cert.cargo}</strong> desde el ${formatDate(cert.ingreso)}, con un contrato a <strong>${cert.tipoContrato.toLowerCase()}</strong>, devengando ${salarioTexto} con todas las prestaciones de ley.</p>
        <p>La presente se expide el ${fechaTexto} a solicitud del interesado.</p>
      </div>
      <div class="firma">
        <p>______________________________________</p>
        <p><strong>JEFFERSON CAMILO VALENCIA TELLEZ</strong></p>
        <p>Gerente General de Cronch Artesanalmente Oblea SAS</p>
        <p>CC. 1.016.079.724</p>
        <p>CL 18 7 69 BRR CENTRO</p>
        <p>CEL: 3112196438</p>
      </div>
    </body></html>`;
    const ventana = window.open('', '_blank');
    ventana.document.write(html);
    ventana.document.close();
    setTimeout(() => { ventana.print(); }, 500);
  };

  const confirmarCert = () => {
    descargarPDF(preview);
    setCertificados([...certificados, preview]);
    setPreview(null);
    setSelectedCC('');
    alert('✅ Certificado generado y registrado');
  };

  const formatSalary = (s) => {
    if (s === 1750905) return 'un salario mínimo legal vigente';
    return formatCurrency(s);
  };

  return (
    <div>
      <div className="page-header"><h1>Certificados Laborales</h1><p>Generar certificados con estructura oficial de CRONCH</p></div>

      <div className="card">
        <div className="card-title">Generar Certificado</div>
        <div style={{display:'flex',gap:10,alignItems:'flex-end',flexWrap:'wrap'}}>
          <div className="form-group" style={{flex:1,minWidth:250}}>
            <label>Seleccionar Empleado</label>
            <select value={selectedCC} onChange={e=>setSelectedCC(e.target.value)}>
              <option value="">-- Seleccionar --</option>
              {PERSONAL_CRONCH.map(p => <option key={p.cc} value={p.cc}>{p.trabajador} — CC {p.cc}</option>)}
            </select>
          </div>
          <button className="btn btn-primary" onClick={generar} style={{height:42}}>Generar Certificado</button>
        </div>
      </div>

      {preview && (
        <div className="card fade-in" style={{fontFamily:'serif',lineHeight:1.8}}>
          <div style={{textAlign:'right',marginBottom:20,fontFamily:'DM Sans'}}>
            <button className="btn btn-success btn-sm" onClick={confirmarCert} style={{marginRight:8}}>✅ Confirmar y Guardar</button>
            <button className="btn btn-secondary btn-sm" onClick={()=>setPreview(null)}>Cancelar</button>
          </div>
          <p style={{marginBottom:16}}>Girardot, {preview.fechaTexto}</p>
          <p style={{fontWeight:700,textAlign:'center',marginBottom:4}}>GERENTE GENERAL DE CRONCH ARTESANALMENTE OBLEA SAS</p>
          <p style={{fontWeight:700,textAlign:'center',marginBottom:20}}>CERTIFICA:</p>
          <p style={{textAlign:'justify'}}>
            Que {preview.tipoDoc === 'cédula de ciudadanía' ? 'el(la) señor(a)' : 'el(la) titular'} <strong>{preview.trabajador}</strong> identificado(a) con {preview.tipoDoc} N° <strong>{Number(preview.cc).toLocaleString('es-CO')}</strong> se encuentra vinculado(a) a la empresa Cronch Artesanalmente Oblea S.A.S con NIT 901.481.136-4, en la cual desempeña labores como <strong>{preview.cargo}</strong> desde el {formatDate(preview.ingreso)}, con un contrato a <strong>{preview.tipoContrato.toLowerCase()}</strong>, devengando {formatSalary(preview.salario)} con todas las prestaciones de ley.
          </p>
          <p style={{marginTop:16,textAlign:'justify'}}>La presente se expide el {preview.fechaTexto} a solicitud del interesado.</p>
          <div style={{marginTop:40}}>
            <p>______________________________________</p>
            <p style={{fontWeight:700}}>JEFFERSON CAMILO VALENCIA TELLEZ</p>
            <p>Gerente General de Cronch Artesanalmente Oblea SAS</p>
            <p>CC. 1.016.079.724</p>
            <p>CL 18 7 69 BRR CENTRO</p>
            <p>CEL: 3112196438</p>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-title">Certificados Generados ({certificados.length})</div>
        {certificados.length === 0 ? (
          <div className="empty-state"><div className="icon">📄</div><p>No se han generado certificados</p></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Fecha</th><th>Trabajador</th><th>CC</th><th>Cargo</th><th>Contrato</th><th>PDF</th></tr></thead>
              <tbody>
                {certificados.map((c,i) => (
                  <tr key={i}>
                    <td>{new Date(c.fechaGeneracion).toLocaleDateString('es-CO')}</td>
                    <td style={{fontWeight:500}}>{c.trabajador}</td>
                    <td>{c.cc}</td>
                    <td>{c.cargo}</td>
                    <td><span className="badge badge-blue">{c.tipoContrato}</span></td>
                    <td><button className="btn btn-primary btn-sm" onClick={()=>descargarPDF(c)}>📄 PDF</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== NOVEDADES ====================
function NovedadesPanel({ novedades, setNovedades, empleados, user }) {
  const empty = { tipo:'Incapacidades',empleado:'',mes:MESES[0],fechaInicio:'',fechaFin:'',observacion:'',reportadoPor:user?.nombre||'',adjunto:null };
  const [form, setForm] = useState({...empty});
  const [showForm, setShowForm] = useState(false);
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm(p => ({...p, adjunto: { name: f.name, data: ev.target.result }}));
    reader.readAsDataURL(f);
  };

  const submit = () => {
    if (!form.empleado || !form.fechaInicio || !form.fechaFin || !form.reportadoPor) {
      alert('Complete todos los campos obligatorios'); return;
    }
    setNovedades([...novedades, { ...form, id: Date.now(), fecha: new Date().toISOString() }]);
    setForm({...empty});
    setShowForm(false);
    alert('✅ Novedad registrada correctamente');
  };

  return (
    <div>
      <div className="page-header"><h1>Novedades del Personal</h1><p>Registro de incapacidades, vacaciones, permisos y más</p></div>
      <button className="btn btn-primary" onClick={()=>setShowForm(!showForm)} style={{marginBottom:20}}>{showForm ? '✕ Cerrar' : '+ Nueva Novedad'}</button>

      {showForm && (
        <div className="card fade-in">
          <div className="card-title">Registrar Novedad</div>
          <div className="form-grid">
            <div className="form-group"><label>Tipo de Novedad *</label>
              <select value={form.tipo} onChange={e=>setForm({...form,tipo:e.target.value})}>{TIPOS_NOVEDAD.map(t=><option key={t}>{t}</option>)}</select>
            </div>
            <div className="form-group"><label>Empleado *</label>
              <select value={form.empleado} onChange={e=>setForm({...form,empleado:e.target.value})}>
                <option value="">Seleccionar...</option>
                {empleados.map((em,i)=><option key={i} value={`${em.nombres} ${em.apellidos}`}>{em.nombres} {em.apellidos}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Mes</label>
              <select value={form.mes} onChange={e=>setForm({...form,mes:e.target.value})}>{MESES.map(m=><option key={m}>{m}</option>)}</select>
            </div>
            <div className="form-group"><label>Fecha Inicio *</label><input type="date" value={form.fechaInicio} onChange={e=>setForm({...form,fechaInicio:e.target.value})} /></div>
            <div className="form-group"><label>Fecha Fin *</label><input type="date" value={form.fechaFin} onChange={e=>setForm({...form,fechaFin:e.target.value})} /></div>
            <div className="form-group"><label>Quien reporta *</label><input value={form.reportadoPor} onChange={e=>setForm({...form,reportadoPor:e.target.value})} /></div>
          </div>
          <div className="form-group" style={{marginTop:16}}>
            <label>Observaciones</label>
            <textarea rows={3} value={form.observacion} onChange={e=>setForm({...form,observacion:e.target.value})} placeholder="Detalles adicionales..." style={{width:'100%',padding:10,border:'1.5px solid #e5e7eb',borderRadius:8,fontFamily:'DM Sans'}} />
          </div>
          <div style={{marginTop:12}}>
            <input type="file" accept="image/*,.pdf" ref={fileRef} onChange={handleFile} style={{display:'none'}} />
            <button className="btn btn-secondary btn-sm" onClick={()=>fileRef.current.click()}>📎 Adjuntar archivo (PDF/Foto)</button>
            {form.adjunto && <span style={{marginLeft:10,fontSize:13,color:'#22c55e'}}>✅ {form.adjunto.name}</span>}
          </div>
          <div style={{marginTop:20,display:'flex',gap:10}}>
            <button className="btn btn-primary" onClick={submit}>Registrar Novedad</button>
            <button className="btn btn-secondary" onClick={()=>setShowForm(false)}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-title">Novedades Registradas ({novedades.length})</div>
        {novedades.length === 0 ? (
          <div className="empty-state"><div className="icon">📝</div><p>No hay novedades registradas</p></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Tipo</th><th>Empleado</th><th>Mes</th><th>Inicio</th><th>Fin</th><th>Reportado por</th><th>Adjunto</th></tr></thead>
              <tbody>
                {novedades.map((n,i) => (
                  <tr key={i}>
                    <td><span className="badge badge-blue">{n.tipo}</span></td>
                    <td style={{fontWeight:500}}>{n.empleado}</td>
                    <td>{n.mes}</td>
                    <td>{n.fechaInicio}</td>
                    <td>{n.fechaFin}</td>
                    <td>{n.reportadoPor}</td>
                    <td>{n.adjunto ? '📎' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== ALERTAS ====================
function AlertasPanel({ empleados, entregas }) {
  const entregaDocs = new Set(entregas.map(e => e.empleadoDoc));
  const sinDotacion = empleados.filter(e => !entregaDocs.has(e.documento));

  // Próxima entrega: cada 4 meses desde 22 abril 2026
  const baseDate = new Date(2026, 3, 22); // Abril 22, 2026
  const now = new Date();
  let nextDelivery = new Date(baseDate);
  while (nextDelivery < now) {
    nextDelivery.setMonth(nextDelivery.getMonth() + 4);
  }
  const daysUntil = Math.ceil((nextDelivery - now) / (1000 * 60 * 60 * 24));

  return (
    <div>
      <div className="page-header"><h1>Panel de Alertas</h1><p>Alertas de dotación y entregas pendientes</p></div>

      <div className="alert alert-info" style={{fontSize:14}}>
        📅 <strong>Próxima entrega de dotación:</strong> {nextDelivery.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })} — faltan <strong>{daysUntil} días</strong>
      </div>

      {sinDotacion.length > 0 && (
        <div className="alert alert-warning">⚠️ Hay <strong>{sinDotacion.length}</strong> empleados activos sin dotación entregada</div>
      )}

      <div className="card">
        <div className="card-title">Empleados sin Dotación ({sinDotacion.length})</div>
        {sinDotacion.length === 0 ? (
          <div className="alert alert-success">✅ Todos los empleados tienen dotación entregada</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Empleado</th><th>Documento</th><th>Cargo</th><th>Sede</th><th>Vinculación</th></tr></thead>
              <tbody>
                {sinDotacion.map((e,i) => (
                  <tr key={i}>
                    <td style={{fontWeight:500}}>{e.nombres} {e.apellidos}</td>
                    <td>{e.tipoDoc} {e.documento}</td>
                    <td>{e.cargo}</td>
                    <td><span className="badge badge-beige">{e.sede}</span></td>
                    <td><span className={`badge ${e.tipoVinculacion==='Contrato'?'badge-green':'badge-yellow'}`}>{e.tipoVinculacion}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-title">Calendario de Entregas</div>
        <p style={{fontSize:13,color:'#6b7280'}}>La dotación se entrega cada 4 meses a partir del 22 de abril de 2026.</p>
        <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:12}}>
          {[0,1,2,3,4,5].map(i => {
            const d = new Date(baseDate);
            d.setMonth(d.getMonth() + i * 4);
            const isPast = d < now;
            const isNext = d.getTime() === nextDelivery.getTime();
            return (
              <div key={i} style={{padding:'12px 18px',borderRadius:8,background:isNext?'#dbe8fe':isPast?'#f3f4f6':'#fff',border:`1.5px solid ${isNext?'#3b76f0':'#e5e7eb'}`,fontWeight:isNext?700:400,fontSize:13}}>
                {d.toLocaleDateString('es-CO',{year:'numeric',month:'short',day:'numeric'})}
                {isNext && <span style={{marginLeft:6,color:'#3b76f0'}}>← Próxima</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


// ==================== VACACIONES ====================
const VACACIONES_DATA = [
  { nombre: "BARRIOS MONCADA JUAN DAVID", fechaContrato: "2025-10-16", fechaVacaciones: "2025-10-16", dias: 180, diasPendientes: 7 },
  { nombre: "BUITRAGO HERNANDEZ CRISTIAN CAMILO", fechaContrato: "2024-04-15", fechaVacaciones: "2025-04-15", dias: 364, diasPendientes: 15 },
  { nombre: "CARRASCO VALENCIA YURI ANDREA", fechaContrato: "2024-04-12", fechaVacaciones: "2025-04-12", dias: 131, diasPendientes: 5 },
  { nombre: "CRUZ HUERFANO YINETH YISED", fechaContrato: "2025-01-05", fechaVacaciones: "2025-01-05", dias: 348, diasPendientes: 14 },
  { nombre: "DONCEL BARRERO CARLOS GUILLERMO", fechaContrato: "2025-01-02", fechaVacaciones: "2025-01-02", dias: 437, diasPendientes: 18 },
  { nombre: "FRAYLE SUAREZ JUAN DAVID", fechaContrato: "2025-01-08", fechaVacaciones: "2025-01-08", dias: 256, diasPendientes: 10 },
  { nombre: "GOMEZ GARCIA FAIBER NICOLAS", fechaContrato: "2022-01-07", fechaVacaciones: "2025-01-07", dias: 287, diasPendientes: 11 },
  { nombre: "GONZALEZ REYES CESAR ANDRES", fechaContrato: "2023-08-07", fechaVacaciones: "2025-08-07", dias: 280, diasPendientes: 11 },
  { nombre: "GUAIMARO MESSIAS JACKELINE KATIUSCA", fechaContrato: "2025-01-02", fechaVacaciones: "2026-02-03", dias: 43, diasPendientes: 1 },
  { nombre: "GUTERREZ NAREN TRIANA", fechaContrato: "2025-01-02", fechaVacaciones: "2026-01-02", dias: 0, diasPendientes: 0 },
  { nombre: "GUTIERREZ GUZMAN JULIO CESAR", fechaContrato: "2025-01-01", fechaVacaciones: "2025-08-04", dias: 371, diasPendientes: 15 },
  { nombre: "GUTIERREZ ROMERO DANIELA", fechaContrato: "2024-01-10", fechaVacaciones: "2025-03-05", dias: 346, diasPendientes: 14 },
  { nombre: "JOHNSON NIETO EDUARDO JOSE", fechaContrato: "2025-10-16", fechaVacaciones: "2025-10-16", dias: 180, diasPendientes: 7 },
  { nombre: "LINDARTE VELEZ CAMILO ANDRES", fechaContrato: "2025-01-05", fechaVacaciones: "2025-01-05", dias: 348, diasPendientes: 14 },
  { nombre: "LOPEZ LOZANO SERGIO", fechaContrato: "2025-11-13", fechaVacaciones: "2025-11-13", dias: 152, diasPendientes: 6 },
  { nombre: "MEJIA FIERRO DAMARIS JOHANA", fechaContrato: "2021-01-11", fechaVacaciones: "2025-01-11", dias: 164, diasPendientes: 6 },
  { nombre: "MUÑOZ CUENCA DANIEL FELIPE", fechaContrato: "2025-01-03", fechaVacaciones: "2026-01-03", dias: 44, diasPendientes: 1 },
  { nombre: "OLIVEROS OSPINA DUVAN AUGUSTO", fechaContrato: "2025-10-16", fechaVacaciones: "2025-10-16", dias: 180, diasPendientes: 7 },
  { nombre: "PARRAGA CABEZAS JESSICA LORENA", fechaContrato: "2024-04-15", fechaVacaciones: "2025-04-15", dias: 364, diasPendientes: 15 },
  { nombre: "PUENTES SANCHEZ NICOL NATALIA", fechaContrato: "2025-01-03", fechaVacaciones: "2026-01-03", dias: 44, diasPendientes: 1 },
  { nombre: "RINCON PALACIOS ANGIE YINESKA", fechaContrato: "2021-04-16", fechaVacaciones: "2021-04-16", dias: 1824, diasPendientes: 76 },
  { nombre: "RODRIGUEZ CRUZ JOHANNA CATHERINE", fechaContrato: "2023-01-08", fechaVacaciones: "2025-01-08", dias: 256, diasPendientes: 10 },
  { nombre: "RODRIGUEZ RONDON LAURA VALENTINA", fechaContrato: "2025-01-02", fechaVacaciones: "2026-01-02", dias: 72, diasPendientes: 3 },
  { nombre: "USECHE ESCOBAR MELANNY TATIANA", fechaContrato: "2021-01-12", fechaVacaciones: "2025-01-12", dias: 134, diasPendientes: 5 },
  { nombre: "VALENCIA TELLEZ JEFFERSON CAMILO", fechaContrato: "2021-04-16", fechaVacaciones: "2021-04-16", dias: 1824, diasPendientes: 76 },
  { nombre: "VARGAS ALBINO LEIDY JOHANNA", fechaContrato: "2023-01-08", fechaVacaciones: "2024-11-02", dias: 793, diasPendientes: 33 },
];

function VacacionesPanel({ empleados, vacaciones, setVacaciones, novedades }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ empleado: '', fechaInicio: '', fechaFin: '', estado: 'Programada', observacion: '' });
  const [filtro, setFiltro] = useState('todos');
  const [search, setSearch] = useState('');

  // Combinar datos del archivo Excel con vacaciones programadas en la app
  const empleadosVac = VACACIONES_DATA.map(v => {
    // Días disfrutados via programación en la app
    const diasDisfrutados = vacaciones
      .filter(vp => vp.empleado === v.nombre && vp.estado === 'Disfrutada')
      .reduce((sum, vp) => sum + (vp.dias || 0), 0);

    const diasProgramados = vacaciones
      .filter(vp => vp.empleado === v.nombre && vp.estado === 'Programada')
      .reduce((sum, vp) => sum + (vp.dias || 0), 0);

    const pendientesActuales = Math.max(0, v.diasPendientes - diasDisfrutados);

    // Calcular fecha sugerida: la próxima fecha en que debería salir
    const ultimaVac = new Date(v.fechaVacaciones);
    const sugerida = new Date(ultimaVac);
    sugerida.setFullYear(sugerida.getFullYear() + 1);
    const hoy = new Date();
    const vencida = sugerida < hoy;

    return {
      ...v,
      diasDisfrutadosApp: diasDisfrutados,
      diasProgramados,
      pendientesActuales,
      fechaSugerida: sugerida.toISOString().split('T')[0],
      vencida,
      urgencia: pendientesActuales > 30 ? 'critica' : pendientesActuales > 15 ? 'alta' : pendientesActuales > 0 ? 'normal' : 'aldia'
    };
  }).sort((a, b) => b.pendientesActuales - a.pendientesActuales);

  const filtrados = empleadosVac.filter(e => {
    const matchSearch = !search || e.nombre.toLowerCase().includes(search.toLowerCase());
    const matchFiltro = filtro === 'todos' ? true
      : filtro === 'critica' ? e.urgencia === 'critica'
      : filtro === 'alta' ? e.urgencia === 'alta' || e.urgencia === 'critica'
      : filtro === 'programadas' ? e.diasProgramados > 0
      : e.urgencia === 'aldia';
    return matchSearch && matchFiltro;
  });

  const totalCritica = empleadosVac.filter(e => e.urgencia === 'critica').length;
  const totalAlta = empleadosVac.filter(e => e.urgencia === 'alta').length;
  const totalProgramadas = empleadosVac.filter(e => e.diasProgramados > 0).length;
  const totalAlDia = empleadosVac.filter(e => e.urgencia === 'aldia').length;
  const totalDiasPendientes = empleadosVac.reduce((s, e) => s + e.pendientesActuales, 0);

  const submitVacacion = () => {
    if (!form.empleado || !form.fechaInicio || !form.fechaFin) {
      alert('Complete todos los campos obligatorios'); return;
    }
    if (new Date(form.fechaFin) < new Date(form.fechaInicio)) {
      alert('La fecha fin debe ser posterior a la fecha inicio'); return;
    }
    const dias = Math.ceil((new Date(form.fechaFin) - new Date(form.fechaInicio)) / (1000 * 60 * 60 * 24)) + 1;
    setVacaciones([...vacaciones, { ...form, dias, id: Date.now(), fechaRegistro: new Date().toISOString() }]);
    setForm({ empleado: '', fechaInicio: '', fechaFin: '', estado: 'Programada', observacion: '' });
    setShowForm(false);
    alert('✅ Vacaciones registradas correctamente');
  };

  const cambiarEstado = (id, nuevoEstado) => {
    setVacaciones(vacaciones.map(v => v.id === id ? { ...v, estado: nuevoEstado } : v));
  };

  const eliminarVacacion = (id) => {
    if (confirm('¿Eliminar este registro de vacaciones?')) {
      setVacaciones(vacaciones.filter(v => v.id !== id));
    }
  };

  const getUrgenciaStyle = (urgencia) => {
    if (urgencia === 'critica') return { bg: '#fee2e2', color: '#dc2626', border: '#fca5a5', icon: '🔴', texto: 'CRÍTICA' };
    if (urgencia === 'alta') return { bg: '#fef3c7', color: '#b45309', border: '#fde68a', icon: '🟡', texto: 'ALTA' };
    if (urgencia === 'normal') return { bg: '#dbeafe', color: '#2563eb', border: '#93c5fd', icon: '🔵', texto: 'NORMAL' };
    return { bg: '#dcfce7', color: '#16a34a', border: '#86efac', icon: '🟢', texto: 'AL DÍA' };
  };

  const getBadgeClass = (estado) => {
    if (estado === 'Programada') return 'badge-blue';
    if (estado === 'Disfrutada') return 'badge-green';
    if (estado === 'Cancelada') return 'badge-red';
    return 'badge-yellow';
  };

  // Barra visual de progreso de vacaciones
  const BarraVacaciones = ({ pendientes, total }) => {
    const pct = total > 0 ? Math.min(100, ((total - pendientes) / total) * 100) : 100;
    const color = pendientes > 30 ? '#dc2626' : pendientes > 15 ? '#f59e0b' : pendientes > 0 ? '#3b82f6' : '#22c55e';
    return (
      <div style={{width:'100%',height:8,background:'#e5e7eb',borderRadius:4,overflow:'hidden'}}>
        <div style={{width:`${pct}%`,height:'100%',background:color,borderRadius:4,transition:'width 0.5s ease'}} />
      </div>
    );
  };

  return (
    <div>
      <div className="page-header"><h1>Control de Vacaciones</h1><p>Planificación y seguimiento de vacaciones del personal — Datos actualizados al 14/04/2026</p></div>

      <div className="stats-grid">
        <div className="stat-card danger"><div className="stat-label">Urgencia Crítica (+30 días)</div><div className="stat-value">{totalCritica}</div></div>
        <div className="stat-card warning"><div className="stat-label">Urgencia Alta (+15 días)</div><div className="stat-value">{totalAlta}</div></div>
        <div className="stat-card blue"><div className="stat-label">Con Vacaciones Programadas</div><div className="stat-value">{totalProgramadas}</div></div>
        <div className="stat-card success"><div className="stat-label">Al Día</div><div className="stat-value">{totalAlDia}</div></div>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue"><div className="stat-label">Total Empleados</div><div className="stat-value">{empleadosVac.length}</div></div>
        <div className="stat-card warning"><div className="stat-label">Total Días Pendientes (Empresa)</div><div className="stat-value">{totalDiasPendientes}</div></div>
      </div>

      {totalCritica > 0 && (
        <div className="alert alert-warning">🔴 <strong>ATENCIÓN:</strong> Hay <strong>{totalCritica}</strong> empleado(s) con más de 30 días de vacaciones acumuladas. Según la normativa colombiana, se recomienda programar sus vacaciones de inmediato para evitar sanciones.</div>
      )}

      <div style={{display:'flex',gap:12,marginBottom:20,flexWrap:'wrap',alignItems:'center'}}>
        <button className="btn btn-primary" onClick={()=>setShowForm(!showForm)}>
          {showForm ? '✕ Cerrar' : '📅 Programar Vacaciones'}
        </button>
        <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
          {[
            {id:'todos',label:`Todos (${empleadosVac.length})`},
            {id:'critica',label:`🔴 Crítica (${totalCritica})`},
            {id:'alta',label:`🟡 Alta (${totalAlta})`},
            {id:'programadas',label:`📅 Programadas (${totalProgramadas})`},
            {id:'aldia',label:`🟢 Al día (${totalAlDia})`}
          ].map(f => (
            <button key={f.id} style={{padding:'6px 14px',fontSize:12,borderRadius:20,border:'1.5px solid #e5e7eb',background:filtro===f.id?'#dbe8fe':'#fff',color:filtro===f.id?'#2a5cc7':'#6b7280',cursor:'pointer',fontWeight:600}} onClick={()=>setFiltro(f.id)}>{f.label}</button>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="card fade-in">
          <div className="card-title">Programar Vacaciones</div>
          <div className="form-grid">
            <div className="form-group"><label>Empleado *</label>
              <select value={form.empleado} onChange={e=>setForm({...form,empleado:e.target.value})}>
                <option value="">Seleccionar...</option>
                {VACACIONES_DATA.map((v,i)=><option key={i} value={v.nombre}>{v.nombre} ({v.diasPendientes} días pend.)</option>)}
              </select>
            </div>
            <div className="form-group"><label>Fecha Inicio *</label><input type="date" value={form.fechaInicio} onChange={e=>setForm({...form,fechaInicio:e.target.value})} /></div>
            <div className="form-group"><label>Fecha Fin *</label><input type="date" value={form.fechaFin} onChange={e=>setForm({...form,fechaFin:e.target.value})} /></div>
            <div className="form-group"><label>Estado</label>
              <select value={form.estado} onChange={e=>setForm({...form,estado:e.target.value})}>
                <option>Programada</option><option>Disfrutada</option><option>Cancelada</option>
              </select>
            </div>
          </div>
          {form.fechaInicio && form.fechaFin && new Date(form.fechaFin) >= new Date(form.fechaInicio) && (
            <div className="alert alert-info" style={{marginTop:12}}>📅 Días solicitados: <strong>{Math.ceil((new Date(form.fechaFin) - new Date(form.fechaInicio)) / (1000*60*60*24)) + 1} días</strong></div>
          )}
          <div className="form-group" style={{marginTop:12}}>
            <label>Observaciones</label>
            <textarea rows={2} value={form.observacion} onChange={e=>setForm({...form,observacion:e.target.value})} placeholder="Notas adicionales..." style={{width:'100%',padding:10,border:'1.5px solid #e5e7eb',borderRadius:8,fontFamily:'DM Sans'}} />
          </div>
          <div style={{marginTop:16,display:'flex',gap:10}}>
            <button className="btn btn-primary" onClick={submitVacacion}>Registrar Vacaciones</button>
            <button className="btn btn-secondary" onClick={()=>setShowForm(false)}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-title">Estado de Vacaciones por Empleado</div>
        <div className="search-bar" style={{marginBottom:12}}>
          <span className="search-icon">🔍</span>
          <input placeholder="Buscar empleado..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Empleado</th><th>Fecha Contrato</th><th>Última Vacación</th><th>Días Transcurridos</th><th>Días Pendientes</th><th>Programados</th><th>Fecha Sugerida</th><th>Urgencia</th></tr></thead>
            <tbody>
              {filtrados.map((e,i) => {
                const urg = getUrgenciaStyle(e.urgencia);
                return (
                  <tr key={i}>
                    <td style={{fontWeight:600}}>{e.nombre}</td>
                    <td>{formatDate(e.fechaContrato)}</td>
                    <td>{formatDate(e.fechaVacaciones)}</td>
                    <td style={{textAlign:'center'}}>{e.dias}</td>
                    <td style={{textAlign:'center'}}>
                      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                        <strong style={{color:urg.color,fontSize:16}}>{e.pendientesActuales}</strong>
                        <BarraVacaciones pendientes={e.pendientesActuales} total={Math.max(e.pendientesActuales, 15)} />
                      </div>
                    </td>
                    <td style={{textAlign:'center'}}>{e.diasProgramados > 0 ? <span className="badge badge-blue">{e.diasProgramados} días</span> : <span style={{color:'#9ca3af'}}>—</span>}</td>
                    <td style={{fontSize:12}}>{e.vencida ? <span style={{color:'#dc2626',fontWeight:600}}>⚠️ VENCIDA</span> : formatDate(e.fechaSugerida)}</td>
                    <td><span style={{display:'inline-flex',alignItems:'center',gap:4,padding:'3px 10px',borderRadius:20,fontSize:11,fontWeight:700,background:urg.bg,color:urg.color,border:`1px solid ${urg.border}`}}>{urg.icon} {urg.texto}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Vacaciones Programadas ({vacaciones.length})</div>
        {vacaciones.length === 0 ? (
          <div className="empty-state"><div className="icon">📅</div><p>No hay vacaciones programadas aún. Use el botón "Programar Vacaciones" para agendar.</p></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Empleado</th><th>Fecha Inicio</th><th>Fecha Fin</th><th>Días</th><th>Estado</th><th>Observación</th><th>Acciones</th></tr></thead>
              <tbody>
                {vacaciones.sort((a,b)=>new Date(a.fechaInicio)-new Date(b.fechaInicio)).map((v,i) => (
                  <tr key={i}>
                    <td style={{fontWeight:500}}>{v.empleado}</td>
                    <td>{v.fechaInicio}</td>
                    <td>{v.fechaFin}</td>
                    <td style={{textAlign:'center'}}><strong>{v.dias}</strong></td>
                    <td><span className={`badge ${getBadgeClass(v.estado)}`}>{v.estado}</span></td>
                    <td style={{fontSize:12,color:'#6b7280',maxWidth:150,overflow:'hidden',textOverflow:'ellipsis'}}>{v.observacion || '—'}</td>
                    <td style={{display:'flex',gap:4}}>
                      {v.estado === 'Programada' && <button className="btn btn-success btn-sm" onClick={()=>cambiarEstado(v.id,'Disfrutada')} title="Marcar como disfrutada">✅</button>}
                      {v.estado === 'Programada' && <button className="btn btn-secondary btn-sm" onClick={()=>cambiarEstado(v.id,'Cancelada')} title="Cancelar">✕</button>}
                      <button className="btn btn-danger btn-sm" onClick={()=>eliminarVacacion(v.id)} title="Eliminar">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card" style={{background:'linear-gradient(135deg, #f0f5ff 0%, #fdf8f3 100%)'}}>
        <div className="card-title">📌 Empleados con Prioridad de Programación</div>
        <p style={{fontSize:13,color:'#6b7280',marginBottom:16}}>Estos empleados tienen la mayor cantidad de días pendientes y deben programar vacaciones con prioridad.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:12}}>
          {empleadosVac.filter(e => e.pendientesActuales >= 15).map((e,i) => {
            const urg = getUrgenciaStyle(e.urgencia);
            return (
              <div key={i} style={{background:'#fff',borderRadius:10,padding:16,border:`2px solid ${urg.border}`,boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                  <strong style={{fontSize:13}}>{e.nombre}</strong>
                  <span style={{fontSize:11,padding:'2px 8px',borderRadius:12,background:urg.bg,color:urg.color,fontWeight:700}}>{urg.icon} {urg.texto}</span>
                </div>
                <div style={{fontSize:12,color:'#6b7280',marginBottom:8}}>
                  <p>Contrato: {formatDate(e.fechaContrato)}</p>
                  <p>Última vacación: {formatDate(e.fechaVacaciones)}</p>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <span style={{fontSize:24,fontWeight:800,color:urg.color}}>{e.pendientesActuales}</span>
                    <span style={{fontSize:11,color:'#6b7280',marginLeft:4}}>días pendientes</span>
                  </div>
                  <BarraVacaciones pendientes={e.pendientesActuales} total={Math.max(e.pendientesActuales, 15)} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
