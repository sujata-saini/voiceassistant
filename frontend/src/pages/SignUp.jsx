
import React from 'react'
import bg from "../assets/authBg.png"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'

function SignUp() {

    const [showPassword,setShowPassword]=useState(false)

    const {serverUrl, userData,setUserData}=useContext(userDataContext)
    const navigate =useNavigate()
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
        const[loading,setLoading]=useState(false)
    
    const[password,setPassword]=useState("")
    const [err,setErr]=useState()

    // to fetch api

    const handleSignUp=async(e)=>{

        e.preventDefault()
        setErr("")
        setLoading(true)
        try{

            let result =await axios.post(`${serverUrl}/api/auth/signup`,{
                name, email,password
            }, {withCredentials:true})
            // console.log(result.data)
            setUserData(result.data)
            setLoading(false)
            navigate("/customize")
        }
        catch(error){
console.log(error)
setUserData(null)
            setLoading(false)

setErr(error.response.data.message)
        }
        
    }
  return (
    <div
      className="w-full h-[100vh] bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Glass Effect Form */}
      <form className="w-[90%] max-w-[400px] bg-[#00000062] backdrop-blur-lg shadow-2xl shadow-black rounded-2xl p-8 
      flex flex-col items-center gap-6" onSubmit={handleSignUp}>
        
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-white text-center">
          Register to{" "}
          <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        {/* Input Fields */}
        <input
          type="text"
          placeholder="Enter your Name"
          className="w-full px-4 py-3 rounded-full bg-transparent border border-white/40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required onChange={(e)=>setName(e.target.value)} value={name} />

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-full bg-transparent border border-white/40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
       required onChange={(e)=>setEmail(e.target.value)} value={email} 
       />

         <div className="w-full relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-full bg-transparent border border-white/40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          
            required onChange={(e)=>setPassword(e.target.value)} value={password} 
          />
          <span
            className="w-[25px] h-[25px] absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

{err && err.length > 0 && (
  <p className="text-red-500 text-[17px]">*{err}</p>
)}
        {/* Button */}
        <button
          type="submit"
          className="w-[150px] py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all"
       disabled={loading} >
         {loading?"Loading...":"Sign Up"} 
        </button>

        {/* Link */}
        <p className="text-gray-300 text-sm cursor-pointer" onClick={( )=>navigate("/signin")}>
          Already have an account?{" "}
          <a href="/signin" className="text-blue-400 hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  )
}

export default SignUp
