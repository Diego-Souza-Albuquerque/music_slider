"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <Input
        type="text"
        value={musicName}
        className="py-2 px-3 border-b-[0.5px] border-gray-500 focus:border-0 w-full"
        onChange={handleInputChange}
        placeholder="Digite o nome da música"
      />

      <Button
        className="h-10 w-40 p-2 rounded-2xl border-gray-500 border-[1px] bg-transparent hover:bg-white hover:text-black text-base font-semibold text-white"
        onClick={handleSearch}
        variant="outline"
      >
        Pesquisar
      </Button>
    </div>
  );
}
