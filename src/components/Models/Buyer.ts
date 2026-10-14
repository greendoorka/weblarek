export class Buyer {
  constructor() {
    this.payment = null;
    this.address = "";
    this.phone = "";
    this.email = "";
  }
  private payment: TPayment | null;
  private address: string;
  private phone: string;
  private email: string;

  saveInfo<T extends keyof IBuyer>(infoType: T, info: IBuyer[T]): void {
    (this as any)[infoType] = info;
  }
  getInfo(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      phone: this.phone,
      email: this.email,
    };
  }
  removeInfo(): void {
    this.payment = null;
    this.address = "";
    this.phone = "";
    this.email = "";
  }
  validateInfo(): ValidErrors {
    const errors: ValidErrors = {};

    if (!this.payment) {
      errors.payment = "Не выбран вид оплаты";
    }
    if (this.phone.trim() == "") {
      errors.phone = "Укажите номер телефона";
    }
    if (this.email.trim() == "") {
      errors.email = "Введите Email";
    }
    if (this.address.trim() == "") {
      errors.address = "Необходимо указать адрес";
    }
    return errors;
  }
}
