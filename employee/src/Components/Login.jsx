import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';  
import { API_URL } from '../config';


const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${API_URL}/auth/adminlogin`, values)
            .then(result => {
                if (result.data.loginStatus) {
                    localStorage.setItem("valid", true); 
                    navigate('/dashboard');
                } else {
                    setError(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    const handleGuestLogin = () => {
        localStorage.setItem("valid", true); 
        navigate('/dashboard');  
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
            <div className="p-3 rounded border loginForm  w-sm-75 w-md-50 w-lg-50">
                <div className="text-warning">
                    {error && error}
                </div>
                <h2 className="text-center">Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email :</strong></label>
                        <input
                            className="form-control rounded-0"
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password :</strong></label>
                        <input
                            className="form-control rounded-0"
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                        />
                    </div>
                    <button className="btn btn-success w-100 rounded-0 mb-2">LOGIN</button>
                    <div className="mb-1">
                        <input type="checkbox" name="checkbox" id="checkbox" className="me-2" />
                        <label htmlFor="checkbox">Agree Terms & Conditions</label>
                    </div>
                </form>

                {/* Guest Login Button */}
                <button
                    className="btn btn-primary w-100 rounded-0 mt-3"
                    onClick={handleGuestLogin}
                >
                    Login as Guest
                </button>
            </div>
        </div>
    );
};

export default Login;
