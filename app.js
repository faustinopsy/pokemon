document.addEventListener("DOMContentLoaded", function() {
    let currentPokemonId = 1; 
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

    const pokemonNameElement = document.getElementById("pokemon-name");
    const pokemonImageElement = document.getElementById("pokemon-image");
    const prevPokemonButton = document.getElementById("prev-pokemon");
    const nextPokemonButton = document.getElementById("next-pokemon");

    const fetchPokemonData = (pokemonId) => {
        fetch(apiUrl + pokemonId)
            .then(response => response.json())
            .then(data => {
                pokemonNameElement.textContent = data.name;
                pokemonImageElement.src = data.sprites.front_default;
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                pokemonNameElement.textContent = "Failed to load data";
            });
    };

    const loadPreviousPokemon = () => {
        if (currentPokemonId > 1) {
            currentPokemonId--;
            fetchPokemonData(currentPokemonId);
        }
    };

    const loadNextPokemon = () => {
        currentPokemonId++;
        fetchPokemonData(currentPokemonId);
    };

    fetchPokemonData(currentPokemonId);

    prevPokemonButton.addEventListener("click", loadPreviousPokemon);
    nextPokemonButton.addEventListener("click", loadNextPokemon);
});
