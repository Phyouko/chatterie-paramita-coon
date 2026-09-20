const CHAT_PAW_SVG = '<svg viewBox="0 0 64 56"><ellipse cx="32" cy="40" rx="15" ry="12"/><ellipse cx="12" cy="22" rx="6.5" ry="8.5"/><ellipse cx="25" cy="10" rx="6.5" ry="8.5"/><ellipse cx="41" cy="10" rx="6.5" ry="8.5"/><ellipse cx="53" cy="22" rx="6.5" ry="8.5"/></svg>';

function renderChatCard(chat) {
  const pillClass = chat.role === "Reproducteur" ? "pet-pill role-male" : "pet-pill";
  const photo = chat.photo
    ? `<img src="${chat.photo}" alt="${chat.nom || "Chat"}">`
    : CHAT_PAW_SVG;

  const facts = [];
  if (chat.couleur) facts.push(`<li><strong>Couleur :</strong> ${chat.couleur}</li>`);
  if (chat.date_naissance) facts.push(`<li><strong>Née le :</strong> ${chat.date_naissance}</li>`);
  facts.push(`<li><strong>LOOF :</strong> ${chat.loof || "à préciser"}</li>`);

  return `
    <article class="pet-card">
      <div class="pet-photo">
        <span class="${pillClass}">${chat.role || "Reproductrice"}</span>
        ${photo}
      </div>
      <div class="pet-body">
        <h3>${chat.nom || "Nom à venir"}</h3>
        <ul class="pet-facts">${facts.join("")}</ul>
        <p class="pet-character">${chat.caractere || "Caractère à préciser."}</p>
      </div>
    </article>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#chats-grid");
  if (!grid) return;

  fetch("data/chats.json")
    .then((r) => r.json())
    .then((data) => {
      grid.innerHTML = (data.chats || []).map(renderChatCard).join("");
    })
    .catch(() => {});
});
