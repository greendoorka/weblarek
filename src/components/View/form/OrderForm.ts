import { ensureElement, ensureAllElements } from "../../../utils/utils";
import { Form } from "./Form";
import { IEvents } from "../../base/Events";
import { IBuyer } from "../../../types";
import { TPayment } from "../../../types";

type TOrder = Pick<IBuyer, "address" | "payment">;

export class OrderForm extends Form<TOrder> {
  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this.orderButtons = ensureAllElements<HTMLButtonElement>(
      ".button_alt",
      this.container,
    );
    this.addressInput = ensureElement<HTMLInputElement>(
      '[name="address"]',
      this.container,
    );


    this.orderButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.events.emit("form:changed", {
          field: "payment",
          type: button.name,
        });
      });
    });
    this.addressInput.addEventListener("input", () => {
      this.events.emit("form:changed", {
        field: "address",
        value: this.addressInput.value,
      });
    });
  }

  protected orderButtons: HTMLButtonElement[];
  protected addressInput: HTMLInputElement;

 set payment(value: TPayment | null){
    this.orderButtons.forEach((button)=> {
      button.classList.toggle('button_alt-active',button.name === value )
    })
  }
 set address(value: string){
    this.addressInput.value = value;
  }
}
