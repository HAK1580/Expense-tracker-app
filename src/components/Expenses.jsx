import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
const Expenses = ({ balance, setBalance, setSpent, spent }) => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const onSubmit = (data => {
    myexpenses.push(data);
    console.log(myexpenses);
    setSpent((spent + Number(data.price)));
    setBalance(balance - Number(data.price));
    setPopup(false);
    reset();

  })

  const [myexpenses, setMyexpenses] = useState([
    //   {
    //   "name": "Groseries",
    //   "cateogory": "food",
    //   "price": "850"
    // },

  ]);



  const [popup, setPopup] = useState(false);


  return (
    <div className="div ">

      <div className='mobile-version md:hidden'  >
        <h1 className='font-semibold ' >Recent Expenses</h1>
        {myexpenses.map((e) => {

          return (


            <div className="expense-box  border rounded p-2 border-gray-400 my-2 flex justify-between items-center ">

              <div className="name-date flex flex-col">
                <h1 className='font-bold capitalize ' >{e.name}</h1>
                <h2 className='text-sm text-gray-500  capitalize' >{e.cateogory}</h2>
              </div>

              <div className="expense-price">
                <h1 className='font-bold mx-2'>-Rs {e.price} </h1>
              </div>

            </div>

          )
        })}

        <div className={`no-recent-expenses my-5 flex justify-center items-center ${spent == 0 ? "block" : "hidden"} `}>
          <h1 className=" italic  font-semibold text-gray-400  ">No recent expenses</h1>
        </div>



        {/* now the button to add the expenses  */}
        <button onClick={() => setPopup(!popup)} className='bg-black p-3 my-10 rounded-xl font-semibold w-full text-white '> + Add Expense</button>
        {/* make the pop up window  */}

        <div className={`add-expense-popup ${popup ? "block" : "hidden"} md:hidden  fixed flex justify-center items-center inset-0  `}>
          <div className="popup-box bg-white border p-4 border-gray-600 rounded-2xl min-h-130 w-[90%] mx-auto ">
            <div className="add-expense-cross-sign my-2 flex justify-between items-center">
              <h1 className=' font-bold' >Add expense</h1>
              <img onClick={() => setPopup(false)} src="cross.svg" alt="no img" className='mx-2 cursor-pointer w-5' />
            </div>

            <div className="expense-info-box  p-2">
              <form onSubmit={handleSubmit(onSubmit)}>

                <div className="amount my-8 flex   justify-between items-center  ">
                  <h1 className='text-lg text-gray-700' > Amount &nbsp; :  </h1>
                  <label className='text-xl text-gray-400 flex justify-center items-center  ' htmlFor="">Rs </label>
                  <input {...register("price", { required: "Enter amount" })} className='text-gray-700 font-semibold border border-gray-300 rounded text-2xl w-[50%] px-3   flex items-center justify-center' placeholder='0' type="number" />

                </div>
                <div className="amount my-8 flex   justify-between items-center  ">
                  <h1 className='text-lg text-gray-700' > What's it for   </h1>
                  <input {...register("name", { required: "Field is required" })} className='text-gray-700 capitalize  border border-gray-300 rounded text-lg w-[60%]    flex items-center justify-center px-2 py-1' placeholder='food, ride, transport... ' type="text" />
                </div>

                <div className="amount my-8 flex   justify-between items-center  ">
                  <h1 className='text-lg text-gray-700' > Category  &nbsp;: </h1>
                  <select {...register("cateogory")} className=' text-lg border  mx-2 border-gray-300 px-3 py-1 rounded  ' >
                    <option className='text-sm  ' value="food">Food</option>
                    <option className='text-sm' value="transport">Transport</option>
                    <option className='text-sm' value="bills">Bills</option>
                    <option className='text-sm' value="others">Others</option>

                  </select>
                </div>
                {errors.name && <p className="text-red-500 font-semibold text-lg">{errors.name.message}</p>}
                {errors.price && <p className="text-red-500 font-semibold text-lg">{errors.price.message}</p>}
                <button type='submit' className='bg-black p-3 mt-10 rounded-xl font-semibold w-full text-white '> Save expense</button>

              </form>

            </div>
          </div>
        </div>



      </div>
      {/* // make the desktop veriosn of expense well done mobile is done  */}
      <div className="dektop-version hidden md:block ">
        <div className="expense-box flex gap-20 ">
          <div className="add-expenses rounded bg-gray-200/45 border border-gray-300 min-h-80 w-[30%]">
            <h1 className='font-bold text-lg  p-2 '>Add expense</h1>
            <form className='flex flex-col gap-5 justify-cente' onSubmit={handleSubmit(onSubmit)}>
              <input {...register("name", { required: "Title can not be empty" })} placeholder='Title' className='border mt-6 p-2 capitalize  bg-gray-100 border-gray-400 rounded  mx-auto w-[90%]' type="text" />
              <input   {...register("price", { required: "Amount can not be empty", pattern: { value: /^\d+$/, message: "Enter vaid amount" } })} placeholder='Amount' className='border p-2 capitalize bg-gray-100 border-gray-400 rounded mx-auto w-[90%]' type="text" />
              <select  {...register("category")} className='border cursor-pointer p-2 capitalize  bg-gray-100 border-gray-400 rounded  mx-auto w-[90%]' type="text">

                <option value={"category"} className='text-sm'>Category</option>

                <option className='text-sm' value={"food"}>Food</option>
                <option className='text-sm' value={"transport"}>Transport</option>
                <option className='text-sm' value={"bills"}>Bills</option>
                <option className='text-sm' value={"others"}>Others</option>

              </select>

              {errors.name && <p className="text-red-500 px-7 font-semibold  text-sm">{errors.name.message}</p>}
              {errors.price && <p className="text-red-500 my-[-0.5rem] px-7 font-semibold  text-sm">{errors.price.message}</p>}


              <button type='submit' className='bg-black p-3 cursor-pointer my-10 rounded-xl font-semibold mx-auto w-[90%] text-white '> + Add Expense</button>
            </form>

          </div>

          <div className="recent-expenses   border-gray-300/50 rounded border bg-gray-100/50 p-2  w-[70%]">
            <h1 className='font-bold p-2 text-lg '>Recent expenses</h1>
            {myexpenses.map((e) => {

              return (


                <div className="expense-box   border rounded px-2 py-3 border-gray-400 my-2 flex justify-between items-center ">

                  <div className="name-date flex flex-col">
                    <h1 className='font-bold capitalize ' >{e.name}</h1>
                    <h2 className='text-sm text-gray-500  capitalize' >{e.category}</h2>
                  </div>

                  <div className="expense-price">
                    <h1 className='font-bold mx-2'>-Rs {e.price} </h1>
                  </div>

                </div>

              )
            })}

            <div className={`no-recent-expenses my-25 flex justify-center items-center ${spent == 0 ? "block" : "hidden"} `}>
              <h1 className=" italic  font-semibold text-gray-400  ">No recent expenses</h1>
            </div>
          </div>
        </div>




      </div>
    </div>


  )
}

export default Expenses
