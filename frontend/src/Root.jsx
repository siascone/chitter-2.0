import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import configureStore from './store/store.js'

const store = configureStore();

if (import.meta.env.NODE_ENV !== 'production') {
    window.store = store;
}

function Root() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
}

export default Root;

// TODO - Wrapping fetch requests with CSRF