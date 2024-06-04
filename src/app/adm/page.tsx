"use client";

import { useState, useEffect, Fragment } from "react";
import { Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/20/solid";

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

type SlideType = {
  title: string;
  author: string;
  url: string;
  createdAt: string;
  _id: string;
};

export default function Adm() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [slides, setSlides] = useState<SlideType[]>([]);
  const [show, setShow] = useState(false);

  async function handleFetchUsers() {
    try {
      const response = await fetch(`${process.env.APP_API_URL}/getAllUsers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) { }
  }

  async function handleFetchSlides() {
    try {
      const response = await fetch(`${process.env.APP_API_URL}/getAllSlides`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setSlides(data);
    } catch (error) { }
  }

  async function handleDeleteSlide(_id: string) {
    try {
      const response = await fetch(
        `${process.env.APP_API_URL}/deleteSlide/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setShow(true);
      setSlides((prevSlides) =>
        prevSlides.filter((slide) => slide._id !== _id)
      );
      setTimeout(() => {
        setShow(false);
      }, 2500);
    } catch (error) { }
  }

  useEffect(() => {
    handleFetchUsers();
    handleFetchSlides();
  }, []);

  console.log(slides);

  return (
    <>
      {/* Usuários do sistema */}
      <div className="flex flex-col items-center w-full">
        <h2 className="text-white text-lg mt-5">
          Gerenciamento dos usuários cadastrados no sistema:
        </h2>

        <div className="bg-white my-5">
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
                            {/*  <th
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
                            </th> */}
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
                              {/*  <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-300">
                                {user.preferences.bgBlack.toString()}
                              </td>
                              <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-300">
                                {user.preferences.logo.toString()}
                              </td> */}
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

      {/* Todos slides salvos */}
      <div className="flex flex-col items-center w-full">
        <h2 className="text-white text-lg mt-5">
          Slides que existem no sistema:
        </h2>

        <div className="bg-white my-5">
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
                              Titulo
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3.5 text-left text-sm font-semibold text-white"
                            >
                              Autor
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3.5 text-left text-sm font-semibold text-white"
                            >
                              URL
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3.5 text-left text-sm font-semibold text-white"
                            >
                              Criado em:
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
                          {slides?.map((slide) => (
                            <tr key={slide._id}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-7 text-sm font-medium text-white sm:pl-0">
                                {slide.title}
                              </td>
                              <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-300">
                                {slide.author}
                              </td>
                              <td className="whitespace-nowrap px-5 py-4 max-w-sm truncate ">
                                <a
                                  className="text-sm text-gray-300 hover:text-indigo-400"
                                  href={`${slide.url}`}
                                >
                                  {slide.url}
                                </a>
                              </td>
                              <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-300">
                                {slide?.createdAt?.replace(
                                  /^(\d{4})-(\d{2})-(\d{2}).*$/,
                                  "$3/$2/$1"
                                )}
                              </td>

                              <td
                                onClick={() => handleDeleteSlide(slide._id)}
                                className="relative whitespace-nowrap py-4 pl-10 pr-4 text-right text-sm text-indigo-400 hover:text-indigo-300 font-medium sm:pr-0 cursor-pointer"
                              >
                                Excluir
                                <span className="sr-only">, {slide.title}</span>
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

      {/* Alerta quando exclui slide */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed z-50 bottom-0 w-full flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-700 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <XCircleIcon
                      className="h-6 w-6 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      O slide foi excluido com sucesso
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      É nois queirois
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
