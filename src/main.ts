import './scss/styles.scss';
import { Catalogue } from './components/Models/Catalogue';
import { Cart } from './components/Models/Cart';
import { Buyer } from './components/Models/Buyer';
import { ApiPostMethods, IApi, IProduct, IBuyer, TPayment, ValidErrors, Communication } from './types';
import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';


const cart = new Cart();
const buyer = new Buyer();
const catalogue = new Catalogue();
const api = new Api(API_URL);
const communication = new Communication(api);

const apiProd = apiProducts;

catalogue.saveItems(apiProd.items);
console.log(catalogue.getItems());
console.log(catalogue.getIdProduct('854cef69-976d-4c2a-a18c-2aa45046c390'))
catalogue.saveProduct(apiProd.items[2])
console.log(catalogue.getProduct());

cart.addItem(apiProd.items[1]);
console.log(cart.getItemsToBuy());
cart.addItem(apiProd.items[2]);
console.log(cart.totalPrice(), cart.totalItemsInCart())
console.log(cart.availableItem('b06cde61-912f-4663-9751-09956c0eed67'));
cart.removeFromCart(apiProd.items[2]);
console.log(cart.availableItem('b06cde61-912f-4663-9751-09956c0eed67'));
cart.clearCart()
console.log(cart.getItemsToBuy())

buyer.saveInfo('email', 'aa@exm.com');
console.log(buyer.getInfo());
buyer.saveInfo('phone', '8912345')
console.log(buyer.isValid(),buyer.validateInfo());
buyer.removeInfo()
console.log(buyer.getInfo())

console.log(communication.getAllItems());
communication.getAllItems().then(data => catalogue.saveItems(data.items))
console.log(catalogue.getItems())



