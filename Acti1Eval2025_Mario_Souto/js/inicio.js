import { Genero, Pelicula, CMDB } from "../js/cmdb.js"

if(!localStorage.getItem("cmdb_generos")){
    CMDB.guardarGeneros([
        new Genero(1, "Accion"),
        new Genero(2, "Drama")
    ])
}
if(!localStorage.getItem("cmdb_generos")){
    CMDB.guardarPeliculas([
        new Pelicula(1, "Matrix", "1999-03-31", 90, [1]),
        new Pelicula(2, "Shrek", "2001-05-18", 88, [2]),
        new Pelicula(3, "Gladiator", "2000-05-05", 85, [1]),
        new Pelicula(4, "Toy Story", "1995-11-22", 92, [2]),
        new Pelicula(5, "Avatar", "2009-12-18", 80, [1])
    ])
}