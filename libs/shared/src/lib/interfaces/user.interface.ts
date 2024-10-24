export interface User {
    firstName:string;
    lastName:string;
    age:number;
    address:UserAddress;
    [k:string]:unknown;
}

export interface UserAddress {
    address:string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
        lat:number;
        lng:number;
    }
    country: string;

}