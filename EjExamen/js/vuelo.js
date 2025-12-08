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
        return this.ingreso > 10000 && this.ingreso < 20000
    }

    get muyRentable(){
        return this.ingreso > 20000
    }
}

const vuelos = []
const muyRentable = []

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnAñadir").addEventListener("click", añadir)
    document.getElementById("btnModificar").addEventListener("click", modificar)
})

function añadir() {
    // Obtiene valores escritos por usuario
    const codigo = document.getElementById("codigo").value
    const numPlazas = document.getElementById("numPlazas").value
    const imporB = document.getElementById("imporB").value

    // Crear objeto vuelo con esos datos
    const vuelo = new Vuelo(codigo, numPlazas, imporB)
    vuelos.push(vuelo)

    actualizarTabla()
    limpiar()
}

function modificar() {
    // Obtiene valores escritos por usuario
    const codigo = document.getElementById("codigo").value

    if(!codigo){
        alert("Debe seleccionar un vuelo")
        return
    }

    const vuelo = vuelos.find(v => v.codigo === codigo)

    const numPlazas = document.getElementById("numPlazas").value
    const imporB = document.getElementById("imporB").value

    vuelo.numPlazas = numPlazas
    vuelo.imporB = imporB

    actualizarTabla()
    limpiar()
}

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

function limpiar() {
    document.getElementById("codigo").value = ""
    document.getElementById("numPlazas").value = ""
    document.getElementById("imporB").value = ""
}
