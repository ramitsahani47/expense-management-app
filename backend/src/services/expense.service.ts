
import * as expenseRepository from "../repositories/expense.repository"


export const getExpenses = async () => {
     console.log("Service Hit");
    return expenseRepository.findAllExpense();
}
 

export const createExpense = async (
    title: string,
    amount: number,
    category: string
) => {
    return expenseRepository.createExpense(
        title,
        amount,
        category
    );
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