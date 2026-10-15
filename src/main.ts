import "./scss/styles.scss";
import { Catalogue } from "./components/Models/Catalogue";
import { Cart } from "./components/Models/Cart";
import { Buyer } from "./components/Models/Buyer";
import {
  ApiPostMethods,
  IApi,
  IProduct,
  IBuyer,
  TPayment,
  ValidErrors,
} from "./types";
import { Communication } from "./components/Communication";
import { apiProducts } from "./utils/data";
import { API_URL } from "./utils/constants";
import { Api } from "./components/base/Api";

const cart = new Cart();
const buyer = new Buyer();
const catalogue = new Catalogue();
const api = new Api(API_URL);
const communication = new Communication(api);

catalogue.saveItems(apiProducts.items);
console.log(catalogue.getItems());
console.log(catalogue.getIdProduct(apiProducts.items[2].id));
catalogue.saveProduct(apiProducts.items[2]);
console.log(catalogue.getProduct());

cart.addItem(apiProducts.items[1]);
console.log(cart.getItemsToBuy());
cart.addItem(apiProducts.items[2]);
console.log(cart.totalPrice(), cart.totalItemsInCart());
console.log(cart.availableItem(apiProducts.items[2].id));
cart.removeFromCart(apiProducts.items[2]);
console.log(cart.availableItem(apiProducts.items[1].id));
cart.clearCart();
console.log(cart.getItemsToBuy());

buyer.saveInfo("email", "aa@exm.com");
console.log(buyer.getInfo());
buyer.saveInfo("phone", "8912345");
console.log(buyer.validateInfo());
buyer.removeInfo();
console.log(buyer.getInfo());

await communication
  .getAllItems()
  .then((data) => {
    catalogue.saveItems(data.items);
    console.log(catalogue.getItems());
  })
  .catch((e) => console.log("Ошибка при загрузке каталога:", e));
