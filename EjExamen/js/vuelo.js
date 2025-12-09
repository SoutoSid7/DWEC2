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
const vueloMuyRentable = []

// ========
// BOTONES
// ========
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnAñadir").addEventListener("click", añadir)
    document.getElementById("btnModificar").addEventListener("click", modificar)
    document.getElementById("btnCalcular").addEventListener("click", calcular)
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
        return
    }

    // Comprueba si existe un vuelo con ese codigo
    // Para cada vuelo (v) evalua si es === a codigo
    if(vuelos.some(v => v.codigo === codigo)){
        alert("Ese codigo de vuelo ya existe")
        return
    }

    if(numPlazas < 1 || imporB < 1){
        alert("Plazas e importe deben ser mayores que 0")
        return
    }

    // Crear objeto de la clase vuelo con los datos recogidos 
    // Se guarda en la constante vuelo 
    const vuelo = new Vuelo(codigo, numPlazas, imporB)
    // Añade vuelo al array vuelos
    vuelos.push(vuelo)

    // Llamadas a funciones
    actMuyRentables(vuelo)
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
        return
    }

    if(numPlazas < 1 || imporB < 1){
        alert("Plazas e importe deben ser mayores que 0")
        return
    }

    // Buscar el vuelo a modificar
    const vuelo = vuelos.find(v => v.codigo === codigo)

    if(!vuelo){
        alert("NO existe el vuelo con ese codigo")
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
    const numPlazas = document.getElementById("numPlazas").value
    const imporB = document.getElementById("imporB").value

    // Validaciones
    if(!codigo || !numPlazas || !imporB){
        alert("Debe introducir todos los datos")
        return
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
    // Busca el elemento tbody que esta dentro de resultado
    const tbody = document.querySelector("#resultado tbody")
    // Vacia la tabla
    tbody.innerHTML = ""

    // Recorre vuelos en cada iteracion (v) representa un vuelo
    vuelos.forEach(v => {
        const fila = document.createElement("tr") // Crea una nueva fila de la tabla vacia
        // Añade celdas con el dato del vuelo
        fila.innerHTML += `
            <td>${v.codigo}</td>
            <td>${v.numPlazas}</td>
            <td>${v.imporB}</td>
        `
        // Al hacer click cargar los datos en el formulario
        fila.addEventListener("click", () => {
            document.getElementById("codigo").value = v.codigo
            document.getElementById("numPlazas").value = v.numPlazas
            document.getElementById("imporB").value = v.imporB
        })
        tbody.appendChild(fila) // Inserta la fila dentro del tbody
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
            <td>${v.ingreso}</td>
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