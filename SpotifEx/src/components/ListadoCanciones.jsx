const ListadoCanciones = ({ canciones }) => { // Recibe datos desde el padre props
    
    return (
        <div>
            <h2>Listado de Canciones</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>Id pista</th>
                        <th>Nombre</th>
                        <th>Artista</th>
                        <th>Album</th>
                        <th>Duracion</th>
                    </tr>
                </thead>

                <tbody>
                    {canciones.map((cancion) => ( // recorrre el array
                        <tr key={cancion.track_id}> {/** fila unica que se identifica con el id  */}
                            <td>{cancion.track_id}</td>
                            <td>{cancion.track_name}</td>
                            <td>{cancion.track_artist}</td>
                            <td>{cancion.track_album_name}</td>
                            <td>{parseInt(cancion.duration_ms / 1000)}</td> {/** para redondear 'parseInt', dividir entre 1000 pq esta en milisegundos */}           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListadoCanciones