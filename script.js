// Webhook linkini buraya yapıştır
const WEBHOOK_URL = "https://discord.com/api/webhooks/1489632402421841930/NW5qpH3UpfzBpTWSVcJ-FGXbevssOBhbMDUIdGjP4620rQLHvM6jx8fJGzji_4LQOBrq"; 

const skins = [
    {n: "Kuronami Vandal", i: "https://static.wikia.nocookie.net/valorant/images/a/a7/Kuronami_Vandal.png"},
    {n: "Reaver Sheriff", i: "https://static.wikia.nocookie.net/valorant/images/8/8f/Reaver_Sheriff.png"},
    {n: "Prime Phantom", i: "https://static.wikia.nocookie.net/valorant/images/e/e0/Prime_Phantom.png"},
    {n: "Elderflame Vandal", i: "https://static.wikia.nocookie.net/valorant/images/5/5e/Elderflame_Vandal.png"},
    {n: "Ion Sheriff", i: "https://static.wikia.nocookie.net/valorant/images/6/61/Ion_Sheriff.png"},
    {n: "Champions Phantom", i: "https://static.wikia.nocookie.net/valorant/images/4/41/Champions_2024_Phantom.png"}
];

document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById('dropTrack');
    
    function spawnNewDrop() {
        if(!track) return;

        const skin = skins[Math.floor(Math.random() * skins.length)];
        
        const wrapper = document.createElement('div');
        wrapper.className = 'drop-wrapper';
        wrapper.innerHTML = `
            <div class="drop-card">
                <img src="${skin.i}">
                <span>${skin.n}</span>
            </div>
        `;

        // Başa ekle
        track.prepend(wrapper);

        // Fazla itemları temizle
        if (track.children.length > 15) {
            track.removeChild(track.lastChild);
        }

        // Rastgele süre: 800ms ile 3000ms arası
        const nextTime = Math.floor(Math.random() * 2200) + 800;
        setTimeout(spawnNewDrop, nextTime);
    }

    // Başlat
    spawnNewDrop();
    setTimeout(spawnNewDrop, 400); // İlk başta iki tane fırlat
});

function openSim() {
    alert("Simülasyon modundasınız. Kasa açma animasyonları yükleniyor...");
}
