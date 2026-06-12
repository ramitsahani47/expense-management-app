import { Router } from "express";

import {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  
} from "../controllers/auth.controller";



const router = Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', getUserByEmail);



export default router;