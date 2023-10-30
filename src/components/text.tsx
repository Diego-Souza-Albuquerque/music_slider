"use client";
import { TypeAnimation } from "react-type-animation";

export default function Text() {
  return (
    <span className="px-2 text-white text-xs leading-8 mt-6 w-full">
      <TypeAnimation
        sequence={[
          `1 - Cole ou digite ao lado a letra da música\n
                  2 - Defina o espaço de 1 linha para separar cada slide\n
                  3 - Clique em pré-visualizar se quiser ver como será a divisão dos slides\n
                  4 - Clique em fazer download para baixar seu slide`,
          1000,
          () => {
            console.log("Sequence completed");
          },
        ]}
        wrapper="span"
        cursor={true}
        speed={60}
        repeat={Infinity}
        style={{
          whiteSpace: "pre-line",
          height: "60vh",
          textAlign: "start",
          fontSize: "2em",
          display: "inline-block",
        }}
      />
    </span>
  );
}
