import React, { useEffect,useState } from 'react'
import { useHistory } from 'react-router-dom'

const CreateBlog = ()=>{
    const history = useHistory()

    const [data,setData] = useState({
        title:'',msg:''
    })
    const handleInputs = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setData({...data, [name]:value})
    }

    const callAdminBlog=async()=>{
        try{
            const res = await fetch('/createBlog',{
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
            history.push('/CreateBlog');
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

    const sendPost = async (e) =>{
        e.preventDefault();
        console.log(data)
        const {title,msg} = data;

        const res = await fetch('/sendPost',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title,msg
            })
        })

        const data2 = await res.json()
        console.log(data2)
        if(data2.error || !data2) {
            window.alert(data2.error);
        }
        else{
            window.alert('Blog Posted!');
            history.push("/createBlog")  
        }
    }
    return(
        <>
            <div className='row contain1 min-vh-100'>
                <div className='text-center mt-5'>
                    <strong className='text-center'>Write a Blog</strong>
                    <form className='text-center'>
                    <label for='title'>Title</label>
                    <input value={data.title} 
                    onChange={handleInputs} 
                    type='text' name='title'></input>
                    <br/><br/>
                    <textarea value={data.msg} 
                    onChange={handleInputs} 
                    name="msg" rows="4" className='w-75'/>
                    <br></br>
                    <div className='text-center'>
                    <button type='submit' onClick={sendPost} className="btn btn-primary text-center">Post</button>
                    </div>
                    </form>
                </div>
            </div>
            
        </>
    )
}

export default CreateBlog