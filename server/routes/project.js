import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { addProject, deleteProject, getProject, getProjects, updateProject } from "../controllers/projects.js";

const router = express.Router();

router.get("/:id", checkAuth('superadmin'), getProject);
router.get("/projects", checkAuth('superadmin'), getProjects);
router.post("/addProject", checkAuth('superadmin'), addProject);
router.put("/updateProject/:id", checkAuth('superadmin'), updateProject);
router.delete("/deleteProject/:id", checkAuth('superadmin'), deleteProject);



export default router;