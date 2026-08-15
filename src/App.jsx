import React from 'react'
import Navbar from './components/Navbar'
import {Route,Routes} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Balance from './components/Balance'
import { useState } from 'react'

function App() {

 const [balance,setBalance]=useState(25000);
 const [spent,setSpent]=useState(0);
 


  return (
    <div  >
     <Routes>
      <Route path="/" element= {<Login />}   />
      <Route path="/balance" element= {<Balance balance={balance} setBalance={setBalance} spent={spent} setSpent={setSpent} />}   />
      <Route path="/dashboard" element= {<Dashboard balance={balance} setBalance={setBalance} spent={spent} setSpent={setSpent} />}   />
    
    
     </Routes>
      
    </div>
  )
}

export default App