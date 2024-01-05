"use client";
import Link from "next/link";
import { ModeToggle } from "@/components/dark-mode-toggle";
import UserButton from "./UserButton";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAuth } from "@/contexts/userContext";

export default function Header() {
  const [autenticate, setAutenticate] = useState(false);
  const { data: session } = useSession();
  const { user } = useAuth();

  useEffect(() => {
    if (session && session.user) {
      setAutenticate(true);
    }

    if (user.user && user.token) {
      setAutenticate(true);
    }
  }, [session, user]);

  return (
    <>
      <header className="flex items-center justify-between w-full py-4 xl:px-12 lg:px-12 md:px-12 sm:px-6 px-6 border-b-[0.5px] border-gray-500">
        <span className="flex items-center text-2xl font-black cursor-default">
          MUSIC SLIDER
          {!autenticate && (
            <span className="pl-1 ">
              <ModeToggle />
            </span>
          )}
        </span>

        <nav className="flex xl:gap-10 lg:gap-10 md:gap-10 gap-3 pl-1 items-center ">
          <Link
            className="hover:border-b hover:border-black dark:hover:border-white"
            href="/"
          >
            Início
          </Link>
          <Link
            className="hover:border-b hover:border-black dark:hover:border-white"
            href="/slider"
          >
            Slider
          </Link>
          <Link
            className="hover:border-b hover:border-black dark:hover:border-white"
            href="/about"
          >
            Sobre
          </Link>

          {autenticate ? (
            <UserButton session={session} />
          ) : (
            <Link
              href="/login"
              className="hover:border-b hover:border-black dark:hover:border-white"
            >
              Login
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}
