import { CMDB, Pelicula } from "./cmdb.js"

let peliculas = []

document.addEventListener("DOMContentLoaded", () => {
    peliculas = CMDB.cargarPeliculas()
    mostrarListado()
})

function obetenerNombres(ids){
    return ids
        .map(id => {
            const genero = generos.find(g => g.id === id)
        })
        .join(", ")
}

function mostrarListado() {
    const zona = document.getElementById("tablaListado")
    zona.innerHTML = ""

    peliculas.forEach(p => {
        const fila = document.createElement("tr")

        const Titulo = document.createElement("td")
        Titulo.textContent= p.titulo

        const Fecha = document.createElement("td")
        Fecha.textContent= p.fechaEstreno

        const Popularidad = document.createElement("td")
        Popularidad.textContent= p.popularidad

        const Puntuacion = document.createElement("td")
        Puntuacion.textContent= p.puntuacion ?? 0

        const numVotos = document.createElement("td")
        numVotos.textContent= p.numVotos ?? 0

        const Generos = document.createElement("td")
        Generos.textContent= obetenerNombres(p.generos)

        const tdBoton = document.createElement("td")
        const btnVotar = document.createElement("button")
        btnVotar.textContent = "Votar"

        btnVotar.addEventListener("click", () => votarPelicula(p))

        tdBoton.appendChild(btnVotar)

        fila.appendChild(Titulo)
        fila.appendChild(Fecha)
        fila.appendChild(Popularidad)
        fila.appendChild(Puntuacion)
        fila.appendChild(numVotos)
        fila.appendChild(Generos)
        fila.appendChild(tdBoton)

        zona.appendChild(fila)
    })
}

function votarPelicula(p) {
    let voto = parseInt(prompt("Introduce un voto entre 0 y 10"))

    if(voto > 10 || voto < 0) {
        alert("Voto invalido")
        return
    }

    p.votar(voto)

    CMDB.guardarPeliculas(peliculas)
    mostrarListado()
}