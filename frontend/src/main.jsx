import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.jsx'
import './index.css'
import csrfFetch, { restoreCSRF } from './store/csrf.js'
import * as sessionActions from './store/session.js'

if (import.meta.env.NODE_ENV !== 'production') {
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions
  window.restoreCSRF = restoreCSRF
}

const renderApplication = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
}

if (sessionStorage.getItem('X-CSRF-Token') === null) {
  // store gets added to window by instansiation of <Root />
  store.dispatch(restoreCSRF()).then(renderApplication);
} else {
  renderApplication();
}


