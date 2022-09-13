import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Posts from "./components/Posts";
import './App.css';
import { useEffect, useState } from "react";
import Register from "./components/Register";
import NewPost from "./components/NewPost";
import Post from "./components/Post";
import UserPost from "./components/UserPost";
const cohortName = '2206-vpi-rm-web-pt';

function App() {
  const [posts, setPosts] = useState([]);
  //const [cohortName, setCohortName] = useState('2206-vpi-rm-web-pt');
  const [token, setToken] = useState('');
  const [user, setUser] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});

  const fetchPosts = async () => {
    const response = await fetch(`https://strangers-things.herokuapp.com/api/${cohortName}/posts`);
    const info = await response.json();
    setPosts(info.data.posts);
  }

  const fetchUser = async () => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }

    if (!token) return;

    console.log(token);
    const response = await fetch(`https://strangers-things.herokuapp.com/api/${cohortName}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const info = await response.json();
    console.log(info);

    if (info.success) {
      setUser(info.data);
      console.log(user);
    };
  }

  useEffect(() => {
    fetchPosts();
    fetchUser();
  });

  return (
    <div className="App">
      <NavBar setToken={setToken} token={token} user={user} />
      <Routes>
        <Route path={'/'} element={<Home user={user} selectedPost={selectedPost} setSelectedPost={setSelectedPost} token={token} />} />
        <Route path={'/user/posts/:postID/*'} element={<UserPost user={user} selectedPost={selectedPost} setSelectedPost={setSelectedPost} token={token} cohortName={cohortName} />} />
        <Route path={'/posts'} element={<Posts posts={posts} user={user} token={token} setSelectedPost={setSelectedPost} />} />
        <Route path={'/posts/:postID/*'} element={<Post user={user} selectedPost={selectedPost} setSelectedPost={setSelectedPost} token={token} cohortName={cohortName} />} />
        <Route path={'/login'} element={<Login cohortName={cohortName} setToken={setToken} token={token} />} />
        <Route path={'/register'} element={<Register cohortName={cohortName} setToken={setToken} />} />
        <Route path={'/posts/new-post'} element={<NewPost cohortName={cohortName} token={token} />} />
      </Routes>
    </div>
  );
}

export default App;