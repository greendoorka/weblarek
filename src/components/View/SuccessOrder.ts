import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

 interface ISuccessOrder{
sinapsDeduct: number;
}

export class SuccessOrder extends Component<ISuccessOrder>{

constructor(container: HTMLElement,protected events: IEvents){
super(container)
this.buttonContinue = ensureElement<HTMLButtonElement>('.order-success__close',this.container);
this.sinapsDeductElem = ensureElement<HTMLElement>('.order-success__description',this.container);
this.buttonContinue.addEventListener('click', ()=>{
  this.events.emit('success:continue')
})
}

protected buttonContinue: HTMLButtonElement;
protected sinapsDeductElem:HTMLElement;

protected set sinapsDeduct(value: number){
  this.sinapsDeductElem.textContent = `Списано ${value} синапсов`
}

}