import { User } from "./user.interface";

export interface GetUsersResponse {
    skip:number;
    total:number;
    users:User[];
    limit:number;
}