import { email } from "zod";
import  {pool} from "../config/db"

export const createUser = async (
    name: string,
    email: string,
    password: string
) => {

    const result = await pool.query(
        `INSERT into USERS
        (name , email , password)
        VALUES ($1 , $2 ,$3)
        RETURNING *
        `,
        [name, email, password]
    );

    return result.rows[0];

};



export const getAllUsers = async () => {
    const users = await pool.query(
        `SELECT * from users  ORDER BY id DESC`
    );

    return users.rows;
};


export const getUserById = async (id: number) => {
    const result = await pool.query(
        `SELECT * from users where id = $1`,
        [id]
    );

    return result.rows[0];
};


export const getUserByEmail =  async (email: string) => {
    const result = await pool.query(
        `SELECT * from users where email = $1`,
        [email]
    );

    return result.rows[0];
}