import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasket {
items: HTMLElement[];
total: number;
}

export class Basket extends Component<IBasket>{

constructor(container: HTMLElement,protected events: IEvents){
  super(container);
  this.basketListElem = ensureElement<HTMLElement>('.basket__list', this.container);
this.basketBuyButton  = ensureElement<HTMLButtonElement>('.basket__button', this.container);
this.basketPriceElem = ensureElement<HTMLElement>('.basket__price', this.container);
this.basketBuyButton.addEventListener('click',()=>{
  events.emit('order:open')
})
}

protected basketListElem: HTMLElement;
protected basketBuyButton: HTMLButtonElement;
protected basketPriceElem: HTMLElement;

protected set items(items: HTMLElement[]){
if(items.length > 0){
  this.basketListElem.replaceChildren(...items);
  this.basketBuyButton.disabled= false;
}else{
  this.basketListElem.textContent = '';
  this.basketBuyButton.disabled = true;
}
}
protected set total(value: number){
  this.basketPriceElem.textContent = `${value} синапсов`;

}

}
