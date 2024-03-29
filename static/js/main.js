const pokemonList = document.getElementById('pokemonList')
const loadmorebutton = document.getElementById('botao')
const limit = 50;
const maxrecords = 905;
let id = 0;
let offset= 0;




function convertpokemon(lista)
{
    return `  
        <a ID="${lista.number}" onclick="teste(this)">
            <li class="pokemon ${lista.type}">
                <span class="number">#${lista.number}</span>
                <span class="name">${lista.name}</span>

                <div class="detail">

                    <ol class="types">
                        ${lista.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${lista.sprite}" alt="${lista.name}">
                    </div> 
                
            </li></a>
        </button>
    ` 
   
}


function teste(obj)
{
    window.location.replace('./pokedex.html');
    localStorage.setItem('id', obj.id);
}




function loadpokemonitens(offset, limit)
{
    pokeApi.getPokemons(offset,limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertpokemon).join('')
    })
    
}

loadpokemonitens(offset, limit)

loadmorebutton.addEventListener('click', () =>{
    offset += limit
    const recordnexpage = offset+limit

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






