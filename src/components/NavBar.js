import { Link, useNavigate } from 'react-router-dom';

const NavBar = (props) => {
    const token = props.token;
    const user = props.user;
    const navigate = useNavigate();

    const handleLogout = () => {
        props.setToken('');
        localStorage.removeItem('token');
        navigate('/posts');
    }

    return (
        <div className='navigation'>
            <div className='nav-buttons'>
                <h3>Stranger's Things</h3>
                <Link to={'/'}>
                    <button>Home</button>
                </Link>
                <Link to={'/posts'}>
                    <button>Posts</button>
                </Link>
                {(token ? <button onClick={() => { handleLogout() }}>Logout</button> : <Link to={'/login'}><button>Login</button></Link>)}
            </div>
            {(user.username ?
                <div className='nav-user'>
                    <p>{user.username}</p>
                </div> :
                <></>
            )}

        </div>
    )
}

export default NavBar;