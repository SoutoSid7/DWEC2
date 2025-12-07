import { Genero, CMDB } from "./cmdb.js"

let generos = [];
let filaSeleccionada = null
document.addEventListener("DOMContentLoaded", () => {
    generos = Listado.cargarGeneros(); // Lee localStorage
    mostrarTabla();

    document.getElementById("btnAlta").addEventListener("click", altaGenero)
    document.getElementById("btnBaja").addEventListener("click", bajaGenero)
    document.getElementById("btnMod").addEventListener("click", modificarGenero)
})

function mostrarTabla(){
    const tbody = document.getElementById("tablaGeneros")
    tbody.innerHTML = ""

    generos.forEach((g) => {
        const fila = document.createElement("tr")

        fila.innerHTML = `
        <td>${g.id}</td>
        <td>${g.nombre}</td>
        `

        fila.addEventListener("click", () => {
            filaSeleccionada = g
            cargarFormulario(g)
        })

        tbody.appendChild(fila)
    })
}

function cargarFormulario(g) {
    document.getElementById("textId").value = g.id
    document.getElementById("nombre").value = g.nombre
}

function conseguirID() {
    if (generos.length === 0) return 1
    return generos[generos.length - 1].id + 1
}

function validarNombre(nombre){
    if (nombre.trim() === ""){
        alert("El nombre no puede estar vacio")
        return false
    }
    if (nombre.length > 100){
        alert("El nombre no puede tener mas de 100 caracteres")
        return false
    }
    return true
}

function altaGenero() {
    const nombre = document.getElementById("nombre").value.trim()
    if(!validarNombre(nombre)) return
    const nuevoGenero = new Genero(conseguirID(), nombre)

    generos.push(nuevoGenero)
    Listado.guardarGeneros(generos)
    mostrarTabla()
    limpiarFormulario()
}

function bajaGenero() {
    const id = parseInt(document.getElementById("textId").value)

    if(!id) {
        alert("Selecciona un ID")
        return
    }

    const peliculas = CMDB.cargarPeliculas()
    const usada = peliculas.some(p => p.generos.includes(id))

    if(usada){
        alert("No se puede borrar un genero que se esta utilizando")
        return
    }

    generos = generos.filter(g => g.id !== id)
    Listado.guardarGeneros(generos)
    mostrarTabla()
    limpiarFormulario()
}

function modificarGenero() {
    const id = parseInt(document.getElementById("textId").value)
    const nombre = document.getElementById("nombre").value.trim()

    if(!id) {
        alert("Seleccione un ID")
        return
    }

    if(!validarNombre(nombre)) return
    const genero = generos.find(g => g.id === id)
    if(!genero) return

    genero.nombre = nombre

    Listado.guardarGeneros(generos)
    mostrarTabla()
    limpiarFormulario()
}

function limpiarFormulario() {
    document.getElementById("textId").value = ""
    document.getElementById("nombre").value = ""
    filaSeleccionada = null
}