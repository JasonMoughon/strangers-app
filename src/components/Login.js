import { useState } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
    const cohortName = props.cohortName;
    const token = props.token;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usermessage, setUserMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        const response = await fetch(`https://strangers-things.herokuapp.com/api/${cohortName}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            })
        });
        const info = await response.json();
        console.log(info);
        if (!info.success) {
            setUserMessage(info.error.message);
        } else {
            setUserMessage(info.data.message);
            console.log(info.data.token);
            props.setToken(info.data.token);
            localStorage.setItem('token', info.data.token);
        }
        console.log(username, password, token);
        setUsername('');
        setPassword('');
    }

    return (
        <div className="Login">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor={username}>Username:</label>
                <input type='text' placeholder="Enter Username..." value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <label htmlFor={password}>Password:</label>
                <input type='password' placeholder="Enter Password..." value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button>Enter</button>
            </form>
            <div className="registerHere">
                <p>Don't Have an Account?</p>
                <Link to={'/register'}>Register Here</Link>
            </div>
            <h3>{usermessage}</h3>
        </div>
    )
}

export default Login;