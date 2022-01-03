import React from "react";
import { Input, Checkbox, Button } from 'antd';
import "antd/dist/antd.css";
import '../signup/signup.css'
import asset from '../../asset/google-create-logo.png'
import Img from '../../asset/google-logo-png.png'
import { register } from "../../services/userservices"
import SignIn from "../signin/signin";
import { useHistory } from "react-router-dom";

const firstnameRegex = /^[A-Z][a-z]{2,}$/

const lastnameRegex = /^[A-Z][a-z]{2,}$/

const usernameRegex = /^[a-zA-Z0-9]+([.#_$+-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2})?$/

const passwordRegex = /[A-Z]{1,}[a-zA-Z0-9]*[#?!@$ %^&*-]+[a-zA-Z0-9]*/

function SignUp() {
    const history = useHistory()

    const [firstnameBorder, setFirstnameBorder] = React.useState("")

    const [firstnameErrorMsg, setFirstnameErrorMsg] = React.useState("")

    const [lastnameBorder, setLastnameBorder] = React.useState("")

    const [lastnameErrorMsg, setLastnameErrorMsg] = React.useState("")

    const [emailBorder, setEmailBorder] = React.useState("")

    const [emailErrorMsg, setEmailErrorMsg] = React.useState("")

    const [passwordBorder, setPasswordBorder] = React.useState("")

    const [passwordErrorMsg, setPasswordErrorMsg] = React.useState("")

    const [signupObj, setSignupObj] = React.useState({ firstName: "", lastName: "", email: "", password: "" })

    const takeFirstname = (e) => {
        setSignupObj({ ...signupObj, firstName: e.target.value })
    }
    const takeLastname = (e) => {
        setSignupObj({ ...signupObj, lastName: e.target.value })
    }
    const takeUsername = (e) => {
        setSignupObj({ ...signupObj, email: e.target.value })
    }
    const takePassword = (e) => {
        setSignupObj({ ...signupObj, password: e.target.value })
    }

    const submit = () => {
        console.log(signupObj)
        if (firstnameRegex.test(signupObj.firstName)) {
            console.log(true)
            setFirstnameBorder("")
            setFirstnameErrorMsg("")
        }
        else {
            console.log(false)
            setFirstnameBorder("1px solid red")
            setFirstnameErrorMsg(<p className="check">Enter valid Firstname</p>)
        }

        if (lastnameRegex.test(signupObj.lastName)) {
            console.log(true)
            setLastnameBorder("")
            setLastnameErrorMsg("")
        }
        else {
            console.log(false)
            setLastnameBorder("1px solid red")
            setLastnameErrorMsg(<p className="check">Enter valid Lastname</p>)
        }

        if (usernameRegex.test(signupObj.email)) {
            console.log(true)
            setEmailBorder("")
            setEmailErrorMsg("")
        }
        else {
            console.log(false)
            setEmailBorder("1px solid red")
            setEmailErrorMsg(<p className="check">Enter valid Username</p>)
        }

        if (passwordRegex.test(signupObj.password)) {
            console.log(true)
            setPasswordBorder("")
            setPasswordErrorMsg("")
        }
        else {
            console.log(false)
            setPasswordBorder("1px solid red")
            setPasswordErrorMsg(<p className="check">Enter valid password</p>)
        }

        register(signupObj).then((resp) => {
            console.log(resp)
            history.push("/signin")
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="signup">
            <div className="left">
                <div className="align">
                    <div className="create">
                        <img className="logox" src={Img} alt="" />
                        <h1>Create your Google Account</h1>
                    </div>
                    <div className="details">
                        <div className="box"> <Input size="" style={{ border: lastnameBorder }} onChange={takeFirstname} placeholder="firstName" /></div>
                        <p className="msg">{firstnameErrorMsg}</p>
                        <div className="box1"> <Input size="" style={{ border: firstnameBorder }} onChange={takeLastname} placeholder="Lastname" /></div>
                        <p className="msg">{lastnameErrorMsg}</p>
                    </div>
                    <div className="email">
                        <Input onChange={takeUsername} style={{ border: emailBorder }} size="" placeholder="Username" suffix="@gmail.com" />
                        <p className="msg">{emailErrorMsg}</p>
                        <div className="text">You can use letters, numbers & periods</div>
                        <div className="hov"><Button type="link"><b>Use my current email address instead</b></Button></div>
                    </div>
                    <div className="password">
                        <div className="pass">
                            <div className="box"> <Input.Password size="" style={{ border: passwordBorder }}
                                onChange={takePassword} placeholder="Password" /></div>
                            <p className="msg">{passwordErrorMsg}</p>
                            <div className="box1"> <Input.Password size="" style={{ border: passwordBorder }}
                                onChange={takePassword} placeholder="Confirm" /></div>
                            <p className="msg">{passwordErrorMsg}</p>
                        </div>
                        <div className="text">Use 8 or more characters with a mix of letters, numbers & symbols</div>
                        <br></br>
                        <div className="check">
                            <Checkbox onChange={SignUp}>Show password</Checkbox>
                        </div>
                    </div>
                    <div className="sbutton">
                        <div className="hov"><Button type="link" onClick={() => { history.push("/") }}><b>Sign in instead</b></Button></div>
                        <Button onClick={submit} type="primary">Next</Button>
                    </div>
                </div>
            </div>
            <div className="right">
                <img className="img" src={asset} alt="" />
            </div>
        </div>
    )
}

export default SignUp