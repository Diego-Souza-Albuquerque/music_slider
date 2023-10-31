import ButtonStart from "@/components/buttonStart";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-900">
      <main className="flex flex-col">
        {/* Hero section */}
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
          <div className="mx-auto px-6 pb-10 pt-2 lg:pt-10 lg:pb-24 lg:flex justify-center items-start lg:px-6 ">
            <div className="mx-auto max-w-3xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
              <div className="mt-24 sm:mt-32 lg:mt-16"></div>
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-5xl lg:text-5xl xl:text-6xl">
                Transforme suas letras em slides incríveis de forma rápida e
                prática
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Não perca mais tempo criando slides manualmente, o Music Slider
                é a solução para quem deseja criar slides de música de forma
                prática e rápida, online e gratuita.
              </p>
              <div className="mt-10 flex items-center gap-x-6  w-72">
                <ButtonStart />
              </div>
            </div>
            <div className="mx-auto max-w-[850px] mt-12 sm:mt-28 ml-0 sm:ml-0 lg:mr-0 ">
              <video
                src="/show.mp4"
                autoPlay
                muted
                loop
                className="w-full rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>

        {/* Logo cloud */}
        <div className="mx-auto py-6 max-w-7xl px-6">
          <h2 className="text-center text-xl font-semibold leading-8 text-white">
            Tecnologias usadas no projeto:
          </h2>
          <div className="mx-auto mt-8 flex flex-wrap items-center gap-x-8 gap-y-10 max-w-3xl sm:gap-x-10 lg:mx-0 justify-center">
            <span className="flex gap-2 items-center justify-center">
              <img
                className="max-h-12 w-full object-contain invert"
                src="next.webp"
                alt="Transistor"
                width={158}
                height={48}
              />
              <h1 className="text-white text-xl font-semibold relative w-full">
                NEXT.JS
              </h1>
              <h1 className="text-white text-xl font-semibold relative w-full">
                14
              </h1>
            </span>
            <span className="flex gap-2 items-center justify-center">
              <img
                className="col-span-2 max-h-[42px] w-full object-contain lg:col-span-1 invert"
                src="ts.png"
                alt="Reform"
                width={158}
                height={48}
              />
              <h1 className="text-white text-xl font-semibold relative w-full">
                TYPESCRIPT
              </h1>
            </span>
            <span className="flex gap-2 items-center justify-center">
              <img
                className="col-span-2 max-h-[42px] w-full object-contain lg:col-span-1 invert"
                src="tailwind.png"
                alt="Reform"
                width={158}
                height={48}
              />
              <h1 className="text-white text-xl font-semibold relative w-full">
                TAILWIND
              </h1>
            </span>
            <span className="flex gap-2 items-center justify-center">
              <img
                className="col-span-2 max-h-[42px] w-full object-contain lg:col-span-1 invert"
                src="react.png"
                alt="Reform"
                width={158}
                height={48}
              />
              <h1 className="text-white text-xl font-semibold relative w-full">
                REACT
              </h1>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
