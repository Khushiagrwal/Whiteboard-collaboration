import React from 'react'
import Home from "../components/Home"
import {BrowserRouter as  Router,Routes,Route } from "react-router-dom"
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'
import Whiteboard from "../components/Whiteboard"
import JoinRoom from '../components/JoinRoom'

function App() 
{
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Signin' element={<Signin/>}/>
        <Route path='/whiteboard' element={<Whiteboard/>}/>
        <Route path='/joinroom' element={<JoinRoom/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App