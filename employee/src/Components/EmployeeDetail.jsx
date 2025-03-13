import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState({});
  const [pendingStatus, setPendingStatus] = useState(true);
  const [comment, setComment] = useState('');
  const [savedComment, setSavedComment] = useState('');  // To store saved comment
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/employee/detail/${id}`)
      .then((result) => {
        setEmployee(result.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleLogout = () => {
    axios.get('http://localhost:3000/employee/logout')
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  };

  const handleStatusChange = (newStatus) => {
    setPendingStatus(newStatus);
    toast.success(`Work status updated to ${newStatus ? 'Pending' : 'Completed'}.`);
    setStatusModalOpen(false);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSaveStatus = () => {
    if (comment.trim() === "") {
      toast.error("Please add a comment before saving the status.");
      return;
    }
    
    setSavedComment(comment);  // Save the comment to display it
    toast.success('Commented successfully!');  // Show success toast
    setStatusModalOpen(false);
    setComment('');  // Reset the comment input field
  };

  // Function to get the greeting message based on the time of day
  const getGreetingMessage = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="employee-detail-container">
      <div className="header">
        <h4>Employee Management System</h4>
      </div>

      <div className="greeting mt-3 text-center">
        <h2>{getGreetingMessage()}, {employee.name}!</h2>
      </div>

      <div className="employee-details d-flex justify-content-center flex-column align-items-center mt-5">
        <div className="employee-image">
          <img src={`http://localhost:3000/Images/` + employee.image} alt="Employee" className="emp-img" />
        </div>

        <div className="employee-info mt-4">
          <h3><strong>Name:</strong> {employee.name}</h3>
          <h3><strong>Email:</strong> {employee.email}</h3>
          <h3><strong>Salary:</strong> ₹{employee.salary}</h3>
        </div>

        <div className="pending-status mt-4">
          <h5>Work Status:</h5>
          <div className="status-circles">
            <div
              className={`status-circle ${pendingStatus ? 'pending' : 'completed'}`}
              onClick={() => setStatusModalOpen(true)}
            >
              {pendingStatus ? 'Pending' : 'Completed'}
            </div>
          </div>

          {/* Display the comment if saved */}
          {savedComment && (
            <div className="comment-section mt-3">
              <strong>Comment:</strong>
              <p>{savedComment}</p>
            </div>
          )}
        </div>

        <div className="action-buttons mt-4">
          <button className="btn btn-warning me-2" onClick={handleLogout}>LOGOUT</button>
        </div>
      </div>

      {statusModalOpen && (
        <div className="status-modal">
          <div className="modal-content">
            <h5>Edit Work Status</h5>
            <div>
              <button onClick={() => handleStatusChange(true)} className="btn btn-warning me-2">Pending</button>
              <button onClick={() => handleStatusChange(false)} className="btn btn-success">Completed</button>
            </div>
            <div className="mt-3">
              <textarea
                className="form-control"
                placeholder="Enter comment for the status change"
                value={comment}
                onChange={handleCommentChange}
              />
            </div>
            <div className="mt-3">
              <button className="btn btn-primary" onClick={handleSaveStatus}>Save Status</button>
              <button className="btn btn-secondary ms-2" onClick={() => setStatusModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetail;
