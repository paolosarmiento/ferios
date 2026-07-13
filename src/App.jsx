import React, { useState, useRef, useEffect } from "react";
import {
  Flame, AlertCircle, Target, Activity, Shield, Wind, TrendingUp, Dumbbell, Bike,
  BookOpen, Briefcase, Award, Mic, Home, Trophy, ShoppingBag, Zap, Wallet,
  Check, Plus, Coffee, Moon, Heart, Star, CalendarDays, Settings, Trash2,
  Edit3, X, ChevronRight, BarChart2, List, Hash, LayoutGrid,
  Waves, Footprints, Timer, Swords, Volleyball, Mountain, PersonStanding,
  Stethoscope, Brain, Leaf, Sun, Sunset, Layers, Music, Pencil, Globe,
  Lock, Eye, EyeOff, KeyRound, Download, Upload,
  Banknote, PiggyBank, ArrowUpRight, ArrowDownRight, Flag, TrendingDown,
  ChevronDown, SlidersHorizontal, Wallet2,
  Repeat, CreditCard, AlertTriangle, Percent, ReceiptText, Landmark,
  Utensils, Car, Plane, ShoppingCart, Gamepad2, Wifi, Gift,
  GraduationCap, Building2, Bus, Shirt, Monitor, Scissors,
  Baby, HeartPulse, Cigarette, PawPrint, Fuel, Wrench,
} from "lucide-react";

const C = {
  bg:'#0A0A0C', card:'#111113', card2:'#1A1A1E', border:'#242428', borderMid:'#2C2C31',
  pink:'#FF2D78', pinkBg:'rgba(255,45,120,0.09)', pinkGlow:'rgba(255,45,120,0.28)',
  pinkGlow2:'rgba(255,45,120,0.12)',
  text:'#F4F4F5', t2:'#68686F', t3:'#36363B',
  green:'#2ECC71', greenGlow:'rgba(46,204,113,0.25)',
  cyan:'#00CFFF', cyanGlow:'rgba(0,207,255,0.22)',
  purple:'#7B5FFF', purpleGlow:'rgba(123,95,255,0.22)',
  amber:'#FF9F43', amberGlow:'rgba(255,159,67,0.22)',
  red:'#FF4757',
};
const F = "'Manrope', system-ui, sans-serif";

// ── Icon palette for picker ───────────────────────────────────
const ICON_OPTIONS = [
  // Fitness & sport
  {id:'Target',         Icon:Target},
  {id:'Activity',       Icon:Activity},
  {id:'Shield',         Icon:Shield},
  {id:'Wind',           Icon:Wind},
  {id:'TrendingUp',     Icon:TrendingUp},
  {id:'Dumbbell',       Icon:Dumbbell},
  {id:'Bike',           Icon:Bike},
  {id:'Waves',          Icon:Waves},
  {id:'Footprints',     Icon:Footprints},
  {id:'Timer',          Icon:Timer},
  {id:'Swords',         Icon:Swords},
  {id:'Volleyball',     Icon:Volleyball},
  {id:'Mountain',       Icon:Mountain},
  {id:'PersonStanding', Icon:PersonStanding},
  // Food & lifestyle
  {id:'Coffee',         Icon:Coffee},
  {id:'Utensils',       Icon:Utensils},
  {id:'Gift',           Icon:Gift},
  {id:'Gamepad2',       Icon:Gamepad2},
  {id:'Music',          Icon:Music},
  {id:'Scissors',       Icon:Scissors},
  {id:'Baby',           Icon:Baby},
  {id:'PawPrint',       Icon:PawPrint},
  // Transport
  {id:'Car',            Icon:Car},
  {id:'Bus',            Icon:Bus},
  {id:'Plane',          Icon:Plane},
  {id:'Fuel',           Icon:Fuel},
  // Finance & work
  {id:'Banknote',       Icon:Banknote},
  {id:'CreditCard',     Icon:CreditCard},
  {id:'Landmark',       Icon:Landmark},
  {id:'ShoppingCart',   Icon:ShoppingCart},
  {id:'ShoppingBag',    Icon:ShoppingBag},
  {id:'Shirt',          Icon:Shirt},
  {id:'Building2',      Icon:Building2},
  {id:'Briefcase',      Icon:Briefcase},
  {id:'Wrench',         Icon:Wrench},
  // Health & wellness
  {id:'Heart',          Icon:Heart},
  {id:'HeartPulse',     Icon:HeartPulse},
  {id:'Brain',          Icon:Brain},
  {id:'Leaf',           Icon:Leaf},
  // Tech & utilities
  {id:'Monitor',        Icon:Monitor},
  {id:'Wifi',           Icon:Wifi},
  {id:'Zap',            Icon:Zap},
  {id:'Layers',         Icon:Layers},
  // Education & professional
  {id:'BookOpen',       Icon:BookOpen},
  {id:'GraduationCap',  Icon:GraduationCap},
  {id:'Mic',            Icon:Mic},
  {id:'Globe',          Icon:Globe},
  {id:'Pencil',         Icon:Pencil},
  {id:'BarChart2',      Icon:BarChart2},
  // General
  {id:'Star',           Icon:Star},
  {id:'Flame',          Icon:Flame},
  {id:'Sun',            Icon:Sun},
  {id:'Sunset',         Icon:Sunset},
  {id:'CalendarDays',   Icon:CalendarDays},
  {id:'Award',          Icon:Award},
  {id:'Trophy',         Icon:Trophy},
  {id:'Hash',           Icon:Hash},
];

const COLOR_OPTIONS = [
  C.pink, C.cyan, C.purple, C.amber, C.green, C.red, '#FF6B35', '#A8DADC',
];

// ── Seed data ─────────────────────────────────────────────────
const INIT_RINGS = [];

const INIT_GOALS = [];

const INIT_CASES = [];
const BASE = {level:1, xp:0, xpMax:1000, wallet:0};

const TTYPES = [
  {id:'time_distance',    Icon:TrendingUp, label:'Time & Dist.'},
  {id:'score_performance',Icon:Trophy,     label:'Score & Perf.'},
  {id:'just_vibes',       Icon:Zap,        label:'Just Vibes'},
];
const GOAL_TYPES = [
  {id:'progress',  Icon:BarChart2,   label:'Progress',    desc:'Track value toward a total (like reading pages)'},
  {id:'taskboard', Icon:LayoutGrid,  label:'Task Board',  desc:'Items move through stages (like case pipeline)'},
  {id:'eventlog',  Icon:List,        label:'Event Log',   desc:'Log named occurrences vs a period target'},
  {id:'counter',   Icon:Hash,        label:'Counter',     desc:'Simple tap-to-count toward a target'},
];
const PERIODS = ['weekly','monthly','annual'];

function getIconById(id) {
  const found = ICON_OPTIONS.find(function(o){ return o.id === id; });
  return found ? found.Icon : Zap;
}

function detectRingFromRings(name, rings) {
  const lo = name.toLowerCase();
  for (const r of rings) {
    if (lo.includes(r.label.toLowerCase())) return r.id;
    const keywords = r.label.toLowerCase().split(/[\s\/,-]+/);
    if (keywords.some(function(k){ return k.length > 2 && lo.includes(k); })) return r.id;
  }
  return null;
}

function calcXP(name, type, dur, dist, result, intensity, notes) {
  const lo = name.toLowerCase();
  let base = 50;
  if (lo.includes('muay') || lo.includes('boxing')) base = 80;
  else if (lo.includes('jiu') || lo.includes('bjj')) base = 75;
  else if (lo.includes('swim')) base = 70;
  else if (lo.includes('run'))  base = 60;
  const db = Math.max(0, dur - 20);
  let tb = 0;
  if (type === 'time_distance') tb = Math.round((parseFloat(dist)||0) * 5);
  else if (type === 'score_performance') tb = result==='win' ? 25 : result==='draw' ? 10 : 0;
  else tb = (intensity - 5) * 5;
  const nb = notes.length > 10 ? 10 : 0;
  return {base, db, tb, nb, total: Math.max(20, base+db+tb+nb)};
}

function tAgo(ts) {
  const m = Math.floor((Date.now()-ts)/60000);
  if (m < 1) return 'Just now';
  if (m < 60) return m + 'm ago';
  const h = Math.floor(m/60);
  return h < 24 ? h+'h ago' : Math.floor(h/24)+'d ago';
}

// ── XP / Level system ────────────────────────────────────────
const XP_LEVELS = [
  {level:1,  min:0,     max:1000},
  {level:2,  min:1000,  max:2500},
  {level:3,  min:2500,  max:4500},
  {level:4,  min:4500,  max:7000},
  {level:5,  min:7000,  max:10000},
  {level:6,  min:10000, max:14000},
  {level:7,  min:14000, max:19000},
  {level:8,  min:19000, max:25000},
  {level:9,  min:25000, max:32000},
  {level:10, min:32000, max:40000},
];
function getLevelInfo(totalXp) {
  var tier = XP_LEVELS.find(function(l){ return totalXp < l.max; }) || XP_LEVELS[XP_LEVELS.length-1];
  var pct  = Math.min(Math.round(((totalXp - tier.min) / (tier.max - tier.min)) * 100), 100);
  return { level: tier.level, pct: pct, min: tier.min, max: tier.max };
}

// ── Greeting helper ──────────────────────────────────────────
function getGreeting() {
  var h = new Date().getHours();
  if (h < 12) return 'Good morning,';
  if (h < 17) return 'Good afternoon,';
  if (h < 21) return 'Good evening,';
  return 'Good night,';
}

// ── localStorage persistence ──────────────────────────────────
var LS_KEY = 'ferios_v1';
function loadSaved() {
  try {
    var raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch(e) { return null; }
}
function saveState(state) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch(e) {}
}

// ── Rarity system ─────────────────────────────────────────────
const RARITY = {
  common:    {label:'COMMON',    color:'#2ECC71', glow:'rgba(46,204,113,0.30)'},
  rare:      {label:'RARE',      color:'#00CFFF', glow:'rgba(0,207,255,0.30)'},
  epic:      {label:'EPIC',      color:'#7B5FFF', glow:'rgba(123,95,255,0.30)'},
  legendary: {label:'LEGENDARY', color:'#FF9F43', glow:'rgba(255,159,67,0.35)'},
};

const INIT_BADGES = [
  {id:'bjj_first',  iconId:'Shield',     n:'First Roll',       d:'Log your first BJJ session',             rarity:'common',    autoKey:'bjj',        manualUnlocked:false, earnedDate:null, custom:false, cat:'Athletic'},
  {id:'streak3',    iconId:'Flame',      n:'On Fire',          d:'Maintain a 3-day activity streak',       rarity:'rare',      autoKey:'streak3',    manualUnlocked:false, earnedDate:null, custom:false, cat:'Athletic'},
  {id:'sessions10', iconId:'Zap',        n:'10 Sessions',      d:'Log 10 total training sessions',         rarity:'common',    autoKey:'sessions10', manualUnlocked:false, earnedDate:null, custom:false, cat:'Athletic'},
  {id:'sessions25', iconId:'TrendingUp', n:'25 Sessions',      d:'Log 25 total training sessions',         rarity:'rare',      autoKey:'sessions25', manualUnlocked:false, earnedDate:null, custom:false, cat:'Athletic'},
  {id:'allrings',   iconId:'Target',     n:'Full Circle',      d:'Close all weekly movement rings',        rarity:'epic',      autoKey:'allRings',   manualUnlocked:false, earnedDate:null, custom:false, cat:'Athletic'},
  {id:'muaythai5',  iconId:'Target',     n:'Nak Muay',         d:'Log 5 Muay Thai sessions',              rarity:'rare',      autoKey:'muaythai5',  manualUnlocked:false, earnedDate:null, custom:false, cat:'Athletic'},
  {id:'book_done',  iconId:'BookOpen',   n:'Page Turner',      d:'Finish a book',                         rarity:'common',    autoKey:'bookDone',   manualUnlocked:false, earnedDate:null, custom:false, cat:'Professional'},
  {id:'filed10',    iconId:'Briefcase',  n:'The Rainmaker',    d:'File 10 total pleadings',               rarity:'rare',      autoKey:'filed10',    manualUnlocked:false, earnedDate:null, custom:false, cat:'Professional'},
  {id:'speaking2',  iconId:'Mic',        n:'Main Stage',       d:'Log 2 speaking engagements',            rarity:'epic',      autoKey:'speaking2',  manualUnlocked:false, earnedDate:null, custom:false, cat:'Professional'},
  {id:'seminar3',   iconId:'Award',      n:'Knowledge Seeker', d:'Attend 3 seminars or trainings',        rarity:'rare',      autoKey:'seminar3',   manualUnlocked:false, earnedDate:null, custom:false, cat:'Professional'},
  {id:'double_gold',iconId:'Trophy',     n:'Double Gold',      d:'All rings closed + 2 pleadings in a week', rarity:'legendary', autoKey:'doubleGold', manualUnlocked:false, earnedDate:null, custom:false, cat:'Legendary'},
  {id:'apex',       iconId:'Star',       n:'Apex Week',        d:'All rings + all hustle goals in one week', rarity:'legendary', autoKey:'apexWeek',   manualUnlocked:false, earnedDate:null, custom:false, cat:'Legendary'},
];

const INIT_REWARDS = [
  {id:'sloth',     iconId:'Moon',       n:'Sloth Mode',       desc:'A sanctioned rest day with zero obligations.',             t:1, cost:150,  custom:false},
  {id:'cheat',     iconId:'Coffee',     n:'Cheat Meal',       desc:'One full guilt-free cheat meal, no questions asked.',      t:1, cost:200,  custom:false},
  {id:'smoothie',  iconId:'Zap',        n:'Smoothie Run',     desc:'Post-workout premium smoothie of your choice.',            t:1, cost:100,  custom:false},
  {id:'massage',   iconId:'Heart',      n:'Massage',          desc:'Full-body sports massage session for recovery.',           t:2, cost:600,  custom:false},
  {id:'boutique',  iconId:'Activity',   n:'Boutique Class',   desc:'One premium group class at a boutique studio.',            t:2, cost:500,  custom:false},
  {id:'dinner',    iconId:'Star',       n:'Nice Dinner Out',  desc:'A proper sit-down dinner at a restaurant of your choice.', t:2, cost:800,  custom:false},
  {id:'gear',      iconId:'ShoppingBag',n:'Gear Upgrade',     desc:'New training gear, apparel, or equipment.',                t:3, cost:2000, custom:false},
  {id:'staycation',iconId:'Home',       n:'Staycation',       desc:'A full weekend staycation at a hotel of your choice.',     t:3, cost:5000, custom:false},
  {id:'retreat',   iconId:'Mountain',   n:'Wellness Retreat', desc:'A multi-day fitness or wellness retreat experience.',      t:3, cost:8000, custom:false},
];

// ── Finance seed data ─────────────────────────────────────────
const INIT_INCOME_CATS = [
  {id:'salary',    label:'Salary',      iconId:'Briefcase', color:'#2ECC71'},
  {id:'freelance', label:'Freelance',   iconId:'Zap',       color:'#00CFFF'},
  {id:'investment',label:'Investments', iconId:'TrendingUp',color:'#7B5FFF'},
  {id:'side',      label:'Side Income', iconId:'Star',      color:'#FF9F43'},
  {id:'gift',      label:'Gift',        iconId:'Heart',     color:'#FF2D78'},
  {id:'other_in',  label:'Other',       iconId:'Hash',      color:'#6B6B72'},
];
const INIT_EXPENSE_CATS = [
  {id:'food',      label:'Food & Drink', iconId:'Coffee',     color:'#FF9F43'},
  {id:'transport', label:'Transport',    iconId:'Bike',       color:'#00CFFF'},
  {id:'health',    label:'Health',       iconId:'Heart',      color:'#FF4757'},
  {id:'shopping',  label:'Shopping',     iconId:'ShoppingBag',color:'#7B5FFF'},
  {id:'bills',     label:'Bills',        iconId:'Zap',        color:'#FF2D78'},
  {id:'fitness',   label:'Fitness',      iconId:'Activity',   color:'#2ECC71'},
  {id:'education', label:'Education',    iconId:'BookOpen',   color:'#00CFFF'},
  {id:'other_ex',  label:'Other',        iconId:'Hash',       color:'#6B6B72'},
];
const INIT_TRANSACTIONS = [];
const INIT_BUDGETS = {};
const INIT_SAVINGS_GOALS = [];

const DEBT_TYPES = [
  {id:'personal',    label:'Personal Loan',  iconId:'Landmark',    color:'#FF9F43'},
  {id:'credit_card', label:'Credit Card',    iconId:'CreditCard',  color:'#FF4757'},
  {id:'mortgage',    label:'Mortgage',       iconId:'Home',        color:'#7B5FFF'},
  {id:'car',         label:'Car Loan',       iconId:'Bike',        color:'#00CFFF'},
  {id:'other',       label:'Other Debt',     iconId:'Hash',        color:'#6B6B72'},
];
const INIT_DEBTS = [];

// ── Finance helpers ───────────────────────────────────────────
function fp(n) {
  if (!n && n !== 0) return '₱0';
  return '₱' + Math.abs(n).toLocaleString('en-PH');
}
function shortDate(s) {
  return new Date(s+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric'});
}
function todayStr() {
  var d=new Date();
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function getMonthlyData(transactions, months) {
  var result=[]; var now=new Date();
  for(var i=months-1;i>=0;i--){
    var dt=new Date(now.getFullYear(),now.getMonth()-i,1);
    var mt=transactions.filter(function(t){
      var d=new Date(t.date+'T00:00:00');
      return d.getMonth()===dt.getMonth()&&d.getFullYear()===dt.getFullYear();
    });
    var inc=mt.filter(function(t){return t.type==='income';}).reduce(function(s,t){return s+t.amount;},0);
    var exp=mt.filter(function(t){return t.type==='expense';}).reduce(function(s,t){return s+t.amount;},0);
    result.push({month:dt.toLocaleDateString('en-US',{month:'short'}),income:inc,expense:exp,savings:inc-exp});
  }
  return result;
}
function groupByDate(transactions) {
  var groups={};
  transactions.forEach(function(t){ if(!groups[t.date])groups[t.date]=[]; groups[t.date].push(t); });
  return Object.entries(groups).sort(function(a,b){return a[0]<b[0]?1:-1;});
}

const DEMO = [];

// ── Primitives ────────────────────────────────────────────────
function Label({ children }) {
  return (
    <div style={{fontSize:9.5,fontWeight:800,color:C.t2,letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:6,fontFamily:F}}>
      {children}
    </div>
  );
}

function Pill({ children, color }) {
  return (
    <div style={{display:'inline-block',fontSize:9,fontWeight:800,letterSpacing:'0.08em',padding:'3px 10px',borderRadius:99,background:color+'18',color:color,fontFamily:F,border:'1px solid '+color+'28'}}>
      {children}
    </div>
  );
}

function Inp({ value, onChange, placeholder, type }) {
  const [focused, setFocused] = useState(false);
  const bdr = '1px solid ' + (focused ? C.pink : C.border);
  return (
    <input
      type={type || 'text'} value={value} placeholder={placeholder}
      onChange={function(e){ onChange(e.target.value); }}
      onFocus={function(){ setFocused(true); }}
      onBlur={function(){ setFocused(false); }}
      style={{width:'100%',boxSizing:'border-box',background:C.card2,border:bdr,borderRadius:12,padding:'13px 15px',fontSize:14,color:C.text,fontFamily:F,fontWeight:500,outline:'none',transition:'border-color 0.2s'}}
    />
  );
}

function Btn({ onClick, children, ghost, disabled, small }) {
  const bg  = disabled ? C.card2 : ghost ? 'transparent' : C.pink;
  const cl  = disabled ? C.t3 : ghost ? C.t2 : '#000';
  const bdr = ghost ? '1px solid ' + C.borderMid : disabled ? '1px solid '+C.border : 'none';
  const sh  = (!disabled && !ghost) ? '0 6px 28px ' + C.pinkGlow + ', 0 2px 8px rgba(255,45,120,0.15)' : 'none';
  const pad = small ? '11px 0' : '15px 0';
  const fsz = small ? 12 : 14;
  return (
    <button onClick={onClick} disabled={disabled} className={!disabled && !ghost ? 'btn-primary' : ''}
      style={{width:'100%',border:bdr,borderRadius:14,padding:pad,fontSize:fsz,fontWeight:800,letterSpacing:'0.05em',fontFamily:F,cursor:disabled?'not-allowed':'pointer',background:bg,color:cl,boxShadow:sh,minHeight:48,transition:'opacity 0.15s, box-shadow 0.15s'}}>
      {children}
    </button>
  );
}

function Sheet({ onClose, title, children, tall, zIndex }) {
  return (
    <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,zIndex:zIndex||100,background:'rgba(0,0,0,0.88)',display:'flex',alignItems:'flex-end',backdropFilter:'blur(2px)'}}
      onClick={onClose}>
      <div onClick={function(e){ e.stopPropagation(); }} className="scr sheet-slide"
        style={{width:'100%',background:'#131315',border:'1px solid '+C.borderMid,borderTop:'1px solid rgba(255,255,255,0.07)',borderRadius:'26px 26px 0 0',padding:'20px 22px 52px',maxHeight:tall?'93%':'84%',overflowY:'auto',fontFamily:F,boxShadow:'0 -24px 60px rgba(0,0,0,0.6)'}}>
        <div style={{width:36,height:4,borderRadius:99,background:'#2A2A2E',margin:'0 auto 22px'}} />
        {title && <div style={{fontSize:18,fontWeight:900,color:C.text,letterSpacing:'-0.03em',marginBottom:22}}>{title}</div>}
        {children}
      </div>
    </div>
  );
}

function Hr() {
  return <div style={{height:1,background:C.border,margin:'16px 0'}} />;
}

function IBox({ children, color }) {
  const bg  = color ? color + '12' : C.card2;
  const bdr = '1px solid ' + (color ? color + '25' : C.border);
  const sh  = color ? '0 0 0 1px '+color+'10 inset' : 'none';
  return (
    <div style={{width:48,height:48,borderRadius:14,flexShrink:0,background:bg,border:bdr,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:sh}}>
      {children}
    </div>
  );
}

// ── Icon + Color Pickers ──────────────────────────────────────
function IconPicker({ value, onChange }) {
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:6}}>
      {ICON_OPTIONS.map(function(o){
        const Icon = o.Icon;
        const sel = value === o.id;
        return (
          <button key={o.id} onClick={function(){ onChange(o.id); }}
            style={{padding:'10px 0',borderRadius:12,background:sel?C.pinkBg:C.card2,border:'1px solid '+(sel?C.pink:C.border),cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.15s'}}>
            <Icon size={18} color={sel?C.pink:C.t2} />
          </button>
        );
      })}
    </div>
  );
}

function ColorPicker({ value, onChange }) {
  return (
    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
      {COLOR_OPTIONS.map(function(c){
        const sel = value === c;
        return (
          <button key={c} onClick={function(){ onChange(c); }}
            style={{width:36,height:36,borderRadius:10,background:c,border:'2px solid '+(sel?C.text:'transparent'),cursor:'pointer',transition:'border-color 0.15s',flexShrink:0}}>
          </button>
        );
      })}
    </div>
  );
}

// ── Ring ──────────────────────────────────────────────────────
function Ring({ done, target, color, Icon, label }) {
  const sz = 74, r = sz*0.37, cx = sz/2, cy = sz/2;
  const circ = 2*Math.PI*r;
  const pct  = target > 0 ? Math.min(done/target, 1) : 0;
  const offset = circ*(1-pct);
  const full = done >= target && target > 0;
  const iconColor = full ? '#fff' : pct > 0 ? color : C.t3;
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:7}}>
      <div style={{position:'relative',width:sz,height:sz,filter:full?'drop-shadow(0 0 8px '+color+'55)':'none',transition:'filter 0.5s ease'}}>
        <svg width={sz} height={sz} viewBox={'0 0 '+sz+' '+sz} style={{transform:'rotate(-90deg)',display:'block'}}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.border} strokeWidth={6} />
          {pct > 0 && (
            <circle cx={cx} cy={cy} r={r} fill="none" stroke={color}
              strokeWidth={6} strokeLinecap="round"
              strokeDasharray={String(circ)} strokeDashoffset={String(offset)}
              style={{transition:'stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1)'}} />
          )}
        </svg>
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
          {full ? (
            <div className="ring-complete" style={{width:34,height:34,borderRadius:'50%',background:color,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 0 16px '+color+'80'}}>
              <Check size={16} color="#000" strokeWidth={3} />
            </div>
          ) : (
            <Icon size={20} color={iconColor} />
          )}
        </div>
      </div>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:7.5,fontWeight:700,color:C.t2,letterSpacing:'0.04em',marginBottom:3,fontFamily:F,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:sz+'px'}}>{label.toUpperCase()}</div>
        <div style={{fontSize:12,fontWeight:900,color:full?color:C.text,fontFamily:F}}>
          {done}<span style={{color:C.t3,fontWeight:500,fontSize:11}}>/{target}</span>
        </div>
      </div>
    </div>
  );
}

// ── Flame ─────────────────────────────────────────────────────
function FlameCard({ streak }) {
  const alive = streak < 3;
  const left  = Math.max(0, 3-streak);
  const sc    = alive ? C.amber : C.red;
  const glowC = alive ? 'rgba(255,159,67,0.18)' : 'rgba(255,71,87,0.18)';
  return (
    <div style={{background:C.card,borderRadius:20,border:'1px solid '+(alive?'rgba(255,159,67,0.18)':C.border),padding:'16px 18px',marginBottom:12,display:'flex',alignItems:'center',gap:14,boxShadow:alive?'0 2px 24px rgba(255,159,67,0.06)':'none'}}>
      <IBox color={sc}>
        <div className={alive ? 'flame' : ''}>
          {alive ? <Flame size={22} color={sc} /> : <AlertCircle size={22} color={sc} />}
        </div>
      </IBox>
      <div style={{flex:1}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:9}}>
          <div style={{fontSize:14,fontWeight:800,color:sc,fontFamily:F}}>{alive ? 'Streak Active' : 'Streak Dead'}</div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <span style={{fontSize:11,fontWeight:800,color:sc,fontFamily:F}}>Day {streak}/3</span>
          </div>
        </div>
        <div style={{height:3,background:C.border,borderRadius:99,overflow:'hidden',marginBottom:8}}>
          <div style={{height:'100%',borderRadius:99,width:((streak/3)*100)+'%',background:streak<2?C.amber:streak<3?C.red:'#444',transition:'width 0.6s cubic-bezier(0.4,0,0.2,1)',boxShadow:'0 0 8px '+sc+'80'}} />
        </div>
        <div style={{fontSize:11,fontWeight:500,color:C.t2,fontFamily:F}}>
          {alive ? (left+' day'+(left!==1?'s':'')+' left — keep the fire burning') : 'Log an activity to restart'}
        </div>
      </div>
    </div>
  );
}

// ── List rows ─────────────────────────────────────────────────
function HustleRow({ Icon, label, subtitle, metric, badge, prog, last, onClick, color }) {
  return (
    <div onClick={onClick} className="lrow"
      style={{display:'flex',alignItems:'center',gap:14,padding:'15px 0',cursor:'pointer',borderBottom:last?'none':'1px solid '+C.border,minHeight:64}}>
      <IBox color={color}>
        <Icon size={20} color={color || C.t2} />
      </IBox>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:3,fontFamily:F,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{label}</div>
        <div style={{fontSize:11,fontWeight:500,color:C.t2,fontFamily:F,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{subtitle}</div>
        {prog != null && (
          <div style={{height:2.5,background:C.border,borderRadius:99,overflow:'hidden',marginTop:8,maxWidth:'75%'}}>
            <div className="shimmer-bar" style={{height:'100%',borderRadius:99,width:prog+'%',background:color||C.cyan,transition:'width 0.9s cubic-bezier(0.4,0,0.2,1)'}} />
          </div>
        )}
      </div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:5,flexShrink:0}}>
        <div style={{fontSize:14,fontWeight:800,color:C.text,fontFamily:F}}>{metric}</div>
        {badge && <Pill color={badge.c}>{badge.l}</Pill>}
      </div>
      <div style={{color:C.t3,fontSize:14,flexShrink:0,marginLeft:2}}>›</div>
    </div>
  );
}

function SessionRow({ session, last }) {
  const lo = session.name.toLowerCase();
  let Icon = Zap;
  if (lo.includes('muay') || lo.includes('boxing')) Icon = Target;
  else if (lo.includes('jiu') || lo.includes('bjj')) Icon = Shield;
  else if (lo.includes('pilates')) Icon = Activity;
  else if (lo.includes('yoga') || lo.includes('flow')) Icon = Wind;
  else if (lo.includes('run')) Icon = TrendingUp;
  else if (lo.includes('weight') || lo.includes('lift')) Icon = Dumbbell;
  else if (lo.includes('cycl') || lo.includes('bike')) Icon = Bike;
  const tl = {time_distance:'Distance', score_performance:'Score', just_vibes:'Vibes'};
  const rc = session.result==='win' ? C.green : session.result==='draw' ? C.amber : C.red;
  return (
    <div style={{display:'flex',alignItems:'center',gap:14,padding:'14px 0',borderBottom:last?'none':'1px solid '+C.border}}>
      <IBox>
        <Icon size={20} color={C.t2} />
      </IBox>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:2,fontFamily:F}}>{session.name}</div>
        <div style={{fontSize:11,fontWeight:500,color:C.t2,fontFamily:F}}>{session.duration+' min · '+tl[session.type]+' · '+tAgo(session.timestamp)}</div>
      </div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:5,flexShrink:0}}>
        <div style={{fontSize:15,fontWeight:800,color:C.pink,fontFamily:F}}>{'+'+session.xp+' XP'}</div>
        {session.result && <Pill color={rc}>{session.result.toUpperCase()}</Pill>}
        {!session.result && session.intensity && <Pill color={C.amber}>{session.intensity+'/10'}</Pill>}
      </div>
    </div>
  );
}

// ── Manage Rings Sheet ────────────────────────────────────────
function ManageRingsSheet({ rings, onClose, onAdd, onEdit, onRemove }) {
  const [view, setView] = useState('list'); // 'list' | 'add' | 'edit'
  const [editing, setEditing] = useState(null);

  // form state
  const [fLabel, setFLabel] = useState('');
  const [fIcon,  setFIcon]  = useState('Zap');
  const [fColor, setFColor] = useState(C.pink);
  const [fTarget,setFTarget]= useState('3');
  const [fTrack, setFTrack] = useState('just_vibes');
  const [fXp,    setFXp]    = useState('50');

  function openAdd() {
    setFLabel(''); setFIcon('Zap'); setFColor(C.pink);
    setFTarget('3'); setFTrack('just_vibes'); setFXp('50');
    setView('add');
  }

  function openEdit(r) {
    setEditing(r);
    setFLabel(r.label); setFIcon(r.iconId); setFColor(r.color);
    setFTarget(String(r.target)); setFTrack(r.trackType||'just_vibes'); setFXp(String(r.xp));
    setView('edit');
  }

  function commitAdd() {
    if (!fLabel.trim()) return;
    onAdd({
      id: 'ring_' + Date.now(),
      iconId: fIcon,
      label: fLabel.trim(),
      done: 0,
      target: Math.max(1, parseInt(fTarget)||1),
      color: fColor,
      xp: Math.max(10, parseInt(fXp)||50),
      trackType: fTrack,
    });
    setView('list');
  }

  function commitEdit() {
    if (!fLabel.trim() || !editing) return;
    onEdit(editing.id, {
      iconId: fIcon,
      label: fLabel.trim(),
      target: Math.max(1, parseInt(fTarget)||1),
      color: fColor,
      xp: Math.max(10, parseInt(fXp)||50),
      trackType: fTrack,
    });
    setView('list');
  }

  const title = view === 'list' ? 'Manage Activities' : view === 'add' ? 'Add Activity' : 'Edit Activity';

  return (
    <Sheet onClose={onClose} title={title} tall zIndex={110}>
      {view === 'list' && (
        <div>
          {rings.map(function(r, i){
            const Icon = getIconById(r.iconId);
            return (
              <div key={r.id} style={{display:'flex',alignItems:'center',gap:12,padding:'13px 0',borderBottom:i===rings.length-1?'none':'1px solid '+C.border}}>
                <IBox color={r.color}><Icon size={20} color={r.color} /></IBox>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:700,color:C.text,fontFamily:F}}>{r.label}</div>
                  <div style={{fontSize:11,color:C.t2,fontFamily:F}}>Target {r.target}×/week · {r.xp} XP</div>
                </div>
                <button onClick={function(){ openEdit(r); }}
                  style={{background:'none',border:'1px solid '+C.border,borderRadius:10,padding:'7px 10px',cursor:'pointer',display:'flex',alignItems:'center',gap:4}}>
                  <Edit3 size={14} color={C.t2} />
                </button>
                <button onClick={function(){ onRemove(r.id); }}
                  style={{background:'none',border:'1px solid '+C.red+'30',borderRadius:10,padding:'7px 10px',cursor:'pointer',display:'flex',alignItems:'center',gap:4}}>
                  <Trash2 size={14} color={C.red} />
                </button>
              </div>
            );
          })}
          <div style={{marginTop:16}}>
            <button onClick={openAdd}
              style={{width:'100%',background:'none',border:'1px dashed '+C.borderMid,borderRadius:14,padding:'14px',fontSize:13,fontWeight:700,color:C.t2,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8,fontFamily:F}}>
              <Plus size={16} color={C.pink} /> Add Activity
            </button>
          </div>
        </div>
      )}
      {(view === 'add' || view === 'edit') && (
        <div>
          <div style={{marginBottom:14}}>
            <Label>Activity name</Label>
            <Inp value={fLabel} onChange={setFLabel} placeholder="e.g. Swimming" />
          </div>
          <div style={{marginBottom:14}}>
            <Label>Icon</Label>
            <IconPicker value={fIcon} onChange={setFIcon} />
          </div>
          <div style={{marginBottom:14}}>
            <Label>Color</Label>
            <ColorPicker value={fColor} onChange={setFColor} />
          </div>
          <div style={{marginBottom:14}}>
            <Label>Weekly target (sessions)</Label>
            <Inp type="number" value={fTarget} onChange={setFTarget} placeholder="3" />
          </div>
          {view === 'add' && (
            <div style={{marginBottom:14}}>
              <Label>Tracking type</Label>
              <div style={{display:'flex',flexDirection:'column',gap:7}}>
                {[
                  {id:'time_distance',    Icon:TrendingUp, label:'Time & Distance',      desc:'Log duration + distance (km/m). Great for runs, swims, rides.'},
                  {id:'score_performance',Icon:Trophy,     label:'Score & Performance',   desc:'Record win/loss/draw + score. Best for sparring or competitive drills.'},
                  {id:'just_vibes',       Icon:Zap,        label:'Just Vibes',            desc:'Rate session intensity 1–10. Ideal for yoga, pilates, or recovery work.'},
                ].map(function(t){
                  const Icon = t.Icon;
                  const sel = fTrack === t.id;
                  return (
                    <button key={t.id} onClick={function(){ setFTrack(t.id); }}
                      style={{background:sel?C.pinkBg:C.card2,border:'1px solid '+(sel?C.pink:C.border),borderRadius:14,padding:'13px 14px',display:'flex',alignItems:'center',gap:14,cursor:'pointer',transition:'all 0.15s',textAlign:'left'}}>
                      <div style={{width:38,height:38,borderRadius:11,background:sel?C.pink+'18':'rgba(255,255,255,0.04)',border:'1px solid '+(sel?C.pink+'30':C.border),display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                        <Icon size={18} color={sel?C.pink:C.t2} />
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:700,color:sel?C.pink:C.text,fontFamily:F,marginBottom:3}}>{t.label}</div>
                        <div style={{fontSize:11,fontWeight:500,color:C.t2,fontFamily:F,lineHeight:1.4}}>{t.desc}</div>
                      </div>
                      {sel && <Check size={15} color={C.pink} style={{flexShrink:0}} />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <div style={{marginBottom:20}}>
            <Label>XP per session</Label>
            <Inp type="number" value={fXp} onChange={setFXp} placeholder="50" />
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            <Btn onClick={view==='add'?commitAdd:commitEdit} disabled={!fLabel.trim()}>
              {view==='add'?'Add Activity':'Save Changes'}
            </Btn>
            <Btn ghost onClick={function(){ setView('list'); }}>Cancel</Btn>
          </div>
        </div>
      )}
    </Sheet>
  );
}

// ── Manage Goals Sheet ────────────────────────────────────────
function ManageGoalsSheet({ goals, onClose, onAdd, onEdit, onRemove }) {
  const [view, setView]   = useState('list');
  const [editing, setEditing] = useState(null);
  const [step, setStep]   = useState(1); // for add flow: 1=meta, 2=type, 3=details

  const [fLabel,  setFLabel]  = useState('');
  const [fIcon,   setFIcon]   = useState('Zap');
  const [fColor,  setFColor]  = useState(C.pink);
  const [fType,   setFType]   = useState('counter');
  const [fPeriod, setFPeriod] = useState('monthly');
  const [fTarget, setFTarget] = useState('5');
  const [fUnit,   setFUnit]   = useState('items');
  const [fXp,     setFXp]     = useState('50');

  function openAdd() {
    setFLabel(''); setFIcon('Zap'); setFColor(C.pink);
    setFType('counter'); setFPeriod('monthly'); setFTarget('5');
    setFUnit('items'); setFXp('50');
    setStep(1); setView('add');
  }

  function openEdit(g) {
    setEditing(g);
    setFLabel(g.label); setFIcon(g.iconId); setFColor(g.color);
    setFType(g.type); setFPeriod(g.period); setFTarget(String(g.target));
    setFUnit(g.unit||'items'); setFXp(String(g.xpPer||50));
    setView('edit');
  }

  function commitAdd() {
    if (!fLabel.trim()) return;
    const gt = GOAL_TYPES.find(function(t){ return t.id===fType; });
    let initData = {};
    if (fType==='progress') initData = {title:fLabel.trim(),current:0,total:parseInt(fTarget)||100,completed:false};
    else if (fType==='taskboard') initData = {stages:['Open','Active','Done'],items:[]};
    else if (fType==='eventlog') initData = {entries:[]};
    else if (fType==='counter') initData = {count:0};
    onAdd({
      id: 'goal_'+Date.now(),
      iconId: fIcon, label: fLabel.trim(), color: fColor,
      period: fPeriod, target: Math.max(1,parseInt(fTarget)||1),
      unit: fUnit.trim()||'items', xpPer: Math.max(1,parseInt(fXp)||50),
      type: fType, data: initData,
    });
    setView('list');
  }

  function commitEdit() {
    if (!fLabel.trim() || !editing) return;
    onEdit(editing.id, {
      iconId: fIcon, label: fLabel.trim(), color: fColor,
      period: fPeriod, target: Math.max(1,parseInt(fTarget)||1),
      unit: fUnit.trim()||'items', xpPer: Math.max(1,parseInt(fXp)||50),
    });
    setView('list');
  }

  function titleFor() {
    if (view==='list') return 'Manage Goals';
    if (view==='edit') return 'Edit Goal';
    return ['Meta','Goal Type','Details'][step-1];
  }

  return (
    <Sheet onClose={onClose} title={titleFor()} tall zIndex={110}>
      {view === 'list' && (
        <div>
          {goals.map(function(g, i){
            const Icon = getIconById(g.iconId);
            return (
              <div key={g.id} style={{display:'flex',alignItems:'center',gap:12,padding:'13px 0',borderBottom:i===goals.length-1?'none':'1px solid '+C.border}}>
                <IBox color={g.color}><Icon size={20} color={g.color} /></IBox>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:700,color:C.text,fontFamily:F,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{g.label}</div>
                  <div style={{fontSize:11,color:C.t2,fontFamily:F,textTransform:'capitalize'}}>{g.period} · {g.type} · {g.xpPer} XP</div>
                </div>
                <button onClick={function(){ openEdit(g); }}
                  style={{background:'none',border:'1px solid '+C.border,borderRadius:10,padding:'7px 10px',cursor:'pointer'}}>
                  <Edit3 size={14} color={C.t2} />
                </button>
                <button onClick={function(){ onRemove(g.id); }}
                  style={{background:'none',border:'1px solid '+C.red+'30',borderRadius:10,padding:'7px 10px',cursor:'pointer'}}>
                  <Trash2 size={14} color={C.red} />
                </button>
              </div>
            );
          })}
          <div style={{marginTop:16}}>
            <button onClick={openAdd}
              style={{width:'100%',background:'none',border:'1px dashed '+C.borderMid,borderRadius:14,padding:'14px',fontSize:13,fontWeight:700,color:C.t2,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8,fontFamily:F}}>
              <Plus size={16} color={C.pink} /> Add Goal
            </button>
          </div>
        </div>
      )}

      {view === 'edit' && (
        <div>
          <div style={{marginBottom:14}}><Label>Name</Label><Inp value={fLabel} onChange={setFLabel} placeholder="Goal name" /></div>
          <div style={{marginBottom:14}}><Label>Icon</Label><IconPicker value={fIcon} onChange={setFIcon} /></div>
          <div style={{marginBottom:14}}><Label>Color</Label><ColorPicker value={fColor} onChange={setFColor} /></div>
          <div style={{marginBottom:14}}>
            <Label>Period</Label>
            <div style={{display:'flex',gap:6}}>
              {PERIODS.map(function(p){
                const sel=fPeriod===p;
                return (
                  <button key={p} onClick={function(){ setFPeriod(p); }}
                    style={{flex:1,padding:'9px 0',borderRadius:10,fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:F,textTransform:'capitalize',background:sel?C.pinkBg:C.card2,border:'1px solid '+(sel?C.pink:C.border),color:sel?C.pink:C.t2}}>
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
          <div style={{marginBottom:14}}><Label>Target</Label><Inp type="number" value={fTarget} onChange={setFTarget} placeholder="5" /></div>
          <div style={{marginBottom:14}}><Label>Unit label</Label><Inp value={fUnit} onChange={setFUnit} placeholder="e.g. pleadings" /></div>
          <div style={{marginBottom:20}}><Label>XP per completion</Label><Inp type="number" value={fXp} onChange={setFXp} placeholder="50" /></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            <Btn onClick={commitEdit} disabled={!fLabel.trim()}>Save Changes</Btn>
            <Btn ghost onClick={function(){ setView('list'); }}>Cancel</Btn>
          </div>
        </div>
      )}

      {view === 'add' && step === 1 && (
        <div>
          <div style={{marginBottom:14}}><Label>Goal name</Label><Inp value={fLabel} onChange={setFLabel} placeholder="e.g. Daily Journaling" /></div>
          <div style={{marginBottom:14}}><Label>Icon</Label><IconPicker value={fIcon} onChange={setFIcon} /></div>
          <div style={{marginBottom:20}}><Label>Color</Label><ColorPicker value={fColor} onChange={setFColor} /></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            <Btn onClick={function(){ if(fLabel.trim()) setStep(2); }} disabled={!fLabel.trim()}>Next</Btn>
            <Btn ghost onClick={function(){ setView('list'); }}>Cancel</Btn>
          </div>
        </div>
      )}

      {view === 'add' && step === 2 && (
        <div>
          <div style={{marginBottom:16}}>
            {GOAL_TYPES.map(function(t){
              const Icon = t.Icon;
              const sel = fType === t.id;
              return (
                <button key={t.id} onClick={function(){ setFType(t.id); }}
                  style={{width:'100%',display:'flex',alignItems:'center',gap:14,padding:'14px 16px',borderRadius:14,marginBottom:8,cursor:'pointer',background:sel?C.pinkBg:C.card2,border:'1px solid '+(sel?C.pink:C.border),transition:'all 0.15s',textAlign:'left'}}>
                  <Icon size={22} color={sel?C.pink:C.t2} />
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:sel?C.pink:C.text,fontFamily:F}}>{t.label}</div>
                    <div style={{fontSize:11,color:C.t2,fontFamily:F,marginTop:2}}>{t.desc}</div>
                  </div>
                  {sel && <Check size={16} color={C.pink} style={{marginLeft:'auto',flexShrink:0}} />}
                </button>
              );
            })}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            <Btn onClick={function(){ setStep(3); }}>Next</Btn>
            <Btn ghost onClick={function(){ setStep(1); }}>Back</Btn>
          </div>
        </div>
      )}

      {view === 'add' && step === 3 && (
        <div>
          <div style={{marginBottom:14}}>
            <Label>Period</Label>
            <div style={{display:'flex',gap:6}}>
              {PERIODS.map(function(p){
                const sel=fPeriod===p;
                return (
                  <button key={p} onClick={function(){ setFPeriod(p); }}
                    style={{flex:1,padding:'9px 0',borderRadius:10,fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:F,textTransform:'capitalize',background:sel?C.pinkBg:C.card2,border:'1px solid '+(sel?C.pink:C.border),color:sel?C.pink:C.t2}}>
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
          <div style={{marginBottom:14}}><Label>Target ({fType==='progress'?'total value':'count per period'})</Label><Inp type="number" value={fTarget} onChange={setFTarget} placeholder="5" /></div>
          {fType !== 'progress' && <div style={{marginBottom:14}}><Label>Unit label</Label><Inp value={fUnit} onChange={setFUnit} placeholder="e.g. pages, sessions" /></div>}
          <div style={{marginBottom:20}}><Label>XP per completion</Label><Inp type="number" value={fXp} onChange={setFXp} placeholder="50" /></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            <Btn onClick={commitAdd}>Add Goal</Btn>
            <Btn ghost onClick={function(){ setStep(2); }}>Back</Btn>
          </div>
        </div>
      )}
    </Sheet>
  );
}

// ── Goal Detail Modals ────────────────────────────────────────
function ProgressGoalModal({ goal, onSave, onClose, gain }) {
  const d = goal.data;
  const [val, setVal] = useState(String(d.current||d.page||0));
  const n = Math.max(0, Math.min(parseInt(val)||0, d.total||d.total));
  const pct = Math.round((n/(d.total||1))*100);
  const fin = n >= (d.total||1) && !d.completed;
  const col = fin ? C.green : goal.color;
  const r2 = 32, circ = 2*Math.PI*r2, off = circ*(1-pct/100);
  return (
    <Sheet onClose={onClose} title={goal.label}>
      <div style={{display:'flex',gap:16,alignItems:'center',marginBottom:22}}>
        <svg width={84} height={84} viewBox="0 0 84 84" style={{transform:'rotate(-90deg)',flexShrink:0,display:'block'}}>
          <circle cx={42} cy={42} r={r2} fill="none" stroke={C.border} strokeWidth={6} />
          <circle cx={42} cy={42} r={r2} fill="none" stroke={col} strokeWidth={6} strokeLinecap="round"
            strokeDasharray={String(circ)} strokeDashoffset={String(off)} style={{transition:'stroke-dashoffset 0.4s ease'}} />
        </svg>
        <div style={{flex:1}}>
          <div style={{fontSize:15,fontWeight:700,color:C.text,fontFamily:F,marginBottom:3}}>{d.title||goal.label}</div>
          {d.author && <div style={{fontSize:12,color:C.t2,fontFamily:F,marginBottom:8}}>{d.author}</div>}
          <div style={{fontSize:28,fontWeight:800,color:col,fontFamily:F}}>{pct+'%'}</div>
        </div>
      </div>
      {fin && (
        <div style={{background:C.green+'10',border:'1px solid '+C.green+'30',borderRadius:14,padding:14,marginBottom:16,textAlign:'center'}}>
          <Check size={24} color={C.green} style={{marginBottom:6}} />
          <div style={{fontSize:13,fontWeight:700,color:C.green,fontFamily:F}}>Complete!  +{goal.xpFinish||500} XP</div>
        </div>
      )}
      <div style={{marginBottom:8}}>
        <Label>{'Progress (of '+(d.total||100)+')'}</Label>
        <Inp type="number" value={val} onChange={function(v){ setVal(String(Math.max(0,Math.min(parseInt(v)||0,d.total||100)))); }} placeholder={'1 – '+(d.total||100)} />
      </div>
      <div style={{display:'flex',gap:6,marginBottom:18}}>
        {[25,50,75,100].map(function(p){
          return (
            <button key={p} onClick={function(){ setVal(String(Math.round((d.total||100)*p/100))); }}
              style={{flex:1,background:C.card2,border:'1px solid '+C.border,borderRadius:10,padding:'7px 0',fontSize:11,fontWeight:700,color:C.t2,cursor:'pointer',fontFamily:F}}>
              {p+'%'}
            </button>
          );
        })}
      </div>
      <Btn onClick={function(){
        if (n === (d.current||d.page||0)) return;
        onSave(goal.id, Object.assign({},d,{current:n,page:n,completed:fin||d.completed}));
        gain(fin?(goal.xpFinish||500):(goal.xpPer||25), fin?'Complete!  +'+(goal.xpFinish||500)+' XP':'Progress saved  +'+(goal.xpPer||25)+' XP');
        onClose();
      }} disabled={n===(d.current||d.page||0)}>
        {fin?'Finish  +'+(goal.xpFinish||500)+' XP':'Save Progress  +'+(goal.xpPer||25)+' XP'}
      </Btn>
    </Sheet>
  );
}

function TaskBoardGoalModal({ goal, onSave, onClose, gain }) {
  const d = goal.data;
  const [items, setItems] = useState(d.items||[]);
  const [newTitle, setNewTitle] = useState('');
  const [adding, setAdding] = useState(false);
  const stages = d.stages||['Open','Active','Done'];
  const doneStage = stages[stages.length-1];

  function moveItem(id, toStage) {
    const updated = items.map(function(it){ return it.id===id?Object.assign({},it,{stage:toStage}):it; });
    setItems(updated);
    onSave(goal.id, Object.assign({},d,{items:updated}));
    if (toStage===doneStage) gain(goal.xpPer||200, 'Filed  +'+(goal.xpPer||200)+' XP');
  }

  function addItem() {
    if (!newTitle.trim()) return;
    const updated = items.concat([{id:Date.now(),title:newTitle.trim(),stage:stages[0]}]);
    setItems(updated);
    onSave(goal.id, Object.assign({},d,{items:updated}));
    setNewTitle(''); setAdding(false);
  }

  const stClr = {};
  stClr[stages[0]] = C.t2;
  if (stages[1]) stClr[stages[1]] = C.amber;
  stClr[doneStage] = C.green;

  return (
    <Sheet onClose={onClose} title={goal.label} tall>
      {items.filter(function(it){ return it.stage===doneStage; }).length >= goal.target && (
        <div style={{background:C.green+'10',border:'1px solid '+C.green+'25',borderRadius:14,padding:'12px 14px',marginBottom:16,display:'flex',alignItems:'center',gap:10}}>
          <Check size={20} color={C.green} />
          <div>
            <div style={{fontSize:12,fontWeight:700,color:C.green,fontFamily:F}}>{goal.period.charAt(0).toUpperCase()+goal.period.slice(1)} target hit!</div>
            <div style={{fontSize:11,color:C.t2,fontFamily:F}}>{goal.target} {goal.unit} {doneStage.toLowerCase()} this {goal.period}.</div>
          </div>
        </div>
      )}
      <div style={{display:'grid',gridTemplateColumns:'repeat('+stages.length+',1fr)',gap:8,marginBottom:20}}>
        {stages.map(function(status){
          const byStage = items.filter(function(it){ return it.stage===status; });
          const nextStage = stages[stages.indexOf(status)+1];
          return (
            <div key={status}>
              <div style={{display:'flex',alignItems:'center',gap:5,marginBottom:8,paddingBottom:7,borderBottom:'1px solid '+C.border}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:stClr[status]||C.t2}} />
                <div style={{fontSize:9,fontWeight:700,color:C.t2,textTransform:'uppercase',letterSpacing:'0.05em',fontFamily:F}}>{status+' ('+byStage.length+')'}</div>
              </div>
              {byStage.map(function(it){
                return (
                  <div key={it.id} style={{background:C.card2,border:'1px solid '+C.border,borderRadius:10,padding:'9px 10px',marginBottom:6}}>
                    <div style={{fontSize:11,fontWeight:600,color:C.text,lineHeight:1.35,marginBottom:7,fontFamily:F}}>{it.title}</div>
                    {nextStage ? (
                      <button onClick={function(){ moveItem(it.id, nextStage); }}
                        style={{width:'100%',background:'none',cursor:'pointer',border:'1px solid '+(nextStage===doneStage?C.green:C.amber),borderRadius:8,padding:'5px 0',fontSize:9,fontWeight:700,color:nextStage===doneStage?C.green:C.amber,letterSpacing:'0.04em',fontFamily:F}}>
                        {nextStage===doneStage?'FILE  +'+(goal.xpPer||200)+' XP':'Move to '+nextStage}
                      </button>
                    ) : (
                      <div style={{fontSize:9,fontWeight:700,color:C.green,textAlign:'center',fontFamily:F}}>{doneStage}</div>
                    )}
                  </div>
                );
              })}
              {byStage.length===0 && <div style={{fontSize:10,color:C.t3,textAlign:'center',padding:'12px 0',fontFamily:F}}>—</div>}
            </div>
          );
        })}
      </div>
      {adding ? (
        <div>
          <div style={{marginBottom:8}}><Label>Title</Label><Inp value={newTitle} onChange={setNewTitle} placeholder="e.g. Dela Cruz v. BPI" /></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:12}}>
            <Btn onClick={addItem} disabled={!newTitle.trim()}>Add</Btn>
            <Btn ghost onClick={function(){ setAdding(false); setNewTitle(''); }}>Cancel</Btn>
          </div>
        </div>
      ) : (
        <button onClick={function(){ setAdding(true); }}
          style={{width:'100%',background:'none',border:'1px dashed '+C.borderMid,borderRadius:14,padding:'14px',fontSize:13,fontWeight:700,color:C.t2,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8,fontFamily:F}}>
          <Plus size={16} color={C.pink} /> Add Item
        </button>
      )}
    </Sheet>
  );
}

function EventLogGoalModal({ goal, onSave, onClose, gain }) {
  const d = goal.data;
  const [title, setTitle] = useState('');
  const now = new Date();
  const entries = d.entries||[];
  const periodEntries = entries.filter(function(e){
    if (goal.period==='monthly') return new Date(e.ts).getMonth()===now.getMonth();
    if (goal.period==='annual') return new Date(e.ts).getFullYear()===now.getFullYear();
    const wAgo = Date.now()-7*24*60*60*1000;
    return e.ts > wAgo;
  });
  const done = periodEntries.length >= goal.target;

  function addEntry() {
    if (!title.trim()) return;
    const entry = {id:Date.now(),title:title.trim(),ts:Date.now(),date:now.toLocaleDateString('en-US',{month:'long',year:'numeric'})};
    const updated = entries.concat([entry]);
    onSave(goal.id, Object.assign({},d,{entries:updated}));
    gain(goal.xpPer||150, goal.label+' logged  +'+(goal.xpPer||150)+' XP');
    setTitle('');
    onClose();
  }

  return (
    <Sheet onClose={onClose} title={goal.label}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <span style={{fontSize:12,fontWeight:500,color:C.t2,fontFamily:F}}>{goal.period.charAt(0).toUpperCase()+goal.period.slice(1)+' target: '+goal.target}</span>
        <Pill color={done?C.green:C.amber}>{done?'COMPLETE':periodEntries.length+'/'+goal.target}</Pill>
      </div>
      {periodEntries.map(function(e){
        return (
          <div key={e.id} style={{background:C.card2,border:'1px solid '+goal.color+'25',borderRadius:12,padding:'12px 14px',marginBottom:10,display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:36,height:36,borderRadius:10,background:goal.color+'15',border:'1px solid '+goal.color+'25',display:'flex',alignItems:'center',justifyContent:'center'}}>
              {React.createElement(getIconById(goal.iconId),{size:16,color:goal.color})}
            </div>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:C.text,fontFamily:F}}>{e.title}</div>
              <div style={{fontSize:11,color:C.t2,fontFamily:F,marginTop:2}}>{e.date}</div>
            </div>
          </div>
        );
      })}
      <div style={{marginBottom:16}}><Label>Event name</Label><Inp value={title} onChange={setTitle} placeholder={'e.g. '+goal.unit} /></div>
      <Btn onClick={addEntry} disabled={!title.trim()}>{'Log Entry  +'+(goal.xpPer||150)+' XP'}</Btn>
    </Sheet>
  );
}

function CounterGoalModal({ goal, onSave, onClose, gain }) {
  const d = goal.data;
  const count = d.count||0;
  const done = count >= goal.target;

  function increment() {
    onSave(goal.id, Object.assign({},d,{count:count+1}));
    gain(goal.xpPer||50, goal.label+'  +'+(goal.xpPer||50)+' XP');
    onClose();
  }

  return (
    <Sheet onClose={onClose} title={goal.label}>
      <div style={{textAlign:'center',padding:'20px 0 30px'}}>
        <div style={{fontSize:72,fontWeight:900,color:done?C.green:goal.color,fontFamily:F,lineHeight:1}}>{count}</div>
        <div style={{fontSize:14,color:C.t2,marginTop:8,fontFamily:F}}>{'/ '+goal.target+' '+goal.unit+' this '+goal.period}</div>
        {done && <div style={{marginTop:12,fontSize:13,fontWeight:700,color:C.green,fontFamily:F}}>Target reached!</div>}
      </div>
      <Btn onClick={increment}>{'Log One  +'+(goal.xpPer||50)+' XP'}</Btn>
    </Sheet>
  );
}

function GoalModal({ goal, onSave, onClose, gain }) {
  if (!goal) return null;
  const props = {goal, onSave, onClose, gain};
  if (goal.type==='progress')  return <ProgressGoalModal  {...props} />;
  if (goal.type==='taskboard') return <TaskBoardGoalModal {...props} />;
  if (goal.type==='eventlog')  return <EventLogGoalModal  {...props} />;
  if (goal.type==='counter')   return <CounterGoalModal   {...props} />;
  return null;
}

// ── Wildcard Modal ────────────────────────────────────────────
function WildcardModal({ onLog, onClose, rings }) {
  const [name,  setName]  = useState('');
  const [track, setTrack] = useState('just_vibes');
  const [dur,   setDur]   = useState(45);
  const [dist,  setDist]  = useState('');
  const [unit,  setUnit]  = useState('km');
  const [res,   setRes]   = useState('win');
  const [score, setScore] = useState('');
  const [inten, setInten] = useState(7);
  const [notes, setNotes] = useState('');
  const noteRef = useRef();

  function pick(r) {
    setName(r.label);
    setTrack(r.trackType||'just_vibes');
  }

  function handleNotes(e) {
    setNotes(e.target.value);
    if (noteRef.current) {
      noteRef.current.style.height = 'auto';
      noteRef.current.style.height = noteRef.current.scrollHeight + 'px';
    }
  }

  const xp = calcXP(name, track, dur, dist, res, inten, notes);

  const tbLabel = (function(){
    if (track === 'time_distance') { const d = parseFloat(dist)||0; return d>0 ? d+unit+' distance' : ''; }
    if (track === 'score_performance') return res==='win' ? 'Win bonus' : res==='draw' ? 'Draw bonus' : '';
    return 'Intensity '+inten+'/10';
  })();

  const xpRows = [
    {l:'Activity base', v:xp.base},
    xp.db > 0 ? {l:dur+' min session', v:xp.db} : null,
    (xp.tb !== 0 && tbLabel) ? {l:tbLabel, v:xp.tb} : null,
    xp.nb > 0 ? {l:'Field notes', v:xp.nb} : null,
  ].filter(Boolean);

  const ic = inten<=3 ? C.cyan : inten<=6 ? C.amber : inten<=8 ? C.pink : C.red;
  const il = inten<=3 ? 'Easy' : inten<=6 ? 'Moderate' : inten<=8 ? 'Hard' : 'Max';

  function commit() {
    if (!name.trim()) return;
    onLog({
      id:Date.now(), name:name.trim(), type:track, duration:dur,
      distance:track==='time_distance'?dist:null, distUnit:track==='time_distance'?unit:null,
      result:track==='score_performance'?res:null, score:track==='score_performance'?score:null,
      intensity:track==='just_vibes'?inten:null,
      notes:notes, xp:xp.total, timestamp:Date.now(),
    });
  }

  return (
    <Sheet onClose={onClose} title="Log Activity" tall>
      <div style={{marginBottom:14}}>
        <Label>What did you do?</Label>
        <Inp value={name} onChange={function(v){ setName(v); }} placeholder="e.g. Sparring, Run, HIIT..." />
      </div>
      {/* Quick picks from dynamic rings */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:6,marginBottom:4}}>
        {rings.slice(0,8).map(function(r){
          const Icon = getIconById(r.iconId);
          const sel = name === r.label;
          return (
            <button key={r.id} onClick={function(){ pick(r); }}
              style={{background:sel?C.pinkBg:C.card2,border:'1px solid '+(sel?C.pink:C.border),borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:5,cursor:'pointer',transition:'all 0.15s'}}>
              <Icon size={18} color={sel ? C.pink : C.t2} />
              <span style={{fontSize:9,fontWeight:700,color:sel?C.pink:C.t2,fontFamily:F,textAlign:'center',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'100%'}}>{r.label}</span>
            </button>
          );
        })}
      </div>
      <Hr />
      <div style={{marginBottom:16}}>
        <Label>Tracking type</Label>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6}}>
          {TTYPES.map(function(t){
            const Icon = t.Icon;
            const sel = track === t.id;
            return (
              <button key={t.id} onClick={function(){ setTrack(t.id); }}
                style={{background:sel?C.pinkBg:C.card2,border:'1px solid '+(sel?C.pink:C.border),borderRadius:12,padding:'12px 6px',display:'flex',flexDirection:'column',alignItems:'center',gap:6,cursor:'pointer',transition:'all 0.15s'}}>
                <Icon size={20} color={sel ? C.pink : C.t2} />
                <span style={{fontSize:9,fontWeight:700,color:sel?C.pink:C.t2,fontFamily:F,textAlign:'center',lineHeight:1.3}}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{marginBottom:16}}>
        <Label>Duration</Label>
        <div style={{display:'flex',gap:5,marginBottom:10}}>
          {[20,30,45,60,90].map(function(d){
            return (
              <button key={d} onClick={function(){ setDur(d); }}
                style={{flex:1,padding:'8px 0',borderRadius:10,fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:F,background:dur===d?C.pinkBg:C.card2,border:'1px solid '+(dur===d?C.pink:C.border),color:dur===d?C.pink:C.t2,transition:'all 0.15s'}}>
                {d+"'"}
              </button>
            );
          })}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button onClick={function(){ setDur(function(d){ return Math.max(5,d-5); }); }} style={{width:38,height:38,borderRadius:10,background:C.card2,border:'1px solid '+C.border,color:C.text,fontSize:18,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:F}}>−</button>
          <div style={{flex:1,textAlign:'center',fontSize:18,fontWeight:800,fontFamily:F}}>{dur+' min'}</div>
          <button onClick={function(){ setDur(function(d){ return Math.min(180,d+5); }); }} style={{width:38,height:38,borderRadius:10,background:C.card2,border:'1px solid '+C.border,color:C.text,fontSize:18,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:F}}>+</button>
        </div>
      </div>
      {track === 'time_distance' && (
        <div style={{marginBottom:16}}>
          <Label>Distance</Label>
          <div style={{display:'flex',gap:8}}>
            <div style={{flex:1}}><Inp type="number" value={dist} onChange={setDist} placeholder="0.0" /></div>
            {['km','m'].map(function(u){
              return (
                <button key={u} onClick={function(){ setUnit(u); }}
                  style={{padding:'0 16px',borderRadius:12,fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:F,background:unit===u?C.pinkBg:C.card2,border:'1px solid '+(unit===u?C.pink:C.border),color:unit===u?C.pink:C.t2}}>
                  {u}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {track === 'score_performance' && (
        <div style={{marginBottom:16}}>
          <Label>Result</Label>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6,marginBottom:12}}>
            {[{v:'win',l:'Win',c:C.green},{v:'loss',l:'Loss',c:C.red},{v:'draw',l:'Draw',c:C.amber}].map(function(r){
              return (
                <button key={r.v} onClick={function(){ setRes(r.v); }}
                  style={{padding:'11px 0',borderRadius:10,fontSize:13,fontWeight:700,cursor:'pointer',transition:'all 0.15s',fontFamily:F,background:res===r.v?r.c+'18':C.card2,border:'1px solid '+(res===r.v?r.c:C.border),color:res===r.v?r.c:C.t2}}>
                  {r.l}
                </button>
              );
            })}
          </div>
          <Label>Score (optional)</Label>
          <Inp value={score} onChange={setScore} placeholder="e.g. by submission, 3-0" />
        </div>
      )}
      {track === 'just_vibes' && (
        <div style={{marginBottom:16}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <Label>Intensity</Label>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontSize:14,fontWeight:800,color:ic,fontFamily:F}}>{inten+'/10'}</span>
              <span style={{fontSize:11,color:C.t2,fontFamily:F}}>{il}</span>
            </div>
          </div>
          <input type="range" min={1} max={10} value={inten} onChange={function(e){ setInten(Number(e.target.value)); }}
            style={{width:'100%',accentColor:ic,cursor:'pointer',margin:'4px 0 10px'}} />
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:4}}>
            {[{r:[1,2,3],l:'Easy',c:C.cyan},{r:[4,5,6],l:'Moderate',c:C.amber},{r:[7,8],l:'Hard',c:C.pink},{r:[9,10],l:'Max',c:C.red}].map(function(t){
              const active = t.r.includes(inten);
              return (
                <button key={t.l} onClick={function(){ setInten(t.r[0]); }}
                  style={{padding:'7px 0',borderRadius:10,fontSize:9,fontWeight:700,cursor:'pointer',fontFamily:F,background:active?t.c+'18':C.card2,border:'1px solid '+(active?t.c:C.border),color:active?t.c:C.t2}}>
                  {t.l}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <Hr />
      <div style={{marginBottom:16}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
          <Label>Field Notes</Label>
          {notes.length > 10 && <Pill color={C.green}>+10 XP</Pill>}
        </div>
        <textarea ref={noteRef} value={notes} onChange={handleNotes}
          placeholder="How did it feel? Any gear, techniques, or insights to remember..."
          style={{width:'100%',boxSizing:'border-box',background:C.card2,border:'1px solid '+C.border,borderRadius:12,padding:'13px 15px',fontSize:13,color:C.text,fontFamily:F,fontWeight:500,outline:'none',resize:'none',minHeight:80,lineHeight:1.7,transition:'border-color 0.2s'}}
          onFocus={function(e){ e.target.style.borderColor=C.pink; }}
          onBlur={function(e){ e.target.style.borderColor=C.border; }} />
      </div>
      <div style={{background:C.pinkBg,border:'1px solid '+C.pink+'25',borderRadius:16,padding:16,marginBottom:18}}>
        <Label>XP Preview</Label>
        {xpRows.map(function(item, i){
          return (
            <div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:12,fontWeight:500,marginBottom:6,fontFamily:F}}>
              <span style={{color:C.t2}}>{item.l}</span>
              <span style={{fontWeight:700,color:item.v>0?C.text:C.red}}>{(item.v>0?'+':'')+item.v+' XP'}</span>
            </div>
          );
        })}
        <div style={{height:1,background:C.pink+'20',margin:'10px 0'}} />
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{fontSize:13,fontWeight:700,fontFamily:F}}>Session total</span>
          <span style={{fontSize:30,fontWeight:900,color:C.pink,fontFamily:F}}>{'+'+xp.total}</span>
        </div>
      </div>
      <Btn onClick={commit} disabled={!name.trim()}>{'COMMIT SESSION  +'+xp.total+' XP'}</Btn>
    </Sheet>
  );
}

// ── Goal metric helpers ───────────────────────────────────────
function goalMetric(g) {
  const d = g.data;
  const now = new Date();
  if (g.type==='progress') {
    const cur = d.current||d.page||0;
    const tot = d.total||100;
    return {metric:cur+'/'+tot, pct:Math.round((cur/tot)*100), done:d.completed||cur>=tot};
  }
  if (g.type==='taskboard') {
    const stages = d.stages||['Open','Active','Done'];
    const doneStage = stages[stages.length-1];
    const doneCount = (d.items||[]).filter(function(it){ return it.stage===doneStage; }).length;
    return {metric:doneCount+'/'+g.target, pct:null, done:doneCount>=g.target};
  }
  if (g.type==='eventlog') {
    const entries = d.entries||[];
    const periodEntries = entries.filter(function(e){
      if (g.period==='monthly') return new Date(e.ts).getMonth()===now.getMonth() && new Date(e.ts).getFullYear()===now.getFullYear();
      if (g.period==='annual') return new Date(e.ts).getFullYear()===now.getFullYear();
      return e.ts > Date.now()-7*24*60*60*1000;
    });
    return {metric:periodEntries.length+'/'+g.target, pct:null, done:periodEntries.length>=g.target};
  }
  if (g.type==='counter') {
    const c = d.count||0;
    return {metric:c+'/'+g.target, pct:null, done:c>=g.target};
  }
  return {metric:'—', pct:null, done:false};
}

// ── Home Screen ───────────────────────────────────────────────
function HomeScreen({ rings, goals, streak, sessions, onRingTap, openModal, openGoalModal, openManageRings, openManageGoals }) {
  const filed   = (function(){
    const g = goals.find(function(g){ return g.id==='law'; });
    if (!g) return 0;
    const stages = g.data.stages||['Open','Active','Done'];
    const doneStage = stages[stages.length-1];
    return (g.data.items||[]).filter(function(it){ return it.stage===doneStage; }).length;
  })();
  const dateStr = new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
  return (
    <div>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:12,fontWeight:600,color:C.t2,fontFamily:F,marginBottom:6}}>{dateStr}</div>
        <div style={{fontSize:26,fontWeight:900,letterSpacing:'-0.03em',lineHeight:1.15,fontFamily:F}}>
          {getGreeting()} <span style={{color:C.pink}}>Feri.</span>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:12}}>
        {[
          {l:'RINGS DONE', v:rings.filter(function(r){ return r.done>=r.target; }).length+'/'+rings.length, c:C.pink},
          {l:'PLEADINGS',  v:filed+'/'+((goals.find(function(g){ return g.id==='law'; })||{target:2}).target), c:C.amber},
          {l:'SESSIONS',   v:String(sessions.length), c:C.cyan},
        ].map(function(s){
          return (
            <div key={s.l} style={{background:C.card,border:'1px solid '+C.border,borderRadius:16,padding:'13px 14px',boxShadow:'inset 0 1px 0 rgba(255,255,255,0.04)'}}>
              <div style={{fontSize:8.5,fontWeight:800,color:C.t2,letterSpacing:'0.10em',marginBottom:7,fontFamily:F}}>{s.l}</div>
              <div style={{fontSize:23,fontWeight:900,color:s.c,fontFamily:F,lineHeight:1}}>{s.v}</div>
            </div>
          );
        })}
      </div>
      <FlameCard streak={streak} />
      {/* Weekly Movement Rings */}
      <div style={{background:C.card,borderRadius:20,border:'1px solid '+C.border,padding:'18px 18px',marginBottom:12,boxShadow:'inset 0 1px 0 rgba(255,255,255,0.04)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
          <div><Label>Weekly Movement</Label><div style={{fontSize:15,fontWeight:700,color:C.text,fontFamily:F}}>Core non-negotiables</div></div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <Pill color={C.pink}>THIS WEEK</Pill>
            <button onClick={openManageRings} className="gear-btn" style={{background:'none',border:'1px solid '+C.border,borderRadius:10,padding:'7px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',minWidth:32,minHeight:32}}>
              <Settings size={14} color={C.t2} />
            </button>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat('+Math.min(rings.length,4)+',1fr)',gap:4}}>
          {rings.map(function(r, i){
            const Icon = getIconById(r.iconId);
            return <div key={r.id} onClick={function(){ onRingTap(i); }} className="ring-cell"><Ring done={r.done} target={r.target} color={r.color} Icon={Icon} label={r.label} /></div>;
          })}
        </div>
        {rings.length === 0 && (
          <div style={{textAlign:'center',padding:'20px 0',color:C.t3,fontSize:12,fontFamily:F}}>No activities yet — tap the gear to add one.</div>
        )}
        <div style={{marginTop:12,paddingTop:10,borderTop:'1px solid '+C.border,fontSize:9,fontWeight:600,color:C.t3,textAlign:'center',letterSpacing:'0.05em',fontFamily:F}}>TAP RING TO LOG SESSION</div>
      </div>
      {/* Hustle Block */}
      <div style={{background:C.card,borderRadius:20,border:'1px solid '+C.border,padding:'18px 18px',marginBottom:12,boxShadow:'inset 0 1px 0 rgba(255,255,255,0.04)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
          <div><Label>The Hustle Block</Label><div style={{fontSize:15,fontWeight:700,color:C.text,fontFamily:F,marginBottom:10}}>Professional targets</div></div>
          <button onClick={openManageGoals} style={{background:'none',border:'1px solid '+C.border,borderRadius:10,padding:'6px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:10}}>
            <Settings size={14} color={C.t2} />
          </button>
        </div>
        {goals.map(function(g, i){
          const Icon = getIconById(g.iconId);
          const {metric, pct, done} = goalMetric(g);
          const badge = done ? {l:'DONE',c:C.green} : {l:g.period.toUpperCase(),c:g.period==='annual'?C.purple:g.period==='monthly'?C.amber:C.cyan};
          return (
            <HustleRow key={g.id}
              Icon={Icon} label={g.label}
              subtitle={g.period.charAt(0).toUpperCase()+g.period.slice(1)+' · '+g.unit}
              metric={metric} badge={badge} prog={pct} last={i===goals.length-1}
              color={g.color}
              onClick={function(){ openGoalModal(g.id); }}
            />
          );
        })}
        {goals.length === 0 && (
          <div style={{textAlign:'center',padding:'20px 0',color:C.t3,fontSize:12,fontFamily:F}}>No goals yet — tap the gear to add one.</div>
        )}
      </div>
      {sessions.length > 0 && (
        <div style={{background:C.card,borderRadius:20,border:'1px solid '+C.border,padding:'18px 18px',marginBottom:12}}>
          <Label>Recent Sessions</Label>
          <div style={{fontSize:15,fontWeight:700,color:C.text,fontFamily:F,marginBottom:14}}>Activity history</div>
          {sessions.slice(0,5).map(function(s, i){
            return <SessionRow key={s.id} session={s} last={i===Math.min(sessions.length,5)-1} />;
          })}
          {sessions.length > 5 && <div style={{textAlign:'center',fontSize:11,color:C.t3,marginTop:8,fontFamily:F}}>{'+'+(sessions.length-5)+' more sessions'}</div>}
        </div>
      )}
    </div>
  );
}

// ── Badge evaluation ──────────────────────────────────────────
function evalBadge(badge, ctx) {
  var s = ctx.sessions, g = ctx.goals, st = ctx.streak, r = ctx.rings;
  switch(badge.autoKey) {
    case 'bjj':        return s.some(function(x){ var l=x.name.toLowerCase(); return l.includes('jiu')||l.includes('bjj'); });
    case 'streak3':    return st >= 3;
    case 'sessions10': return s.length >= 10;
    case 'sessions25': return s.length >= 25;
    case 'allRings':   return r.length > 0 && r.every(function(x){ return x.done >= x.target; });
    case 'muaythai5':  return s.filter(function(x){ var l=x.name.toLowerCase(); return l.includes('muay')||l.includes('boxing'); }).length >= 5;
    case 'bookDone': {
      var bg = g.find(function(x){ return x.id==='book'; });
      return bg ? (bg.data.completed || (bg.data.current||bg.data.page||0) >= (bg.data.total||1)) : false;
    }
    case 'filed10': {
      var lg = g.find(function(x){ return x.id==='law'; });
      if (!lg) return false;
      var ds = (lg.data.stages||['Open','Active','Done']);
      return (lg.data.items||[]).filter(function(x){ return x.stage===ds[ds.length-1]; }).length >= 10;
    }
    case 'speaking2': {
      var spg = g.find(function(x){ return x.id==='speaking'; });
      return spg ? (spg.data.entries||[]).length >= 2 : false;
    }
    case 'seminar3': {
      var smg = g.find(function(x){ return x.id==='seminars'; });
      return smg ? (smg.data.entries||[]).length >= 3 : false;
    }
    case 'doubleGold': {
      var dlg = g.find(function(x){ return x.id==='law'; });
      if (!dlg) return false;
      var dds = (dlg.data.stages||['Open','Active','Done']);
      var filed = (dlg.data.items||[]).filter(function(x){ return x.stage===dds[dds.length-1]; }).length;
      return r.length > 0 && r.every(function(x){ return x.done>=x.target; }) && filed >= 2;
    }
    default: return badge.manualUnlocked;
  }
}

function badgeProg(badge, ctx) {
  var s = ctx.sessions, g = ctx.goals, st = ctx.streak, r = ctx.rings;
  switch(badge.autoKey) {
    case 'streak3':    return Math.min(Math.round((st/3)*100), 100);
    case 'sessions10': return Math.min(Math.round((s.length/10)*100), 100);
    case 'sessions25': return Math.min(Math.round((s.length/25)*100), 100);
    case 'allRings':   return r.length===0?0:Math.round((r.filter(function(x){ return x.done>=x.target; }).length/r.length)*100);
    case 'muaythai5': {
      var cnt = s.filter(function(x){ var l=x.name.toLowerCase(); return l.includes('muay')||l.includes('boxing'); }).length;
      return Math.min(Math.round((cnt/5)*100), 100);
    }
    case 'bookDone': {
      var bg = g.find(function(x){ return x.id==='book'; });
      if (!bg) return 0;
      return Math.min(Math.round(((bg.data.current||bg.data.page||0)/(bg.data.total||1))*100), 100);
    }
    case 'filed10': {
      var lg = g.find(function(x){ return x.id==='law'; });
      if (!lg) return 0;
      var ds = (lg.data.stages||['Open','Active','Done']);
      return Math.min(Math.round(((lg.data.items||[]).filter(function(x){ return x.stage===ds[ds.length-1]; }).length/10)*100), 100);
    }
    case 'speaking2': {
      var spg = g.find(function(x){ return x.id==='speaking'; });
      return spg ? Math.min(Math.round(((spg.data.entries||[]).length/2)*100), 100) : 0;
    }
    case 'seminar3': {
      var smg = g.find(function(x){ return x.id==='seminars'; });
      return smg ? Math.min(Math.round(((smg.data.entries||[]).length/3)*100), 100) : 0;
    }
    default: return 0;
  }
}

// ── Manage Badges Sheet ───────────────────────────────────────
function ManageBadgesSheet({ badges, onClose, onAdd, onEdit, onToggle, onRemove }) {
  const [view,    setView]    = useState('list'); // 'list' | 'add' | 'edit'
  const [editing, setEditing] = useState(null);
  const [fName,   setFName]   = useState('');
  const [fDesc,   setFDesc]   = useState('');
  const [fIcon,   setFIcon]   = useState('Star');
  const [fRar,    setFRar]    = useState('common');

  function openAdd() { setFName(''); setFDesc(''); setFIcon('Star'); setFRar('common'); setView('add'); }
  function openEdit(b) {
    setEditing(b); setFName(b.n); setFDesc(b.d); setFIcon(b.iconId); setFRar(b.rarity); setView('edit');
  }
  function commitAdd() {
    if (!fName.trim()) return;
    onAdd({ id:'badge_'+Date.now(), iconId:fIcon, n:fName.trim(), d:fDesc.trim()||'Custom achievement', rarity:fRar, autoKey:null, manualUnlocked:false, earnedDate:null, custom:true, cat:'Custom' });
    setView('list');
  }
  function commitEdit() {
    if (!fName.trim() || !editing) return;
    onEdit(editing.id, { iconId:fIcon, n:fName.trim(), d:fDesc.trim(), rarity:fRar });
    setView('list');
  }

  const titleMap = {list:'Manage Trophies', add:'Add Trophy', edit:'Edit Trophy'};

  function BadgeForm({ onSave, saveLabel }) {
    return (
      <div>
        <div style={{marginBottom:14}}><Label>Trophy name</Label><Inp value={fName} onChange={setFName} placeholder="e.g. First Marathon" /></div>
        <div style={{marginBottom:14}}><Label>Description</Label><Inp value={fDesc} onChange={setFDesc} placeholder="What did you accomplish?" /></div>
        <div style={{marginBottom:14}}><Label>Icon</Label><IconPicker value={fIcon} onChange={setFIcon} /></div>
        <div style={{marginBottom:20}}>
          <Label>Rarity</Label>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:6}}>
            {Object.entries(RARITY).map(function(e){
              var key=e[0], rc=e[1], sel=fRar===key;
              return (
                <button key={key} onClick={function(){ setFRar(key); }}
                  style={{padding:'9px 0',borderRadius:10,fontSize:9,fontWeight:800,cursor:'pointer',fontFamily:F,letterSpacing:'0.04em',background:sel?rc.color+'18':C.card2,border:'1px solid '+(sel?rc.color+'50':C.border),color:sel?rc.color:C.t2}}>
                  {rc.label}
                </button>
              );
            })}
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          <Btn onClick={onSave} disabled={!fName.trim()}>{saveLabel}</Btn>
          <Btn ghost onClick={function(){ setView('list'); }}>Cancel</Btn>
        </div>
      </div>
    );
  }

  return (
    <Sheet onClose={onClose} title={titleMap[view]} tall zIndex={110}>
      {view === 'list' && (
        <div>
          {['Athletic','Professional','Legendary','Custom'].map(function(cat){
            var catBadges = badges.filter(function(b){ return b.cat===cat; });
            if (catBadges.length === 0) return null;
            return (
              <div key={cat} style={{marginBottom:20}}>
                <div style={{fontSize:9.5,fontWeight:800,color:C.t2,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:10,fontFamily:F}}>{cat}</div>
                {catBadges.map(function(b){
                  const Icon = getIconById(b.iconId);
                  const rc = RARITY[b.rarity];
                  return (
                    <div key={b.id} style={{display:'flex',alignItems:'center',gap:10,padding:'11px 0',borderBottom:'1px solid '+C.border}}>
                      <div style={{width:40,height:40,borderRadius:12,background:rc.color+'15',border:'1px solid '+rc.color+'30',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                        <Icon size={18} color={rc.color} />
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:700,color:C.text,fontFamily:F,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{b.n}</div>
                        <div style={{fontSize:10,color:C.t2,fontFamily:F,marginTop:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{b.d}</div>
                      </div>
                      <div style={{display:'flex',gap:6,flexShrink:0,alignItems:'center'}}>
                        {b.custom && (
                          <button onClick={function(){ onToggle(b.id); }}
                            style={{background:b.manualUnlocked?C.green+'18':'none',border:'1px solid '+(b.manualUnlocked?C.green+'40':C.border),borderRadius:8,padding:'5px 8px',fontSize:9,fontWeight:700,color:b.manualUnlocked?C.green:C.t2,cursor:'pointer',fontFamily:F,whiteSpace:'nowrap'}}>
                            {b.manualUnlocked?'EARNED':'MARK'}
                          </button>
                        )}
                        <button onClick={function(){ openEdit(b); }}
                          style={{background:'none',border:'1px solid '+C.border,borderRadius:8,padding:'5px 8px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
                          <Edit3 size={13} color={C.t2} />
                        </button>
                        <button onClick={function(){ onRemove(b.id); }}
                          style={{background:'none',border:'1px solid '+C.red+'30',borderRadius:8,padding:'5px 8px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
                          <Trash2 size={13} color={C.red} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
          <button onClick={openAdd}
            style={{width:'100%',background:'none',border:'1px dashed '+C.borderMid,borderRadius:14,padding:'14px',fontSize:13,fontWeight:700,color:C.t2,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8,fontFamily:F,marginTop:4}}>
            <Plus size={16} color={C.pink} /> Add Trophy
          </button>
        </div>
      )}
      {view === 'add'  && <BadgeForm onSave={commitAdd} saveLabel="Add Trophy" />}
      {view === 'edit' && <BadgeForm onSave={commitEdit} saveLabel="Save Changes" />}
    </Sheet>
  );
}

// ── Manage Rewards Sheet ──────────────────────────────────────
function ManageRewardsSheet({ rewards, onClose, onAdd, onEdit, onRemove }) {
  const [view,    setView]    = useState('list'); // 'list' | 'add' | 'edit'
  const [editing, setEditing] = useState(null);
  const [fName,   setFName]   = useState('');
  const [fDesc,   setFDesc]   = useState('');
  const [fIcon,   setFIcon]   = useState('Star');
  const [fTier,   setFTier]   = useState(1);
  const [fCost,   setFCost]   = useState('500');
  const tc = {1:C.green, 2:C.cyan, 3:C.pink};
  const tl = {1:'Tier 1 · Micro', 2:'Tier 2 · Mid', 3:'Tier 3 · Macro'};

  function openAdd() { setFName(''); setFDesc(''); setFIcon('Star'); setFTier(1); setFCost('500'); setView('add'); }
  function openEdit(r) {
    setEditing(r); setFName(r.n); setFDesc(r.desc||''); setFIcon(r.iconId); setFTier(r.t); setFCost(String(r.cost)); setView('edit');
  }
  function commitAdd() {
    if (!fName.trim()) return;
    onAdd({ id:'reward_'+Date.now(), iconId:fIcon, n:fName.trim(), desc:fDesc.trim()||'A custom reward.', t:fTier, cost:Math.max(1,parseInt(fCost)||500), custom:true });
    setView('list');
  }
  function commitEdit() {
    if (!fName.trim() || !editing) return;
    onEdit(editing.id, { iconId:fIcon, n:fName.trim(), desc:fDesc.trim(), t:fTier, cost:Math.max(1,parseInt(fCost)||500) });
    setView('list');
  }

  const titleMap = {list:'Manage Rewards', add:'Add Reward', edit:'Edit Reward'};

  function RewardForm({ onSave, saveLabel }) {
    return (
      <div>
        <div style={{marginBottom:14}}><Label>Reward name</Label><Inp value={fName} onChange={setFName} placeholder="e.g. New Running Shoes" /></div>
        <div style={{marginBottom:14}}><Label>Description</Label><Inp value={fDesc} onChange={setFDesc} placeholder="What is this reward?" /></div>
        <div style={{marginBottom:14}}><Label>Icon</Label><IconPicker value={fIcon} onChange={setFIcon} /></div>
        <div style={{marginBottom:14}}>
          <Label>Tier</Label>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6}}>
            {[1,2,3].map(function(t){
              var sel=fTier===t;
              return (
                <button key={t} onClick={function(){ setFTier(t); }}
                  style={{padding:'10px 0',borderRadius:10,fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:F,background:sel?tc[t]+'18':C.card2,border:'1px solid '+(sel?tc[t]+'50':C.border),color:sel?tc[t]:C.t2}}>
                  {tl[t]}
                </button>
              );
            })}
          </div>
        </div>
        <div style={{marginBottom:20}}><Label>XP cost</Label><Inp type="number" value={fCost} onChange={setFCost} placeholder="500" /></div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          <Btn onClick={onSave} disabled={!fName.trim()}>{saveLabel}</Btn>
          <Btn ghost onClick={function(){ setView('list'); }}>Cancel</Btn>
        </div>
      </div>
    );
  }

  return (
    <Sheet onClose={onClose} title={titleMap[view]} tall zIndex={110}>
      {view === 'list' && (
        <div>
          {[1,2,3].map(function(tier){
            var tierRewards = rewards.filter(function(r){ return r.t===tier; });
            if (tierRewards.length === 0) return null;
            return (
              <div key={tier} style={{marginBottom:20}}>
                <div style={{fontSize:9.5,fontWeight:800,color:tc[tier],letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:10,fontFamily:F}}>{tl[tier]}</div>
                {tierRewards.map(function(r){
                  const Icon = getIconById(r.iconId);
                  return (
                    <div key={r.id} style={{display:'flex',alignItems:'center',gap:10,padding:'11px 0',borderBottom:'1px solid '+C.border}}>
                      <div style={{width:40,height:40,borderRadius:12,background:tc[r.t]+'15',border:'1px solid '+tc[r.t]+'25',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                        <Icon size={18} color={tc[r.t]} />
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:700,color:C.text,fontFamily:F,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.n}</div>
                        <div style={{fontSize:10,color:C.t2,fontFamily:F,marginTop:1}}>{r.cost.toLocaleString()+' XP'}</div>
                      </div>
                      <div style={{display:'flex',gap:6,flexShrink:0}}>
                        <button onClick={function(){ openEdit(r); }}
                          style={{background:'none',border:'1px solid '+C.border,borderRadius:8,padding:'5px 8px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
                          <Edit3 size={13} color={C.t2} />
                        </button>
                        <button onClick={function(){ onRemove(r.id); }}
                          style={{background:'none',border:'1px solid '+C.red+'30',borderRadius:8,padding:'5px 8px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
                          <Trash2 size={13} color={C.red} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
          <button onClick={openAdd}
            style={{width:'100%',background:'none',border:'1px dashed '+C.borderMid,borderRadius:14,padding:'14px',fontSize:13,fontWeight:700,color:C.t2,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8,fontFamily:F,marginTop:4}}>
            <Plus size={16} color={C.pink} /> Add Reward
          </button>
        </div>
      )}
      {view === 'add'  && <RewardForm onSave={commitAdd} saveLabel="Add Reward" />}
      {view === 'edit' && <RewardForm onSave={commitEdit} saveLabel="Save Changes" />}
    </Sheet>
  );
}

// ── Vault & Exchange ──────────────────────────────────────────
function VaultScreen({ goals, sessions, streak, rings, badges, onManage, onToggle }) {
  const ctx = {sessions, goals, streak, rings};
  const evaluated = badges.map(function(b){
    const unlocked = evalBadge(b, ctx);
    const prog = unlocked ? 100 : badgeProg(b, ctx);
    return Object.assign({}, b, {unlocked, prog});
  });
  const earned = evaluated.filter(function(b){ return b.unlocked; }).length;
  const cats = ['Athletic','Professional','Legendary','Custom'];

  return (
    <div style={{padding:'4px 0 16px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:18}}>
        <div>
          <Label>The Vault</Label>
          <div style={{fontSize:20,fontWeight:900,letterSpacing:'-0.03em',fontFamily:F,marginBottom:3}}>Trophy Room</div>
          <div style={{fontSize:11,fontWeight:500,color:C.t2,fontFamily:F}}>{earned+' earned · '+(evaluated.length-earned)+' locked'}</div>
        </div>
        <button onClick={onManage} className="gear-btn" style={{background:'none',border:'1px solid '+C.border,borderRadius:10,padding:'7px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',minWidth:32,minHeight:32,marginTop:4}}>
          <Settings size={14} color={C.t2} />
        </button>
      </div>

      {cats.map(function(cat){
        const catBadges = evaluated.filter(function(b){ return b.cat===cat; });
        if (catBadges.length === 0) return null;
        return (
          <div key={cat} style={{marginBottom:20}}>
            <div style={{fontSize:9.5,fontWeight:800,color:C.t2,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:10,fontFamily:F}}>{cat}</div>
            {catBadges.map(function(b){
              const Icon = getIconById(b.iconId);
              const rc = RARITY[b.rarity];
              return (
                <div key={b.id}
                  onClick={b.custom && !b.unlocked ? function(){ onToggle(b.id); } : undefined}
                  style={{display:'flex',alignItems:'center',gap:14,padding:'14px 16px',marginBottom:8,borderRadius:16,background:b.unlocked?rc.color+'0C':C.card,border:'1px solid '+(b.unlocked?rc.color+'35':C.border),boxShadow:b.unlocked?'0 0 24px '+rc.glow+', inset 0 1px 0 rgba(255,255,255,0.05)':'inset 0 1px 0 rgba(255,255,255,0.03)',cursor:b.custom&&!b.unlocked?'pointer':'default',transition:'all 0.2s'}}>
                  <div style={{width:46,height:46,borderRadius:14,background:b.unlocked?rc.color+'20':C.card2,border:'1px solid '+(b.unlocked?rc.color+'40':C.border),display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:b.unlocked?'0 0 12px '+rc.color+'40':'none'}}>
                    <Icon size={21} color={b.unlocked?rc.color:C.t3} />
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:3}}>
                      <div style={{fontSize:14,fontWeight:800,color:b.unlocked?C.text:C.t2,fontFamily:F}}>{b.n}</div>
                      <div style={{fontSize:8,fontWeight:800,color:rc.color,letterSpacing:'0.07em',fontFamily:F,background:rc.color+'15',border:'1px solid '+rc.color+'25',borderRadius:99,padding:'2px 7px',flexShrink:0}}>{rc.label}</div>
                    </div>
                    <div style={{fontSize:11,fontWeight:500,color:C.t2,fontFamily:F,marginBottom:b.unlocked?0:8,lineHeight:1.4}}>{b.d}</div>
                    {!b.unlocked && b.prog > 0 && (
                      <div>
                        <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                          <div style={{fontSize:9,color:C.t3,fontFamily:F}}>Progress</div>
                          <div style={{fontSize:9,fontWeight:700,color:rc.color,fontFamily:F}}>{b.prog+'%'}</div>
                        </div>
                        <div style={{height:3,background:C.border,borderRadius:99,overflow:'hidden'}}>
                          <div style={{height:'100%',borderRadius:99,width:b.prog+'%',background:rc.color,transition:'width 0.9s cubic-bezier(0.4,0,0.2,1)'}} />
                        </div>
                      </div>
                    )}
                    {!b.unlocked && b.prog === 0 && <div style={{fontSize:9,color:C.t3,fontFamily:F}}>{b.custom?'Tap to mark as earned':'Not started'}</div>}
                  </div>
                  {b.unlocked && (
                    <div style={{flexShrink:0,width:28,height:28,borderRadius:'50%',background:rc.color,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 0 12px '+rc.color+'80'}}>
                      <Check size={14} color="#000" strokeWidth={3} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function ExchangeScreen({ wallet, rewards, onManage }) {
  const [redeemed, setRedeemed] = useState([]);
  const tc = {1:C.green, 2:C.cyan, 3:C.pink};
  const tlabel = {1:'TIER 1 · MICRO', 2:'TIER 2 · MID', 3:'TIER 3 · MACRO'};

  const affordable = rewards.filter(function(r){ return wallet >= r.cost && !redeemed.includes(r.id); });
  const nextLocked = rewards.filter(function(r){ return wallet < r.cost && !redeemed.includes(r.id); }).sort(function(a,b){ return a.cost-b.cost; })[0];
  const nextProg = nextLocked ? Math.min(Math.round((wallet/nextLocked.cost)*100), 99) : 100;

  return (
    <div style={{padding:'4px 0 16px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16}}>
        <div>
          <Label>The Exchange</Label>
          <div style={{fontSize:20,fontWeight:900,letterSpacing:'-0.03em',fontFamily:F}}>Reward Store</div>
        </div>
        <button onClick={onManage} className="gear-btn" style={{background:'none',border:'1px solid '+C.border,borderRadius:10,padding:'7px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',minWidth:32,minHeight:32,marginTop:4}}>
          <Settings size={14} color={C.t2} />
        </button>
      </div>

      {/* Wallet card */}
      <div style={{background:C.card,border:'1px solid '+C.pink+'30',borderRadius:20,padding:'18px',marginBottom:16,boxShadow:'0 2px 24px rgba(255,45,120,0.06)'}}>
        <Label>Wallet Balance</Label>
        <div style={{fontSize:34,fontWeight:900,color:C.pink,fontFamily:F,marginBottom:14,display:'flex',alignItems:'baseline',gap:8}}>
          {wallet.toLocaleString()} <span style={{fontSize:14,fontWeight:500,color:C.t2}}>XP</span>
        </div>
        {nextLocked && (
          <div style={{marginBottom:14}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
              <div style={{fontSize:11,color:C.t2,fontFamily:F}}>Next: <span style={{color:C.text,fontWeight:700}}>{nextLocked.n}</span></div>
              <div style={{fontSize:11,fontWeight:700,color:C.pink,fontFamily:F}}>{(nextLocked.cost-wallet).toLocaleString()+' XP to go'}</div>
            </div>
            <div style={{height:4,background:C.border,borderRadius:99,overflow:'hidden'}}>
              <div style={{height:'100%',borderRadius:99,width:nextProg+'%',background:'linear-gradient(90deg,'+C.pink+','+C.purple+')',transition:'width 0.9s cubic-bezier(0.4,0,0.2,1)'}} />
            </div>
          </div>
        )}
        <div style={{borderTop:'1px solid '+C.border,paddingTop:12,display:'flex',gap:0}}>
          {[
            {l:'Unlocked', v:affordable.length+'/'+rewards.length},
            {l:'Redeemed', v:String(redeemed.length)},
          ].map(function(s,i){
            return (
              <div key={s.l} style={{flex:1,borderRight:i===0?'1px solid '+C.border:'none',paddingRight:i===0?14:0,paddingLeft:i===1?14:0}}>
                <Label>{s.l}</Label>
                <div style={{fontSize:20,fontWeight:900,color:C.text,fontFamily:F}}>{s.v}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rewards by tier */}
      {[1,2,3].map(function(tier){
        const tierRewards = rewards.filter(function(r){ return r.t===tier; });
        if (tierRewards.length === 0) return null;
        const col = tc[tier];
        return (
          <div key={tier} style={{marginBottom:16}}>
            <div style={{fontSize:9.5,fontWeight:800,color:col,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:10,fontFamily:F}}>{tlabel[tier]}</div>
            <div style={{display:'grid',gridTemplateColumns:tier===3?'1fr':'1fr 1fr',gap:10}}>
              {tierRewards.map(function(r){
                const Icon = getIconById(r.iconId);
                const can  = wallet >= r.cost;
                const done = redeemed.includes(r.id);
                const xpNeeded = r.cost - wallet;
                return (
                  <div key={r.id} style={{background:done?C.green+'08':C.card,border:'1px solid '+(done?C.green+'35':can?col+'28':C.border),borderRadius:18,padding:16,transition:'all 0.2s',boxShadow:done?'0 0 20px rgba(46,204,113,0.08)':can?'0 0 20px '+col+'08':'none'}}>
                    <div style={{display:'flex',alignItems:'flex-start',gap:12,marginBottom:done?0:12}}>
                      <div style={{width:44,height:44,borderRadius:13,background:can||done?col+'18':C.card2,border:'1px solid '+(can||done?col+'30':C.border),display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                        <Icon size={20} color={can||done?col:C.t3} />
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:800,color:done?C.green:can?C.text:C.t2,fontFamily:F,marginBottom:4}}>{r.n}</div>
                        <div style={{fontSize:10,fontWeight:500,color:C.t2,fontFamily:F,lineHeight:1.4,overflow:'hidden',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical'}}>{r.desc}</div>
                      </div>
                    </div>
                    {done ? (
                      <div style={{display:'flex',alignItems:'center',gap:6,paddingTop:10,borderTop:'1px solid '+C.green+'20'}}>
                        <Check size={14} color={C.green} />
                        <span style={{fontSize:11,fontWeight:700,color:C.green,fontFamily:F}}>Redeemed</span>
                      </div>
                    ) : can ? (
                      <button onClick={function(){ setRedeemed(function(p){ return p.concat([r.id]); }); }}
                        style={{width:'100%',border:'none',borderRadius:12,padding:'10px 0',fontSize:12,fontWeight:800,letterSpacing:'0.04em',fontFamily:F,cursor:'pointer',background:col,color:'#000',boxShadow:'0 4px 16px '+col+'55'}}>
                        {'Redeem · '+r.cost.toLocaleString()+' XP'}
                      </button>
                    ) : (
                      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <div style={{height:3,flex:1,background:C.border,borderRadius:99,overflow:'hidden',marginRight:10}}>
                          <div style={{height:'100%',borderRadius:99,width:Math.min(Math.round((wallet/r.cost)*100),100)+'%',background:col+'80',transition:'width 0.8s'}} />
                        </div>
                        <div style={{fontSize:10,fontWeight:700,color:C.t2,fontFamily:F,flexShrink:0}}>{xpNeeded.toLocaleString()+' XP'}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Finance Charts ────────────────────────────────────────────
function MultiDonut({ segments, size, strokeW, centerLabel, centerSub }) {
  var sz=size||140, sw=strokeW||14;
  var cx=sz/2, cy=sz/2, r=(sz-sw-6)/2;
  var circ=2*Math.PI*r;
  var valid=segments.filter(function(s){return s.pct>0.2;});
  var accumulated=0;
  return (
    <div style={{position:'relative',width:sz,height:sz,flexShrink:0}}>
      <svg width={sz} height={sz} style={{position:'absolute',top:0,left:0}}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.border} strokeWidth={sw} strokeOpacity={0.7} />
        {valid.map(function(seg,i){
          var dash=(seg.pct/100)*circ, gap=circ-dash;
          var offset=circ*0.25-accumulated;
          accumulated+=dash;
          return (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color}
              strokeWidth={sw} strokeLinecap="butt"
              strokeDasharray={dash+' '+gap} strokeDashoffset={offset} />
          );
        })}
      </svg>
      {(centerLabel||centerSub) && (
        <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2}}>
          {centerLabel && <div style={{fontSize:12,fontWeight:900,color:C.text,fontFamily:F,lineHeight:1,textAlign:'center'}}>{centerLabel}</div>}
          {centerSub   && <div style={{fontSize:8,fontWeight:700,color:C.t2,fontFamily:F,textTransform:'uppercase',letterSpacing:'0.05em'}}>{centerSub}</div>}
        </div>
      )}
    </div>
  );
}

function MonthlyBarChart({ data }) {
  var W=360, H=110, chartH=H-22;
  var maxVal=Math.max.apply(null,data.flatMap(function(d){return[d.income,d.expense];}));
  if(maxVal===0)maxVal=1;
  var cols=data.length, colW=W/cols, barW=(colW-10)/2;
  return (
    <div style={{width:'100%',height:110,overflow:'hidden'}}>
      <svg viewBox={'0 0 '+W+' '+H} width="100%" height="100%" preserveAspectRatio="none" style={{display:'block'}}>
        {/* Baseline */}
        <line x1={0} y1={chartH} x2={W} y2={chartH} stroke={C.border} strokeWidth={1}/>
        {data.map(function(d,i){
          var x=colW*i+5;
          var incH=(d.income/maxVal)*chartH;
          var expH=(d.expense/maxVal)*chartH;
          var hasData=d.income>0||d.expense>0;
          return (
            <g key={i}>
              {d.income>0  && <rect x={x}        y={chartH-incH} width={barW} height={incH} fill={C.green} rx={3} opacity={0.9}/>}
              {d.expense>0 && <rect x={x+barW+4} y={chartH-expH} width={barW} height={expH} fill={C.red}   rx={3} opacity={0.85}/>}
              <text x={x+barW+2} y={H-4} textAnchor="middle" fill={hasData?C.t2:C.t3} fontSize={10} fontFamily={F}>{d.month}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function SavingsLineChart({ data }) {
  if(!data||data.length<2)return null;
  var W=360, H=100, padB=20, padT=10, padL=8, padR=8;
  var vals=data.map(function(d){return d.savings;});
  var minV=Math.min.apply(null,vals), maxV=Math.max.apply(null,vals);
  var range=Math.max(maxV-minV,1);
  var step=(W-padL-padR)/(data.length-1);
  var pts=data.map(function(d,i){
    var x=padL+i*step;
    var y=padT+(1-(d.savings-minV)/range)*(H-padT-padB);
    return {x:x,y:y,s:d.savings,m:d.month};
  });
  var pathD=pts.map(function(p,i){return(i===0?'M':'L')+p.x.toFixed(1)+','+p.y.toFixed(1);}).join(' ');
  var areaD=pathD+' L'+pts[pts.length-1].x.toFixed(1)+','+(H-padB)+' L'+padL+','+(H-padB)+' Z';
  return (
    <div style={{width:'100%',height:100,overflow:'hidden'}}>
      <svg viewBox={'0 0 '+W+' '+H} width="100%" height="100%" preserveAspectRatio="none" style={{display:'block'}}>
        <defs>
          <linearGradient id="savGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.cyan} stopOpacity={0.25}/>
            <stop offset="100%" stopColor={C.cyan} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#savGrad)"/>
        <path d={pathD} fill="none" stroke={C.cyan} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
        {pts.map(function(p,i){
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={3.5} fill={C.bg} stroke={p.s>=0?C.cyan:C.red} strokeWidth={2}/>
              <text x={p.x} y={H-4} textAnchor="middle" fill={C.t3} fontSize={9} fontFamily={F}>{p.m}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Finance Transaction Row ───────────────────────────────────
function FinTxRow({ t, incomeCats, expenseCats, onEdit, onDelete, last }) {
  var cats=t.type==='income'?incomeCats:expenseCats;
  var cat=cats.find(function(c){return c.id===t.categoryId;})||cats[cats.length-1];
  var Icon=getIconById(cat.iconId);
  var isInc=t.type==='income';
  var recLabel = t.recurrenceType==='weekly'?'WEEKLY':t.recurrenceType==='annual'?'ANNUAL':'MONTHLY';
  return (
    <div style={{display:'flex',alignItems:'center',gap:11,padding:'12px 0',borderBottom:last?'none':'1px solid '+C.border,minHeight:54}}>
      <div style={{width:40,height:40,borderRadius:12,background:cat.color+'15',border:'1px solid '+cat.color+'25',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
        <Icon size={17} color={cat.color}/>
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:2}}>
          <div style={{fontSize:13,fontWeight:700,color:C.text,fontFamily:F,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.description||cat.label}</div>
          {t.recurring && (
            <div style={{display:'flex',alignItems:'center',gap:3,background:C.cyan+'15',border:'1px solid '+C.cyan+'30',borderRadius:99,padding:'1px 6px',flexShrink:0}}>
              <Repeat size={9} color={C.cyan}/>
              <span style={{fontSize:8,fontWeight:700,color:C.cyan,fontFamily:F,letterSpacing:'0.04em'}}>{recLabel}</span>
            </div>
          )}
        </div>
        <div style={{fontSize:10,color:C.t2,fontFamily:F}}>{cat.label+' · '+shortDate(t.date)}</div>
      </div>
      <div style={{fontSize:14,fontWeight:800,color:isInc?C.green:C.red,fontFamily:F,flexShrink:0}}>{(isInc?'+':'-')+fp(t.amount)}</div>
      <div style={{display:'flex',gap:4,flexShrink:0}}>
        <button onClick={function(){onEdit(t);}} style={{background:'none',border:'1px solid '+C.border,borderRadius:8,padding:'5px',cursor:'pointer',display:'flex',alignItems:'center'}}><Edit3 size={12} color={C.t2}/></button>
        <button onClick={function(){onDelete(t.id);}} style={{background:'none',border:'1px solid '+C.red+'30',borderRadius:8,padding:'5px',cursor:'pointer',display:'flex',alignItems:'center'}}><Trash2 size={12} color={C.red}/></button>
      </div>
    </div>
  );
}

// ── Add/Edit Transaction Sheet ────────────────────────────────
function AddEditTxSheet({ onClose, onSave, initial, incomeCats, expenseCats, onManageCats }) {
  var isEdit=!!initial;
  var [type, setType]     = useState(initial?.type||'expense');
  var [amt,  setAmt]      = useState(initial?String(initial.amount):'');
  var [catId,    setCatId]    = useState(initial?.categoryId||(initial?.type==='income'?'salary':'food'));
  var [desc,     setDesc]     = useState(initial?.description||'');
  var [date,     setDate]     = useState(initial?.date||todayStr());
  var [recurring,setRecurring]= useState(initial?.recurring||false);
  var [recType,  setRecType]  = useState(initial?.recurrenceType||'monthly');
  var cats=type==='income'?incomeCats:expenseCats;
  var isInc=type==='income';
  var accentCol=isInc?C.green:C.red;
  function switchType(t){ setType(t); setCatId(t==='income'?incomeCats[0].id:expenseCats[0].id); }
  function commit(){
    var a=parseFloat(amt.replace(/[^0-9.]/g,''));
    if(!a||a<=0)return;
    onSave({id:initial?.id||Date.now(),type,amount:a,categoryId:catId,description:desc.trim(),date,
            recurring:recurring,recurrenceType:recurring?recType:null});
    onClose();
  }
  var valid=parseFloat(amt.replace(/[^0-9.]/g,''))>0;
  return (
    <Sheet onClose={onClose} title={isEdit?'Edit Transaction':'Add Transaction'} tall>
      {/* Type toggle */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,marginBottom:18}}>
        {['income','expense'].map(function(t){
          var sel=type===t, col=t==='income'?C.green:C.red;
          return (
            <button key={t} onClick={function(){switchType(t);}}
              style={{padding:'12px 0',borderRadius:14,fontSize:13,fontWeight:800,cursor:'pointer',fontFamily:F,letterSpacing:'0.03em',background:sel?col+'18':C.card2,border:'1px solid '+(sel?col+'50':C.border),color:sel?col:C.t2,transition:'all 0.15s'}}>
              {t==='income'?'↑ Income':'↓ Expense'}
            </button>
          );
        })}
      </div>
      {/* Amount hero */}
      <div style={{background:C.card2,border:'1px solid '+(valid?accentCol+'40':C.border),borderRadius:20,padding:'20px 16px',marginBottom:16,textAlign:'center',transition:'border-color 0.2s'}}>
        <div style={{fontSize:9,fontWeight:800,color:C.t2,letterSpacing:'0.12em',marginBottom:10,fontFamily:F}}>AMOUNT (₱)</div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:4}}>
          <span style={{fontSize:30,fontWeight:900,color:valid?accentCol:C.t3,fontFamily:F,lineHeight:1}}>₱</span>
          <input type="text" inputMode="decimal" value={amt} placeholder="0"
            onChange={function(e){setAmt(e.target.value.replace(/[^0-9.]/g,''));}}
            style={{fontSize:38,fontWeight:900,color:valid?accentCol:C.t3,fontFamily:F,background:'none',border:'none',outline:'none',textAlign:'center',width:170,lineHeight:1}}/>
        </div>
      </div>
      {/* Category grid */}
      <div style={{marginBottom:14}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
          <Label>Category</Label>
          {onManageCats && (
            <button onClick={onManageCats}
              style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:4,padding:'2px 4px',borderRadius:8}}>
              <Plus size={11} color={C.pink}/>
              <span style={{fontSize:10,fontWeight:700,color:C.pink,fontFamily:F}}>Add / Edit</span>
            </button>
          )}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:5}}>
          {cats.map(function(c){
            var Icon=getIconById(c.iconId),sel=catId===c.id;
            // Use pink as fallback highlight for low-contrast "Other" grey categories
            var hiColor=(!c.color||c.color===C.t2||c.color==='#6B6B72')?C.pink:c.color;
            return (
              <button key={c.id} onClick={function(){setCatId(c.id);}}
                style={{padding:'9px 4px 7px',borderRadius:12,background:sel?hiColor+'20':C.card2,border:'1px solid '+(sel?hiColor+'60':C.border),cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:4,transition:'all 0.15s',boxShadow:sel?'0 0 10px '+hiColor+'30':'none'}}>
                <Icon size={17} color={sel?hiColor:C.t2}/>
                <span style={{fontSize:7.5,fontWeight:700,color:sel?hiColor:C.t2,fontFamily:F,textAlign:'center',lineHeight:1.2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'100%',padding:'0 2px'}}>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Description */}
      <div style={{marginBottom:12}}><Label>Description (optional)</Label><Inp value={desc} onChange={setDesc} placeholder="e.g. Monthly grocery run"/></div>
      {/* Date */}
      <div style={{marginBottom:12}}>
        <Label>Date</Label>
        <input type="date" value={date} onChange={function(e){setDate(e.target.value);}}
          style={{width:'100%',boxSizing:'border-box',background:C.card2,border:'1px solid '+C.border,borderRadius:12,padding:'13px 15px',fontSize:14,color:C.text,fontFamily:F,fontWeight:500,outline:'none',colorScheme:'dark'}}/>
      </div>
      {/* Recurring toggle */}
      <div style={{background:C.card2,border:'1px solid '+(recurring?C.cyan+'40':C.border),borderRadius:14,padding:'12px 14px',marginBottom:20,transition:'border-color 0.2s'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:recurring?12:0}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <Repeat size={16} color={recurring?C.cyan:C.t2}/>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:recurring?C.cyan:C.text,fontFamily:F}}>Recurring</div>
              <div style={{fontSize:10,color:C.t2,fontFamily:F}}>Repeats automatically on a schedule</div>
            </div>
          </div>
          <button onClick={function(){setRecurring(!recurring);}}
            style={{width:44,height:26,borderRadius:99,background:recurring?C.cyan:'#2A2A30',border:'none',cursor:'pointer',position:'relative',transition:'background 0.2s',flexShrink:0}}>
            <div style={{width:20,height:20,borderRadius:'50%',background:'#fff',position:'absolute',top:3,left:recurring?21:3,transition:'left 0.2s',boxShadow:'0 1px 4px rgba(0,0,0,0.3)'}}/>
          </button>
        </div>
        {recurring && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6}}>
            {[{id:'weekly',l:'Weekly'},{id:'monthly',l:'Monthly'},{id:'annual',l:'Annual'}].map(function(r){
              var sel=recType===r.id;
              return (
                <button key={r.id} onClick={function(){setRecType(r.id);}}
                  style={{padding:'8px 0',borderRadius:10,fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:F,background:sel?C.cyan+'18':C.card,border:'1px solid '+(sel?C.cyan+'50':C.border),color:sel?C.cyan:C.t2}}>
                  {r.l}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <Btn onClick={commit} disabled={!valid}>{isEdit?'Save Changes':(isInc?'+ Add Income':'+ Add Expense')}</Btn>
    </Sheet>
  );
}

// ── Manage Finance Categories Sheet ──────────────────────────
function ManageFinCatsSheet({ incomeCats, expenseCats, onClose, onAddCat, onEditCat, onRemoveCat, zOverride }) {
  var [catType, setCatType] = useState('expense');
  var [view,    setView]    = useState('list');
  var [editing, setEditing] = useState(null);
  var [fLabel,  setFLabel]  = useState('');
  var [fIcon,   setFIcon]   = useState('Hash');
  var [fColor,  setFColor]  = useState(C.amber);
  var cats=catType==='income'?incomeCats:expenseCats;
  var tc=catType==='income'?C.green:C.red;
  function openEdit(c){ setEditing(c);setFLabel(c.label);setFIcon(c.iconId);setFColor(c.color);setView('edit'); }
  function openAdd(){ setFLabel('');setFIcon('Hash');setFColor(C.amber);setView('add'); }
  function commit(){
    if(!fLabel.trim())return;
    if(view==='add') onAddCat(catType,{id:catType+'_'+Date.now(),label:fLabel.trim(),iconId:fIcon,color:fColor});
    else onEditCat(catType,editing.id,{label:fLabel.trim(),iconId:fIcon,color:fColor});
    setView('list');
  }
  var titles={list:'Categories',add:'Add Category',edit:'Edit Category'};
  return (
    <Sheet onClose={onClose} title={titles[view]} tall zIndex={zOverride||110}>
      {view==='list' && (
        <div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,marginBottom:18}}>
            {['income','expense'].map(function(t){
              var sel=catType===t, col=t==='income'?C.green:C.red;
              return <button key={t} onClick={function(){setCatType(t);}} style={{padding:'10px 0',borderRadius:12,fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:F,textTransform:'capitalize',background:sel?col+'18':C.card2,border:'1px solid '+(sel?col+'50':C.border),color:sel?col:C.t2}}>{t} Categories</button>;
            })}
          </div>
          {cats.map(function(c,i){
            var Icon=getIconById(c.iconId);
            return (
              <div key={c.id} style={{display:'flex',alignItems:'center',gap:11,padding:'11px 0',borderBottom:i===cats.length-1?'none':'1px solid '+C.border}}>
                <div style={{width:38,height:38,borderRadius:11,background:c.color+'15',border:'1px solid '+c.color+'25',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><Icon size={17} color={c.color}/></div>
                <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.text,fontFamily:F}}>{c.label}</div></div>
                <div style={{display:'flex',gap:6}}>
                  <button onClick={function(){openEdit(c);}} style={{background:'none',border:'1px solid '+C.border,borderRadius:8,padding:'5px 8px',cursor:'pointer'}}><Edit3 size={13} color={C.t2}/></button>
                  <button onClick={function(){onRemoveCat(catType,c.id);}} style={{background:'none',border:'1px solid '+C.red+'30',borderRadius:8,padding:'5px 8px',cursor:'pointer'}}><Trash2 size={13} color={C.red}/></button>
                </div>
              </div>
            );
          })}
          <button onClick={openAdd} style={{width:'100%',background:'none',border:'1px dashed '+C.borderMid,borderRadius:14,padding:'13px',fontSize:12,fontWeight:700,color:C.t2,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8,fontFamily:F,marginTop:12}}>
            <Plus size={15} color={tc}/> Add {catType} category
          </button>
        </div>
      )}
      {(view==='add'||view==='edit') && (
        <div>
          <div style={{marginBottom:14}}><Label>Name</Label><Inp value={fLabel} onChange={setFLabel} placeholder="Category name"/></div>
          <div style={{marginBottom:14}}><Label>Icon</Label><IconPicker value={fIcon} onChange={setFIcon}/></div>
          <div style={{marginBottom:20}}><Label>Color</Label><ColorPicker value={fColor} onChange={setFColor}/></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            <Btn onClick={commit} disabled={!fLabel.trim()}>{view==='add'?'Add':'Save'}</Btn>
            <Btn ghost onClick={function(){setView('list');}}>Cancel</Btn>
          </div>
        </div>
      )}
    </Sheet>
  );
}

// ── Add/Edit Savings Goal Sheet ───────────────────────────────
function AddEditGoalSheet({ onClose, onSave, initial }) {
  var isEdit=!!initial;
  var [label,    setLabel]    = useState(initial?.label||'');
  var [target,   setTarget]   = useState(initial?String(initial.target):'');
  var [deadline, setDeadline] = useState(initial?.deadline||'');
  function commit(){
    var tgt=parseFloat(target.replace(/[^0-9.]/g,''));
    if(!label.trim()||!tgt||tgt<=0)return;
    onSave({id:initial?.id||('fg_'+Date.now()),label:label.trim(),target:tgt,deadline:deadline||null,achieved:initial?.achieved||false,trophyAdded:initial?.trophyAdded||false});
    onClose();
  }
  var valid=label.trim()&&parseFloat(target.replace(/[^0-9.]/g,''))>0;
  return (
    <Sheet onClose={onClose} title={isEdit?'Edit Savings Goal':'New Savings Goal'} tall>
      <div style={{marginBottom:14}}><Label>Goal name</Label><Inp value={label} onChange={setLabel} placeholder="e.g. Emergency Fund"/></div>
      <div style={{marginBottom:14}}>
        <Label>Target amount (₱)</Label>
        <div style={{position:'relative'}}>
          <span style={{position:'absolute',left:15,top:'50%',transform:'translateY(-50%)',fontSize:15,fontWeight:800,color:C.t2,fontFamily:F}}>₱</span>
          <input type="text" inputMode="decimal" value={target} onChange={function(e){setTarget(e.target.value.replace(/[^0-9.]/g,''));}} placeholder="50,000"
            style={{width:'100%',boxSizing:'border-box',background:C.card2,border:'1px solid '+C.border,borderRadius:12,padding:'13px 15px 13px 32px',fontSize:14,color:C.text,fontFamily:F,fontWeight:700,outline:'none'}}/>
        </div>
      </div>
      <div style={{marginBottom:8}}>
        <Label>Target date (optional)</Label>
        <input type="date" value={deadline} onChange={function(e){setDeadline(e.target.value);}}
          style={{width:'100%',boxSizing:'border-box',background:C.card2,border:'1px solid '+C.border,borderRadius:12,padding:'13px 15px',fontSize:14,color:C.text,fontFamily:F,fontWeight:500,outline:'none',colorScheme:'dark'}}/>
      </div>
      <div style={{fontSize:11,color:C.t2,fontFamily:F,marginBottom:20,lineHeight:1.5}}>
        When you hit this target, a trophy is automatically added to your Vault and you earn 500 XP.
      </div>
      <Btn onClick={commit} disabled={!valid}>{isEdit?'Save Changes':'Create Goal'}</Btn>
    </Sheet>
  );
}

// ── Add/Edit Debt Sheet ───────────────────────────────────────
function AddEditDebtSheet({ onClose, onSave, initial }) {
  var isEdit=!!initial;
  var [name,       setName]       = useState(initial?.name||'');
  var [typeId,     setTypeId]     = useState(initial?.typeId||'personal');
  var [origAmt,    setOrigAmt]    = useState(initial?String(initial.originalAmount):'');
  var [curBal,     setCurBal]     = useState(initial?String(initial.currentBalance):'');
  var [intRate,    setIntRate]    = useState(initial?String(initial.interestRate):'');
  var [monthlyPmt, setMonthlyPmt] = useState(initial?String(initial.monthlyPayment):'');

  function commit(){
    var orig=parseFloat(origAmt.replace(/[^0-9.]/g,'')),
        cur =parseFloat(curBal.replace(/[^0-9.]/g,'')),
        rate=parseFloat(intRate.replace(/[^0-9.]/g,''))||0,
        pmt =parseFloat(monthlyPmt.replace(/[^0-9.]/g,''))||0;
    if(!name.trim()||!orig||!cur)return;
    var dt=DEBT_TYPES.find(function(d){return d.id===typeId;})||DEBT_TYPES[0];
    onSave({id:initial?.id||('debt_'+Date.now()),name:name.trim(),typeId,
            iconId:dt.iconId,color:dt.color,
            originalAmount:orig,currentBalance:Math.min(cur,orig),
            interestRate:rate,monthlyPayment:pmt});
    onClose();
  }
  var valid=name.trim()&&parseFloat(origAmt.replace(/[^0-9.]/g,''))>0&&parseFloat(curBal.replace(/[^0-9.]/g,''))>0;

  return (
    <Sheet onClose={onClose} title={isEdit?'Edit Debt':'Add Debt / Loan'} tall>
      <div style={{marginBottom:14}}><Label>Name</Label><Inp value={name} onChange={setName} placeholder="e.g. BDO Personal Loan"/></div>
      <div style={{marginBottom:14}}>
        <Label>Type</Label>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6}}>
          {DEBT_TYPES.map(function(t){
            var Icon=getIconById(t.iconId), sel=typeId===t.id;
            return (
              <button key={t.id} onClick={function(){setTypeId(t.id);}}
                style={{padding:'10px 6px',borderRadius:12,background:sel?t.color+'18':C.card2,border:'1px solid '+(sel?t.color+'50':C.border),cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:5,transition:'all 0.15s'}}>
                <Icon size={16} color={sel?t.color:C.t2}/>
                <span style={{fontSize:8.5,fontWeight:700,color:sel?t.color:C.t2,fontFamily:F,textAlign:'center',lineHeight:1.2}}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
        <div>
          <Label>Original amount (₱)</Label>
          <input type="text" inputMode="decimal" value={origAmt} onChange={function(e){setOrigAmt(e.target.value.replace(/[^0-9.]/g,''));}} placeholder="e.g. 200,000"
            style={{width:'100%',boxSizing:'border-box',background:C.card2,border:'1px solid '+C.border,borderRadius:12,padding:'12px 14px',fontSize:13,color:C.text,fontFamily:F,fontWeight:600,outline:'none'}}/>
        </div>
        <div>
          <Label>Current balance (₱)</Label>
          <input type="text" inputMode="decimal" value={curBal} onChange={function(e){setCurBal(e.target.value.replace(/[^0-9.]/g,''));}} placeholder="e.g. 150,000"
            style={{width:'100%',boxSizing:'border-box',background:C.card2,border:'1px solid '+C.border,borderRadius:12,padding:'12px 14px',fontSize:13,color:C.text,fontFamily:F,fontWeight:600,outline:'none'}}/>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:20}}>
        <div>
          <Label>Interest rate (% p.a.)</Label>
          <input type="text" inputMode="decimal" value={intRate} onChange={function(e){setIntRate(e.target.value.replace(/[^0-9.]/g,''));}} placeholder="e.g. 12.5"
            style={{width:'100%',boxSizing:'border-box',background:C.card2,border:'1px solid '+C.border,borderRadius:12,padding:'12px 14px',fontSize:13,color:C.text,fontFamily:F,fontWeight:600,outline:'none'}}/>
        </div>
        <div>
          <Label>Monthly payment (₱)</Label>
          <input type="text" inputMode="decimal" value={monthlyPmt} onChange={function(e){setMonthlyPmt(e.target.value.replace(/[^0-9.]/g,''));}} placeholder="e.g. 5,000"
            style={{width:'100%',boxSizing:'border-box',background:C.card2,border:'1px solid '+C.border,borderRadius:12,padding:'12px 14px',fontSize:13,color:C.text,fontFamily:F,fontWeight:600,outline:'none'}}/>
        </div>
      </div>
      <Btn onClick={commit} disabled={!valid}>{isEdit?'Save Changes':'Add Debt'}</Btn>
    </Sheet>
  );
}

// ── Finance Screen ────────────────────────────────────────────
function FinanceScreen({ transactions, incomeCats, expenseCats, budgets, savingsGoals, debts,
  onAddTx, onEditTx, onDeleteTx, onAddCat, onEditCat, onRemoveCat,
  onSetBudget, onAddGoal, onEditGoal, onDeleteGoal, onGoalAchieved,
  onAddDebt, onEditDebt, onDeleteDebt, addTxSignal }) {

  var [activeTab,    setActiveTab]    = useState('overview');
  var [txFilter,     setTxFilter]     = useState('all');
  var [editingTx,    setEditingTx]    = useState(null);
  var [showAddTx,    setShowAddTx]    = useState(false);
  var [showCats,     setShowCats]     = useState(false);
  var [editingGoal,  setEditingGoal]  = useState(null);
  var [showAddGoal,  setShowAddGoal]  = useState(false);
  var [editingDebt,  setEditingDebt]  = useState(null);
  var [showAddDebt,  setShowAddDebt]  = useState(false);
  var [budgetCatId,  setBudgetCatId]  = useState(null);
  var [budgetInput,  setBudgetInput]  = useState('');

  var now=new Date();
  var monthTx=transactions.filter(function(t){
    var d=new Date(t.date+'T00:00:00');
    return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear();
  });
  var allIncome  = transactions.filter(function(t){return t.type==='income';}).reduce(function(s,t){return s+t.amount;},0);
  var allExpense = transactions.filter(function(t){return t.type==='expense';}).reduce(function(s,t){return s+t.amount;},0);
  var netSavings = allIncome - allExpense;
  var mIncome    = monthTx.filter(function(t){return t.type==='income';}).reduce(function(s,t){return s+t.amount;},0);
  var mExpense   = monthTx.filter(function(t){return t.type==='expense';}).reduce(function(s,t){return s+t.amount;},0);
  var monthlyData= getMonthlyData(transactions,6);

  function getCatSegments(type) {
    var cats=type==='income'?incomeCats:expenseCats;
    var total=monthTx.filter(function(t){return t.type===type;}).reduce(function(s,t){return s+t.amount;},0);
    if(total===0)return[];
    return cats.map(function(c){
      var amt=monthTx.filter(function(t){return t.type===type&&t.categoryId===c.id;}).reduce(function(s,t){return s+t.amount;},0);
      return{color:c.color,pct:total>0?(amt/total)*100:0,label:c.label,value:amt,id:c.id};
    }).filter(function(s){return s.pct>0.5;}).sort(function(a,b){return b.pct-a.pct;});
  }
  var expSegs=getCatSegments('expense'), incSegs=getCatSegments('income');

  // Month-over-month & analytics
  var prevMonthTx = transactions.filter(function(t){
    var d=new Date(t.date+'T00:00:00');
    var prev=new Date(now.getFullYear(),now.getMonth()-1,1);
    return d.getMonth()===prev.getMonth()&&d.getFullYear()===prev.getFullYear();
  });
  var prevExpense = prevMonthTx.filter(function(t){return t.type==='expense';}).reduce(function(s,t){return s+t.amount;},0);
  var prevIncome  = prevMonthTx.filter(function(t){return t.type==='income';}).reduce(function(s,t){return s+t.amount;},0);
  var expChangePct= prevExpense>0?Math.round(((mExpense-prevExpense)/prevExpense)*100):null;
  var incChangePct= prevIncome>0?Math.round(((mIncome-prevIncome)/prevIncome)*100):null;
  var savingsRate = mIncome>0?Math.round(((mIncome-mExpense)/mIncome)*100):0;
  var totalDebt   = debts.reduce(function(s,d){return s+d.currentBalance;},0);
  var netWorth    = netSavings - totalDebt;
  var topExpCat   = expSegs.length>0?expSegs[0]:null;
  var recurringTx = transactions.filter(function(t){return t.recurring;});

  // Open add-tx sheet when FAB signals from parent
  useEffect(function(){
    if(addTxSignal>0){ setShowAddTx(true); setActiveTab('transactions'); }
  },[addTxSignal]);

  // Check savings goals when netSavings or goals change
  useEffect(function(){
    savingsGoals.forEach(function(g){
      if(!g.achieved&&!g.trophyAdded&&netSavings>=g.target) onGoalAchieved(g.id);
    });
  },[netSavings, savingsGoals]);

  var TABS=[{id:'overview',label:'Overview'},{id:'transactions',label:'Transactions'},{id:'budget',label:'Budget'},{id:'goals',label:'Goals'}];
  var tabBar=(
    <div style={{display:'flex',gap:3,marginBottom:14,background:C.card2,borderRadius:14,padding:4}}>
      {TABS.map(function(tab){
        var sel=activeTab===tab.id;
        return (
          <button key={tab.id} onClick={function(){setActiveTab(tab.id);}}
            style={{flex:1,padding:'8px 2px',borderRadius:10,fontSize:9.5,fontWeight:sel?800:600,cursor:'pointer',fontFamily:F,background:sel?C.card:'transparent',border:'none',color:sel?C.text:C.t2,transition:'all 0.15s',boxShadow:sel?'0 1px 6px rgba(0,0,0,0.35)':'none'}}>
            {tab.label}
          </button>
        );
      })}
    </div>
  );

  // ── Overview ────────────────────────────────────────────────
  function renderOverview() {
    return (
      <div>
        {/* Net Worth hero */}
        <div style={{background:'linear-gradient(135deg,#111318,#0E1520)',borderRadius:20,border:'1px solid '+(netWorth>=0?C.cyan+'30':'rgba(255,71,87,0.25)'),padding:'18px',marginBottom:12,boxShadow:netWorth>=0?'0 4px 28px rgba(0,207,255,0.07)':'0 4px 28px rgba(255,71,87,0.07)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:14}}>
            <div>
              <Label>Net Worth</Label>
              <div style={{fontSize:32,fontWeight:900,color:netWorth>=0?C.cyan:C.red,fontFamily:F,lineHeight:1}}>{fp(Math.abs(netWorth))}</div>
              {totalDebt>0&&<div style={{fontSize:10,color:C.t2,fontFamily:F,marginTop:4}}>Savings {fp(netSavings)} − Debts {fp(totalDebt)}</div>}
            </div>
            <Pill color={(mIncome-mExpense)>=0?C.green:C.red}>{(mIncome-mExpense)>=0?'POSITIVE':'DEFICIT'}</Pill>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
            {[
              {l:'INCOME',  v:mIncome,         c:C.green, Icon:ArrowUpRight,   chg:incChangePct},
              {l:'EXPENSE', v:mExpense,         c:C.red,   Icon:ArrowDownRight, chg:expChangePct},
              {l:'SAVINGS', v:mIncome-mExpense, c:(mIncome-mExpense)>=0?C.cyan:C.red, Icon:PiggyBank, chg:null},
            ].map(function(s){
              var chgColor=s.chg===null?null:s.l==='EXPENSE'?(s.chg>0?C.red:C.green):(s.chg>0?C.green:C.red);
              return (
                <div key={s.l} style={{background:'rgba(255,255,255,0.04)',borderRadius:14,padding:'10px 10px',border:'1px solid rgba(255,255,255,0.06)'}}>
                  <div style={{display:'flex',alignItems:'center',gap:4,marginBottom:5}}>
                    <s.Icon size={11} color={s.c}/>
                    <div style={{fontSize:8,fontWeight:800,color:C.t2,letterSpacing:'0.08em',fontFamily:F}}>{s.l}</div>
                  </div>
                  <div style={{fontSize:12,fontWeight:900,color:s.c,fontFamily:F,lineHeight:1,marginBottom:s.chg!==null?3:0}}>{fp(s.v)}</div>
                  {s.chg!==null&&<div style={{fontSize:9,fontWeight:700,color:chgColor,fontFamily:F}}>{(s.chg>0?'+':'')+s.chg+'% vs last mo'}</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Spending Recap */}
        <div style={{background:C.card,borderRadius:18,border:'1px solid '+C.border,padding:'14px 16px',marginBottom:12,boxShadow:'inset 0 1px 0 rgba(255,255,255,0.03)'}}>
          <div style={{fontSize:11,fontWeight:800,color:C.t2,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:10,fontFamily:F}}>Financial Snapshot</div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:28,height:28,borderRadius:8,background:C.cyan+'18',border:'1px solid '+C.cyan+'25',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <PiggyBank size={14} color={C.cyan}/>
                </div>
                <span style={{fontSize:12,color:C.t2,fontFamily:F}}>Savings rate this month</span>
              </div>
              <span style={{fontSize:14,fontWeight:900,color:savingsRate>=20?C.green:savingsRate>=0?C.amber:C.red,fontFamily:F}}>{savingsRate}%</span>
            </div>
            {topExpCat&&(
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <div style={{width:28,height:28,borderRadius:8,background:topExpCat.color+'18',border:'1px solid '+topExpCat.color+'25',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <ReceiptText size={14} color={topExpCat.color}/>
                  </div>
                  <span style={{fontSize:12,color:C.t2,fontFamily:F}}>Top spend: <span style={{color:C.text,fontWeight:700}}>{topExpCat.label}</span></span>
                </div>
                <span style={{fontSize:12,fontWeight:800,color:C.text,fontFamily:F}}>{fp(topExpCat.value)} ({topExpCat.pct.toFixed(0)}%)</span>
              </div>
            )}
            {expChangePct!==null&&(
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <div style={{width:28,height:28,borderRadius:8,background:(expChangePct>0?C.red:C.green)+'18',border:'1px solid '+(expChangePct>0?C.red:C.green)+'25',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {expChangePct>0?<TrendingUp size={14} color={C.red}/>:<TrendingDown size={14} color={C.green}/>}
                  </div>
                  <span style={{fontSize:12,color:C.t2,fontFamily:F}}>Spending vs last month</span>
                </div>
                <span style={{fontSize:12,fontWeight:800,color:expChangePct>0?C.red:C.green,fontFamily:F}}>{(expChangePct>0?'+':'')+expChangePct+'%'}</span>
              </div>
            )}
            {recurringTx.length>0&&(
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <div style={{width:28,height:28,borderRadius:8,background:C.purple+'18',border:'1px solid '+C.purple+'25',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Repeat size={14} color={C.purple}/>
                  </div>
                  <span style={{fontSize:12,color:C.t2,fontFamily:F}}>Recurring bills tracked</span>
                </div>
                <span style={{fontSize:12,fontWeight:800,color:C.text,fontFamily:F}}>{recurringTx.length} active</span>
              </div>
            )}
          </div>
        </div>

        {/* Donuts */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
          {[
            {title:'Expenses',segs:expSegs,total:mExpense,col:C.red,   cats:expenseCats},
            {title:'Income',  segs:incSegs, total:mIncome, col:C.green, cats:incomeCats},
          ].map(function(panel){
            return (
              <div key={panel.title} style={{background:C.card,borderRadius:18,border:'1px solid '+C.border,padding:'14px',boxShadow:'inset 0 1px 0 rgba(255,255,255,0.03)'}}>
                <div style={{fontSize:9.5,fontWeight:800,color:C.t2,letterSpacing:'0.08em',marginBottom:10,fontFamily:F}}>{panel.title.toUpperCase()}</div>
                <div style={{display:'flex',justifyContent:'center',marginBottom:10}}>
                  <MultiDonut segments={panel.segs} size={88} strokeW={10}
                    centerLabel={fp(panel.total)} centerSub="month"/>
                </div>
                {panel.segs.slice(0,3).map(function(s){
                  return (
                    <div key={s.id} style={{display:'flex',alignItems:'center',gap:6,marginBottom:5}}>
                      <div style={{width:6,height:6,borderRadius:'50%',background:s.color,flexShrink:0}}/>
                      <div style={{flex:1,fontSize:9,color:C.t2,fontFamily:F,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{s.label}</div>
                      <div style={{fontSize:9,fontWeight:700,color:C.text,fontFamily:F}}>{s.pct.toFixed(0)+'%'}</div>
                    </div>
                  );
                })}
                {panel.segs.length===0&&<div style={{fontSize:10,color:C.t3,textAlign:'center',padding:'8px 0',fontFamily:F}}>No data</div>}
              </div>
            );
          })}
        </div>

        {/* 6-month bar */}
        <div style={{background:C.card,borderRadius:18,border:'1px solid '+C.border,padding:'16px',marginBottom:12}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,fontFamily:F}}>6-Month Overview</div>
            <div style={{display:'flex',gap:10}}>
              {[{c:C.green,l:'Income'},{c:C.red,l:'Expense'}].map(function(i){
                return <div key={i.l} style={{display:'flex',alignItems:'center',gap:4}}><div style={{width:7,height:7,borderRadius:2,background:i.c}}/><span style={{fontSize:9,color:C.t2,fontFamily:F}}>{i.l}</span></div>;
              })}
            </div>
          </div>
          <MonthlyBarChart data={monthlyData}/>
        </div>

        {/* Savings line */}
        <div style={{background:C.card,borderRadius:18,border:'1px solid '+C.border,padding:'16px',marginBottom:12}}>
          <div style={{fontSize:13,fontWeight:700,color:C.text,fontFamily:F,marginBottom:10}}>Savings Trend</div>
          <SavingsLineChart data={monthlyData}/>
        </div>

        {/* Recent */}
        {transactions.length>0&&(
          <div style={{background:C.card,borderRadius:18,border:'1px solid '+C.border,padding:'4px 14px',marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,fontFamily:F,padding:'12px 0 4px'}}>Recent Transactions</div>
            {transactions.slice().sort(function(a,b){return a.date<b.date?1:-1;}).slice(0,5).map(function(t,i){
              return <FinTxRow key={t.id} t={t} incomeCats={incomeCats} expenseCats={expenseCats}
                onEdit={function(t){setEditingTx(t);setActiveTab('transactions');}} onDelete={onDeleteTx} last={i===Math.min(transactions.length,5)-1}/>;
            })}
          </div>
        )}
      </div>
    );
  }

  // ── Transactions ─────────────────────────────────────────────
  function renderTransactions() {
    var filtered=transactions.filter(function(t){return txFilter==='all'||t.type===txFilter;});
    var grouped=groupByDate(filtered);
    var recurringExp=transactions.filter(function(t){return t.recurring&&t.type==='expense';});
    var recurringInc=transactions.filter(function(t){return t.recurring&&t.type==='income';});
    var totalRecurringExp=recurringExp.reduce(function(s,t){return s+t.amount;},0);
    return (
      <div>
        {/* Recurring bills summary */}
        {recurringTx.length>0&&(
          <div style={{background:C.card,borderRadius:16,border:'1px solid '+C.cyan+'25',padding:'14px 16px',marginBottom:14,boxShadow:'0 0 16px rgba(0,207,255,0.05)'}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
              <Repeat size={14} color={C.cyan}/>
              <div style={{fontSize:12,fontWeight:800,color:C.cyan,fontFamily:F,letterSpacing:'0.04em'}}>RECURRING BILLS</div>
              <div style={{marginLeft:'auto',fontSize:11,fontWeight:700,color:C.red,fontFamily:F}}>{fp(totalRecurringExp)+'/mo'}</div>
            </div>
            {recurringExp.map(function(t,i){
              var cats=expenseCats; var cat=cats.find(function(c){return c.id===t.categoryId;})||cats[cats.length-1];
              var Icon=getIconById(cat.iconId);
              var recLabel=t.recurrenceType==='weekly'?'Weekly':t.recurrenceType==='annual'?'Annual':'Monthly';
              return (
                <div key={t.id} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderTop:i===0?'none':'1px solid '+C.border}}>
                  <div style={{width:32,height:32,borderRadius:10,background:cat.color+'15',border:'1px solid '+cat.color+'25',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><Icon size={14} color={cat.color}/></div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:700,color:C.text,fontFamily:F,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.description||cat.label}</div>
                    <div style={{fontSize:9,color:C.t2,fontFamily:F}}>{recLabel}</div>
                  </div>
                  <div style={{fontSize:13,fontWeight:800,color:C.red,fontFamily:F,flexShrink:0}}>{'-'+fp(t.amount)}</div>
                </div>
              );
            })}
            {recurringInc.map(function(t,i){
              var cats=incomeCats; var cat=cats.find(function(c){return c.id===t.categoryId;})||cats[cats.length-1];
              var Icon=getIconById(cat.iconId);
              var recLabel=t.recurrenceType==='weekly'?'Weekly':t.recurrenceType==='annual'?'Annual':'Monthly';
              return (
                <div key={t.id} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderTop:'1px solid '+C.border}}>
                  <div style={{width:32,height:32,borderRadius:10,background:cat.color+'15',border:'1px solid '+cat.color+'25',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><Icon size={14} color={cat.color}/></div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:700,color:C.text,fontFamily:F,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.description||cat.label}</div>
                    <div style={{fontSize:9,color:C.t2,fontFamily:F}}>{recLabel}</div>
                  </div>
                  <div style={{fontSize:13,fontWeight:800,color:C.green,fontFamily:F,flexShrink:0}}>{'+'+fp(t.amount)}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Filter bar */}
        <div style={{display:'flex',gap:6,marginBottom:14}}>
          {['all','income','expense'].map(function(f){
            var sel=txFilter===f, col=f==='income'?C.green:f==='expense'?C.red:C.pink;
            return (
              <button key={f} onClick={function(){setTxFilter(f);}}
                style={{flex:1,padding:'8px 0',borderRadius:10,fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:F,textTransform:'capitalize',background:sel?col+'18':C.card2,border:'1px solid '+(sel?col+'40':C.border),color:sel?col:C.t2}}>
                {f==='all'?'All':f.charAt(0).toUpperCase()+f.slice(1)}
              </button>
            );
          })}
          <button onClick={function(){setShowCats(true);}} style={{background:C.card2,border:'1px solid '+C.border,borderRadius:10,padding:'8px 10px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',minWidth:36}}>
            <SlidersHorizontal size={14} color={C.t2}/>
          </button>
        </div>

        {grouped.length===0&&<div style={{textAlign:'center',padding:'40px 0',color:C.t3,fontSize:13,fontFamily:F}}>No transactions yet.</div>}
        {grouped.map(function(group){
          var dateKey=group[0],txs=group[1];
          var dayIncome=txs.filter(function(t){return t.type==='income';}).reduce(function(s,t){return s+t.amount;},0);
          var dayExpense=txs.filter(function(t){return t.type==='expense';}).reduce(function(s,t){return s+t.amount;},0);
          return (
            <div key={dateKey} style={{marginBottom:12}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                <div style={{fontSize:10,fontWeight:700,color:C.t2,letterSpacing:'0.08em',fontFamily:F}}>{new Date(dateKey+'T00:00:00').toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'}).toUpperCase()}</div>
                <div style={{fontSize:10,fontWeight:700,fontFamily:F}}>
                  {dayIncome>0&&<span style={{color:C.green,marginRight:8}}>{'+'+fp(dayIncome)}</span>}
                  {dayExpense>0&&<span style={{color:C.red}}>{'-'+fp(dayExpense)}</span>}
                </div>
              </div>
              <div style={{background:C.card,borderRadius:16,border:'1px solid '+C.border,padding:'0 14px'}}>
                {txs.map(function(t,i){
                  return <FinTxRow key={t.id} t={t} incomeCats={incomeCats} expenseCats={expenseCats}
                    onEdit={function(t){setEditingTx(t);}} onDelete={onDeleteTx} last={i===txs.length-1}/>;
                })}
              </div>
            </div>
          );
        })}
        <button onClick={function(){setShowAddTx(true);}}
          style={{width:'100%',background:'none',border:'1px dashed '+C.borderMid,borderRadius:14,padding:'14px',fontSize:13,fontWeight:700,color:C.t2,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8,fontFamily:F,marginTop:4}}>
          <Plus size={16} color={C.pink}/> Add Transaction
        </button>
      </div>
    );
  }

  // ── Budget ───────────────────────────────────────────────────
  function renderBudget() {
    var totalBudget=Object.values(budgets).reduce(function(s,v){return s+v;},0);
    var totalSpent=mExpense;
    var overallPct=totalBudget>0?Math.min((totalSpent/totalBudget)*100,100):0;

    // Alerts: over or >=80%
    var alerts=expenseCats.map(function(c){
      var spent=monthTx.filter(function(t){return t.type==='expense'&&t.categoryId===c.id;}).reduce(function(s,t){return s+t.amount;},0);
      var budget=budgets[c.id]||0;
      if(budget===0||spent<budget*0.8)return null;
      var pct=Math.round((spent/budget)*100);
      var over=spent>budget;
      return {c,spent,budget,pct,over};
    }).filter(Boolean);

    return (
      <div>
        {/* Alerts */}
        {alerts.length>0&&(
          <div style={{background:C.amber+'0D',border:'1px solid '+C.amber+'35',borderRadius:16,padding:'12px 14px',marginBottom:14}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
              <AlertTriangle size={14} color={C.amber}/>
              <div style={{fontSize:11,fontWeight:800,color:C.amber,fontFamily:F,letterSpacing:'0.06em'}}>BUDGET ALERTS</div>
            </div>
            {alerts.map(function(a){
              var Icon=getIconById(a.c.iconId);
              return (
                <div key={a.c.id} style={{display:'flex',alignItems:'center',gap:10,padding:'7px 0',borderTop:'1px solid rgba(255,159,67,0.12)'}}>
                  <Icon size={14} color={a.over?C.red:C.amber}/>
                  <div style={{flex:1,fontSize:11,color:C.text,fontFamily:F}}>{a.c.label}</div>
                  <Pill color={a.over?C.red:C.amber}>{a.over?'OVER BUDGET':a.pct+'%'}</Pill>
                  <div style={{fontSize:11,fontWeight:700,color:a.over?C.red:C.amber,fontFamily:F,flexShrink:0,textAlign:'right'}}>
                    {a.over?fp(a.spent-a.budget)+' over':fp(a.budget-a.spent)+' left'}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Overall */}
        <div style={{background:C.card,borderRadius:18,border:'1px solid '+C.border,padding:'16px 18px',marginBottom:14,boxShadow:'inset 0 1px 0 rgba(255,255,255,0.04)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,fontFamily:F}}>Monthly Budget</div>
            <div style={{fontSize:12,fontWeight:800,color:overallPct>=100?C.red:overallPct>=80?C.amber:C.green,fontFamily:F}}>{overallPct.toFixed(0)+'%'}</div>
          </div>
          <div style={{height:5,background:C.border,borderRadius:99,overflow:'hidden',marginBottom:8}}>
            <div style={{height:'100%',borderRadius:99,width:overallPct+'%',background:overallPct>=100?C.red:overallPct>=80?C.amber:C.green,transition:'width 0.8s cubic-bezier(0.4,0,0.2,1)'}}/>
          </div>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <div style={{fontSize:11,color:C.t2,fontFamily:F}}>Spent: <span style={{fontWeight:700,color:C.text}}>{fp(totalSpent)}</span></div>
            <div style={{fontSize:11,color:C.t2,fontFamily:F}}>Remaining: <span style={{fontWeight:700,color:totalBudget-totalSpent>=0?C.green:C.red}}>{fp(Math.abs(totalBudget-totalSpent))}</span></div>
          </div>
        </div>
        {expenseCats.map(function(c){
          var Icon=getIconById(c.iconId);
          var spent=monthTx.filter(function(t){return t.type==='expense'&&t.categoryId===c.id;}).reduce(function(s,t){return s+t.amount;},0);
          var budget=budgets[c.id]||0;
          var pct=budget>0?Math.min((spent/budget)*100,100):0;
          var over=budget>0&&spent>budget, warn=budget>0&&(spent/budget)>=0.8;
          var barCol=over?C.red:warn?C.amber:C.green;
          var isEd=budgetCatId===c.id;
          return (
            <div key={c.id} style={{background:C.card,borderRadius:16,border:'1px solid '+(over?C.red+'30':C.border),padding:'13px 14px',marginBottom:8,boxShadow:over?'0 0 16px rgba(255,71,87,0.06)':'inset 0 1px 0 rgba(255,255,255,0.03)'}}>
              <div style={{display:'flex',alignItems:'center',gap:11,marginBottom:budget>0?10:0}}>
                <div style={{width:40,height:40,borderRadius:12,background:c.color+'15',border:'1px solid '+c.color+'25',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><Icon size={18} color={c.color}/></div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.text,fontFamily:F}}>{c.label}</div>
                  <div style={{fontSize:10,color:over?C.red:C.t2,fontFamily:F,marginTop:2}}>
                    {fp(spent)+' / '+(budget>0?fp(budget):'No budget')}
                  </div>
                </div>
                {over&&<Pill color={C.red}>OVER</Pill>}
                <button onClick={function(){setBudgetCatId(isEd?null:c.id);setBudgetInput(String(budget||''));}}
                  style={{background:isEd?C.pinkBg:'none',border:'1px solid '+(isEd?C.pink:C.border),borderRadius:8,padding:'5px 10px',cursor:'pointer',fontSize:10,fontWeight:700,color:isEd?C.pink:C.t2,fontFamily:F}}>
                  {isEd?'Cancel':'Set'}
                </button>
              </div>
              {budget>0&&!isEd&&(
                <div style={{height:3.5,background:C.border,borderRadius:99,overflow:'hidden'}}>
                  <div style={{height:'100%',borderRadius:99,width:pct+'%',background:barCol,transition:'width 0.7s cubic-bezier(0.4,0,0.2,1)'}}/>
                </div>
              )}
              {isEd&&(
                <div style={{display:'flex',gap:8,marginTop:8}}>
                  <div style={{position:'relative',flex:1}}>
                    <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',fontSize:13,fontWeight:700,color:C.t2}}>₱</span>
                    <input type="text" inputMode="numeric" value={budgetInput} onChange={function(e){setBudgetInput(e.target.value.replace(/[^0-9]/g,''));}} placeholder="Amount"
                      style={{width:'100%',boxSizing:'border-box',background:C.card2,border:'1px solid '+C.pink,borderRadius:10,padding:'9px 12px 9px 28px',fontSize:13,color:C.text,fontFamily:F,outline:'none'}}/>
                  </div>
                  <button onClick={function(){onSetBudget(c.id,parseInt(budgetInput)||0);setBudgetCatId(null);}}
                    style={{background:C.pink,border:'none',borderRadius:10,padding:'0 18px',fontSize:12,fontWeight:800,color:'#000',cursor:'pointer',fontFamily:F}}>Save</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // ── Goals ────────────────────────────────────────────────────
  function renderGoals() {
    function daysLeft(dl){ if(!dl)return null; var d=Math.ceil((new Date(dl+'T00:00:00')-new Date())/(1000*60*60*24)); return d; }
    return (
      <div>
        {/* Savings hero */}
        <div style={{background:C.card,borderRadius:20,border:'1px solid '+(netSavings>=0?C.cyan+'30':C.red+'30'),padding:'20px',marginBottom:16,textAlign:'center',boxShadow:netSavings>=0?'0 4px 28px rgba(0,207,255,0.07)':'0 4px 28px rgba(255,71,87,0.07)'}}>
          <div style={{fontSize:9.5,fontWeight:800,color:C.t2,letterSpacing:'0.12em',marginBottom:8,fontFamily:F}}>TOTAL SAVINGS</div>
          <div style={{fontSize:40,fontWeight:900,color:netSavings>=0?C.cyan:C.red,fontFamily:F,lineHeight:1,marginBottom:6}}>{fp(netSavings)}</div>
          <div style={{fontSize:11,color:C.t2,fontFamily:F}}>{netSavings>=0?'Available to allocate toward goals':'Deficit — review your expenses'}</div>
        </div>

        {savingsGoals.length===0&&<div style={{textAlign:'center',padding:'20px 0',color:C.t3,fontSize:12,fontFamily:F}}>No savings goals yet. Add one below.</div>}

        {savingsGoals.map(function(goal){
          var pct=goal.target>0?Math.min((netSavings/goal.target)*100,100):0;
          var done=goal.achieved||pct>=100;
          var col=done?C.green:pct>=80?C.amber:C.cyan;
          var days=daysLeft(goal.deadline);
          return (
            <div key={goal.id} style={{background:done?C.green+'09':C.card,borderRadius:18,border:'1px solid '+(done?C.green+'35':C.border),padding:'16px',marginBottom:10,boxShadow:done?'0 0 24px rgba(46,204,113,0.09)':'inset 0 1px 0 rgba(255,255,255,0.03)'}}>
              <div style={{display:'flex',alignItems:'flex-start',gap:8,marginBottom:12}}>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                    <div style={{fontSize:15,fontWeight:800,color:done?C.green:C.text,fontFamily:F}}>{goal.label}</div>
                    {done&&<div style={{width:20,height:20,borderRadius:'50%',background:C.green,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 0 10px rgba(46,204,113,0.7)'}}><Check size={11} color="#000" strokeWidth={3}/></div>}
                  </div>
                  <div style={{fontSize:11,color:C.t2,fontFamily:F}}>
                    {'Target: '+fp(goal.target)}
                    {goal.deadline&&' · '+new Date(goal.deadline+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
                  </div>
                </div>
                <div style={{display:'flex',gap:5,flexShrink:0}}>
                  <button onClick={function(){setEditingGoal(goal);}} style={{background:'none',border:'1px solid '+C.border,borderRadius:8,padding:'5px 8px',cursor:'pointer'}}><Edit3 size={12} color={C.t2}/></button>
                  <button onClick={function(){onDeleteGoal(goal.id);}} style={{background:'none',border:'1px solid '+C.red+'30',borderRadius:8,padding:'5px 8px',cursor:'pointer'}}><Trash2 size={12} color={C.red}/></button>
                </div>
              </div>
              {/* Progress */}
              <div style={{marginBottom:8}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <div style={{fontSize:11,fontWeight:700,color:col,fontFamily:F}}>{fp(Math.min(netSavings,goal.target))+' saved'}</div>
                  <div style={{fontSize:12,fontWeight:900,color:col,fontFamily:F}}>{Math.max(0,pct).toFixed(0)+'%'}</div>
                </div>
                <div style={{height:6,background:C.border,borderRadius:99,overflow:'hidden'}}>
                  <div style={{height:'100%',borderRadius:99,width:Math.max(pct,0)+'%',background:col,transition:'width 0.9s cubic-bezier(0.4,0,0.2,1)',boxShadow:done?'0 0 10px '+col+'90':'none'}}/>
                </div>
              </div>
              {done&&goal.trophyAdded&&(
                <div style={{fontSize:10,fontWeight:700,color:C.green,fontFamily:F,display:'flex',alignItems:'center',gap:5,marginTop:6}}>
                  <Trophy size={12} color={C.green}/> Trophy + 500 XP added to your collection
                </div>
              )}
              {!done&&days!==null&&(
                <div style={{fontSize:10,color:days<=0?C.red:days<=7?C.amber:C.t2,fontFamily:F,marginTop:4}}>
                  {days<=0?'Deadline passed':days+' day'+(days===1?'':'s')+' remaining'}
                </div>
              )}
              {!done&&netSavings<goal.target&&(
                <div style={{fontSize:10,color:C.t2,fontFamily:F,marginTop:2}}>
                  {fp(goal.target-Math.max(netSavings,0))+' to go'}
                </div>
              )}
            </div>
          );
        })}

        <button onClick={function(){setShowAddGoal(true);}}
          style={{width:'100%',background:'none',border:'1px dashed '+C.borderMid,borderRadius:14,padding:'14px',fontSize:13,fontWeight:700,color:C.t2,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8,fontFamily:F,marginTop:4}}>
          <Plus size={16} color={C.cyan}/> Add Savings Goal
        </button>

        {/* ── Debt Tracker ── */}
        <div style={{marginTop:24,marginBottom:10}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
            <div>
              <div style={{fontSize:9.5,fontWeight:800,color:C.t2,letterSpacing:'0.12em',textTransform:'uppercase',fontFamily:F}}>Debt Payoff</div>
              <div style={{fontSize:15,fontWeight:800,color:C.text,fontFamily:F}}>Loans & Liabilities</div>
            </div>
            {totalDebt>0&&<div style={{fontSize:14,fontWeight:900,color:C.red,fontFamily:F}}>{fp(totalDebt)}</div>}
          </div>

          {debts.length===0&&<div style={{textAlign:'center',padding:'16px 0',color:C.t3,fontSize:12,fontFamily:F}}>No debts tracked. Add one below.</div>}

          {debts.map(function(d){
            var paidOff=d.originalAmount>0?Math.min(((d.originalAmount-d.currentBalance)/d.originalAmount)*100,100):0;
            var monthsLeft=d.monthlyPayment>0?Math.ceil(d.currentBalance/d.monthlyPayment):null;
            var done=d.currentBalance<=0;
            var Icon=getIconById(d.iconId);
            return (
              <div key={d.id} style={{background:done?C.green+'08':C.card,borderRadius:18,border:'1px solid '+(done?C.green+'30':C.red+'25'),padding:'16px',marginBottom:10,boxShadow:done?'0 0 20px rgba(46,204,113,0.08)':'none'}}>
                <div style={{display:'flex',alignItems:'flex-start',gap:12,marginBottom:12}}>
                  <div style={{width:42,height:42,borderRadius:13,background:done?C.green+'18':d.color+'15',border:'1px solid '+(done?C.green+'30':d.color+'30'),display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    {done?<Check size={18} color={C.green} strokeWidth={3}/>:<Icon size={18} color={d.color}/>}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14,fontWeight:800,color:done?C.green:C.text,fontFamily:F,marginBottom:3}}>{d.name}</div>
                    <div style={{display:'flex',gap:12}}>
                      <div style={{fontSize:10,color:C.t2,fontFamily:F}}>Balance: <span style={{color:done?C.green:C.red,fontWeight:700}}>{fp(d.currentBalance)}</span></div>
                      {d.interestRate>0&&<div style={{fontSize:10,color:C.t2,fontFamily:F}}>APR: <span style={{color:C.amber,fontWeight:700}}>{d.interestRate}%</span></div>}
                      {d.monthlyPayment>0&&<div style={{fontSize:10,color:C.t2,fontFamily:F}}>{fp(d.monthlyPayment)}/mo</div>}
                    </div>
                  </div>
                  <div style={{display:'flex',gap:5,flexShrink:0}}>
                    <button onClick={function(){setEditingDebt(d);}} style={{background:'none',border:'1px solid '+C.border,borderRadius:8,padding:'5px 8px',cursor:'pointer'}}><Edit3 size={12} color={C.t2}/></button>
                    <button onClick={function(){onDeleteDebt(d.id);}} style={{background:'none',border:'1px solid '+C.red+'30',borderRadius:8,padding:'5px 8px',cursor:'pointer'}}><Trash2 size={12} color={C.red}/></button>
                  </div>
                </div>
                <div style={{marginBottom:6}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                    <div style={{fontSize:10,color:C.t2,fontFamily:F}}>Paid off</div>
                    <div style={{fontSize:11,fontWeight:800,color:done?C.green:C.text,fontFamily:F}}>{paidOff.toFixed(0)+'% of '+fp(d.originalAmount)}</div>
                  </div>
                  <div style={{height:5,background:C.border,borderRadius:99,overflow:'hidden'}}>
                    <div style={{height:'100%',borderRadius:99,width:paidOff+'%',background:done?C.green:d.color,transition:'width 0.9s cubic-bezier(0.4,0,0.2,1)'}}/>
                  </div>
                </div>
                {!done&&monthsLeft!==null&&(
                  <div style={{fontSize:10,color:C.t2,fontFamily:F}}>Est. {monthsLeft} month{monthsLeft===1?'':'s'} to payoff at current rate</div>
                )}
                {done&&<div style={{fontSize:10,fontWeight:700,color:C.green,fontFamily:F}}>Paid off!</div>}
              </div>
            );
          })}

          <button onClick={function(){setShowAddDebt(true);}}
            style={{width:'100%',background:'none',border:'1px dashed '+C.borderMid,borderRadius:14,padding:'14px',fontSize:13,fontWeight:700,color:C.t2,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8,fontFamily:F,marginTop:4}}>
            <Plus size={16} color={C.red}/> Add Debt / Loan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{padding:'4px 0 16px'}}>
      <div style={{marginBottom:14}}>
        <Label>Finance</Label>
        <div style={{fontSize:20,fontWeight:900,letterSpacing:'-0.03em',fontFamily:F}}>Money Tracker</div>
      </div>
      {tabBar}
      {activeTab==='overview'     && renderOverview()}
      {activeTab==='transactions' && renderTransactions()}
      {activeTab==='budget'       && renderBudget()}
      {activeTab==='goals'        && renderGoals()}

      {(showAddTx||editingTx) && (
        <AddEditTxSheet onClose={function(){setShowAddTx(false);setEditingTx(null);}}
          onSave={function(t){editingTx?onEditTx(t):onAddTx(t);setShowAddTx(false);setEditingTx(null);}}
          initial={editingTx} incomeCats={incomeCats} expenseCats={expenseCats}
          onManageCats={function(){setShowCats(true);}}/>
      )}
      {showCats && (
        <ManageFinCatsSheet incomeCats={incomeCats} expenseCats={expenseCats}
          onClose={function(){setShowCats(false);}}
          onAddCat={onAddCat} onEditCat={onEditCat} onRemoveCat={onRemoveCat}
          zOverride={115}/>
      )}
      {showAddGoal && (
        <AddEditGoalSheet onClose={function(){setShowAddGoal(false);}}
          onSave={function(g){onAddGoal(g);setShowAddGoal(false);}}/>
      )}
      {editingGoal && (
        <AddEditGoalSheet onClose={function(){setEditingGoal(null);}}
          onSave={function(g){onEditGoal(g);setEditingGoal(null);}}
          initial={editingGoal}/>
      )}
      {showAddDebt && (
        <AddEditDebtSheet onClose={function(){setShowAddDebt(false);}}
          onSave={function(d){onAddDebt(d);setShowAddDebt(false);}}/>
      )}
      {editingDebt && (
        <AddEditDebtSheet onClose={function(){setEditingDebt(null);}}
          onSave={function(d){onEditDebt(d);setEditingDebt(null);}}
          initial={editingDebt}/>
      )}
    </div>
  );
}

// ── Auth helpers ──────────────────────────────────────────────
var AUTH_KEY    = 'ferios_auth_v1';
var SESSION_KEY = 'ferios_session_v1';
function getStoredPw()   { try { return localStorage.getItem(AUTH_KEY)||null; }  catch(e){ return null; } }
function hasSession()    { try { return localStorage.getItem(SESSION_KEY)==='1'; } catch(e){ return false; } }
function startSession()  { try { localStorage.setItem(SESSION_KEY,'1'); }  catch(e){} }
function endSession()    { try { localStorage.removeItem(SESSION_KEY); }   catch(e){} }
function savePw(pw)      { try { localStorage.setItem(AUTH_KEY, pw); }     catch(e){} }
function removePw()      { try { localStorage.removeItem(AUTH_KEY); }      catch(e){} }

// ── Password Input ────────────────────────────────────────────
function PwInput({ value, onChange, placeholder, autoFocus }) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <div style={{position:'relative'}}>
      <input
        type={show?'text':'password'} value={value} placeholder={placeholder||'Password'}
        autoFocus={autoFocus}
        onChange={function(e){ onChange(e.target.value); }}
        onFocus={function(){ setFocused(true); }}
        onBlur={function(){ setFocused(false); }}
        style={{width:'100%',boxSizing:'border-box',background:'rgba(255,255,255,0.06)',border:'1px solid '+(focused?C.pink:C.border),borderRadius:14,padding:'15px 48px 15px 18px',fontSize:16,color:C.text,fontFamily:F,fontWeight:600,outline:'none',letterSpacing:show?'normal':'0.2em',transition:'border-color 0.2s'}}
      />
      <button onClick={function(){ setShow(!show); }}
        style={{position:'absolute',right:14,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',padding:4,display:'flex',alignItems:'center'}}>
        {show?<EyeOff size={18} color={C.t2}/>:<Eye size={18} color={C.t2}/>}
      </button>
    </div>
  );
}

// ── Lock Screen ───────────────────────────────────────────────
function LockScreen({ onUnlock }) {
  const hasPw       = !!getStoredPw();
  const [mode,   setMode]    = useState(hasPw?'unlock':'setup'); // 'setup'|'unlock'
  const [pw,     setPw]      = useState('');
  const [confirm,setConfirm] = useState('');
  const [error,  setError]   = useState('');
  const [shake,  setShake]   = useState(false);

  function doShake() {
    setShake(true); setTimeout(function(){ setShake(false); }, 500);
  }

  function handleUnlock() {
    if (!pw) return;
    if (pw === getStoredPw()) { startSession(); onUnlock(); }
    else { setError('Incorrect password.'); setPw(''); doShake(); }
  }

  function handleSetup() {
    if (pw.length < 4) { setError('Must be at least 4 characters.'); return; }
    if (pw !== confirm) { setError('Passwords do not match.'); doShake(); return; }
    savePw(pw); startSession(); onUnlock();
  }

  function handleKey(e) { if (e.key==='Enter') mode==='unlock'?handleUnlock():handleSetup(); }

  return (
    <div style={{position:'absolute',inset:0,background:C.bg,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'0 32px',zIndex:500}}>
      <style>{`.shake{animation:shakeX 0.4s ease;}@keyframes shakeX{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}`}</style>

      {/* Dog avatar */}
      <div style={{width:90,height:90,borderRadius:26,overflow:'hidden',backgroundImage:'url(/dog.jpg)',backgroundSize:'140%',backgroundPosition:'center 28%',border:'3px solid rgba(255,255,255,0.12)',boxShadow:'0 8px 32px rgba(0,0,0,0.5)',marginBottom:20}}/>

      {/* Branding */}
      <div style={{fontSize:26,fontWeight:900,letterSpacing:'-0.03em',fontFamily:F,marginBottom:4}}>
        FERI<span style={{color:C.pink}}>OS</span>
      </div>
      <div style={{fontSize:11,fontWeight:600,color:C.t2,letterSpacing:'0.12em',fontFamily:F,marginBottom:36}}>
        {mode==='setup'?'SET YOUR PASSWORD':'LIFE OPERATING SYSTEM'}
      </div>

      {/* Form */}
      <div className={shake?'shake':''} style={{width:'100%',display:'flex',flexDirection:'column',gap:12}}>
        {mode==='setup' && (
          <div>
            <div style={{fontSize:10,fontWeight:700,color:C.t2,letterSpacing:'0.1em',fontFamily:F,marginBottom:6}}>CREATE PASSWORD</div>
            <PwInput value={pw} onChange={setPw} placeholder="New password" autoFocus/>
          </div>
        )}
        {mode==='setup' && (
          <div>
            <div style={{fontSize:10,fontWeight:700,color:C.t2,letterSpacing:'0.1em',fontFamily:F,marginBottom:6}}>CONFIRM PASSWORD</div>
            <PwInput value={confirm} onChange={setConfirm} placeholder="Confirm password"/>
          </div>
        )}
        {mode==='unlock' && (
          <div>
            <div style={{fontSize:10,fontWeight:700,color:C.t2,letterSpacing:'0.1em',fontFamily:F,marginBottom:6}}>PASSWORD</div>
            <PwInput value={pw} onChange={function(v){ setPw(v); setError(''); }} placeholder="Enter password" autoFocus/>
          </div>
        )}

        {error && (
          <div style={{fontSize:12,fontWeight:600,color:C.red,fontFamily:F,textAlign:'center',padding:'4px 0'}}>{error}</div>
        )}

        <button
          onClick={mode==='unlock'?handleUnlock:handleSetup}
          onKeyDown={handleKey}
          disabled={mode==='unlock'?!pw:(!pw||!confirm)}
          style={{width:'100%',background:C.pink,border:'none',borderRadius:14,padding:'16px 0',fontSize:15,fontWeight:900,letterSpacing:'0.05em',fontFamily:F,cursor:'pointer',color:'#000',boxShadow:'0 6px 28px '+C.pinkGlow,marginTop:4,opacity:(!pw||(mode==='setup'&&!confirm))?0.5:1,transition:'opacity 0.2s'}}>
          {mode==='unlock'?'Unlock':'Set Password'}
        </button>

        {mode==='unlock' && (
          <div style={{textAlign:'center',fontSize:11,color:C.t3,fontFamily:F,marginTop:4}}>
            Forgot your password?{' '}
            <span onClick={function(){
              if(window.confirm('This will remove your password and unlock the app. Continue?')){
                removePw(); endSession(); onUnlock();
              }
            }} style={{color:C.pink,cursor:'pointer',fontWeight:700}}>Reset</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Change Password Sheet ─────────────────────────────────────
function ChangePasswordSheet({ onClose, onChanged }) {
  const hasPw       = !!getStoredPw();
  const [currentPw, setCurrentPw] = useState('');
  const [newPw,     setNewPw]     = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [error,     setError]     = useState('');
  const [removing,  setRemoving]  = useState(false);

  function handleSave() {
    if (hasPw && currentPw !== getStoredPw()) { setError('Current password is incorrect.'); return; }
    if (newPw.length < 4) { setError('New password must be at least 4 characters.'); return; }
    if (newPw !== confirmPw) { setError('Passwords do not match.'); return; }
    savePw(newPw);
    endSession();
    onChanged();
  }

  function handleRemove() {
    if (hasPw && currentPw !== getStoredPw()) { setError('Current password is incorrect.'); return; }
    removePw(); endSession(); onChanged();
  }

  return (
    <Sheet onClose={onClose} title={hasPw?'Change Password':'Set Password'}>
      {hasPw && (
        <div style={{marginBottom:14}}>
          <Label>Current Password</Label>
          <PwInput value={currentPw} onChange={function(v){ setCurrentPw(v); setError(''); }} placeholder="Current password" autoFocus/>
        </div>
      )}
      {!removing && (
        <>
          <div style={{marginBottom:14}}>
            <Label>{hasPw?'New Password':'Password'}</Label>
            <PwInput value={newPw} onChange={function(v){ setNewPw(v); setError(''); }} placeholder="New password" autoFocus={!hasPw}/>
          </div>
          <div style={{marginBottom:4}}>
            <Label>Confirm {hasPw?'New ':''} Password</Label>
            <PwInput value={confirmPw} onChange={function(v){ setConfirmPw(v); setError(''); }} placeholder="Confirm password"/>
          </div>
          {error && <div style={{fontSize:12,color:C.red,fontFamily:F,margin:'8px 0',textAlign:'center'}}>{error}</div>}
          <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:16}}>
            <Btn onClick={handleSave} disabled={!newPw||!confirmPw||(hasPw&&!currentPw)}>
              {hasPw?'Update Password — You will be logged out':'Set Password'}
            </Btn>
            {hasPw && (
              <button onClick={function(){ setRemoving(true); setError(''); }}
                style={{background:'none',border:'1px solid '+C.red+'30',borderRadius:14,padding:'12px 0',fontSize:13,fontWeight:700,color:C.red,cursor:'pointer',fontFamily:F}}>
                Remove Password
              </button>
            )}
            <Btn ghost onClick={onClose}>Cancel</Btn>
          </div>
        </>
      )}
      {removing && (
        <div>
          <div style={{textAlign:'center',padding:'16px 0 20px'}}>
            <div style={{fontSize:14,fontWeight:700,color:C.text,fontFamily:F,marginBottom:6}}>Remove password protection?</div>
            <div style={{fontSize:12,color:C.t2,fontFamily:F}}>Anyone with access to this device will be able to open the app.</div>
          </div>
          {error && <div style={{fontSize:12,color:C.red,fontFamily:F,marginBottom:12,textAlign:'center'}}>{error}</div>}
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            <button onClick={handleRemove}
              style={{width:'100%',background:C.red,border:'none',borderRadius:14,padding:'14px 0',fontSize:14,fontWeight:800,color:'#fff',cursor:'pointer',fontFamily:F}}>
              Yes, Remove Password
            </button>
            <Btn ghost onClick={function(){ setRemoving(false); setError(''); }}>Cancel</Btn>
          </div>
        </div>
      )}
    </Sheet>
  );
}

function Toast({ msg, visible }) {
  return (
    <div style={{position:'absolute',top:12,left:'50%',zIndex:200,background:C.pink,color:'#000',borderRadius:99,padding:'10px 22px',fontSize:11.5,fontWeight:800,letterSpacing:'0.05em',fontFamily:F,whiteSpace:'nowrap',pointerEvents:'none',transition:'opacity 0.2s cubic-bezier(0.4,0,0.2,1), transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',opacity:visible?1:0,transform:'translateX(-50%) translateY('+(visible?0:-12)+'px) scale('+(visible?1:0.92)+')',boxShadow:'0 6px 28px '+C.pinkGlow+', 0 2px 8px rgba(0,0,0,0.4)'}}>
      {msg}
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────
export default function FeriOS() {
  const saved = loadSaved();

  const [tab,      setTab]     = useState('home');
  const [rings,    setRings]   = useState(saved?.rings    || INIT_RINGS);
  const [goals,    setGoals]   = useState(saved?.goals    || INIT_GOALS);
  const [sessions, setSess]    = useState(saved?.sessions || DEMO);
  const [streak,   setStreak]  = useState(saved?.streak   ?? 0);
  const [xp,       setXp]      = useState(saved?.xp       ?? BASE.xp);
  const [wallet,   setWallet]  = useState(saved?.wallet   ?? BASE.wallet);
  const [badges,       setBadges]      = useState(saved?.badges       || INIT_BADGES);
  const [rewards,      setRewards]     = useState(saved?.rewards      || INIT_REWARDS);
  const [transactions, setTransactions]= useState(saved?.transactions || INIT_TRANSACTIONS);
  const [incomeCats,   setIncomeCats]  = useState(saved?.incomeCats   || INIT_INCOME_CATS);
  const [expenseCats,  setExpenseCats] = useState(saved?.expenseCats  || INIT_EXPENSE_CATS);
  const [budgets,      setBudgets]     = useState(saved?.budgets      || INIT_BUDGETS);
  const [savingsGoals, setSavingsGoals]= useState(saved?.savingsGoals || INIT_SAVINGS_GOALS);
  const [debts,        setDebts]       = useState(saved?.debts        || INIT_DEBTS);
  const [modal,        setModal]       = useState(null);
  const [toast,        setToast]       = useState({msg:'',visible:false});
  const [finTxSignal,  setFinTxSignal] = useState(0);
  const [lvlUpMsg,     setLvlUpMsg]    = useState(null);
  const [authenticated,setAuthenticated]= useState(function(){ return !getStoredPw()||hasSession(); });
  const [showChangePw, setShowChangePw] = useState(false);

  function handleExport() {
    var data = { rings, goals, sessions, streak, xp, wallet, badges, rewards,
                 transactions, incomeCats, expenseCats, budgets, savingsGoals, debts,
                 exportedAt: new Date().toISOString() };
    var blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
    var url  = URL.createObjectURL(blob);
    var a    = document.createElement('a');
    a.href   = url;
    a.download = 'ferios-backup-' + todayStr() + '.json';
    a.click();
    URL.revokeObjectURL(url);
    fire('Backup downloaded!');
  }

  function handleImport() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
      var file = e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function(ev) {
        try {
          var d = JSON.parse(ev.target.result);
          if (d.rings)         setRings(d.rings);
          if (d.goals)         setGoals(d.goals);
          if (d.sessions)      setSess(d.sessions);
          if (d.streak != null) setStreak(d.streak);
          if (d.xp     != null) setXp(d.xp);
          if (d.wallet != null) setWallet(d.wallet);
          if (d.badges)        setBadges(d.badges);
          if (d.rewards)       setRewards(d.rewards);
          if (d.transactions)  setTransactions(d.transactions);
          if (d.incomeCats)    setIncomeCats(d.incomeCats);
          if (d.expenseCats)   setExpenseCats(d.expenseCats);
          if (d.budgets)       setBudgets(d.budgets);
          if (d.savingsGoals)  setSavingsGoals(d.savingsGoals);
          if (d.debts)         setDebts(d.debts);
          fire('Data restored from backup!');
        } catch(err) { fire('Invalid backup file.'); }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  // Persist all state to localStorage on every change
  useEffect(function(){
    saveState({ rings, goals, sessions, streak, xp, wallet, badges, rewards,
                transactions, incomeCats, expenseCats, budgets, savingsGoals, debts });
  }, [rings, goals, sessions, streak, xp, wallet, badges, rewards,
      transactions, incomeCats, expenseCats, budgets, savingsGoals, debts]);

  // Load font (guard against duplicate injection)
  useEffect(function(){
    var href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap';
    if (!document.querySelector('link[href="'+href+'"]')) {
      var l = document.createElement('link');
      l.rel  = 'stylesheet';
      l.href = href;
      document.head.appendChild(l);
    }
  }, []);

  function fire(msg) {
    setToast({msg:msg, visible:true});
    setTimeout(function(){ setToast(function(t){ return {msg:t.msg, visible:false}; }); }, 2500);
  }

  function gain(amt, msg) {
    setXp(function(prev){
      const before = getLevelInfo(prev);
      const next   = prev + amt;
      const after  = getLevelInfo(next);
      if (after.level > before.level) {
        setTimeout(function(){ fire('LEVEL UP!  You are now Level '+after.level); }, 600);
      }
      return next;
    });
    setWallet(function(p){ return p + amt; });
    fire(msg);
  }

  function handleRingTap(i) {
    const r = rings[i];
    if (r.done >= r.target) {
      setRings(function(p){ return p.map(function(x,j){ return j===i ? Object.assign({},x,{done:0}) : x; }); });
      fire('Ring reset');
      return;
    }
    const next = r.done+1;
    const newR = rings.map(function(x,j){ return j===i ? Object.assign({},x,{done:next}) : x; });
    setRings(newR);
    gain(r.xp, next>=r.target ? r.label+' ring closed  +'+r.xp+' XP' : '+'+r.xp+' XP · '+r.label);
    if (next>=r.target && newR.every(function(x){ return x.done>=x.target; }))
      setTimeout(function(){ fire('All rings closed — legendary week!'); }, 700);
  }

  function handleSim() {
    if (streak >= 3) { setStreak(1); fire('Streak reset — logged today!'); }
    else { setStreak(function(s){ return s+1; }); if(streak+1>=3) setTimeout(function(){ fire('3-day streak — keep it going!'); },400); }
  }

  function handleLog(session) {
    setSess(function(p){ return [session].concat(p).slice(0,20); });
    gain(session.xp, session.name+'  +'+session.xp+' XP');
    // Advance streak on every logged session (cap at 3)
    setStreak(function(s){ return Math.min(s + 1, 3); });
    const rid = detectRingFromRings(session.name, rings);
    if (rid) {
      const m = rings.find(function(r){ return r.id===rid; });
      if (m && m.done < m.target) {
        setRings(function(p){ return p.map(function(r){ return r.id===rid ? Object.assign({},r,{done:r.done+1}) : r; }); });
        setTimeout(function(){ fire(m.label+' ring auto-incremented'); }, 700);
      }
    }
    setModal(null);
  }

  function handleGoalDataSave(goalId, newData) {
    setGoals(function(gs){ return gs.map(function(g){ return g.id===goalId ? Object.assign({},g,{data:newData}) : g; }); });
  }

  // Rings CRUD
  function handleAddRing(r) {
    setRings(function(p){ return p.concat([r]); });
    fire(r.label+' added');
  }
  function handleEditRing(id, updates) {
    setRings(function(p){ return p.map(function(r){ return r.id===id ? Object.assign({},r,updates) : r; }); });
    fire('Activity updated');
  }
  function handleRemoveRing(id) {
    setRings(function(p){ return p.filter(function(r){ return r.id!==id; }); });
    fire('Activity removed');
  }

  // Goals CRUD
  function handleAddGoal(g) {
    setGoals(function(p){ return p.concat([g]); });
    fire(g.label+' added');
  }
  function handleEditGoal(id, updates) {
    setGoals(function(p){ return p.map(function(g){ return g.id===id ? Object.assign({},g,updates) : g; }); });
    fire('Goal updated');
  }
  function handleRemoveGoal(id) {
    setGoals(function(p){ return p.filter(function(g){ return g.id!==id; }); });
    fire('Goal removed');
  }

  // Badges CRUD
  function handleAddBadge(b) { setBadges(function(p){ return p.concat([b]); }); fire(b.n+' trophy added'); }
  function handleEditBadge(id, updates) { setBadges(function(p){ return p.map(function(b){ return b.id===id?Object.assign({},b,updates):b; }); }); fire('Trophy updated'); }
  function handleToggleBadge(id) {
    setBadges(function(p){ return p.map(function(b){
      if (b.id!==id) return b;
      const next = !b.manualUnlocked;
      return Object.assign({},b,{manualUnlocked:next, earnedDate:next?new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}):null});
    }); });
  }
  function handleRemoveBadge(id) { setBadges(function(p){ return p.filter(function(b){ return b.id!==id; }); }); fire('Trophy removed'); }

  // Finance — transactions
  function handleAddTx(t) { setTransactions(function(p){ return [t].concat(p); }); gain(10, t.type==='income'?'Income logged  +10 XP':'Expense logged  +10 XP'); }
  function handleEditTx(t) { setTransactions(function(p){ return p.map(function(x){ return x.id===t.id?t:x; }); }); fire('Transaction updated'); }
  function handleDeleteTx(id) { setTransactions(function(p){ return p.filter(function(t){ return t.id!==id; }); }); fire('Deleted'); }
  // Finance — categories
  function handleAddCat(type,c)        { type==='income'?setIncomeCats(function(p){return p.concat([c]);}):setExpenseCats(function(p){return p.concat([c]);}); fire('Category added'); }
  function handleEditCat(type,id,upd)  { type==='income'?setIncomeCats(function(p){return p.map(function(c){return c.id===id?Object.assign({},c,upd):c;});}):setExpenseCats(function(p){return p.map(function(c){return c.id===id?Object.assign({},c,upd):c;})}); fire('Category updated'); }
  function handleRemoveCat(type,id)    { type==='income'?setIncomeCats(function(p){return p.filter(function(c){return c.id!==id;});}):setExpenseCats(function(p){return p.filter(function(c){return c.id!==id;})}); fire('Category removed'); }
  // Finance — budgets
  function handleSetBudget(catId,amt)  { setBudgets(function(p){ return Object.assign({},p,{[catId]:amt}); }); fire('Budget updated'); }
  // Finance — savings goals
  function handleAddSavingsGoal(g)   { setSavingsGoals(function(p){ return p.concat([g]); }); fire('Goal created'); }
  function handleEditSavingsGoal(g)  { setSavingsGoals(function(p){ return p.map(function(x){ return x.id===g.id?g:x; }); }); fire('Goal updated'); }
  function handleDeleteSavingsGoal(id){ setSavingsGoals(function(p){ return p.filter(function(g){ return g.id!==id; }); }); fire('Goal removed'); }
  // Debt CRUD
  function handleAddDebt(d)   { setDebts(function(p){ return p.concat([d]); }); fire(d.name+' added'); }
  function handleEditDebt(d)  { setDebts(function(p){ return p.map(function(x){ return x.id===d.id?d:x; }); }); fire('Debt updated'); }
  function handleDeleteDebt(id){ setDebts(function(p){ return p.filter(function(d){ return d.id!==id; }); }); fire('Debt removed'); }

  function handleGoalAchieved(goalId) {
    const goal = savingsGoals.find(function(g){ return g.id===goalId; });
    if (!goal||goal.trophyAdded) return;
    setSavingsGoals(function(p){ return p.map(function(g){ return g.id===goalId?Object.assign({},g,{achieved:true,trophyAdded:true}):g; }); });
    handleAddBadge({
      id:'savings_'+goalId, iconId:'TrendingUp',
      n:goal.label+' Reached', d:'Saved '+fp(goal.target)+' — savings goal achieved!',
      rarity:'epic', autoKey:null, manualUnlocked:true,
      earnedDate:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),
      custom:true, cat:'Professional',
    });
    gain(500, goal.label+' goal reached!  +500 XP');
  }

  // Rewards CRUD
  function handleAddReward(r) { setRewards(function(p){ return p.concat([r]); }); fire(r.n+' reward added'); }
  function handleEditReward(id, updates) { setRewards(function(p){ return p.map(function(r){ return r.id===id?Object.assign({},r,updates):r; }); }); fire('Reward updated'); }
  function handleRemoveReward(id) { setRewards(function(p){ return p.filter(function(r){ return r.id!==id; }); }); fire('Reward removed'); }

  const H      = 62;
  const N      = 66;
  const lvInfo = getLevelInfo(xp);
  const pct    = lvInfo.pct;
  const nav = [
    {id:'home',     Icon:Home,        l:'Home'},
    {id:'vault',    Icon:Trophy,      l:'Vault'},
    {id:'exchange', Icon:ShoppingBag, l:'Exchange'},
    {id:'finance',  Icon:Banknote,    l:'Finance'},
  ];

  const activeGoalId = modal && typeof modal === 'object' && modal.type==='goal' ? modal.id : null;
  const activeGoal = activeGoalId ? goals.find(function(g){ return g.id===activeGoalId; }) : null;

  // Show lock screen when not authenticated
  if (!authenticated) {
    return (
      <div style={{position:'relative',height:'100dvh',minHeight:600,background:C.bg,overflow:'hidden',width:460,maxWidth:'100vw',margin:'0 auto',borderRadius:0,color:C.text,fontFamily:F,WebkitFontSmoothing:'antialiased'}}>
        <style>{`.shake{animation:shakeX 0.4s ease;}@keyframes shakeX{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}`}</style>
        <LockScreen onUnlock={function(){ setAuthenticated(true); }}/>
      </div>
    );
  }

  return (
    <div style={{position:'relative',height:'100dvh',minHeight:600,background:C.bg,overflow:'hidden',width:460,maxWidth:'100vw',margin:'0 auto',borderRadius:0,color:C.text,fontFamily:F,WebkitFontSmoothing:'antialiased'}}>
      <style>{`
        @keyframes flame{0%,100%{transform:scaleY(1) scaleX(1) rotate(-2deg);transform-origin:50% 90%}33%{transform:scaleY(1.08) scaleX(0.95) rotate(1.5deg);transform-origin:50% 90%}66%{transform:scaleY(0.95) scaleX(1.06) rotate(-1.5deg);transform-origin:50% 90%}}
        @keyframes slideUp{from{transform:translateY(32px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes ringPop{0%{transform:scale(1)}50%{transform:scale(1.18)}100%{transform:scale(1)}}
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        @keyframes fabPulse{0%,100%{box-shadow:0 8px 32px rgba(255,45,120,0.28),0 2px 12px rgba(255,45,120,0.18)}50%{box-shadow:0 8px 42px rgba(255,45,120,0.44),0 2px 16px rgba(255,45,120,0.28)}}
        .flame{animation:flame 1.3s ease-in-out infinite;display:flex;align-items:center;justify-content:center}
        .sheet-slide{animation:slideUp 0.32s cubic-bezier(0.22,1,0.36,1) both}
        .ring-complete{animation:ringPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both}
        .shimmer-bar{background-size:200% auto;background-image:linear-gradient(90deg,currentColor 0%,rgba(255,255,255,0.4) 50%,currentColor 100%)}
        .fab-glow{animation:fabPulse 2.5s ease-in-out infinite}
        .btn-primary:hover{opacity:0.9}
        .btn-primary:active{opacity:0.8;transform:scale(0.98)}
        .scr::-webkit-scrollbar{display:none}.scr{scrollbar-width:none;-ms-overflow-style:none}
        .ring-cell{cursor:pointer;border-radius:14px;padding:8px 2px;transition:background 0.18s,transform 0.12s}
        .ring-cell:hover{background:rgba(255,255,255,0.04)}.ring-cell:active{transform:scale(0.93)}
        .lrow{transition:background 0.15s,opacity 0.15s;border-radius:12px;margin:0 -8px;padding-left:8px!important;padding-right:8px!important}
        .lrow:hover{background:rgba(255,255,255,0.025)}.lrow:active{opacity:0.7}
        .gear-btn{transition:background 0.15s,transform 0.15s}.gear-btn:hover{background:rgba(255,255,255,0.05)!important}.gear-btn:active{transform:rotate(30deg)}
        button:active{transform:scale(0.97)}
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}
        input[type=number]{-moz-appearance:textfield}
        input::placeholder,textarea::placeholder{color:#36363B}
        input[type=range]{-webkit-appearance:none;appearance:none;background:transparent;height:4px}
        input[type=range]::-webkit-slider-track{height:4px;border-radius:99px;background:#242428}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:currentColor;margin-top:-9px;cursor:pointer;border:2px solid #0A0A0C;box-shadow:0 0 8px currentColor}
        @media(prefers-reduced-motion:reduce){.flame,.sheet-slide,.ring-complete,.fab-glow{animation:none!important}.shimmer-bar{background-image:none!important}}
      `}</style>

      <Toast msg={toast.msg} visible={toast.visible} />

      {/* Header */}
      <div style={{position:'absolute',top:0,left:0,right:0,height:H,zIndex:50,background:'rgba(10,10,12,0.97)',borderBottom:'1px solid '+C.border,padding:'0 18px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:36,height:36,borderRadius:11,overflow:'hidden',flexShrink:0,backgroundImage:'url(/dog.jpg)',backgroundSize:'140%',backgroundPosition:'center 28%',border:'2px solid rgba(255,255,255,0.12)',boxShadow:'0 2px 10px rgba(0,0,0,0.4)'}} />
          <div style={{fontSize:17,fontWeight:900,letterSpacing:'-0.03em',lineHeight:1,whiteSpace:'nowrap'}}>FERI<span style={{color:C.pink}}>OS</span></div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{display:'flex',alignItems:'center',gap:5,background:C.card,border:'1px solid '+C.border,borderRadius:99,padding:'5px 10px',whiteSpace:'nowrap'}}>
            <Wallet size={12} color={C.t2} />
            <span style={{fontSize:12,fontWeight:800,fontFamily:F}}>{wallet>=10000?(wallet/1000).toFixed(0)+'K':wallet.toLocaleString()}</span>
            <span style={{fontSize:9,fontWeight:600,color:C.t2}}>XP</span>
          </div>
          <div style={{background:C.pink,borderRadius:10,padding:'5px 10px',fontSize:11,fontWeight:900,color:'#000',letterSpacing:'0.04em',fontFamily:F,whiteSpace:'nowrap'}}>{'LVL '+lvInfo.level}</div>
          <button onClick={handleExport} title="Backup data"
            style={{background:'none',border:'1px solid '+C.border,borderRadius:9,padding:'6px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Download size={13} color={C.t2}/>
          </button>
          <button onClick={handleImport} title="Restore backup"
            style={{background:'none',border:'1px solid '+C.border,borderRadius:9,padding:'6px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Upload size={13} color={C.t2}/>
          </button>
          <button onClick={function(){ setShowChangePw(true); }} className="gear-btn"
            style={{background:'none',border:'1px solid '+C.border,borderRadius:9,padding:'6px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Lock size={13} color={C.t2}/>
          </button>
        </div>
      </div>

      {/* XP Bar */}
      <div style={{position:'absolute',top:H,left:0,right:0,height:4,zIndex:49,background:C.card2}}>
        <div style={{height:'100%',width:pct+'%',background:C.pink,transition:'width 0.9s ease'}} />
      </div>

      {/* Scroll area */}
      <div className="scr" style={{position:'absolute',top:H+4,bottom:N,left:0,right:0,overflowY:'auto',padding:'18px 16px 100px'}}>
        {tab==='home'     && <HomeScreen rings={rings} goals={goals} streak={streak} sessions={sessions}
          onRingTap={handleRingTap}
          openModal={function(m){ setModal(m); }}
          openGoalModal={function(id){ setModal({type:'goal',id}); }}
          openManageRings={function(){ setModal('manageRings'); }}
          openManageGoals={function(){ setModal('manageGoals'); }}
        />}
        {tab==='vault'    && <VaultScreen goals={goals} sessions={sessions} streak={streak} rings={rings} badges={badges} onManage={function(){ setModal('manageBadges'); }} onToggle={handleToggleBadge} />}
        {tab==='finance'  && <FinanceScreen transactions={transactions} incomeCats={incomeCats} expenseCats={expenseCats} budgets={budgets} savingsGoals={savingsGoals} debts={debts} onAddTx={handleAddTx} onEditTx={handleEditTx} onDeleteTx={handleDeleteTx} onAddCat={handleAddCat} onEditCat={handleEditCat} onRemoveCat={handleRemoveCat} onSetBudget={handleSetBudget} onAddGoal={handleAddSavingsGoal} onEditGoal={handleEditSavingsGoal} onDeleteGoal={handleDeleteSavingsGoal} onGoalAchieved={handleGoalAchieved} onAddDebt={handleAddDebt} onEditDebt={handleEditDebt} onDeleteDebt={handleDeleteDebt} addTxSignal={finTxSignal}/>}
        {tab==='exchange' && <ExchangeScreen wallet={wallet} rewards={rewards} onManage={function(){ setModal('manageRewards'); }} />}
      </div>

      {/* Context-aware FAB */}
      {tab !== 'finance' && (
        <div style={{position:'absolute',bottom:N+14,left:'50%',transform:'translateX(-50%)',zIndex:60}}>
          <button onClick={function(){ setModal('log'); }} className="fab-glow"
            style={{background:C.pink,color:'#000',border:'none',borderRadius:18,padding:'14px 30px',fontSize:13,fontWeight:900,letterSpacing:'0.06em',fontFamily:F,cursor:'pointer',boxShadow:'0 8px 32px '+C.pinkGlow+', 0 2px 12px rgba(255,45,120,0.2)',display:'flex',alignItems:'center',gap:9,whiteSpace:'nowrap',minHeight:50}}>
            <Plus size={16} color="#000" strokeWidth={3} /> LOG ACTIVITY
          </button>
        </div>
      )}
      {tab === 'finance' && (
        <div style={{position:'absolute',bottom:N+14,left:'50%',transform:'translateX(-50%)',zIndex:60}}>
          <button onClick={function(){ setFinTxSignal(function(n){ return n+1; }); }} className="fab-glow"
            style={{background:C.cyan,color:'#000',border:'none',borderRadius:18,padding:'14px 26px',fontSize:13,fontWeight:900,letterSpacing:'0.06em',fontFamily:F,cursor:'pointer',boxShadow:'0 8px 32px rgba(0,207,255,0.32), 0 2px 12px rgba(0,207,255,0.18)',display:'flex',alignItems:'center',gap:9,whiteSpace:'nowrap',minHeight:50}}>
            <Plus size={16} color="#000" strokeWidth={3} /> LOG TRANSACTION
          </button>
        </div>
      )}

      {/* Bottom nav */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:N,zIndex:50,background:'rgba(8,8,10,0.98)',borderTop:'1px solid '+C.border,display:'flex',alignItems:'center',padding:'0 10px',gap:6}}>
        {nav.map(function(n){
          const Icon = n.Icon;
          const active = tab === n.id;
          return (
            <button key={n.id} onClick={function(){ setTab(n.id); }}
              style={{flex:1,background:active?C.pinkBg:'transparent',border:'1px solid '+(active?C.pink+'28':'transparent'),borderRadius:14,padding:'10px 0',cursor:'pointer',fontFamily:F,display:'flex',flexDirection:'column',alignItems:'center',gap:4,transition:'all 0.2s cubic-bezier(0.4,0,0.2,1)',minHeight:44,boxShadow:active?'0 0 20px rgba(255,45,120,0.06) inset':'none'}}>
              <Icon size={20} color={active ? C.pink : C.t3} />
              <span style={{fontSize:9,fontWeight:active?800:700,letterSpacing:'0.07em',color:active?C.pink:C.t3,transition:'color 0.2s'}}>{n.l.toUpperCase()}</span>
            </button>
          );
        })}
      </div>

      {/* Modals */}
      {modal==='log'         && <WildcardModal onLog={handleLog} onClose={function(){ setModal(null); }} rings={rings} />}
      {modal==='manageRings' && <ManageRingsSheet rings={rings} onClose={function(){ setModal(null); }} onAdd={handleAddRing} onEdit={handleEditRing} onRemove={handleRemoveRing} />}
      {modal==='manageGoals'   && <ManageGoalsSheet goals={goals} onClose={function(){ setModal(null); }} onAdd={handleAddGoal} onEdit={handleEditGoal} onRemove={handleRemoveGoal} />}
      {showChangePw && (
        <ChangePasswordSheet
          onClose={function(){ setShowChangePw(false); }}
          onChanged={function(){ setShowChangePw(false); setAuthenticated(false); }}
        />
      )}
      {modal==='manageBadges'  && <ManageBadgesSheet badges={badges} onClose={function(){ setModal(null); }} onAdd={handleAddBadge} onEdit={handleEditBadge} onToggle={handleToggleBadge} onRemove={handleRemoveBadge} />}
      {modal==='manageRewards' && <ManageRewardsSheet rewards={rewards} onClose={function(){ setModal(null); }} onAdd={handleAddReward} onEdit={handleEditReward} onRemove={handleRemoveReward} />}
      {activeGoal            && <GoalModal goal={activeGoal} onSave={handleGoalDataSave} onClose={function(){ setModal(null); }} gain={gain} />}
    </div>
  );
}
