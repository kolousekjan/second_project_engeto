const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const toTopBtn = document.querySelector<HTMLButtonElement>(".to-top");
if (toTopBtn) {
	const onScroll = () => {
		if (window.scrollY > 100) toTopBtn.hidden = false; else toTopBtn.hidden = true;
	};
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();
	toTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

console.log("App ready");

