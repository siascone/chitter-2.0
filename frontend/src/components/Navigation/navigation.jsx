import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import { logout } from "../../store/session";
import { useNavigate } from "react-router-dom";

function Navigation () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(state => {
        let user;
        if (state.session.user) {
            user = state.session.user
        }
        return user
    })

    const logoutUser = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(logout(currentUser.id))
            .then(() => {
                navigate('/login')
            })
    }

    let greeting;

    if (currentUser) {
        greeting = <div>
            <h3>Hello {currentUser.username}</h3>
            <button onClick={logoutUser}>Logout</button>
        </div>
    } else {
        greeting = <div>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/signup'>Sign Up</NavLink>
        </div>
    }

    return (
        <div>
            <NavLink to="/feed">Chitter</NavLink>
            {greeting}
        </div>
    )
}

export default Navigation;