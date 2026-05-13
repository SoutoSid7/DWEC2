const MasElectrodomesticos = ({ electrodomesticos }) => {
    if (electrodomesticos.length === 0){
        return <p>Cargando electrodomestico mas popular</p>
    }

    /**
     * reduce -> recorre el array y quedarse con un unico resultado
     * cancion.popularity > max.popularity ? cancion : max -> quedarse con la cancion con mayor popularity
     */
    const MasElectrodomesticos = electrodomesticos.reduce((max, electrodomestico) => 
        electrodomestico.sum_w > max.sum_w ? electrodomestico : max
    )

    return (
        <div>
            <h2>Ciudad Con Mas Electrodomesticos</h2>
            <p>Ciudad: {MasElectrodomesticos.City}</p>
            <p>Num Electrodomesticos: {MasElectrodomesticos.sum_w}</p>
        </div>
    )
}

export default MasElectrodomesticos