import { Component } from "../base/Component";
import { IGallery } from "../../types"; 

export class Gallery extends Component<IGallery>{
  constructor(protected container: HTMLElement) {
super(container);
}
 protected set items(items: HTMLElement[]) {
  this.container.replaceChildren(...items)
 }
}