const Task = require("../models/Task");

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user._id;

        const task = await Task.create({
            title,
            description,
            userId
        });
        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({ userId });
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, description } = req.body;
        const userId = req.user._id;

        const task = await Task.findOneAndUpdate(
            { _id: taskId, userId },
            { title, description },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const userId = req.user._id;

        const task = await Task.findOneAndDelete({ _id: taskId, userId });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};