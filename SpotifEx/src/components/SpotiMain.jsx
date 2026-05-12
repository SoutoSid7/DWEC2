import { useEffect, useState } from "react"
import ListadoCanciones from "./ListadoCanciones"
import FiltradoCanciones from "./FiltradoCanciones"
import MasPopular from "./MasPopular"

const SpotiMain = () => {
    const [canciones, setCanciones] = useState([]) // crea variable de estado, empieza como array vacio

    const cargarCanciones = async () => { // asincrona para obtener array
        try {
            // await -> espera a que js termine de cargar para continuar
            const respuesta = await fetch("../public/json/Spotify.json") // busca archivo 
            const datos = await respuesta.json() // convierte archivo en datos utilizables en Js
            setCanciones(datos) // guarda las canciones en el estado
        } catch (error) {
            console.log("Error al cargar canciones:", error)
        }
    }

    // Hace que la carga se ejecute una sola vez
    useEffect(() => {
        cargarCanciones()
    }, [])

    return(
        <div>
            <h1>SpotifEx</h1>
            <MasPopular canciones={canciones}></MasPopular>

            <ListadoCanciones canciones={canciones}></ListadoCanciones>
            
            <FiltradoCanciones canciones={canciones}></FiltradoCanciones>
        </div>
    )

}


export default SpotiMain