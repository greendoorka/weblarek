export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}
export interface IProduct {
  id: string,
  description: string,
  image: string,
  title: string,
  category: string,
  price: number | null;
}
export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export type TPayment = 'cash' | 'online' | null;

export type ValidErrors = {
payment?: 'Не выбран вид оплаты',
email?: 'Укажите емэйл'| 'Неверный емэйл',
address?: 'Укажите адрес' | 'Неверный адрес',
phone?: 'Укажите номер телефона' | 'Неверный номер телефона' ;
}

export interface IProductList {
  total: number;
  items: IProduct[];
}

export interface IOrderCheck {
  id: string;
  total: number;

}

export interface IOrder extends IBuyer {
  totalPrice: number
  items: IProduct[]
}

export class Communication {
  constructor(api: IApi){
    this.api = api;
  }

  api: IApi;
getAllItems() : Promise<IProductList>{
return this.api.get<IProductList>('/product');
}
sendOrder(order: IOrder): Promise<IOrderCheck>{
return this.api.post<IOrderCheck>('/order', order);
}

}