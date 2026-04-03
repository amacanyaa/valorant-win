// Sahte Canlı Akış İçin Skinler
const dropSkins = [
    {n: "Kuronami Vandal", i: "https://static.wikia.nocookie.net/valorant/images/a/a7/Kuronami_Vandal.png"},
    {n: "Reaver Sheriff", i: "https://static.wikia.nocookie.net/valorant/images/8/8f/Reaver_Sheriff.png"},
    {n: "Prime Phantom", i: "https://static.wikia.nocookie.net/valorant/images/e/e0/Prime_Phantom.png"},
    {n: "Elderflame Vandal", i: "https://static.wikia.nocookie.net/valorant/images/5/5e/Elderflame_Vandal.png"}
];

const track = document.getElementById('dropTrack');
for(let i=0; i<30; i++) {
    let s = dropSkins[Math.floor(Math.random()*dropSkins.length)];
    track.innerHTML += `
        <div class="drop-item">
            <span>YENİ DROP</span>
            <img src="${s.i}">
            <div style="font-size:10px">${s.n}</div>
        </div>`;
}
