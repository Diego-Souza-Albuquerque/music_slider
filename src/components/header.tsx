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
      <header className="flex items-center justify-between w-full py-4 px-12 border-b-[0.5px] border-gray-500">
        <span className="text-2xl font-black cursor-default">MUSIC SLIDER</span>

        <nav className="flex gap-10 items-center">
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
            <UserButton session={session} user={user} />
          ) : (
            <Link
              href="/login"
              className="hover:border-b hover:border-black dark:hover:border-white"
            >
              Minha Conta
            </Link>
          )}
          {/* Tema */}
          <ModeToggle />
        </nav>
      </header>
    </>
  );
}