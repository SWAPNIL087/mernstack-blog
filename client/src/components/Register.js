import React, { useReducer, useState } from 'react';
import { NavLink,useHistory } from 'react-router-dom';
const Register = ()=>{

    const history = useHistory();
    const [user,setUser] = useState({
        name:'',email:'',phonenumber:'',password:'',cpassword:''
    })

    const handleInputs = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setUser({...user, [name]:value})
    }

    const RegisterData = async (e)=>{
        e.preventDefault();
        const {name,email,phonenumber,password,cpassword} = user;

        const res = await fetch('/register',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,email,phonenumber,password,cpassword
            })
        })

        const data = await res.json()
        console.log(data)
        if(data.error || !data) {
            window.alert(data.error);
        }
        else{
            window.alert('registerted successfully');
            history.push("/login")  
        }
    }
    return (
        <div className='row min-vh-100'>
        <div className='box mt-5 col-lg-4 col-md-6 col-10'>
            <h1>Register</h1>
            <form method='POST'>
            <div className="form-group p-2">
                    <label for="exampleInputEmail1">Full Name</label>
                    <input name='name' required type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                    onChange={handleInputs}
                
                    value = {user.name}
                     placeholder="Enter Name"/>
                </div>
                <div className="form-group p-2">
                    <label for="exampleInputEmail1">Email</label>
                    <input name='email' required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                    onChange={handleInputs}
                
                    value = {user.email}

                     placeholder="Enter email"/>
                </div>
                <div className="form-group p-2">
                    <label for="exampleInputPassword1">Phone Number</label>
                    <input name='phonenumber' required type="number" className="form-control" id="exampleInputPassword1" 
                    onChange={handleInputs}
                
                    value = {user.phonenumber}

                     placeholder="Phone Number"/>
                </div>
                <div className="form-group p-2">
                    <label for="exampleInputPassword1">Password</label>
                    <input name='password' required type="password" className="form-control" id="exampleInputPassword1" 
                    onChange={handleInputs}
                
                    value = {user.password}

                     placeholder="Password"/>
                </div>
                <div className="form-group p-2">
                    <label for="exampleInputPassword1">Confirm Password</label>
                    <input name='cpassword' required type="password" className="form-control" id="exampleInputPassword1" 
                    onChange={handleInputs}
                
                    value = {user.cpassword}

                     placeholder="Password"/>
                </div>
                <div className='text-center'>
                <button type="submit" onClick={RegisterData} className="btn btn-success">Register</button>
                </div>
            </form>
        </div>
        </div>
    )
}
export default Register