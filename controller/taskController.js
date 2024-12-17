const taskModel = require("../models/taskModel");
const Task = require("../models/taskModel")
const User = require("../models/userModel")


exports.addTask = async (req, res, next) => {
    const { title, startTime, endTime, priority, status } = req.body;

    if (!title || !startTime || !endTime || !priority || !status) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    try {
        const addtask = await Task.create({ title, startTime, endTime, priority, status });

        return res.status(201).json({
            message: "Task added successfully",
            addtask,
        });
    } catch (error) {
        console.error("Failed to add task", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

exports.getAllTask = async (req, res, next) => {
    const task = await Task.find()
    if (!task) {
        return res.status(400).json({
            message: "Task not found",
        });
    }
    return res.status(200).json({
        message: "Task data fetched successfully",
        task
    });
};

exports.deleteTask = async (req, res, next) => {
    const id = req.params.id;

    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        await Task.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.error("Failed to delete task", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

exports.updateTask = async (req, res, next) => {
    const { title, startTime, endTime, priority, status } = req.body;
    const { id } = req.params;

    if (!title || !startTime || !endTime || !priority || !status) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, startTime, endTime, priority, status },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        return res.status(200).json({
            message: "Task updated successfully",
            updatedTask,
        });
    } catch (error) {
        console.error("Failed to update task", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};




