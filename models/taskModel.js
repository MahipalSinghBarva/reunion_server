const mongoose = require("mongoose")


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Title is requires"],
    },
    startTime: {
        type: String,
        require: [true, "Statr Time is requires"],
    },
    endTime: {
        type: String,
        require: [true, "End Time is requires"],
    },
    priority: {
        type: String,
        require: [true, "End Time is requires"],
    },
    status: {
        type: String,
        require: [true, "End Time is requires"],
        enum: ["Pending", "Fineished"],
    }
})






module.exports = mongoose.model("Task", taskSchema)