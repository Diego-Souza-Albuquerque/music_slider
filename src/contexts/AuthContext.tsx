import { createContext, useState } from "react";
import { setCookie } from "nookies";
import Router from "next/router";
import { singInRequest } from "@/services/auth";

type User = {
  name: string;
  email: string;
  avatar: string;
};

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInData) {
    console.log("chamou");
    const { token, user } = await singInRequest({
      email,
      password,
    });

    setCookie(undefined, "slider.token", token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    setUser(user);

    Router.push("/sobre");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
