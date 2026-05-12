const MasPopular = ({ canciones }) => {
    // Comprueba si todavia no hay canciones cargadas
    if (canciones.length === 0){
        return <p>Cargando cancion mas popular</p>
    }

    /**
     * reduce -> recorre el array y quedarse con un unico resultado
     * cancion.popularity > max.popularity ? cancion : max -> quedarse con la cancion con mayor popularity
     */
    const masPopular = canciones.reduce((max, cancion) => 
        cancion.track_popularity > max.track_popularity ? cancion : max
    )

    return (
        <div>
            <h2>Cancion mas popular</h2>
            <p>Nombre: {masPopular.track_name}</p>
            <p>Artista: {masPopular.track_artist}</p>
            <p>Popularidad: {masPopular.track_popularity}</p>
        </div>
    )
}

export default MasPopular