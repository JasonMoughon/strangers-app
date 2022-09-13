//import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
    //const token = props.token;
    const user = props.user;
    const selectedPost = props.selectedPost;
    const navigate = useNavigate();

    /* useEffect(() => {
        user = props.user;
    })

    useEffect(() => {
        props.setSelectedPost({});
    }, [user]) */

    console.log(user, selectedPost);

    const navigateToSelected = (post) => {
        props.setSelectedPost(post);
        console.log(post);
        navigate(`/user/posts/${post._id}`);
    }

    if (!user.username) {
        return (
            <>
                <h3>Please Login</h3>
            </>
        )
    }
    return (
        <div className="Home-Page">
            <div className="Home-Title">
                <h1>Home</h1>
                <h3>Welcome {user.username}</h3>
            </div>
            {(user.posts.length > 0 ?
                <div className="Home-Post">
                    <h3>My Posts:</h3>
                    {user.posts.map((post) => {
                        return (
                            <div key={post._id} className='RegisteredPosts'>
                                <h2>{post.title}</h2>
                                <p>{post.description}</p>
                                <p>Location: {post.location}</p>
                                <p>Price: {post.price}</p>
                                <p>Will Deliver: {(post.willDeliver ? 'Yes' : 'No')}</p>
                                <button onClick={() => { navigateToSelected(post) }}>View</button>
                            </div>
                        )
                    })}
                </div>
                : <p>No Posts Here</p>)}
        </div>
    )
}

export default Home;