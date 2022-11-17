const spinner = document.querySelector("#spinner");
const pokemon_container = document.querySelector("#pokemon-container");

const URL = "https://pokeapi.co/api/v2/";
const URL_POKEMON = `${URL}pokemon/`;

let offset = 1; // 1er pokemon
let limit = 8; // hasta esa cantidad

function get_Pokemon(id) {
	fetch(`${URL_POKEMON}${id}/`)
		.then((res) => res.json())
		.then((data) => {
			card_pokemon(data);
			spinner.style.display = "none";
		});
}

function get_Pokemons(offset, limit) {
	spinner.style.display = "block";
	for (let index = offset; index <= offset + limit; index++) {
		get_Pokemon(index);
	}
}

/// utilidades

function card_pokemon(pokemon) {
	const col = document.createElement("div");
	col.classList.add("col-4");
	col.classList.add("my-1");

	const card = document.createElement("div");
	card.classList.add("card");

	const card_img = document.createElement("img");
	card_img.classList.add('"card-img-top');
	card_img.src = pokemon.sprites.front_default

	const card_body = document.createElement("div");
	card_body.classList.add("card-body");

	const card_title = document.createElement("h5");
	card_title.classList.add("card-title");
	card_title.textContent = pokemon.id + ' ' + pokemon.name;

	const card_text = document.createElement("p");
	card_text.classList.add("card-text");

	card.appendChild(card_img);
	card.appendChild(card_body);
	// agrego elementos a card
	card_body.appendChild(card_title);
	card_body.appendChild(card_text);
	// agrego card a col
	col.appendChild(card);
	// agrego col a container
	pokemon_container.appendChild(col);
}

//get_Pokemons(offset, limit);
