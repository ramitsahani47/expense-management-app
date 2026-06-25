import { pool } from "../config/db";

export const findAllExpense = async (
  user_id: number,
  page: number,
  limit: number,
  search: string,
  category: string,
  sort:string
) => {
  console.log("Repository Hit");
    const offset = (page - 1) * limit;
    
    let orderBy = "created DESC";


    if (sort === "amount_asc") {
        orderBy = "amount ASC"
    } else if (sort === "amount_desc") {
        orderBy = "amount DESC"
    } else if (sort === "latest") {
       orderBy = "created_at DESC"
    } else if (sort ="oldest") {
       orderBy = "created_at ASC"
    }

  const result = await pool.query(
    `
        SELECT * FROM expenses WHERE user_id = $1
        AND title ILIKE $2
        AND category ILIKE $3
        ORDER BY ${orderBy}
        LIMIT $4
        OFFSET $5
        `,
    [user_id, `%${search}%`, `%${category}%`, limit, offset],
    );
    

    const countResult = await pool.query(
        `
        SELECT COUNT(*) AS total
        FROM expenses
        WHERE user_id = $1
        AND title ILIKE $2
        AND category ILIKE $3
        `,
        [
            user_id,
            `%${search}`,
            `%${category}`
        ]
    )

    return {
        expenses: result.rows,
        totalRecords: Number(
            countResult.rows[0].total
        )
  };
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


export const deleteExpense = async (
    id: number
) => {
    const result = await pool.query(
        `DELETE FROM expenses 
                            WHERE id = $1
                            RETURNING *
                             `,
        [id]
    );

    return result.rows[0];
};


export const getDashboardStatus = async (
    user_id: number
) => {
    const result = await pool.query(
        `
        SELECT
           COUNT(*) AS total_transactions,
           COALESCE(SUM(amount),0) AS total_expenses,
           COALESCE(MAX(amount),0) AS highest_expense,
           COALESCE(MIN(amount),0) AS lowest_expense,
           COALESCE(AVG(amount),0) AS average_expense

         FROM expenses
         WHERE user_id = $1  
        `,
        [user_id]
    );

    return result.rows[0];
};



export const getMonthlySummary = async (
    user_id: number
) => {
    const result = await pool.query(
        `
        SELECT
            TO_CHAR(created_at , 'YYYY-MM') AS month ,
            SUM(amount) AS total_expenses
        FROM expenses
        WHERE user_id = $1
        GROUP BY month
        ORDER BY month ASC 
        `,
        [user_id]
    );

    return result.rows
};

