const pokeApi = {}



function convertpokeapidetailtopokemon(pokedetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokedetail.name
    pokemon.number = pokedetail.id
    pokemon.sprite = pokedetail.sprites.other.home.front_default
    


    const types = pokedetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    return pokemon
}

pokeApi.getpokemonsdetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertpokeapidetailtopokemon)
}

pokeApi.getAllPokemonNames = () => {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=1328"

    return fetch(url)
        .then(response => response.json())
        .then(json => json.results) // { name, url }
}

let allPokemons = []

pokeApi.getAllPokemonNames().then(data => {
    allPokemons = data // salva lista local
})

const searchInput = document.getElementById("searchInput")
const suggestions = document.getElementById("suggestions")

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase().trim()

    if (value === "") {
        suggestions.innerHTML = ""
        return
    }

    const filtered = allPokemons.filter(p => p.name.includes(value)).slice(0, 10)

    suggestions.innerHTML = filtered
        .map(p => `<li data-url="${p.url}">${p.name}</li>`)
        .join("")
})

suggestions.addEventListener("click", (event) => {
    const li = event.target

    if (li.tagName === "LI") {
        const url = li.getAttribute("data-url")

        fetch(url)
            .then(res => res.json())
            .then(pokeDetail => {
                // extrai o id do URL
                const number = url.split('/')[6]
                // abre o modal com o pokemon selecionado
                loadpokedex(number)
                suggestions.innerHTML = "" // esconde lista após selecionar
                searchInput.value = li.textContent // preenche o input
            })
    }
})

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)

        .then(response => response.json())
        .then(responsejson => responsejson.results)
        .then(pokemons => pokemons.map(pokeApi.getpokemonsdetail))
        .then(detailrequests => Promise.all(detailrequests))
        .catch((error) => console.error(error))
}

