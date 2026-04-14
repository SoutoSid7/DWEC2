import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

/* Importar prueba HolaMundo.jsx*/
import HolaMundo, { AdiosMundo } from "./components/HolaMundo";
import Bucles from "./components/Bucles";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HolaMundo />
      <AdiosMundo />
      <Bucles />
    </>
  )
}

export default App
