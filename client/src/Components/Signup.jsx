import React, { useEffect, useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import LoginStyle from '../styles/login-signup.module.css'


const Signup = () => {
    const [credientials, setCredientials] = useState({ username: "", email: "", password: "", rpassword:"" })
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        setCredientials({ ...credientials, [e.target.name]: e.target.value })
    }

    useEffect(()=>{
        if(localStorage.getItem('token'))
      navigate("/")
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(credientials.password!==credientials.rpassword)
        {
            alert(false)
            return 
        }

        const response = await fetch(`http://${process.env.REACT_APP_ENDPOINT}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credientials.username, email:credientials.email, password:credientials.password})
        })

        const result = await response.json()

        if(result.message){
            alert(result.message)
            return
        }

        if (result.success) {
            localStorage.setItem("token", result.authToken)
            navigate("/")
        }
        else {
            alert("signup not successful")
            console.log(result)
        }
    }
    return (
        <div className="signup" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "92.3vh", background: "#0c1022" }}>
            <form onSubmit={handleSubmit} className={LoginStyle.signup_form_container} style={{ transform: "translateY(-2vh)" }}>
                <div className={LoginStyle.login_form}>
                    <h2>Signup</h2>
                    <div className={LoginStyle.input_group}>
                        <i className="fa fa-user"></i>
                        <input
                            id='username'
                            type="text"
                            placeholder="Username"
                            className={LoginStyle.input_text}
                            autoComplete="off"
                            value={credientials.username}
                            name='username'
                            onChange={handleOnChange}
                            required={true}
                        />
                    </div>
                    <div className={LoginStyle.input_group}>
                    <i className="fa fa-envelope"></i>
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
                        <div className='w-1/2'>
                        <input
                            id='password'
                            type="password"
                            placeholder="Password"
                            className={`${LoginStyle.input_text} w-auto`}
                            autoComplete="off"
                            value={credientials.password}
                            name='password'
                            onChange={handleOnChange}
                            required={true}
                        />
                        </div>
                        <div className='w-1/2'>
                        <input
                            id='rpassword'
                            type="password"
                            placeholder="Repeat Password"
                            className={`${LoginStyle.input_text} w-auto`}
                            autoComplete="off"
                            value={credientials.rpassword}
                            name='rpassword'
                            onChange={handleOnChange}
                            required={true}
                        />
                        </div>
                    </div>
                    <button className='w-full mt-14 mb-4' style={{ border: "2px solid", borderRadius: "16px", paddingTop: "7px", paddingBottom: "7px" }} id="login_button">
                        Submit
                    </button>
                    <div className={LoginStyle.footer}>
                        <Link to={"/"}>Forgot Password ?</Link>
                        <Link className={LoginStyle.underline} to={"/"}>Login</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup
