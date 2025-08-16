import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {getUsers} from '../controllers/usercontroller.js';

const router = express.Router();

// Apply authentication
router.use(authMiddleware);

// GET /api/users
router.get('/', getUsers);

export default router;
