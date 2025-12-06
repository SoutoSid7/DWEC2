import { Genero, Listado } from "./cmdb.js"

let generos = [];
document.addEventListener("DOMContentLoaded", () => {
    generos = Listado.cargarGeneros(); // Lee localStorage
    mostrarTabla();
})

function mostrarTabla(){
    
}