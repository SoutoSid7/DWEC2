import { CMDB, Pelicula } from "./cmdb.js"

let generos = []
let peliculas = []

document.addEventListener("DOMContentLoaded", () => {
    // Cargar Generos
    generos = CMDB.cargarGeneros()
    mostrarGenerosForm()

    // Cargar Peliculas
    peliculas = CMDB.cargarPeliculas()
    mostrarTbPelicula()

    document.getElementById("btnAlta").addEventListener("click", altaPelicula)
    document.getElementById("btnMod").addEventListener("click", modificarPelicula);
    document.getElementById("btnBaja").addEventListener("click", bajaPelicula);
})

function obetenerNombres(ids){
    return ids
        .map(id => {
            const genero = generos.find(g => g.id === id)
            return genero ? genero.nombre : "desconocido"
        })
        .join(", ")
}

function mostrarGenerosForm() {
    const zona = document.getElementById("znGeneros")
    zona.innerHTML = ""

    generos.forEach(g => {
        const label = document.createElement("label")
        const checkbox = document.createElement("input")

        checkbox.type = "checkbox"
        checkbox.value = g.id

        label.appendChild(checkbox)
        label.append(" " + g.nombre)

        zona.appendChild(label)
        zona.appendChild(document.createElement("br"))
    })
}

function mostrarTbPelicula() {
    const tbody = document.getElementById("tablaPeliculas")
    tbody.innerHTML = ""

    peliculas.forEach(p => {
        const fila = document.createElement("tr")

        fila.innerHTML = `
            <td>${p.id}</td>
            <td>${p.titulo}</td>
            <td>${p.fechaEstreno}</td>
            <td>${p.popularidad}</td>
            <td>${p.puntuacion ?? 0}</td>
            <td>${p.numVotos ?? 0}</td>
            <td>${obetenerNombres(p.generos)}</td>

        `

        fila.addEventListener("click", () => {
            cargarPeliculasFormulario(p)
        })

        tbody.appendChild(fila)
    })

}

function validarTitulo(titulo) {
    if (titulo.trim() === ""){
        alert("El titulo no puede estar vacio")
        return false
    }
    if (titulo.length > 100){
        alert("El titulo no puede tener mas de 100 caracteres")
        return false
    }
    return true
}

function validarFecha(fechaEstreno) {
    const fecha = new Date(fechaEstreno)
    const fechaTope = new Date('1900-01-01')
    const hoy = new Date()
    
    if(fecha < fechaTope){
        alert("Introduzca una fecha mayor a 01/01/1900")
        return false
    }

    if(fecha > hoy){
        alert("La fecha no puede ser futura")
        return false
    }

    return true
}

function validarPopularidad(popularidad){
    if(popularidad < 0 || popularidad > 100){
        alert("La popularidad debe estar entre 0 y 100")
        return false
    }
    return true
}

function conseguirID() {
    if (peliculas.length === 0) return 1
    return peliculas[peliculas.length - 1].id + 1
}

function altaPelicula() {
    const titulo = document.getElementById("titulo").value.trim()
    const fechaEstreno = document.getElementById("fechaEstreno").value
    const popularidad = parseFloat(document.getElementById("popularidad").value)

    if(!validarTitulo(titulo)) return
    if(!validarFecha(fechaEstreno)) return
    if(!validarPopularidad(popularidad)) return

    // Obtener generos
    const generoSeleccionado = [...document.querySelectorAll("#znGeneros input[type=checkbox]:checked")]
        .map(ch => parseInt(ch.value))

    const nuevaPelicula = new Pelicula(
                            conseguirID(), 
                            titulo, 
                            fechaEstreno, 
                            popularidad, 
                            generoSeleccionado
                        )

    peliculas.push(nuevaPelicula)
    CMDB.guardarPeliculas(peliculas)
    mostrarTbPelicula()
    limpiarFormulario()
}

function modificarPelicula(){
    const id = parseInt(document.getElementById("textId").value)
    
    if(!id){
        alert("Debe seleccionar la pelicula")
        return
    }

    const pelicula = peliculas.find(p => p.id === id)
    if(!pelicula) return

    const titulo = document.getElementById("titulo").value.trim()
    const fechaEstreno = document.getElementById("fechaEstreno").value
    const popularidad = parseFloat(document.getElementById("popularidad").value)

    if(!validarTitulo(titulo)) return
    if(!validarFecha(fechaEstreno)) return
    if(!validarPopularidad(popularidad)) return

    pelicula.titulo = titulo
    pelicula.fechaEstreno = fechaEstreno
    pelicula.popularidad = popularidad
    
    const generosSeleccionados = [...document.querySelectorAll("#znGeneros input[type=checkbox]:checked")]
    .map(ch => parseInt(ch.value));
    pelicula.generos = generosSeleccionados;


    CMDB.guardarPeliculas(peliculas)
    mostrarTbPelicula()
    limpiarFormulario()
}

function bajaPelicula(){
    const id = parseInt(document.getElementById("textId").value)

    if(!id) {
        alert("Selecciona un ID")
        return
    }

    peliculas = peliculas.filter(g => g.id !== id)

    CMDB.guardarPeliculas(peliculas)
    mostrarTbPelicula()
    limpiarFormulario()
}

function cargarPeliculasFormulario(pelicula){
    document.getElementById("textId").value = pelicula.id
    document.getElementById("titulo").value = pelicula.titulo
    document.getElementById("fechaEstreno").value = pelicula.fechaEstreno
    document.getElementById("popularidad").value = pelicula.popularidad

    document.querySelectorAll("#znGeneros input[type=checkbox]").forEach(ch => {
        ch.checked = pelicula.generos.includes(parseInt(ch.value))
    })
}

function limpiarFormulario() {
    document.getElementById("textId").value = ""
    document.getElementById("titulo").value = ""
    document.getElementById("fechaEstreno").value = ""
    document.getElementById("popularidad").value = ""

    document.querySelectorAll("#znGeneros input[type=checkbox]").forEach(ch => {
        ch.checked = false
    })
}