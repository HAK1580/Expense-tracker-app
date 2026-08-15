import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar-container md:p-5  p-2">
        
          <ul className="flex  justify-between items-center">
            <div className="left-text flex flex-col">
           <li className="text-sm md:text-lg" >Welcome back </li>
           <li className="font-bold text-lg md:text-2xl" >Ali Official </li>
        </div>
          <div className="right-text mx-2">
            <div className="rounded-full md:p-4 p-2 bg-blue-300 border border-gray-300">
                 AO
            </div>
          </div>


          </ul>
  
      </div>
  )
}

export default Navbar