const pokemonName = document.querySelector('.pokemon-name');
const pokemonNum = document.querySelector('.pokemon-num');
const pokemonImg = document.querySelector('.pokemon-img');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchpokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
  const data = await APIResponse.json();
  return data;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNum.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
  pokemonImg.style.display = 'block';
  pokemonName.innerHTML = data.name;
  pokemonNum.innerHTML = data.id;
  pokemonImg.src = data ['sprites'] ['versions'] ['generation-v'] ['black-white'] ['animated'] ['front_default'];
  input.value = '';
  searchpokemon = data.id
  } 

  else {
    pokemonImg.style.display = 'none';
    pokemonName.innerHTML = 'NOT FOUND :c';
    pokemonNum.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchpokemon > 1) {
    searchpokemon -= 1;
  renderPokemon(searchpokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchpokemon += 1;
  renderPokemon(searchpokemon);
});

renderPokemon(searchpokemon);