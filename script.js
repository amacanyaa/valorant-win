// Akan drop'lar için skin listesi
const skins = [
    {n: "Prime Vandal", i: "https://media.valorant-api.com/weaponskinlevels/eb6100f2-45e0-5a3d-4c38-898f029a149c/displayicon.png"},
    {n: "Reaver Sheriff", i: "https://media.valorant-api.com/weaponskinlevels/e6387063-463e-b1e7-f138-0487440498a4/displayicon.png"},
    {n: "Ion Phantom", i: "https://media.valorant-api.com/weaponskinlevels/78e078e3-47a3-e836-e047-979929845778/displayicon.png"},
    {n: "Gaia's Vandal", i: "https://media.valorant-api.com/weaponskinlevels/9079f83f-42e7-f584-6997-4089901e8584/displayicon.png"},
    {n: "Oni Phantom", i: "https://media.valorant-api.com/weaponskinlevels/4493e877-4402-f831-255d-7589e40700d9/displayicon.png"}
];

document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById('dropTrack');

    // İttirme Animasyonu (Her 2 saniyede bir yeni skin)
    function addDrop() {
        if(!track) return;
        const skin = skins[Math.floor(Math.random() * skins.length)];
        
        const div = document.createElement('div');
        div.className = 'drop-wrapper';
        div.innerHTML = `
            <div class="drop-card">
                <img src="${skin.i}">
                <span>${skin.n}</span>
            </div>
        `;

        track.prepend(div);
        if (track.children.length > 15) track.removeChild(track.lastChild);

        setTimeout(addDrop, Math.random() * 2000 + 1000);
    }
    addDrop();
});

// Giriş Yapma Ekranını Açan Fonksiyon
function openLogin() {
    const w = 450, h = 600;
    const left = (screen.width/2)-(w/2);
    const top = (screen.height/2)-(h/2);
    
    // Güvenli bilgilendirme penceresi
    let win = window.open("", "RiotLogin", `width=${w},height=${h},top=${top},left=${left}`);
    win.document.body.innerHTML = `
        <style>
            body { background: #f9f9f9; font-family: sans-serif; text-align: center; padding: 40px 20px; margin:0; }
            img { width: 120px; margin-bottom: 20px; }
            input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
            button { width: 100%; padding: 15px; background: #ff4655; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; margin-top: 15px;}
        </style>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Riot_Games_logo.svg/1200px-Riot_Games_logo.svg.png">
        <h2>Riot Hesabı ile Giriş Yap</h2>
        <input type="text" placeholder="KULLANICI ADI">
        <input type="password" placeholder="ŞİFRE">
        <button onclick="alert('Simülasyon modunda giriş yapılamaz!')">OTURUM AÇ</button>
        <p style="font-size: 12px; color: #999; margin-top: 20px;">Bu bir eğitim simülasyonudur.</p>
    `;
}
