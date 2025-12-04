import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
require("dotenv").config();

const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate(); 
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
        if(user.password !== e.target.confirmPassword.value){
            alert("Passwords do not match");
            return;
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/register`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(user)  
            })
            if (response.ok) {
                setUser({   
                    name: "",
                    email: "",
                    password: ""    
                })
                alert("Registration Successful")
                navigate("/login");
            }   
            else {
                alert("Registration Failed")
            }
            console.log(response);
        } catch (error) {
            console.log("Registration :", error)
        }
    }

    return <>
        <section>
            <div className="section-register">
                <div className="register-form">
                    <h1 >Register Form</h1><br />
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Name</label>
                            <input type="text" name="username" placeholder="Enter your name.." id="username" required value={user.username} onChange={handleInput} />       
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" placeholder="Enter your email.." id="email" required value={user.email} onChange={handleInput} />
                        </div>  
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="Enter password" id="password" required value={user.password} onChange={handleInput} />
                        </div><br />
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" name="confirmPassword" placeholder="Confirm your password.." id="confirmPassword" required />
                        </div>
                        <div>
                            <p>Already have an account? <span onClick={() => navigate("/login")} style={{ color: "blue", cursor: "pointer" }}>Login</span></p>
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        </section>
    </>
}   
export default Register;
