import { useState } from "react";

const NewPost = (props) => {
    const cohortName = props.cohortName;
    const token = props.token;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('[Location Upon Request]');
    const [willDeliver, setWillDeliver] = useState(false);

    const handleSubmit = async () => {
        if (token) {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/${cohortName}/posts`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    post: {
                        title,
                        description,
                        price: `$${price}`,
                        location,
                        willDeliver
                    }
                })
            });
            const info = response.json();
            console.log(info);
        }
    }

    return (
        <>
            <h1>Add New Post</h1>
            <form onSubmit={() => { handleSubmit() }}>
                <input onChange={(e) => { setTitle(e.target.value) }} type='text' placeholder="Enter Title..." value={title} required={true} />
                <input onChange={(e) => { setDescription(e.target.value) }} type='text' placeholder="Enter Description..." value={description} required={true} />
                <input onChange={(e) => { setLocation(e.target.value) }} type='text' placeholder="Enter Location..." value={location} />
                <input onChange={(e) => { setPrice(e.target.value) }} type='number' placeholder="Enter Price..." value={price} required={true} />
                <input onChange={(e) => { setWillDeliver(e.target.value) }} type='checkbox' value={willDeliver} id='will-deliver' />
                <label htmlFor='will-deliver'>Will Deliver</label>
                <button>CREATE</button>
            </form>
        </>
    )


}

export default NewPost;