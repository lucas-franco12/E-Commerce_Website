import { nanoid } from 'nanoid';

// temportary array for testing


const products = [
    {
      id: nanoid(),
      name: 'Nerf Gun',
      price: 29.99,
      desc: "This nerf gun is really cool, you should buy it.",
      src: '/img/product1.jpeg',

    },
    {
      id: nanoid(),
      name: 'Cleats',
      price:  999.99,
      desc: 'Cleats worn buy Messi himself.',
      src: '/img/product2.jpeg',
    },
    {
      id: nanoid(),
      name: 'Product 3',
      price: 49.99,
      desc: 'Description of Product 2',
      src: 'https://via.placeholder.com/150',
    },
    {
      id: nanoid(),
      name: 'Product 4',
      price: 49.99,
      desc: 'Description of Product 2',
      src: 'https://via.placeholder.com/150',
    },
    {
      id: nanoid(),
      name: 'Product 5',
      price: 49.99,
      desc: 'Description of Product 2',
      src: 'https://via.placeholder.com/150',
    },
    
  ];
  
  export default products;
  