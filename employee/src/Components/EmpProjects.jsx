// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { API_URL } from '../config';
// import FadeContent from '../Components/Animations/Animation.jsx';
// // import './EmpProjects.css';

// const EmpProjects = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [employee, setEmployee] = useState({});
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     axios.get(`${API_URL}/employee/detail/${id}`)
//       .then(result => setEmployee(result.data[0]))
//       .catch(() => toast.error("Error fetching employee details."));
//   }, [id]);

// //   useEffect(() => {
// //     axios.get(`${API_URL}/employee/${id}/projects`)
// //       .then(result => setProjects(result.data))
// //       .catch(() => toast.error("Error fetching projects."));
// //   }, [id]);

//   return (
//     <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
//       <div className="emp-projects-container">
//         <header className="employee-header">
//           <h2>{employee.name}'s Projects</h2>
//           <p><strong>Email:</strong> {employee.email}</p>
//           <p><strong>Salary:</strong> ₹{employee.salary}</p>
//           <p><strong>Category:</strong> {employee.category}</p>
//           <button className="back-btn" onClick={() => navigate(-1)}>Back to Employee Details</button>
//         </header>

//         <div className="projects-grid">
//           {projects.length > 0 ? (
//             projects.map(project => (
//               <div key={project.id} className="project-card" onClick={() => navigate(`/projects/${project.id}`)}>
//                 <h3>{project.name}</h3>
//                 <p><strong>Status:</strong> {project.status}</p>
//                 <p><strong>Pending:</strong> {project.pending ? 'Yes' : 'No'}</p>
//               </div>
//             ))
//           ) : (
//             <p>No projects found.</p>
//           )}
//         </div>
//       </div>
//     </FadeContent>
//   );
// };

// export default EmpProjects;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from "../config.jsx";
import FadeContent from '../Components/Animations/Animation.jsx';
// import './EmpProjects.css';

const EmpProjects = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/employee/${id}/projects`)
      .then(result => setProjects(result.data))
      .catch(() => toast.error("Error fetching projects."));
  }, [id]);

  return (
    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <div className="emp-projects-container">
        <header className="employee-header">
          <h2>Employee Projects</h2>
          <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
        </header>

        <div className="projects-grid">
          {projects.length > 0 ? (
            projects.map(project => (
              <div key={project.id} className="project-card" onClick={() => navigate(`/projects/${project.id}`)}>
                <h3>{project.name}</h3>
                <p><strong>Status:</strong> {project.status}</p>
                <p><strong>Pending:</strong> {project.pending ? 'Yes' : 'No'}</p>
              </div>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>
      </div>
    </FadeContent>
  );
};

export default EmpProjects;
