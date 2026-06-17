import { pool } from "../config/db";

export const findAllExpense = async (user_id:number) => {
  console.log("Repository Hit");
  const result = await pool.query("SELECT * FROM expenses WHERE user_id = $1",[user_id]);

  return result.rows;
};

export const createExpense = async (
    title: string,
    amount: number,
    category: string,
    user_id:number
) => {
    const result = await pool.query(
      `INSERT INTO expenses
        (title , amount , category,user_id)
        VALUES ($1 , $2, $3 , $4)
        RETURNING *
        `,
      [title, amount, category, user_id],
    );

     return result.rows[0];
}; 


export const findExpenseById = async (
    id: number
) => {
    const result = await pool.query(
        `SELECT * FROM expenses where id = $1`,
        [id]
    );

    return result.rows[0];
};


export const updateExpense = async (
    id: number,
    title: string,
    amount: number,
    category: string
) => {
    const result = await pool.query(
        `UPDATE expenses 
         SET
            title = $1,
            amount = $2,
            category = $3

         WHERE id = $4
         RETURNING *   
        `,
        [title, amount, category, id]
    );

    return result.rows[0];
};


export const deleteExpense = async(
    id:number
) => {
    const result = await pool.query(
        `DELETE FROM expenses 
                            WHERE id = $1
                            RETURNING *
                             `,
        [id]
    );

    return result.rows[0];
}