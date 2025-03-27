import express from "express";
import db from "../utils/db.js";
const router = express.Router()


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
        res.json({ success: true, message: "Project added successfully" });
    } catch (error) {
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
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: "Error fetching projects" });
    }
});

// Update project status
router.post('/projects/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await db.promise().query(
            "UPDATE projects SET status = ?, pending = ? WHERE id = ?",
            [status, status === 'Pending', id]
        );
        res.json({ success: true, message: "Status updated" });
    } catch (error) {
        res.status(500).json({ error: "Error updating status" });
    }
});

// Add a comment to a project
router.post('/projects/:id/comment', async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    try {
        const [project] = await db.promise().query(
            "SELECT comments FROM projects WHERE id = ?", [id]
        );
        let updatedComments = project[0].comments ? project[0].comments + '\n' + comment : comment;

        await db.promise().query(
            "UPDATE projects SET comments = ? WHERE id = ?", [updatedComments, id]
        );
        res.json({ success: true, message: "Comment added" });
    } catch (error) {
        res.status(500).json({ error: "Error adding comment" });
    }
});

export { router as ProjectsRoutes };
