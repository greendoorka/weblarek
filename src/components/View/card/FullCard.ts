import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { IEvents } from "../../base/Events";
import { IFullCard } from "../../../types";
import { categoryMap, CDN_URL } from "../../../utils/constants";

export class FullCard extends Card<IFullCard> {
  protected descriptionElem: HTMLElement;
  protected buyButtonElem: HTMLButtonElement;
  protected categoryElem: HTMLElement;
  protected imgElem: HTMLImageElement;

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
    this.categoryElem = ensureElement<HTMLElement>(
      ".card__category",
      this.container,
    );
    this.imgElem = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container,
    );
  }

  protected set category(value: string) {
    this.categoryElem.textContent = value;
    for (const key in categoryMap) {
      this.categoryElem.classList.toggle(
        categoryMap[key as keyof typeof categoryMap],
        key === value,
      );
    }
  }
  protected set image(value: string) {
    this.imgElem.src = CDN_URL + value;
    this.imgElem.alt = this.titleElement?.textContent || "Изображение товара";
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
