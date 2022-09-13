import { useState } from "react";

const Register = ({ cohortName }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usermessage, setUserMessage] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        const response = await fetch(`https://strangers-things.herokuapp.com/api/${cohortName}/users/register`, {
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
        if (!info.success) setUserMessage(info.error.message);
        else setUserMessage(info.data.message);
        console.log(info);
        console.log(username, password);
        setUsername('');
        setPassword('');
    }

    return (
        <div className="Login">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <label htmlFor={username}>Username:</label>
                <input type='text' placeholder="Enter Username..." value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <label htmlFor={password}>Password:</label>
                <input type='password' placeholder="Enter Password..." value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button>Register</button>
            </form>
            <h3>{usermessage}</h3>
        </div>
    )
}

export default Register;