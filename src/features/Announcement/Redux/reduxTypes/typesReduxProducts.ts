export interface dataProduct {
  image: string | string[];
  title: string;
  pret: number;
  descriere: string;
  categorie: string;
  descriereTotala: string;
  stare: string;
  adress: string;
  email: string;
  lastName: string;
  yourProduct: string;
  id: string;
}

export interface dataProducts {
  cartProducts: dataProduct[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: Error;
}
