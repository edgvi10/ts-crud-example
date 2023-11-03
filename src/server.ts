import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import CustomerRouter from './routes/customers.route';

try {
    dotenv.config();

    const { API_HOST, API_PORT } = process.env;
    if (!API_HOST || !API_PORT) throw new Error('API_HOST or API_PORT not defined');

    const app = express();
    const port = 3000;

    app.use(cors());
    app.use(bodyParser.json());

    const CustomersRoute = CustomerRouter;

    app.get('/', (req: Request, res: Response) => {
        return res.status(200).json({ message: 'Hello World!', });
    });

    app.use('/customers', CustomersRoute);

    app.listen(API_PORT, () => {
        console.log(`Servidor rodando em ${API_HOST}:${API_PORT}`);
    });

} catch (error: any) {
    console.log(error.message);
    process.exit(1);
}