import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { IEvents } from "../../base/Events";
import { IProduct } from "../../../types";
import { categoryMap } from "../../../utils/constants";
import { CDN_URL } from "../../../utils/constants";


export type TGalleryCard = Pick<IProduct, "category" | "image">;
type CategoryKey = keyof typeof categoryMap

export class GalleryCard extends Card<TGalleryCard> {
  constructor(
    container: HTMLElement,
    protected events: IEvents,
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
    this.container.addEventListener("click", () => {
      this.events.emit("galleryCard:click", { id: this._id });
    });
  }
  protected categoryElem: HTMLElement;
  protected imgElem: HTMLImageElement;

 set category(value: string) {
    this.categoryElem.textContent = value;
    for(const key in categoryMap){
      this.categoryElem.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value
      );
    }
  }
  
 set image(value: string) {
    if (this.imgElem) {
      this.imgElem.src =  CDN_URL +  value;
      this.imgElem.alt = this.titleElement?.textContent || "Изображение товара";
    }
  }
}
