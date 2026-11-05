import { IForm } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

export abstract class Form<T> extends Component<IForm & T> {
  protected submitButton: HTMLButtonElement;
  protected errorsElem: HTMLElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);
    this.submitButton = ensureElement<HTMLButtonElement>(
      '[type="submit"]',
      this.container,
    );
    this.errorsElem = ensureElement<HTMLElement>(
      ".form__errors",
      this.container,
    );
    this.submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      const formName = (this.container as HTMLFormElement).name || "form";
      this.events.emit("submit:click", { formName });
    });
  }

  protected set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }
  protected set errors(value: string) {
    this.errorsElem.textContent = value;
  }
}
