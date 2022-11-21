export class User {
  id?: number;
  username?: string;
  password?: string;
  name?: string;
  surname?: string;
  roleId?: number;

  constructor(roleId: number, username?: string, password?: string, name?: string, surname?: string){
    this.roleId = roleId;

    this.username = username? username: "";
    this.password = password? password: "";
    this.name = name? name: "";
    this.surname = surname? surname: "";
  }
}
