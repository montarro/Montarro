import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--no-sandbox"] });
const base = "http://127.0.0.1:4345";
const errors = [];
async function loadCheck(path) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  p.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  p.on("pageerror", (e) => errs.push("PAGEERR: " + e.message));
  await p.goto(base + path, { waitUntil: "networkidle" });
  await new Promise(r => setTimeout(r, 800));
  // filter out known-harmless (e.g. favicon, GHL webhook in dev)
  const real = errs.filter(e => !/favicon|VITE_MONTARRO_LEAD_WEBHOOK|msgsndr|leadconnector|net::ERR/.test(e));
  console.log(`${path}: console-errors=${real.length}${real.length? " :: "+real.slice(0,3).join(" | "):""}`);
  return { p, real };
}
// 1) Routes load without console errors
for (const r of ["/","/contact","/demo","/privacy","/terms","/services/ai-receptionists"]) {
  const { p } = await loadCheck(r); await p.close();
}
// 2) Homepage nav anchors resolve to existing sections
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(base + "/", { waitUntil: "networkidle" });
const navTargets = await p.evaluate(() => {
  const out = {};
  document.querySelectorAll('header a[href^="#"]').forEach(a => {
    const id = a.getAttribute('href').slice(1);
    out[a.textContent.trim().split('\n')[0]] = !!document.getElementById(id);
  });
  return out;
});
console.log("NAV anchors resolve:", JSON.stringify(navTargets));
// 3) Footer anchors resolve
const footTargets = await p.evaluate(() => {
  const out = [];
  document.querySelectorAll('footer a[href^="/#"], footer a[href^="#"]').forEach(a => {
    const h = a.getAttribute('href'); const id = h.replace(/^\/?#/, '');
    out.push([a.textContent.trim(), id, !!document.getElementById(id)]);
  });
  return out;
});
console.log("FOOTER anchors:", JSON.stringify(footTargets));
// 4) Forms present
const homeForm = await p.evaluate(() => !!document.querySelector('#cta form'));
console.log("homepage CTA form present:", homeForm);
await p.close();
const pc = await b.newPage({ viewport: { width: 1440, height: 900 } });
await pc.goto(base + "/contact", { waitUntil: "networkidle" });
const cForm = await pc.evaluate(() => ({ form: !!document.querySelector('form'), qs: document.querySelectorAll('form h3').length, submit: !!document.querySelector('form button[type=submit]') }));
console.log("contact form:", JSON.stringify(cForm));
await pc.close();
await b.close();
