import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
const Login = (props) => {
    
    const [Credential,setCredential]=useState({email:"",password:""})
    let history=useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response =await fetch ("http://localhost:5000/api/auth/login",{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({email:Credential.email,password:Credential.password})
        });
        const json=await response.json()
        console.log(json)
        if(json.success){
          //redirect
          localStorage.setItem('token',json.authtoken);
          props.showAlert("Logged In SuccessFully","success")
          history('/');
        }
        else{
          props.showAlert("Invalid Credentials","danger")
        }
    }

    const onChange =(e)=>{
      setCredential({...Credential,[e.target.name]:e.target.value})
    }
  return (
    <div className=" my-2 mt-3">
      <h2>Login to continue to iNotebook</h2> 
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={Credential.email}
            onChange={onChange}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={Credential.password}
            name="password"
            onChange={onChange}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
