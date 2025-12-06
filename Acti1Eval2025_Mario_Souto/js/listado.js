import { Listado, Pelicula } from "./cmdb.js"

let peliculas = []

document.addEventListener("DOMContentLoaded", () => {
    peliculas = Listado.cargarPeliculas()
    mostrarListado()
})

function mostrarListado() {
    const zona = document.getElementById("tablaListado")
    zona.innerHTML = ""

    peliculas.forEach(g => {
        const titulo = document.createElement("titulo")
        const fecha = document.createElement("fecha")
        const popularidad = document.createElement("popularidad")
        const puntuacion = document.createElement("puntuacion")
        const numVotos = document.createElement("numVotos")
        const generos = document.createElement("generos")
    })
}