import { SET_CURRENT_USER, removeCurrentUser, storeCurrentUser, REMOVE_CURRENT_USER } from "./session";

const RECEIVE_USER = 'users/RECEIVE_USER';
const RECEIVE_USERS = 'users/RECEIVE_USERS';

export const receiveUser = user => {
    return {
        type: RECEIVE_USER,
        user
    }
}
export const receiveUsers = users => {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export const fetchAllUsers = () => async dispatch => {
    let res = await fetch('/api/users')
    let data = await res.json();
    dispatch(receiveUsers(data.users))
}

export const endSession = (currentUserId, dispatch) => {
    storeCurrentUser(null);
    return dispatch(removeCurrentUser(currentUserId));
}

const usersReducer = (state = {}, action) => {
    let nextState = { ...state }
    switch(action.type) {
        case SET_CURRENT_USER:
            nextState[action.userId] = action.user
            return nextState
        case RECEIVE_USERS:
            return { ...state, ...action.users }
        case REMOVE_CURRENT_USER:
            delete nextState[action.userId]
            return nextState
        default:
            return state
    }
}

export default usersReducer;