"use client";
import Program from "@/components/program";
import Search from "@/components/search";
import { TypeAnimation } from "react-type-animation";

export default function Slider() {
  return (
    <main className="bg-gray-900 h-full sm:h-screen w-full">
      <div className="relative isolate overflow-hidden">
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
          />
        </svg>
        <div
          className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
          aria-hidden="true"
        >
          <div
            className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-3 pt-2 flex flex-col gap-2 sm:flex-row items-center justify-between">
          <div className="flex flex-col items-center w-full">
            <Search />
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
          </div>

          <div className="py-10">
            <Program />
          </div>
        </div>
      </div>
    </main>
  );
}
