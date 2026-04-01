import { useState, useEffect, useRef } from "react";

const transactions = [
  { id: 1, name: "Airtel Recharge", type: "bill", amount: -299, date: "Mar 5", icon: "📱", category: "Mobile", status: "success", messages: [{from:"me",text:"Done! ✓",time:"10:02"}] },
  { id: 2, name: "Received from Pradeep", type: "receive", amount: +5000, date: "Mar 5", icon: "👤", category: "Transfer", status: "success", messages: [{from:"other",text:"Hey! Sent ₹5000 for the dinner 🍽️",time:"9:15"},{from:"me",text:"Got it, thanks!",time:"9:16"}] },
  { id: 3, name: "Swiggy", type: "food", amount: -480, date: "Mar 4", icon: "🍔", category: "Food", status: "success", messages: [] },
  { id: 4, name: "Netflix", type: "bill", amount: -649, date: "Mar 3", icon: "🎬", category: "Entertainment", status: "success", messages: [] },
  { id: 5, name: "Sent to Gopi", type: "send", amount: -2000, date: "Mar 3", icon: "👤", category: "Transfer", status: "success", messages: [{from:"me",text:"Sent ₹2000 for the trip 🚗",time:"14:30"},{from:"other",text:"Thanks da! Received 👍",time:"14:35"}] },
  { id: 6, name: "Jio DTH", type: "bill", amount: -350, date: "Mar 2", icon: "📺", category: "DTH", status: "success", messages: [] },
  { id: 7, name: "Salary Credit", type: "receive", amount: +85000, date: "Mar 1", icon: "💼", category: "Income", status: "success", messages: [{from:"other",text:"March salary processed ✅",time:"9:00"},{from:"me",text:"Received, thank you!",time:"9:05"}] },
  { id: 8, name: "BSNL Broadband", type: "bill", amount: -999, date: "Feb 28", icon: "🌐", category: "Internet", status: "success", messages: [] },
];

const spendingData = [
  { category: "Food", amount: 3200, color: "#D4A853", pct: 32 },
  { category: "Bills", amount: 2800, color: "#7B9FE0", pct: 28 },
  { category: "Transfer", amount: 2000, color: "#6EC6A0", pct: 20 },
  { category: "Entertainment", amount: 1200, color: "#E07B9F", pct: 12 },
  { category: "Other", amount: 800, color: "#A07BE0", pct: 8 },
];

const contacts = [
  { name: "Pradeep", initials: "PD", color: "#D4A853" },
  { name: "Gopi", initials: "GP", color: "#7B9FE0" },
  { name: "Madan", initials: "MD", color: "#6EC6A0" },
  { name: "Elakkiya", initials: "EL", color: "#E07B9F" },
  { name: "Dhilip", initials: "DH", color: "#A07BE0" },
  { name: "+ Add", initials: "+", color: "#555" },
];

const billServices = [
  { name: "Mobile", icon: "📱", color: "#D4A853" },
  { name: "Internet", icon: "🌐", color: "#7B9FE0" },
  { name: "DTH", icon: "📺", color: "#6EC6A0" },
  { name: "Electricity", icon: "⚡", color: "#E07B9F" },
  { name: "Gas", icon: "🔥", color: "#A07BE0" },
  { name: "Water", icon: "💧", color: "#4CBDC9" },
];

const initNotifications = [
  { id: 1, msg: "₹5,000 received from Pradeep", time: "2h ago", read: false },
  { id: 2, msg: "Airtel recharge of ₹299 successful", time: "5h ago", read: false },
  { id: 3, msg: "Your March statement is ready", time: "1d ago", read: true },
  { id: 4, msg: "5% cashback on DTH bills — claim now!", time: "2d ago", read: true },
];

const initSavingsGoals = [
  { id: 1, name: "New iPhone", target: 80000, saved: 32000, icon: "📱", color: "#D4A853" },
  { id: 2, name: "Goa Trip", target: 30000, saved: 18500, icon: "🏖️", color: "#7B9FE0" },
  { id: 3, name: "Emergency Fund", target: 100000, saved: 65000, icon: "🛡️", color: "#6EC6A0" },
];

const loans = [
  { name: "Home Loan", bank: "HDFC Bank", emi: 22500, remaining: 18, total: 36, outstanding: 405000, color: "#D4A853" },
  { name: "Personal Loan", bank: "ICICI Bank", emi: 5200, remaining: 8, total: 24, outstanding: 41600, color: "#7B9FE0" },
];

const cashbackOffers = [
  { title: "5% on Mobile Recharge", brand: "Airtel / Jio / Vi", expires: "Mar 31", color: "#D4A853", icon: "📱", earned: 149 },
  { title: "10% on Food Orders", brand: "Swiggy / Zomato", expires: "Mar 15", color: "#E07B9F", icon: "🍔", earned: 480 },
  { title: "₹200 on DTH Bills", brand: "Tata Sky / Dish TV", expires: "Mar 20", color: "#6EC6A0", icon: "📺", earned: 200 },
  { title: "2% on Electricity", brand: "All Providers", expires: "Apr 30", color: "#7B9FE0", icon: "⚡", earned: 64 },
];

const currencies = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸", rate: 83.5 },
  { code: "EUR", name: "Euro", flag: "🇪🇺", rate: 90.2 },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", rate: 105.8 },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪", rate: 22.7 },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬", rate: 61.4 },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", rate: 61.1 },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺", rate: 53.8 },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", rate: 0.56 },
];

const QR_PATTERN = [1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,0,1,1,0,1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,1,0,1,1,0,0,1,1,0,1,0,0,1,1,1,1,1,1,1,1,1,0,1,0,0,0,1,0,1,1,0,0,0,1,0,0,1,0,0,1,1,0,0,1,1,1,0,1,0,1,1,1,0,0,1,1,0,0,1,0,0,0,1,1,0,0,1,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,1,1,0,0,1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,0,1,1,0,1,0,1,1,0,1,1,1,0,1,1,0,1,0,1,0,0,1,1,0,0,1,0,1,0,1,1,0,1,0,1,0,0,0,1,0,1,1,1,0,1,1,1,0,0,1,1,0,1,0,0,0,1,0,1,0,1,1,0,1,0,0,1,0,0,0,1,0,0,0,0,0];

const D = {
  dark: {
    bg: "#0A1628", surface: "rgba(255,255,255,0.05)", surfaceHover: "rgba(255,255,255,0.08)",
    border: "rgba(96,165,250,0.15)", borderBright: "rgba(96,165,250,0.35)",
    text: "#F0F6FF", textMuted: "rgba(200,220,255,0.45)", textSub: "rgba(200,220,255,0.7)",
    modal: "#0F1F3D", tab: "rgba(10,22,40,0.97)", input: "rgba(255,255,255,0.05)",
    row: "rgba(255,255,255,0.05)", bar: "rgba(255,255,255,0.07)",
    chat1: "rgba(59,130,246,0.2)", chat2: "rgba(255,255,255,0.06)",
    gold: "#60A5FA", goldLight: "#93C5FD", green: "#34D399", blue: "#3B82F6", pink: "#F472B6",
    cardGrad: "linear-gradient(145deg, #0F2040 0%, #0A1628 50%, #0D1A35 100%)",
  },
  light: {
    bg: "#F0F5FF", surface: "rgba(255,255,255,0.9)", surfaceHover: "rgba(255,255,255,1)",
    border: "rgba(59,130,246,0.15)", borderBright: "rgba(59,130,246,0.4)",
    text: "#0A1628", textMuted: "rgba(10,22,40,0.45)", textSub: "rgba(10,22,40,0.68)",
    modal: "#FFFFFF", tab: "rgba(240,245,255,0.97)", input: "rgba(59,130,246,0.05)",
    row: "rgba(59,130,246,0.06)", bar: "rgba(59,130,246,0.08)",
    chat1: "rgba(59,130,246,0.12)", chat2: "rgba(0,0,0,0.05)",
    gold: "#1D4ED8", goldLight: "#3B82F6", green: "#059669", blue: "#2563EB", pink: "#DB2777",
    cardGrad: "linear-gradient(145deg, #1E40AF 0%, #1D4ED8 50%, #2563EB 100%)",
  },
};

function QRScanner({ th, onScan, scannerActive, setScannerActive }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (scannerActive) startCamera();
    return () => stopCamera();
  }, [scannerActive]);

  async function startCamera() {
    setError(null); setLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        videoRef.current.onloadedmetadata = () => { setLoading(false); scanFrame(); };
      }
    } catch { setLoading(false); setError("Camera access denied. Please allow camera permission."); }
  }

  function stopCamera() {
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    if (animRef.current) cancelAnimationFrame(animRef.current);
  }

  async function scanFrame() {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth; canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      try {
        if (window.jsQR) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = window.jsQR(imageData.data, imageData.width, imageData.height);
          if (code) { stopCamera(); onScan(code.data); return; }
        }
      } catch {}
    }
    animRef.current = requestAnimationFrame(scanFrame);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jsQR/1.4.0/jsQR.min.js" />
      {!scannerActive ? (
        <div>
          <div style={{ width: 220, height: 220, margin: "0 auto 20px", borderRadius: 24, background: th.input, border: `1.5px dashed ${th.borderBright}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <span style={{ fontSize: 52 }}>📷</span>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 12, color: th.textMuted, letterSpacing: 0.5 }}>Camera ready</p>
          </div>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 12, color: th.textMuted, marginBottom: 20, lineHeight: 1.6 }}>Point your camera at any UPI QR code to pay instantly</p>
          <button className="btn-primary" onClick={() => setScannerActive(true)}>Open Camera & Scan</button>
        </div>
      ) : (
        <div>
          {loading && <div style={{ width: 240, height: 240, margin: "0 auto 12px", borderRadius: 20, background: th.input, display: "flex", alignItems: "center", justifyContent: "center" }}><p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: th.textMuted }}>Starting camera…</p></div>}
          {error ? (
            <div style={{ padding: 16, background: "rgba(224,123,159,0.08)", border: "1px solid rgba(224,123,159,0.25)", borderRadius: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: th.pink }}>{error}</p>
            </div>
          ) : (
            <div style={{ position: "relative", width: 240, height: 240, margin: "0 auto 16px", borderRadius: 20, overflow: "hidden" }}>
              <video ref={videoRef} style={{ width: "100%", height: "100%", objectFit: "cover" }} playsInline muted />
              <div style={{ position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none" }}>
                {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
                  <div key={v+h} style={{ position: "absolute", [v]: 12, [h]: 12, width: 24, height: 24, borderTop: v==="top" ? `2.5px solid ${th.gold}` : "none", borderBottom: v==="bottom" ? `2.5px solid ${th.gold}` : "none", borderLeft: h==="left" ? `2.5px solid ${th.gold}` : "none", borderRight: h==="right" ? `2.5px solid ${th.gold}` : "none", borderRadius: v==="top"&&h==="left"?"6px 0 0 0":v==="top"&&h==="right"?"0 6px 0 0":v==="bottom"&&h==="left"?"0 0 0 6px":"0 0 6px 0" }} />
                ))}
                <div style={{ position: "absolute", left: 12, right: 12, height: 1.5, background: `linear-gradient(90deg,transparent,${th.gold},transparent)`, animation: "scanline 2s ease-in-out infinite" }} />
              </div>
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <p style={{ fontFamily: "'DM Sans'", fontSize: 11, color: th.textMuted, marginBottom: 14, letterSpacing: 0.3 }}>Align QR code within the frame</p>
          <button className="btn-ghost" onClick={() => { setScannerActive(false); stopCamera(); }}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default function PayFlow() {
  const [tab, setTab] = useState("home");
  const [dark, setDark] = useState(true);
  const [locked, setLocked] = useState(false);
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [showRefer, setShowRefer] = useState(false);
  const [referCopied, setReferCopied] = useState(false);
  const [showInstantLoan, setShowInstantLoan] = useState(false);
  const [loanStep, setLoanStep] = useState(1); // 1=eligibility, 2=amount, 3=confirm, 4=success
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanTenure, setLoanTenure] = useState(30);
  const [loanPurpose, setLoanPurpose] = useState("");
  const [showSend, setShowSend] = useState(false);
  const [showBill, setShowBill] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [qrTab, setQrTab] = useState("My QR");
  const [scanResult, setScanResult] = useState(null);
  const [scannerActive, setScannerActive] = useState(false);
  const [showSplit, setShowSplit] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showIntl, setShowIntl] = useState(false);
  const [showChat, setShowChat] = useState(null);
  const [showNotif, setShowNotif] = useState(false);
  const [sendAmount, setSendAmount] = useState("");
  const [sendTo, setSendTo] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [billNumber, setBillNumber] = useState("");
  const [notifications, setNotifications] = useState(initNotifications);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [billSuccess, setBillSuccess] = useState(false);
  const [goals, setGoals] = useState(initSavingsGoals);
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [splitAmount, setSplitAmount] = useState("");
  const [splitPeople, setSplitPeople] = useState([]);
  const [splitSuccess, setSplitSuccess] = useState(false);
  const [txFilter, setTxFilter] = useState("All");
  const [intlAmount, setIntlAmount] = useState("");
  const [intlCurrency, setIntlCurrency] = useState(currencies[0]);
  const [intlRecipient, setIntlRecipient] = useState("");
  const [intlAccount, setIntlAccount] = useState("");
  const [intlSuccess, setIntlSuccess] = useState(false);
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const [txMessages, setTxMessages] = useState(() => { const m = {}; transactions.forEach(t => { m[t.id] = [...t.messages]; }); return m; });
  const [chatInput, setChatInput] = useState("");
  const [supportMessages, setSupportMessages] = useState([{ role: "assistant", text: "Hi Mohindharan! 👋 I'm Aria, your PayFlow AI assistant. How can I help you today?" }]);
  const [supportInput, setSupportInput] = useState("");
  const [supportLoading, setSupportLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const chatEndRef = useRef(null);
  const supportEndRef = useRef(null);

  const th = dark ? D.dark : D.light;
  const totalCashback = cashbackOffers.reduce((s, o) => s + o.earned, 0);
  const unread = notifications.filter(n => !n.read).length;

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);
  useEffect(() => {
    // Check if WebAuthn / biometric is available
    if (window.PublicKeyCredential) {
      window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
        .then(r => setBiometricSupported(r))
        .catch(() => setBiometricSupported(false));
    }
  }, []);

  async function handleBiometricUnlock() {
    if (biometricSupported) {
      try {
        // Use WebAuthn for real biometric prompt
        const cred = await navigator.credentials.get({
          publicKey: {
            challenge: new Uint8Array(32),
            timeout: 60000,
            userVerification: "required",
            rpId: window.location.hostname || "localhost",
          }
        });
        if (cred) setLocked(false);
      } catch {
        // Fallback — still unlock (demo mode)
        setLocked(false);
      }
    } else {
      setLocked(false);
    }
  }

  function handleRefer() {
    navigator.clipboard?.writeText("PAYFLOW-MOHIN-2024").catch(() => {});
    setReferCopied(true);
    setTimeout(() => setReferCopied(false), 2500);
  }
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [showChat, txMessages]);
  useEffect(() => { supportEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [supportMessages, supportLoading]);

  const go = (t) => setTab(t);

  function handleSend() {
    if (!sendAmount || !sendTo) return;
    setSendSuccess(true);
    setTimeout(() => { setSendSuccess(false); setShowSend(false); setSendAmount(""); setSendTo(""); }, 2200);
  }
  function handleBill() {
    if (!billAmount || !billNumber) return;
    setBillSuccess(true);
    setTimeout(() => { setBillSuccess(false); setShowBill(null); setBillAmount(""); setBillNumber(""); }, 2200);
  }
  function handleSplit() {
    if (!splitAmount || splitPeople.length === 0) return;
    setSplitSuccess(true);
    setTimeout(() => { setSplitSuccess(false); setShowSplit(false); setSplitAmount(""); setSplitPeople([]); }, 2500);
  }
  function handleIntl() {
    if (!intlAmount || !intlRecipient || !intlAccount) return;
    setIntlSuccess(true);
    setTimeout(() => { setIntlSuccess(false); setShowIntl(false); setIntlAmount(""); setIntlRecipient(""); setIntlAccount(""); }, 2500);
  }
  function addGoal() {
    if (!newGoalName || !newGoalTarget) return;
    const icons = ["🎯","💰","✈️","🏠","🎓","🚗"]; const colors = ["#D4A853","#7B9FE0","#6EC6A0","#E07B9F","#A07BE0","#4CBDC9"];
    const i = goals.length % 6;
    setGoals(g => [...g, { id: Date.now(), name: newGoalName, target: parseInt(newGoalTarget), saved: 0, icon: icons[i], color: colors[i] }]);
    setNewGoalName(""); setNewGoalTarget(""); setShowAddGoal(false);
  }
  function sendChat() {
    if (!chatInput.trim() || !showChat) return;
    const now = new Date(); const t = `${now.getHours()}:${String(now.getMinutes()).padStart(2,"0")}`;
    setTxMessages(p => ({ ...p, [showChat.id]: [...(p[showChat.id]||[]), { from:"me", text: chatInput.trim(), time: t }] }));
    setChatInput("");
    const replies = ["Got it! 👍","Thanks for the note!","Sure, no problem 😊","Acknowledged ✅","Will confirm shortly!"];
    setTimeout(() => { setTxMessages(p => ({ ...p, [showChat.id]: [...(p[showChat.id]||[]), { from:"other", text: replies[Math.floor(Math.random()*replies.length)], time: t }] })); }, 1200);
  }
  async function sendSupport() {
    const text = supportInput.trim(); if (!text || supportLoading) return;
    const userMsg = { role:"user", text };
    setSupportMessages(p => [...p, userMsg]); setSupportInput(""); setSupportLoading(true);
    try {
      const history = [...supportMessages, userMsg];
      const apiMessages = history.map(m => ({ role: m.role==="assistant"?"assistant":"user", content: m.text }));
      const res = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:`You are Aria, a friendly AI support assistant for PayFlow fintech app. User: Mohindharan DK. Balance: ₹1,24,350. UPI: mohindharan@upi. Bank: HDFC ••4821. Gold Member. Help with transactions, payments, UPI, international transfers, bills, savings, loans, cashback, security. Keep responses concise (2-4 sentences), warm, helpful. Use ₹ for amounts.`,
          messages: apiMessages }) });
      const data = await res.json();
      setSupportMessages(p => [...p, { role:"assistant", text: data.content?.[0]?.text || "Sorry, I couldn't process that. Please try again." }]);
    } catch { setSupportMessages(p => [...p, { role:"assistant", text: "Having trouble connecting. Please try again. 🙏" }]); }
    setSupportLoading(false);
  }

  const filteredTx = transactions.filter(tx => {
    if (txFilter==="All") return true; if (txFilter==="Income") return tx.amount>0;
    if (txFilter==="Expense") return tx.amount<0 && !["Mobile","DTH","Internet","Entertainment"].includes(tx.category);
    if (txFilter==="Bills") return ["Mobile","DTH","Internet","Entertainment"].includes(tx.category);
    return true;
  });
  const intlINR = intlAmount ? (parseFloat(intlAmount)*intlCurrency.rate).toFixed(2) : null;
  const intlFee = intlINR ? Math.max(50, parseFloat(intlINR)*0.005).toFixed(2) : null;

  const TABS = [["home","◈","Home"],["history","⊟","History"],["analytics","◉","Stats"],["savings","◎","Goals"],["rewards","✦","Rewards"],["credit","💳","Credit"],["support","⊕","Support"],["profile","◈","Me"]];

  // Reusable style helpers
  const glass = { background: th.surface, border: `1px solid ${th.border}`, borderRadius: 22, padding: "22px 22px", backdropFilter: "blur(12px)" };
  const inp = { background: th.input, border: `1px solid ${th.border}`, borderRadius: 14, padding: "14px 16px", color: th.text, fontFamily:"'Inter',sans-serif", fontSize:14, width:"100%", outline:"none", transition:"border-color 0.2s" };
  const lbl = { fontFamily:"'Inter',sans-serif", fontSize:10, color:th.textMuted, display:"block", marginBottom:8, textTransform:"uppercase", letterSpacing:1.5 };
  const row = { display:"flex", alignItems:"center", gap:16, padding:"16px 0", borderBottom:`1px solid ${th.row}` };

  return (
    <div style={{ fontFamily:"'Plus Jakarta Sans','Inter',sans-serif", background:th.bg, minHeight:"100vh", color:th.text, maxWidth:420, margin:"0 auto", position:"relative", overflow:"hidden" }}>

      {/* ── LOCK SCREEN ── */}
      {locked && (
        <div style={{ position:"fixed", inset:0, zIndex:999, background:"#09090F", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32 }}>
          {/* Background orbs */}
          <div style={{ position:"absolute", top:-100, right:-80, width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle, rgba(212,168,83,0.08) 0%, transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:100, left:-80, width:250, height:250, borderRadius:"50%", background:"radial-gradient(circle, rgba(123,159,224,0.06) 0%, transparent 70%)", pointerEvents:"none" }} />

          {/* Logo */}
          <div style={{ width:80, height:80, borderRadius:24, background:"linear-gradient(135deg,#1D4ED8,#3B82F6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, marginBottom:24, boxShadow:"0 16px 48px rgba(212,168,83,0.35)", animation:"float 3s ease-in-out infinite" }}>💳</div>
          <h1 style={{ fontSize:32, fontWeight:700, color:"#D4A853", letterSpacing:-1, marginBottom:8 }}>PayFlow</h1>
          <p style={{ fontFamily:"'Inter'", fontSize:12, color:"rgba(240,234,214,0.4)", letterSpacing:3, textTransform:"uppercase", marginBottom:60 }}>Premium Payments</p>

          {/* Lock icon */}
          <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(59,130,246,0.08)", border:"1px solid rgba(59,130,246,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, marginBottom:20, cursor:"pointer", transition:"all .3s", boxShadow:"0 0 0 0 rgba(212,168,83,0.3)", animation:"pulse-ring 2.5s ease-in-out infinite" }} onClick={handleBiometricUnlock}>
            {biometricSupported ? "🔐" : "🔓"}
          </div>
          <p style={{ fontFamily:"'Inter'", fontSize:13, color:"rgba(240,234,214,0.5)", marginBottom:32, letterSpacing:0.3 }}>
            {biometricSupported ? "Touch ID / Face ID to unlock" : "Tap to unlock"}
          </p>

          <button onClick={handleBiometricUnlock} style={{ background:"linear-gradient(135deg,#1D4ED8,#3B82F6)", border:"none", borderRadius:16, padding:"15px 48px", fontFamily:"'Inter'", fontSize:15, fontWeight:600, color:"#0A0806", cursor:"pointer", letterSpacing:0.3, boxShadow:"0 8px 32px rgba(59,130,246,0.4)", transition:"all .2s" }}>
            {biometricSupported ? "🔐 Unlock with Biometrics" : "Unlock PayFlow"}
          </button>

          <p style={{ fontFamily:"'Inter'", fontSize:11, color:"rgba(240,234,214,0.25)", marginTop:20, letterSpacing:0.3 }}>Mohindharan DK · ••4821</p>
        </div>
      )}

      {/* Ambient background orbs */}
      <div style={{ position:"fixed", top:-120, right:-80, width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", bottom:80, left:-100, width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"relative", zIndex:1 }}>
      <style>{\`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:0}

        .btn-primary{
          background:linear-gradient(135deg,#1D4ED8 0%,#3B82F6 50%,#1D4ED8 100%);
          background-size:200% 100%;
          color:#ffffff;border:none;border-radius:16px;padding:15px;
          font-family:'Inter',sans-serif;font-weight:600;font-size:14px;
          cursor:pointer;width:100%;letter-spacing:0.3px;
          transition:all .3s;box-shadow:0 4px 24px rgba(59,130,246,0.35),0 1px 0 rgba(255,255,255,0.15) inset;
        }
        .btn-primary:hover{background-position:100% 0;transform:translateY(-2px);box-shadow:0 8px 32px rgba(59,130,246,0.45)}
        .btn-primary:active{transform:translateY(0)}

        .btn-ghost{
          background:transparent;color:#3B82F6;
          border:1px solid rgba(59,130,246,0.3);
          border-radius:12px;padding:10px 16px;
          font-family:'Inter',sans-serif;font-size:12px;font-weight:500;
          cursor:pointer;transition:all .2s;letter-spacing:0.2px;white-space:nowrap;
        }
        .btn-ghost:hover{background:rgba(59,130,246,0.08);border-color:rgba(59,130,246,0.5);transform:translateY(-1px)}

        .tab-bar{
          position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:420px;
          backdrop-filter:blur(32px);-webkit-backdrop-filter:blur(32px);
          border-top:1px solid rgba(59,130,246,0.1);
          display:flex;overflow-x:auto;padding:10px 8px 24px;z-index:100;gap:2px;
          scrollbar-width:none;
        }
        .tab-bar::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(59,130,246,0.03) 0%,transparent 100%);pointer-events:none;}
        .tab-bar::-webkit-scrollbar{display:none}
        .ti{min-width:52px;flex:1;display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;padding:7px 4px;border-radius:16px;transition:all .25s;position:relative;}
        .ti:hover{background:rgba(59,130,246,0.08)}
        .ti-icon{font-size:17px;line-height:1;transition:all .3s;opacity:0.32}
        .ti-lbl{font-family:'Inter',sans-serif;font-size:9px;font-weight:500;color:rgba(59,130,246,0.4);letter-spacing:0.8px;text-transform:uppercase;white-space:nowrap;transition:all .3s}
        .ti.active .ti-icon{opacity:1;filter:drop-shadow(0 0 8px rgba(59,130,246,0.7));transform:scale(1.1)}
        .ti.active .ti-lbl{color:#3B82F6;font-weight:700}
        .ti.active::after{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:20px;height:2px;background:#3B82F6;border-radius:2px;box-shadow:0 0 8px rgba(59,130,246,0.6)}

        .overlay{position:fixed;inset:0;background:rgba(0,0,20,0.78);backdrop-filter:blur(12px);z-index:200;display:flex;align-items:flex-end;justify-content:center}
        .sheet{border-radius:32px 32px 0 0;padding:0;width:100%;max-width:420px;animation:rise .4s cubic-bezier(0.22,1,0.36,1);max-height:92vh;overflow-y:auto;overflow-x:hidden;}
        .sheet-inner{padding:10px 24px 52px}
        .sheet-handle{width:40px;height:4px;border-radius:4px;background:rgba(59,130,246,0.2);margin:14px auto 20px}
        .chat-full{border-radius:32px 32px 0 0;width:100%;max-width:420px;animation:rise .4s cubic-bezier(0.22,1,0.36,1);height:90vh;display:flex;flex-direction:column;overflow:hidden;}
        @keyframes rise{from{transform:translateY(110%);opacity:0}to{transform:translateY(0);opacity:1}}
        .fade{opacity:0;transform:translateY(20px);transition:opacity .55s cubic-bezier(0.22,1,0.36,1),transform .55s cubic-bezier(0.22,1,0.36,1)}
        .fade.in{opacity:1;transform:translateY(0)}
        .success-wrap{background:linear-gradient(135deg,rgba(52,211,153,0.1),rgba(52,211,153,0.04));border:1px solid rgba(52,211,153,0.25);color:#34D399;border-radius:22px;padding:32px;text-align:center;font-family:'Inter',sans-serif}
        .pill{display:inline-block;padding:3px 10px;border-radius:20px;font-size:10px;font-family:'Inter',sans-serif;font-weight:500;letter-spacing:0.4px}
        .notif-dot{width:7px;height:7px;background:#3B82F6;border-radius:50%;position:absolute;top:-2px;right:-2px;box-shadow:0 0 8px rgba(59,130,246,0.9);animation:pulse 2s ease-in-out infinite}
        .bar{height:6px;border-radius:8px;overflow:hidden}
        .action-btn{background:rgba(255,255,255,0.05);border:1px solid rgba(59,130,246,0.12);border-radius:18px;padding:15px 6px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:7px;transition:all .25s;}
        .action-btn:hover{background:rgba(59,130,246,0.08);border-color:rgba(59,130,246,0.3);transform:translateY(-3px);box-shadow:0 8px 24px rgba(59,130,246,0.15);}
        .action-btn:active{transform:translateY(-1px)}
        .card-hover{transition:transform .25s,box-shadow .25s}
        .card-hover:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,0.15)}
        .glass-card{background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);border:1px solid rgba(59,130,246,0.12);border-radius:22px;padding:20px;}
        @keyframes scanline{0%{top:10%}50%{top:85%}100%{top:10%}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(0.9)}}
        @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}
        @keyframes glow{0%,100%{box-shadow:0 0 30px rgba(59,130,246,0.12),0 0 60px rgba(59,130,246,0.06)}50%{box-shadow:0 0 50px rgba(59,130,246,0.25),0 0 100px rgba(59,130,246,0.1)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes pulse-ring{0%{box-shadow:0 0 0 0 rgba(59,130,246,0.4)}70%{box-shadow:0 0 0 16px rgba(59,130,246,0)}100%{box-shadow:0 0 0 0 rgba(59,130,246,0)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        .balance-card{animation:glow 5s ease-in-out infinite}
        .section-title{font-family:'Inter',sans-serif;font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;opacity:0.35;margin-bottom:18px}
        input:focus{border-color:rgba(59,130,246,0.5) !important;box-shadow:0 0 0 4px rgba(59,130,246,0.08) !important;outline:none}
        input{transition:border-color .2s,box-shadow .2s}
        .tx-row{display:flex;align-items:center;gap:16px;padding:16px 0;border-bottom:1px solid rgba(59,130,246,0.06);transition:all .2s}
        .tx-row:hover{background:rgba(59,130,246,0.04);margin:0 -8px;padding-left:8px;padding-right:8px;border-radius:14px;border-bottom-color:transparent}
        .tx-row:last-child{border-bottom:none}
        .contact-avatar{transition:all .2s}
        .contact-avatar:hover{transform:scale(1.1);filter:brightness(1.2)}
        .currency-option{transition:background .15s}
        .currency-option:hover{background:rgba(59,130,246,0.06) !important}
      \`}</style>

      {/* ── HEADER ── */}
      <div style={{ padding:"54px 24px 16px", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <p style={{ fontFamily:"'Inter'", fontSize:9, color:th.textMuted, letterSpacing:4, textTransform:"uppercase", marginBottom:6 }}>Good morning</p>
          <h2 style={{ fontSize:26, fontWeight:600, letterSpacing:-0.8, lineHeight:1, fontFamily:"'Plus Jakarta Sans',sans-serif", fontStyle:"italic" }}>Mohindharan <span style={{ fontStyle:"normal", fontWeight:700 }}>DK</span></h2>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center", marginTop:4 }}>
          <button onClick={() => setDark(d => !d)} style={{ background:th.surface, border:`1px solid ${th.border}`, borderRadius:14, width:38, height:38, cursor:"pointer", fontSize:15, display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s", boxShadow: dark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.06)" }}>
            {dark ? "🌙" : "☀️"}
          </button>
          <div style={{ position:"relative", cursor:"pointer", width:38, height:38, background:th.surface, border:`1px solid ${th.border}`, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s", boxShadow: dark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.06)" }} onClick={() => setShowNotif(true)}>
            <span style={{ fontSize:15 }}>🔔</span>
            {unread > 0 && <div className="notif-dot" />}
          </div>
          <div style={{ width:38, height:38, borderRadius:14, background:`linear-gradient(135deg,${th.blue},${th.goldLight})`, display:"flex", alignItems:"center", justifyContent:"center", color:"#0A0806", fontWeight:700, fontFamily:"'Inter'", fontSize:12, letterSpacing:0.5, boxShadow:`0 4px 16px rgba(212,168,83,0.3)` }}>MD</div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ padding:"0 22px", paddingBottom:120, overflowY:"auto", maxHeight:"calc(100vh - 98px)" }}>

        {/* HOME */}
        {tab==="home" && (
          <div className={`fade ${mounted?"in":""}`}>

            {/* Balance Card */}
            <div className="balance-card card-hover" style={{ background:`linear-gradient(145deg,#0F2040,#1a3a6e,#0F2040)`, border:`1px solid rgba(96,165,250,0.3)`, borderRadius:28, padding:"28px 24px 24px", marginBottom:24, position:"relative", overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,50,0.5), 0 1px 0 rgba(255,255,255,0.08) inset" }}>
              <div style={{ position:"absolute", top:-70, right:-70, width:200, height:200, borderRadius:"50%", background:`radial-gradient(circle, rgba(212,168,83,0.12) 0%, transparent 70%)`, pointerEvents:"none" }} />
              <div style={{ position:"absolute", bottom:-50, left:-50, width:160, height:160, borderRadius:"50%", background:`radial-gradient(circle, rgba(123,159,224,0.09) 0%, transparent 70%)`, pointerEvents:"none" }} />
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:`linear-gradient(90deg, transparent, rgba(212,168,83,0.4), transparent)` }} />
              <p style={{ fontFamily:"'Inter'", fontSize:9, color:th.textMuted, letterSpacing:3.5, textTransform:"uppercase", marginBottom:12 }}>Total Balance</p>
              <h1 style={{ fontSize:40, fontWeight:600, color:th.gold, letterSpacing:-2, lineHeight:1, marginBottom:6, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>₹1,24,350</h1>
              <p style={{ fontFamily:"'Inter'", fontSize:11, color:th.textMuted, marginBottom:20, letterSpacing:2 }}>•••• 4821 &nbsp;·&nbsp; VISA Gold</p>
              <div style={{ height:"1px", background:`linear-gradient(90deg, transparent, ${th.borderBright}, transparent)`, marginBottom:20 }} />
              <div style={{ display:"flex", gap:0, marginBottom:16 }}>
                {[["Income","↑ ₹90,000",th.green],["Spent","↓ ₹8,777",th.pink],["Cashback",`✦ ₹${totalCashback}`,th.goldLight]].map(([l,v,c],i) => (
                  <div key={l} style={{ flex:1, borderRight: i<2 ? `1px solid ${th.border}` : "none", paddingRight:14, paddingLeft:i>0?14:0 }}>
                    <p style={{ fontFamily:"'Inter'", fontSize:9, color:th.textMuted, textTransform:"uppercase", letterSpacing:2, marginBottom:6 }}>{l}</p>
                    <p style={{ fontFamily:"'Inter'", fontSize:13, color:c, fontWeight:600, letterSpacing:-0.3 }}>{v}</p>
                  </div>
                ))}
              </div>
              {/* Instant Loan Banner inside card */}
              <div onClick={() => { setShowInstantLoan(true); setLoanStep(1); }} style={{ display:"flex", alignItems:"center", gap:10, background:"rgba(93,184,150,0.08)", border:"1px solid rgba(93,184,150,0.2)", borderRadius:14, padding:"10px 14px", cursor:"pointer", transition:"all .2s" }}>
                <span style={{ fontSize:18 }}>⚡</span>
                <div style={{ flex:1 }}>
                  <p style={{ fontFamily:"'Inter'", fontSize:11, fontWeight:600, color:"#5DB896", marginBottom:1 }}>Instant Loan Available</p>
                  <p style={{ fontFamily:"'Inter'", fontSize:10, color:"rgba(240,234,214,0.4)" }}>Get up to ₹10,000 in 60 seconds</p>
                </div>
                <span style={{ fontFamily:"'Inter'", fontSize:12, fontWeight:700, color:"#5DB896" }}>₹10K →</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10, marginBottom:32 }}>
              {[
                { icon:"↑", label:"Send", fn:() => setShowSend(true), c:th.gold },
                { icon:"↓", label:"Receive", fn:() => { setQrTab("My QR"); setScanResult(null); setScannerActive(false); setShowQR(true); }, c:th.green },
                { icon:"🌍", label:"Global", fn:() => setShowIntl(true), c:th.blue },
                { icon:"÷", label:"Split", fn:() => setShowSplit(true), c:th.pink },
                { icon:"▦", label:"QR", fn:() => { setQrTab("Scan QR"); setScanResult(null); setScannerActive(false); setShowQR(true); }, c:"#A07BE0" },
              ].map(a => (
                <button key={a.label} className="action-btn" onClick={a.fn} style={{ padding:"18px 6px", gap:8 }}>
                  <span style={{ fontSize:20, color:a.c, lineHeight:1 }}>{a.icon}</span>
                  <span style={{ fontFamily:"'Inter'", fontSize:10, color:th.textSub, fontWeight:500, letterSpacing:0.3 }}>{a.label}</span>
                </button>
              ))}
            </div>

            {/* Send Money */}
            <div style={{ marginBottom:32 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <p className="section-title" style={{ margin:0 }}>Send Money</p>
                <span onClick={() => setShowSend(true)} style={{ fontFamily:"'Inter'", fontSize:11, color:th.gold, cursor:"pointer" }}>See all →</span>
              </div>
              <div style={{ display:"flex", gap:20, overflowX:"auto", paddingBottom:4 }}>
                {contacts.map(c => (
                  <div key={c.name} onClick={() => { if (c.name!=="+ Add") setSendTo(c.name); setShowSend(true); }} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer", minWidth:52 }}>
                    <div style={{ width:52, height:52, borderRadius:"50%", background:`${c.color}15`, border:`1.5px solid ${c.color}40`, display:"flex", alignItems:"center", justifyContent:"center", color:c.color, fontFamily:"'Inter'", fontWeight:600, fontSize:13, transition:"all .2s" }}>{c.initials}</div>
                    <span style={{ fontFamily:"'Inter'", fontSize:10, color:th.textSub }}>{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bills */}
            <div style={{ marginBottom:32 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <p className="section-title" style={{ margin:0 }}>Pay Bills</p>
                <span onClick={() => setShowBill(billServices[0].name)} style={{ fontFamily:"'Inter'", fontSize:11, color:th.gold, cursor:"pointer" }}>See all →</span>
              </div>
              <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:4 }}>
                {billServices.map(s => (
                  <button key={s.name} onClick={() => setShowBill(s.name)} style={{ background:th.surface, border:`1px solid ${th.border}`, borderRadius:18, padding:"16px 14px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:8, minWidth:68, flexShrink:0, transition:"all .2s" }}>
                    <span style={{ fontSize:22 }}>{s.icon}</span>
                    <span style={{ fontFamily:"'Inter'", fontSize:10, color:th.textSub, fontWeight:500 }}>{s.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent */}
            <div style={{ marginBottom:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <p className="section-title" style={{ margin:0 }}>Recent</p>
                <span onClick={() => go("history")} style={{ fontFamily:"'Inter'", fontSize:11, color:th.gold, cursor:"pointer" }}>View all →</span>
              </div>
              {transactions.slice(0,4).map(tx => (
                <div key={tx.id} className="tx-row">
                  <div style={{ width:44, height:44, borderRadius:14, background:tx.amount>0?"rgba(93,184,150,0.1)":"rgba(212,168,83,0.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{tx.icon}</div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontFamily:"'Inter'", fontSize:13, fontWeight:500, color:th.text, marginBottom:3 }}>{tx.name}</p>
                    <p style={{ fontFamily:"'Inter'", fontSize:11, color:th.textMuted }}>{tx.date} · {tx.category}</p>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontFamily:"'Inter'", fontWeight:600, fontSize:13, color:tx.amount>0?th.green:th.text }}>{tx.amount>0?"+ ":"– "}₹{Math.abs(tx.amount).toLocaleString()}</span>
                    <button onClick={() => setShowChat(tx)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, opacity:0.4, padding:"2px 4px", transition:"opacity .2s" }} onMouseOver={e=>e.target.style.opacity=0.8} onMouseOut={e=>e.target.style.opacity=0.4}>
                      💬{txMessages[tx.id]?.length>0 && <sup style={{ fontFamily:"'Inter'", fontSize:8, color:th.gold }}>{txMessages[tx.id].length}</sup>}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HISTORY */}
        {tab==="history" && (
          <div className={`fade ${mounted?"in":""}`}>
            <h2 style={{ fontSize:26, fontWeight:600, marginBottom:18, letterSpacing:-0.5 }}>Transactions</h2>
            <div style={{ display:"flex", gap:6, marginBottom:18, overflowX:"auto", paddingBottom:2 }}>
              {["All","Income","Expense","Bills"].map(f => (
                <button key={f} onClick={() => setTxFilter(f)} className="btn-ghost" style={{ background:txFilter===f?"rgba(212,168,83,0.15)":undefined, borderColor:txFilter===f?th.gold:undefined, color:txFilter===f?th.gold:th.textSub }}>{f}</button>
              ))}
            </div>
            {filteredTx.map(tx => (
              <div key={tx.id} className="tx-row">
                <div style={{ width:42, height:42, borderRadius:13, background:tx.amount>0?"rgba(93,184,150,0.1)":"rgba(212,168,83,0.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{tx.icon}</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontFamily:"'Inter'", fontSize:13, fontWeight:500, color:th.text, marginBottom:2 }}>{tx.name}</p>
                  <p style={{ fontFamily:"'Inter'", fontSize:10, color:th.textMuted }}>{tx.date} · {tx.category}</p>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ textAlign:"right" }}>
                    <p style={{ fontFamily:"'Inter'", fontWeight:600, fontSize:13, color:tx.amount>0?th.green:th.text }}>{tx.amount>0?"+ ":"– "}₹{Math.abs(tx.amount).toLocaleString()}</p>
                    <span className="pill" style={{ background:"rgba(93,184,150,0.1)", color:th.green, marginTop:2 }}>✓ Done</span>
                  </div>
                  <button onClick={() => setShowChat(tx)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, opacity:0.4, padding:"2px 4px" }}>💬</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ANALYTICS */}
        {tab==="analytics" && (
          <div className={`fade ${mounted?"in":""}`}>
            <h2 style={{ fontSize:26, fontWeight:600, marginBottom:18, letterSpacing:-0.5 }}>Analytics</h2>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:18 }}>
              {[["Total Spent","₹8,777",th.pink,"↓"],["Total Income","₹90,000",th.green,"↑"],["Saved","₹81,223",th.gold,"◈"],["Bills Paid","₹2,297",th.blue,"⚡"]].map(([l,v,c,i]) => (
                <div key={l} style={{ ...glass, padding:"16px 18px" }}>
                  <p style={{ fontFamily:"'Inter'", fontSize:9, color:th.textMuted, textTransform:"uppercase", letterSpacing:1.5, marginBottom:8 }}>{l}</p>
                  <p style={{ fontFamily:"'Inter'", fontSize:18, fontWeight:700, color:c, letterSpacing:-0.5 }}>{i} {v}</p>
                </div>
              ))}
            </div>
            <div style={{ ...glass, marginBottom:14 }}>
              <p className="section-title">Spending by Category</p>
              {spendingData.map(s => (
                <div key={s.category} style={{ marginBottom:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ fontFamily:"'Inter'", fontSize:12, color:th.textSub }}>{s.category}</span>
                    <span style={{ fontFamily:"'Inter'", fontSize:12, color:s.color, fontWeight:600 }}>₹{s.amount.toLocaleString()}</span>
                  </div>
                  <div className="bar" style={{ background:th.bar }}>
                    <div style={{ height:"100%", width:`${s.pct}%`, background:s.color, borderRadius:8, transition:"width 1s ease" }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={glass}>
              <p className="section-title">Monthly Overview</p>
              <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:80 }}>
                {[55,72,40,88,62,48,90].map((h,i) => (
                  <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
                    <div style={{ width:"100%", height:h, borderRadius:"5px 5px 0 0", background: i===6?`linear-gradient(180deg,${th.gold},${th.goldLight})`:th.bar, transition:"height .8s ease" }} />
                    <span style={{ fontFamily:"'Inter'", fontSize:8, color:th.textMuted }}>{"SONDJFM"[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SAVINGS */}
        {tab==="savings" && (
          <div className={`fade ${mounted?"in":""}`}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
              <h2 style={{ fontSize:26, fontWeight:600, letterSpacing:-0.5 }}>Goals</h2>
              <button className="btn-ghost" onClick={() => setShowAddGoal(true)}>+ New Goal</button>
            </div>
            <div style={{ ...glass, marginBottom:18, textAlign:"center", background:`linear-gradient(135deg,rgba(93,184,150,0.08),rgba(93,184,150,0.03))`, border:`1px solid rgba(93,184,150,0.15)` }}>
              <p style={{ fontFamily:"'Inter'", fontSize:10, color:th.textMuted, textTransform:"uppercase", letterSpacing:2, marginBottom:8 }}>Total Saved</p>
              <p style={{ fontFamily:"'Inter'", fontSize:32, fontWeight:700, color:th.green, letterSpacing:-1 }}>₹{goals.reduce((s,g)=>s+g.saved,0).toLocaleString()}</p>
              <p style={{ fontFamily:"'Inter'", fontSize:11, color:th.textMuted, marginTop:5 }}>across {goals.length} goals</p>
            </div>
            {goals.map(g => {
              const pct = Math.min(100, Math.round((g.saved/g.target)*100));
              return (
                <div key={g.id} className="card-hover" style={{ ...glass, marginBottom:12 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                    <div style={{ width:44, height:44, borderRadius:14, background:`${g.color}12`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{g.icon}</div>
                    <div style={{ flex:1 }}>
                      <p style={{ fontFamily:"'Inter'", fontSize:13, fontWeight:600, color:th.text, marginBottom:2 }}>{g.name}</p>
                      <p style={{ fontFamily:"'Inter'", fontSize:10, color:th.textMuted }}>Target ₹{g.target.toLocaleString()}</p>
                    </div>
                    <span style={{ fontFamily:"'Inter'", fontSize:18, fontWeight:700, color:g.color }}>{pct}%</span>
                  </div>
                  <div className="bar" style={{ background:th.bar, marginBottom:10 }}>
                    <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${g.color},${g.color}99)`, borderRadius:8 }} />
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between" }}>
                    <span style={{ fontFamily:"'Inter'", fontSize:11, color:th.green, fontWeight:500 }}>₹{g.saved.toLocaleString()} saved</span>
                    <span style={{ fontFamily:"'Inter'", fontSize:11, color:th.textMuted }}>₹{(g.target-g.saved).toLocaleString()} to go</span>
                  </div>
                </div>
              );
            })}
            <h3 style={{ fontFamily:"'Inter'", fontSize:14, fontWeight:600, marginTop:28, marginBottom:14, color:th.text, letterSpacing:0.2 }}>Loan & EMI Tracker</h3>
            {loans.map(l => {
              const pct = Math.round(((l.total-l.remaining)/l.total)*100);
              return (
                <div key={l.name} className="card-hover" style={{ ...glass, marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
                    <div><p style={{ fontFamily:"'Inter'", fontSize:13, fontWeight:600, color:th.text, marginBottom:2 }}>{l.name}</p><p style={{ fontFamily:"'Inter'", fontSize:10, color:th.textMuted }}>{l.bank}</p></div>
                    <div style={{ textAlign:"right" }}><p style={{ fontFamily:"'Inter'", fontSize:14, fontWeight:700, color:l.color }}>₹{l.emi.toLocaleString()}/mo</p><p style={{ fontFamily:"'Inter'", fontSize:10, color:th.textMuted, marginTop:2 }}>{l.remaining} EMIs left</p></div>
                  </div>
                  <div className="bar" style={{ background:th.bar, marginBottom:8 }}>
                    <div style={{ height:"100%", width:`${pct}%`, background:l.color, borderRadius:8 }} />
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between" }}>
                    <span style={{ fontFamily:"'Inter'", fontSize:10, color:th.green }}>{pct}% paid</span>
                    <span style={{ fontFamily:"'Inter'", fontSize:10, color:th.textMuted }}>₹{l.outstanding.toLocaleString()} outstanding</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* REWARDS */}
        {tab==="rewards" && (
          <div className={`fade ${mounted?"in":""}`}>
            <h2 style={{ fontSize:26, fontWeight:600, marginBottom:4, letterSpacing:-0.5 }}>Rewards</h2>
            <p style={{ fontFamily:"'Inter'", fontSize:12, color:th.textMuted, marginBottom:20 }}>Earn while you spend ✦</p>
            <div style={{ ...glass, marginBottom:20, background:`linear-gradient(135deg,rgba(212,168,83,0.1),rgba(212,168,83,0.04))`, border:`1px solid rgba(212,168,83,0.2)`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <p style={{ fontFamily:"'Inter'", fontSize:10, color:th.textMuted, textTransform:"uppercase", letterSpacing:2, marginBottom:8 }}>Total Earned This Month</p>
                <p style={{ fontFamily:"'Inter'", fontSize:28, fontWeight:700, color:th.gold, letterSpacing:-1 }}>₹{totalCashback}</p>
              </div>
              <span style={{ fontSize:38 }}>🏆</span>
            </div>
            <p className="section-title">Active Offers</p>
            {cashbackOffers.map(o => (
              <div key={o.title} className="card-hover" style={{ ...glass, marginBottom:10, display:"flex", gap:14, alignItems:"center" }}>
                <div style={{ width:44, height:44, borderRadius:14, background:`${o.color}12`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:21, flexShrink:0 }}>{o.icon}</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontFamily:"'Inter'", fontSize:13, fontWeight:600, color:th.text, marginBottom:2 }}>{o.title}</p>
                  <p style={{ fontFamily:"'Inter'", fontSize:10, color:th.textMuted }}>{o.brand} · Expires {o.expires}</p>
                </div>
                <div style={{ textAlign:"right" }}>
                  <p style={{ fontFamily:"'Inter'", fontSize:13, fontWeight:700, color:th.green }}>+₹{o.earned}</p>
                  <button className="btn-ghost" style={{ padding:"4px 10px", fontSize:10, marginTop:5 }}>Claim</button>
                </div>
              </div>
            ))}
            <div style={{ ...glass, marginTop:18, textAlign:"center", background:`linear-gradient(135deg,rgba(212,168,83,0.07),rgba(212,168,83,0.02))` }}>
              <span style={{ fontSize:28 }}>⭐</span>
              <p style={{ fontFamily:"'Inter'", fontSize:13, fontWeight:600, color:th.text, marginTop:8, marginBottom:6 }}>Gold Member Perks</p>
              <p style={{ fontFamily:"'Inter'", fontSize:11, color:th.textMuted, lineHeight:1.7 }}>2× cashback on bills · Priority support · Zero forex fees</p>
            </div>
          </div>
        )}

        {/* SUPPORT */}
        {tab==="support" && (
          <div className={`fade ${mounted?"in":""}`} style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 210px)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18, flexShrink:0 }}>
              <div style={{ width:44, height:44, borderRadius:14, background:"linear-gradient(135deg,rgba(123,159,224,0.15),rgba(160,123,224,0.15))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, border:`1px solid rgba(123,159,224,0.2)` }}>🤖</div>
              <div>
                <h2 style={{ fontSize:18, fontWeight:600, letterSpacing:-0.3 }}>Aria · AI Support</h2>
                <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:3 }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:th.green, animation:"pulse 2s infinite" }} />
                  <span style={{ fontFamily:"'Inter'", fontSize:10, color:th.green, letterSpacing:0.3 }}>Online · Instant replies</span>
                </div>
              </div>
            </div>

            <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column", gap:12, paddingBottom:8 }}>
              {supportMessages.map((msg,i) => (
                <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:msg.role==="user"?"flex-end":"flex-start", gap:4 }}>
                  {msg.role==="assistant" && (
                    <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                      <div style={{ width:18, height:18, borderRadius:6, background:"linear-gradient(135deg,rgba(123,159,224,0.2),rgba(160,123,224,0.2))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10 }}>🤖</div>
                      <span style={{ fontFamily:"'Inter'", fontSize:9, color:th.textMuted, letterSpacing:0.5 }}>ARIA</span>
                    </div>
                  )}
                  <div style={{ maxWidth:"82%", padding:"12px 15px", borderRadius:msg.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px", background:msg.role==="user"?`rgba(212,168,83,0.15)`:dark?"rgba(123,159,224,0.08)":"rgba(123,159,224,0.1)", border:msg.role==="assistant"?`1px solid rgba(123,159,224,0.15)`:`1px solid rgba(212,168,83,0.2)`, fontFamily:"'Inter',sans-serif", fontSize:13, lineHeight:1.55, color:th.text, whiteSpace:"pre-wrap" }}>{msg.text}</div>
                </div>
              ))}
              {supportLoading && (
                <div style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
                  <div style={{ width:18, height:18, borderRadius:6, background:"linear-gradient(135deg,rgba(123,159,224,0.2),rgba(160,123,224,0.2))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10 }}>🤖</div>
                  <div style={{ padding:"12px 16px", borderRadius:"18px 18px 18px 4px", background:dark?"rgba(123,159,224,0.08)":"rgba(123,159,224,0.1)", border:"1px solid rgba(123,159,224,0.15)", display:"flex", gap:5, alignItems:"center" }}>
                    {[0,1,2].map(i => <div key={i} style={{ width:6, height:6, borderRadius:"50%", background:th.blue, animation:`bounce 1.2s ${i*0.2}s infinite` }} />)}
                  </div>
                </div>
              )}
              <div ref={supportEndRef} />
            </div>

            {supportMessages.length<=1 && (
              <div style={{ flexShrink:0, marginBottom:12 }}>
                <p style={{ fontFamily:"'Inter'", fontSize:9, color:th.textMuted, marginBottom:8, textTransform:"uppercase", letterSpacing:1.5 }}>Common questions</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {["Why was my payment declined?","How to dispute a transaction?","International transfer limit?","Add a new bank account?","Track my refund","Change UPI PIN"].map(q => (
                    <button key={q} onClick={() => setSupportInput(q)} className="btn-ghost" style={{ fontSize:10, padding:"6px 10px" }}>{q}</button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ flexShrink:0, display:"flex", gap:10, paddingTop:12, borderTop:`1px solid ${th.row}` }}>
              <input style={{ ...inp, flex:1, padding:"12px 15px", fontSize:13 }} placeholder="Ask Aria anything…" value={supportInput} onChange={e => setSupportInput(e.target.value)} onKeyDown={e => e.key==="Enter" && sendSupport()} />
              <button onClick={sendSupport} disabled={supportLoading} style={{ background:supportLoading?th.bar:`linear-gradient(135deg,${th.gold},${th.goldLight})`, border:"none", borderRadius:12, width:44, height:44, cursor:supportLoading?"not-allowed":"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center", color:"#0A0806", flexShrink:0, boxShadow:`0 4px 16px rgba(212,168,83,0.2)` }}>↑</button>
            </div>
          </div>
        )}

        {/* CREDIT */}
        {tab==="credit" && (
          <div className={`fade ${mounted?"in":""}`}>
            <h2 style={{ fontSize:26, fontWeight:600, marginBottom:4, letterSpacing:-0.5 }}>Credit</h2>
            <p style={{ fontFamily:"'Inter'", fontSize:12, color:th.textMuted, marginBottom:20 }}>Your credit health at a glance</p>

            {/* ── INSTANT LOAN BANNER ── */}
            <div className="card-hover" onClick={() => { setShowInstantLoan(true); setLoanStep(1); }} style={{ marginBottom:22, borderRadius:22, padding:"20px", background:"linear-gradient(135deg,#1A2A1A,#0A1A0A)", border:"1px solid rgba(93,184,150,0.3)", cursor:"pointer", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-30, right:-30, width:130, height:130, borderRadius:"50%", background:"radial-gradient(circle,rgba(93,184,150,0.12),transparent)", pointerEvents:"none" }} />
              <div style={{ position:"absolute", bottom:-20, left:-20, width:100, height:100, borderRadius:"50%", background:"radial-gradient(circle,rgba(212,168,83,0.08),transparent)", pointerEvents:"none" }} />
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:52, height:52, borderRadius:16, background:"rgba(93,184,150,0.15)", border:"1px solid rgba(93,184,150,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>⚡</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                    <p style={{ fontFamily:"'Inter'", fontSize:15, fontWeight:700, color:"#F0EAD6" }}>Instant Loan</p>
                    <span style={{ background:"rgba(93,184,150,0.15)", border:"1px solid rgba(93,184,150,0.3)", borderRadius:6, padding:"2px 8px", fontSize:9, color:"#5DB896", fontFamily:"'Inter'", fontWeight:600, letterSpacing:0.5 }}>PRE-APPROVED</span>
                  </div>
                  <p style={{ fontFamily:"'Inter'", fontSize:12, color:"rgba(240,234,214,0.5)", marginBottom:6 }}>Get up to ₹10,000 in 60 seconds</p>
                  <div style={{ display:"flex", gap:12 }}>
                    <span style={{ fontFamily:"'Inter'", fontSize:10, color:"#5DB896" }}>✓ No collateral</span>
                    <span style={{ fontFamily:"'Inter'", fontSize:10, color:"#5DB896" }}>✓ Instant disbursal</span>
                    <span style={{ fontFamily:"'Inter'", fontSize:10, color:"#5DB896" }}>✓ Flexible repay</span>
                  </div>
                </div>
                <span style={{ fontSize:20, color:"#5DB896" }}>›</span>
              </div>
              <div style={{ marginTop:14, display:"flex", justifyContent:"space-between", padding:"10px 14px", background:"rgba(93,184,150,0.06)", borderRadius:12, border:"1px solid rgba(93,184,150,0.12)" }}>
                <div style={{ textAlign:"center" }}>
                  <p style={{ fontFamily:"'Inter'", fontSize:9, color:"rgba(240,234,214,0.4)", letterSpacing:1.5, textTransform:"uppercase", marginBottom:3 }}>Eligible</p>
                  <p style={{ fontFamily:"'Inter'", fontSize:15, fontWeight:700, color:"#5DB896" }}>₹10,000</p>
                </div>
                <div style={{ textAlign:"center" }}>
                  <p style={{ fontFamily:"'Inter'", fontSize:9, color:"rgba(240,234,214,0.4)", letterSpacing:1.5, textTransform:"uppercase", marginBottom:3 }}>Interest</p>
                  <p style={{ fontFamily:"'Inter'", fontSize:15, fontWeight:700, color:"#D4A853" }}>1.5%/mo</p>
                </div>
                <div style={{ textAlign:"center" }}>
                  <p style={{ fontFamily:"'Inter'", fontSize:9, color:"rgba(240,234,214,0.4)", letterSpacing:1.5, textTransform:"uppercase", marginBottom:3 }}>Tenure</p>
                  <p style={{ fontFamily:"'Inter'", fontSize:15, fontWeight:700, color:"#7B9FE0" }}>30-90 days</p>
                </div>
                <div style={{ textAlign:"center" }}>
                  <p style={{ fontFamily:"'Inter'", fontSize:9, color:"rgba(240,234,214,0.4)", letterSpacing:1.5, textTransform:"uppercase", marginBottom:3 }}>Disbursal</p>
                  <p style={{ fontFamily:"'Inter'", fontSize:15, fontWeight:700, color:"#A07BE0" }}>60 secs</p>
                </div>
              </div>
            </div>
            <div style={{ ...glass, marginBottom:18, background:`linear-gradient(145deg,${dark?"#141420":"#FFF8EE"},${dark?"#0D1520":"#EEF4FF"})`, border:`1px solid ${th.borderBright}`, textAlign:"center", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-40, right:-40, width:150, height:150, borderRadius:"50%", background:"radial-gradient(circle,rgba(212,168,83,0.1),transparent)", pointerEvents:"none" }} />
              <p style={{ fontFamily:"'Inter'", fontSize:9, color:th.textMuted, letterSpacing:3, textTransform:"uppercase", marginBottom:14 }}>Credit Score</p>
              {/* Score circle */}
              <div style={{ position:"relative", width:140, height:140, margin:"0 auto 16px" }}>
                <svg viewBox="0 0 140 140" style={{ width:140, height:140, transform:"rotate(-210deg)" }}>
                  <circle cx="70" cy="70" r="58" fill="none" stroke={dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)"} strokeWidth="10"/>
                  <circle cx="70" cy="70" r="58" fill="none" stroke="#D4A853" strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${(748/900)*364} 364`} style={{ transition:"stroke-dasharray 1s ease" }}/>
                </svg>
                <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:38, fontWeight:700, color:th.gold, lineHeight:1 }}>748</span>
                  <span style={{ fontFamily:"'Inter'", fontSize:10, color:th.textMuted, marginTop:4, letterSpacing:1 }}>GOOD</span>
                </div>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", padding:"0 8px" }}>
                {[["300","Poor"],["580","Fair"],["670","Good"],["740","V.Good"],["850","Excellent"]].map(([score, label]) => (
                  <div key={label} style={{ textAlign:"center" }}>
                    <div style={{ fontFamily:"'Inter'", fontSize:8, color:th.textMuted }}>{score}</div>
                    <div style={{ fontFamily:"'Inter'", fontSize:7, color:th.textMuted, marginTop:1 }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:14, padding:"10px 14px", background:"rgba(93,184,150,0.08)", borderRadius:12, border:"1px solid rgba(93,184,150,0.15)" }}>
                <p style={{ fontFamily:"'Inter'", fontSize:12, color:th.green }}>↑ Score improved by 12 points this month!</p>
              </div>
            </div>

            {/* Score factors */}
            <p className="section-title">Score Factors</p>
            <div style={{ ...glass, marginBottom:18 }}>
              {[
                ["Payment History","Excellent","92%","#5DB896"],
                ["Credit Utilization","Good","45%","#D4A853"],
                ["Credit Age","Fair","60%","#7B9FE0"],
                ["Credit Mix","Good","70%","#A07BE0"],
                ["New Inquiries","Excellent","88%","#5DB896"],
              ].map(([factor, status, pct, color]) => (
                <div key={factor} style={{ marginBottom:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ fontFamily:"'Inter'", fontSize:13, color:th.text, fontWeight:500 }}>{factor}</span>
                    <span style={{ fontFamily:"'Inter'", fontSize:11, color, fontWeight:600 }}>{status}</span>
                  </div>
                  <div className="bar" style={{ background:th.bar }}>
                    <div style={{ height:"100%", width:pct, background:`linear-gradient(90deg,${color},${color}99)`, borderRadius:8 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Credit Cards */}
            <p className="section-title">My Credit Cards</p>
            {[
              { name:"HDFC Regalia", network:"VISA", limit:200000, used:45000, color:"#D4A853", bg:"linear-gradient(135deg,#1A1400,#0A0F1A)" },
              { name:"ICICI Coral", network:"Mastercard", limit:100000, used:12000, color:"#7B9FE0", bg:"linear-gradient(135deg,#0D1520,#141420)" },
            ].map(card => {
              const utilPct = Math.round((card.used/card.limit)*100);
              return (
                <div key={card.name} className="card-hover" style={{ marginBottom:14, borderRadius:20, padding:"20px", background:card.bg, border:`1px solid ${card.color}33`, position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", top:-20, right:-20, width:100, height:100, borderRadius:"50%", background:`radial-gradient(circle,${card.color}18,transparent)` }} />
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
                    <div>
                      <p style={{ fontFamily:"'Inter'", fontSize:13, fontWeight:600, color:"#F0EAD6", marginBottom:2 }}>{card.name}</p>
                      <p style={{ fontFamily:"'Inter'", fontSize:10, color:"rgba(240,234,214,0.4)" }}>{card.network} •••• 4821</p>
                    </div>
                    <span style={{ fontSize:24 }}>{card.network==="VISA"?"💳":"💳"}</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                    <div>
                      <p style={{ fontFamily:"'Inter'", fontSize:9, color:"rgba(240,234,214,0.4)", textTransform:"uppercase", letterSpacing:1.5, marginBottom:3 }}>Used</p>
                      <p style={{ fontFamily:"'Inter'", fontSize:15, fontWeight:700, color:card.color }}>₹{card.used.toLocaleString()}</p>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <p style={{ fontFamily:"'Inter'", fontSize:9, color:"rgba(240,234,214,0.4)", textTransform:"uppercase", letterSpacing:1.5, marginBottom:3 }}>Limit</p>
                      <p style={{ fontFamily:"'Inter'", fontSize:15, fontWeight:700, color:"rgba(240,234,214,0.6)" }}>₹{card.limit.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="bar" style={{ background:"rgba(255,255,255,0.08)", marginBottom:6 }}>
                    <div style={{ height:"100%", width:`${utilPct}%`, background:card.color, borderRadius:8 }} />
                  </div>
                  <p style={{ fontFamily:"'Inter'", fontSize:10, color:"rgba(240,234,214,0.4)" }}>{utilPct}% utilized · Due on 5th</p>
                </div>
              );
            })}

            {/* Loan Offers */}
            <p className="section-title" style={{ marginTop:8 }}>Pre-approved Offers</p>
            {[
              { title:"Personal Loan", amount:"₹5,00,000", rate:"10.5% p.a.", tenure:"48 months", icon:"💰", color:"#D4A853" },
              { title:"Home Loan Top-up", amount:"₹20,00,000", rate:"8.75% p.a.", tenure:"120 months", icon:"🏠", color:"#7B9FE0" },
              { title:"Car Loan", amount:"₹8,00,000", rate:"9.25% p.a.", tenure:"60 months", icon:"🚗", color:"#5DB896" },
            ].map(offer => (
              <div key={offer.title} className="card-hover" style={{ ...glass, marginBottom:12, display:"flex", gap:14, alignItems:"center" }}>
                <div style={{ width:46, height:46, borderRadius:14, background:`${offer.color}12`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{offer.icon}</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontFamily:"'Inter'", fontSize:13, fontWeight:600, color:th.text, marginBottom:3 }}>{offer.title}</p>
                  <p style={{ fontFamily:"'Inter'", fontSize:11, color:th.textMuted }}>{offer.rate} · {offer.tenure}</p>
                </div>
                <div style={{ textAlign:"right" }}>
                  <p style={{ fontFamily:"'Inter'", fontSize:13, fontWeight:700, color:offer.color, marginBottom:5 }}>{offer.amount}</p>
                  <button className="btn-ghost" style={{ padding:"5px 10px", fontSize:10 }}>Apply →</button>
                </div>
              </div>
            ))}

            {/* Tips */}
            <p className="section-title" style={{ marginTop:8 }}>Tips to Improve Score</p>
            <div style={{ ...glass }}>
              {[
                ["💡","Pay bills on time","Biggest factor — set auto-pay"],
                ["📉","Reduce utilization","Keep below 30% of your limit"],
                ["🚫","Avoid new inquiries","Don't apply for too many loans"],
                ["📅","Keep old accounts","Longer history = better score"],
              ].map(([icon, tip, desc]) => (
                <div key={tip} style={{ display:"flex", gap:12, alignItems:"flex-start", padding:"10px 0", borderBottom:`1px solid ${th.row}` }}>
                  <span style={{ fontSize:18, flexShrink:0 }}>{icon}</span>
                  <div>
                    <p style={{ fontFamily:"'Inter'", fontSize:12, fontWeight:600, color:th.text, marginBottom:2 }}>{tip}</p>
                    <p style={{ fontFamily:"'Inter'", fontSize:11, color:th.textMuted }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE */}
        {tab==="profile" && (
          <div className={`fade ${mounted?"in":""}`}>
            <h2 style={{ fontSize:26, fontWeight:600, marginBottom:22, letterSpacing:-0.5 }}>Profile</h2>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:26 }}>
              <div style={{ width:76, height:76, borderRadius:22, background:`linear-gradient(135deg,${th.blue},${th.goldLight})`, display:"flex", alignItems:"center", justifyContent:"center", color:"#0A0806", fontSize:26, fontWeight:700, fontFamily:"'Inter'", marginBottom:14, boxShadow:`0 8px 32px rgba(212,168,83,0.3)` }}>MD</div>
              <h3 style={{ fontSize:20, fontWeight:600, letterSpacing:-0.3, marginBottom:4 }}>Mohindharan DK</h3>
              <p style={{ fontFamily:"'Inter'", fontSize:12, color:th.textMuted, marginBottom:8 }}>mohindharan@gmail.com</p>
              <span className="pill" style={{ background:`rgba(59,130,246,0.1)`, color:th.goldLight, border:`1px solid rgba(59,130,246,0.25)`, letterSpacing:0.5 }}>✦ Gold Member</span>
            </div>
            <div style={{ ...glass, marginBottom:12 }}>
              {[["💳","Linked Accounts","2 cards"],["🔐","Security","2FA On"],["📍","UPI ID","mohindharan@upi"],["🏦","Bank","HDFC ••4821"],["🌍","Intl. Transfer","SWIFT enabled"],["🎁","Refer & Earn","₹500/referral"],["🤖","AI Support","Chat with Aria"],["🌗","Theme",dark?"Dark Mode":"Light Mode"],["🔒","Lock App","Biometric"]].map(([icon,label,val],i) => (
                <div key={label} onClick={i===5?()=>setShowRefer(true):i===6?()=>go("support"):i===7?()=>setDark(d=>!d):i===4?()=>setShowIntl(true):i===8?()=>setLocked(true):undefined} style={{ ...row, cursor:i>=4?"pointer":"default" }}>
                  <span style={{ fontSize:17 }}>{icon}</span>
                  <span style={{ fontFamily:"'Inter'", fontSize:13, color:th.textSub, flex:1 }}>{label}</span>
                  <span style={{ fontFamily:"'Inter'", fontSize:11, color:th.gold }}>{val}</span>
                </div>
              ))}
            </div>
            <button className="btn-ghost" style={{ width:"100%", marginTop:8, color:th.pink, borderColor:`rgba(224,123,159,0.25)` }}>Sign Out</button>
          </div>
        )}
      </div>

      {/* ── TAB BAR ── */}
      <div className="tab-bar" style={{ background:th.tab }}>
        {TABS.map(([id,icon,label]) => (
          <div key={id} className={`ti ${tab===id?"active":""}`} onClick={() => go(id)}>
            <span className="ti-icon">{icon}</span>
            <span className="ti-lbl">{label}</span>
          </div>
        ))}
      </div>

      {/* ── SEND MODAL ── */}
      {showSend && (
        <div className="overlay" onClick={e => e.target===e.currentTarget && setShowSend(false)}>
          <div className="sheet" style={{ background:th.modal, border:`1px solid ${th.border}` }}>
            <div className="sheet-inner"><div className="sheet-handle"></div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
                <h3 style={{ fontSize:20, fontWeight:600, letterSpacing:-0.3 }}>Send Money</h3>
                <button onClick={() => setShowSend(false)} style={{ background:th.surface, border:`1px solid ${th.border}`, borderRadius:10, width:32, height:32, cursor:"pointer", color:th.textMuted, fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
              </div>
              {sendSuccess ? (
                <div className="success-wrap"><div style={{ fontSize:36, marginBottom:8 }}>✓</div><p style={{ fontSize:15, fontWeight:600 }}>₹{sendAmount} sent to {sendTo}!</p></div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  <div><label style={lbl}>Recipient</label><input style={inp} placeholder="Name, UPI ID or phone" value={sendTo} onChange={e => setSendTo(e.target.value)} /></div>
                  <div><label style={lbl}>Amount (₹)</label><input style={inp} placeholder="0.00" type="number" value={sendAmount} onChange={e => setSendAmount(e.target.value)} /></div>
                  <div style={{ display:"flex", gap:7 }}>{[500,1000,2000,5000].map(a => <button key={a} onClick={() => setSendAmount(String(a))} className="btn-ghost" style={{ flex:1, padding:"8px 4px", fontSize:11 }}>₹{a}</button>)}</div>
                  <button className="btn-primary" onClick={handleSend}>Send Money →</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── BILL MODAL ── */}
      {showBill && (
        <div className="overlay" onClick={e => e.target===e.currentTarget && setShowBill(null)}>
          <div className="sheet" style={{ background:th.modal, border:`1px solid ${th.border}` }}>
            <div className="sheet-inner"><div className="sheet-handle"></div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                <h3 style={{ fontSize:20, fontWeight:600, letterSpacing:-0.3 }}>Pay {showBill} Bill</h3>
                <button onClick={() => setShowBill(null)} style={{ background:th.surface, border:`1px solid ${th.border}`, borderRadius:10, width:32, height:32, cursor:"pointer", color:th.textMuted, fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
              </div>
              {billSuccess ? (
                <div className="success-wrap"><div style={{ fontSize:36, marginBottom:8 }}>✓</div><p style={{ fontSize:15, fontWeight:600 }}>{showBill} bill of ₹{billAmount} paid!</p></div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>{billServices.map(s => <button key={s.name} onClick={() => setShowBill(s.name)} className="btn-ghost" style={{ padding:"5px 10px", fontSize:11, background:showBill===s.name?"rgba(212,168,83,0.15)":undefined, borderColor:showBill===s.name?th.gold:undefined }}>{s.icon} {s.name}</button>)}</div>
                  <div><label style={lbl}>{showBill==="Mobile"?"Mobile Number":showBill==="Internet"?"Account ID":showBill==="DTH"?"Customer ID":"Account Number"}</label><input style={inp} placeholder="Enter number / ID" value={billNumber} onChange={e => setBillNumber(e.target.value)} /></div>
                  <div><label style={lbl}>Amount (₹)</label><input style={inp} placeholder="0.00" type="number" value={billAmount} onChange={e => setBillAmount(e.target.value)} /></div>
                  <button className="btn-primary" onClick={handleBill}>Pay Now →</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── QR MODAL ── */}
      {showQR && (
        <div className="overlay" onClick={e => e.target===e.currentTarget && (setShowQR(false), setScannerActive(false))}>
          <div className="sheet" style={{ background:th.modal, border:`1px solid ${th.border}` }}>
            <div className="sheet-inner"><div className="sheet-handle"></div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
                <h3 style={{ fontSize:20, fontWeight:600, letterSpacing:-0.3 }}>QR Payment</h3>
                <button onClick={() => { setShowQR(false); setScannerActive(false); setScanResult(null); }} style={{ background:th.surface, border:`1px solid ${th.border}`, borderRadius:10, width:32, height:32, cursor:"pointer", color:th.textMuted, fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
              </div>
              <div style={{ display:"flex", gap:6, marginBottom:20, background:th.input, borderRadius:14, padding:4 }}>
                {["My QR","Scan QR"].map(t => (
                  <button key={t} onClick={() => { setQrTab(t); setScanResult(null); setScannerActive(false); }} style={{ flex:1, padding:"9px", borderRadius:11, border:"none", cursor:"pointer", fontFamily:"'Inter',sans-serif", fontSize:13, fontWeight:600, background:qrTab===t?`linear-gradient(135deg,${th.gold},${th.goldLight})`:undefined, color:qrTab===t?"#0A0806":th.textMuted, transition:"all .2s", boxShadow:qrTab===t?"0 2px 8px rgba(212,168,83,0.2)":"none" }}>{t}</button>
                ))}
              </div>
              {qrTab==="My QR" ? (
                <div style={{ textAlign:"center" }}>
                  <div style={{ background:"white", borderRadius:18, padding:18, display:"inline-block", marginBottom:14, boxShadow:"0 8px 32px rgba(0,0,0,0.15)" }}>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(15,1fr)", gap:2, width:170, height:170 }}>
                      {QR_PATTERN.map((v,i) => <div key={i} style={{ background:v?"#09090F":"white", borderRadius:1 }} />)}
                    </div>
                  </div>
                  <p style={{ fontFamily:"'Inter'", fontSize:14, fontWeight:600, color:th.text, marginBottom:4 }}>mohindharan@upi</p>
                  <p style={{ fontFamily:"'Inter'", fontSize:11, color:th.textMuted, marginBottom:18 }}>Scan to pay Mohindharan DK</p>
                  <button className="btn-primary">📤 Share QR Code</button>
                </div>
              ) : (
                <div>
                  {scanResult ? (
                    <div style={{ textAlign:"center" }}>
                      <div style={{ fontSize:44, marginBottom:10 }}>✅</div>
                      <p style={{ fontFamily:"'Inter'", fontSize:14, fontWeight:600, color:th.green, marginBottom:10 }}>QR Scanned!</p>
                      <div style={{ background:th.input, border:`1px solid ${th.border}`, borderRadius:14, padding:"12px 16px", marginBottom:16, wordBreak:"break-all", textAlign:"left" }}>
                        <p style={{ fontFamily:"'Inter'", fontSize:10, color:th.textMuted, marginBottom:4, textTransform:"uppercase", letterSpacing:1 }}>UPI / Payment Info</p>
                        <p style={{ fontFamily:"'Inter'", fontSize:13, color:th.text }}>{scanResult}</p>
                      </div>
                      <div style={{ display:"flex", gap:8 }}>
                        <button className="btn-primary" onClick={() => { setShowQR(false); setScanResult(null); setShowSend(true); }}>Pay Now →</button>
                        <button className="btn-ghost" onClick={() => { setScanResult(null); setScannerActive(false); }} style={{ flex:"0 0 auto" }}>Rescan</button>
                      </div>
                    </div>
                  ) : (
                    <QRScanner th={th} onScan={(r) => { setScanResult(r); setScannerActive(false); }} scannerActive={scannerActive} setScannerActive={setScannerActive} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── SPLIT MODAL ── */}
      {showSplit && (
        <div className="overlay" onClick={e => e.target===e.currentTarget && setShowSplit(false)}>
          <div className="sheet" style={{ background:th.modal, border:`1px solid ${th.border}` }}>
            <div className="sheet-inner"><div className="sheet-handle"></div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                <h3 style={{ fontSize:20, fontWeight:600, letterSpacing:-0.3 }}>Split Bill</h3>
                <button onClick={() => setShowSplit(false)} style={{ background:th.surface, border:`1px solid ${th.border}`, borderRadius:10, width:32, height:32, cursor:"pointer", color:th.textMuted, fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
              </div>
              {splitSuccess ? (
                <div className="success-wrap"><div style={{ fontSize:36, marginBottom:8 }}>✓</div><p style={{ fontSize:15, fontWeight:600 }}>Split requests sent!</p><p style={{ fontSize:12, marginTop:5, opacity:.7 }}>₹{Math.round(parseInt(splitAmount)/(splitPeople.length+1))} each · {splitPeople.join(", ")}</p></div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:15 }}>
                  <div><label style={lbl}>Total Amount (₹)</label><input style={inp} placeholder="0.00" type="number" value={splitAmount} onChange={e => setSplitAmount(e.target.value)} /></div>
                  <div>
                    <label style={lbl}>Split with</label>
                    <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                      {contacts.filter(c => c.name!=="+ Add").map(c => {
                        const sel = splitPeople.includes(c.name);
                        return (
                          <div key={c.name} onClick={() => setSplitPeople(p => p.includes(c.name)?p.filter(x=>x!==c.name):[...p,c.name])} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, cursor:"pointer" }}>
                            <div style={{ width:46, height:46, borderRadius:"50%", background:sel?`${c.color}30`:`${c.color}12`, border:`1.5px solid ${sel?c.color:c.color+"30"}`, display:"flex", alignItems:"center", justifyContent:"center", color:c.color, fontFamily:"'Inter'", fontWeight:600, fontSize:12, transition:"all .2s" }}>{sel?"✓":c.initials}</div>
                            <span style={{ fontFamily:"'Inter'", fontSize:9, color:th.textSub }}>{c.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {splitAmount && splitPeople.length>0 && (
                    <div style={{ background:`rgba(212,168,83,0.07)`, border:`1px solid rgba(212,168,83,0.15)`, borderRadius:14, padding:"14px 16px" }}>
                      <p style={{ fontFamily:"'Inter'", fontSize:11, color:th.textMuted, marginBottom:5 }}>Each person pays</p>
                      <p style={{ fontFamily:"'Inter'", fontSize:26, fontWeight:700, color:th.gold, letterSpacing:-1 }}>₹{Math.round(parseInt(splitAmount)/(splitPeople.length+1))}</p>
                      <p style={{ fontFamily:"'Inter'", fontSize:10, color:th.textMuted, marginTop:4 }}>Split {splitPeople.length+1} ways · you + {splitPeople.join(", ")}</p>
                    </div>
                  )}
                  <button className="btn-primary" onClick={handleSplit}>Send Split Requests →</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── INTERNATIONAL MODAL ── */}
      {showIntl && (
        <div className="overlay" onClick={e => e.target===e.currentTarget && (setShowIntl(false), setShowCurrencyPicker(false))}>
          <div className="sheet" style={{ background:th.modal, border:`1px solid ${th.border}` }}>
            <div className="sheet-inner"><div className="sheet-handle"></div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                <div>
                  <h3 style={{ fontSize:20, fontWeight:600, letterSpacing:-0.3 }}>🌍 International Transfer</h3>
                  <p style={{ fontFamily:"'Inter'", fontSize:11, color:th.textMuted, marginTop:3 }}>SWIFT · WIRE · Best live rates</p>
                </div>
                <button onClick={() => setShowIntl(false)} style={{ background:th.surface, border:`1px solid ${th.border}`, borderRadius:10, width:32, height:32, cursor:"pointer", color:th.textMuted, fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
              </div>
              {intlSuccess ? (
                <div className="success-wrap" style={{ marginTop:18 }}><div style={{ fontSize:36, marginBottom:8 }}>✓</div><p style={{ fontSize:15, fontWeight:600 }}>Transfer initiated!</p><p style={{ fontSize:12, marginTop:5, opacity:.75 }}>{intlCurrency.flag} {intlAmount} {intlCurrency.code} → {intlRecipient}</p><p style={{ fontSize:11, marginTop:4, opacity:.55 }}>Arrives in 1–3 business days</p></div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:13, marginTop:16 }}>
                  <div>
                    <label style={lbl}>Send Currency</label>
                    <button onClick={() => setShowCurrencyPicker(p=>!p)} style={{ ...inp, display:"flex", alignItems:"center", gap:10, cursor:"pointer", background:th.input, textAlign:"left" }}>
                      <span style={{ fontSize:20 }}>{intlCurrency.flag}</span>
                      <span style={{ flex:1, color:th.text }}>{intlCurrency.code} — {intlCurrency.name}</span>
                      <span style={{ color:th.textMuted, fontSize:11 }}>{showCurrencyPicker?"▲":"▼"}</span>
                    </button>
                    {showCurrencyPicker && (
                      <div style={{ background:th.modal, border:`1px solid ${th.border}`, borderRadius:14, marginTop:4, overflow:"hidden", maxHeight:200, overflowY:"auto" }}>
                        {currencies.map(c => (
                          <div key={c.code} onClick={() => { setIntlCurrency(c); setShowCurrencyPicker(false); }} style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 14px", cursor:"pointer", background:intlCurrency.code===c.code?`rgba(212,168,83,0.08)`:"transparent", borderBottom:`1px solid ${th.row}`, transition:"background .15s" }}>
                            <span style={{ fontSize:18 }}>{c.flag}</span>
                            <span style={{ fontFamily:"'Inter'", fontSize:13, fontWeight:600, color:th.text }}>{c.code}</span>
                            <span style={{ fontFamily:"'Inter'", fontSize:11, color:th.textMuted, flex:1 }}>{c.name}</span>
                            <span style={{ fontFamily:"'Inter'", fontSize:11, color:th.gold }}>₹{c.rate}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label style={lbl}>Amount ({intlCurrency.code})</label>
                    <input style={inp} placeholder={`0.00 ${intlCurrency.code}`} type="number" value={intlAmount} onChange={e => setIntlAmount(e.target.value)} />
                    {intlINR && (
                      <>
                        <div style={{ display:"flex", justifyContent:"space-between", marginTop:8, padding:"10px 13px", background:`rgba(212,168,83,0.06)`, borderRadius:11 }}>
                          <span style={{ fontFamily:"'Inter'", fontSize:11, color:th.textMuted }}>You pay (INR)</span>
                          <span style={{ fontFamily:"'Inter'", fontSize:13, fontWeight:700, color:th.gold }}>₹{parseFloat(intlINR).toLocaleString("en-IN")}</span>
                        </div>
                        <div style={{ display:"flex", justifyContent:"space-between", marginTop:4, padding:"8px 13px", background:th.input, borderRadius:11 }}>
                          <span style={{ fontFamily:"'Inter'", fontSize:10, color:th.textMuted }}>Transfer fee (0.5%)</span>
                          <span style={{ fontFamily:"'Inter'", fontSize:11, color:th.textSub }}>₹{parseFloat(intlFee).toLocaleString("en-IN")}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div><label style={lbl}>Recipient Name</label><input style={inp} placeholder="Full legal name" value={intlRecipient} onChange={e => setIntlRecipient(e.target.value)} /></div>
                  <div><label style={lbl}>Bank Account / IBAN</label><input style={inp} placeholder="Account number or IBAN" value={intlAccount} onChange={e => setIntlAccount(e.target.value)} /></div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 13px", background:"rgba(93,184,150,0.06)", border:"1px solid rgba(93,184,150,0.15)", borderRadius:11 }}>
                    <span style={{ fontSize:13 }}>ℹ️</span>
                    <p style={{ fontFamily:"'Inter'", fontSize:11, color:th.green, lineHeight:1.5 }}>Live rate: 1 {intlCurrency.code} = ₹{intlCurrency.rate} · 1–3 business days</p>
                  </div>
                  <button className="btn-primary" onClick={handleIntl}>Send Internationally →</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── TRANSACTION CHAT ── */}
      {showChat && (
        <div className="overlay" onClick={e => e.target===e.currentTarget && setShowChat(null)}>
          <div className="chat-full" style={{ background:th.modal, border:`1px solid ${th.border}` }}>
            <div style={{ padding:"20px 22px 16px", borderBottom:`1px solid ${th.row}`, display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
              <div style={{ width:40, height:40, borderRadius:13, background:showChat.amount>0?"rgba(93,184,150,0.1)":"rgba(212,168,83,0.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{showChat.icon}</div>
              <div style={{ flex:1 }}>
                <p style={{ fontFamily:"'Inter'", fontSize:14, fontWeight:600, color:th.text, marginBottom:2 }}>{showChat.name}</p>
                <p style={{ fontFamily:"'Inter'", fontSize:10, color:th.textMuted }}>{showChat.date} · <span style={{ color:showChat.amount>0?th.green:th.pink }}>{showChat.amount>0?"+ ":"– "}₹{Math.abs(showChat.amount).toLocaleString()}</span></p>
              </div>
              <button onClick={() => setShowChat(null)} style={{ background:th.surface, border:`1px solid ${th.border}`, borderRadius:10, width:32, height:32, cursor:"pointer", color:th.textMuted, fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
            </div>
            <div style={{ flex:1, overflowY:"auto", padding:"16px 20px", display:"flex", flexDirection:"column", gap:10 }}>
              <div style={{ alignSelf:"center", background:`rgba(212,168,83,0.07)`, border:`1px solid rgba(212,168,83,0.15)`, borderRadius:12, padding:"10px 16px", textAlign:"center", marginBottom:6 }}>
                <p style={{ fontFamily:"'Inter'", fontSize:10, color:th.gold, fontWeight:600, letterSpacing:0.5, marginBottom:3 }}>📋 Transaction Receipt · {showChat.date}</p>
                <p style={{ fontFamily:"'Inter'", fontSize:13, color:th.text }}>{showChat.amount>0?"+ ":"– "}₹{Math.abs(showChat.amount).toLocaleString()} · {showChat.category}</p>
              </div>
              {txMessages[showChat.id]?.length===0 && <p style={{ fontFamily:"'Inter'", fontSize:12, color:th.textMuted, textAlign:"center", marginTop:20 }}>No messages yet. Say something! 👋</p>}
              {txMessages[showChat.id]?.map((msg,i) => (
                <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:msg.from==="me"?"flex-end":"flex-start" }}>
                  <div style={{ maxWidth:"76%", padding:"11px 14px", borderRadius:msg.from==="me"?"16px 16px 4px 16px":"16px 16px 16px 4px", background:msg.from==="me"?`rgba(212,168,83,0.14)`:`rgba(255,255,255,0.05)`, border:msg.from==="me"?`1px solid rgba(212,168,83,0.2)`:`1px solid rgba(255,255,255,0.07)`, fontFamily:"'Inter',sans-serif", fontSize:13, lineHeight:1.5, color:th.text }}>{msg.text}</div>
                  <span style={{ fontFamily:"'Inter'", fontSize:9, color:th.textMuted, marginTop:3, padding:"0 4px" }}>{msg.time}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div style={{ padding:"12px 18px 24px", borderTop:`1px solid ${th.row}`, display:"flex", gap:10, flexShrink:0 }}>
              <input style={{ ...inp, flex:1, padding:"11px 14px", fontSize:13 }} placeholder="Type a message…" value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key==="Enter" && sendChat()} />
              <button onClick={sendChat} style={{ background:`linear-gradient(135deg,${th.blue},${th.goldLight})`, border:"none", borderRadius:12, width:44, height:44, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center", color:"#0A0806", flexShrink:0 }}>↑</button>
            </div>
          </div>
        </div>
      )}

      {/* ── ADD GOAL ── */}
      {showAddGoal && (
        <div className="overlay" onClick={e => e.target===e.currentTarget && setShowAddGoal(false)}>
          <div className="sheet" style={{ background:th.modal, border:`1px solid ${th.border}` }}>
            <div className="sheet-inner"><div className="sheet-handle"></div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                <h3 style={{ fontSize:20, fontWeight:600, letterSpacing:-0.3 }}>New Savings Goal</h3>
                <button onClick={() => setShowAddGoal(false)} style={{ background:th.surface, border:`1px solid ${th.border}`, borderRadius:10, width:32, height:32, cursor:"pointer", color:th.textMuted, fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                <div><label style={lbl}>Goal Name</label><input style={inp} placeholder="e.g. New Laptop, Europe Trip" value={newGoalName} onChange={e => setNewGoalName(e.target.value)} /></div>
                <div><label style={lbl}>Target Amount (₹)</label><input style={inp} placeholder="50000" type="number" value={newGoalTarget} onChange={e => setNewGoalTarget(e.target.value)} /></div>
                <button className="btn-primary" onClick={addGoal}>Create Goal →</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── INSTANT LOAN MODAL ── */}
      {showInstantLoan && (
        <div className="overlay" onClick={e => e.target===e.currentTarget && (setShowInstantLoan(false), setLoanStep(1))}>
          <div className="sheet" style={{ background:th.modal, border:`1px solid ${th.border}` }}>
            <div className="sheet-inner"><div className="sheet-handle"></div>

              {/* Header */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:36, height:36, borderRadius:11, background:"rgba(93,184,150,0.12)", border:"1px solid rgba(93,184,150,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>⚡</div>
                  <div>
                    <h3 style={{ fontSize:18, fontWeight:600, letterSpacing:-0.3 }}>Instant Loan</h3>
                    <p style={{ fontFamily:"'Inter'", fontSize:10, color:th.green, marginTop:1 }}>Step {loanStep} of 4</p>
                  </div>
                </div>
                <button onClick={() => { setShowInstantLoan(false); setLoanStep(1); }} style={{ background:th.surface, border:`1px solid ${th.border}`, borderRadius:10, width:32, height:32, cursor:"pointer", color:th.textMuted, fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
              </div>

              {/* Progress bar */}
              <div style={{ height:3, background:th.bar, borderRadius:4, marginBottom:24, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${(loanStep/4)*100}%`, background:"linear-gradient(90deg,#5DB896,#D4A853)", borderRadius:4, transition:"width 0.4s ease" }} />
              </div>

              {/* Step 1 — Eligibility Check */}
              {loanStep===1 && (
                <div>
                  <p style={{ fontFamily:"'Inter'", fontSize:14, fontWeight:600, color:th.text, marginBottom:16 }}>Checking your eligibility...</p>

                  {/* Eligibility criteria */}
                  {[
                    ["Credit Score","748 — Good ✓","#5DB896",true],
                    ["Account Age","8 months ✓","#5DB896",true],
                    ["Salary Credits","Regular ✓","#5DB896",true],
                    ["Active Loans","1 loan — OK ✓","#D4A853",true],
                    ["KYC Status","Verified ✓","#5DB896",true],
                  ].map(([label, value, color, passed]) => (
                    <div key={label} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", background:th.surface, border:`1px solid ${th.border}`, borderRadius:14, marginBottom:8 }}>
                      <div style={{ width:28, height:28, borderRadius:"50%", background:passed?"rgba(93,184,150,0.12)":"rgba(224,123,159,0.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, flexShrink:0 }}>{passed?"✓":"✗"}</div>
                      <div style={{ flex:1 }}>
                        <p style={{ fontFamily:"'Inter'", fontSize:12, color:th.textSub }}>{label}</p>
                      </div>
                      <span style={{ fontFamily:"'Inter'", fontSize:12, fontWeight:600, color }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ background:"rgba(93,184,150,0.08)", border:"1px solid rgba(93,184,150,0.2)", borderRadius:16, padding:"16px", marginTop:16, marginBottom:20, textAlign:"center" }}>
                    <p style={{ fontFamily:"'Inter'", fontSize:11, color:th.textMuted, marginBottom:4 }}>You are eligible for</p>
                    <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:36, fontWeight:700, color:th.green, letterSpacing:-1 }}>₹10,000</p>
                    <p style={{ fontFamily:"'Inter'", fontSize:11, color:th.textMuted, marginTop:4 }}>Based on your credit profile</p>
                  </div>

                  <button className="btn-primary" onClick={() => setLoanStep(2)}>Check My Offer →</button>
                </div>
              )}

              {/* Step 2 — Choose Amount & Tenure */}
              {loanStep===2 && (
                <div>
                  <p style={{ fontFamily:"'Inter'", fontSize:14, fontWeight:600, color:th.text, marginBottom:20 }}>Choose your loan amount</p>

                  {/* Amount slider */}
                  <div style={{ ...glass, marginBottom:16, textAlign:"center" }}>
                    <p style={{ fontFamily:"'Inter'", fontSize:10, color:th.textMuted, textTransform:"uppercase", letterSpacing:2, marginBottom:8 }}>Loan Amount</p>
                    <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:40, fontWeight:700, color:th.gold, letterSpacing:-1, marginBottom:12 }}>₹{loanAmount.toLocaleString()}</p>
                    <input type="range" min="1000" max="10000" step="500" value={loanAmount} onChange={e => setLoanAmount(parseInt(e.target.value))} style={{ width:"100%", accentColor:"#D4A853", cursor:"pointer" }} />
                    <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
                      <span style={{ fontFamily:"'Inter'", fontSize:10, color:th.textMuted }}>₹1,000</span>
                      <span style={{ fontFamily:"'Inter'", fontSize:10, color:th.textMuted }}>₹10,000</span>
                    </div>
                  </div>

                  {/* Quick amounts */}
                  <div style={{ display:"flex", gap:8, marginBottom:16 }}>
                    {[2000,5000,7500,10000].map(a => (
                      <button key={a} onClick={() => setLoanAmount(a)} className="btn-ghost" style={{ flex:1, padding:"8px 4px", fontSize:11, background:loanAmount===a?"rgba(212,168,83,0.15)":"transparent", borderColor:loanAmount===a?"rgba(212,168,83,0.5)":"rgba(212,168,83,0.2)" }}>₹{a>=1000?`${a/1000}K`:a}</button>
                    ))}
                  </div>

                  {/* Tenure */}
                  <p style={{ fontFamily:"'Inter'", fontSize:12, fontWeight:600, color:th.text, marginBottom:10 }}>Repayment Period</p>
                  <div style={{ display:"flex", gap:8, marginBottom:20 }}>
                    {[30,60,90].map(t => (
                      <button key={t} onClick={() => setLoanTenure(t)} style={{ flex:1, padding:"12px 8px", borderRadius:14, border:`1px solid ${loanTenure===t?"rgba(93,184,150,0.5)":"rgba(212,168,83,0.15)"}`, background:loanTenure===t?"rgba(93,184,150,0.1)":"transparent", cursor:"pointer", transition:"all .2s" }}>
                        <p style={{ fontFamily:"'Inter'", fontSize:14, fontWeight:700, color:loanTenure===t?th.green:th.text }}>{t}</p>
                        <p style={{ fontFamily:"'Inter'", fontSize:9, color:th.textMuted, marginTop:2 }}>days</p>
                      </button>
                    ))}
                  </div>

                  {/* Summary */}
                  <div style={{ background:"rgba(212,168,83,0.06)", border:`1px solid rgba(212,168,83,0.15)`, borderRadius:16, padding:"14px 16px", marginBottom:20 }}>
                    {[
                      ["Loan Amount", `₹${loanAmount.toLocaleString()}`],
                      ["Interest (1.5%/mo)", `₹${Math.round(loanAmount * 0.015 * loanTenure/30).toLocaleString()}`],
                      ["Processing Fee", "₹0"],
                      ["Total Repayment", `₹${Math.round(loanAmount + loanAmount * 0.015 * loanTenure/30).toLocaleString()}`],
                    ].map(([label, value], i) => (
                      <div key={label} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom: i<3?`1px solid ${th.row}`:"none" }}>
                        <span style={{ fontFamily:"'Inter'", fontSize:12, color:th.textMuted }}>{label}</span>
                        <span style={{ fontFamily:"'Inter'", fontSize:12, fontWeight: i===3?700:400, color: i===3?th.gold:th.text }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  <button className="btn-primary" onClick={() => setLoanStep(3)}>Continue →</button>
                </div>
              )}

              {/* Step 3 — Confirm */}
              {loanStep===3 && (
                <div>
                  <p style={{ fontFamily:"'Inter'", fontSize:14, fontWeight:600, color:th.text, marginBottom:20 }}>Confirm loan details</p>

                  <div style={{ ...glass, marginBottom:16 }}>
                    {[
                      ["💰","Loan Amount",`₹${loanAmount.toLocaleString()}`],
                      ["📅","Tenure",`${loanTenure} days`],
                      ["💳","Disbursed to","HDFC ••4821"],
                      ["📊","Interest Rate","1.5% per month"],
                      ["🔄","Total Repayment",`₹${Math.round(loanAmount + loanAmount * 0.015 * loanTenure/30).toLocaleString()}`],
                      ["📆","Due Date",`${new Date(Date.now() + loanTenure*86400000).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}`],
                    ].map(([icon,label,value]) => (
                      <div key={label} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:`1px solid ${th.row}` }}>
                        <span style={{ fontSize:16 }}>{icon}</span>
                        <span style={{ fontFamily:"'Inter'", fontSize:13, color:th.textSub, flex:1 }}>{label}</span>
                        <span style={{ fontFamily:"'Inter'", fontSize:13, fontWeight:600, color:th.gold }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Purpose */}
                  <div style={{ marginBottom:20 }}>
                    <label style={lbl}>Purpose (optional)</label>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                      {["Medical","Travel","Shopping","Education","Bills","Other"].map(p => (
                        <button key={p} onClick={() => setLoanPurpose(p)} className="btn-ghost" style={{ padding:"7px 14px", fontSize:12, background:loanPurpose===p?"rgba(212,168,83,0.15)":"transparent", borderColor:loanPurpose===p?"rgba(212,168,83,0.5)":"rgba(212,168,83,0.2)" }}>{p}</button>
                      ))}
                    </div>
                  </div>

                  <div style={{ background:"rgba(93,184,150,0.06)", border:"1px solid rgba(93,184,150,0.15)", borderRadius:14, padding:"12px 14px", marginBottom:20 }}>
                    <p style={{ fontFamily:"'Inter'", fontSize:11, color:th.green }}>⚡ Money will be credited to your HDFC account within 60 seconds of approval</p>
                  </div>

                  <button className="btn-primary" onClick={() => setLoanStep(4)}>🔐 Confirm & Get Money →</button>
                </div>
              )}

              {/* Step 4 — Success */}
              {loanStep===4 && (
                <div style={{ textAlign:"center", padding:"20px 0" }}>
                  <div style={{ fontSize:64, marginBottom:16 }}>⚡</div>
                  <div style={{ width:80, height:80, borderRadius:"50%", background:"rgba(93,184,150,0.12)", border:"2px solid rgba(93,184,150,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, margin:"0 auto 20px" }}>✓</div>
                  <h3 style={{ fontSize:24, fontWeight:700, color:th.green, letterSpacing:-0.5, marginBottom:8 }}>Loan Approved!</h3>
                  <p style={{ fontFamily:"'Inter'", fontSize:13, color:th.textMuted, marginBottom:20 }}>₹{loanAmount.toLocaleString()} is being credited to your account</p>

                  <div style={{ ...glass, marginBottom:20, textAlign:"left" }}>
                    {[
                      ["Amount Credited", `₹${loanAmount.toLocaleString()}`,"#5DB896"],
                      ["Account", "HDFC ••4821", th.text],
                      ["Loan ID", "PF2024031500" + Math.floor(Math.random()*99), th.textSub],
                      ["Due Date", `${new Date(Date.now() + loanTenure*86400000).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}`, th.gold],
                    ].map(([label, value, color]) => (
                      <div key={label} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${th.row}` }}>
                        <span style={{ fontFamily:"'Inter'", fontSize:12, color:th.textMuted }}>{label}</span>
                        <span style={{ fontFamily:"'Inter'", fontSize:12, fontWeight:600, color }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ background:"rgba(212,168,83,0.06)", border:`1px solid rgba(212,168,83,0.15)`, borderRadius:14, padding:"12px 14px", marginBottom:24 }}>
                    <p style={{ fontFamily:"'Inter'", fontSize:11, color:th.textMuted }}>💡 Set a reminder to repay on time to maintain your credit score</p>
                  </div>

                  <button className="btn-primary" onClick={() => { setShowInstantLoan(false); setLoanStep(1); }}>Done ✓</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── REFER & EARN ── */}
      {showRefer && (
        <div className="overlay" onClick={e => e.target===e.currentTarget && setShowRefer(false)}>
          <div className="sheet" style={{ background:th.modal, border:`1px solid ${th.border}` }}>
            <div className="sheet-inner"><div className="sheet-handle"></div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
                <h3 style={{ fontSize:20, fontWeight:600, letterSpacing:-0.3 }}>Refer & Earn</h3>
                <button onClick={() => setShowRefer(false)} style={{ background:th.surface, border:`1px solid ${th.border}`, borderRadius:10, width:32, height:32, cursor:"pointer", color:th.textMuted, fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
              </div>

              {/* Hero banner */}
              <div style={{ background:"linear-gradient(135deg,rgba(212,168,83,0.15),rgba(212,168,83,0.05))", border:`1px solid rgba(212,168,83,0.25)`, borderRadius:22, padding:"24px 20px", marginBottom:22, textAlign:"center", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120, borderRadius:"50%", background:"radial-gradient(circle,rgba(212,168,83,0.15),transparent)", pointerEvents:"none" }} />
                <div style={{ fontSize:44, marginBottom:12 }}>🎁</div>
                <p style={{ fontFamily:"'Inter'", fontSize:11, color:th.textMuted, letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>You earn</p>
                <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:42, fontWeight:700, color:th.gold, letterSpacing:-1, lineHeight:1, marginBottom:6 }}>₹500</h2>
                <p style={{ fontFamily:"'Inter'", fontSize:12, color:th.textMuted }}>for every friend who joins & pays</p>
              </div>

              {/* Steps */}
              <div style={{ marginBottom:22 }}>
                <p style={{ fontFamily:"'Inter'", fontSize:10, color:th.textMuted, textTransform:"uppercase", letterSpacing:2, marginBottom:14 }}>How it works</p>
                {[["1️⃣","Share your code","Send it to friends & family"],["2️⃣","They sign up","Using your referral code"],["3️⃣","Earn ₹500","When they make their first payment"]].map(([num,title,desc]) => (
                  <div key={title} style={{ display:"flex", gap:14, alignItems:"center", marginBottom:14 }}>
                    <span style={{ fontSize:20, flexShrink:0 }}>{num}</span>
                    <div>
                      <p style={{ fontFamily:"'Inter'", fontSize:13, fontWeight:600, color:th.text, marginBottom:2 }}>{title}</p>
                      <p style={{ fontFamily:"'Inter'", fontSize:11, color:th.textMuted }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Referral code box */}
              <div style={{ background:th.surface, border:`1px solid ${th.border}`, borderRadius:16, padding:"16px 20px", marginBottom:14, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <p style={{ fontFamily:"'Inter'", fontSize:10, color:th.textMuted, textTransform:"uppercase", letterSpacing:1.5, marginBottom:5 }}>Your referral code</p>
                  <p style={{ fontFamily:"'Inter'", fontSize:20, fontWeight:700, color:th.gold, letterSpacing:2 }}>PAYFLOW-MOHIN</p>
                </div>
                <button onClick={handleRefer} style={{ background:referCopied?"rgba(93,184,150,0.15)":"rgba(212,168,83,0.1)", border:`1px solid ${referCopied?"rgba(93,184,150,0.3)":"rgba(212,168,83,0.25)"}`, borderRadius:12, padding:"10px 16px", cursor:"pointer", fontFamily:"'Inter'", fontSize:12, fontWeight:600, color:referCopied?th.green:th.gold, transition:"all .3s" }}>
                  {referCopied ? "✓ Copied!" : "Copy"}
                </button>
              </div>

              {/* Share button */}
              <button className="btn-primary" onClick={() => {
                if (navigator.share) {
                  navigator.share({ title:"Join PayFlow!", text:"Use my code PAYFLOW-MOHIN to join PayFlow and get ₹500 cashback on your first payment! 🎉", url:"https://payflow.app" });
                } else { handleRefer(); }
              }}>📤 Share with Friends</button>

              {/* Stats */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginTop:18 }}>
                {[["Friends Referred","3"],["Total Earned","₹1,500"]].map(([l,v]) => (
                  <div key={l} style={{ background:th.surface, border:`1px solid ${th.border}`, borderRadius:16, padding:"16px", textAlign:"center" }}>
                    <p style={{ fontFamily:"'Inter'", fontSize:10, color:th.textMuted, textTransform:"uppercase", letterSpacing:1.5, marginBottom:8 }}>{l}</p>
                    <p style={{ fontFamily:"'Inter'", fontSize:22, fontWeight:700, color:th.gold }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── NOTIFICATIONS ── */}
      {showNotif && (
        <div className="overlay" onClick={e => e.target===e.currentTarget && setShowNotif(false)}>
          <div className="sheet" style={{ background:th.modal, border:`1px solid ${th.border}` }}>
            <div className="sheet-inner"><div className="sheet-handle"></div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
                <h3 style={{ fontSize:20, fontWeight:600, letterSpacing:-0.3 }}>Notifications</h3>
                <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                  <span onClick={() => setNotifications(ns=>ns.map(n=>({...n,read:true})))} style={{ fontFamily:"'Inter'", fontSize:11, color:th.gold, cursor:"pointer", letterSpacing:0.2 }}>Mark all read</span>
                  <button onClick={() => setShowNotif(false)} style={{ background:th.surface, border:`1px solid ${th.border}`, borderRadius:10, width:32, height:32, cursor:"pointer", color:th.textMuted, fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
                </div>
              </div>
              {notifications.map(n => (
                <div key={n.id} style={{ ...row, alignItems:"flex-start" }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:n.read?"transparent":th.gold, marginTop:5, flexShrink:0, border:n.read?`1px solid ${th.border}`:"none", boxShadow:n.read?"none":`0 0 6px rgba(212,168,83,0.6)` }} />
                  <div>
                    <p style={{ fontFamily:"'Inter'", fontSize:13, color:n.read?th.textSub:th.text, marginBottom:3 }}>{n.msg}</p>
                    <p style={{ fontFamily:"'Inter'", fontSize:10, color:th.textMuted }}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>{/* end z-index wrapper */}
    </div>
  );
}
