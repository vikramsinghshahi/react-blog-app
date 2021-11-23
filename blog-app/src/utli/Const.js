const Root_URL = "https://mighty-oasis-08080.herokuapp.com/api/";

let articlesURL = Root_URL + 'articles';

let signupURL = Root_URL + 'users';
let loginURL = Root_URL + 'users/login';
const tagsURL = Root_URL + 'tags';
const localStorageKey = "app_user"
let userVerifyUrl = Root_URL + 'user';
export { Root_URL, articlesURL, tagsURL, signupURL, loginURL, localStorageKey, userVerifyUrl };