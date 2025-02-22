const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    priority: { type: String, required: true, enum: ['low', 'medium', 'high'], default: 'low' },
    deadline: Date,
    status: { type: String, enum: ['Pending', 'Progress', 'Completed'], default: 'Pending' },
    isPublic: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    collaborator: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
});
const TaskModel = mongoose.model("tasks", TaskSchema);
module.exports = TaskModel;