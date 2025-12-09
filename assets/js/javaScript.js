const grid = document.getElementById("grid");

const typeColors = {
  fighting: "#FF6C6C",
  steel: "#FF6C6C",
  psychic: "#FF6C6C",
  fire: "#FF6C6C",
  flying: "#FF6C6C",
};

// Lógica de Fetch e Criação
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
  // Extração de dados
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

  // Stats
  const stats = {};
  data.stats.forEach((s) => (stats[s.stat.name] = s.base_stat));

  const atk = stats["attack"] || 0;
  const def = stats["defense"] || 0;

  // Cores
  const mainType = data.types[0].type.name;
  const color = typeColors[mainType] || "#777";

  // Gerar HTML dos tipos
  const typesHtml = data.types
    .map((t) => {
      const tName = t.type.name;
      const tColor = typeColors[tName] || "#BF3434";
      return `<span class="type-badge" style="background-color: ${tColor}">${tName}</span>`;
    })
    .join("");

  // Criar card
  const card = document.createElement("div");
  card.classList.add("pokemon-card");

  card.innerHTML = `
      <div class = "alignImg">
          <img src="${imgUrl}" class="poke-img" alt="${name}">
        </div>

      <div class="card-body">
          <div class = "alignPokeName">
          <h2 class="poke-name">${name}</h2>
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
                           )}%; background-color: ${color}"></div>
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
                           )}%; background-color: ${color}"></div>
                  </div>
              </div>
          </div>
      </div>
      <div class = "alignPokeId">
      <span class="poke-id">#${id}</span>
      </div>

  `;

  // Adiciona ao grid
  grid.prepend(card);
}

// Inicializar Pokémons
(async function init() {
  await fetchAndCreateCard("machoke");
  await fetchAndCreateCard("hawlucha");
  await fetchAndCreateCard("mankey");
  await fetchAndCreateCard("hitmonlee");
  await fetchAndCreateCard("primeape");
  await fetchAndCreateCard("blaziken");
  await fetchAndCreateCard("hitmonchan");
  await fetchAndCreateCard("gallade");
  await fetchAndCreateCard("machamp");
  await fetchAndCreateCard("zamazenta");
  await fetchAndCreateCard("cobalion");
  await fetchAndCreateCard("lucario");
})();