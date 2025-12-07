export class Genero { 
    constructor(id, nombre){
        this.id = id;
        this.nombre = nombre;
    }
}

export class Pelicula {
    constructor(id, titulo, fechaEstreno, popularidad, generos = []){
        this.id = id
        this.titulo = titulo
        this.fechaEstreno = fechaEstreno
        this.popularidad = popularidad
        this.puntuaciones = []
        this.generos = generos
    }

    get puntuacion() {
        if(this.puntuaciones.length === 0) return 0
        return this.puntuaciones.reduce((a,b)=>a+b,0) / this.puntuaciones.length
        // Suma todos los valores de this.puntuaciones
        // Divide entre la cantidad de elementos
        
    }

    get numVotos() {
        return this.puntuaciones.length
    }

    votar(valor) {
        this.puntuaciones.push(valor)
    }

}

export class CMDB {
    // Generos
    static cargarGeneros(){
        return JSON.parse(localStorage.getItem("cmdb_generos") || "[]");
    }
    static guardarGeneros(generos){
        localStorage.setItem("cmdb_generos", JSON.stringify(generos));
    }

    // Peliculas
    static cargarPeliculas(){
        let datos = JSON.parse(localStorage.getItem("cmdb_peliculas") || "[]");
        return datos.map(p => {
            let peli = new Pelicula(
                p.id,
                p.titulo,
                p.fechaEstreno,
                p.popularidad,
                p.generos
            )
            peli.puntuaciones = p.puntuaciones || []
            return peli
        })
    }
    static guardarPeliculas(lista){
        localStorage.setItem("cmdb_peliculas", JSON.stringify(lista))
    }
}

