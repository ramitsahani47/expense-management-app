

import { Router } from 'express';

import { getExpenses, createExpense, getExpenseById, updateExpense, deleteExpense } from '../controllers/expense.controller';
import { createExpenseSchema } from '../validations/expense.validation';
import { validate } from '../middlewares/validate.middleware';
import { asyncHandler } from '../utils/asyncHandler';


const router = Router();

router.get('/', getExpenses);
router.post('/',validate(createExpenseSchema), createExpense);
router.get("/:id", asyncHandler(getExpenseById));
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;