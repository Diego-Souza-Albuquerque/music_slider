"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { LogOut, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserButton({ session, user }: any) {
  console.log(user);

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
    </>
  );
}
