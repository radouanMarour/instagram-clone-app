import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignupPage.scss';
import Logo from '../../images/logo.png';
import { register } from '../../apis/authApi';
import { setUser } from '../../redux/slices/authSlice';

function SignupPage() {
    const [email, setEmail] = useState("");
    const [fname, setFname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            email,
            fname,
            username,
            password,
            posts: [],
            followers: [],
            following: []
        }
        try {
            const data = await register(body);
            setUser(data);
        } catch (error) {
            setError(error)
        }
    }

    return (
        <div className='signup-form'>
            <section className='signup'>
                <img src={Logo} alt="" />
                <p>Sign up to see photos and videos from your friends.</p>
                <button>Log in with Facebook</button>
                <div className='separator'>
                    <span>OR</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={email}
                        placeholder="Mobile number or email address"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        value={fname}
                        placeholder="Full Name"
                        onChange={e => setFname(e.target.value)}
                    />
                    <input
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <p>People who use our service may have uploaded your contact information to Instagram. Learn more</p>
                    <p>By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.</p>
                    <button type='submit'>Sign Up</button>
                </form>
            </section>
            <div className='link'>
                <p>Have an account? <Link to="/login">Log in</Link></p>
            </div>
        </div>
    )
}

export default SignupPage