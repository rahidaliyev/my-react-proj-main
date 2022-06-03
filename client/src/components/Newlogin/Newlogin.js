import React, { useState } from 'react'
import "../Newlogin/Newlogin.css"
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Newregister from '../Newregister/Newregister'
import { BiHomeAlt } from 'react-icons/bi'
import Axios from 'axios'
import { FaRegEyeSlash } from 'react-icons/fa'

const style = {
    marginTop: "-9px",
    fontSize: "8px"
}
const homestyle = {
    fontSize: '4rem',
    float: 'right',
    margin: '20px 30px',
    color: 'purple'

}


export default function Newlogin() {
    // const users = [];
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [lenghtError, setlenghtError] = useState("");

    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const submitForm = (e) => {
        e.preventDefault()
        Axios.get('http://localhost:3001/api/get')
            .then(function (response) {
                let bizimdata = response.data
                console.log(bizimdata)
                const data = bizimdata.find((elem) => elem.email == email && elem.password == password)
                if (data) {
                    console.log("login oldun!")
                    localStorage.setItem('user', data.email)
                    navigate("../", { replace: true });
                }
                else {
                    console.log("gelen defe gel!")
                }
            })

    }

    const checkLength = () => {
        if (password.length <= 8) {
            setlenghtError("Password min lenght must be 8 symbols! ")
            console.log(setlenghtError)
        }
        else {
            setlenghtError("")
        }
    }

    return (

        <div className='body' >

            <Link to="/">
                <BiHomeAlt style={homestyle} />

            </Link>

            <div className="login-box">

                <h3>Login</h3>
                <form>
                    <div style={{ marginTop: '2rem' }}>
                        <input type="email" onChange={(e) => { setEmail(e.target.value) }} name="" placeholder="Enter your e-mail..." required />
                        <div style={{ position: 'relative', right: "-2px" }}>

                            <input type={showPassword ? "text" : "password"}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    checkLength()
                                }}
                                name="" placeholder="Enter your password..." required />
                                
                            <a style={{ position: 'absolute', top: '3px', right: '10px' }} onClick={() => {
                                setShowPassword(!showPassword)
                            }} ><FaRegEyeSlash size={15} />
                            </a>
                        </div>
          <div style={{ color: 'red', marginTop: '-17px' }} >{lenghtError}</div>

                    </div>
                    <input style={{ marginTop: '2rem' }} type="submit" onClick={submitForm} name="" value="Login" />
                    <Link style={style} to="/register">Sign up for Keet.app</Link>
                </form>
            </div>

            <Routes>
                <Route path="/register" element={<Newregister />} />
                {/* <Route path="/" element={<></>}> </Route> */}
            </Routes>
        </div>
    )
}
