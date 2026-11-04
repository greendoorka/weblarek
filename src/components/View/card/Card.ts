import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { IProduct } from "../../../types";

export type TCard = Pick<IProduct, "id" | "title" | "price">;

export abstract class Card<T = object> extends Component<TCard & T> {
  constructor(protected container: HTMLElement) {
    super(container);
    this.titleElement = ensureElement<HTMLElement>(
      ".card__title",
      this.container,
    );
    this.priceElement = ensureElement<HTMLElement>(
      ".card__price",
      this.container,
    );
  }
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;
  protected _id!: string;

  set title(value: string) {
    this.titleElement.textContent = value;
  }
  set id(value: string) {
    this._id = value;
  }
  set price(value: number) {
    if (value) {
      this.priceElement.textContent = `${value} синапсов`;
    } else {
      this.priceElement.textContent = "Бесценно";
    }
  }
}
