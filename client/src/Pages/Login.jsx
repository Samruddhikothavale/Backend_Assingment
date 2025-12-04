import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
require("dotenv").config();


const Login = () => {
    const [user, setUser] = useState({

        email: "",
        password: ""
    });

    const navigate =useNavigate();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {

                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(user)
            })
            if (response.ok) {
                setUser({
                    email: "",
                    password: ""
                })
                const data = await response.json().catch(() => ({}));
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
                alert("Login Successful")
                navigate("/dashboard");
            }
            else {
                alert("Invalid credential")
            }
            console.log(response);
        } catch (error) {
            console.log("Login :", error)
        }
    }

    return <>
        <section>
            <div className="section-register">
                    <div className="register-form">
                        <h1 >Login Form</h1><br />
                        <form onSubmit={handleSubmit}>

                            <div>
                                <label htmlFor="email">email</label>
                                <input type="email" name="email" placeholder="Enter your email.." id="email" required value={user.email} onChange={handleInput} />
                            </div>

                            <div>
                                <label htmlFor="password">password</label>
                                <input type="password" name="password" placeholder="Enter password" id="password" required value={user.password} onChange={handleInput} />
                            </div><br />
                            <button type="submit" className="btn btn-submit">Register Now</button>

                        </form>

                    </div>
              
            </div>
        </section>
    </>
}
export default Login;
