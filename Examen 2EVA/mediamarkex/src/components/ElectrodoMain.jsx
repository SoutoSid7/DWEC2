import { useEffect, useState } from "react"
import ListadoUbicaciones from "./ListadoUbicaciones"
import FiltradoUbicaciones from "./FiltradoUbicaciones"
import MasElectrodomesticos from "./MasElectrodomesticos"

const ElectrodoMain = () => {
    const [electrodomesticos, setElectrodomesticos] = useState([])

    const cargarElectrodomesticos = async () => { 
        try {
            const respuesta = await fetch("/json/Electrodom.json")
            const datos = await respuesta.json() 
            setElectrodomesticos(datos)
        } catch (error) {
            console.log("Error al cargar los electrodomesticos:", error)
        }
    }

    useEffect(() => {
        cargarElectrodomesticos()
    }, [])

    return (
        <div>
            <h1>ElectrodoMain</h1>
            <MasElectrodomesticos electrodomesticos={electrodomesticos}></MasElectrodomesticos>
            <ListadoUbicaciones electrodomesticos={electrodomesticos}></ListadoUbicaciones>
            <FiltradoUbicaciones electrodomesticos={electrodomesticos}></FiltradoUbicaciones>
        </div>
    )
}

export default ElectrodoMain