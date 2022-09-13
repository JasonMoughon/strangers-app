//import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Posts = (props) => {
    const posts = props.posts;
    const token = props.token;
    const navigate = useNavigate();
    console.log(posts, token);

    const navigateToSelected = (post) => {
        props.setSelectedPost(post);
        navigate(`/posts/${post._id}`);
    }

    if (!posts) {
        return (
            <></>
        );
    };
    return (
        <div className="AllPosts">
            <div className="Post-Header">
                <h1>Posts</h1>
                {(token ? <Link to={'/posts/new-post'}>Make New Post</Link> : <></>)}
            </div>
            <div className='Posts'>
                {posts.map((post) => {
                    return (
                        <div key={post._id} className='RegisteredPosts'>
                            <h2>{post.title}</h2>
                            <p>{post.description}</p>
                            <p>Owner: {post.author.username}</p>
                            <p>Location: {post.location}</p>
                            <p>Price: {post.price}</p>
                            <p>Will Deliver: {(post.willDeliver ? 'Yes' : 'No')}</p>
                            <button onClick={() => { navigateToSelected(post) }}>View</button>
                        </div>
                    )
                })}
            </div>

        </div>
    )


}

export default Posts;