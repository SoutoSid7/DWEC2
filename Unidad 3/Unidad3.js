// Funciones Predeterminadas
eval("x=50; y=30; document.write(x*y)") // Muestra 1500
document.write("<br>", eval("8+6")) // Muestra 14
document.write("<br>", eval(x+30)) // Muestra 80

// Formateando Logs
let t = 2
console.log({t})

// Funciones
function doblar(a){
    return a * 2
}

// Funciones Arrow
const sumar = (a,b) => a + b
const factorial = a => {
    if(a <= 1){
        return 1
    }
    return a * factorial(a -1)
}

console.log("doblar", doblar(2))
console.log("sumar", sumar(1,2))
console.log("factorial", factorial(4))

// Valores por defecto
function saludar(nombre = "Desconocido"){
    return `Hola ${nombre}`
}
console.log(saludar())

function test(x, y){
    x = x || 0 // valor por defecto 0
    y = y || true // valor por defecto true
}

// Ejemplo
function prueba1() {
    let valor = prompt("Introduce la contraseña")
    if(valor == "Hola123"){
        alert("La contraseña es correcta")
    } else {
        alert("Contraseña incorrecta")
    }
}

// Arrays
numArray = new Array (0, 1, 2, 3, 4)
numArray.length // Devuelve 5

let coches = new Array()
coches[0] = "Porsche"
coches[1] = "Mercedes"
coches[2] = "Bmw"

colores = ["rojo", "verde", "azul"]

let ejemplo = [0,1,2,3]
console.log(ejemplo.join(" - - ")) // Construye una cadena con cada elemento separados por esos caracteres

// Sort
let frutas = ["Naranja", "Pera", "Manzana", "Uva"]
function compararFrutas(f1, f2){
    if(f1.length > f2.length){
        return 1
    } else if(f1.length < f2.length){
        return -1
    } else { 
        return 0
    }
}
frutas.sort(compararFrutas)
console.log(frutas)

// Arrays Multidimensionales
let dimesion1 = ["00", "01", "02"]
let dimesion2 = ["03", "04"]
let matriz2d = [dimesion1, dimesion2]
console.log(matriz2d[1][1])

// Filtrado
let num = [1, 2, 3, 5, 3, 6, 3];
function encontrar(elto, matriz) {
    let encontrados = [];   // Guarda posiciones encontradas
    let pos = matriz.indexOf(elto);  // Primera búsqueda

    while (pos != -1) {
        encontrados.push(pos); // Guardar posición encontrada
        pos = matriz.indexOf(elto, pos + 1); // Seguir búsqueda desde la siguiente posición
    }
    return encontrados; // Devolver posiciones
}
console.log(encontrar(3, num)); // 👉 [2, 4, 6]

// HashTables (se referencian mediante una clave)
let myData = [];
// Agregamos datos al arreglo: cada elemento es un arreglo con [nombre, ventas]
myData.push(["The Beatles", "248.3"]);
myData.push(["Elvis Presley", "201.2"]);
myData.push(["Michael Jackson", "155.8"]);

// Artista que queremos buscar en la lista
let artist = "Elvis Presley";

// Recorremos todo el arreglo myData usando un bucle for
for (var i = 0; i < myData.length; i++) {
    // myData[i][0] representa el nombre del artista en la posición i
    // Comparamos si el artista actual es el que buscamos
    if (myData[i][0] == artist) {
        // Si coincide, mostramos sus ventas (myData[i][1])
        console.log("Ventas de " + artist + " es " + myData[i][1]);
    }
}
