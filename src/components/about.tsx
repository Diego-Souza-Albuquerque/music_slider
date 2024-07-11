"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useEffect } from "react";

const stats = [
  {
    label: "Passavam pelas mesmas dificuldades",
    value: "3 ministérios",
  },
  {
    label: "Número aproximado de slides semanais que geramos",
    value: "12 músicas",
  },
];

export default function About() {
  const [ref, inView] = useInView();

  async function handleStart() {
    try {
      const response = await fetch(`${process.env.APP_API_URL}/start`, {
        method: "GET",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("Chamando o backend...");
    handleStart();
  }, []);

  const ImagemAnimation = ({ src, alt, delay }: any) => {
    return (
      <motion.div
        initial={{ y: -1800 }}
        animate={inView ? { y: 0 } : { y: -1800 }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
        className="relative"
      >
        <div className="image-container">
          <motion.img
            src={src}
            alt={alt}
            width={1200}
            height={1200}
            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
        </div>
      </motion.div>
    );
  };
  return (
    <>
      <div className="relative isolate -z-10">
        {/* Plano de fundo */}
        <svg
          className="absolute inset-x-0 -top-20 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-700">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
          />
        </svg>
        <div
          className="absolute left-1/2 right-0 -top-96 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          aria-hidden="true"
        >
          <div
            className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
            }}
          />
        </div>

        {/* Texto 1 */}

        <div className="mx-auto w-full pb-32 pt-36">
          <div className="mx-auto flex justify-between gap-10 items-center">
            <div className="w-full max-w-3xl">
              <h1
                ref={ref}
                className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-start text-center"
              >
                Facilitando a forma de fazer slides de música
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300 lg:text-start text-center">
                Bem-vindo ao Music Slider, a solução que nasceu da necessidade
                de simplificar a criação de slides de músicas na minha igreja,
                ao mesmo tempo, me proporcionou uma oportunidade para aprender e
                aprimorar minhas habilidades de programação.
              </p>
            </div>

            {/* Imagens descendo */}
            <div className="mt-28 lg:flex hidden gap-8">
              <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                <ImagemAnimation src="/image1.jpg" alt="3" delay={0.4} />
              </div>
              <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                <div className="relative">
                  <ImagemAnimation src="/image10.jpg" alt="4" delay={0.6} />
                </div>
                <div ref={ref} className="relative">
                  <ImagemAnimation src="/image5.jpg" alt="1" delay={0} />
                </div>
              </div>
              <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                <div className="relative">
                  <ImagemAnimation src="/image7.jpg" alt="5" delay={0.8} />
                </div>
                <div className="relative ">
                  <ImagemAnimation src="/image13.jpg" alt="2" delay={0.2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Texto 2  */}
      <div className="mx-auto flex lg:flex-row flex-col justify-between gap-20 lg:mx-0 w-full">
        <div className="flex flex-col lg:items-start items-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white  ">
            Inspiração
          </h2>

          <div className="lg:w-full lg:max-w-4xl lg:flex-auto mt-2">
            <p className="text-lg leading-8 text-gray-300 lg:text-start text-center">
              A ideia surgiu devido ao longo tempo que gastavamos na preparação
              de slides de músicas e de não poder instalar nenhum programa nos
              computadores da igreja
            </p>
            <p className="text-lg leading-8 text-gray-300 pt-5 lg:text-start text-center">
              Consciente dessas dificuldades, decidi criar uma ferramenta online
              que agilizasse o processo de criação desses slides, possibilitando
              uma melhor experiência para todos.
            </p>
          </div>
        </div>

        <dl className="w-full space-y-8 lg:w-80 flex flex-col justify-between lg:text-start text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-y-4">
              <dt className="text-base leading-7 text-gray-300 -mt-3">
                {stat.label}
              </dt>
              <dd className="text-4xl font-semibold tracking-tight text-white">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Imagem grande */}
      <div className="mt-20 xl:mx-auto relative overflow-hidden rounded-2xl lg:mx-0 -mx-28">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 12, repeat: Infinity }}
        >
          <Image
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
            alt=""
            width={1200}
            height={1200}
            className="aspect-[5/2] w-full object-cover xl:rounded-2xl"
          />
        </motion.div>
      </div>

      {/* Tecnologias */}
      <div className="mx-auto max-w-7 pt-24 w-full px-6 flex flex-col items-center">
        <h2 className="text-center text-3xl sm:text-4xl font-semibold leading-8 text-white">
          Tecnologias usadas no projeto:
        </h2>
        <div className="mx-auto mt-8 w-full flex flex-wrap items-center gap-x-8 gap-y-8 sm:gap-x-20 lg:mx-0 justify-center">
          <span className="flex gap-2 items-center justify-center">
            <Image
              className="max-h-[44px] w-full object-contain invert"
              src="/next.webp"
              alt="Icone NEXT.JS"
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
            <Image
              className="max-h-[38px] w-full object-contain invert"
              src="/ts.png"
              alt="Icone TYPESCRIPT"
              width={158}
              height={48}
            />
            <h1 className="text-white text-xl font-semibold relative w-full">
              TYPESCRIPT
            </h1>
          </span>

          <span className="flex gap-2 items-center justify-center">
            <Image
              className="max-h-[42px] w-full object-contain invert"
              src="/react.png"
              alt="Icone REACT"
              width={158}
              height={48}
            />
            <h1 className="text-white text-xl font-semibold relative w-full">
              REACT
            </h1>
          </span>

          <span className="flex gap-2 items-center justify-center">
            <Image
              className="max-h-[42px] w-full object-contain invert"
              src="/tailwind.png"
              alt="Icone TAILWIND"
              width={158}
              height={48}
            />
            <h1 className="text-white text-xl font-semibold relative w-full">
              TAILWIND
            </h1>
          </span>

          <span className="flex gap-3 items-center justify-center ">
            <Image
              className="max-h-[30px] w-full object-contain invert"
              src="/framerMotion.png"
              alt="Icone FRAMER MOTION"
              width={158}
              height={48}
            />
            <h1 className="text-white text-xl font-semibold relative whitespace-nowrap">
              FRAMER MOTION
            </h1>
          </span>

          <span className="flex gap-2 items-center justify-center ">
            <Image
              className="max-h-[42px] w-full object-contain invert"
              src="/node.png"
              alt="Icone NODEJS"
              width={158}
              height={48}
            />
            <h1 className="text-white text-xl font-semibold relative w-full">
              NODEJS
            </h1>
          </span>

          <span className="flex gap-0 items-center justify-center bg-transparent">
            <Image
              className="max-h-[70px] w-full object-contain invert"
              src="/aws.png"
              alt="Icone AWS S3"
              width={158}
              height={48}
            />
            <h1 className="text-white text-xl font-semibold relative w-full whitespace-nowrap">
              AWS S3
            </h1>
          </span>

          <span className="flex gap-2 items-center justify-center bg-transparent">
            <Image
              className="max-h-[40px] w-full object-contain invert"
              src="/mongodb.png"
              alt="Icone MONGO DB"
              width={158}
              height={48}
            />
            <h1 className="text-white text-xl font-semibold relative w-full whitespace-nowrap">
              MONGO DB
            </h1>
          </span>

          <span className="flex gap-2 items-center justify-center bg-transparent">
            <Image
              className="max-h-[50px] w-full object-contain invert"
              src="/render.png"
              alt="Icone RENDER"
              width={158}
              height={48}
            />
            <h1 className="text-white text-xl font-semibold relative w-full whitespace-nowrap">
              RENDER
            </h1>
          </span>
          
          <span className="flex gap-2 items-center justify-center bg-transparent">
            <Image
              className="max-h-[35px] w-full object-contain invert"
              src="/versel.png"
              alt="Icone VERSEL"
              width={158}
              height={48}
            />
            <h1 className="text-white text-xl font-semibold relative w-full whitespace-nowrap">
              VERSEL
            </h1>
          </span>
        </div>

        {/* Sobre mim */}
        <div className="mx-auto mb-40 pt-10 max-w-7xl px-6 sm:mt-12 flex items-center">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="flex xl:flex lg:flex-row md:flex-row sm:flex-col flex-col items-center justify-center gap-4">
              <Image
                className="h-24 w-24 rounded-full"
                src={"/diego.png"}
                alt=""
                width={1600}
                height={1200}
              />
              <p className=" text-lg leading-8 text-gray-300 text-center lg:text-start">
                Olá, meu nome é Diego Albuquerque, sou apaixonado por
                programação e busco sempre encontrar propósito naquilo que eu
                faço
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
