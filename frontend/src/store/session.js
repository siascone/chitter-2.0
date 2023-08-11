import csrfFetch from './csrf.js'
import { endSession } from './users.js'

export const SET_CURRENT_USER = 'session/setCurrentUser';
export const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user: user,
        userId: user.id
    }
}

export const removeCurrentUser = () => {
    return {
        type: REMOVE_CURRENT_USER
    }
}

export const storeCurrentUser = user => {
    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    } else{
        sessionStorage.removeItem("currentUser");
    }
}

export const login = ({ credential, password }) => async dispatch => {
    const res = await csrfFetch("/api/session", {
        method: 'POST',
        body: JSON.stringify({ credential, password })
    })

    if (res.ok) {
        const data = await res.json();
        storeCurrentUser(data.user);
        dispatch(setCurrentUser(data.user));
    }

    return res;
}

export const signup = (user) => async dispatch => {
    const { username, email, password, firstName, lastName } = user;
    const res = await csrfFetch("/api/users", {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password,
            firstName,
            lastName
        })
    })

    if (res.ok) {
        const data = await res.json();
        storeCurrentUser(data.user);
        dispatch(setCurrentUser(data.user));
    }

    return res
}

export const logout = () => async (dispatch, getState) => {
    const res = await csrfFetch("/api/session", {
        method: 'DELETE'
    }).then(() => {
        storeCurrentUser(null);
        dispatch(removeCurrentUser());
    }).catch(error => {
        if (error.status === 401) {
            return endSession(getState().session.user.id, dispatch);
        }
    })

    return res
}

const initialState = {
    user: JSON.parse(sessionStorage.getItem('currentUser'))
}

const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return { ...state, user: action.user }
        case REMOVE_CURRENT_USER:
            return { ...state, user: null }
        default:
            return state
    }
}

export default sessionReducer;