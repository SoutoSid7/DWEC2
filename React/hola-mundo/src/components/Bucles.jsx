const Bucles = () => {
    /*Array personajes*/
    const personajes = [
        {nombre: "Seong Gi-hun", edad: 52},
        {nombre: "Hwang Jun-ho", edad: 33},
        {nombre: "Hwang Front-man", edad: 54}
    ]
    return(
        <>
            <h1>Personajes</h1>
            <ul>
                { /*Permite meter JS*/
                    personajes.map((p) => // Se recorre personajes con map
                        <li key={p.nombre}>
                            <b>{p.nombre}</b>: {p.edad} años
                        </li>
                        )
                        // key={p.nombre} key unica para identificar cada elemento
                }
            </ul>
        </>
    )
}
export default Bucles