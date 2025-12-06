// Variables
var numero1
var literal1, litreal2
var numero3 = 8
numero1 = 24
numero1 += 3

// typeof, devuelve el tipo de expresion 
typeof "abc" // string(primitivo)
typeof String("abc") // string
typeof new String("abc") // object
typeof (new String("abc")).valueOf() // string

var longuitud = 10
longuitud = "10"

let animal = "Aguila" // String
let numPatas = 2 // Number
console.log (animal + numPatas) // Muestra Aguila2

// LITERALES
const libs = ["React", "Vue", "Angular"]
console.log(`Este curso trata de ${libs[1]}`)

let autenticado = false
const estado = autenticado ? "Bienvenido" : "Por favor, inicia sesion"
// Funciona como un if-else en una misma linea, si es true --> bienvenido
// si no --> Por favor, inicia sesion
console.log(estado)

let apellido = "Mario"
const alias = apellido ?? "Anonimo"
// Operador de coalescencia nula permite asignar un valor a una variable
// si otra variable es nula o undefined
console.log(alias)

// Comparar cadenas y toLowerCase
if ("JavaScript".toLowerCase() == "javascript".toLowerCase()){}

// Variable nula
let persona
if(persona != null){}
if(persona){}

if(window.Worker){
    alert("Este navegador soporta web Workers")
} else{
    alert("Navegador viejo")
}
