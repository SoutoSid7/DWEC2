const Boton = () => {
    // Crea el estado hsl(0, 50%, 50%) -> rojo
    const [color, setColor] = React.useState("hsl(0, 50%, 50%)")
    // Se extrae la funcion del handler

    /*
        Genera un numero aleatorio entre 0 y 360
        Cambia el color usando HSL
        Renderiza el boton con el nuevo color
        Cada Click = Color Nuevo
    */
    const handleClick = () => {
        setColor(`hsl(${Math.random() * 360}, 80%, 50%)`)
    }

    return React.createElement(
        "button",
        {
            onClick: handleClick, // cuando hace click ejecuta la funcion handleClick
            style: {
                backgroundColor: color,
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
            },
        },
        "Cambia El Color"
    )
}

const nodoRaiz = document.getElementById('boton') // Busca en el HTML un elemento con id="boton"
const raiz = ReactDOM.createRoot(nodoRaiz) // Este es el lugar donde vas a pintar la app
const boton = React.createElement(Boton) // Estás creando una instancia del componente Boton
/*
    1. Toma el componente Boton
    2. Lo convierte en elementos reales (DOM)
    3. Lo inserta dentro del <div id="boton">
*/
raiz.render(boton)