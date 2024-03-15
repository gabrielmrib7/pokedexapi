const pokedex = document.getElementById('contentpokedex')
var specie;




function convertpokedex(pokemon)
{

    return `
    <section class="pokemon ${pokemon.type}">
            <div class = "top">
                    <a href="./index.html"><img src="https://cdn-icons-png.flaticon.com/512/3114/3114883.png" width="25px" style="margin: 0px 0 10px 0px; filter: invert(1);"></a>
                    <span class="name">${pokemon.name}</span>
                    <span class="number">#${pokemon.number}</span>
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                <img class="foto" src="${pokemon.sprite}" alt="${pokemon.name}">
            </div>
            <div class="bottom">
            <div class = "details">
                <span>Species <aside id="specie">${pokemon.specie}</aside></span>
                <span>Height <aside>${pokemon.height} m (${(((pokemon.height*3,281)/100).toFixed(2)).replace(".","′")+"″"})</aside></span>
                <span>Weight <aside>${pokemon.weight} kg (${(pokemon.weight*2.205).toFixed(2)} lbs)</aside></span>
                <span>Abilities <aside class="abilities">${pokemon.abilities.slice(0,1)}</aside></span>
            </div>
            <div class = "status">
                <span>HP<aside class="bar"><div class="${pokemon.type}" id = "hp"></div></aside><aside class="num">${pokemon.stats.slice(0,1)}</aside></span>
                <span>Attack<aside class="bar"><div class="${pokemon.type}" id = "at"></div></aside><aside class="num">${pokemon.stats.slice(1,2)}</aside></span>
                <span>Defense<aside class="bar"><div class="${pokemon.type}" id = "de"></div></aside><aside class="num">${pokemon.stats.slice(2,3)}</aside></span>
                <span>Sp. Atk<aside class="bar"><div class="${pokemon.type}" id = "spat"></div></aside><aside class="num">${pokemon.stats.slice(3,4)}</aside></span>
                <span>Sp. Def<aside class="bar"><div class="${pokemon.type}" id = "spde"></div></aside><aside class="num">${pokemon.stats.slice(4,5)}</aside></span>
                <span>Speed<aside class="bar"><div class="${pokemon.type}" id = "sp"></div></aside><aside class="num">${pokemon.stats.slice(5,6)}</aside></span>
            </div>
        </div>
    </section>
        `
}




function loadpokedex()
{
    let id = localStorage.getItem('id')
    pokeApi.getPokemons(id)
    
    .then((pokemons) => {
        setTimeout(()=> {pokedex.innerHTML += convertpokedex(pokemons)},300)
        setTimeout(()=> {
        var hp = document.getElementById("hp")
        var at = document.getElementById("at")
        var de = document.getElementById("de")
        var spat = document.getElementById("spat")
        var spde = document.getElementById("spde")
        var sp = document.getElementById("sp")
        hp.style.width = `${(pokemons.stats.slice(0,1)*100)/255}%`
        at.style.width = `${(pokemons.stats.slice(1,2)*100)/190}%`
        de.style.width = `${(pokemons.stats.slice(2,3)*100)/250}%`
        spat.style.width = `${(pokemons.stats.slice(3,4)*100)/194}%`
        spde.style.width = `${(pokemons.stats.slice(4,5)*100)/250}%`
        sp.style.width = `${(pokemons.stats.slice(5,6)*100)/200}%`},300)
    })
    
    
    
}


loadpokedex()
setTimeout(()=> {specie = document.getElementById('specie').textContent;},1000);


    setTimeout(()=>{if(specie == 'undefined')
    {
        specie = document.getElementById('specie')
        specie.innerText = `${pokemon.specie}`
    }},1000)
     //correção bug undefined





