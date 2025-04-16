import Task from '../models/Task.js';

// Create a new task
export const createTask = async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  try {
    // Set default status if not provided
    const newStatus = status || 'pending';  // Default status is 'pending'

    // Create a new task with status
    const task = await Task.create({
      title,
      description,
      dueDate,
      status: newStatus,  // Set the status field
      userId: req.userId,  // Ensure task is tied to the authenticated user
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export const createTask = async (req, res) => {
//   const { title, description, dueDate } = req.body;
//   try {
//     const task = await Task.create({ title, description, dueDate, userId: req.userId });
//     // console.log(userId)
//     res.status(201).json(task);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Update an existing task by ID
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, status } = req.body;  // Include status in the body

  try {
    // Find the task by ID and userId to ensure the user can only update their own tasks
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId },  // Filter by task id and user id
      {
        title,
        description,
        dueDate,
        status,  // Update status if provided
      },
      { new: true }  // Return the updated document
    );

    // If no task was found to update
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.status(200).json(updatedTask);  // Return the updated task
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Update an existing task by ID
// export const updateTask = async (req, res) => {
//   const { id } = req.params;
//   const { title, description, dueDate } = req.body;

//   try {
//     // Find the task by ID and userId to ensure the user can only update their own tasks
//     const updatedTask = await Task.findOneAndUpdate(
//       { _id: id, userId: req.userId },  // Filter by task id and user id
//       { title, description, dueDate },  // Update fields
//       { new: true }  // Return the updated document
//     );

//     // If no task was found to update
//     if (!updatedTask) {
//       return res.status(404).json({ message: 'Task not found or unauthorized' });
//     }

//     res.status(200).json(updatedTask);  // Return the updated task
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Delete a task by ID
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the task by ID and userId to ensure the user can only delete their own tasks
    const deletedTask = await Task.findOneAndDelete({ _id: id, userId: req.userId });

    // If no task was found to delete
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};