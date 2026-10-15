export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
export interface IBuyer {
  payment: TPayment | null;
  email: string;
  phone: string;
  address: string;
}

export type TPayment = "cash" | "card";

export type ValidErrors = {
  payment?: "Не выбран вид оплаты";
  email?: "Укажите емэйл";
  address?: "Укажите адрес";
  phone?: "Укажите номер телефона";
};

export interface IProductList {
  total: number;
  items: IProduct[];
}

export interface IOrderCheck {
  id: string;
  total: number;
}

export interface IOrder extends IBuyer {
  total: number;
  items: IProduct["id"][];
}
