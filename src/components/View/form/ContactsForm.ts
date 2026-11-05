import { Form } from "./Form";
import { TContactsForm } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";

export class ContactsForm extends Form<TContactsForm> {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this.emailInput = ensureElement<HTMLInputElement>(
      '[name="email"]',
      this.container,
    );
    this.phoneInput = ensureElement<HTMLInputElement>(
      '[name="phone"]',
      this.container,
    );

    this.emailInput.addEventListener("input", () => {
      this.events.emit("form:changed", {
        field: "email",
        value: this.emailInput.value,
      });
    });
    this.phoneInput.addEventListener("input", () => {
      this.events.emit("form:changed", {
        field: "phone",
        value: this.phoneInput.value,
      });
    });
  }
  protected set phone(value: string) {
    this.phoneInput.value = value;
  }
  protected set email(value: string) {
    this.emailInput.value = value;
  }
}
