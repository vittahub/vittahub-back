import { Role } from "../types/Enums";

export class User {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public role: Role
  ){}
}