import Image from "next/image";

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

const team = [
  {
    name: "Diego Albuquerque",
    role: "Desenvolvedor",
    imageUrl:
      "https://media.licdn.com/dms/image/C4D03AQGRbACCLcqumQ/profile-displayphoto-shrink_200_200/0/1636812677000?e=1704326400&v=beta&t=61hKXcyFo-w0v3L1cE5UmAUVwveJFqdA_pycu3Se6W8",
  },
  // More people...
];

export default function About() {
  return (
    <main className="isolate">
      {/* Hero section */}
      <div className="relative isolate -z-10">
        <svg
          className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
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
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
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
          className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
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
        <div className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-20 lg:px-8">
            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                  Facilitando a forma de fazer slides de música
                </h1>
                <p className="relative mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 sm:max-w-md lg:max-w-none">
                  Bem-vindo ao Music Slider, a solução que nasceu da necessidade
                  de simplificar a criação de slides de músicas na minha igreja,
                  ao mesmo tempo, me proporcionou uma oportunidade para aprender
                  e aprimorar minhas habilidades de programação.
                </p>
              </div>
              <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                  <div className="relative">
                    <Image
                      src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                      alt=""
                      width={1200}
                      height={1200}
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                </div>
                <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                  <div className="relative">
                    <Image
                      src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                      alt=""
                      width={1200}
                      height={1200}
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="relative">
                    <Image
                      src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
                      alt=""
                      width={1200}
                      height={1200}
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                </div>
                <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                  <div className="relative">
                    <Image
                      src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80"
                      alt=""
                      width={1200}
                      height={1200}
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="relative">
                    <Image
                      src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                      alt=""
                      width={1200}
                      height={1200}
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Inspiração
          </h2>
          <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row ">
            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
              <p className="text-xl leading-8 text-gray-600 dark:text-gray-300">
                A ideia para este sistema surgiu do longo tempo que gastavamos
                na preparação de slides de músicas da minha igreja.
              </p>
              <p className="text-xl leading-8 text-gray-600 dark:text-gray-300">
                Consciente das dificuldades enfrentadas e que não poderiamos
                instalar nenhum programa nos computadores da igreja, decidi
                criar uma ferramenta online que agilizasse o processo de criação
                desses slides, possibilitando uma melhor experiência para todos.
              </p>
            </div>

            <div className="lg:flex lg:flex-auto lg:justify-center">
              <dl className="w-64 space-y-8 xl:w-80">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col-reverse gap-y-4"
                  >
                    <dt className="text-base leading-7 text-gray-600 dark:text-gray-300 -mt-3">
                      {stat.label}
                    </dt>
                    <dd className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Image section */}
      <div className="mt-32 sm:mt-12 xl:mx-auto xl:max-w-7xl">
        <Image
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
          alt=""
          width={1200}
          height={1200}
          className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
        />
      </div>

      {/* Values section */}
      {/*  <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our values
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>
      </div> */}

      {/* Logo cloud */}
      <div className="mx-auto pt-28 max-w-7xl px-6 flex flex-col items-center">
        <h2 className="text-center text-xl font-semibold leading-8 text-black dark:text-white">
          Tecnologias usadas no projeto:
        </h2>
        <div className="mx-auto mt-8 flex flex-wrap items-center gap-x-8 gap-y-10 max-w-5xl sm:gap-x-10 lg:mx-0 justify-center">
          <span className="flex gap-2 items-center justify-center">
            <Image
              className="max-h-[44px] w-full object-contain dark:invert"
              src="/next.webp"
              alt="Transistor"
              width={158}
              height={48}
            />
            <h1 className="text-black dark:text-white text-xl font-semibold relative w-full">
              NEXT.JS
            </h1>
            <h1 className="text-black dark:text-white text-xl font-semibold relative w-full">
              14
            </h1>
          </span>
          <span className="flex gap-2 items-center justify-center">
            <Image
              className="col-span-2 max-h-[38px] w-full object-contain lg:col-span-1 dark:invert"
              src="/ts.png"
              alt="Reform"
              width={158}
              height={48}
            />
            <h1 className="text-black dark:text-white text-xl font-semibold relative w-full">
              TYPESCRIPT
            </h1>
          </span>
          <span className="flex gap-2 items-center justify-center">
            <Image
              className="col-span-2 max-h-[42px] w-full object-contain lg:col-span-1 dark:invert"
              src="/tailwind.png"
              alt="Reform"
              width={158}
              height={48}
            />
            <h1 className="text-black dark:text-white text-xl font-semibold relative w-full">
              TAILWIND
            </h1>
          </span>
          <span className="flex gap-2 items-center justify-center">
            <Image
              className="col-span-2 max-h-[42px] w-full object-contain lg:col-span-1 dark:invert"
              src="/react.png"
              alt="Reform"
              width={158}
              height={48}
            />
            <h1 className="text-black dark:text-white text-xl font-semibold relative w-full">
              REACT
            </h1>
          </span>
          <span className="flex gap-2 items-center justify-center ">
            <Image
              className="col-span-2 max-h-[42px] w-full object-contain lg:col-span-1 dark:invert"
              src="/node.png"
              alt="Reform"
              width={158}
              height={48}
            />
            <h1 className="text-black dark:text-white text-xl font-semibold relative w-full">
              NODEJS
            </h1>
          </span>
        </div>
        {/* Team section */}
        <div className="mx-auto mb-40 pt-10 max-w-7xl px-6 sm:mt-12 flex items-center">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="flex items-center justify-start gap-4">
              <Image
                className="h-24 w-24 rounded-full"
                src={
                  "https://media.licdn.com/dms/image/C4D03AQGRbACCLcqumQ/profile-displayphoto-shrink_200_200/0/1636812677000?e=1704326400&v=beta&t=61hKXcyFo-w0v3L1cE5UmAUVwveJFqdA_pycu3Se6W8"
                }
                alt=""
                width={1600}
                height={1200}
              />
              <p className=" text-lg leading-8 text-gray-600 dark:text-gray-300">
                Olá, meu nome é Diego Albuquerque, sou apaixonado por
                programação e busco sempre colocar propósito naquilo que eu faço
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
