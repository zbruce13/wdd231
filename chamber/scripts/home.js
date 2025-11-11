// ✅ WEATHER API
const apiKey = "5a2bb2a71a1be25c55c847a20c308304";
const url = `https://api.openweathermap.org/data/2.5/forecast?q=Salt Lake City,US&appid=${apiKey}&units=imperial`;

async function getWeather() {
  const response = await fetch(url);
  const data = await response.json();

  // Current weather
  document.querySelector("#temp").textContent = Math.round(data.list[0].main.temp);
  document.querySelector("#description").textContent = data.list[0].weather[0].description;

  // 3-day forecast (every 24 hours approx)
  const forecast = document.querySelector("#forecast");
  forecast.innerHTML = "";

  for (let i = 1; i <= 3; i++) {
    const day = data.list[i * 8];
    const li = document.createElement("li");
    li.textContent = `${Math.round(day.main.temp)} °F — ${day.weather[0].description}`;
    forecast.appendChild(li);
  }
}

getWeather();

// ✅ SPOTLIGHT MEMBERS
async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();

  // Filter only SILVER & GOLD members
  const qualified = data.members.filter(m => m.membership === "silver" || m.membership === "gold");

  // Random shuffle
  const selected = qualified.sort(() => 0.5 - Math.random()).slice(0, 3);

  const container = document.querySelector("#spotlight-container");

  selected.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p><strong>${member.membership.toUpperCase()} MEMBER</strong></p>
    `;
    container.appendChild(card);
  });
}

getMembers();
