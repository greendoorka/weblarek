import { ensureElement, ensureAllElements } from "../../../utils/utils";
import { Form } from "./Form";
import { IEvents } from "../../base/Events";
import { TPayment, TOrder} from "../../../types";

export class OrderForm extends Form<TOrder> {
  protected orderButtons: HTMLButtonElement[];
  protected addressInput: HTMLInputElement;

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

protected set payment(value: TPayment | null){
    this.orderButtons.forEach((button)=> {
      button.classList.toggle('button_alt-active',button.name === value )
    })
  }
 protected set address(value: string){
    this.addressInput.value = value;
  }
}
