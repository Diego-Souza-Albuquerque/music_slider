"use client";
import Link from "next/link";
import { ModeToggle } from "@/components/dark-mode-toggle";
import UserButton from "./UserButton";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAuth } from "@/contexts/userContext";

export default function Header() {
  const [autenticate, setAutenticate] = useState(false);
  const [scrolling, setScrolling] = useState(true);
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

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolling(prevScrollY > currentScrollY);

      prevScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`flex z-40 dark:bg-gray-900 duration-300 bg-white fixed items-center justify-between w-full py-4 xl:px-12 lg:px-12 md:px-12 sm:px-6 px-6 border-b-[0.5px] border-gray-500 ${
          scrolling ? "top-0 " : "-top-20"
        }  `}
      >
        <span className=" text-2xl font-black cursor-default">
          MUSIC SLIDER
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
          {/*   <Link
            className="hover:border-b hover:border-black dark:hover:border-white"
            href="/about"
          >
            Sobre
          </Link> */}

          {autenticate ? (
            <UserButton session={session} />
          ) : (
            <div className="flex items-center gap-10">
              <Link
                href="/login"
                className="hover:border-b hover:border-black dark:hover:border-white"
              >
                Login
              </Link>
              {!autenticate && (
                <span className="pl-1 ">
                  <ModeToggle />
                </span>
              )}
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
