import { Card } from "./Card";
import { ensureElement } from "../../../utils/utils";
import { IOnAction, IBasketCard  } from "../../../types";

export class BasketCard extends Card<IBasketCard> {
  constructor(
    container: HTMLElement,
    protected action?: IOnAction,
  ) {
    super(container);
    this.removeButton = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      this.container,
    );
    this.basketItemIndex = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container,
    );

    if (action?.onClick) {
      this.removeButton.addEventListener("click", action.onClick);
    }
  }

  protected removeButton: HTMLButtonElement;
  protected basketItemIndex: HTMLElement;

  set itemIndex(value: number) {
    this.basketItemIndex.textContent = `${value}`;
  }
}
