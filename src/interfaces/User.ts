export default interface User {
  id?: string;
  name?: string;
  email: string;
  password: string;
  isBusiness?: boolean;
  isLoggedIn?: boolean;
  //   favoriteCards?: string[];
  //   myCardsArr?: string[];
}
