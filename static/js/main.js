const pokemonList = document.getElementById('pokemonList')
const loadmorebutton = document.getElementById('botao')
const limit = 100;
const maxrecords = 1328;
var contador = 0;
let id = 0;
let offset= 0;

let meuBotao = document.getElementById("btnVoltarTopo");

// Quando o usuário rolar 20px do topo da página, mostra o botão
        window.onscroll = function() {
            scrollFunction();
        };

        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                meuBotao.style.display = "block";
            } else {
                meuBotao.style.display = "none";
            }
        }

        // Quando o usuário clica no botão, rola suavemente para o topo da página
        meuBotao.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Isso proporciona a rolagem suave
            });
        });



function convertpokemon(lista)
{
    return `  
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card pokemon-card ${lista.type}" data-id="${lista.number}" style="cursor: pointer;">
                <div class="card-body pokemon-card-body">
                    <div class="pokemon-number">#${lista.number}</div>
                    <h6 class="pokemon-name">${lista.name}</h6>
                    <div class="pokemon-detail">
                        <div class="pokemon-types">
                            ${lista.types.map((type) => `<span class="pokemon-type ${type}">${type}</span>`).join('')}
                        </div>
                        <img src="${lista.sprite}" alt="${lista.name}" class="pokemon-image">
                    </div>
                </div>
            </div>
        </div>
    ` 
}

function convertpokedex(pokemon)
{
    const specie = Array.isArray(pokemon.specie) && pokemon.specie.length > 0 ? pokemon.specie[0] : (pokemon.specie || 'N/A');
    
    return `
    <section class="pokemon-modal ${pokemon.type}">
            <div class = "top">
                    <span class="name">${pokemon.name}</span>
                    <span class="number">#${pokemon.number}</span>
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                <img class="foto" src="${pokemon.spriteOfficial || pokemon.sprite}" alt="${pokemon.name}">
            </div>
            <div class="bottom">
            <div class = "details">
                <span>Species <aside id="specie">${specie}</aside></span>
                <span>Height <aside>${pokemon.height} m</aside></span>
                <span>Weight <aside>${pokemon.weight} kg</aside></span>
                <span>Abilities <aside class="abilities">${pokemon.abilities.slice(0,1).join(', ')}</aside></span>
            </div>
            <div class = "status">
                <span>HP<aside class="bar"><div class="${pokemon.type}" id = "hp"></div></aside><aside class="num">${pokemon.stats[0] || 0}</aside></span>
                <span>Attack<aside class="bar"><div class="${pokemon.type}" id = "at"></div></aside><aside class="num">${pokemon.stats[1] || 0}</aside></span>
                <span>Defense<aside class="bar"><div class="${pokemon.type}" id = "de"></div></aside><aside class="num">${pokemon.stats[2] || 0}</aside></span>
                <span>Sp. Atk<aside class="bar"><div class="${pokemon.type}" id = "spat"></div></aside><aside class="num">${pokemon.stats[3] || 0}</aside></span>
                <span>Sp. Def<aside class="bar"><div class="${pokemon.type}" id = "spde"></div></aside><aside class="num">${pokemon.stats[4] || 0}</aside></span>
                <span>Speed<aside class="bar"><div class="${pokemon.type}" id = "sp"></div></aside><aside class="num">${pokemon.stats[5] || 0}</aside></span>
            </div>
        </div>
    </section>
    `
}

function loadpokedex(id)
{
    if (!id) return;
    pokeApi.getDetailedPokemons(id)
    .then((pokemons) => {
        const modalBody = document.getElementById('pokedexModalBody')
        if (!modalBody) return
        modalBody.innerHTML = convertpokedex(pokemons)

        const modalEl = document.getElementById('pokemonModal')
        const bsModal = new bootstrap.Modal(modalEl)
        bsModal.show()

        setTimeout(()=> {
            var hp = document.getElementById("hp")
            var at = document.getElementById("at")
            var de = document.getElementById("de")
            var spat = document.getElementById("spat")
            var spde = document.getElementById("spde")
            var sp = document.getElementById("sp")
            if(hp) hp.style.width = `${(Number(pokemons.stats[0] || 0)*100)/255}%`
            if(at) at.style.width = `${(Number(pokemons.stats[1] || 0)*100)/190}%`
            if(de) de.style.width = `${(Number(pokemons.stats[2] || 0)*100)/250}%`
            if(spat) spat.style.width = `${(Number(pokemons.stats[3] || 0)*100)/194}%`
            if(spde) spde.style.width = `${(Number(pokemons.stats[4] || 0)*100)/250}%`
            if(sp) sp.style.width = `${(Number(pokemons.stats[5] || 0)*100)/200}%`
        },50)
    }).catch(console.error)
}


pokemonList.addEventListener('click', (e) => {
    const card = e.target.closest('.pokemon-card')
    if (!card) return
    const id = card.dataset.id
    loadpokedex(id)
})






function loadpokemonitens(offset, limit)
{
    pokeApi.getPokemonsWithDetails(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertpokemon).join('')
    })
    
    
}

loadpokemonitens(offset, limit)

loadmorebutton.addEventListener('click', () =>{
    offset += limit
    const recordnexpage = offset+limit
   document.getElementById('contador').innerText = 100+offset;

    if(recordnexpage >= maxrecords)
    {
        const newlimit = maxrecords-offset
        loadpokemonitens(offset, newlimit)

        loadmorebutton.parentElement.removeChild(loadmorebutton)
    }
    else{
        loadpokemonitens(offset, limit)
    }
})






