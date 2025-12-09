class Operacion {
    constructor(idOper, nombreS, apellidoS, producto, oper, cantidad) {
        this.idOper = idOper
        this.nombreS = nombreS
        this.apellidoS = apellidoS
        this.producto = producto
        this.oper = oper
        this.cantidad = cantidad
    }
}

class OperacionSospechosa {
    constructor(masKg) {
        this.masKg = masKg
    }
}

const operaciones = []
const opercaionesSospechosa = []

