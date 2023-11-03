import express, { Request, Response } from 'express';

import CustomerController from '../controllers/CustomerController';

const CustomerRouter = express.Router();
const customerController = new CustomerController();

const CustomerAuth = (req: Request, res: Response, next: any) => {
    if (!req.headers.authorization) return res.status(401).json({ message: 'Not authorized' });
    next();
}

CustomerRouter.get('/', (req: Request, res: Response) => customerController.index(req, res));
CustomerRouter.get(`/:customer_uuid`, (req: Request, res: Response) => customerController.show(req, res));
CustomerRouter.post('/', (req: Request, res: Response) => customerController.store(req, res));
CustomerRouter.put(`/:customer_uuid`, (req: Request, res: Response) => customerController.save(req, res));

CustomerRouter.post(`/login`, (req: Request, res: Response) => {
    const { login, password } = req.body;

    if (!login || !password) return res.status(400).json({ message: 'Login or password not informed' });

    if (login !== 'admin' || password !== 'admin') return res.status(401).json({ message: 'Invalid credentials' });

    const authtoken = Buffer.from(`${login}:${password}`).toString('base64');

    return res.status(200).json({ authtoken });
});

CustomerRouter.get(`/dashboard`, CustomerAuth, (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Hello World!', });
});


export default CustomerRouter;