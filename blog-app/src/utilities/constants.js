const ROOT_URL = 'https://mighty-oasis-08080.herokuapp.com/api/';

const Articles_URL = ROOT_URL + 'articles';
const Tags_URL = ROOT_URL + 'tags';

const Login_URL = ROOT_URL + 'users/login';
const Register_URL = ROOT_URL + 'users';
const User_Verify_URL = ROOT_URL + 'user';
const Feed_URL = ROOT_URL + "articles/feed";
const Profile_URL = ROOT_URL + "profiles/";

const Local_Storage_Key = "app_user"

export { ROOT_URL, Articles_URL, Tags_URL, Login_URL, Register_URL, Local_Storage_Key, User_Verify_URL, Feed_URL, Profile_URL };