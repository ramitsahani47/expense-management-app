import { Router } from "express";

import {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  login,
  
} from "../controllers/auth.controller";



const router = Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/email', getUserByEmail);
router.post('/login',login)


 
export default router;