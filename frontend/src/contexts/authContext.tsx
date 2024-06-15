// Arquivo: AuthContextProvider.js
import { createContext, useState } from "react";
import { decodeToken } from "react-jwt";

import { postData } from "../services/API";

interface AuthContext {
  isLogged: boolean;
  user: any;
  error: string | null;

  signInAsMember?: (username: string, password: string) => Promise<object>; // Return type can be more specific
  signInAsAdmin?: (username: string, password: string) => Promise<object>; // Return type can be more specific
  signOut?: () => void;
  signInPersistent?: () => void;
}

const initialState: AuthContext = {
  isLogged: false,
  user: null,
  error: null,
};

const authContext = createContext<AuthContext>(initialState);

const AuthContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<null | string>(null);

  const signInAsAdmin = async (username: string, password: string) => {
    try {
      const body = {
        username,
        password,
      };
      const response = await postData("/admin/login", body);

      if (!response.status) {
        return response.response.data;
      }

      if (response.status === 200) {
        const teste = JSON.stringify(response.token);
        localStorage.setItem("token", teste);
        const decodedToken = decodeToken(response.token);
        setUser(decodedToken);
        setIsLogged(true);
      }

      return response;
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    }
  };

  const signInAsMember = async (username: string, password: string) => {
    try {
      const body = {
        username,
        password,
      };
      const response = await postData("/member/login", body);

      if (!response.status) {
        return response.response.data;
      }

      if (response.status === 200) {
        const teste = JSON.stringify(response.token);
        localStorage.setItem("token", teste);
        const decodedToken = decodeToken(response.token);
        setUser(decodedToken);
        setIsLogged(true);
      }

      return response;
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    }
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    setUser(null);
  };

  const signInPersistent = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken: string = decodeToken(token) as string;
      setUser(decodedToken);
      setIsLogged(true);
    }
  };

  return (
    <authContext.Provider
      value={{
        isLogged,
        error,
        signInAsMember,
        signInAsAdmin,
        signOut,
        user,
        signInPersistent,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export { authContext, AuthContextProvider };
