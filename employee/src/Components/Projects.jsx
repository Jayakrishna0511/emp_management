// import React, { useState } from "react";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import "./Projects.css";

// export const AdminProjects = () => {
//   const projects = [
//     {
//       name: "Multiplatform.one",
//       startDate: "2023-01-15",
//       progress: 80,
//       bgClass: "bg1",
//     },
//     {
//       name: "Data River",
//       startDate: "2022-06-22",
//       progress: 65,
//       bgClass: "bg2",
//     },
//     {
//       name: "Self-Hosted Cloud",
//       startDate: "2021-11-05",
//       progress: 90,
//       bgClass: "bg-secondary",
//     },
//     {
//       name: "Employee Management System",
//       startDate: "2024-02-10",
//       progress: 50,
//       bgClass: "bg4",
//     },
//   ];

//   const [selectedProject, setSelectedProject] = useState(null);

//   // Project quotes
//   const projectQuotes = {
//     "Multiplatform.one": "Bridging platforms for seamless integration.",
//     "Data River": "Data flows like a river, shaping the digital landscape.",
//     "Self-Hosted Cloud": "Empower yourself with self-managed cloud solutions.",
//     "Employee Management System": "Efficiency starts with smart management.",
//   };

//   return (
//     <div
//       className={`animated-bg ${
//         selectedProject ? selectedProject.bgClass : ""
//       }`}
//       style={{ minHeight: "100vh", padding: "40px 20px" }}
//     >
//       <h1 className="text-center fw-bold text-black mb-4">📁 Projects</h1>

//       <div className="container">
//         {selectedProject ? (
//           // Display selected project details with animation
//           <div
//             className={`card p-5 text-center shadow-lg fade-in animated-bg ${selectedProject.bgClass}`}
//             style={{
//               maxWidth: "600px",
//               width: "100%",
//               borderRadius: "12px",
//               color: "#fff",
//               margin: "0 auto",
//             }}
//           >
//             <h2 className="fw-bold">{selectedProject.name}</h2>
//             <p>
//               <i className="bi bi-calendar"></i> <strong>Started On:</strong>{" "}
//               {selectedProject.startDate}
//             </p>
//             <blockquote className="blockquote">
//               <p>
//                 {projectQuotes[selectedProject.name] ||
//                   "Innovation at its best."}
//               </p>
//             </blockquote>
//             <div className="mt-3">
//               <p className="fw-bold">Completion: {selectedProject.progress}%</p>
//               <div
//                 className="progress"
//                 style={{ height: "15px", borderRadius: "10px" }}
//               >
//                 <div
//                   className="progress-bar progress-bar-striped progress-bar-animated"
//                   role="progressbar"
//                   style={{
//                     width: `${selectedProject.progress}%`,
//                     backgroundColor: "#28a745",
//                     borderRadius: "10px",
//                   }}
//                 ></div>
//               </div>
//             </div>
//             <button
//               className="btn btn-outline-light mt-4 fade-in"
//               onClick={() => setSelectedProject(null)}
//             >
//               <i className="bi bi-arrow-left"></i> Back to Projects
//             </button>
//           </div>
//         ) : (
//           // Display project cards with animation
//           <div className="row g-4 justify-content-center fade-in">
//             {projects.map((project, index) => (
//               <div key={index} className="col-12 col-sm-6 col-lg-5 d-flex">
//                 <div
//                   className={`card flex-fill shadow-lg text-center animated-bg ${project.bgClass}`}
//                   style={{
//                     cursor: "pointer",
//                     minHeight: "30vh",
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     borderRadius: "12px",
//                     color: "#fff",
//                     width: "100%",
//                     transition: "transform 0.3s ease-in-out",
//                   }}
//                   onClick={() => setSelectedProject(project)}
//                 >
//                   <h2 className="fw-bold">{project.name}</h2>
//                   <p className="mt-3 fw-semibold">
//                     Completed: {project.progress}%
//                   </p>
//                   <div
//                     className="progress w-75"
//                     style={{
//                       height: "10px",
//                       borderRadius: "10px",
//                       backgroundColor: "rgba(255,255,255,0.3)",
//                     }}
//                   >
//                     <div
//                       className="progress-bar progress-bar-striped progress-bar-animated"
//                       role="progressbar"
//                       style={{
//                         width: `${project.progress}%`,
//                         backgroundColor: "#2ecc71",
//                         borderRadius: "10px",
//                       }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default AdminProjects;




import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Projects.css";
import { API_URL } from "../config.jsx"; // Ensure this points to your backend

export const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProject, setNewProject] = useState({
    name: "",
    employee_id: "",
    status: "Pending",
    pending: true,
    comments: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/projects`, newProject);
      if (response.data.success) {
        fetchProjects(); // Refresh the projects list
        setNewProject({ name: "", employee_id: "", status: "Pending", pending: true, comments: "" });
      }
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <div className={`animated-bg ${selectedProject ? selectedProject.bgClass : ""}`} style={{ minHeight: "100vh", padding: "40px 20px" }}>
      <h1 className="text-center fw-bold text-black mb-4">📁 Projects</h1>

      <div className="container">
        {selectedProject ? (
          <div className={`card p-5 text-center shadow-lg fade-in animated-bg ${selectedProject.bgClass}`} style={{ maxWidth: "600px", width: "100%", borderRadius: "12px", color: "#fff", margin: "0 auto" }}>
            <h2 className="fw-bold">{selectedProject.name}</h2>
            <p><i className="bi bi-calendar"></i> <strong>Started On:</strong> {selectedProject.startDate}</p>
            <blockquote className="blockquote"><p>{selectedProject.comments || "No comments available."}</p></blockquote>
            <p className="fw-bold">Completion: {selectedProject.progress || 0}%</p>
            <div className="progress" style={{ height: "15px", borderRadius: "10px" }}>
              <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${selectedProject.progress || 0}%`, backgroundColor: "#28a745", borderRadius: "10px" }}></div>
            </div>
            <button className="btn btn-outline-light mt-4 fade-in" onClick={() => setSelectedProject(null)}>
              <i className="bi bi-arrow-left"></i> Back to Projects
            </button>
          </div>
        ) : (
          <>
            <div className="row g-4 justify-content-center fade-in">
              {projects.map((project, index) => (
                <div key={index} className="col-12 col-sm-6 col-lg-5 d-flex">
                  <div className={`card flex-fill shadow-lg text-center animated-bg bg1`} style={{ cursor: "pointer", minHeight: "30vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: "12px", color: "#fff", width: "100%", transition: "transform 0.3s ease-in-out" }} onClick={() => setSelectedProject(project)}>
                    <h2 className="fw-bold">{project.name}</h2>
                    <p className="mt-3 fw-semibold">Completed: {project.progress || 0}%</p>
                    <div className="progress w-75" style={{ height: "10px", borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.3)" }}>
                      <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${project.progress || 0}%`, backgroundColor: "#2ecc71", borderRadius: "10px" }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Project Form */}
            <div className="card p-4 mt-5 shadow-lg fade-in" style={{ maxWidth: "600px", margin: "0 auto", borderRadius: "12px" }}>
              <h3 className="fw-bold text-center">Add New Project</h3>
              <form onSubmit={handleAddProject}>
                <div className="mb-3">
                  <label className="form-label">Project Name</label>
                  <input type="text" name="name" className="form-control" value={newProject.name} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Employee ID</label>
                  <input type="number" name="employee_id" className="form-control" value={newProject.employee_id} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select name="status" className="form-control" value={newProject.status} onChange={handleInputChange}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Comments</label>
                  <textarea name="comments" className="form-control" rows="3" value={newProject.comments} onChange={handleInputChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Project</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
