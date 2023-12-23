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

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)

        .then((response) => response.json())
        .then((responsejson) => responsejson.results)
        .then((pokemons) => pokemons.map(pokeApi.getpokemonsdetail)) 
        .then((detailrequests) => Promise.all(detailrequests))
        .then((pokemondetails) => pokemondetails)
        .catch((error) => console.error(error))
}

