import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {Modal} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axiosinstance from '../axiosinstance'


const Dashboard = () => {
    const [success,setSuccess]=useState(false)
    const [error,setError]=useState('')
    const [students,setStudents]=useState([])
    const [isOpenEditModal,setIsOpenEditModal]=useState(false)
    const [isOpenDeleteModal,setIsOpenDeleteModal]=useState(false)
    const [isDeleted,setIsDeleted]=useState(false)

    const [formData,setFormData]=useState({
        name:'',
        subject:'',
        marks:''
    })
    const [selectedStudent,setSelectedStudent]=useState({
        name:'',
        subject:'',
        marks:''
    })

    const fetchData=async()=>{
            try {
                const response=await axiosinstance.get('/students')
                setStudents(response.data)
            } catch (error) {
                console.error(error)
            }
    }

    useEffect(()=>{
        fetchData()
    },[])

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleAddStudent=async(e)=>{
        e.preventDefault()
        try {
            const response=await axiosinstance.post('/add_student',formData)
            setSuccess(true)
            setTimeout(()=>{
                setSuccess(false)
            },3000)

            setError('')
            setFormData({name:'',subject:'',marks:''})

            fetchData()

        } catch (error) {
            setSuccess(false)
            setError(error.response.data.error)
        }
    }

    const openDeleteModel=async(student)=>{
        setSelectedStudent({id:student.id,name:student.name,subject:student.subject,marks:student.marks})
        setIsOpenDeleteModal(true)
    }

    const openEditModal=async(student)=>{
        setSelectedStudent({id:student.id,name:student.name,subject:student.subject,marks:student.marks})
        setIsOpenEditModal(true)
     
    }

    const handleEditChange=(e)=>{
        setSelectedStudent({...selectedStudent,[e.target.name]:e.target.value})
    }

    const handleEditStudent=async(e)=>{
        e.preventDefault()

        try {
            const response=await axiosinstance.put(`/edit_student/${selectedStudent.id}`,selectedStudent)
            setSuccess(true)
            setTimeout(()=>{
                setSuccess(false)
            },3000)
            setError('')
            fetchData()
        } catch (error) {
            setError(error.response.data.error)
            setSuccess(false)
        }
    }

    const deleteStudent=async()=>{
        try {
            const response=await axiosinstance.delete(`/delete_student/${selectedStudent.id}`)
            setIsDeleted(true)
            setTimeout(()=>{
                setIsDeleted(false)
            },3000)
            setIsOpenDeleteModal(false)
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }

    

    

  return (
    <>
        <div className="container py-5">
            <div className="row">
                <div className="col-12">
                    <h3 className='text-center fw-bold mb-5'>Dashboard</h3>
                    <Link to='/audit_log'><button className='btn btn-primary  float-start mb-4 rounded-0 fw-bold'>Audit Log</button></Link>
                    <button className='btn btn-success  float-end mb-4 rounded-0 fw-bold' data-bs-toggle="modal" data-bs-target="#exampleModal">Add Student</button>
                    {isDeleted && <h6 className='text-center text-success'>Student Deleted Successfully..</h6>}
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                            <th scope="col" className='text-center fw-bold bg-dark text-white'>No.</th>
                            <th scope="col" className='text-center fw-bold bg-dark text-white'>Name</th>
                            <th scope="col" className='text-center fw-bold bg-dark text-white'>Subject</th>
                            <th scope="col" className='text-center fw-bold bg-dark text-white'>Marks</th>
                            <th scope="col" className='text-center fw-bold bg-dark text-white'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((i,index)=>
                                <>
                                    <tr key={index}>
                                        <th scope="row"  className='text-center'>{index+1}</th>
                                        <td className='text-center'>{i.name}</td>
                                        <td className='text-center'>{i.subject}</td>
                                        <td className='text-center'>{i.marks}</td>
                                        <td className='text-center'><button className='btn btn-sm  btn-success' onClick={()=>openEditModal(i)}><FontAwesomeIcon icon={faEdit}/></button> <button className='btn btn-sm btn-danger' onClick={()=>openDeleteModel(i)}><FontAwesomeIcon icon={faTrash}/></button></td>
                                    </tr>
                                </>
                            )}
                            
                            
                        </tbody>
                        </table>
                </div>
            </div>
        </div>

        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5 text-center fw-bold" id="exampleModalLabel">Add Student</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {success && <h6 className='text-success text-center my-3'>Student Added successfully</h6>}
                    <h6 className='text-danger text-center my-3'>{error}</h6>

                    <form action="" method="post" id='add-form' className='px-4 pb-4' onSubmit={handleAddStudent}>
                        <div className='mb-3'>
                            <label htmlFor="" className='fw-bold'>Name</label>
                            <input type="text" className='form-control my-2 rounded-0' placeholder='Enter name' name='name' value={formData.name} onChange={handleChange} required/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="" className='fw-bold'>Subject</label>
                            <input type="text" className='form-control my-2 rounded-0' placeholder='Enter subject' name='subject' value={formData.subject} onChange={handleChange} required/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="" className='fw-bold'>Mark</label>
                            <input type="number" className='form-control my-2 rounded-0' placeholder='Enter mark' name='marks' value={formData.marks} onChange={handleChange} required/>
                        </div>

                        <button type="submit" className='btn btn-dark form-control rounded-0'>Add</button>
                    </form>
                </div>
                
                </div>
            </div>
        </div>

        <Modal show={isOpenEditModal} onHide={()=>setIsOpenEditModal(false)}>
           
                <Modal.Header closeButton>
                    <Modal.Title>Edit Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {success && <h6 className='text-success text-center my-3'>Student Edited successfully</h6>}
                    <h6 className='text-danger text-center my-3'>{error}</h6>

                    <form action="" method="post" id='add-form' className='px-4 pb-4' onSubmit={handleEditStudent}>
                        <div className='mb-3'>
                            <label htmlFor="" className='fw-bold'>Name</label>
                            <input type="text" className='form-control my-2 rounded-0' placeholder='Enter name' name='name' value={selectedStudent.name} onChange={handleEditChange} required/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="" className='fw-bold'>Subject</label>
                            <input type="text" className='form-control my-2 rounded-0' placeholder='Enter subject' name='subject' value={selectedStudent.subject} onChange={handleEditChange} required/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="" className='fw-bold'>Mark</label>
                            <input type="number" className='form-control my-2 rounded-0' placeholder='Enter mark' name='marks' value={selectedStudent.marks} onChange={handleEditChange} required/>
                        </div>

                        <button type="submit" className='btn btn-dark form-control rounded-0'>Edit</button>
                    </form>
                </Modal.Body>
                
                
        </Modal>


        <Modal show={isOpenDeleteModal} onHide={()=>setIsOpenDeleteModal(false)}>
           
                <Modal.Header closeButton>
                    <Modal.Title>Delete Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className='text-center my-3'>Are You Sure ?</h5>
                    <div className="row mb-3">
                        <div className="col-12 d-flex justify-content-center">
                            <button className='btn btn-danger' onClick={deleteStudent}>Delete</button>
                        </div>
                    </div>
                </Modal.Body>
                
                
        </Modal>
    </>
  )
}

export default Dashboard