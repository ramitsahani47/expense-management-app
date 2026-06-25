import { Request, Response } from "express";

import * as expenseService from "../services/expense.service";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";


export const getExpenses = async (req: Request, res: Response) => {
  console.log("Controller Hit");

  const user = (req as any).user;
  const user_id = (req as any).user.id;
  console.log(user)


  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;


  // NEW 
  const search = String(req.query.search || "");


  // new 
  const category = String(req.query.category || "") 

  
  // new 
  const sort = String(req.query.sort || "latest")


  const result = await expenseService.getExpenses(
    user_id,
    page,
    limit,
    search,
    category,
    sort
  );

const totalPages = Math.ceil(result.totalRecords/limit);

  res.status(200).json(
    new ApiResponse(
      true,
      "Expenses fetched successfully",
      {
        expenses: result.expenses,
        pagination: {
          page,
          limit,
          totalRecords: result.totalRecords,
          totalPages
        }
    }),
  );
};

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { title, amount, category } = req.body;

    // Logged-in user id from JWT
    const user_id = (req as any).user.id;


    const expense = await expenseService.createExpense(title, amount, category,user_id);
    res
      .status(201)
      .json(new ApiResponse(true, "Expense created successfully", expense));
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



export const getDashboardStatus = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("Dashboard Controller Hit");
    console.log((req as any).user);
   const user_id = (req as any).user.id;
   const status = await expenseService.getDashboardStatus(user_id);

   return res
     .status(200)
     .json(new ApiResponse(true, "Dashboard fetched successfully", status));
 } catch (error) {
   console.log(error)
   return res.status(500).json(error)
 }
};


export const getMonthlySummary = async(
  req: Request,
  res:Response
) => {
  const user_id = (req as any).user.id;

  const summary = await expenseService.getMonthlySummary(user_id);

  return res.status(200).json(
    new ApiResponse(
      true,
      "Monthly summary fetched successfully",
      summary
    )
  )
}