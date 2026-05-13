import { use, useState } from "react";

const FiltradoUbicaciones = ({ electrodomesticos }) => {
    const [estado, setEstado] = useState("")
    const electrodomesticosFiltrados = electrodomesticos.filter((electrodomestico) =>
        electrodomestico.State_Name.toLowerCase().includes(estado.toLowerCase())
    )

    return (
        <div>
            <h2>Buscar Por Nombre De Estado</h2>

            <input type="text" placeholder="Escriba Estado" onChange={(e) => setEstado(e.target.value)}/>
        
            <ul>
                {electrodomesticosFiltrados.map((electrodomestico) => (
                    <li key={electrodomestico.id}>
                        {electrodomestico.City}
                    </li>
                ))}
            </ul>
        
        </div>
    )
}

export default FiltradoUbicaciones