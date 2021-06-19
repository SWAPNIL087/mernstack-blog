import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {FaHeart} from 'react-icons/fa'
const Blogs = ()=>{
    const history = useHistory();
    const [userId,setuser] = useState('');
    const [blogdata,setblogdata] = useState([]);
    const callBlog=async()=>{
        try{
            const res = await fetch('/Blogs',{
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
            
            history.push('/Blogs')
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

    const liked = (id)=>{
        console.log('clicked')
        fetch('/likeBlog',{
            method:'PUT',
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
                            {(() => {
                                if(item.likes.includes(userId)){
                                  return (
                                      <div className='likes'>
                                          <FaHeart style={{color:'red'}}/>
                                          <strong  className='m-2'>
                                              {item.likes.length}
                                          </strong>
                                            <p>You Liked this blog</p>
                                      </div>
                                    )}
                                    else{
                                        return(
                                        <div className='likes'>
                                            <FaHeart onClick={()=>{liked(item._id)}} className='likeIcon'/>
                                            <strong  className='m-2'>
                                                {item.likes.length}
                                            </strong>
                                        </div>
                                        )}})()}
                        </div>)})
                }
            </div>
            </div>
        </>
    )
}
export default Blogs