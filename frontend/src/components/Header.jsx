import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'
import { useContext } from 'react'

const Header = () => {
  const {isLoggedIn,setIsLoggedIn}=useContext(AuthContext)
  const navigate=useNavigate()
  const logout=()=>{
    setIsLoggedIn(false)
    navigate('/login')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }
  return (
    <>
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
            <div className="container-fluid px-5 py-2">
                <a className="navbar-brand fw-bold" href="#">Tailwebs</a>
                {isLoggedIn &&
                                  <button className="btn btn-danger btn-sm fw-bold" type="submit" onClick={logout}>Logout</button>

                }

               
            </div>
        </nav>
    </>
  )
}

export default Header