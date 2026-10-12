export class Buyer {
  constructor(){
  this.payment= null;
  this.address = '';
  this.phone =  '';
  this.email = '';
}
  payment: TPayment;
  address: string;
  phone: string;
  email: string;
 
  saveInfo<t extends keyof IBuyer>(infoType: t, info: IBuyer[t]): void{
   (this as any)[infoType] = info;
  }
  getInfo(): IBuyer {
   return{payment: this.payment,
          address: this.address,
        phone: this.phone,
        email:this.email}
  }
  removeInfo(): void{
  this.payment = null;
  this.address = '';
  this.phone =  '';
  this.email = '';
  }
validateInfo(): ValidErrors {
const errors: ValidErrors= {}
const regPhone = /^(?:\+7|8)\d{10}$/;
const regAddress = /^[\s,.\d\wа-яА-ЯёЁ№-]{7,}$/u;
const regEmail = /^[\w.-]+@[\w.-]+\.[a-z]{2,}$/ ; 

if(!this.payment){
  errors.payment = 'Не выбран вид оплаты';
}
if(this.phone.trim() == ''){
errors.phone = 'Укажите номер телефона';
} else 
if(!regPhone.test(this.phone.trim())){
errors.phone = 'Неверный номер телефона';
}

if(this.email.trim() == ''){
errors.email = 'Укажите емэйл';
} else if(!regEmail.test(this.email.trim())){
errors.email = 'Неверный емэйл';
}

if(this.address.trim() == ''){
errors.address = 'Укажите адрес';
} else if(!regAddress.test(this.address.trim())){
errors.address = 'Неверный адрес';
}
return errors
}
isValid(): boolean{
  const errors = this.validateInfo();
  return Object.keys(errors).length === 0 ;
}
}