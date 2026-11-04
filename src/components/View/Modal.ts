import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IModal{
content: HTMLElement
}
export class Modal extends Component<IModal>{
  constructor(container:HTMLElement){
    super(container);
    this.closeButtonElement = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);
    this.windowElement = ensureElement<HTMLElement>('.modal__container', this.container);

    this.closeButtonElement.addEventListener('click', this.close.bind(this));
    this.container.addEventListener('click', this.close.bind(this));
    this.windowElement.addEventListener('click', (event) => event.stopPropagation());

  }
  protected closeButtonElement: HTMLButtonElement;
  protected contentElement: HTMLElement;
  protected windowElement: HTMLElement;

protected set content(value: HTMLElement){
  this.contentElement.replaceChildren(value);
}
open(): void{
  this.container.classList.add('modal_active');
}
close(): void {
  this.container.classList.remove('modal_active');
  this.contentElement.replaceChildren();
}
render(data?: Partial<IModal>): HTMLElement{
  super.render(data);
  this.open();
  return this.container;
}
}
