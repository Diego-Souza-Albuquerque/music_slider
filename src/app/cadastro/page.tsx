"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState, Fragment } from "react";
import { FcGoogle } from "react-icons/fc";
import { Transition } from "@headlessui/react";
import { HiBadgeCheck } from "react-icons/hi";
import { XCircleIcon } from "@heroicons/react/20/solid";

import Link from "next/link";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  async function handleIncludeUsers(formdata: any) {
    try {
      const response = await fetch(`${process.env.APP_API_URL}/createAccount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      if (response.status === 201) {
        setStatus(true);
      }

      if (response.status === 409) {
        setMessage("Já existe um usuário com esse email cadastrado");
      }
      if (response.status === 500) {
        setMessage("Ocorreu um erro na hora do cadastro, tente mais tarde");
      }

      setShow(true);
      setTimeout(() => {
        setShow(false);
        if (response.status === 201) {
          window.location.href = "/login";
        }
      }, 3000);
    } catch (error) {}
  }

  return (
    <>
      <div className="flex justify-center items-start w-full">
        <div className="flex min-h-full flex-1 flex-col justify-start  py-4 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
              Cadastre-se abaixo
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white dark:bg-gray-800 px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <form
                className="space-y-6"
                action="#"
                method="POST"
                onSubmit={handleSubmit(handleIncludeUsers)}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Nome
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("name")}
                      id="name"
                      name="name"
                      type="name"
                      autoComplete="current-name"
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("email")}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Senha
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("password")}
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Criar conta
                  </button>
                </div>
              </form>

              <div className="flex flex-col items-center gap-4 mt-8">
                <div className="flex flex-col items-center justify-center gap-2">
                  <span className="text-black dark:text-white">
                    Cadastre-se com:
                  </span>
                  <button
                    onClick={() => signIn("google")}
                    className="flex w-52 items-center justify-center border-gray-300 border-[1px] gap-3 rounded-md bg-white hover:bg-gray-200 px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
                  >
                    <FcGoogle size={20} />
                    <span className="text-sm font-semibold text-gray-600 leading-6">
                      Google
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <p className="my-5 text-center text-sm text-gray-500">
              Já possui uma conta?
              <Link
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1"
                href="/login"
              >
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Alerta após clicar em cadastrar */}
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
                {status ? (
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <HiBadgeCheck
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-gray-900">
                        Seu cadastro foi realizado com sucesso
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Você será redirecionado para a página de login
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <XCircleIcon
                        className="h-6 w-6 text-red-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-gray-900">
                        Não foi possivel criar seu usuário
                      </p>
                      <p className="mt-1 text-sm text-gray-500">{message}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
