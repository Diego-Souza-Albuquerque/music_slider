"use client";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/contexts/userContext";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Providers = (props: Props) => {
  return (
    <UserProvider>
      <SessionProvider>{props.children}</SessionProvider>
    </UserProvider>
  );
};

export default Providers;
