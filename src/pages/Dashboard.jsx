import React, { useEffectEvent } from 'react'
import Navbar from '../components/Navbar'
import Balance from '../components/Balance'
import { useState,useEffect } from 'react'
const Dashboard = ({balance,setBalance,spent,setSpent}) => {


  return (
    <div className='p-5'>
      <Navbar />
      <Balance spent={spent} setSpent={setSpent}  balance={balance} setBalance={setBalance} />
    </div>  
  )
}

export default Dashboard