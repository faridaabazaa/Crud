import express from 'express';
import { fetch ,createUser, update,deleteUser } from '../controller/userController.js';

const router = express.Router();

router.get('/GetAllUsers', fetch);
router.post('/create', createUser);
router.put('/update/:id', update);
router.delete('/delete/:id', deleteUser);
export default router; 