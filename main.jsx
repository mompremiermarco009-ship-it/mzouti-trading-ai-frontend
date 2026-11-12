
import React, {useState} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Routes, Route, NavLink, useLocation, useNavigate} from "react-router-dom";
import {
  Activity, LayoutDashboard, CandlestickChart, History, Settings, Bell, Search,
  ChevronRight, Menu, X, Wifi, Monitor, ScanLine, BrainCircuit, ShieldCheck,
  Clock3, TrendingUp, TrendingDown, Minus, CircleHelp, SlidersHorizontal,
  RefreshCw, Eye, CalendarDays, ArrowUpRight, ArrowDownRight, CheckCircle2,
  AlertTriangle, BarChart3, Coins, Gauge, Server, KeyRound, Save, Database,
  FileClock, CircleDot, LockKeyhole, MonitorSmartphone, ChartNoAxesCombined
} from "lucide-react";
import "./styles.css";

const links = [
  {to:"/dashboard",label:"Vue générale",icon:LayoutDashboard},
  {to:"/analyse",label:"Analyse en direct",icon:CandlestickChart},
  {to:"/signaux",label:"Signaux",icon:Activity},
  {to:"/marches",label:"Marchés",icon:Coins},
  {to:"/historique",label:"Historique",icon:History},
  {to:"/statistiques",label:"Statistiques",icon:BarChart3},
  {to:"/parametres",label:"Paramètres",icon:Settings}
];
const titleFor = Object.fromEntries(links.map(x=>[x.to,x.label]));

function Shell(){
 const [mobile,setMobile]=useState(false),[notice,setNotice]=useState(false),[toast,setToast]=useState("");
 const loc=useLocation(), title=titleFor[loc.pathname]||"Vue générale";
 const notify=m=>{setToast(m);setTimeout(()=>setToast(""),2800)};
 return <div className="app-shell">
  <aside className={`sidebar ${mobile?"open":""}`}>
   <div className="brand"><div className="brand-mark"><Activity size={22}/></div><div><div className="brand-name">MZOUTI<span>.</span></div><div className="brand-sub">TRADING INTELLIGENCE</div></div><button className="mobile-close" onClick={()=>setMobile(false)}><X size={18}/></button></div>
   <div className="workspace-label">ESPACE DE TRAVAIL</div>
   <nav className="nav-list">{links.map(x=><NavLink key={x.to} to={x.to} onClick={()=>setMobile(false)} className={({isActive})=>"nav-item"+(isActive?" active":"")}><x.icon size={18}/><span>{x.label}</span></NavLink>)}</nav>
   <div className="sidebar-bottom"><div className="connection-card"><div className="connection-top"><span className="status-dot"/><span>Backend non connecté</span></div><p>Le serveur privé sera relié lors de la phase backend.</p><button onClick={()=>notify("Connexion API à configurer pendant la phase backend.")}>État de connexion <ChevronRight size={14}/></button></div>
   <div className="profile"><div className="avatar">M</div><div className="profile-text"><b>Mon espace</b><span>Compte local</span></div><span className="more-btn">•••</span></div></div>
  </aside>
  <main className="main-area">
   <header className="topbar"><div className="top-left"><button className="hamburger" onClick={()=>setMobile(true)}><Menu size={20}/></button><div className="breadcrumb">Workspace <ChevronRight size={14}/><b>{title}</b></div></div>
   <div className="top-actions"><div className="server-pill"><span className="status-dot"/><span>Mode aperçu</span></div><button className="icon-btn" onClick={()=>setNotice(!notice)}><Bell size={18}/></button>{notice&&<div className="notification-pop"><b>Notifications</b><p>Aucune nouvelle notification.</p></div>}<div className="top-avatar">M</div></div></header>
   <div className="page-content"><Routes>
    <Route path="/" element={<Dashboard notify={notify}/>}/>
    <Route path="/dashboard" element={<Dashboard notify={notify}/>}/>
    <Route path="/analyse" element={<Analyse notify={notify}/>}/>
    <Route path="/signaux" element={<Signaux/>}/>
    <Route path="/marches" element={<Marches/>}/>
    <Route path="/historique" element={<Historique/>}/>
    <Route path="/statistiques" element={<Statistiques/>}/>
    <Route path="/parametres" element={<Parametres notify={notify}/>}/>
   </Routes><footer className="footer"><span>© 2026 MZOUTI Trading AI</span><span><span className="status-dot"/> Frontend v1.1 · Mode aperçu</span><span>Un assistant d'analyse, pas une garantie de gains.</span></footer></div>
  </main>{mobile&&<div className="mobile-scrim" onClick={()=>setMobile(false)}/>}
  {toast&&<div className="toast"><CheckCircle2 size={17}/>{toast}</div>}
 </div>
}

function PageHead({eyebrow,title,desc,action}){return <section className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-line"/>{eyebrow}</div><h1>{title}</h1><p className="page-subtitle">{desc}</p></div>{action&&<div className="welcome-actions">{action}</div>}</section>}
function Notice(){return <section className="notice"><div className="notice-icon"><AlertTriangle size={18}/></div><div><b>Mode aperçu — aucune donnée réelle</b><span>Le backend et l'agent Windows ne sont pas encore connectés. Les éléments de démonstration sont clairement identifiés.</span></div><span className="notice-tag">EN CONSTRUCTION</span></section>}
function Metric({icon,label,value,meta,color="purple",badge="En attente"}){return <div className="metric-card"><div className="metric-top"><div className={`metric-icon ${color}`}>{icon}</div><span className="metric-badge">{badge}</span></div><div className="metric-label">{label}</div><div className="metric-value">{value}</div><div className="metric-meta">{meta}</div></div>}
function Panel({kicker,title,children,extra}){return <section className="panel"><div className="panel-title-row"><div><div className="panel-kicker">{kicker}</div><h3>{title}</h3></div>{extra}</div>{children}</section>}
function Empty({icon=<Database size={22}/>,title="Aucune donnée disponible",desc="Les informations apparaîtront ici lorsque le backend sera connecté."}){return <div className="empty-history"><div className="empty-icon">{icon}</div><b>{title}</b><span>{desc}</span></div>}
function Dashboard({notify}){return <>
 <PageHead eyebrow="CENTRE DE CONTRÔLE" title="Vue générale" desc="Une vue claire de votre environnement d'analyse." action={<button className="primary-btn" onClick={()=>notify("Le moteur sera activé après intégration du backend.")}><ScanLine size={16}/> Nouvelle analyse</button>}/>
 <Notice/>
 <section className="metric-grid"><Metric icon={<Monitor size={18}/>} label="Agent Windows" value="Non connecté" meta="Capture de Pocket Option" color="purple"/><Metric icon={<BrainCircuit size={18}/>} label="Moteur d'analyse" value="Inactif" meta="Analyse des graphiques" color="blue"/><Metric icon={<Activity size={18}/>} label="Signaux du jour" value="— / 5" meta="Limite prévue : 5 par jour" color="teal" badge="Désactivé"/><Metric icon={<ShieldCheck size={18}/>} label="Ordres automatiques" value="Désactivés" meta="Aucune exécution d'ordre" color="orange" badge="Sécurité"/>}</section>
 <div className="content-grid"><Panel kicker="ÉTAT DE L'INFRASTRUCTURE" title="Composants du système"><div className="system-list"><System icon={<Monitor/>} name="Agent Windows" detail="Capture locale et fenêtre flottante"/><System icon={<Server/>} name="API privée" detail="Moteur d'analyse sur votre serveur"/><System icon={<Database/>} name="Base de données" detail="Historique et configuration"/><System icon={<ShieldCheck/>} name="Sécurité" detail="Authentification et limites"/></div></Panel><Panel kicker="DERNIÈRE ACTIVITÉ" title="Analyses récentes"><Empty icon={<History/>} title="Pas encore d'analyse" desc="Les analyses réelles seront listées ici."/></Panel></div>
 </>}
function System({icon,name,detail}){return <div className="system-row"><div className="system-icon">{React.cloneElement(icon,{size:17})}</div><div className="system-copy"><b>{name}</b><span>{detail}</span></div><span className="system-state">À connecter</span></div>}
function Analyse({notify}){const [asset,setAsset]=useState("EUR/USD"),[tf,setTf]=useState("1 min");return <>
 <PageHead eyebrow="SURVEILLANCE DU MARCHÉ" title="Analyse en direct" desc="Capture du graphique Pocket Option et analyse technique." action={<button className="outline-btn" onClick={()=>notify("L'agent Windows sera relié au backend dans une prochaine étape.")}><Monitor size={16}/> Agent Windows</button>}/><Notice/>
 <div className="analysis-toolbar"><label>ACTIF <select value={asset} onChange={e=>setAsset(e.target.value)}>{["EUR/USD","EUR/JPY","GBP/USD","USD/JPY","BTC/USD"].map(x=><option>{x}</option>)}</select></label><label>UNITÉ DE TEMPS <select value={tf} onChange={e=>setTf(e.target.value)}>{["30 sec","1 min","5 min","15 min"].map(x=><option>{x}</option>)}</select></label><span className="toolbar-state"><i className="status-dot"/> Capture non connectée</span></div>
 <div className="content-grid"><Panel kicker="ZONE DE CAPTURE" title={`${asset} · ${tf}`} extra={<span className="metric-badge">AUCUN FLUX</span>}><div className="capture-placeholder"><div className="capture-symbol"><ScanLine size={30}/></div><b>En attente de l'agent Windows</b><span>La capture du graphique Pocket Option apparaîtra ici.</span><button className="outline-btn" onClick={()=>notify("L'agent de capture local n'est pas encore relié.")}>État de l'agent</button></div></Panel><Panel kicker="RÉSULTAT DE L'ANALYSE" title="Lecture du marché"><div className="analysis-readout"><div className="wait-large"><Minus size={26}/></div><b>EN ATTENTE</b><span>Aucune analyse effectuée</span></div><div className="signal-details"><div><span>Tendance</span><b>—</b></div><div><span>RSI</span><b>—</b></div><div><span>MACD</span><b>—</b></div><div><span>Confiance</span><b>—</b></div></div></Panel></div>
 </>}
function Signaux(){return <><PageHead eyebrow="DÉCISIONS DU MOTEUR" title="Signaux" desc="Consultez les signaux validés, leur contexte et leurs limites."/><Notice/><div className="metric-grid"><Metric icon={<Activity/>} label="Signaux disponibles" value="0" meta="Aucun signal généré" color="purple"/><Metric icon={<Clock3/>} label="Limite quotidienne" value="5" meta="Politique prévue, appliquée côté serveur" color="blue"/><Metric icon={<ShieldCheck/>} label="Exécution automatique" value="Non" meta="L'utilisateur garde le contrôle" color="teal"/></div><Panel kicker="FLUX DES SIGNAUX" title="Signaux récents"><Empty icon={<Activity/>} title="Aucun signal validé" desc="Les signaux BUY, SELL ou WAIT apparaîtront uniquement après analyse réelle et validation du moteur."/></Panel></>}
function Marches(){const [q,setQ]=useState("");const list=["EUR/USD","EUR/JPY","GBP/USD","USD/JPY","AUD/USD","USD/CAD","BTC/USD","ETH/USD"];return <><PageHead eyebrow="INSTRUMENTS" title="Marchés" desc="Choisissez les actifs que l'agent pourra surveiller."/><div className="market-search"><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Rechercher un actif…"/></div><div className="market-grid">{list.filter(x=>x.toLowerCase().includes(q.toLowerCase())).map((x,i)=><div className="market-card" key={x}><div className="market-symbol">{x.split("/").map(y=>y[0]).join("")}</div><div className="market-name"><b>{x}</b><span>{i===6||i===7?"Crypto":"Forex"}</span></div><span className="market-pending">Non connecté</span></div>)}</div><p className="helper-note">La liste est une configuration d'interface. Les cours et la disponibilité des actifs dépendront du flux réellement accessible.</p></>}
function Historique(){return <><PageHead eyebrow="JOURNAL" title="Historique" desc="Retrouvez les captures, analyses et signaux enregistrés."/><div className="filter-row"><button className="filter-active"><CalendarDays size={15}/> Toutes les dates</button><button><SlidersHorizontal size={15}/> Tous les événements</button></div><Panel kicker="JOURNAL DES ÉVÉNEMENTS" title="Historique des analyses"><Empty icon={<FileClock/>} title="Votre historique est vide" desc="Aucun événement n'a encore été enregistré. Les données seront conservées par le backend."/></Panel></>}
function Statistiques(){return <><PageHead eyebrow="MESURES & PERFORMANCE" title="Statistiques" desc="Des indicateurs calculés uniquement à partir de résultats vérifiés."/><Notice/><div className="metric-grid"><Metric icon={<ChartNoAxesCombined/>} label="Taux de réussite" value="—" meta="En attente de données vérifiées" color="teal"/><Metric icon={<TrendingUp/>} label="Signaux analysés" value="—" meta="Aucune période disponible" color="purple"/><Metric icon={<Activity/>} label="Résultat net" value="—" meta="Aucun calcul de performance" color="blue"/><Metric icon={<Clock3/>} label="Période observée" value="—" meta="Pas encore de données" color="orange"/></div><Panel kicker="ÉVOLUTION" title="Performance dans le temps"><Empty icon={<BarChart3/>} title="Pas encore de statistiques" desc="Aucun graphique de performance ne sera affiché avant d'avoir des résultats réels."/></Panel></>}
function Parametres({notify}){return <><PageHead eyebrow="CONFIGURATION" title="Paramètres" desc="Préparez la connexion entre l'interface, votre serveur et l'agent local."/><div className="settings-grid"><Panel kicker="SERVEUR PRIVÉ" title="Connexion API"><div className="settings-form"><label>URL de l'API<input placeholder="https://api.votre-domaine.com" /></label><label>État de connexion<div className="setting-status"><i className="status-dot"/> Non connecté</div></label><button className="primary-btn" onClick={()=>notify("La configuration sera enregistrée lorsque l'API sera disponible.")}><Save size={15}/> Enregistrer</button></div></Panel><Panel kicker="APPLICATION WINDOWS" title="Agent de capture"><div className="settings-info"><System icon={<Monitor/>} name="Agent local" detail="Capture de la fenêtre Pocket Option"/><System icon={<MonitorSmartphone/>} name="Fenêtre flottante" detail="Toujours au premier plan, sur le PC"/><System icon={<Wifi/>} name="Connexion sécurisée" detail="À établir avec votre serveur"/></div></Panel><Panel kicker="LIMITES & SÉCURITÉ" title="Règles de fonctionnement"><div className="settings-info"><System icon={<Activity/>} name="Plafond de signaux" detail="5 par jour, à appliquer côté backend"/><System icon={<LockKeyhole/>} name="Ordres automatiques" detail="Désactivés par défaut"/><System icon={<KeyRound/>} name="Clés et secrets" detail="Stockés uniquement sur le serveur"/></div></Panel></div></>}
createRoot(document.getElementById("root")).render(<BrowserRouter><Shell/></BrowserRouter>);
