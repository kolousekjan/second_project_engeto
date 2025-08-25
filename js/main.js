const yearEl = document.getElementById("year");
if (yearEl)
    yearEl.textContent = String(new Date().getFullYear());
const toTopBtn = document.querySelector(".to-top");
if (toTopBtn) {
    const onScroll = () => {
        if (window.scrollY > 200)
            toTopBtn.hidden = false;
        else
            toTopBtn.hidden = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    toTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
console.log("App ready");
export {};