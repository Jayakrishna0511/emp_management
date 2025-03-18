import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css';  
import { API_URL } from '../config';
import { useCookies } from "react-cookie";

const Profile = () => {
  const [cookies] = useCookies(["token"]);
  
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    role: '',
    lastLogin: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const result = await axios.get(`${API_URL}/auth/verify`,{
          headers: {
            Authorization: `Bearer ${cookies.token}`  
        }
        }
          
        )
        console.log(result);
        if (result.data.role==="admin") {
          setAdminData({
            name: result.data.name,
            email: result.data.email,
            role: result.data.role,
            lastLogin: result.data.lastLogin,
          });
        } else {
          // toast.error('You must be logged in to view this page.');
          // navigate('/adminlogin');
        }
      } catch (error) {
        // toast.error('Failed to fetch admin details. Please try again.');
        // if (error.response && error.response.status === 401) {
          // navigate('/adminlogin');
        // }
      }
    };

    fetchAdminData();
  }, [navigate]);

  return (
    <div className="profile-container">
      <Card className="profile-card">
        <Card.Body>
          <h2 className="profile-title">Admin Profile</h2>
          <div className="profile-details">
            <div className="profile-detail">
              <h5>Name: {adminData.name}</h5>
            </div>
            <div className="profile-detail">
              <h5>Email: {adminData.email}</h5>
            </div>
            <div className="profile-detail">
              <h5>Role: {adminData.role}</h5>
            </div>
            <div className="profile-detail">
              <h5>
                Last Login: {adminData.lastLogin
                  ? new Date(adminData.lastLogin).toLocaleString()
                  : 'N/A'}
              </h5>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;


