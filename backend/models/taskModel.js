import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },    
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['In Progress', 'Done', 'Not Started'],
      default: 'Not Started',
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model('Task', taskSchema);
