const spinner = document.querySelector("#spinner");
const pokemon_container = document.querySelector("#pokemon-container");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const formSearch = document.querySelector("#formSearch");
const btnClear = document.querySelector("#button-clear");
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
/// Clear pantalla
btnClear.addEventListener("click", () => {
	removeChildNodes(pokemon_container);
	formSearch.querySelector('[name="searchName"]').value = "";
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

function get_pokemon_name(name) {
	fetch(`${URL_POKEMON}${name}/`)
		.then((res) => res.json())
		.then((data) => {
			card_pokemon(data);
			spinner.style.display = "none";
		})
		.catch((error) => {
			console.log(error);
			let msj = "No se encontro pokemon, verificar si esta bien escrito.";
			alert_message(msj);
		});
}

// form
formSearch.addEventListener("submit", (e) => {
	e.preventDefault();
	let searchName = formSearch
		.querySelector('[name="searchName"]')
		.value.toLowerCase();
	removeChildNodes(pokemon_container);
	get_pokemon_name(searchName);
});

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
	col.classList.add("col-6", "col-sm-6", "col-md-2", "my-1", "h-auto");

	const card = document.createElement("div");
	card.classList.add("card", "shadow", "border-light", "h-auto");
	let card_header = `<div class="card-header">
		<div class="d-flex justify-content-between align-items-end">
			<h6 class="card-title text-capitalize text-start">#${pokemon.id
				.toString()
				.padStart(3, 0)} ${pokemon.name}</h6>	
			<img
					class="img-fluid text-end"
					src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${
						pokemon.id
					}.png"
					alt=""
				/>
		</div>
	</div>`;
	card.innerHTML = card_header;
	console.log(pokemon.sprites)
	const card_img = document.createElement("img");
	card_img.classList.add("card-img-top");
	card_img.src = pokemon.sprites.other["official-artwork"].front_default;
	
	const card_body = document.createElement("div");
	card_body.classList.add("card-body");
	const card_body_types = document.createElement("div");
	card_body_types.classList.add(
		"d-flex",
		"justify-content-center",
		"text-center"
	);

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

	const button = document.createElement("button");
	button.classList.add("btn", "btn-primary", "btn-sm");
	button.setAttribute("data-bs-toggle", "modal");
	button.setAttribute("data-bs-target", "#pokeModal");
	button.setAttribute("data-pokemon", `${pokemon.id}`);
	button.setAttribute("onclick", `modal_alert(${pokemon.id})`);
	button.innerHTML = `Detalles <i class="fa-solid fa-plus"></i>`;

	const card_footer = document.createElement("div");
	card_footer.classList.add("card-footer", "text-center");
	card_footer.appendChild(button);

	// agrego element a card
	card.appendChild(card_img);
	card.appendChild(card_body);
	card.appendChild(card_footer);
	// agrego card a col
	col.appendChild(card);
	// agrego col a container
	pokemon_container.appendChild(col);
}

function modal_alert(id) {
	const myModal = document.querySelector("#pokeModal");
	let modal_title = myModal.querySelector("#pokeModalLabel");
	let modal_body = myModal.querySelector(".modal-body");

	fetch(`${URL_POKEMON}${id}/`)
		.then((res) => res.json())
		.then((data) => {
			let poke = data;

			let html_template_title = `<h6 class="card-title text-capitalize">#${poke.id
				.toString()
				.padStart(3, 0)} ${poke.name}</h6>`;
			modal_title.innerHTML = html_template_title;

			let html_template_body_start = `<div class="row justify-content-center align-items-center">
				<div class="col-6">
					<ul class="nav nav-pills nav-fill" id="myTab" role="tablist">
						<li class="nav-item" role="presentation">
							<button class="nav-link active" id="normal-tab" data-bs-toggle="tab" data-bs-target="#normal-tab-pane" type="button" role="tab" aria-controls="normal-tab-pane" aria-selected="true">Normal</button>
						</li>
						<li class="nav-item" role="presentation">
							<button class="nav-link" id="shiny-tab" data-bs-toggle="tab" data-bs-target="#shiny-tab-pane" type="button" role="tab" aria-controls="shiny-tab-pane" aria-selected="false">Shiny</button>
						</li>
					</ul>
					<div class="tab-content" id="myTabContent">
						<div class="tab-pane fade show active" id="normal-tab-pane" role="tabpanel" aria-labelledby="normal-tab" tabindex="0">
							<img class="img-fluid" src="${poke.sprites.other.home.front_default}"></img>
						</div>
						<div class="tab-pane fade" id="shiny-tab-pane" role="tabpanel" aria-labelledby="shiny-tab" tabindex="0">
							<img class="img-fluid" src="${poke.sprites.other.home.front_shiny}"></img>
						</div>
					</div>
				</div>
				<div class="col-6">
					<ul class="list-group list-group-flush">`;
			let html_template_body_end = `</ul>
				</div>
			</div>`;
			let ul = "";
			for (let index = 0; index < poke.stats.length; index++) {
				const element = poke.stats[index];
				let stat100 = 255;
				let statBase = element.base_stat;
				let statPorcentaje = (statBase * 100) / stat100;

				let html_template_stat = `<li class="list-group-item text-uppercase d-flex justify-content-between">
				<span>${element.stat.name}: </span><span class='fw-bold'>${statBase}</span>
				</li>`;
				ul += html_template_stat;
			}
			modal_body.innerHTML =
				html_template_body_start + ul + html_template_body_end;
		});
}

function alert_message(msj) {
	let col = document.createElement("div");
	col.classList.add("col-12");

	let alert = document.createElement("div");
	alert.classList.add("alert", "alert-danger", "text-center");
	alert.setAttribute("role", "alert");
	alert.innerText = msj;

	col.appendChild(alert);
	pokemon_container.appendChild(col);
}

get_Pokemons(offset, limit);
