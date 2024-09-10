export interface User{
    id : number;
    username : string;
    password: string;
    isAdmin : boolean;
}

export interface FoodItem {
    id : number;
    name : string;
    description : string;
    price : number;
    imageUrl : string;
}

export interface Order {
    id : number;
    userId : number;
    items : FoodItem [];
    total : number;
}