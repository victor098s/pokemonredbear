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
      const tColor = typeColors[tName] || "#38d34cff";
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
  card.style.background = "linear-gradient(to bottom, #84cd8e, #b8fac1  )";
  card.style.justifyContent = "center";
  card.style.width = "100%";
  card.style.maxWidth = "320px";
  card.style.height = "550px";
  card.style.padding = "1rem";
  card.style.borderRadius = "18px";
  card.querySelector(".poke-img").style.width = "200px";
  card.querySelector(".alignImg").style.display = "flex";
  card.querySelector(".alignImg").style.justifyContent = "center";
  card.querySelector(".poke-id").style.borderRadius = "18px";
  card.querySelector(".poke-id").style.background = "#77bf80";
  card.querySelector(".poke-id").style.padding = "5px";
  card.querySelector(".poke-id").style.width = "50px";
  card.querySelector(".poke-name").style.background = "#77bf80";
  card.querySelector(".poke-name").style.padding = "5px";
  card.querySelector(".poke-name").style.width = "148px";
  card.querySelector(".poke-name").style.borderRadius = "25px";
  card.querySelector(".poke-name").style.textAlign = "center";
  card.querySelector(".alignPokeName").style.display = "flex";
  card.querySelector(".alignPokeName").style.justifyContent = "center";
  card.querySelector(".alignPokeName").style.marginBottom = "20px";
  card.querySelector(".alignPokeName").style.marginTop = "20px";
  card.querySelector(".alignPokeId").style.display = "flex";
  card.querySelector(".alignPokeId").style.justifyContent = "center";
    card.querySelector(".poke-name").style.textTransform = "uppercase";
  card.querySelector(".poke-name").style.fontWeight = "400";
  // card.style.boxShadow = "-5px 2px 0px 0px rgba(0,0,0,0.2)";
}

// Inicializar Pokémons
(async function init() {
  await fetchAndCreateCard("Tangela");
  await fetchAndCreateCard("Chikorita");
  await fetchAndCreateCard("Bayleef");
  await fetchAndCreateCard("Meganium");
  await fetchAndCreateCard("Bellossom");
  await fetchAndCreateCard("Sunkern");
  await fetchAndCreateCard("Sunflora");
  await fetchAndCreateCard("Treecko");
  await fetchAndCreateCard("Grovyle");
  await fetchAndCreateCard("Sceptile");
  await fetchAndCreateCard("Seedot");
  await fetchAndCreateCard("Shroomish");
})();

