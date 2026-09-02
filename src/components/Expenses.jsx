import React, { useEffect, useState } from 'react';
import { useForm, } from 'react-hook-form';
import axios from 'axios';
const Expenses = ({ balance, setBalance, setSpent, spent }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [myexpenses, setMyexpenses] = useState([]);
  const [popup, setPopup] = useState(false);
  // show the expenses from the live db 

  async function saved_expenses() {
    const response = await fetch("http://localhost:3000/api/expenses");
    const data = await response.json();
    setMyexpenses(data);


  }

  useEffect(() => {
    saved_expenses();



  }, [])

  async function handleDelete(_id) {
    const response = await axios.delete(`http://localhost:3000/api/expenses/${_id}`);
    console.log(response.data);
    setMyexpenses(prev => prev.filter((expense) => expense._id !== _id))

  }
  async function handleEdit(_id) {
    const response = await axios.put(`http://localhost:3000/api/expenses/${_id}`, { name: "Updated Name", price: 100, category: "Updated Category" });
     console.log(response.data);
     setMyexpenses(prev => prev.map((expense) => expense._id === _id ? response.data : expense))
  
  }


  // setMyexpenses((prev) => [...prev, data]);
  const onSubmit = async (data) => {
    const response = await axios.post('http://localhost:3000/api/expenses', data)
    console.log("Api sent data : ", response.data)
    setMyexpenses(prev => [...prev, response.data]);


    setSpent(spent + Number(data.price));
    setBalance(balance - Number(data.price));
    setPopup(false);
    console.log("Local Expenses", myexpenses);
    reset();
  };
  const handleEnterAsNext = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
};

  return (
    <div className="w-full">
      {/* MOBILE VERSION */}
      <div className="mobile-version  block md:hidden p-2 overflow-auto">
        <h1 className="font-semibold text-xl mb-4">Recent Expenses</h1>

        {myexpenses.map((e, index) => (

          <div
            key={index}
            className="expense-box border rounded-xl p-3 border-gray-200 bg-white  shadow-sm my-2 flex justify-between items-center"
          >
            <div className="name-date flex flex-col">
              <h1 className="font-bold capitalize text-gray-800">{e.name}</h1>
              <h2 className="text-xs text-gray-500 capitalize">{e.category}</h2>
            </div>
            <div className="expense-price-delete-btn   flex gap-4 items-center">
              <div className="delete-edit-btns flex gap-1.5 items-center ">
                <img onClick={() => handleDelete(e._id)} className='w-4 cursor-pointer' src="public\delete.png" alt="" />
                <img className='w-4 cursor-pointer' src="public\draw.png" alt="" />
              </div>
              <h1 className="font-bold text-red-600 text-base">-Rs {e.price}</h1>
            </div>
          </div>
        ))}

        {myexpenses.length === 0 && (
          <div className="no-recent-expenses my-10 flex justify-center items-center">
            <h1 className="italic font-semibold text-gray-400">No recent expenses</h1>
          </div>
        )}

        {/* Trigger Button */}
        <button
          onClick={() => setPopup(true)}
          className="bg-black py-3.5 my-6 rounded-xl font-semibold w-full text-white shadow-md active:scale-95 transition-transform"
        >
          + Add Expense
        </button>

        {/* MOBILE POPUP MODAL */}
        {popup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="popup-box bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl transform transition-all">
              {/* Header */}
              <div className="add-expense-cross-sign pb-3 border-b border-gray-100 flex justify-between items-center">
                <h1 className="font-bold text-xl text-gray-800">Add Expense</h1>
                <button
                  type="button"
                  onClick={() => setPopup(false)}
                  className="text-gray-400 hover:text-black font-bold text-xl px-2"
                >
                  ✕
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4 md:hidden flex flex-col gap-4">
                {/* Title Input */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">What's it for?</label>
                  <input onKeyDown={handleEnterAsNext}   autoComplete="off" 

                    {...register("name", {
                      required: "Expense title is required",
                      pattern: {
                        value: /^(?:.*[a-zA-Z]){3,}.*$/,
                        message: "Enter a valid name",
                      },
                    })}
                    className="w-full text-gray-800 border border-gray-300 rounded-lg p-3 text-base outline-none focus:border-black focus:ring-1 focus:ring-black"
                    placeholder="e.g. Grocery, Petrol, Lunch"
                    type="text"
                  />
                  {errors.name && (
                    <p className="text-red-500 font-medium text-xs mt-0.5">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Amount Input */}
                <div  className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Amount (Rs)</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-400 font-medium text-base">
                      Rs
                    </span>
                    <input onKeyDown={handleEnterAsNext}   autoComplete="off" 

                      {...register("price", {

                        pattern: {
                          value: /^\d+$/,
                          message: "Enter a valid amount",
                        },
                      })}
                      className="w-full pl-10 pr-3 py-3 text-gray-800 border border-gray-300 rounded-lg text-base font-semibold outline-none focus:border-black focus:ring-1 focus:ring-black"
                      placeholder={0}
                      type="number"
                    />
                  </div>
                  {errors.price && (
                    <p className="text-red-500 font-medium text-xs mt-0.5">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                {/* Category Dropdown */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Category</label>
                  <select
                    {...register("category")}
                    className="w-full text-gray-800 border border-gray-300 bg-white rounded-lg p-3 text-base outline-none focus:border-black focus:ring-1 focus:ring-black"
                  >
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="bills">Bills</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  className="bg-black py-3.5 mt-4 rounded-xl font-semibold w-full text-white shadow-md active:scale-95 transition-transform"
                >
                  Save Expense
                </button>


              </form>
            </div>
          </div>
        )}
      </div>

      {/* DESKTOP VERSION */}
      <div className="desktop-version hidden md:block p-6">
        <div className="expense-box flex gap-8">
          {/* Add Form */}
          <div className="add-expenses rounded-xl bg-gray-50 border border-gray-200 p-4 w-[35%]">
            <h1 className="font-bold text-lg mb-4">Add Expense</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("name", {
                  required: "Title cannot be empty",
                  pattern: {
                    value: /^(?:.*[a-zA-Z]){3,}.*$/,
                    message: "Enter a valid expense name",
                  },
                })}
                placeholder="Title"
                className="border p-2.5 bg-white border-gray-300 rounded-lg text-sm w-full outline-none focus:border-black"
                type="text"
              />
              {errors.name && (
                <p className="text-red-500 text-xs font-semibold">{errors.name.message}</p>
              )}

              <input
                {...register("price", {
                  required: "Amount cannot be  empty",
                  pattern: {
                    value: /^\d+$/,
                    message: "Enter a valid amount",
                  },
                })}
                placeholder="Amount"
                className="border p-2.5 bg-white border-gray-300 rounded-lg text-sm w-full outline-none focus:border-black"
                type="number"
              />
              {errors.price && (
                <p className="text-red-500 text-xs font-semibold">{errors.price.message}</p>
              )}

              <select
                {...register("category")}
                className="border p-2.5 bg-white border-gray-300 rounded-lg text-sm w-full outline-none focus:border-black cursor-pointer"
              >
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="bills">Bills</option>
                <option value="others">Others</option>
              </select>

              <button
                type="submit"
                className="bg-black p-3 mt-4 rounded-xl font-semibold w-full text-white hover:bg-gray-800 transition-colors"
              >
                + Add Expense
              </button>
            </form>
          </div>

          {/* Expenses List */}
          <div className="recent-expenses border-gray-200 rounded-xl border bg-gray-50 p-4 w-[65%]">
            <h1 className="font-bold text-lg mb-4">Recent Expenses</h1>
            {myexpenses.map((e, idx) => (
              <div
                key={idx}
                className="expense-box border bg-white rounded-lg px-4 py-3 border-gray-200 my-2 flex justify-between items-center"
              >
                <div className="name-date flex flex-col">
                  <h1 className="font-bold capitalize text-gray-800">{e.name}</h1>
                  <h2 className="text-xs text-gray-500 capitalize">{e.category}</h2>
                </div>
                <div className="expense-price-delete-btn   flex gap-6 items-center">
                  <div className="delete-edit-btns flex gap-2 items-center ">
                    <img onClick={() => handleDelete(e._id)} className='w-4 cursor-pointer' src="public\delete.png" alt="" />
                    <img onClick={() => handleEdit(e._id)} className='w-5 cursor-pointer' src="public\draw.png" alt="" />
                  </div>
                  <h1 className="font-bold text-red-600 text-base">-Rs {e.price}</h1>
                </div>


              </div>
            ))}

            {myexpenses.length === 0 && (
              <div className="no-recent-expenses my-20 flex justify-center items-center">
                <h1 className="italic font-semibold text-gray-400">No recent expenses</h1>
              </div>
            )}
          </div>
        </div>
      </div>



    </div>


  );
};

export default Expenses;


