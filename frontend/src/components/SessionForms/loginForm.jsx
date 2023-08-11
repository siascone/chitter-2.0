import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as sessionActions from '../../store/session.js';

function LoginForm () {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(sessionActions.login(({ credential, password })))
            .then(() => {
                navigate('/feed')
            })
            .catch(async res => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }

                if (data?.errors) {
                    setErrors(data.errors)
                } else if (data) {
                    setErrors([data])
                } else {
                    setErrors([res.statusText])
                }
            })
    }

    const demoLogin = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(sessionActions.login({
            credential: 'mmoss@ri.io',
            password: 'didYouSeeThatLudicrousDisplayLastNight'
        })).then(() => {
            navigate('/feed')
        })
    }

    return (
        <div>
            <h2>Welcome Back</h2>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>

                <input 
                    type="text"
                    placeholder='Username or Email'
                    value={credential}
                    onChange={e => setCredential(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Log In</button>
                <button onClick={demoLogin}>Demo Login</button>
            </form>
        </div>
    )
}

export default LoginForm