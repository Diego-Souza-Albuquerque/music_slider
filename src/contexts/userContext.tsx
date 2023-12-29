"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type SignInData = {
  email: string;
  password: string;
};

type UserContextType = {
  signIn: (data: SignInData) => Promise<void>;
  user: any;
};

const UserContext = createContext({} as UserContextType);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [dataUser, setDataUser] = useState({});
  async function signIn({ email, password }: SignInData) {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      const { user, token } = await response.json();
      setDataUser({ user, token });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserContext.Provider value={{ signIn, user: dataUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(UserContext);
  return context;
}
