import "./scss/styles.scss";
import { Catalogue } from "./components/Models/Catalogue";
import { Cart } from "./components/Models/Cart";
import { Buyer } from "./components/Models/Buyer";
import { TPayment, IOrder } from "./types";
import { Communication } from "./components/Communication";
import { API_URL } from "./utils/constants";
import { Api } from "./components/base/Api";
import { Header } from "./components/View/Header";
import { EventEmitter } from "./components/base/Events";
import { ensureElement } from "./utils/utils";
import { Gallery } from "./components/View/Gallery";
import { cloneTemplate } from "./utils/utils";
import { GalleryCard } from "./components/View/card/GalleryCard";
import { FullCard } from "./components/View/card/FullCard";
import { BasketCard } from "./components/View/card/BasketCard";
import { OrderForm } from "./components/View/form/OrderForm";
import { ContactsForm } from "./components/View/form/ContactsForm";
import { Basket } from "./components/View/Basket";
import { Modal } from "./components/View/Modal";
import { SuccessOrder } from "./components/View/SuccessOrder";
import { IFormChange } from "./types";

const events = new EventEmitter();
const cart = new Cart(events);
const buyer = new Buyer(events);
const catalogue = new Catalogue(events);
const api = new Api(API_URL);
const communication = new Communication(api);

const basketTemp = new Basket(cloneTemplate("#basket"), events);
const successTempl = new SuccessOrder(cloneTemplate("#success"), events);
const contactsTempl = new ContactsForm(cloneTemplate("#contacts"), events);
const orderTempl = new OrderForm(cloneTemplate("#order"), events);
const modal = new Modal(ensureElement(".modal"));
const gallery = new Gallery(ensureElement<HTMLElement>(".gallery"));
const header = new Header(events, ensureElement(".header"));

events.on("catalogue:changed", () => {
  const galleryCards = catalogue.getItems().map((item) => {
    return new GalleryCard(cloneTemplate<HTMLElement>("#card-catalog"), {
      onClick: () => events.emit("galleryCard:click", { id: item.id }),
    }).render({
      image: item.image,
      title: item.title,
      category: item.category,
      price: item.price,
    });
  });
  gallery.render({ items: galleryCards });
});

events.on("galleryCard:click", (data: { id: string }) => {
  const product = catalogue.getIdProduct(data.id);
  if (product) {
    catalogue.saveProduct(product);
  }
});

events.on("item:chosen", () => {
  const fullcardTemp = new FullCard(
    cloneTemplate<HTMLElement>("#card-preview"),
    events,
  );
  const chosenItem = catalogue.getProduct();
  if (chosenItem) {
    const isAlreadyInCart = cart.availableItem(chosenItem.id);
    const available = chosenItem.price === null;
    const buttonText = available
      ? "Недоступно"
      : isAlreadyInCart
        ? "Удалить из корзины"
        : "Купить";
    const fullCardHtml = fullcardTemp.render({
      description: chosenItem.description,
      title: chosenItem.title,
      price: chosenItem.price,
      buttonText: buttonText,
      buttonDisabled: available,
      image: chosenItem.image,
      category: chosenItem.category,
    });
    modal.render({ content: fullCardHtml });
  }
});

events.on("buyButton:click", () => {
  const product = catalogue.getProduct();
  if (product) {
    if (cart.availableItem(product.id)) {
      cart.removeFromCart(product);
      modal.close();
    } else if (product && product.price !== null) {
      cart.addItem(product);
      modal.close();
    }
  }
});

events.on("cart:change", () => {
  header.render({
    counter: cart.totalItemsInCart(),
  });
  const items = cart.getItemsToBuy().map((item, index) => {
    return new BasketCard(cloneTemplate<HTMLElement>("#card-basket"), {
      onClick: () => events.emit("removeButton:click", item),
    }).render({
      title: item.title,
      price: item.price,
      itemIndex: index + 1,
    });
  });
  const total = cart.totalPrice();
  const isAvailable = cart.totalItemsInCart() === 0;
  basketTemp.render({ items: items, total: total, disabled: isAvailable });
});

events.on("basketButton:click", () => {
  const items = cart.getItemsToBuy().map((item, index) => {
    return new BasketCard(cloneTemplate<HTMLElement>("#card-basket"), {
      onClick: () => events.emit("removeButton:click", { id: item.id }),
    }).render({
      title: item.title,
      price: item.price,
      itemIndex: index + 1,
    });
  });
  const total = cart.totalPrice();
  const basket = basketTemp.render({ items, total });
  modal.render({ content: basket });
});
events.on("removeButton:click", (data: { id: string }) => {
  const product = catalogue.getIdProduct(data.id);
  if (product) {
    cart.removeFromCart(product);
  }
});
events.on("order:open", () => {
  const orderForm = orderTempl.render();
  modal.render({ content: orderForm });
});

events.on("form:changed", (data: IFormChange) => {
  if (data.field === "payment" && data.type) {
    const payment = data.type as TPayment;
    buyer.saveInfo("payment", payment);
  }

  if (data.field === "address" && data.value !== undefined) {
    buyer.saveInfo("address", data.value);
  }
  if (data.field === "email" && data.value !== undefined) {
    buyer.saveInfo("email", data.value);
  }
  if (data.field === "phone" && data.value !== undefined) {
    buyer.saveInfo("phone", data.value);
  }
});
events.on("buyerForm:change", (data: { field: string }) => {
  const errors = buyer.validateInfo();
  const info = buyer.getInfo();

  if (!data || data.field === "payment" || data.field === "address") {
    const orderErrors = [];
    if (errors.payment) {
      orderErrors.push(errors.payment);
    }

    if (errors.address) {
      orderErrors.push(errors.address);
    }

    orderTempl.render({
      errors: orderErrors.join(", "),
    });

    const isOrderValid = !!info.payment && !!info.address.trim();

    orderTempl.render({
      valid: isOrderValid,
      payment: info.payment,
      address: info.address,
    });
  }

  if (data.field === "email" || data.field === "phone") {
    const contactsErrors = [];
    if (errors.email) {
      contactsErrors.push(errors.email);
    }
    if (errors.phone) {
      contactsErrors.push(errors.phone);
    }
    contactsTempl.render({
      errors: contactsErrors.join(", "),
    });

    const info = buyer.getInfo();
    const isContactsValid = !!info.email?.trim() && !!info.phone?.trim();

    contactsTempl.render({
      valid: isContactsValid,
      email: info.email,
      phone: info.phone,
    });
  }
});

events.on("submit:click", (data: { formName: string }) => {
  if (data.formName === "order") {
    const contactsForm = contactsTempl.render();
    modal.render({ content: contactsForm });
  }
  if (data.formName === "contacts") {
    const items = cart.getItemsToBuy().map((item) => {
      return item.id;
    });
    const { address, phone, email, payment } = buyer.getInfo();
    const order: IOrder = {
      address,
      phone,
      email,
      payment,
      total: cart.totalPrice(),
      items: items,
    };
    communication
      .sendOrder(order)
      .then((data: { id: string; total: number }) => {
        const success = successTempl.render({ sinapsDeduct: data.total });
        modal.render({ content: success });
        cart.clearCart();
        buyer.removeInfo();
      })
      .catch((e) => console.log("Ошибка при отправке заказа", e));
  }
});
events.on("success:continue", () => {
  modal.close();
});
events.on("info:removed", () => {
  contactsTempl.render({ valid: false, email: "", phone: "" });
  orderTempl.render({ valid: false, payment: null, address: "" });
});

await communication
  .getAllItems()
  .then((data) => {
    catalogue.saveItems(data.items);
  })
  .catch((e) => console.log("Ошибка при загрузке каталога:", e));
