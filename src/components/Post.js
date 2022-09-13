import { Link, Route, Routes, useNavigate } from "react-router-dom";
import EditPost from "./EditPost";
import SendMessage from "./SendMessage";

const Post = (props) => {
    const user = props.user;
    const selectedPost = props.selectedPost;
    const cohortName = props.cohortName;
    const token = props.token;
    const navigate = useNavigate();
    console.log(selectedPost, user);

    const navigateToAll = () => {
        props.setSelectedPost({});
        navigate('/posts');
    }

    if (!selectedPost) {
        return (
            <></>
        );
    };
    if (selectedPost._id) {
        return (
            <div>
                <div key={selectedPost._id} className='IndividualPost'>
                    <h2>{selectedPost.title}</h2>
                    <p>{selectedPost.description}</p>
                    <p>Location: {selectedPost.location}</p>
                    <p>Price: {selectedPost.price}</p>
                    <p>Will Deliver: {(selectedPost.willDeliver ? 'Yes' : 'No')}</p>
                    {(user._id === selectedPost.author._id ?
                        <>
                            <Link to={'edit'}>
                                <button>Edit</button>
                            </Link>
                            <button onClick={() => { navigateToAll() }}>Return</button>
                        </> :
                        <>
                            <Link to={'message'}>
                                <button>Message</button>
                            </Link>
                            <button onClick={() => { navigateToAll() }}>Return</button>
                        </>
                    )}

                </div>
                <Routes>
                    <Route path={`edit`} element={<EditPost cohortName={cohortName} token={token} selectedPost={selectedPost} />} />
                    <Route path={`message`} element={<SendMessage selectedPost={selectedPost} token={token} cohortName={cohortName} />} />
                </Routes>
            </div>
        )
    }
}

export default Post;