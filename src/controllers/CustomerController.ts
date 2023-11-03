import { Request, Response } from 'express';

const customersData: any = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@doe.com',
        age: 30,
    }, {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@doe.com',
        age: 25,
    }
];

export default class CustomerController {
    constructor() {
        console.log('CustomerController')
    }

    async index(req: Request, res: Response) {

        return res.status(200).json(customersData);
    }

    async show(req: Request, res: Response) {
        const { customer_uuid } = req.params;
        const customer = customersData.find((customer: any) => customer.id === Number(customer_uuid));
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        return res.status(200).json(customer);
    }

    async showBy(req: Request, res: Response) {
    }

    async store(req: Request, res: Response) {
        const { name, email, age } = req.body;
        const customer = {
            id: customersData.length + 1,
            name,
            email,
            age,
        };
        customersData.push(customer);
        return res.status(201).json(customer);
    }

    async save(req: Request, res: Response) {
        const { customer_uuid } = req.params;
        const { name, email, age } = req.body;
        const customerIndex = customersData.findIndex((customer: any) => customer.id === Number(customer_uuid));
        if (customerIndex < 0) return res.status(404).json({ message: 'Customer not found' });
        const customer = {
            id: Number(customer_uuid),
            name,
            email,
            age,
        };
        customersData[customerIndex] = customer;
        return res.status(200).json(customer);
    }
}