// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './EmployeeDetail.css';
// import { API_URL } from '../config';
// import FadeContent from '../Components/Animations/Animation.jsx';

// const EmployeeDetail = () => {
//   const [employee, setEmployee] = useState({});
//   const [categories, setCategories] = useState([]);
//   const [pendingStatus, setPendingStatus] = useState(true);
//   const [comment, setComment] = useState('');
//   const [savedComment, setSavedComment] = useState('');
//   const [statusModalOpen, setStatusModalOpen] = useState(false);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/employee/detail/${id}`)
//       .then(result => setEmployee(result.data[0]))
//       .catch(err => toast.error("Error fetching employee details."));
//   }, [id]);

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/auth/category`)
//       .then((result) => {
//         if (result.data.Status) {
//           setCategories(result.data.Result);
//         } else {
//           toast.error(result.data.Error);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const getCategoryName = (categoryId) => {
//     const category = categories.find((cat) => cat.id === categoryId);
//     return category ? category.name : "Unknown";
//   };

//   const handleLogout = () => {
//     axios.get(`${API_URL}/employee/logout`)
//       .then(result => {
//         if (result.data.Status) {
//           localStorage.removeItem("valid");
//           navigate('/');
//         }
//       })
//       .catch(err => toast.error("Logout failed."));
//   };

//   const handleStatusChange = (newStatus) => {
//     setPendingStatus(newStatus);
//     toast.success(`Status updated to ${newStatus ? 'Pending' : 'Completed'}.`);
//     setStatusModalOpen(false);
//   };

//   const handleSaveStatus = () => {
//     if (!comment.trim()) {
//       toast.error("Comment is required.");
//       return;
//     }
//     setSavedComment(comment);
//     toast.success("Status and comment saved.");
//     setStatusModalOpen(false);
//     setComment('');
//   };

//   const getGreetingMessage = () => {
//     const hour = new Date().getHours();
//     return hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
//   };

//   return (
//     <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
//       <div className="employee-detail-container">
//         <main className="employee-detail-main">
//           <header className="header">
//             <h2>{getGreetingMessage()}, {employee.name}</h2>
//           </header>

//           <div className="employee-detail-card">
//             <div className="employee-photo">
//               <img src={`${API_URL}/Images/${employee.image}`} alt={employee.name} />
//             </div>

//             <div className="employee-info">
//               <h3>name :{employee.name}</h3>
//               <p><strong>Email:</strong> {employee.email}</p>
//               <p><strong>Salary:</strong> ₹{employee.salary}</p>
//               <p><strong>Category:</strong> {getCategoryName(employee.category_id)}</p>

//               <div className="work-status">
//                 <h3><b>Work Status:</b></h3>
//                 <span className={`status ${pendingStatus ? 'pending' : 'completed'}`} onClick={() => setStatusModalOpen(true)}>
//                   {pendingStatus ? 'Pending' : 'Completed'}
//                 </span>
//                 {savedComment && (
//                   <div className="comment">
//                     <strong>Comment:</strong> <p>{savedComment}</p>
//                   </div>
//                 )}
//               </div>

//               <button className="logout-btn" onClick={handleLogout}>Logout</button>
//             </div>
//           </div>
//         </main>

//         {statusModalOpen && (
//           <div className="modal-overlay">
//             <div className="status-modal border">
//               <h4>Edit Work Status</h4>
//               <div className="status-buttons">
//                 <button className="btn pending" onClick={() => handleStatusChange(true)}>Pending</button>
//                 <button className="btn completed" onClick={() => handleStatusChange(false)}>Completed</button>
//               </div>

//               <textarea
//                 placeholder="Add comment..."
//                 value={comment}
//                 onChange={e => setComment(e.target.value)}
//                 className="status-comment"
//               />

//               <div className="modal-actions">
//                 <button className="btn save" onClick={handleSaveStatus}>Save</button>
//                 <button className="btn cancel" onClick={() => setStatusModalOpen(false)}>Cancel</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </FadeContent>
//   );
// };

// export default EmployeeDetail;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./EmployeeDetail.css";
// import { API_URL } from "../config";
// import FadeContent from "../Components/Animations/Animation.jsx";

// const EmployeeDetail = () => {
//   const [employee, setEmployee] = useState({});
//   const [categories, setCategories] = useState([]);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/employee/detail/${id}`)
//       .then((result) => setEmployee(result.data[0]))
//       .catch((err) => toast.error("Error fetching employee details."));
//   }, [id]);

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/auth/category`)
//       .then((result) => {
//         if (result.data.Status) {
//           setCategories(result.data.Result);
//         } else {
//           toast.error(result.data.Error);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const getCategoryName = (categoryId) => {
//     const category = categories.find((cat) => cat.id === categoryId);
//     return category ? category.name : "Unknown";
//   };

//   const handleLogout = () => {
//     axios
//       .get(`${API_URL}/employee/logout`)
//       .then((result) => {
//         if (result.data.Status) {
//           localStorage.removeItem("valid");
//           navigate("/");
//         }
//       })
//       .catch((err) => toast.error("Logout failed."));
//   };

//   const getGreetingMessage = () => {
//     const hour = new Date().getHours();
//     return hour < 12
//       ? "Good Morning"
//       : hour < 17
//       ? "Good Afternoon"
//       : "Good Evening";
//   };

//   return (
//     <FadeContent
//       blur={true}
//       duration={1000}
//       easing="ease-out"
//       initialOpacity={0}
//     >
//       <div className="employee-detail-container">
//         <main className="employee-detail-main">
//           <header className="header">
//             <h2>
//               {getGreetingMessage()}, {employee.name}
//             </h2>
//           </header>

//           <div className="employee-detail-card">
//             <div className="employee-photo">
//               <img
//                 src={`${API_URL}/Images/${employee.image}`}
//                 alt={employee.name}
//               />
//             </div>

//             <div className="employee-info">
//               <h3>Name: {employee.name}</h3>
//               <p>
//                 <strong>Email:</strong> {employee.email}
//               </p>
//               <p>
//                 <strong>Salary:</strong> ₹{employee.salary}
//               </p>
//               <p>
//                 <strong>Category:</strong>{" "}
//                 {getCategoryName(employee.category_id)}
//               </p>

//               <button
//                 className="projects-btn"
//                 onClick={() => navigate(`/employee/${id}/empprojects`)}
//               >
//                 Go to Projects
//               </button>

//               <button className="logout-btn" onClick={handleLogout}>
//                 Logout
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </FadeContent>
//   );
// };

// export default EmployeeDetail;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./EmployeeDetail.css";
import { API_URL } from "../config";
import FadeContent from "../Components/Animations/Animation.jsx";

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch Employee Details
  useEffect(() => {
    axios
      .get(`${API_URL}/employee/detail/${id}`)
      .then((res) => {
        setEmployee(res.data[0]);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching employee details.");
        setLoading(false);
      });
  }, [id]);

  // Fetch Categories Only If Needed
  useEffect(() => {
    if (!employee?.category_id) return;

    axios
      .get(`${API_URL}/auth/category`)
      .then((res) => {
        if (res.data.Status) {
          setCategories(res.data.Result);
        } else {
          toast.error(res.data.Error);
        }
      })
      .catch(() => toast.error("Error fetching categories."));
  }, [employee?.category_id]);

  // Get Category Name
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown";
  };

  // Handle Logout
  const handleLogout = () => {
    axios
      .get(`${API_URL}/employee/logout`)
      .then((res) => {
        if (res.data.Status) {
          localStorage.removeItem("valid");
          navigate("/");
        }
      })
      .catch(() => toast.error("Logout failed."));
  };

  // Get Greeting Message
  const getGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Show Loading State
  if (loading) {
    return <div className="loading">Loading employee details...</div>;
  }

  return (
    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <div className="employee-detail-container">
        <main className="employee-detail-main">
          <header className="header">
            <h2>{getGreetingMessage()}, {employee?.name}</h2>
          </header>

          <div className="employee-detail-card">
            <div className="employee-photo">
              <img
                src={employee?.image ? `${API_URL}/Images/${employee.image}` : "/placeholder.png"}
                alt={employee?.name || "Employee"}
              />
            </div>

            <div className="employee-info">
              <h3>Name: {employee?.name}</h3>
              <p><strong>Email:</strong> {employee?.email}</p>
              <p><strong>Salary:</strong> ₹{employee?.salary}</p>
              <p><strong>Category:</strong> {getCategoryName(employee?.category_id)}</p>

              <button
                className="projects-btn"
                onClick={() => navigate(`/employee/${id}/projects`)}
              >
                Go to Projects
              </button>

              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>
    </FadeContent>
  );
};

export default EmployeeDetail;
