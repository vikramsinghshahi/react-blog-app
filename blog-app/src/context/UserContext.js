import { createContext } from "react";

let UserContext = createContext();

let UserProvider = UserContext.Provider;
let UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
export default UserContext;