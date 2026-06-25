

import { Router } from 'express';

import { getExpenses, createExpense, getExpenseById, updateExpense, deleteExpense, getDashboardStatus, getMonthlySummary } from '../controllers/expense.controller';
import { createExpenseSchema } from '../validations/expense.validation';
import { validate } from '../middlewares/validate.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { authMiddleware } from "../middlewares/auth.middleware";



const router = Router();

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Get all expenses
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Expenses fetched successfully
 */
router.get('/', authMiddleware, getExpenses);

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     summary: Create expense
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 */
router.post('/', authMiddleware, validate(createExpenseSchema), createExpense);

/**
 * @swagger
 * /api/expenses/dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard fetched successfully
 */
router.get("/dashboard", authMiddleware, getDashboardStatus);

/**
 * @swagger
 * /api/expenses/monthly-summary:
 *   get:
 *     summary: Get monthly expense summary
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly summary fetched successfully
 */
router.get('/monthly-summary',authMiddleware,getMonthlySummary)


/**
 * @swagger
 * /api/expenses/{id}:
 *   get:
 *     summary: Get expense by ID
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Expense fetched successfully
 *       404:
 *         description: Expense not found
 */
router.get("/:id", asyncHandler(getExpenseById));


/**
 * @swagger
 * /api/expenses/{id}:
 *   put:
 *     summary: Update expense
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Laptop
 *               amount:
 *                 type: number
 *                 example: 50000
 *               category:
 *                 type: string
 *                 example: Electronics
 *     responses:
 *       200:
 *         description: Expense updated successfully
 */
router.put('/:id', updateExpense);


/**
 * @swagger
 * /api/expenses/{id}:
 *   delete:
 *     summary: Delete expense
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       404:
 *         description: Expense not found
 */
router.delete('/:id', deleteExpense);

export default router;