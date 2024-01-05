"use client";
import React, { useEffect, useState, Fragment } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { LogOut, Settings, User } from "lucide-react";
import { useAuth } from "@/contexts/userContext";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { Checkbox } from "@/components/ui/checkbox";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/20/solid";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserButton({ session }: any) {
  const { signOutDefault, user } = useAuth();

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const blackBackground = () => {
    checked ? setChecked(false) : setChecked(true);
  };

  return (
    <>
      {/* Login with Google Account */}
      {session && session.user && session.user.image && (
        <div className="flex gap-4 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={session.user.image}
                alt={session.user.image}
                width={32}
                height={32}
                className="rounded-full cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Minha Conta</span>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Prefências</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuSeparator />
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span onClick={() => signOut()}>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Login with Server Account */}
      {user.user && user.token && (
        <div className="flex gap-4 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {user?.user?.image ? (
                <Image
                  src={user.user.image}
                  alt="Imagem do usuário"
                  width={32}
                  height={32}
                  className="rounded-full cursor-pointer"
                />
              ) : (
                <Image
                  src={"/userImage.png"}
                  alt="Imagem do usuário"
                  width={32}
                  height={32}
                  className="rounded-full cursor-pointer border-white border-[1px]"
                />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{user.user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Minha Conta</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleClick}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Prefências</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuSeparator />
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span onClick={() => signOutDefault()}>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-[85vh]">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="h-full overflow-y-auto bg-white dark:bg-gray-900 p-4">
                      <div className="space-y-6 pb-16 ">
                        <div>
                          <h3 className="px-1 font-medium text-gray-900 text-xl dark:text-white ">
                            Preferências do usuário:
                          </h3>
                          <div className="mt-10 space-y-5">
                            {/* Tema */}
                            <div className="flex items-center gap-2">
                              <h2>Tema do sistema: </h2>
                              <ModeToggle />
                            </div>

                            <span className="flex w-full items-center justify-start gap-3 text-white">
                              <div>
                                <h1>Definição de cores dos slides:</h1>
                                <span className="flex items-center w-full">
                                  Inverter Cores:
                                  <Checkbox
                                    checked={checked}
                                    onCheckedChange={blackBackground}
                                    defaultChecked={false}
                                    className="ml-2 border-white"
                                  />
                                </span>
                              </div>
                              <span className="flex flex-col justify-start bg-black px-4 py-2">
                                <div className="flex gap-2 ">
                                  <h2>Cor Fundo:</h2>
                                  {user.user.preferences.bgBlack.toString() ===
                                  "true"
                                    ? "Preto"
                                    : "Branco"}
                                </div>
                                <div className="flex gap-2">
                                  <h2>Cor Texto:</h2>
                                  {user.user.preferences.bgBlack.toString() ===
                                  "true"
                                    ? "Branco"
                                    : "Preto"}
                                </div>
                              </span>
                            </span>

                            {/*   <div className="flex items-center gap-2">
                              <h2>Logo nos slides: </h2>
                              {user.user.preferences.logo.toString() === "true"
                                ? "Sim"
                                : "Não"}
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
