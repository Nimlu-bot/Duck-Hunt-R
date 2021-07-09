export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}
export interface IGame {
  id: string;
  dateTime: string;
  games: string[];
  user: IUser;
}
export interface IUserDTO {
  id: string;
  name: string;
  login: string;
}
export interface IGameDTO {
  id: string;
  dateTime: string;
  games: string[];
  user: IUserDTO;
}

export interface ILogin {
  login: string;
  password: string;
}

export interface IToken {
  token: string;
}
