
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css';  

const Profile = () => {
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    role: '',
    lastLogin: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/verify', { withCredentials: true })
      .then(result => {
        if (result.data.Status) {
          setAdminData({
            name: result.data.name,
            email: result.data.email,
            role: result.data.role,
            lastLogin: result.data.lastLogin,
          });
        } else {
          toast.error('You must be logged in to view this page');
          navigate('/adminlogin');
        }
      })
      .catch(err => {
        toast.error('Failed to fetch admin details');
        navigate('/adminlogin');
      });
  }, [navigate]);

  return (
    <div className="profile-container">
      <Card className="profile-card">
        <Card.Body>
          <h2 className="profile-title">Admin Profile</h2>

          <div className="profile-details">
            <div className="profile-detail">
              <h5>Name: JAYAKRISHNA</h5>
            </div>
            <div className="profile-detail">
              <h5>Email:  admin@gmail.com {adminData.email}</h5>                       
            </div>
            <div className="profile-detail">
              <h5>Role: {adminData.role}</h5>
            </div>
            <div className="profile-detail">
              <h5>Last Login:  Recently{adminData.lastLogin}</h5>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
