export class User{
  name!:string;
  email!:string;
  password!:string;
  uploadPhoto!:string;
  role!:string;
  // id!:number;
  mobileNumber!:string;
  address!:Address;
  gender!:string;
  language!:string;
  DOB!:string;
  agreetc!:boolean;
  age!:number;
  aboutyou!:string;
}
export class Address{
  id!:number;
  addline1!:string;
  addline2!:string;
  city!:string;
  state!:string;
  zipcode!:number;
}

export class Product{
  id!:number;
  name!:string;
  description!:string;
  price!:number;
  category!:string;
  uploadPhoto!:string;
  quantity!:number;
  uploadproductPhoto!:string;
  dp!:number;
  status!:boolean;
}
export class order{
  id!:number;
  userId!:number;
  sellerId!:number;
  product!:Product;
  quantity!:number;
  price!:number;
  status!:string;
  deliveryaddress!:Address;
  user!:User;
  contactnumber!:string;
  datetime!:string;
}
