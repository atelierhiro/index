const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\user\\.gemini\\antigravity\\scratch\\atelier-hiro';
const htmlFile = path.join(dir, 'index.html');
const cssFile = path.join(dir, 'style.css');

let html = fs.readFileSync(htmlFile, 'utf8');

const svgs = {
    hero: `<svg viewBox="0 0 200 150" class="line-art hero-line-art" style="width:100%; height:auto; stroke-width:3; color:var(--coral);"><rect x="15" y="15" width="170" height="120" rx="12" stroke-dasharray="8 6" fill="none" /><circle cx="65" cy="65" r="22"/><path d="M 25 135 Q 65 90 95 135"/><circle cx="58" cy="65" r="3" fill="currentColor" stroke="none"/><circle cx="72" cy="65" r="3" fill="currentColor" stroke="none"/><path d="M 61 75 Q 65 80 69 75"/><circle cx="135" cy="55" r="25"/><path d="M 95 135 Q 135 75 175 135"/><circle cx="127" cy="55" r="3.5" fill="currentColor" stroke="none"/><circle cx="143" cy="55" r="3.5" fill="currentColor" stroke="none"/><path d="M 130 65 Q 135 72 140 65"/></svg>`,
    p1: `<svg viewBox="0 0 100 100" class="line-art"><circle cx="50" cy="35" r="20"/><path d="M 25 85 Q 50 60 75 85"/><path d="M 40 30 Q 50 40 60 30"/><circle cx="43" cy="35" r="2.5" fill="currentColor" stroke="none"/><circle cx="57" cy="35" r="2.5" fill="currentColor" stroke="none"/><path d="M 45 42 Q 50 48 55 42"/></svg>`,
    p2: `<svg viewBox="0 0 100 100" class="line-art"><circle cx="35" cy="40" r="16"/><path d="M 10 90 Q 35 60 55 90"/><circle cx="29" cy="40" r="2" fill="currentColor" stroke="none"/><circle cx="41" cy="40" r="2" fill="currentColor" stroke="none"/><path d="M 31 46 Q 35 50 39 46"/><circle cx="65" cy="35" r="18"/><path d="M 45 90 Q 65 55 90 90"/><circle cx="58" cy="35" r="2" fill="currentColor" stroke="none"/><circle cx="72" cy="35" r="2" fill="currentColor" stroke="none"/><path d="M 61 42 Q 65 48 69 42"/></svg>`,
    p3: `<svg viewBox="0 0 100 100" class="line-art"><circle cx="28" cy="35" r="14"/><path d="M 5 85 Q 28 55 45 85"/><circle cx="23" cy="35" r="1.5" fill="currentColor" stroke="none"/><circle cx="33" cy="35" r="1.5" fill="currentColor" stroke="none"/><path d="M 25 40 Q 28 44 31 40"/><circle cx="72" cy="35" r="14"/><path d="M 55 85 Q 72 55 95 85"/><circle cx="67" cy="35" r="1.5" fill="currentColor" stroke="none"/><circle cx="77" cy="35" r="1.5" fill="currentColor" stroke="none"/><path d="M 69 40 Q 72 44 75 40"/><circle cx="50" cy="65" r="10"/><path d="M 35 95 Q 50 78 65 95"/><circle cx="46" cy="65" r="1" fill="currentColor" stroke="none"/><circle cx="54" cy="65" r="1" fill="currentColor" stroke="none"/><path d="M 48 69 Q 50 72 52 69"/></svg>`,
    fast: `<svg viewBox="0 0 100 100" class="line-art"><circle cx="65" cy="30" r="14"/><circle cx="60" cy="30" r="2" fill="currentColor" stroke="none"/><circle cx="70" cy="30" r="2" fill="currentColor" stroke="none"/><path d="M 61 35 Q 65 39 69 35"/><path d="M 65 44 L 50 70 L 65 92"/><path d="M 50 70 L 25 80"/><path d="M 35 45 L 65 44 L 85 58"/><path d="M 10 30 L 35 30"/><path d="M 15 45 L 40 45"/><path d="M 5 60 L 30 60"/></svg>`
};

// 1. the hero image
html = html.replace(
    /<img src="hero_img\.png"[^>]+>/,
    svgs.hero
);
// replace hero frame bg
html = html.replace(
    /class="hero-img-frame"/g,
    'class="hero-img-frame" style="background:#fff; border-radius:32px; padding:40px; box-shadow:0 16px 48px rgba(0,0,0,0.08); display:flex; align-items:center; justify-content:center;"'
);

// 2. the menu items
html = html.replace(/<div class="menu-card menu-card--popular">/, '<div class="menu-card menu-card--popular menu-card--1">');
html = html.replace(/<div class="menu-icon">👤<\/div>/, `<div class="menu-icon">${svgs.p1}</div>`);

// Replace the older version with emojis
html = html.replace(/<div class="menu-card">[\s\S]*?<div class="menu-icon">👫<\/div>/, '<div class="menu-card menu-card--2">\n          <div class="menu-icon">' + svgs.p2 + '</div>');
html = html.replace(/<div class="menu-card">[\s\S]*?<div class="menu-icon">👨‍👩‍👧<\/div>/, '<div class="menu-card menu-card--3">\n          <div class="menu-icon">' + svgs.p3 + '</div>');
html = html.replace(/<div class="menu-card menu-card--special">/, '<div class="menu-card menu-card--special menu-card--4">');
html = html.replace(/<div class="menu-icon">⚡<\/div>/, `<div class="menu-icon">${svgs.fast}</div>`);

// 3. Optional: Add line-art fallback for gallery instead of just removing tags
const sampleP1 = `<div class="sample-art" style="color:var(--coral); padding:20px; background:#fff; height:100%; display:flex; align-items:center;">${svgs.p1}</div>`;
const sampleP2 = `<div class="sample-art" style="color:#4dabf7; padding:20px; background:#fff; height:100%; display:flex; align-items:center;">${svgs.p2}</div>`;
const sampleP3 = `<div class="sample-art" style="color:#38d9a9; padding:20px; background:#fff; height:100%; display:flex; align-items:center;">${svgs.p3}</div>`;

html = html.replace(/<img src="portrait_samples\.png"[^>]*家族・記念日[^>]*>/i, sampleP3);
html = html.replace(/<img src="hero_img\.png"[^>]*還暦・長寿祝い[^>]*>/i, sampleP1);
html = html.replace(/<img src="portrait_samples\.png"[^>]*結婚・カップル[^>]*>/i, sampleP2);
html = html.replace(/<img src="hero_img\.png"[^>]*誕生日プレゼント[^>]*>/i, sampleP1);
html = html.replace(/<img src="portrait_samples\.png"[^>]*ペット似顔絵[^>]*>/i, sampleP2);

fs.writeFileSync(htmlFile, html, 'utf8');

let css = fs.readFileSync(cssFile, 'utf8');
css += `
/* LINE ART SVGS */
.line-art {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: currentColor;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  display: block;
}
.menu-card .menu-icon {
  width: 80px; height: 80px; margin: 0 auto 16px;
  display: flex; align-items: center; justify-content: center;
}
.menu-card--1 { border-color: #ffc9c9; }
.menu-card--1 .menu-pop-badge { background: #ff6b6b; }
.menu-card--1 .menu-icon { color: #ff6b6b; }
.menu-card--1 .menu-price-sale { color: #ff6b6b; }
.menu-card--1 .btn-menu-order { background: #ff6b6b; border: none; }
.menu-card--1 .btn-menu-order:hover { background: #e03131; }

.menu-card--2 { border-color: #d0ebff; }
.menu-card--2 .menu-icon { color: #4dabf7; }
.menu-card--2 .menu-price-sale { color: #4dabf7; }
.menu-card--2 .btn-menu-order { background: #4dabf7; border: none; }
.menu-card--2 .btn-menu-order:hover { background: #228be6; }

.menu-card--3 { border-color: #b2f2bb; }
.menu-card--3 .menu-icon { color: #38d9a9; }
.menu-card--3 .menu-price-sale { color: #38d9a9; }
.menu-card--3 .btn-menu-order { background: #38d9a9; border: none; }
.menu-card--3 .btn-menu-order:hover { background: #12b886; }

.menu-card--4 { border-color: #ffec99; }
.menu-card--4 .menu-icon { color: #fcc419; }
.menu-card--4 .menu-price-sale { color: #fcc419; }
.menu-card--4 .btn-menu-order { background: #fcc419; border: none; }
.menu-card--4 .btn-menu-order:hover { background: #fab005; }

/* Samples Overrides */
.gallery-card { background: #fff; }
.gallery-card img { display: none; } /* Hide old img if any */
`;
fs.writeFileSync(cssFile, css, 'utf8');
console.log('Update completed');
