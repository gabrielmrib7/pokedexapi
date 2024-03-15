const pokeApi = {}
const pokemon = new Pokemon()


function convertpokeapidetailtopokemon(pokedetail) {
    pokemon.name = pokedetail.name
    pokemon.number = pokedetail.id
    pokemon.sprite = pokedetail.sprites.other.home.front_default
    pokemon.height = (pokedetail.height/10);
    pokemon.weight = (pokedetail.weight/10);
    pokemon.abilities = pokedetail.abilities.map((abilitieslot)=> abilitieslot.ability.name);
    pokemon.stats = pokedetail.stats.map((statsLi) => statsLi.base_stat);
    const types = pokedetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    return pokemon
}

function convertpokeapidetailtopokemon2(pokedetail2) {
    pokemon.specie = pokedetail2.genera.map((species)=> species.genus).slice(7,8);
 
    return pokemon
   
}


pokeApi.getPokemons = (number) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${number}/`
    const url2 = `https://pokeapi.co/api/v2/pokemon-species/${number}/`
    return (fetch(url)
        .then((response) => response.json())
        .then(convertpokeapidetailtopokemon)
        .then(fetch(url2)
                .then((response2) => response2.json())
                .then((convertpokeapidetailtopokemon2)))
        .then((pokemondetails) => pokemondetails))

}