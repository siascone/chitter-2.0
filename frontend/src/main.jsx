import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.jsx'
import './index.css'
import csrfFetch, { restoreCSRF } from './store/csrf.js'

if (import.meta.env.NODE_ENV !== 'production') {
  window.csrfFetch = csrfFetch;
}

const renderApplication = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
}

if (sessionStorage.getItem('X-CSRF-Token') === null) {
  restoreCSRF().then(renderApplication);
} else {
  renderApplication();
}


