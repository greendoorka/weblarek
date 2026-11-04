import { Card } from "./Card";
import { IOnAction  } from "../../../types";


export class GalleryCard extends Card{
  constructor(
    container: HTMLElement,
    protected action?: IOnAction
  ) {
    super(container);

if(action?.onClick){
    this.container.addEventListener("click", action?.onClick)
    };
  }
 
}
