"use client";
import React, { useState } from "react";

type UserType = {
  _id: string;
  name: string;
  email: string;
  preferences: {
    bgBlack: boolean;
    logo: boolean;
  };
};

export default function SearchUsers() {
  const [users, setUsers] = useState<UserType[]>([]);

  const handleFetchUsers = () => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Erro ao buscar usuários:", error));
  };

  return (
    <div className="flex flex-col items-start w-full">
      <button
        className="text-white border-[1px] rounded-2xl py-2 px-4 hover:text-black bg-transparent hover:bg-white"
        onClick={handleFetchUsers}
      >
        Buscar Usuários
      </button>
      <div className="flex flex-col mt-2">
        <h2 className="text-white">Usuários cadastrados:</h2>

        <ul className="text-white">
          {users.map((user) => (
            <li key={user._id}>
              <div className="flex">
                {user.name} - {user.email} - Preferências: bgBlack:{" "}
                {user.preferences.bgBlack.toString()} - logo:{" "}
                {user.preferences.logo.toString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
