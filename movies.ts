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

type TvMazeShow = {
	show: {
		id: number;
		name: string;
		language?: string;
		year?: number;
		premiered?: string;
		rating?: { average: number | null };
		image?: { medium?: string; original?: string } | null;
		summary?: string | null;
	};
};

const form = document.getElementById("search-form") as HTMLFormElement | null;
const resultsEl = document.getElementById("results");

function createCard(item: TvMazeShow): HTMLElement {
	const poster = item.show.image?.medium || item.show.image?.original || "./images/movies-bg.jpeg";
	const title = item.show.name || "Bez názvu";
	const rating = item.show.rating?.average ?? "–";
	const premieredYear = item.show.premiered ? new Date(item.show.premiered).getFullYear() : "";

	const card = document.createElement("article");
	card.className = "card";
	card.innerHTML = `
		<img src="${poster}" alt="${title}">
		<div class="card__body">
			<h3 class="card__title">${title}</h3>
			<p class="card__meta">${premieredYear} · Hodnocení: ${rating}</p>
		</div>
	`;
	return card;
}

async function search(query: string) {
	if (!resultsEl) return;
	resultsEl.innerHTML = "";
	const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;
	try {
		const res = await fetch(url);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const data: TvMazeShow[] = await res.json();
		if (data.length === 0) {
			resultsEl.textContent = "Nic nenalezeno.";
			return;
		}
		const frag = document.createDocumentFragment();
		for (const item of data) frag.append(createCard(item));
		resultsEl.append(frag);
	} catch (err) {
		console.error(err);
		resultsEl.textContent = "Chyba při načítání dat.";
	}
}

if (form) {
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const input = form.querySelector<HTMLInputElement>("input[name=q]");
		const q = input?.value?.trim() || "girl";
		const params = new URLSearchParams(location.search);
		params.set("q", q);
		history.replaceState(null, "", `?${params.toString()}`);
		search(q);
	});

	const urlQ = new URLSearchParams(location.search).get("q");
	if (urlQ) {
		const input = form.querySelector<HTMLInputElement>("input[name=q]");
		if (input) input.value = urlQ;
		search(urlQ);
	}
}

