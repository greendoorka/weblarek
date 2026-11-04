import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { IEvents } from "../../base/Events";
import { TGalleryCard } from "./GalleryCard";
import { categoryMap, CDN_URL } from "../../../utils/constants";

interface IFullCard extends TGalleryCard {
  inCart: boolean;
  description: string;
}

type CategoryKey = keyof typeof categoryMap;

export class FullCard extends Card<IFullCard> {
  protected isProductInCart: boolean = false;
  protected isProductAvailable: boolean = true; 
  protected descriptionElem: HTMLElement;
  protected buyButtonElem: HTMLButtonElement;
  protected categoryElem: HTMLElement;
  protected imgElem: HTMLImageElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this.descriptionElem = ensureElement<HTMLElement>('.card__text', this.container);
    this.buyButtonElem = ensureElement<HTMLButtonElement>('.card__button', this.container);
    this.categoryElem = ensureElement<HTMLElement>('.card__category', this.container);
    this.imgElem = ensureElement<HTMLImageElement>('.card__image', this.container);
 
    this.buyButtonElem.addEventListener('click', () => {
      if (this.isProductInCart) {
        this.events.emit('buyButton:remove', { id: this._id });
      } else {
        this.events.emit('buyButton:click', { id: this._id });
      }
    });
  }

  set category(value: string) {
    this.categoryElem.textContent = value;
    for (const key in categoryMap) {
      this.categoryElem.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value
      );
    }
  }

  set image(value: string) {
    if (this.imgElem) {
      this.imgElem.src = CDN_URL + value;
      this.imgElem.alt = this.titleElement?.textContent || "Изображение товара";
    }
  }

  set description(value: string) {
    this.descriptionElem.textContent = value;
  }

  set price(value: number) {
    super.price = value;
    if (this.priceElement.textContent === 'Бесценно') {
      this.isProductAvailable = false;
      this.buyButtonElem.disabled = true;
      this.buyButtonElem.textContent = 'Недоступно';
    } else {
      this.isProductAvailable = true;
      this.buyButtonElem.disabled = false;
    }
  }

  set inCart(status: boolean) {
    this.isProductInCart = status;
    if (!this.isProductAvailable) {
      this.buyButtonElem.textContent = 'Недоступно';
      this.buyButtonElem.disabled = true;
      return;
    }

    if (status) {
      this.buyButtonElem.textContent = 'Удалить из корзины';
    } else {
      this.buyButtonElem.textContent = 'Купить'; 
    }
  }
}

