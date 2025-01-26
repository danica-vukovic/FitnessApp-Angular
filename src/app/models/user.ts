export class User {
  idUser: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  city: string;
  avatar: string;
  status: Status;

  constructor(idUser: number, name: string, surname: string, username: string, email: string, city: string, avatar: string, status: Status
  ) {
    this.idUser = idUser;
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.email = email;
    this.city = city;
    this.avatar = avatar;
    this.status = status;
  }
}

export enum Status {
  REQUESTED = 'REQUESTED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
