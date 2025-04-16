import express from 'express';
import { registerUser, loginUser, getUserDetails  } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);


router.use(authMiddleware);
// Get logged-in user's details
router.get('/me', getUserDetails);  // Protect the route so only authenticated users can access it

export default router;