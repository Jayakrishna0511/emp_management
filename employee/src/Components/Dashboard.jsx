import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import { AdminProjects } from './Projects';


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
      })
      .catch(error => console.error("Logout error:", error));
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">

        {/* Sidebar */}
        <div className="col-auto col-md-3 col-lg-2 px-0 bg-dark position-fixed top-0 bottom-0 start-0 min-vh-100"
             style={{ width: '18%' }}>
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
            
            {/* Logo */}
            <Link className="d-flex align-items-center pb-3 mb-3 text-white text-decoration-none w-100" to="/dashboard">
              <span className="fs-4 fw-bolder d-none d-sm-inline">FLYING FOX LABS</span>
            </Link>

            {/* Sidebar Links */}
            <ul className="nav nav-pills flex-column mb-auto w-100 align-items-center align-items-sm-start">
              <li className="w-100">
                <Link className="nav-link text-white px-3 d-flex align-items-center" to="/dashboard">
                  <i className="fs-4 bi bi-speedometer2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link className="nav-link text-white px-3 d-flex align-items-center" to="/dashboard/employee">
                  <i className="fs-4 bi bi-people"></i>
                  <span className="ms-2 d-none d-sm-inline">Manage Employees</span>
                </Link>
              </li>
              <li className="w-100">
                <Link className="nav-link text-white px-3 d-flex align-items-center" to="/dashboard/profile">
                  <i className="fs-4 bi bi-person"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100">
                <Link className="nav-link text-white px-3 d-flex align-items-center" to="/dashboard/category">
                  <i className="fs-4 bi bi-list"></i>
                  <span className="ms-2 d-none d-sm-inline">Category</span>
                </Link>
              </li>
        
              <li className="w-100">
                <Link className="nav-link text-white px-3 d-flex align-items-center" to="/dashboard/projects">
                <i className="fs-4 bi bi-folder"></i>
                  <span className="ms-2 d-none d-sm-inline">Projects</span>
                </Link>
              </li>
              <li className="w-100">
                <Link className="nav-link text-white px-3 d-flex align-items-center" to="/dashboard/employeeworkdetails">
                <i className="fs-4 bi bi-folder"></i>
                  <span className="ms-2 d-none d-sm-inline">Employee Work Details</span>
                </Link>
              </li>

              <li className="w-100 mt-auto">
                <button className="nav-link text-white px-3 d-flex align-items-center btn btn-link p-0 w-100"
                        onClick={handleLogout}>
                  <i className="fs-4 bi bi-box-arrow-right"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col p-0" style={{ marginLeft: '18%', height: '100vh', overflowY: 'auto' }}>
          <div className="p-3 shadow-sm d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Employee Management System</h5>
          </div>
          <div className="p-4">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;








