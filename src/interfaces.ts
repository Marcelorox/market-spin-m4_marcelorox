interface Product {
  id: string;
  name: string;
  price: number;
  weight: number;
  section: string;
  calories: number;
  expirationDate: Date;
}
interface Doido {
  name: string;
}

export { Product, Doido };
