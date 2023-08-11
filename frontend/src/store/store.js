import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import sessionReducer from './session';
import usersReducer from './users';

let enhancer;

if (import.meta.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger))
}

const rootReducer = combineReducers({
    session: sessionReducer,
    users: usersReducer
})

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;