const spinner = document.querySelector("#spinner");
const pokemon_container = document.querySelector("#pokemon-container");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
/// utilidad remover child
function removeChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}
/// atras
previous.addEventListener("click", () => {
	if (offset != 1) {
		offset -= 9;
		removeChildNodes(pokemon_container);
		get_Pokemons(offset, limit);
	}
});
/// adelante
next.addEventListener("click", () => {
	offset += 9;
	removeChildNodes(pokemon_container);
	get_Pokemons(offset, limit);
});

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
const type_colors = {
	bug: "#729f3f",
	dark: "#707070",
	dragon: "#53a4cf",
	electric: "#eed535",
	fairy: "#fdb9e9",
	fighting: "#d56723",
	fire: "#fd7d24",
	flying: "#3dc7ef",
	ghost: "#7b62a3",
	grass: "#9bcc50",
	ground: "#f7de3f",
	ice: "#51c4e7",
	normal: "#a4acaf",
	poison: "#b97fc9",
	psychic: "#f366b9",
	rock: "#a38c21",
	steel: "#9eb7b8",
	water: "#4592c4",
};

function card_pokemon(pokemon) {
	const col = document.createElement("div");
	col.classList.add("col-4");
	col.classList.add("col-md-4");
	col.classList.add("my-1");
	col.classList.add("h-auto");

	const card = document.createElement("div");
	card.classList.add("card");
	card.classList.add("shadow");
	card.classList.add("border-light");
	card.classList.add("h-auto");
	let card_header = `<div class="card-header">
		<div class="d-flex justify-content-between align-items-end">
		<h6 class="card-title text-capitalize">#${pokemon.id
			.toString()
			.padStart(3, 0)} ${pokemon.name}</h6>	
		<img
				class="img-fluid"
				src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${
					pokemon.id
				}.png"
				alt=""
			/>
			
		</div>
	</div>`;
	card.innerHTML = card_header;

	const card_img = document.createElement("img");
	card_img.classList.add('"card-img-top');
	card_img.src = pokemon.sprites.other.home.front_default;

	const card_body = document.createElement("div");
	card_body.classList.add("card-body");
	const card_body_types = document.createElement("div");
	card_body_types.classList.add("d-flex");
	card_body_types.classList.add("justify-content-center");
	card_body_types.classList.add("text-center");

	pokemon.types.forEach((element) => {
		let html_element = `<div class="col-6">
			<button
				style="width: 90%; background-color: ${type_colors[element.type.name]}"
				type="button"
				class="btn btn-primary btn-sm rounded-pill border border-0 text-capitalize"
			>
				${element.type.name}
			</button>
		</div>`;
		card_body_types.innerHTML += html_element;
	});
	card_body.appendChild(card_body_types);

	// agrego element a card
	card.appendChild(card_img);
	card.appendChild(card_body);
	// agrego card a col
	col.appendChild(card);
	// agrego col a container
	pokemon_container.appendChild(col);
}

get_Pokemons(offset, limit);
