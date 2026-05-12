import { use, useState } from "react";

const FiltradoCanciones = ({ canciones }) => {
    /**
     * artista -> guarda lo escrito
     * setArtista() -> cambia el valor
     */
    const [artista, setArtista] = useState("")
    const cancionesFiltradas = canciones.filter((cancion) =>
        cancion.track_artist.toLowerCase().includes(artista.toLowerCase())
    )

    return (
        <div>
            <h2>Buscar canciones por artista</h2>

            <input type="text" placeholder="Escriba artista" onChange={(e) => setArtista(e.target.value)}/>
        
            <ul>
                {cancionesFiltradas.map((cancion) => (
                    <li key={cancion.track_id}>
                        {cancion.track_name}
                    </li>
                ))}
            </ul>
        
        </div>
    )
}

export default FiltradoCanciones