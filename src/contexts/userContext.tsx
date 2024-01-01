"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type SignInData = {
  email: string;
  password: string;
};

type UserContextType = {
  signIn: (data: SignInData) => Promise<boolean> | null;
  user: any;
};

const UserContext = createContext({} as UserContextType);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [dataUser, setDataUser] = useState({});
  async function signIn({ email, password }: SignInData) {
    let pass = false;
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      const { user, token } = await response.json();
      localStorage.setItem("@musicSlider:user", JSON.stringify(user));
      localStorage.setItem("@musicSlider:token", token);
      setDataUser({ user, token });
      pass = true;
      return pass;
    } catch (error) {
      console.log(error);
      return pass;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("@musicSlider:token");
    const user = localStorage.getItem("@musicSlider:user");
    console.log("Token:", token);
    console.log("User:", user);

    if (token && user) {
      setDataUser({ token, user /* : JSON.parse(user) */ });
    }
  }, []);

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
