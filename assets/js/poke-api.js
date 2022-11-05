const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.details = pokeDetail

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types // vai atribuir apenas o primeiro tipo

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5,) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return  fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

    pokeApi.getPokemon = async function(id) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        const pokemon = await fetch(url).then(response => response.json())
            .then(allpokemon => {
                return allpokemon
                console.log('promisse',allpokemon);
            })
            console.log('fim',pokemon);
            return pokemon
    }

