const menuBtn = document.querySelector("#menu");
const nav = document.querySelector("#primary-nav");
menuBtn.addEventListener("click", () => {
  const expanded = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!expanded));
  nav.classList.toggle("open");
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = "Last Modified: " + document.lastModified;

const membersEl = document.querySelector("#members");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

gridBtn.addEventListener("click", () => {
  membersEl.classList.remove("list");
  membersEl.classList.add("grid");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
  gridBtn.setAttribute("aria-pressed", "true");
  listBtn.setAttribute("aria-pressed", "false");
});

listBtn.addEventListener("click", () => {
  membersEl.classList.remove("grid");
  membersEl.classList.add("list");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
  listBtn.setAttribute("aria-pressed", "true");
  gridBtn.setAttribute("aria-pressed", "false");
});

async function loadMembers() {
  const res = await fetch("data/members.json");
  const data = await res.json();
  renderMembers(data);
}

function renderMembers(list) {
  membersEl.innerHTML = "";
  list.forEach(m => {
    const card = document.createElement("article");
    card.className = "member";

    const top = document.createElement("div");
    top.className = "top";

    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = `images/${m.image}`;
    img.alt = `${m.name} logo`;

    const title = document.createElement("h2");
    title.textContent = m.name;

    top.append(img, title);

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.innerHTML = `
      <div>${m.address}</div>
      <div>${m.phone}</div>
      <div>Level: ${["Member","Silver","Gold"][m.membership - 1]}</div>
    `;

    const actions = document.createElement("div");
    actions.className = "actions";
    const a = document.createElement("a");
    a.href = m.website;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = m.website;
    actions.appendChild(a);

    card.append(top, meta, actions);
    membersEl.appendChild(card);
  });
}

loadMembers();
