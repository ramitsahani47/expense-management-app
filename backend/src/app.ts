
import express from 'express';
import cors from 'cors';
import expenseRoutes from './routes/expenses.routes'
import userRoutes from './routes/auth.routes'
import { errorMiddleware } from './middlewares/error.middleware';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);

app.use(errorMiddleware);


export default app;