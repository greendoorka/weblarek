import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { TCard } from "../../../types";

export abstract class Card<T = object> extends Component<TCard & T> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

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
  protected set title(value: string) {
    this.titleElement.textContent = value;
  }
  protected set price(value: number | null) {
    if (value !== null) {
      this.priceElement.textContent = `${value} синапсов`;
    } else {
      this.priceElement.textContent = "Бесценно";
    }
  }
}
