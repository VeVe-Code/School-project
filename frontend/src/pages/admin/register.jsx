
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
    let [name, setName] = useState('') 
     let [email, setEmail] = useState('') 
      let [password, setPassword] = useState('') 
      let navigate = useNavigate()
      let [error, setError] = useState(null)

      let createnewadmin = async(e) => {
       try{ 
        e.preventDefault()
        setError(null)
        let data = {
            name,
            email,
            password
        }


        let res = await axios.post("http://localhost:4000/api/admins/register",data,{
            withCredentials:true
        })
        if(res.status === 200){
            navigate('/admin/login')
        }}catch(e){
           setError(e.response.data.errors)
        }
      }

  return (
    <div>
       
      <form className="max-w-sm mx-auto mt-36" onSubmit={createnewadmin}>
         <h1 className=' text-center text-2xl font-bold'>Register Form</h1>
        <div className="mb-5 mt-3">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your Name
          </label>
          <input
          value={name}
         onChange={e => setName(e.target.value)}
            type="text"
            id="name"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                       dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="Name"
            
          />
   { !!(error && error.name)  &&     <h1 className='text-red-600 text-sm'>name {error.name.msg}</h1>}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
           value={email}
         onChange={e => setEmail(e.target.value)}
            type="email"
            id="email"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                       dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="name@gmail.com"
          
          />
             { !!(error && error.email)  &&     <h1 className='text-red-600 text-sm'> {error.email.msg}</h1>}
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
           value={password}
         onChange={e => setPassword(e.target.value)}
            type="password"
            id="password"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                       dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
    
          />
              { !!(error && error.password)  &&     <h1 className='text-red-600 text-sm'>password {error.password.msg}</h1>}
        </div>

        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300
                         dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800
                         dark:focus:ring-offset-gray-800"
    
            />
               
            
          </div>
          <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                     focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                     dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </button>
      </form>
    </div>
  )
}

export default Register
