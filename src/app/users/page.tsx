"use client";

import { useState, useContext, useEffect } from "react";

import Link from "next/link";

type UserType = {
  _id: string;
  name: string;
  email: string;
  preferences: {
    bgBlack: boolean;
    logo: boolean;
  };
  createdAt: string;
};

export default function Login() {
  const [users, setUsers] = useState<UserType[]>([]);

  const people = [
    {
      name: "Lindsay Walton",
      title: "Front-end Developer",
      email: "lindsay.walton@example.com",
      role: "Member",
    },
    // More people...
  ];

  const handleFetchUsers = () => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Erro ao buscar usuários:", error));
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  /* const excluirUser = (formdata: any) => {
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => console.error("Erro ao cadastrar usuário:", error));
  }; */

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <h2 className="text-white text-lg mt-5">
          Gerenciamento dos usuários cadastrados no sistema:
        </h2>

        <div className="bg-gray-900 my-10">
          <div className="mx-auto max-w-7xl">
            <div className="bg-gray-900 py-5">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="mt-2 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                            >
                              Nome
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3.5 text-left text-sm font-semibold text-white"
                            >
                              E-mail
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3.5 text-left text-sm font-semibold text-white"
                            >
                              Cor de fundo preta?
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3.5 text-left text-sm font-semibold text-white"
                            >
                              Logo ativa?
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3.5 text-left text-sm font-semibold text-white"
                            >
                              Data de criação
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                            >
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                          {users?.map((user) => (
                            <tr key={user.email}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-7 text-sm font-medium text-white sm:pl-0">
                                {user.name}
                              </td>
                              <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-300">
                                {user.email}
                              </td>
                              <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-300">
                                {user.preferences.bgBlack.toString()}
                              </td>
                              <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-300">
                                {user.preferences.logo.toString()}
                              </td>
                              <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-300">
                                {user?.createdAt?.replace(
                                  /^(\d{4})-(\d{2})-(\d{2}).*$/,
                                  "$3/$2/$1"
                                )}
                              </td>

                              <td className="relative whitespace-nowrap py-4 pl-10 pr-4 text-right text-sm font-medium sm:pr-0">
                                <a
                                  href="#"
                                  className="text-indigo-400 hover:text-indigo-300"
                                >
                                  Editar
                                  <span className="sr-only">, {user.name}</span>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
