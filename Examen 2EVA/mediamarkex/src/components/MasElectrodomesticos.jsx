const MasElectrodomesticos = ({ electrodomesticos }) => {
    if (electrodomesticos.length === 0){
        return <p>Cargando electrodomestico mas popular</p>
    }
    
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