import React from 'react'
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import "bootstrap/dist/css/bootstrap.min.css"
import MiniDrawer from './pages/dashboard/dashboard'
function App() {
  return (
    <BrowserRouter>
  
    <Routes>
      <Route path='/' element={<MiniDrawer/>}/>     
    </Routes>
    </BrowserRouter>
  )
}

export default App