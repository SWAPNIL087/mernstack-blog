import React, { useEffect } from 'react'
import {HiPencilAlt} from 'react-icons/hi'
import {FaRedo} from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

const AdminBlog = ()=>{
    const history = useHistory();
    const callAdminBlog=async()=>{
        try{
            const res = await fetch('/AdminBlog',{
                method:'GET',
                headers:{
                    Accept:'application/json',
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });
        const data = await res.json();
        if(!res.status == 200){
            const error = new Error(res.error)
            throw error
        }
        else{
            if(data.email == 'admin@myways.in'){
                history.push('/AdminBlog');
            }
            else{
                history.push('/Blogs')
            }
        }
        }
        catch(err){
            console.log(err);
            history.push('/login');
        }
    }

    useEffect(()=>{
        callAdminBlog();
    },[]);


    
    const CreateBlog = ()=>{
        history.push('/createBlog')
    }
    const editBlog = ()=>{
        history.push('/editBlogs')
    }
    return(
        <>
            <div className='row p-0 w-100 contain1 min-vh-100'>
                <div className='mt-5 col-lg-6 col-md-6 col-12 text-center '>
                    <HiPencilAlt onClick={CreateBlog} className='createIcon Blog'/>
                    <p>Create Blog</p>
                </div>
                <div className='mt-5 container col-lg-6 col-md-6 col-12 text-center'>
                    <FaRedo onClick={editBlog} className='createIcon editBlog'/>
                    <p>Edit Blog</p>
                </div>
            </div>
            
        </>
    )
}

export default AdminBlog