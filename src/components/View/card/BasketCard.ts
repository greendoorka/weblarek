

import { TCard, Card} from "./Card";
import { IEvents } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";

interface IBasketCard extends TCard {
itemIndex: number;
}

export class BasketCard extends Card<IBasketCard>{

  constructor(container:HTMLElement, protected events: IEvents){
    super(container);
    this.removeButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
    this.basketItemIndex = ensureElement<HTMLElement>('.basket__item-index', this.container);
    this.removeButton.addEventListener('click', () =>{
     events.emit('removeButton:click',{id: this._id})
    })
  }

protected removeButton: HTMLButtonElement;
protected basketItemIndex: HTMLElement;

set itemIndex(value: number){
  this.basketItemIndex.textContent = `${value}`
}
}