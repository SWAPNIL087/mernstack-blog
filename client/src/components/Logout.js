import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';

const Logout = ()=>{
    const history = useHistory();

    useEffect(()=>{
        fetch('/logout',{
            method:'GET',
            headers:{
                Accept: 'application/json',
                'Content-Type':'application/json'
            },
            credentials:'include'
        }).then((res)=>{
            history.push('/login',{replace:true});
            if(res.status !=200){
                const err = new Error(res.error)
                throw err;
            }
        }).catch((err)=>{
            console.log(err);
        })
    })

    return(
        <>
        <div className='min-vh-100'></div>
        </>
    )
}

export default Logout;