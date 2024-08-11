const pokemonGrid = document.querySelector(".pokemon-grid");
const input = document.querySelector("input");
const select = document.querySelector("select");
const pokemons = [];
let pokemonTypes = [];

const formatText = (text) => {
  text = text.split(/\s+/);
  text = text.map((ele) => ele[0].toUpperCase() + ele.slice(1));
  return text.join(" ");
};

const fetchPokemon = async (id) => {
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = await result.json();
  return pokemon;
};

const appendTypes = () => {
  const seen = new Set();
  pokemons.forEach((pokemon) => {
    pokemon.types.map((ele) => {
      !seen.has(ele.type.name) && seen.add(ele.type.name);
    });
  });
  pokemonTypes = [...seen];
  pokemonTypes.forEach((type) => {
    select.innerHTML += `<option value="${type}">${formatText(type)}</option>`;
  });
};

const renderPokemons = (pokemons) => {
  pokemonGrid.innerHTML = "";
  pokemons.forEach((pokemon) => {
    let html = `
     <div class="pokemon-card">
          <div class="image">
               <img 
                    src="${
                      pokemon.sprites.other["official-artwork"].front_default
                    }" 
                    alt="${formatText(pokemon.name)}" 
                    class="w-100" 
               />
          </div>
          <div class="name">${formatText(pokemon.name)}</div>
          <div class="details">
               <div>
                    <div>Weight</div>
                    <div>${pokemon.weight} kg</div>
               </div>
               <div>
                    <div>Height</div>
                    <div>${pokemon.height / 10} m</div>
               </div>
          </div>
          <div class="type">
               <span>Type: </span>
               ${pokemon.types
                 .map((ele) => formatText(ele.type.name))
                 .join(" / ")}
          </div>
     </div>
    `;
    pokemonGrid.innerHTML += html;
  });
};

const fetchMultiple = async () => {
  const promises = [];
  for (let i = 1; i <= 100; i++) {
    promises.push(fetchPokemon(i));
  }
  const results = await Promise.all(promises);
  const validPokemons = results.filter((pokemon) => pokemon !== null);
  pokemons.push(...validPokemons);
  renderPokemons(pokemons);
  appendTypes();
};

const debounce = (func, delay) => {
  let debounceTimer;
  return function (...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

const filterByName = () => {
  const query = input.value.toLowerCase();
  const seen = new Set();
  let filterPokemons = pokemons.filter((pokemon) => {
    const name = pokemon.name.toLowerCase();
    if ((name.startsWith(query) || name.includes(query)) && !seen.has(name)) {
      seen.add(name);
      return true;
    }
    return false;
  });
  renderPokemons(filterPokemons);
};

const filterByType = () => {
  const query = select.value;
  let filterList = pokemons.filter((pokemon) => {
    return pokemon.types.some(
      (ele) =>
        query === "" || ele.type.name.toLowerCase() === query.toLowerCase()
    );
  });
  renderPokemons(filterList);
};

window.addEventListener("load", () => {
  fetchMultiple();
  input.addEventListener("input", debounce(filterByName, 300));
  select.addEventListener("change", filterByType);
});
