import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditPost = (props) => {
    const token = props.token;
    const cohortName = props.cohortName;
    const selectedPost = props.selectedPost;
    const navigate = useNavigate();
    const [title, setTitle] = useState(selectedPost.title);
    const [description, setDescription] = useState(selectedPost.description);
    const [price, setPrice] = useState(selectedPost.price.slice(1));
    const [location, setLocation] = useState(selectedPost.location);
    const [willDeliver, setWillDeliver] = useState(selectedPost.willDeliver);

    const fetchPatch = async () => {
        const response = await fetch(`http://strangers-things.herokuapp.com/api/${cohortName}/posts/${selectedPost._id}`, {
            method: "PATCH",
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
        const info = await response.json();
        console.log(info);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchPatch();
        setTitle('');
        setDescription('');
        setLocation('');
        setPrice('');
        setWillDeliver(false)
        navigate('/posts');
    }

    return (
        <div className="Edit-Page">
            <h3>Make an Edit</h3>
            <form onSubmit={(e) => { handleSubmit(e) }} className='Edit-Form'>
                <label htmlFor={title}>Title:</label>
                <input id={title} onChange={(e) => { setTitle(e.target.value) }} type='text' placeholder="Enter Title..." value={title} required={true} />
                <label htmlFor={description}>Description:</label>
                <input id={description} onChange={(e) => { setDescription(e.target.value) }} type='text' placeholder="Enter Description..." value={description} required={true} />
                <label htmlFor={location}>Location:</label>
                <input id={location} onChange={(e) => { setLocation(e.target.value) }} type='text' placeholder="Enter Location..." value={location} />
                <label htmlFor={price}>Price:</label>
                <input id={price} onChange={(e) => { setPrice(e.target.value) }} type='number' placeholder="Enter Price..." value={price} required={true} />
                <label htmlFor={willDeliver}>Will Deliver:</label>
                <input id={willDeliver} onChange={(e) => { setWillDeliver(e.target.value) }} type='checkbox' value={willDeliver} />
                <button>MAKE EDIT</button>
            </form>
        </div>
    )
}

export default EditPost;