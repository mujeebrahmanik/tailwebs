import React, { useState,useContext } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../AuthProvider'
import { Link } from 'react-router-dom'

const Login = () => {
    const [username,setUsername]=useState()
    const [password,setPassword]=useState()
    const [success,setSuccess]=useState(false)
    const [error,setError]=useState()
    const [loading,setLoading]=useState(false)
    const {isLoggedIn,setIsLoggedIn}=useContext(AuthContext)
    const navigate=useNavigate()




    const handleSubmit=async(e)=>{
        setLoading(true)
        e.preventDefault()
        try {
            const response=await axios.post('http://127.0.0.1:8000/login',{username,password})
            localStorage.setItem('accessToken',response.data.access)
            localStorage.setItem('refreshToken',response.data.refresh)
            setIsLoggedIn(true)
            navigate("/dashboard")
            setSuccess(true)
            setError('')

        } catch (error) {
            setError(error.response.data.error)
            setSuccess(false)

        }
        finally{
            setLoading(false)
        }

    }
  return (
    <> 
        <div className="container">
            <div className="d-flex flex-column align-items-center justify-content-center vh-100">
                            

                <div className="col-md-4 p-5" id='login-section'>
                    <h3 className='fw-bold text-center mb-4'>Teacher Login</h3>
                    <h6 className='text-danger text-center my-3'>{error}</h6>
                    {success && <h6 className='text-success text-center my-3'>Loggined successfully</h6>}
                    <form action="" method="post" onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="" className='fw-bold'>Username</label>
                            <input type="text" className='form-control my-2 rounded-0' placeholder='Enter your username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="" className='fw-bold'>Password</label>
                            <input type="password" className='form-control my-2 rounded-0' placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
        
                        {loading ? (
                            <button type="submit" className='btn btn-dark form-control rounded-0' disabled><FontAwesomeIcon icon={faSpinner} className="me-2" />Logging in...</button>
                        ):(
                            <button type="submit" className='btn btn-dark form-control rounded-0'>Login</button>
                        )}
                        
                    </form>

                </div>
                  <Link className='text-primary mt-4' to='/register' style={{textDecoration:'none'}}><h5>Register New Teacher ?</h5></Link>

            </div>
        </div>
    </>
  )
}

export default Login