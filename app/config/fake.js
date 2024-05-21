import {faker} from '@faker-js/faker';

// Générer un tableau de 10 commandes factices
const fakeOrders = Array.from({ length: 20 }, () => ({
    total_price: 5,
    payment_method: 'Cash payment',
    created_at: faker.date.past(),
    store_name: 'ByProgrammers Hotdogs',
    basket: Array.from({ length: 3 }, () => ({
        product: faker.commerce.product(),
        quantity: faker.number.int(),
        picture: faker.image.urlLoremFlickr({ category: 'nature' }),
    })),
    id: faker.number.int(),
    is_paid: false,
}));

// Filtrer les commandes non payées
const unpaidOrders = fakeOrders.filter(order => !order.is_paid);

console.log(unpaidOrders.length);

export default unpaidOrders;
