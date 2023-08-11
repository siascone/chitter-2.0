import { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session.js';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(sessionActions.signup(({
            firstName,
            lastName,
            username,
            email,
            password
        })))
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
                    placeholder='First Name'
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder='Last Name'
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder='Username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                

                <button type="submit">Sign Up</button>
                <button onClick={demoLogin}>Demo Login</button>
            </form>
        </div>
    )
}

export default SignupForm