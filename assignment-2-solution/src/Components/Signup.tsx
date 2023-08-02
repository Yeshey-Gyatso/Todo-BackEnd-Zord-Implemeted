import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useSetRecoilState} from "recoil";
import {authState} from "../store/authState.js";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
const handleSignup = async () => {
    try {
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log("Server Error:", errorData);
            // Todo: You can display the error message to the user or handle it accordingly.
            alert("Error while signing up");
            return;
        }

        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token)
            window.location = "/todos";
        } else {
            console.log("Server Error: Invalid response data.");
            // Todo: Handle the case where the server response does not contain the expected 'token' field.
            alert("Error while signing up");
        }
    } catch (error) {
        console.log("Network Error:", error.message);
        // Todo: Handle network errors.
        alert("Network Error: Please check your internet connection.");
    }
};

    return (
        <div style={{justifyContent: "center", display: "flex", width: "100%"}}>
            <div>
                <h2>Signup</h2>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                Already signed up? <Link to="/login">Login</Link>
                <button onClick={handleSignup}>Signup</button>
            </div>
        </div>
    );
};

export default Signup;
