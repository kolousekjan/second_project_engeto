const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const toTopBtn = document.querySelector<HTMLButtonElement>(".to-top");
if (toTopBtn) {
	const onScroll = () => {
		toTopBtn.hidden = window.scrollY < 100;
	};
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();
	toTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

const form = document.getElementById("register-form") as HTMLFormElement | null;
const hint = document.getElementById("password-hint");

function setHint(text: string, ok: boolean | null) {
	if (!hint) return;
	hint.textContent = text;
	hint.classList.remove("hint--ok", "hint--bad");
	if (ok === true) hint.classList.add("hint--ok");
	if (ok === false) hint.classList.add("hint--bad");
}

function validatePasswords(pw1: string, pw2: string): boolean {
	if (pw1.length < 6 || pw2.length < 6) {
		setHint("Heslo musí mít alespoň 6 znaků.", false);
		return false;
	}
	if (pw1 !== pw2) {
		setHint("Hesla se neshodují.", false);
		return false;
	}
	setHint("Hesla se shodují.", true);
	return true;
}

if (form) {
	form.addEventListener("input", () => {
		const pw1 = (form.elements.namedItem("password") as HTMLInputElement).value;
		const pw2 = (form.elements.namedItem("password2") as HTMLInputElement).value;
		if (pw1 && pw2) validatePasswords(pw1, pw2); else setHint("", null);
	});

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const email = (form.elements.namedItem("email") as HTMLInputElement).value;
		const pw1 = (form.elements.namedItem("password") as HTMLInputElement).value;
		const pw2 = (form.elements.namedItem("password2") as HTMLInputElement).value;
		if (!validatePasswords(pw1, pw2)) return;
		alert(`Registrováno: ${email}`);
		form.reset();
		setHint("", null);
	});
}

