const grid = document.getElementById("grid");

const typeColors = {
  poison: "#A33EA1"
};

async function fetchAndCreateCard(pokemon) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!res.ok) throw new Error("Pokemon não encontrado");

    const data = await res.json();
    createCardHTML(data);
  } catch (error) {
    alert(`Erro: Pokemon ${pokemon} não encontrado`);
  }
}

function createCardHTML(data) {
  const name = data.name;
  const id = data.id.toString().padStart(3, "0");
  const imgUrl =
    data.sprites.other["official-artwork"].front_default ||
    data.sprites.front_default;

  const height = data.height / 10;
  const weight = data.weight / 10;
  const abilities = data.abilities
    .map((a) => a.ability.name)
    .slice(0, 2)
    .join(", ");

  const stats = {};
  data.stats.forEach((s) => (stats[s.stat.name] = s.base_stat));

  const atk = stats["attack"] || 0;
  const def = stats["defense"] || 0;

  const mainType = data.types[0].type.name;
  const mainColor = typeColors[mainType] || "#777"; 

  const typesHtml = data.types
    .map((t) => {
      const tName = t.type.name;
      const tColor = typeColors[tName] || mainColor; 
      return `<span class="type-badge" style="background-color: ${tColor}">${tName}</span>`;
    })
    .join("");

  const card = document.createElement("div");
  card.classList.add("pokemon-card");

  card.innerHTML = `<div class = "alignImg">
          <img src="${imgUrl}" class="poke-img" alt="${name}">
        </div>

      <div class="card-body">
          <div class = "alignPokeName">
          <h2 class="poke-name">${name}</h2>
          </div>
          </div>

          <div class="info-row">
              <div class="info-box">
                  <h4>Altura</h4>
                  <p>${height} m</p>
              </div>
              <div class="info-box">
                  <h4>Peso</h4>
                  <p>${weight} kg</p>
              </div>
          </div>

          <div class="abilities">
              <strong>Habilidades:</strong> ${abilities}
          </div>

          <div class="stats-wrapper">
              <div class="stat-line">
                  <span class="stat-label">ATK</span>
                  <span class="stat-value">${atk}</span>
                  <div class="progress-bg">
                      <div class="progress-fill" 
                           style="width: ${Math.min(
                             atk / 2,
                             100
                           )}%; background-color: ${mainColor}"></div>
                  </div>
              </div>

              <div class="stat-line">
                  <span class="stat-label">DEF</span>
                  <span class="stat-value">${def}</span>
                  <div class="progress-bg">
                      <div class="progress-fill" 
                           style="width: ${Math.min(
                             def / 2,
                             100
                           )}%; background-color: ${mainColor}"></div>
                  </div>
              </div>
          </div>
      </div>
      <div class = "alignPokeId">
      <span class="poke-id">#${id}</span>
      </div>
  `;
  grid.prepend(card);

}

(async function init() {
  await fetchAndCreateCard("scolipede");
  await fetchAndCreateCard("beedrill");
  await fetchAndCreateCard("weezing");
  await fetchAndCreateCard("salazzle");
  await fetchAndCreateCard("muk");
  await fetchAndCreateCard("gengar");
  await fetchAndCreateCard("toxicroak");
  await fetchAndCreateCard("roserade");
  await fetchAndCreateCard("nidoking");
  await fetchAndCreateCard("tentacruel");
  await fetchAndCreateCard("crobat");
  await fetchAndCreateCard("arbok");
})();