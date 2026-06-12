import { Request, Response } from "express";

import * as expenseService from "../services/expense.service";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";


export const getExpenses = async (req: Request, res: Response) => {
  console.log("Controller Hit");

  const expenses = await expenseService.getExpenses();
  res.status(200).json(
    new ApiResponse(
      true,
      "Expenses fetched successfully",
      expenses
    )
  );
};

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { title, amount, category } = req.body;
    const expense = await expenseService.createExpense(title, amount, category);
    res.status(201).json(
      new ApiResponse(
        true,
        "Expense created successfully",
        expense
      )
    );
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const getExpenseById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const expense = await expenseService.getExpenseById(id);
    console.log(expense);

    if (!expense) {
      throw new ApiError(
        404,
        "Expense not found"
     )
    }

    return res.status(200).json(
      new ApiResponse(
        true,
        "Expense fetched successfully",
        expense
      )
    );
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, amount, category } = req.body;

    const expense = await expenseService.updateExpense(
      id,
      title,
      amount,
      category,
    );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    return res.status(200).json(
      new ApiResponse(
        true,
        "Expense updated successfully",
        expense
      )
    );
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const deletedExpense = await expenseService.deleteExpense(id);

    if (!deletedExpense) {
      throw new ApiError(
        404,
        "Expense not found"
      )
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          true,
          "Expense deleted successfully",
          null
        ));
  } catch (error) {
    return res.status(500).json(
      new ApiResponse(
        true,
        "Expense deleted successfully",
        null
      )
    );
  }
};
