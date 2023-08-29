import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.scss';
import Logo from '../../images/logo.png';
import Img1 from '../../images/login-img1.png';
import Img2 from '../../images/login-img2.png';
import { login } from '../../apis/authApi';
import { setUser } from '../../redux/slices/authSlice';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            email,
            password
        }
        try {
            const data = await login(body);
            setUser(data);
            navigate("/");
            setSuccess("Logged in successfully")
        } catch (error) {
            setError(error)
        }
    }

    return (
        <>
            <div className="login-slide">
                <img className="f-img" src={Img1} alr="" />
                <img className="l-img" src={Img2} alr="" />
            </div>
            <div className='login-form'>
                <section className='login'>
                    <img src={Logo} alt="" />
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={email}
                            placeholder="Mobile number or email address"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button type='submit'>Log In</button>
                    </form>
                    <div className='separator'>
                        <span>OR</span>
                    </div>
                    <div className='facebook-login'>
                        <button>Log in with Facebook</button>
                        <a href="#">Forgotten your password?</a>
                    </div>
                </section>
                <div className='link'>
                    <p>Don't have an account? <Link to="/accounts/emailsignup">Sign up</Link></p>
                </div>
            </div>
        </>
    )
}

export default LoginPage