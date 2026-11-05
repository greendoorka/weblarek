import { Card } from "./Card";
import { IOnAction, TGalleryCard } from "../../../types";
import { categoryMap, CDN_URL } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";

export class GalleryCard extends Card<TGalleryCard> {
  protected categoryElem: HTMLElement;
  protected imgElem: HTMLImageElement;
  constructor(
    container: HTMLElement,
    protected action?: IOnAction,
  ) {
    super(container);
    this.categoryElem = ensureElement<HTMLElement>(
      ".card__category",
      this.container,
    );
    this.imgElem = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container,
    );

    if (action?.onClick) {
      this.container.addEventListener("click", action?.onClick);
    }
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
}
