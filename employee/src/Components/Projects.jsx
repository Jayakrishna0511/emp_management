import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Projects.css";

export const AdminProjects = () => {
  const projects = [
    {
      name: "Multiplatform.one",
      startDate: "2023-01-15",
      progress: 80,
      bgClass: "bg1",
    },
    {
      name: "Data River",
      startDate: "2022-06-22",
      progress: 65,
      bgClass: "bg2",
    },
    {
      name: "Self-Hosted Cloud",
      startDate: "2021-11-05",
      progress: 90,
      bgClass: "bg-secondary",
    },
    {
      name: "Employee Management System",
      startDate: "2024-02-10",
      progress: 50,
      bgClass: "bg4",
    },
  ];

  const [selectedProject, setSelectedProject] = useState(null);

  // Project quotes
  const projectQuotes = {
    "Multiplatform.one": "Bridging platforms for seamless integration.",
    "Data River": "Data flows like a river, shaping the digital landscape.",
    "Self-Hosted Cloud": "Empower yourself with self-managed cloud solutions.",
    "Employee Management System": "Efficiency starts with smart management.",
  };

  return (
    <div
      className={`animated-bg ${
        selectedProject ? selectedProject.bgClass : ""
      }`}
      style={{ minHeight: "100vh", padding: "40px 20px" }}
    >
      <h1 className="text-center fw-bold text-black mb-4">📁 Projects</h1>

      <div className="container">
        {selectedProject ? (
          // Display selected project details with animation
          <div
            className={`card p-5 text-center shadow-lg fade-in animated-bg ${selectedProject.bgClass}`}
            style={{
              maxWidth: "600px",
              width: "100%",
              borderRadius: "12px",
              color: "#fff",
              margin: "0 auto",
            }}
          >
            <h2 className="fw-bold">{selectedProject.name}</h2>
            <p>
              <i className="bi bi-calendar"></i> <strong>Started On:</strong>{" "}
              {selectedProject.startDate}
            </p>
            <blockquote className="blockquote">
              <p>
                {projectQuotes[selectedProject.name] ||
                  "Innovation at its best."}
              </p>
            </blockquote>
            <div className="mt-3">
              <p className="fw-bold">Completion: {selectedProject.progress}%</p>
              <div
                className="progress"
                style={{ height: "15px", borderRadius: "10px" }}
              >
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  style={{
                    width: `${selectedProject.progress}%`,
                    backgroundColor: "#28a745",
                    borderRadius: "10px",
                  }}
                ></div>
              </div>
            </div>
            <button
              className="btn btn-outline-light mt-4 fade-in"
              onClick={() => setSelectedProject(null)}
            >
              <i className="bi bi-arrow-left"></i> Back to Projects
            </button>
          </div>
        ) : (
          // Display project cards with animation
          <div className="row g-4 justify-content-center fade-in">
            {projects.map((project, index) => (
              <div key={index} className="col-12 col-sm-6 col-lg-5 d-flex">
                <div
                  className={`card flex-fill shadow-lg text-center animated-bg ${project.bgClass}`}
                  style={{
                    cursor: "pointer",
                    minHeight: "30vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "12px",
                    color: "#fff",
                    width: "100%",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onClick={() => setSelectedProject(project)}
                >
                  <h2 className="fw-bold">{project.name}</h2>
                  <p className="mt-3 fw-semibold">
                    Completed: {project.progress}%
                  </p>
                  <div
                    className="progress w-75"
                    style={{
                      height: "10px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(255,255,255,0.3)",
                    }}
                  >
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      style={{
                        width: `${project.progress}%`,
                        backgroundColor: "#2ecc71",
                        borderRadius: "10px",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminProjects;
