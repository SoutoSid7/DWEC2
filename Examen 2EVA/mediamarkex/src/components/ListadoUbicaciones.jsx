const ListadoUbicaciones = ({ electrodomesticos }) => {
    return (
        <div>
            <h2>Listado de Electrodomesticos</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>Id Ubicacion</th>
                        <th>Codigo de Estado</th>
                        <th>Ubicacion</th> {/* City (State_Name) */}
                        <th>Codigo Postal</th>
                        <th>Media</th>
                        <th>Num Electrodomesticos</th>
                    </tr>
                </thead>

                <tbody>
                    {electrodomesticos.map((electrodomestico) => (
                        <tr key={electrodomestico.id}>
                            <td>{electrodomestico.id}</td>  
                            <td>{electrodomestico.State_Code}</td> 
                            <td>{electrodomestico.City} ({electrodomestico.State_Name})</td> {/* City (State_Name) */}
                            <td>{electrodomestico.Zip_Code}</td> 
                            <td>{electrodomestico.Mean}</td> 
                            <td>{electrodomestico.sum_w}</td> 
                        </tr>   
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListadoUbicaciones