export class Cart {
  constructor() {
    this.itemsToBuy = [];
  }
  itemsToBuy: IProduct[];

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
    let total = 0;
    this.itemsToBuy.forEach((el) => {
      if (el.price !== null && el.price !== undefined) {
        total += el.price;
      } else {
        total += 0;
      }
    });
    return total;
  }

  totalItemsInCart(): number {
    return this.itemsToBuy.length;
  }

  availableItem(id: string): boolean {
    return this.itemsToBuy.some((item) => item.id === id);
  }
}
