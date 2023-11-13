import { useState } from 'react'

import './App.css'
import AdresseForm from './composants/AdresseForm'

function App() {
  const [adresse, setAdresse] = useState<string>('')
  const handleChangeAdresse = (newAdresse: string) => {
    setAdresse(newAdresse) 
    console.log(adresse)
  }
   return (
    <>
     <AdresseForm adresse={adresse} onAdresseChange={handleChangeAdresse} />
    </>
  )
}

export default App
