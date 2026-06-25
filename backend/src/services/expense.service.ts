
import * as expenseRepository from "../repositories/expense.repository"


export const getExpenses = async (
  user_id: number,
  page: number,
  limit: number,
  search: string,
    category: string,
  sort:string
) => {
  console.log("Service Hit");
  return expenseRepository.findAllExpense(
    user_id,
    page,
    limit,
    search,
      category,
    sort
  );
};
 


export const createExpense = async (
    title: string,
    amount: number,
    category: string,
    user_id : number
) => {
    return expenseRepository.createExpense(title, amount, category, user_id);
};

export const getExpenseById = async (
    id: number
) => {
    return expenseRepository.findExpenseById(id);
};


export const updateExpense = async (
    id: number,
    title: string,
    amount: number,
    category: string
) => {
    return expenseRepository.updateExpense(
        id,
        title,
        amount,
        category
    );
};


export const deleteExpense = async (
    id: number
) => {
    return expenseRepository.deleteExpense(id);
};



export const getDashboardStatus = async (
    user_id: number
) => {
    return expenseRepository.getDashboardStatus(user_id);
};


export const getMonthlySummary = async (
    user_id: number
) => {
    return expenseRepository.getMonthlySummary(user_id)
};