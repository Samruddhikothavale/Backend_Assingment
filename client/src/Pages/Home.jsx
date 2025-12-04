
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    
    const handleRegister = () => {
        navigate('/register');
    }
    
    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <div>   
            <h1>Welcome to the Task Management App</h1>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}

export default Home;