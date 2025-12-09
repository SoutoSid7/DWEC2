class Linea {
    constructor(numLinea, origen, destino, horaIni, intervalBus){
        this.numLinea = numLinea
        this.origen = origen
        this.destino = destino
        this.horaIni = horaIni
        this.intervalBus = intervalBus
    }
}

class Paradas {
    constructor(numParada, numLinea, localidad, intervalSal){
        this.numParada = numParada
        this.numLinea = numLinea
        this.localidad = localidad
        this.intervalSal = intervalSal
    }
}