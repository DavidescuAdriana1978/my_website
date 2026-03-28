// INITIAL LOAD & REVEAL
window.addEventListener("load", () => {
    document.getElementById("page-loader").classList.add("hidden");
    document.body.classList.add("loaded");
    
    document.querySelectorAll(".stagger").forEach((el, i) => {
        setTimeout(() => el.classList.add("show"), 300 + i * 200);
    });
});

// THEME & NAV TOGGLE
const body = document.body;
const navMenu = document.querySelector("nav ul");

document.getElementById("theme-toggle").onclick = (e) => {
    body.classList.toggle("dark");
    e.target.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
};

document.getElementById("menu-toggle").onclick = () => navMenu.classList.toggle("open");

// SMOOTH SCROLL & AUTO-CLOSE MENU
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.onclick = (e) => {
        e.preventDefault();
        navMenu.classList.remove("open");
        document.querySelector(link.getAttribute("href"))?.scrollIntoView({ behavior: "smooth" });
    };
});

// UNIFIED SCROLL EVENTS (Parallax, Nav Float, Hue, Section Reveal)
const nav = document.querySelector("nav");
const observer = new IntersectionObserver(entries => {
    entries.forEach(en => en.isIntersecting && en.target.classList.add("visible"));
}, { threshold: 0.2 });

document.querySelectorAll("section").forEach(s => observer.observe(s));

window.onscroll = () => {
    const sY = window.scrollY;
    const ratio = sY / (body.scrollHeight - window.innerHeight);
    
    // Hue Shift & Nav Float
    document.documentElement.style.setProperty("--hue", 220 + ratio * 40);
    nav.style.transform = sY > 50 ? "translateX(-50%) translateY(-8px)" : "translateX(-50%)";
    nav.style.boxShadow = sY > 50 ? "0 25px 60px rgba(15,23,42,0.2)" : "none";

    // Parallax (Desktop Only)
    if (window.innerWidth >= 900) {
        document.querySelector(".hero img").style.transform = `translateY(${sY * 0.1}px)`;
        document.querySelector(".mesh-bg").style.transform = `translateY(${sY * 0.05}px)`;
    }
};

// INTERACTIVE ELEMENTS (3D Tilt & Cursor Glow)
const glow = document.querySelector(".cursor-glow");
document.onmousemove = (e) => {
    if (glow) { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; }
};

document.querySelectorAll(".project-card").forEach(card => {
    card.onmousemove = (e) => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * -10;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 10;
        card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
    };
    card.onmouseleave = () => card.style.transform = "none";
});