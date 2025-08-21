import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Header from './components/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Audit from './components/Audit';
import PrivateRoot from './PrivateRoot';
import PublicRoot from './PublicRoot';
import AuthProvider from './AuthProvider';
import Register from './components/Register';

function App() {

  return (
    <>
    <AuthProvider>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='login/' element={<PublicRoot><Login/></PublicRoot>}/>
        <Route path='register/' element={<PublicRoot><Register/></PublicRoot>}/>

        <Route path='dashboard/' element={<PrivateRoot><Dashboard/></PrivateRoot>}/>
        <Route path='audit_log/' element={<PrivateRoot><Audit/></PrivateRoot>}/>
      </Routes>
      
    </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
