
import * as expenseRepository from "../repositories/expense.repository"


export const getExpenses = async (user_id:number) => {
     console.log("Service Hit");
    return expenseRepository.findAllExpense(user_id);
}
 

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