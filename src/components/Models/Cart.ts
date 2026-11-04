import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

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
    this.events.emit('cart:change');
  }

  removeFromCart(product: IProduct): void {
    this.itemsToBuy = this.itemsToBuy.filter((item) => item.id !== product.id);
   this.events.emit('cart:change');
  }

  clearCart(): void {
    this.itemsToBuy = [];
    this.events.emit('cart:change')
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
