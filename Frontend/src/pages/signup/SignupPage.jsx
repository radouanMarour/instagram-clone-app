import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './SignupPage.scss';
import Logo from '../../images/logo.png';
import { register } from '../../apis/authApi';
import { setUser } from '../../redux/slices/authSlice';
import { LoginSpinner } from '../../icons';

function SignupPage() {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            email,
            fullName,
            userName,
            password,
            // bio: "",
            // posts: [],
            // followers: [],
            // following: []
        }
        try {
            setLoading(true)
            const { data } = await register(body);
            dispatch(setUser(data));
            navigate("/");
            setLoading(false)
        } catch (error) {
            setError(error.response.data.error)
            setLoading(false)
            console.log(error);
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
                    {error && <input type="submit"
                        value={error}
                        disabled
                        style={{ color: "red", fontSize: "0.7rem" }}
                    />}
                    <input
                        type="text"
                        value={email}
                        placeholder="Mobile number or email address"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        value={fullName}
                        placeholder="Full Name"
                        onChange={e => setFullName(e.target.value)}
                    />
                    <input
                        type="text"
                        value={userName}
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
                    <button type='submit'>{loading ? <LoginSpinner /> : "Sign Up"}</button>
                </form>
            </section>
            <div className='link'>
                <p>Have an account? <Link to="/login">Log in</Link></p>
            </div>
        </div>
    )
}

export default SignupPage