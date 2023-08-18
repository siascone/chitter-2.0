import { setCurrentUser, storeCurrentUser } from "./session";

async function csrfFetch(url, options = {}) {
    options.method = options.method || 'GET';
    options.headers = options.headers || {};

    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
    }

    const res = await fetch(url, options);

    if (res.status >= 400) throw res;

    return res;
}

export function storeCSRFToken(res) {
    const csrfToken = res.headers.get('X-CSRF-Token');
    if (csrfToken) sessionStorage.setItem('X-CSRF-Token', csrfToken);
}

export const restoreCSRF = () => async dispatch => {
    debugger
    const res = await fetch('/api/session');
    storeCSRFToken(res);
    const data = await res.json();
    storeCurrentUser(data.user);
    if (data.user) {
        dispatch(setCurrentUser(data.user))
    }
    return res;
}

export default csrfFetch;