// src/app/models/login-response.model.ts
import { Status } from "./user";

export class LoginResponse {
  idUser: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  city: string;
  avatar: string;
  status: Status;
  token: string;

  constructor(idUser: number, name: string, surname: string, username: string, email: string, city: string, avatar: string, status: Status, token: string
  ) {
    this.idUser = idUser;
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.email = email;
    this.city = city;
    this.avatar = avatar;
    this.status = status;
    this.token = token;
  }
}
