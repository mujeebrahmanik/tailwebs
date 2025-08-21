import axios from 'axios'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Register = () => {
    const [formData,setFormData]=useState({
        username:'',email:'',password:''
    })
    const [error,setError]=useState({})
    const [success,setSuccess]=useState(false)
    const [loading,setLoading]=useState(false)

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true)
        try {
            const response=await axios.post('http://127.0.0.1:8000/register',formData)
            setSuccess(true)
            setTimeout(()=>{
                setSuccess(false)
            },6000)
            setError({})
        } catch (error) {
            setError(error.response.data)
            setSuccess(false)
        }finally{
            setLoading(false)
        }

    }
  return (
    <>
        <div className="container">
                    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
                        {success &&
                            <>
                                <>
                                    <h5 className='text-center my-3 text-success'>Teacher Registered Successfully </h5>
                                    <div className="row mb-3">
                                        <div className="col-12 d-flex justify-content-center">
                                            <Link to='/login'><button className='btn btn-success'>Login</button></Link>
                                        </div>
                                    </div>
                                 </>
                            </>
                        }
                        <div className="col-md-4 p-5" id='login-section'>
                            <h3 className='fw-bold text-center mb-4'>Register Teacher</h3>
                                    <form action="" method="post" onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor="" className='fw-bold'>Username</label>
                                    <input type="text" className='form-control my-2 rounded-0' placeholder='Enter your username' value={formData.username} onChange={handleChange} name='username' required/>
                                    <h6 className='text-danger text-center my-3'>{error.username}</h6>

                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="" className='fw-bold'>email</label>
                                    <input type="email" className='form-control my-2 rounded-0' placeholder='Enter your username' value={formData.email} onChange={handleChange} name='email' required/>
                                    <h6 className='text-danger text-center my-3'>{error.email}</h6>

                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="" className='fw-bold'>Password</label>
                                    <input type="password" className='form-control my-2 rounded-0' placeholder='Enter your password' value={formData.password} onChange={handleChange} name='password' required/>
                                    <h6 className='text-danger text-center my-3'>{error.password}</h6>

                                </div>
                
                                {loading ? (
                                    <button type="submit" className='btn btn-dark form-control rounded-0' disabled><FontAwesomeIcon icon={faSpinner} className="me-2" />Submitting</button>
                                ):(
                                    <button type="submit" className='btn btn-dark form-control rounded-0'>Register</button>
                                )}
                                </form>
                                
                            
                        </div>
                    </div>
                </div>
    </>
  )
}

export default Register