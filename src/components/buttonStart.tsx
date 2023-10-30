"use client";
import { TypeAnimation } from "react-type-animation";

export default function ButtonStart() {
  return (
    <a
      href="/slider"
      className="rounded-lg w-full h-10 flex items-center justify-center p-2 border-white border-[1px] bg-transparent hover:bg-white hover:text-black text-xs font-semibold text-white"
    >
      <TypeAnimation
        sequence={["Vamos começar ?", 1000, "Clique aqui", 1000]}
        wrapper="span"
        speed={50}
        style={{ width: "full", fontSize: "2em", display: "inline-block" }}
        repeat={Infinity}
      />
    </a>
  );
}
