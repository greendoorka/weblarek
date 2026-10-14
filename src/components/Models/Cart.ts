export class Cart {
  constructor() {
    this.itemsToBuy = [];
  }
  private itemsToBuy: IProduct[];

  getItemsToBuy(): IProduct[] {
    return this.itemsToBuy;
  }

  addItem(product: IProduct): void {
    this.itemsToBuy.push(product);
  }

  removeFromCart(product: IProduct): void {
    this.itemsToBuy = this.itemsToBuy.filter((item) => item !== product);
  }

  clearCart(): void {
    this.itemsToBuy = [];
  }

  totalPrice(): number {
    return this.itemsToBuy.reduce(
      (total, item) => total + (item.price || 0),
      0,
    );
  }

  totalItemsInCart(): number {
    return this.itemsToBuy.length;
  }

  availableItem(id: string): boolean {
    return this.itemsToBuy.some((item) => item.id === id);
  }
}
