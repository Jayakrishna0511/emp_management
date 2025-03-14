import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../config'

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get(`${API_URL}/auth/logout`)
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate('/'); 
        }
      });
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-lg-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            {/* Logo */}
            <Link className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 text-white text-decoration-none" to="/dashboard">
              <span className="fs-4 fw-bolder d-none d-sm-inline">FLYING FOX LABS</span>
            </Link>

            {/* Sidebar Links */}
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center" id="menu">
              {/* Dashboard */}
              <li className="w-100">
                <Link className="nav-link text-white px-0 align-middle" to="/dashboard">
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>

              {/* Manage Employees */}
              <li className="w-100">
                <Link className="nav-link text-white px-0 align-middle" to="/dashboard/employee">
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Manage Employees</span>
                </Link>
              </li>

              {/* Profile */}
              <li className="w-100">
                <Link className="nav-link text-white px-0 align-middle" to="/dashboard/profile">
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>

              {/* Category */}
              <li className="w-100">
                <Link className="nav-link text-white px-0 align-middle" to="/dashboard/category">
                  <i className="fs-4 bi-list ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Category</span>
                </Link>
              </li>

              {/* Logout */}
              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link text-white px-0 align-middle">
                  <i className="fs-4 bi-box-arrow-right ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Employee Management System</h4>
          </div>
          <Outlet /> {/* Nested Routes will render here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
