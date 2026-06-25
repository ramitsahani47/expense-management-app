
import express from 'express';
import cors from 'cors';
import expenseRoutes from './routes/expenses.routes'
import userRoutes from './routes/auth.routes'
import { errorMiddleware } from './middlewares/error.middleware';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import helmet from 'helmet';


const app = express();

app.use(helmet());

app.use(cors());
app.use(express.json());

app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);


app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))

app.use(errorMiddleware);


export default app;