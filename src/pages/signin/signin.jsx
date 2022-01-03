import React from "react";
import { Input, Button } from 'antd';
import "antd/dist/antd.css";
import '../signin/signin.css'
import asset from '../../asset/google-logo-png.png'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { login } from '../../services/userservices'
import { useHistory } from "react-router-dom";
import SignUp from "../signup/signup";

const emailRegex = /^[a-zA-Z0-9]+([.#_$+-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2})?$/

const passwordRegex = /[A-Z]{1,}[a-zA-Z0-9]*[#?!@$ %^&*-]+[a-zA-Z0-9]*/

function SignIn() {
    const history = useHistory()

    const [emailBorder, setEmailBorder] = React.useState("")

    const [emailErrorMsg, setEmailErrorMsg] = React.useState("")

    const [passwordBorder, setPasswordBorder] = React.useState("")

    const [passwordErrorMsg, setPasswordErrorMsg] = React.useState("")

    const [signinObj, setSigninObj] = React.useState({ email: "", password: "" })

    const takeEmail = (e) => {
        setSigninObj({ ...signinObj, email: e.target.value })
    }
    const takePassword = (e) => {
        setSigninObj({ ...signinObj, password: e.target.value })
    }

    const submit = () => {
        console.log(signinObj)
        let emailpass = emailRegex.test(signinObj.email)
        if (emailRegex.test(signinObj.email)) {
            console.log(true)
            setEmailBorder("")
            setEmailErrorMsg("")
        }
        else {
            console.log(false)
            setEmailBorder("1px solid red")
            setEmailErrorMsg(<p className="check">Invalid email</p>)
        }
        let pass = passwordRegex.test(signinObj.password)
        if (passwordRegex.test(signinObj.password)) {
            console.log(true)
            setPasswordBorder("")
            setPasswordErrorMsg("")
        }
        else {
            console.log(false)
            setPasswordBorder("1px solid red")
            setPasswordErrorMsg(<p className="check">Enter valid password</p>)
        }
        if (emailpass == true && pass == true) {

            login(signinObj).then((resp) => {
                console.log(resp)
                localStorage.setItem("token", resp.data.token)
                localStorage.setItem("UserID", resp.data.data.userID)
                history.push("/dashboard")
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    return (
        <div className="login">
            <div className="content">
                <div className="signin">
                    <img className="logo" src={asset} alt="" />
                    <br></br>
                    <div className="sign"><h2><b>Sign in</b></h2></div>
                    <div className="g1"><h3>Use your Google Account</h3></div>
                    <br></br>
                </div>
                <div className="email1">
                    <Input style={{ border: emailBorder }} onChange={takeEmail} placeholder="Email or Phone" />
                    <p>{emailErrorMsg}</p>
                    <Input.Password style={{ border: passwordBorder }} onChange={takePassword} placeholder="Password"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                    <p>{passwordErrorMsg}</p>
                    <Button type="link"><b>Forget Password?</b></Button>
                </div>
                <div className="detail">
                    <p className="p">Not your computer? Use Guest mode to sign in privately.</p>
                    <Button className="p" type="link"><b>Learn more</b></Button>
                </div>
                <div className="s1button">
                    <div className="hov"><Button type="link" onClick={() => { history.push("/signup") }}><b>Create Account</b></Button> </div>
                    <Button onClick={submit} type="primary">Next</Button>
                </div>
            </div>
        </div>
    )
}

export default SignIn