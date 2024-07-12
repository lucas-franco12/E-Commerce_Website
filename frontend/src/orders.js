import { nanoid } from 'nanoid';

// temportary array for testing

const orders = [
    {
        id: nanoid(),
        productName: 'Nerf Gun',
        date: '01-01-2024'
    },
    {
        id: nanoid(),
        productName: 'Messi Cleats',
        date: '03-05-1999'
    },
    {
        id: nanoid(),
        productName: '2009 Nissan Sentra',
        date: '07-04-2004'
    },
    {
        id: nanoid(),
        productName: 'PS-5',
        date: '12-25-2030'
    }
];

export default orders;