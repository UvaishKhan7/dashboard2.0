import mongoose from 'mongoose';
import Project from '../models/Project.js';

// add a new project
export const addProject = async (req, res) => {
    const addProject = new Project({
        _id: new mongoose.Types.ObjectId,
        clientName: req.body.clientName,
        clientId: req.body.clientId,
        email: req.body.email,
        phone: req.body.phone,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        timestamps: true
    });
    await addProject.save()
        .then((result) => {
            res.status(201).json({ new_project: result });
        })
        .catch(error => {
            res.status(404).json({ message: error.message });
        });
};

// Get a project's data with id
export const getProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        res.status(200).json(project);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get all projects data
export const getProjects = async (req, res) => {
    try {
        const projects = await Project;
        res.status(200).json(projects);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Update a project's data with id
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Delete a project's data with id
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await Project.findByIdAndDelete(id);
        res.status(200).json(deletedProject);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};