import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {FaTrash} from 'react-icons/fa'
import {FaHeart} from 'react-icons/fa'
const EditBlogs = ()=>{
    const history = useHistory();
    const [userId,setuser] = useState('');
    const [blogdata,setblogdata] = useState([]);
    const callBlog=async()=>{
        try{
            const res = await fetch('/editBlogs',{
                method:'GET',
                headers:{
                    Accept:'application/json',
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });
        const data = await res.json();
        setblogdata(data.BlogData)
        setuser(data.userID)
        
        if(!res.status == 200){
            const error = new Error(res.error)
            throw error
        }
        else{
            
            history.push('/editBlogs')
        }
        }
        catch(err){
            console.log(err);
            history.push('/login');
        }
    }

    useEffect(()=>{
        callBlog();
    },[]);

    const deleteBlog = (id)=>{
        fetch('/editBlogs',{
            method:'POST',
            headers:{
                Accept:'application/json',
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({
                blogId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log('done')
            window.location.reload();
        })
    
    
}
    return (
        <>  
            <div className='row min-vh-100'>
            <div className="gallery">
            
                {
                  blogdata.map((item)=>{
                    return (
                        <div key={item._id} style={{maxWidth:'250px'}} >
                            <div className='item p-1 m-3'>
                                <strong>{item.title}</strong>
                                <p>{item.msg}</p>
                            </div>
                            <div className='text-center'>
                            <FaTrash onClick={()=>{deleteBlog(item._id)}} className='m-2 deleteblog'/>
                            </div>
                        </div>
                        )})
                }
            </div>
            </div>
        </>
    )
}
export default EditBlogs