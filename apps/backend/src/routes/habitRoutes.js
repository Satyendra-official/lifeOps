import express from 'express';
import {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit
} from '../controllers/habitController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createHabit);
router.get('/', getHabits);
router.put('/:id', updateHabit);
router.delete('/:id', deleteHabit);



export default router;



// import express from 'express';
// import { createHabit, getHabits } from '../controllers/habitController.js';
// import { protect } from '../middlewares/authMiddleware.js';

// const router = express.Router();

// router.post('/', protect, createHabit);
// router.get('/', protect, getHabits);

// export default router;
// getHabit,
//   deleteHabit
// router.get('/:id', getHabit);
// router.delete('/:id', deleteHabit);