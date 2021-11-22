import { useReducer } from "react";
import { createContext } from "react";
import UserReducer from "./UserReducer";

export const UserContext = createContext();

export const UserContextFunc = ({ children }) => {
  const initialState = {};

  const [userState, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={{ userState, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
