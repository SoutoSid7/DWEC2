document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnCalcular").addEventListener("click", calcular)
})

let vueloMuyRentable = []

function calcular() {
    const codigo = document.getElementById("codigo").value

    const vuelo = vuelos.find(v => v.codigo === codigo)

    if (!vuelo) {
        alert("El vuelo no existe")
        return
    }

    if (vuelo.pocoRentable) {
        alert(`Ingreso ${vuelo.ingreso}\nEl vuelo es poco rentable`)
    }

    if (vuelo.rentable) {
        alert(`Ingreso ${vuelo.ingreso}\nEl vuelo es rentable`)
    }

    if (vuelo.muyRentable) {
        alert(`Ingreso ${vuelo.ingreso}\nEl vuelo es MUY rentable`)

        // Guardar si no está ya en la lista
        if (!vueloMuyRentable.includes(vuelo)) {
            vueloMuyRentable.push(vuelo)
        }

        actualizarTablaMuyRentables()
    }
}

function actualizarTablaMuyRentables() {

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

