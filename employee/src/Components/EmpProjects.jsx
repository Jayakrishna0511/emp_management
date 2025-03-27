import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../config.jsx";
import FadeContent from "../Components/Animations/Animation.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const EmpProjects = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/employee/${id}/projects`)
      .then((result) => setProjects(result.data))
      .catch(() => toast.error("Error fetching projects."));
  }, [id]);

  return (
    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <div className="container-fluid min-vh-100 d-flex flex-column align-items-center bg-light p-4">
        <header className="w-100 text-center bg-primary text-white py-3 rounded mb-4">
          <h2 className="fw-bold">Employee Projects</h2>
        </header>

        <div className="row w-100 justify-content-center">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div
                  className="card shadow-sm p-3 text-center border-0 project-card"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <div className="card-body">
                    <h4 className="fw-bold text-primary">{project.name}</h4>
                    <p className="mb-1">
                      <strong>Status:</strong> {project.status}
                    </p>
                    <p>
                      <strong>Pending:</strong> {project.pending ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted fs-5">No projects found.</p>
          )}
        </div>
        
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

      {/* Custom Styling */}
      <style>
        {`
          .project-card {
            background-color: #f8f9fa;
            transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
          }
          .project-card:hover {
            background-color: #e3f2fd;
            transform: scale(1.05);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </FadeContent>
  );
};

export default EmpProjects;
