"use client";

import { useForm } from "react-hook-form";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useContext } from "react";
import { useAuth } from "@/contexts/userContext";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

type UserType = {
  _id: string;
  name: string;
  email: string;
  preferences: {
    bgBlack: boolean;
    logo: boolean;
  };
};

export default function Login() {
  /* const { signIn } = useContext(AuthContext); */
  const { register, handleSubmit } = useForm();
  const [newUser, setNewUser] = useState<UserType[]>([]);

  const { signInDefault, user } = useAuth();
  console.log(user);
  const handleIncludeUsers = (formdata: any) => {
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.json())
      .then((data) => setNewUser(data.user))
      .catch((error) => console.error("Erro ao cadastrar usuário:", error));
  };

  async function handleLogin({ email, password }: any) {
    const data = await signInDefault({ email: email, password: password });
    if (!data) {
      alert("Erro de autentificação");
      window.location.reload();
      return;
    } else {
      alert("Usuário foi logado");
      window.location.href = "/";
    }
  }

  const excluirUser = (formdata: any) => {
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
  };

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
    </>
  );
}
