import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { IBasket } from "../../types";

export class Basket extends Component<IBasket> {
  protected basketListElem: HTMLElement;
  protected basketBuyButton: HTMLButtonElement;
  protected basketPriceElem: HTMLElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);
    this.basketListElem = ensureElement<HTMLElement>(
      ".basket__list",
      this.container,
    );
    this.basketBuyButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container,
    );
    this.basketPriceElem = ensureElement<HTMLElement>(
      ".basket__price",
      this.container,
    );
    this.basketBuyButton.addEventListener("click", () => {
      events.emit("order:open");
    });
  }
  protected set disabled(value: boolean) {
    this.basketBuyButton.disabled = value;
  }
  protected set items(items: HTMLElement[]) {
    this.basketListElem.replaceChildren(...items);
  }
  protected set total(value: number) {
    this.basketPriceElem.textContent = `${value} синапсов`;
  }
}
