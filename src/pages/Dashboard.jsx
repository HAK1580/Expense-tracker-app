import React, { useEffectEvent } from 'react'
import Navbar from '../components/Navbar'
import Balance from '../components/Balance'
import { useState,useEffect } from 'react'
import Expenses from '../components/Expenses'

const Dashboard = ({balance,setBalance,spent,setSpent}) => {
  return (
    <div className='p-5 relative bg-slate-50'>
      <Navbar />
      <Balance spent={spent} setSpent={setSpent}  balance={balance} setBalance={setBalance} />
      <Expenses spent={spent} setSpent={setSpent}  balance={balance} setBalance={setBalance}  />
    </div>  
  )
}

export default Dashboard