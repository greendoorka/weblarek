# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```

## Сборка

```
npm run build
```

или

```
yarn build
```

# Интернет-магазин «Web-Larёk»

«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component

Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`

#### Класс Api

Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter

Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` - хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

#### Данные

#### Интерфейс товара:

interface IProduct {
id: string;
description: string;
image: string;
title: string;
category: string;
price: number | null;
}

#### Интерфейс покупателя:

interface IBuyer {
payment: TPayment;
email: string;
phone: string;
address: string;
}

#### Модели данных

#### класс Catalogue

Класс хранит массив всех товаров и выбранный для подробного отображения товар.

конструктор принимает элемент по интерфейсу IEvents и создает пустой массив :
constructor(events: IEvents)

поля класса:
protected items: IProduct[];
protected chosenItem: IProduct | null;
protected events: IEvents;

методы

saveItems(newItems: IProduct[]): void - сохранение массива товаров полученного в параметрах метода. В качестве аргумента принимает массив по интерфейсу товара, ничего не возвращает, записывает в Items полученный массив и генерирует событие.

getItems(): IProduct[] - получение массива товаров из модели

getIdProduct(id: string): IProduct | undefined- получение одного товара по его id. В качестве аргумента принимает строку, возвращает объект по интерфейсу товара.

saveProduct(item: IProduct): void - сохранение товара для подробного отображения. В качестве аргумента принимает объект по интерфейсу товара, ничего не возвращает, сохраняет товар в chosenItem и генерирует событие.

getProduct(): IProduct | null - получение товара для подробного отображения. Без аргумента, возвращает объект по интерфейсу товара из chosenItem.

#### класс Cart

Хранит массив товаров, выбранных покупателем для покупки.

конструктор принимает элемент по интерфейсу IEvents и создает пустой массив :
constructor(events: IEvents)

поля класса:
itemsToBuy: IProduct[];
protected events: IEvents;

методы

getItemsToBuy(): IProduct[] - получение массива товаров, которые находятся в корзине.

addItem(product: IProduct): void - добавление товара, который был получен в параметре, в массив корзины. Принимает в аргумент объект по интерфейсу товара, ничего не возвращает, записывает объект в массив itemsToBuy и генерирует событие.

removeFromCart(product: IProduct): void - удаление товара, полученного в параметре из массива корзины. Принимает в аргумент объект по интерфейсу товара, ничего не возвращает, убирает объект из массива itemsToBuy и генерирует событие.

clearCart(): void -очистка корзины.Без аргумента, ничего не возвращает. Убирает все элементы из массива itemsToBuy и генерирует событие.

totalPrice(): number - получение стоимости всех товаров в корзине. Без аргументов, возвращает число.

totalItemsInCart(): number - получение количества товаров в корзине. Без аргументов, возвращает число.

availableItem(id: string): boolean -проверка наличия товара в корзине по его id, полученного в параметр метода. Принимает в аргумент строку, возвращает true, если товар есть, false, если товара нет.

#### класс Buyer

класс с информацией о покупателе
конструктор создает объект с пустыми значениями:
constructor(events: IEvents){
}
поля класса:
protected events: IEvents;
private payment: TPayment | null;
private address: string;
private phone: string;
private email: string;
protected events: IEvents

методы
saveInfo<T extends keyof IBuyer>(infoType: T, info: IBuyer[T]): void - сохранение данных в модели. Дженерик метод позволяет сохранять данные о покупателе в объект. Первым аргументом принимает тип информации исходя из возможных вариантов ключей покупателя, вторым - саму информацию. метод также генерирует событие.

getBuyerInfo(): IBuyer - получение всех данных покупателя. Без аргумента, возвращает объект по интерфейсу покупателя.

removeBuyerInfo(): void - очистка данных покупателя. Без аргумента, убирает значение объекта и генерирует событие.

validateInfo(): ValidErrors - проверяет валидность отдельных данных. Возвращает объект, где ключи - имена полей, а значение - текст ошибки.

##### Слой коммуникации

##### Класс Communication

класс для коммуникации с сервером.

конструктор принимает объект по интерфейсу IApi:
constructor(api: IApi){
this.api = api;
}
поля класса
api: IApi

методы
getAllItems() : Promise<IProductList> - GET-запрос на сервер, возвращает промис с массивом товаров по интерфейсу IProduct, и общее количество товаров

sendOrder(order: IOrder): Promise<IOrderCheck> - отправляет данные через POST-запрос на сервер. В аргументах заказ по интерфесу IOrder, возвращает промис по интерфесу IOrderCheck.

###### Слой View

#### Интерфейсы и типы данных

interface IFormChange {
field: "payment" | "address" | "email" | "phone";
type?: string;
value?: string;
}
interface IOnAction {
onClick?: (event: MouseEvent) => void;
}
interface IBasket {
items: HTMLElement[];
total: number;
disabled: boolean;
}

interface IBasketCard extends TCard {
itemIndex: number;
}

export type TCard = Pick<IProduct, "title" | "price">;

export type TGalleryCard = Pick<IProduct, "category" | "image">;

export interface IFullCard extends TGalleryCard {
buttonDisabled: boolean;
description: string;
buttonText: string;
}

type TContactsForm = Pick<IBuyer, 'phone'| 'email'>

interface IForm {
errors: string | undefined;
valid: boolean;
}

type TOrder = Pick<IBuyer, "address" | "payment">;

interface IGallery {
items: HTMLElement[];
}

interface IHeader{
counter: number;
}

interface IModal{
content: HTMLElement
}

interface ISuccessOrder{
sinapsDeduct: number;
}

###### Класс Header extends Component<IHeader>

Класс отвечает за шапку сайта, является дочерним классом Component с параметром типа IHeader

конструктор принимает события по интерфейсу IEvents и контейнер с типом HTMLElement. вызывает конструктор родителя, находит элемент-счетчик, элемент корзины, устанавливает слушатель событий на корзину
constructor(events:IEvents, container: HTMLElement)

поля класса
protected container: HTMLElement;
protected counterElement: HTMLElement ;
protected basketButton: HTMLButtonElement ;
protected events: IEvents;

методы класса
protected set counter(value:number) - сеттер принимает число, меняет текст у элемента счетчика;

###### Класс Gallery extends Component<IGallery>

Класс отвечает отображение карточек товаров, является дочерним классом Component с параметром типа IGallery;

конструктор принимает контейнер типа HTMLElement и вызывает конструктор родителя
constructor(container: HTMLElement)

поля класса
protected container: HTMLElement;

методы класса
protected set items(items: HTMLElement[]) - сеттер принимает массив HTML-элементов и устанавливает/заменяет их на странице(контейнере)

###### Класс Card<T = object> extends Component< TCard & T>

Абстрактный Класс карточки товара является 1. дженериком, по умолчанию параметр типа - объект, 2. дочерним классом Component в качестве параметра типа принимает тип TCard и дженерика Т

конструктор принимает контейнер с типом HTMLElement, вызывает конструктор родителя, находит элемент названия и элемент ценника, может найти также элемент-категорию и элемент-картинку
constructor(container: HTMLElement)

поля класса
protected container: HTMLElement;
protected titleElement: HTMLElement;
protected priceElement: HTMLElement;

методы класса
protected set title(value: string) - сеттер принимает значение по типу строки и меняет текст элемента-названия.

protected set price(value: number) - сеттер принимает значение по типу числа и меняет текст элемента-ценника.

###### Класс GalleryCard extends Card<TGalleryCard>

класс карточки товара в галерее является дочерним классом Card, который в качестве параметра типа принимает тип TGalleryCard

конструктор принимает HTML-элемент и может принять параметр по типу IOnAction. вызывает конструктор родителя, находит элемент категории и элемент картинки и устанавливает слушатель событий, если есть второй параметр
constructor(container: HTMLElement, action?: IOnAction)

поля класса
protected action?: IOnAction
container: HTMLElement;
protected categoryElem: HTMLElement;
protected imgElem: HTMLImageElement;

методы класса
protected set category(value: string): void - сеттер принимает значение по типу строки и меняет текст элемента-категории, так же находит класс соответствующий value из categoryMap и добавляет его элементу в разметке.

protected set image(value: string): void - сеттер принимает значение по типу строки и устанавливает значение в атрибут элемента-картинки,так же устанавливает атрибут alt

###### Класс FullCard extends Card<IFullCard>

класс полной карточки товара является дочерним класса Card с параметром типа IFullCard;

конструктор принимает HTML-элемент и параметр по типу IEvents. Вызывает конструктор родителя,находит элемент категории и элемент картинки, элемент-описание, кнопку покупки,устанавливает обработчик событий.
constructor(container: HTMLElement, events: IEvents)

поля класса
protected events: IEvents;
protected descriptionElem: HTMLElement;
protected buyButtonElem:HTMLButtonElement;
container: HTMLElement
protected categoryElem: HTMLElement;
protected imgElem: HTMLImageElement;

методы класса
protected set description(value: string)- сеттер принимает значение по типу строки и устанавливает текст элементу-описанию

protected set buttonText(value : string) - сеттер принимает строку в качестве параметра и меняет текст кнопки

protected set buttonDisabled(value:boolean)- сеттер принимает переменную булева типа, и устанавливает состояние доступности кнопки.

protected set category(value: string): void - сеттер принимает значение по типу строки и меняет текст элемента-категории, так же находит класс соответствующий value из categoryMap и добавляет его элементу в разметке.

protected set image(value: string): void - сеттер принимает значение по типу строки и устанавливает значение в атрибут элемента,так же устанавливает атрибут alt

###### Класс BasketCard extends Card<IBasketCard>

класс карточки товара в корзине является дочерним классом Card с параметром типа IBasketCard

конструктор принимает HTML-элемент и может принять элемент с типом IOnAction, вызывает конструктор родителя, так же находит кнопку удалить и элемент с порядковым номером в корзине, устанавливает слушатель событий на кнопку, если есть второй параметр
constructor(container:HTMLElement, events: IEvents)

поля класса
protected action?: IOnAction;
container: HTMLElement;
protected removeButton: HTMLButtonElement;
protected basketItemIndex: HTMLElement;

методы класса
protected set itemIndex(value: number) - сеттер принимает число и меняет текст в элементе.

###### Класс Form<T> extends Component<IForm & T>

Абстрактный класс формы общего вида является дженериком и дочерним классом Component c параметром типа IForm и дженериком

конструктор принимает 2 параметра - HTML-элемент и элемент по интерфейсу IEvents. Конструктор находит кнопку, контейнер для ошибок, подписывается на события
constructor(container: HTMLElement, events: IEvents)

поля класса
container: HTMLElement;
protected submitButton: HTMLButtonElement;
protected errorsElem: HTMLElement;
protected events: IEvents;

методы класса
protected set isValid(value: boolean) - сеттер валидности для форм
protected set errors(value: string) - сеттер текста ошибок

###### Класс OrderForm extends Form<TOrder>

Класс формы заказа является дочерним класса Form с параметром типа TOrder

конструктор принимает HTML-элемент и элемент по интерфейсу IEvents,вызывает конструктор родителя, находит элемент кнопки выбора оплаты, элемент ввода адреса, так же устанавливает слушатель событий
constructor(container: HTMLElement, events: IEvents)

поля класса
container: HTMLElement;
protected events: IEvents;
protected orderButtons:HTMLButtonElement[];
protected addressInput: HTMLInputElement;

методы класса
protected set payment(value: TPayment | null)- сеттер устанавливает тип оплаты, принимает в качестве аргумента значение по типу TPayment или null
protected set address(value: string) -сеттер принимает в качестве аргумента строку и устанавливает адрес в форму

###### Класс ContactsForm extends Form<TContactsForm>

класс формы контактов является дочерним классом Form с параметром типа TContactsForm

конструктор принимает HTML-элемент и элемент по интерфейсу IEvents,вызывает конструктор родителя, находит поля ввода телефона и почты,устанавливает слушатель событий.
constructor(container: HTMLElement, events: IEvents)

поля класса
protected emailInput: HTMLInputElement;
protected phoneInput: HTMLInputElement;

методы класса
protected set phone(value: string) - сеттер принимает строку и устанавливает значение в поле ввода телефона
protected set email (value: string) - сеттер принимает строку и устанавливает значение в поле ввода почты

###### Класс Basket extends Component<IBasket>

класс корзины товаров является дочерним класса Component с параметром типа IBasket

конструктор принимает 2 параметра - HTML-элемент и элемент по типу IEvents. конструктор находит кнопку "Оформить", элемент списка товаров, элемент с подсчетом суммы всех товаров в корзине, устанавливает слушатель событий.
constructor(container: HTMLElement,events: IEvents;)

поля класса
protected events: IEvents;
protected basketListElem: HTMLElement;
protected basketBuyButton: HTMLButtonElement;
protected basketPriceElem: HTMLElement;
container: HTMLElement

методы класса
protected set items(item: HTMLElement[]) - сеттер принимает массив элементов c типом HTMLElement, отображает этот массив в корзине.
protected set total(value:number) - сеттер принимает число и меняет текст в разметке
protected set disabled(value: boolean) -сеттер принимает переменную булева типа, и устанавливает состояние доступности кнопки.

###### Класс Modal extends Component<IModal>

класс модального окна является дочерним классом Component с параметром типа IModal

конструктор принимает HTML-элемент и вызывает конструктор родителя, находит кнопку закрыть, элемент внутри модального окна,элемент модального окна. Добавляет обработчик событий на кнопку и элементы.
constructor(container:HTMLElement)

поля класса
container: HTMLElement;
protected closeButtonElement: HTMLButtonElement;
protected contentElement: HTMLElement;
protected windowElement: HTMLElement;

методы класса
protected set content(value: HTMLElement): void - сеттер принимает значение по типу HTML-элемента и устанавливает содержимое модального окна

open(): void - метод добавляет класс 'modal_active' странице

close(): void -метод убирает класс 'modal_active' странице

render(data?: Partial<IModal>): HTMLElement - метод может принимать элемент по интерфейсу IModal, вызывает метод render родителя, вызывает метод open и возвращает HTML-элемент;

###### Класс SuccessOrder extends Component<ISuccessOrder>

класс успешно завершенного заказа

конструктор принимает HTML-элемент и параметр по типу IEvents, находит элемент успешно завершенного заказа, кнопку и элемент, в котором указано списание синапсов, а так же подписывает на события.
constructor(container: HTMLElement, events: IEvents)

поля класса
protected events: IEvents;
container: HTMLElement;
protected buttonContinue: HTMLButtonElement;
protected sinapsDeductElem:HTMLElement;

методы класса
protected set sinapsDeduct(value: number): void - метод принимает значение по типу числа, устанавливает значение в элемент, в котором указано списание синапсов.

###### События моделей данных

# события класса Buyer

buyerForm:change - событие генерируется когда были изменены данные покупателя.

# События класса Cart

cart:change - cобытие генерируется, когда происходит изменение корзины

# События класса Catalogue

catalogue:changed - cобытие генерируется, когда произошли изменения каталога

item:chosen - cобытие генерируется, когда была выбрана карточка товара.

###### События компонентов View

# События класса FullCard

buyButton:click - cобытие генерируется при нажатии на кнопку 'Купить' и 'Удалить из корзины' на полной карточке товара в конструкторе класса в слушателе событий на кнопке buyButtonElem

# События класса ContactsForm и класса OrderForm

form:changed - событие генерируется при выборе кнопки типа оплаты и при вводе текста в форму,в событие передается объект с полем, которое указывает нажали на кнопку или вводят в форму текст, и значением кнопки на которую нажали или значение поля формы.

# События класса Form

submit:click - событие генерируется при нажатии на кнопку далее или оформить в формах,в событие передается объект с именем формы,в которой была эта кнопка.

# События класса Basket

order:open - событие генерируется при нажатии на кнопку basketBuyButton

# События класса Header

basketButton:click - событие генерируется при нажатии на кнопку basketButton.

# События класса SuccessOrder

success:continue - событие генерируется при нажатии на кнопку buttonContinue.

# События презентера

removeButton:click - cобытие генерируется, когда нажата кнопка removeButton, в событие передается объект с ID карточки товара на котором была эта кнопка . при создании карточек товара в корзине

galleryCard:click - cобытие генерируется, когда нажата карточка товара в галерее, в событие передается объект с ID товара при создании карточек в галерее

###### Презентер

Презентер связывает модели данных и их представления через события

Модели данных отвечают за логику.
Представление данных отвечает за отображение.
