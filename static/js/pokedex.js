
function convertpokeapidetailtopokemon(pokedetail, pokemonInstance) {
    pokemonInstance.name = pokedetail.name
    pokemonInstance.number = pokedetail.id
    pokemonInstance.sprite = pokedetail.sprites.other.home.front_default || pokedetail.sprites.other["official-artwork"].front_default
    pokemonInstance.height = (pokedetail.height/10);
    pokemonInstance.weight = (pokedetail.weight/10);
    pokemonInstance.abilities = pokedetail.abilities.map((abilitieslot)=> abilitieslot.ability.name);
    pokemonInstance.stats = pokedetail.stats.map((statsLi) => statsLi.base_stat);
    const types = pokedetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemonInstance.types = types
    pokemonInstance.type = type
    pokemonInstance.speciesurl = pokedetail.species.url
    return pokemonInstance
}

function convertpokeapidetailtopokemon2(pokedetail2, pokemonInstance) {
    pokemonInstance.specie = pokedetail2.genera.map((species)=> species.genus).slice(7,8);
 
    return pokemonInstance
   
}


// busca lista de pokémon com offset e limit, incluindo detalhes completos (species, etc)
pokeApi.getPokemonsWithDetails = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((data) => data.results.map((result) => {
            const number = result.url.split('/')[6]
            return pokeApi.getDetailedPokemons(number)
        }))
        .then((promises) => Promise.all(promises)) // aguarda todas as promises serem resolvidas
}

// busca detalhes completos de um pokémon específico por ID
pokeApi.getDetailedPokemons = (number) => {
    const pokemonInstance = new Pokemon()
    const url = `https://pokeapi.co/api/v2/pokemon/${number}/`
    return fetch(url)
        .then((response) => response.json())
        .then((pokeDetail) => convertpokeapidetailtopokemon(pokeDetail, pokemonInstance))
        .then((pokemonObj) =>{
            const speciesUrl = pokemonObj.speciesurl;
            return fetch(speciesUrl)
                .then((response2) => response2.json())
                .then((pokeDetail2) => convertpokeapidetailtopokemon2(pokeDetail2, pokemonObj))
        })
}