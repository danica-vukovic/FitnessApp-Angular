export class UserRequest {
  name: string;
  surname: string;
  city: string;
  avatar: string;
  email: string;
  constructor(name: string, surname: string, city: string, avatar: string, email: string) {
    this.name = name;
    this.surname = surname;
    this.city = city;
    this.avatar = avatar;
    this.email = email;
  }
}
