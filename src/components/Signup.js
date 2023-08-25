import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
const Signup = (props) => {
  const [Credential,setCredential]=useState({name:"",email:"",password:"",cpassword:""})
    let history=useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const {name,email,password}=Credential;
        const response =await fetch ("http://localhost:5000/api/auth/Createuser",{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({name,email,password})
        });
        const json=await response.json()
        console.log(json)
        if(json.success){
          //redirect
          localStorage.setItem('token',json.authtoken);
          history('/');
          props.showAlert("Account Created SuccessFully","success")
        }
        else{
          props.showAlert("Invalid Credentials","danger")
        }
    }

    const onChange =(e)=>{
      setCredential({...Credential,[e.target.name]:e.target.value})
    }
  return (
    <div className="container mt-3">
      <h2>Create a account to access iNotebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
          <label htmlFor="email">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
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
            name="password"
            onChange={onChange}
            placeholder="Password"
            minLength={5} required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            placeholder="C-Password"
            minLength={5} required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup
