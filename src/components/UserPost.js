import { Link, Route, Routes, useNavigate } from "react-router-dom";
import EditPost from "./EditPost";
import MessageLog from "./MessageLog";

const UserPost = (props) => {
    const user = props.user;
    const selectedPost = props.selectedPost;
    const cohortName = props.cohortName;
    const token = props.token;
    const navigate = useNavigate();
    console.log(selectedPost, user);

    const navigateToHome = () => {
        props.setSelectedPost({});
        navigate('/');
    }

    if (!selectedPost) {
        return (
            <>
                <h1>No Post</h1>
            </>
        );
    };
    if (selectedPost._id) {
        return (
            <div>
                <div key={selectedPost._id} className='IndividualPost'>
                    <h2>{selectedPost.title}</h2>
                    <p>{selectedPost.description}</p>
                    <p>Price: {selectedPost.price}</p>
                    {(user._id === selectedPost.author ?
                        <>
                            <Link to={'edit'}>
                                <button>Edit</button>
                            </Link>
                            <button onClick={() => { navigateToHome() }}>Return</button>
                        </> :
                        <>
                            <button onClick={() => { navigateToHome() }}>Return</button>
                        </>
                    )}
                </div>
                <div>
                    {(user._id === selectedPost.author ?
                        <>
                            <MessageLog selectedPost={selectedPost} />
                        </> :
                        <></>
                    )}
                </div>
                <Routes>
                    <Route path={`edit`} element={<EditPost cohortName={cohortName} token={token} selectedPost={selectedPost} />} />
                </Routes>
            </div>
        )
    }
}

export default UserPost;