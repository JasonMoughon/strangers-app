import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SendMessage = (props) => {
    const token = props.token;
    const cohortName = props.cohortName;
    const selectedPost = props.selectedPost;
    const navigate = useNavigate();
    const [content, setContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`https://strangers-things.herokuapp.com/api/${cohortName}/posts/${selectedPost._id}/messages`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: {
                    content
                }
            })
        })
        const info = await response.json();
        console.log(info);
        setContent('');
        navigate('/posts');
    }

    return (
        <div className="Send-Message">
            <h3>Send Message:</h3>
            <form onSubmit={(event) => { handleSubmit(event) }}>
                <label htmlFor={content}>Content:</label>
                <input id={content} onChange={(event) => { setContent(event.target.value) }} value={content} required={true} />
                <button>Send</button>
            </form>
        </div>
    )
}

export default SendMessage;