export class Communication {
  constructor(api: IApi) {
    this.api = api;
  }

  api: IApi;
  getAllItems(): Promise<IProductList> {
    return this.api.get<IProductList>("/product");
  }
  sendOrder(order: IOrder): Promise<IOrderCheck> {
    return this.api.post<IOrderCheck>("/order", order);
  }
}
