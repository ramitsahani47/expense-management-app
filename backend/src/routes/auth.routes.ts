import { Router } from "express";

import {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  login,
  logout,
  refreshToken,
  
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { loginLimiter } from "../middlewares/rateLimiter";



const router = Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ramit
 *               email:
 *                 type: string
 *                 example: ramit@gmail.com
 *               password:
 *                 type: string
 *                 example: ramit123
 *     responses:
 *       201:
 *         description: User created successfully
 */

router.post('/', createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Users fetched successfully
 */
router.get('/', getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       404:
 *         description: User not found
 */
router.get('/:id', getUserById);

/**
 * @swagger
 * /api/users/email:
 *   post:
 *     summary: Get user by email
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: ramit@gmail.com
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       404:
 *         description: User not found
 */
router.post('/email', getUserByEmail);


/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login User
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: ramit@gmail.com
 *               password:
 *                 type: string
 *                 example: ramit
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login',loginLimiter , login);

/**
 * @swagger
 * /api/users/refresh_token:
 *   post:
 *     summary: Generate new access token using refresh token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refresh_token:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIs...
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *       401:
 *         description: Invalid refresh token
 */
router.post('/refresh_token', refreshToken);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logout user
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
router.post('/logout', authMiddleware, logout);


 
export default router;