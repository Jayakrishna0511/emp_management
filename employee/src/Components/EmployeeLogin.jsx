import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeLogin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:3000/employee/employee_login', values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem('valid', true);
          navigate('/employee_detail/' + result.data.id);
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded border  w-sm-75 w-md-50 w-lg-25 loginForm">
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

          {/* Button - Set width for large screens */}
          <button className="btn btn-success w-100 w-lg-50 rounded-0 mb-2">
            LOGIN
          </button>
          
          <div className="mb-1">
            <input type="checkbox" name="checkbox" id="checkbox" className="me-2" />
            <label htmlFor="password">Agree to Terms & Conditions</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;
