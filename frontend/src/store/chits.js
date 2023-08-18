import csrfFetch from "./csrf";

const RECEIVE_CHIT = 'chits/RECEIVE_CHIT';
const RECEIVE_CHITS = 'chits/RECEIVE_CHITS';
const REMOVE_CHIT = 'chits/REMOVE_CHIT';

export const receiveChit = chit => {
    return {
        type: RECEIVE_CHIT,
        chit
    }
}

export const receiveChits = chits => {
    return {
        type: RECEIVE_CHITS,
        chits
    }
}

export const removeChit = chitId => {
    return {
        type: REMOVE_CHIT,
        chitId
    }
}

export const fetchChit = (chitId) => async dispatch => {
    let res = await fetch(`/api/chits/${chitId}`);
    let data = await res.json();

    dispatch(receiveChit(data.chit))
}

export const fetchAllChits = () => async dispatch => {

    let res = await fetch('/api/chits');
    let data = await res.json();
    dispatch(receiveChits(data.chits));
}

export const createChit = (chit) => async dispatch => {
    let res = await csrfFetch('/api/chits', { 
        method: 'POST', 
        body: JSON.stringify(chit)
    })
    let data = await res.json();

    dispatch(receiveChit(data.chit))
}

export const updateChit = ({chitId, body}) => async dispatch => {
    let res = await csrfFetch(`/api/chits${chitId}`, { 
        method: 'PATCH',
        body: JSON.stringify({body: body}) 
    })
    let data = await res.json();

    dispatch(receiveChit(data.chit))
}

export const deleteChit = (chitId) => async dispatch => {
    let res = await csrfFetch(`/api/chits/${chitId}`);
    // let data = await res.json();

    dispatch(removeChit(chitId))

    // return data;
}

const chitsReducer = (state = {}, action) => {
    let nextState = { ...state }

    switch(action.type) {
        case RECEIVE_CHIT:
            nextState[action.chit.id] = action.chit
            return nextState
        case RECEIVE_CHITS:
            return { ...nextState, ...action.chits }
        case REMOVE_CHIT:
            delete nextState[action.chitId]
            return nextState
        default:
            return state
    }
}

export default chitsReducer

