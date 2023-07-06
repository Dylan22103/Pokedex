const apiURL = 'https://pokeapi.co/api/v2/pokemon/'
const lupa = document.getElementById('lupa')
const textoIngresado = document.getElementById('texto_ingresado')
const resultados = document.getElementById('resultados')
const botonLimpiar = document.getElementById('borrar_todo')

lupa.addEventListener('click', buscarPokemon)
botonLimpiar.addEventListener('click', limpiarPokemones)

function buscarPokemon(){
    window.fetch(`${apiURL}${textoIngresado.value.toLowerCase()}`)
    .then(response =>{
        if (response.status === 404) {
            alert('El nombre del pokemon es incorrecto')
        } else {
            return response.json()
        }
    })
    .then(responseJSON => {
        const allItems = []
        const resultado = []

        for (let i in responseJSON){
            resultado.push([i,responseJSON[i]])
        }
        console.table(resultado)

        const logoPokemon = document.createElement('img')
        logoPokemon.src = resultado[14][1].front_default

        const nombrePokemon = document.createElement('h2')
        nombrePokemon.innerText = `Nombre: ${resultado[10][1]}`

        const idPokemon = document.createElement('h2')
        idPokemon.innerText = `Id: ${resultado[6][1]}`

        const tipoPokemon = document.createElement('h2')
        tipoPokemon.innerText = `Tipo: ${resultado[16][1][0].type.name}`

        const habilidad1 = document.createElement('h2')
        habilidad1.innerText = `Habilidad 1: ${resultado[0][1][0].ability.name}`

        const habilidad2 = document.createElement('h2')
        habilidad2.innerText = `Habilidad 2: ${resultado[0][1][1].ability.name}`

        let container = document.createElement('section')
        container.append(logoPokemon, nombrePokemon, idPokemon , tipoPokemon, habilidad1, habilidad2)

        allItems.push(container)

        resultados.append(...allItems)
    })    
}

function limpiarPokemones() {
    let contenido = resultados.childNodes
    contenido = Array.from(contenido)

    contenido.forEach(pokemon => {
        pokemon.remove(pokemon)
    })
}
