

import { Router } from 'express';

import { getExpenses, createExpense, getExpenseById, updateExpense, deleteExpense } from '../controllers/expense.controller';
import { createExpenseSchema } from '../validations/expense.validation';
import { validate } from '../middlewares/validate.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { authMiddleware } from "../middlewares/auth.middleware";



const router = Router();

router.get('/',authMiddleware, getExpenses);
router.post('/',authMiddleware ,validate(createExpenseSchema), createExpense);
router.get("/:id", asyncHandler(getExpenseById));
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;