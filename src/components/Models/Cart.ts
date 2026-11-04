export class Cart {
  private itemsToBuy: IProduct[];
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
    this.itemsToBuy = [];
  }
  getItemsToBuy(): IProduct[] {
    return this.itemsToBuy;
  }

  addItem(product: IProduct): void {
    this.itemsToBuy.push(product);
    this.events.emit('item:add', {
      productId: product.id,
      items: this.itemsToBuy,
      total: this.totalPrice()
    });
  }

  removeFromCart(product: IProduct): void {
    this.itemsToBuy = this.itemsToBuy.filter((item) => item.id !== product.id);
   this.events.emit('item:remove', {
      productId: product.id,
      items: this.itemsToBuy,
      total: this.totalPrice()
    });
  }

  clearCart(): void {
    this.itemsToBuy = [];
    this.events.emit('cart:clear', {
      items: [],
      total: 0
    })
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
