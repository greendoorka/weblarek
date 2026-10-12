export class Catalogue {
  constructor() {
    this.items = [];
    this.chosenItem = null;
  }
  items: IProduct[];
  chosenItem: IProduct | null;

  saveItems(newItems: IProduct[]): void {
    this.items = newItems;
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
  }
  getProduct(): IProduct | null {
    return this.chosenItem;
  }
}
