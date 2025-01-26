export class Coordinator {
    idCoordinator: number;
    name: string;
    surname: string;
    username: string;
  
    constructor(
      idCoordinator: number,
      name: string,
      surname: string,
      username: string,

    ) {
      this.idCoordinator = idCoordinator;
      this.name = name;
      this.surname = surname;
      this.username = username;
    }
  }