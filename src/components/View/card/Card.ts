import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { TCard } from "../../../types";
import { categoryMap, CDN_URL } from "../../../utils/constants";

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

    this.categoryElem = this.container.querySelector(".card__category") || undefined;
     this.imgElem = this.container.querySelector(".card__image") || undefined;
  }
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;
  protected categoryElem?: HTMLElement;
  protected imgElem?: HTMLImageElement;

  protected set category(value: string) {
    if (this.categoryElem) {
      this.categoryElem.textContent = value;
      for (const key in categoryMap) {
        this.categoryElem.classList.toggle(
          categoryMap[key as keyof typeof categoryMap],
          key === value,
        );
      }
    }
  }
  protected set image(value: string) {
    if (this.imgElem) {
      this.imgElem.src = CDN_URL + value;
      this.imgElem.alt = this.titleElement?.textContent || "Изображение товара";
    }
  }
  protected set title(value: string) {
    this.titleElement.textContent = value;
  }
  protected set price(value: number) {
    if (value) {
      this.priceElement.textContent = `${value} синапсов`;
    } else {
      this.priceElement.textContent = "Бесценно";
    }
  }
}
