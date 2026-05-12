import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import HeaderComponent from './components/HeaderComponent'
import ButtonComponent from './components/ButtonComponent'
import Login from './components/Login'
import MovieList from './components/MovieList'
import MemeList from './components/MemeList'

function App() {
  // let number = 0;

  /*
  * number -> nombre variable
  * useState  -> variables reactivas
  * setNumber -> modificar la variable reactiva
  */ 
  const [number, setNumber] = useState(0)
  const [myValue, setMyValue] = useState("") // El valor no se escribe en el input
  let myPlaceHolder = "Escribe aqui"; // Variable que se puede usar en atributos
  
  const [greetings, setGreetings] = useState("Bienvenidos a mi web")
  const links = {
    home: "Home",
    blog: "Blog",
    news: "News",
    contact: "Contact us"
  }

  const [user, setUser] = useState({})

  const login = (userInfo) => {
    console.log(userInfo);
    setUser(userInfo) 
  }

  const condition = true

  {/*
    const addOne = () => {
      // number++;
      setNumber(number + 1) 
      console.log(number);
    }

    const handleChange = (e) => {
      console.log(e.target.value); // target.value muestra lo que el usuario escribe
    }

    const sayHello = () => {
      console.log("Hello!!");
    }
    */}

  return (
    <> 
      <HeaderComponent greetings={greetings} links={links} ></HeaderComponent>

      <main className='main-content'>
        <MemeList></MemeList>
        {/* <h2 onClick={sayHello()}>Hola {user.username}</h2>   onclick cuado se hace clic */}
        
        {user.username && <h2>Hola {user.username}</h2>} {/** Render condicional */}

        <Login handleLogin={login}></Login>

        {condition && <h2>La condicion se cumple</h2>}
        {!condition && <h2>La condicion NO se cumple</h2>}

        {/** Operadores Ternarios */}
        { condition ? (
          <h2>La condicion se cumple</h2>
        ) : (
          <h2>La condicion no se cumple</h2>
        )}

        <MovieList></MovieList>

        {/*
          <h2 onClick={addOne}>Numero: {number}</h2>

          <input value={myValue} placeholder={myPlaceHolder} type='text' onChange={handleChange}></input>
          <br></br>
          <br></br>
          <ButtonComponent></ButtonComponent>
        */}
      </main>
    </>
  )
}

export default App
