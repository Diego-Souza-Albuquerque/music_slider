"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserForm = () => {
  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const creatingUser = {
    name: "",
    email: "",
  };

  const [formData, setFormData] = useState(creatingUser);

  return (
    <div className="flex justify-center">
      <form>
        {" "}
        <h3>Criando meu usuário</h3>
        <label> Nome</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.name}
        />
      </form>
    </div>
  );
};

export default UserForm;
