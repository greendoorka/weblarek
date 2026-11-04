
import { IEvents } from "../base/Events";
import { IProduct } from "../../types";

export class Catalogue {
 protected items: IProduct[];
 protected chosenItem: IProduct | null;

  constructor(protected events: IEvents) {
    this.items = [];
    this.chosenItem = null;
  }

  saveItems(newItems: IProduct[]): void {
    this.items = newItems;
    this.events.emit('catalogue:changed')
  }
  getItems(): IProduct[] {
    return this.items;
  }
  getIdProduct(id: string): IProduct | undefined {
    const found = this.items.find((item) => item.id === id);
    return found;
  }
  saveProduct(item: IProduct): void {
    this.chosenItem = item;
    this.events.emit('item:chosen')
  }
  getProduct(): IProduct | null {
    return this.chosenItem;
  }
}
