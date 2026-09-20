const KITTEN_PAW_SVG = '<svg viewBox="0 0 64 56"><ellipse cx="32" cy="40" rx="15" ry="12"/><ellipse cx="12" cy="22" rx="6.5" ry="8.5"/><ellipse cx="25" cy="10" rx="6.5" ry="8.5"/><ellipse cx="41" cy="10" rx="6.5" ry="8.5"/><ellipse cx="53" cy="22" rx="6.5" ry="8.5"/></svg>';

function kittenStatusClass(statut) {
  if (statut === "Réservé") return "status-reserved";
  if (statut === "Bientôt disponible") return "status-soon";
  return "";
}

function renderKittenCard(kitten) {
  const photo = kitten.photo
    ? `<img src="${kitten.photo}" alt="${kitten.nom || "Chaton"}">`
    : KITTEN_PAW_SVG;

  const facts = [];
  if (kitten.sexe) facts.push(`<li><strong>Sexe :</strong> ${kitten.sexe}</li>`);
  if (kitten.date_naissance) facts.push(`<li><strong>Née le :</strong> ${kitten.date_naissance}</li>`);
  facts.push(`<li><strong>Prix :</strong> ${kitten.prix || "me consulter"}</li>`);

  return `
    <article class="pet-card">
      <div class="pet-photo">
        <span class="pet-pill ${kittenStatusClass(kitten.statut)}">${kitten.statut || "Disponible"}</span>
        ${photo}
      </div>
      <div class="pet-body">
        <h3>${kitten.nom || "Nom à venir"}</h3>
        <ul class="pet-facts">${facts.join("")}</ul>
      </div>
    </article>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector("#chatons-carousel");
  if (!track) return;

  fetch("data/chatons.json")
    .then((r) => r.json())
    .then((data) => {
      track.innerHTML = (data.chatons || []).map(renderKittenCard).join("");
    })
    .catch(() => {});

  const prev = document.querySelector(".carousel-prev");
  const next = document.querySelector(".carousel-next");
  const scrollByCard = (dir) => {
    const card = track.querySelector(".pet-card");
    const amount = card ? card.getBoundingClientRect().width + 24 : 300;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };
  if (prev) prev.addEventListener("click", () => scrollByCard(-1));
  if (next) next.addEventListener("click", () => scrollByCard(1));
});
