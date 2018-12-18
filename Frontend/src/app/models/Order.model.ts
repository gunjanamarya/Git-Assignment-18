export class Order {
    id?: number;
    username?: string;
    cart: Cart[];
    amount_spent: number;
    order_status: string;
    purchase_timestamp?: string;
}

export class Cart {
    item: string;
    quantity: number = 0;
}