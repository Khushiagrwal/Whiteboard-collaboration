import React from 'react'
import Home from "../components/Home"
import {BrowserRouter as  Router,Routes,Route } from "react-router-dom"
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'
import Header from '../components/Header'
import Footer from '../components/Footer'

function App() 
{
  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Signin' element={<Signin/>}/>
      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App