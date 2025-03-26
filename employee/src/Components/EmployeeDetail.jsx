
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EmployeeDetail.css';
import { API_URL } from '../config';
import FadeContent from '../Components/Animations/Animation.jsx'

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState({});
  const [pendingStatus, setPendingStatus] = useState(true);
  const [comment, setComment] = useState('');
  const [savedComment, setSavedComment] = useState('');
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/employee/detail/${id}`)
      .then(result => setEmployee(result.data[0]))
      .catch(err => toast.error("Error fetching employee details."));
  }, [id]);

  const handleLogout = () => {
    axios.get(`${API_URL}/employee/logout`)
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate('/');
        }
      })
      .catch(err => toast.error("Logout failed."));
  };

  const handleStatusChange = (newStatus) => {
    setPendingStatus(newStatus);
    toast.success(`Status updated to ${newStatus ? 'Pending' : 'Completed'}.`);
    setStatusModalOpen(false);
  };

  const handleSaveStatus = () => {
    if (!comment.trim()) {
      toast.error("Comment is required.");
      return;
    }
    setSavedComment(comment);
    toast.success("Status and comment saved.");
    setStatusModalOpen(false);
    setComment('');
  };

  const getGreetingMessage = () => {
    const hour = new Date().getHours();
    return hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  };

  return (
      <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
    <div className="employee-detail-container">
      <main className="employee-detail-main">
        <header className="header">
          <h2>{getGreetingMessage()}, {employee.name}</h2>
        </header>

        <div className="employee-detail-card">
          <div className="employee-photo">
            <img src={`${API_URL}/Images/${employee.image}`} alt={employee.name} />
          </div>
          
          <div className="employee-info">
            <h3>{employee.name}</h3>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Salary:</strong> ₹{employee.salary}</p>

            <div className="work-status">
              <h3><b>work status:</b></h3>
              <span className={`status ${pendingStatus ? 'pending' : 'completed'}`} onClick={() => setStatusModalOpen(true)}>
                {pendingStatus ? 'Pending' : 'Completed'}
              </span>
              {savedComment && (
                <div className="comment">
                  <strong>Comment:</strong> <p>{savedComment}</p>
                </div>
              )}
            </div>
            
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </main>

      {statusModalOpen && (
        <div className="modal-overlay">
          <div className="status-modal border">
            <h4>Edit Work Status</h4>
            <div className="status-buttons">
              <button className="btn pending" onClick={() => handleStatusChange(true)}>Pending</button>
              <button className="btn completed" onClick={() => handleStatusChange(false)}>Completed</button>
            </div>
            
            <textarea 
              placeholder="Add comment..." 
              value={comment} 
              onChange={e => setComment(e.target.value)} 
              className="status-comment"
            />

            <div className="modal-actions">
              <button className="btn save" onClick={handleSaveStatus}>Save</button>
              <button className="btn cancel" onClick={() => setStatusModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
      </FadeContent>
  );
};

export default EmployeeDetail;
