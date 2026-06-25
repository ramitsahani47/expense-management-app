
import { Pool } from "pg";
import dotenv from "dotenv";
import {env} from "./env";

dotenv.config();

export const pool = new Pool({
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD
});