import express, { application } from 'express';
// import { createTask, getTasks } from '../controllers/taskController.js';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authMiddleware);

router.post('/', createTask);
router.get('/', getTasks);

// Route to update an existing task by ID
router.put('/:id', updateTask);

// Route to delete a task by ID
router.delete('/:id', deleteTask);

export default router;
