import axios from 'axios'
import React, { useEffect, useState } from 'react'
import axiosinstance from '../axiosinstance'

const Audit = () => {
    const [data,setData]=useState([])
    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const response=await axiosinstance.get('/audit_log')
                setData(response.data)
            } catch (error) {
                console.error(error)
                
            }
        }
        fetchData()
    },[])
  return (
    <>
       <div className="container py-5">
                   <div className="row">
                       <div className="col-12">
                           <h3 className='text-center fw-bold mb-5'>Audit Log</h3>
                           <table className="table table-bordered">
                               <thead>
                                   <tr>
                                   <th scope="col" className='text-center fw-bold bg-dark text-white'>No.</th>
                                   <th scope="col" className='text-center fw-bold bg-dark text-white'>Activity</th>
                                   <th scope="col" className='text-center fw-bold bg-dark text-white'>Timestamp</th>
                                   
                                   </tr>
                               </thead>
                               <tbody>
                                   {data.map((i,index)=>
                                       <>
                                           <tr key={index}>
                                               <th scope="row"  className='text-center'>{index+1}</th>
                                               <td className='text-center'>{i.activity}</td>
                                               <td className='text-center'>{i.created_date}</td>
                                           </tr>
                                       </>
                                   )}
                                   
                                   
                               </tbody>
                               </table>
                       </div>
                   </div>
               </div> 
    </>
  )
}

export default Audit