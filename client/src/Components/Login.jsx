import React, { useState, useEffect } from 'react'
import LoginStyle from '../styles/login-signup.module.css'
import { Link, useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credientials, setCredientials] = useState({email: "", password: ""})

    const handleOnChange = (e)=>{
        setCredientials({...credientials, [e.target.name]: e.target.value})
    }

    const navigate = useNavigate()

    useEffect(()=>{
      if(localStorage.getItem('token'))
      navigate("/")
    })

    const handleSubmit = async (e)=>{
      let ServerErr = false
        e.preventDefault();
        console.log(JSON.stringify(credientials))
        const response = await fetch(`http://localhost:2001/api/auth/login`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(credientials)
          }).catch((err)=>{alert('Internal Server Error'); ServerErr = true})
          
          if(ServerErr)
          return;

          const result = await response.json()

            if(result.success)
            {
                localStorage.setItem("token", result.authToken)
                navigate("/")
            }
            else{
                alert("Try to Login with Correct credientionls")
            }
    }
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"92.3vh", background:"#0c1022"}} >
    <form style={{transform:"translateY(-3vh)"}} onSubmit={handleSubmit} className={LoginStyle.login_form_container}>
      <div className={LoginStyle.login_form}>
        <h2>Login</h2>
        <div className={LoginStyle.input_group}>
          <i className="fa fa-user"></i>
          <input
            id='email'
            type="email"
            placeholder="Email"
            className={LoginStyle.input_text}
            autoComplete="off"
            value={credientials.email}
            name='email'
            onChange={handleOnChange}
            required={true}
          />
        </div>
        <div className={LoginStyle.input_group}>
          <i className="fa fa-unlock-alt"></i>
          <input
            id='password'
            type="password"
            placeholder="Password"
            className={LoginStyle.input_text}
            autoComplete="off"
            value={credientials.password}
            name='password'
            onChange={handleOnChange}
            required={true}
          />
        </div>
        <button className='w-full mt-14 mb-4' style={{border:"2px solid", borderRadius:"16px", paddingTop:"7px", paddingBottom:"7px"}} id="login_button">
          Submit
        </button>
        <div className={LoginStyle.footer}>
          <Link to={"/"}>Forgot Password ?</Link>
          <Link className={LoginStyle.underline} to={"/signup"}>SignUp</Link>
        </div>
      </div>
    </form>
    </div>
  )
}

export default Login
