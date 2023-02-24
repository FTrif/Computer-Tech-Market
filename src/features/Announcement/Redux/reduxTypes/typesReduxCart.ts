export interface product {
  id: string;
  pret: number;
  image: string;
  title: string;
  quantity: number;
  totalPrice: number;
}

export interface Cart {
  cartItems: product[];
  totalAmount: number;
  totalQuantity: number;
}
