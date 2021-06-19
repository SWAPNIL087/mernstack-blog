import React, { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
const Login = ()=>{
    const history =  useHistory();
    const [email,setEmail] = useState('')
    const [ password,setPassword] = useState('')

    const loginUser = async (e)=>{
        e.preventDefault();
        console.log('clicked')
        const res = await fetch('/login',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,password
            })
        })

        const data = await res.json();
        console.log(data)
        if(data.error || !data){
            window.alert(data.error)
        }
        else{
            console.log(data.login)
            if(data.login == 'user'){
                history.push('/Blogs')
            }
            else if(data.login == 'admin'){
            history.push('/AdminBlog')}  //Chnage it to blog page
        }
    }
    return (
        <div className='row min-vh-100'>
            <div className='box mt-5 col-lg-4 col-md-6 col-8'>
                <h1>Login</h1>
                <form method="POST">
                    <div className="form-group p-2">
                        <label for="exampleInputEmail1">Email</label>
                        <input name='email' 
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                        type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div className="form-group p-2">
                        <label for="exampleInputPassword1">Password</label>
                        <input name='password'
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                         type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <div className='text-center'>
                    <button type="submit" onClick={loginUser} className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login