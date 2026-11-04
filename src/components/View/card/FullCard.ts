import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { IEvents } from "../../base/Events";
import { IFullCard } from "../../../types";

export class FullCard extends Card<IFullCard> {
  protected descriptionElem: HTMLElement;
  protected buyButtonElem: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);
    this.descriptionElem = ensureElement<HTMLElement>(
      ".card__text",
      this.container,
    );
    this.buyButtonElem = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container,
    );
    this.buyButtonElem.addEventListener("click", () => {
      this.events.emit("buyButton:click");
    });
  }

  protected set description(value: string) {
    this.descriptionElem.textContent = value;
  }
  protected set buttonDisabled(value: boolean) {
    this.buyButtonElem.disabled = value;
  }
  protected set buttonText(value: string) {
    this.buyButtonElem.textContent = value;
  }
}
