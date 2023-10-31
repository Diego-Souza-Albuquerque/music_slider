"use client";
import { useState } from "react";

export default function Search() {
  const [musicName, setMusicName] = useState("");

  const handleInputChange = (e: any) => {
    setMusicName(e.target.value);
  };

  const handleSearch = () => {
    const googleSearchURL = `https://www.google.com/search?q=letra da música ${encodeURIComponent(
      musicName
    )}`;
    window.open(googleSearchURL, "_blank");
  };

  return (
    <div className="flex gap-3 w-full">
      <input
        type="text"
        value={musicName}
        className="p-2 w-full"
        onChange={handleInputChange}
        placeholder="Digite o nome da música"
      />
      <button
        className="h-10 w-40 p-2 rounded-2xl border-white border-[1px] bg-transparent hover:bg-white hover:text-black text-base font-semibold text-white"
        onClick={handleSearch}
      >
        Pesquisar
      </button>
    </div>
  );
}
