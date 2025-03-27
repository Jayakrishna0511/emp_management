import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../config.jsx"
import FadeContent from "../Components/Animations/Animation.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/projects/${id}`)
      .then((result) => setProject(result.data))
      .catch(() => toast.error("Error fetching project details."));
  }, [id]);

  const handleStatusChange = (status) => {
    axios
      .put(`${API_URL}/api/projects/${id}/status`, { status })
      .then(() => {
        toast.success("Status updated!");
        setProject({ ...project, status });
      })
      .catch(() => toast.error("Error updating status."));
  };

  const handleAddComment = () => {
    if (!comment.trim()) return toast.error("Comment cannot be empty.");

    axios
      .put(`${API_URL}/api/projects/${id}/comment`, { comment })
      .then(() => {
        toast.success("Comment added!");
        setProject({ ...project, comments: [...project.comments, comment] });
        setComment("");
      })
      .catch(() => toast.error("Error adding comment."));
  };

  return (
    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <div className="container-fluid min-vh-100 d-flex flex-column align-items-center bg-light p-4">
        <div className="card shadow-lg p-4 w-75 bg-white rounded">
          <h2 className="text-center text-primary fw-bold">Project: {project.name}</h2>
          <p className="text-center fs-5">
            <strong>Status:</strong>{" "}
            <span className={`badge ${project.status === "Completed" ? "bg-success" : "bg-warning"}`}>
              {project.status}
            </span>
          </p>

          <div className="d-flex justify-content-center gap-3 my-3">
            <button className="btn btn-warning fw-bold" onClick={() => handleStatusChange("Pending")}>
              Mark Pending
            </button>
            <button className="btn btn-success fw-bold" onClick={() => handleStatusChange("Completed")}>
              Mark Completed
            </button>
          </div>

          <h3 className="mt-4 text-secondary">Comments</h3>
          <div className="mb-3">
            <textarea
              className="form-control"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              rows="3"
            />
          </div>
          <button className="btn btn-primary w-100 fw-bold" onClick={handleAddComment}>
            Add Comment
          </button>

          <div className="comments-section mt-4">
            {project.comments?.length > 0 ? (
              project.comments.map((cmt, index) => (
                <div key={index} className="comment-card p-2 my-2 rounded">
                  {cmt}
                </div>
              ))
            ) : (
              <p className="text-muted">No comments yet.</p>
            )}
          </div>

          <button className="btn btn-secondary mt-4 w-100" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>

      {/* Custom Styling */}
      <style>
        {`
          .comment-card {
            background-color: #f8f9fa;
            border-left: 5px solid #0d6efd;
            padding: 10px;
            transition: transform 0.2s ease-in-out;
          }
          .comment-card:hover {
            transform: scale(1.02);
            background-color: #e9ecef;
          }
        `}
      </style>
    </FadeContent>
  );
};

export default ProjectDetails;
