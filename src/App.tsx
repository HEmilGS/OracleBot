import { useState } from 'react'
import SideBar from './Components/SideBar'
import Header from './Components/header'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' necesario despues para el header


import './App.css'

function App() {
  return (
    <div className="flex bg-[#]">
      <SideBar />
      <div className="w-4/5">
        <Header />
      </div>
    </div>
  )
}


export default App
