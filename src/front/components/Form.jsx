import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Form = () => {

    const { store, dispatch } = useGlobalReducer()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    function sendData(e){
        e.preventDefault()
        console.log('send data')
        console.log(email, password)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "email":email,
                    "password":password
                }
            )
        };
        fetch(import.meta.env.VITE_BACKEND_URL+'/api/login', requestOptions)
            .then(response => {
                console.log(response)
                if(response.status == 200){
                    // Cambiar auht a true
                     dispatch({ type: "set_auth", payload: true })
                }
                return response.json()
            })
            .then(data => {
                console.log(data)
                localStorage.setItem("token", data.access_token);

            });
    }
    return (
        <div>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
                </div>                
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>        
    );
}

export default Form