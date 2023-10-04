document.addEventListener("DOMContentLoaded", function() {
    let pagina = 1; 
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

    const pokemonNameElement = document.getElementById("nome");
    const pokemonImageElement = document.getElementById("image");
    const prevPokemonButton = document.getElementById("anterior");
    const nextPokemonButton = document.getElementById("proximo");

    const buscarDadosApi = (pokemonId) => {
        fetch(apiUrl + pokemonId)
            .then(response => response.json())
            .then(data => {
                pokemonNameElement.textContent = data.name;
                pokemonImageElement.src = data.sprites.front_default;
                pokemonImageElement.onclick = () => mostrarDetalhes(data);
            })
            .catch(error => {
                console.error("erro ao buscar: ", error);
                pokemonNameElement.textContent = "Falha carregar os dados";
            });
    };

    const carregarAnterior = () => {
        if (pagina > 1) {
            pagina--;
            buscarDadosApi(pagina);
        }
    };

    const carregarProximo = () => {
        pagina++;
        buscarDadosApi(pagina);
    };

    buscarDadosApi(pagina);

    prevPokemonButton.addEventListener("click", carregarAnterior);
    nextPokemonButton.addEventListener("click", carregarProximo);


    const mostrarDetalhes = (pokemonData) => {
        let detalhes = `Altura: ${encode(pokemonData.height)}<br>`;
        detalhes += `Peso: ${encode(pokemonData.weight)}<br>`;
        detalhes += `Tipo: ${encode(pokemonData.types.map(t => t.type.name).join(", "))}<br>`;
        detalhes += `Habilidades: ${encode(pokemonData.abilities.map(a => a.ability.name).join(", "))}`;
    
        Swal.fire({
            title: encode(pokemonData.name),
            html: detalhes,  
            imageUrl: pokemonData.sprites.front_default,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
        });
    };
    
   
    function encode(str) {
        let div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
    
});
