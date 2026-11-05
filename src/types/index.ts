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
  email?: "Введите Email";
  address?: "Необходимо указать адрес";
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
export interface IFormChange {
  field: "payment" | "address" | "email" | "phone";
  type?: string;
  value?: string;
}
export interface IOnAction {
  onClick?: (event: MouseEvent) => void;
}
export interface IBasket {
  items: HTMLElement[];
  total: number;
  disabled: boolean;
}

export interface IBasketCard extends TCard {
  itemIndex: number;
}

export type TCard = Pick<IProduct, "title" | "price">;

export type TGalleryCard = Pick<IProduct, "category" | "image">;

export interface IFullCard extends TGalleryCard {
  buttonDisabled: boolean;
  description: string;
  buttonText: string;
}

export type TContactsForm = Pick<IBuyer, "phone" | "email">;

export interface IForm {
  errors: string | undefined;
  valid: boolean;
}

export type TOrder = Pick<IBuyer, "address" | "payment">;

export interface IGallery {
  items: HTMLElement[];
}

export interface IHeader {
  counter: number;
}

export interface IModal {
  content: HTMLElement;
}

export interface ISuccessOrder {
  sinapsDeduct: number;
}
