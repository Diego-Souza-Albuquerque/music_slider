import ButtonStart from "@/components/buttonStart";

/* const express = require("express");
const cors = require("cors"); */

require("../../config/database"); //chamando o database onde tem o mongoose

/* const app = express();
app.use(cors());

app.use(express.json());

app.listen(4000, () => {
  console.log("Servidor foi iniciado pelo express");
});

app.get("/", (req: any, res: any) => {
  res.send(console.log("enviei um get"));
}); */

//FrontEnd na porta 3000
//BackEnd (node) com express na porta 4000
//Banco de dados (MongoDb) na porta 27017

export default function Home() {
  return (
    <div className="bg-gray-900 h-full">
      <main className="flex flex-col">
        {/* Hero section */}
        <div className="relative isolate overflow-hidden xl:h-screen lg:h-screen md:h-full sm:h-full">
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
      </main>
    </div>
  );
}
