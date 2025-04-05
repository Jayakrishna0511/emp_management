import express from "express";
import db from "../utils/db.js";
const router = express.Router();



//  [ADDED] Get all projects for admin
router.get('/projects', async (req, res) => {
    try {
        const [projects] = await db.promise().query("SELECT * FROM projects");
        res.json(projects);
    } catch (error) {
        console.error("Error fetching all projects:", error);
        res.status(500).json({ error: "Error fetching all projects" });
    }
});


// Add a new project
router.post('/projects', async (req, res) => {
    const { name, status, pending, comments, employee_id } = req.body;

    if (!name || !employee_id) {
        return res.status(400).json({ error: "Project name and employee ID are required" });
    }

    try {
        await db.promise().query(
            "INSERT INTO projects (name, status, pending, comments, employee_id) VALUES (?, ?, ?, ?, ?)",
            [name, status || 'Pending', pending || false, comments || '', employee_id]
        );
        res.status(201).json({ success: true, message: "Project added successfully" });
    } catch (error) {
        console.error("Error adding project:", error);
        res.status(500).json({ error: "Error adding project" });
    }
});

// Get all projects assigned to a specific employee
router.get('/employee/:id/projects', async (req, res) => {
    const { id } = req.params;
    
    try {
        const [projects] = await db.promise().query(
            "SELECT * FROM projects WHERE employee_id = ?", [id]
        );

        if (projects.length === 0) {
            return res.status(404).json({ message: "No projects found for this employee." });
        }

        res.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Error fetching projects" });
    }
});

// Update project status
router.put('/projects/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const [result] = await db.promise().query(
            "UPDATE projects SET status = ?, pending = ? WHERE id = ?",
            [status, status === 'Pending', id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.json({ success: true, message: "Status updated successfully" });
    } catch (error) {
        console.error("Error updating project status:", error);
        res.status(500).json({ error: "Error updating project status" });
    }
});

// Add a comment to a project
router.put('/projects/:id/comment', async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    if (!comment) {
        return res.status(400).json({ error: "Comment cannot be empty" });
    }

    try {
        const [project] = await db.promise().query(
            "SELECT comments FROM projects WHERE id = ?", [id]
        );

        if (project.length === 0) {
            return res.status(404).json({ error: "Project not found" });
        }

        let updatedComments = project[0].comments
            ? `${project[0].comments}\n${comment}`
            : comment;

        await db.promise().query(
            "UPDATE projects SET comments = ? WHERE id = ?", [updatedComments, id]
        );

        res.json({ success: true, message: "Comment added successfully" });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Error adding comment" });
    }
});

// to edit the comment
router.put('/projects/:id/update-comment', async (req, res) => {
    const { id } = req.params;
    const { comment, index } = req.body;

    if (!comment) {
        return res.status(400).json({ error: "Comment cannot be empty" });
    }

    try {
        // Fetch existing comments
        const [project] = await db.promise().query(
            "SELECT comments FROM projects WHERE id = ?", [id]
        );

        if (project.length === 0) {
            return res.status(404).json({ error: "Project not found" });
        }

        // Convert comments to array
        let commentsArray = project[0].comments ? project[0].comments.split("\n") : [];

        if (index < 0 || index >= commentsArray.length) {
            return res.status(400).json({ error: "Invalid comment index" });
        }

        // Update the specific comment
        commentsArray[index] = comment.trim();

        // Convert array back to string and update in DB
        const updatedComments = commentsArray.join("\n");

        await db.promise().query(
            "UPDATE projects SET comments = ? WHERE id = ?", [updatedComments, id]
        );

        res.json({ success: true, message: "Comment updated successfully", updatedComments });
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({ error: "Error updating comment" });
    }
});

// Fetch all employees with their assigned projects
router.get('/employees/work-details', async (req, res) => {
    try {
        const [employees] = await db.promise().query(
            `SELECT e.id AS employee_id, e.name AS employee_name, e.email,
                    p.id AS project_id, p.name AS project_name, 
                    p.status, p.pending, p.comments
             FROM employee e
             LEFT JOIN projects p ON e.id = p.employee_id`
        );

        // Group projects under their respective employees
        const employeeMap = {};

        employees.forEach(row => {
            if (!employeeMap[row.employee_id]) {
                employeeMap[row.employee_id] = {
                    id: row.employee_id,
                    name: row.employee_name,
                    email: row.email,
                    projects: []
                };
            }

            if (row.project_id) {
                employeeMap[row.employee_id].projects.push({
                    id: row.project_id,
                    name: row.project_name,
                    status: row.status,
                    pending: row.pending,
                    comments: row.comments
                });
            }
        });

        const result = Object.values(employeeMap);
        res.json(result);
    } catch (error) {
        console.error("Error fetching employee work details:", error);
        res.status(500).json({ error: "Error fetching employee work details" });
    }
});

export { router as ProjectsRoutes };
