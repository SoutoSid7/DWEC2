// =======
// CLASES
// =======
class Vuelo {
    constructor(codigo, numPlazas, imporB){
        this.codigo = codigo
        this.numPlazas = numPlazas
        this.imporB = imporB
    }

    get ingreso() {
        return this.numPlazas * this.imporB
    }

    get pocoRentable(){
        return this.ingreso < 10000
    }

    get rentable(){
        return this.ingreso >= 10000 && this.ingreso <= 20000
    }

    get muyRentable(){
        return this.ingreso > 20000
    }
}

class VueloMuyRentable {
    constructor(codigo, ingreso){
        this.codigo = codigo
        this.ingreso = ingreso
    }
}

// ==========
// VARIABLES
// ==========
const vuelos = []
const muyRentable = []

// ========
// BOTONES
// ========
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnAñadir").addEventListener("click", añadir)
    document.getElementById("btnModificar").addEventListener("click", modificar)
})

// ==========
// FUNCIONES
// ==========

// -- AÑADIR --
function añadir() {
    // Obtiene valores escritos por usuario
    const codigo = document.getElementById("codigo").value
    const numPlazas = document.getElementById("numPlazas").value
    const imporB = document.getElementById("imporB").value

    // VALIDACIONES
    if(!codigo || !numPlazas || !imporB){
        alert("Debe introducir todos los datos")
    }

    if(vuelos.some(v => v.codigo === codigo)){
        alert("Ese codigo de vuelo ya existe")
        return
    }

    if(numPlazas < 1 || imporB < 1){
        alert("Plazas e importe deben ser mayores que 0")
        return
    }

    // Crear objeto vuelo con esos datos
    const vuelo = new Vuelo(codigo, numPlazas, imporB)
    vuelos.push(vuelo)

    actualizarMuyRentables(vuelo)
    actualizarTabla()
    limpiar()
}

// -- MODIFICAR --
function modificar() {
    // Obtiene valores escritos por usuario
    const codigo = document.getElementById("codigo").value
    const numPlazas = document.getElementById("numPlazas").value
    const imporB = document.getElementById("imporB").value

    // Validaciones
    if(!codigo || !numPlazas || !imporB){
        alert("Debe introducir todos los datos")
    }

    if(numPlazas < 1 || imporB < 1){
        alert("Plazas e importe deben ser mayores que 0")
        return
    }

    const vuelo = vuelos.find(v => v.codigo === codigo)

    if(!vuelo){
        alert("NO exsite el vuelo con ese codigo")
        return
    }

    // Aplicar modificaciones
    vuelo.numPlazas = numPlazas
    vuelo.imporB = imporB

    actMuyRentables(vuelo)
    actualizarTabla()
    limpiar()
}

// -- CALCULAR --
function calcular() {
    const codigo = document.getElementById("codigo").value

    // Validaciones
    if(!codigo || !numPlazas || !imporB){
        alert("Debe introducir todos los datos")
    }

    const vuelo = vuelos.find(v => v.codigo === codigo)

    if (vuelo.pocoRentable) {
        alert(`Ingreso ${vuelo.ingreso}\nEl vuelo es poco rentable`)
    }

    if (vuelo.rentable) {
        alert(`Ingreso ${vuelo.ingreso}\nEl vuelo es rentable`)
    }

    if (vuelo.muyRentable) {
        alert(`Ingreso ${vuelo.ingreso}\nEl vuelo es MUY rentable`)
    }
}

// -- TABLA PRINCIPAL --
function actualizarTabla() {
    const tbody = document.querySelector("#resultado tbody")
    tbody.innerHTML = ""

    vuelos.forEach(v => {
        const fila = document.createElement("tr")
        fila.innerHTML += `
        <tr>
            <td>${v.codigo}</td>
            <td>${v.numPlazas}</td>
            <td>${v.imporB}</td>
        </tr>
        `

        fila.addEventListener("click", () => {
            document.getElementById("codigo").value = v.codigo
            document.getElementById("numPlazas").value = v.numPlazas
            document.getElementById("imporB").value = v.imporB
        })
        tbody.appendChild(fila)
    })
}


// -- TABLA MUY RENTABLES -- 
function tablaMuyRentables() {

    const zona = document.getElementById("zonaRentables")
    const tbody = document.querySelector("#tableRentable tbody")

    // Ocultar si no hay vuelos
    if (vueloMuyRentable.length === 0) {
        zona.style.display = "none"
        return
    }

    // Mostrar si hay vuelos rentables
    zona.style.display = "block"

    tbody.innerHTML = ""

    vueloMuyRentable.forEach(v => {
        const fila = document.createElement("tr")
        fila.innerHTML = `
            <td>${v.codigo}</td>
            <td>${v.numPlazas}</td>
            <td>${v.imporB}</td>
        `
        tbody.appendChild(fila)
    })
}


// -- ACTUALIZAR LISTA DE MUY RENTABLES --
function actMuyRentables(vuelo) {
    const index = vueloMuyRentable.findIndex( v => v.codigo === vuelo.codigo)
    
    if (vuelo.muyRentable){
        if (index === - 1){
            vueloMuyRentable.push(
                new VueloMuyRentable(vuelo.codigo, vuelo.ingreso)
            )
        } else {
            vueloMuyRentable[index].ingreso = vuelo.ingreso
        }

    } else {
        if (index !== -1){
            vueloMuyRentable.splice(index, 1)
        }
    }
    tablaMuyRentables()
}

// -- LIMPIAR FORMULARIO --
function limpiar() {
    document.getElementById("codigo").value = ""
    document.getElementById("numPlazas").value = ""
    document.getElementById("imporB").value = ""
}