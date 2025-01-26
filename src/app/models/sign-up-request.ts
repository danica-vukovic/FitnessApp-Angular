export class SignUpRequest {
    name: string;
    surname: string;
    username: string;
    password: string;
    email: string;
    city: string;
    avatar:string;

    constructor(name:string, surname:string, username:string, password:string, email:string, phoneNumber:string, city:string, avatar:string){
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.password = password;
        this.email = email;
        this.city = city;
        this.avatar = avatar;
    }
}
