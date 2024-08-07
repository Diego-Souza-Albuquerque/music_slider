"use client";
import Program from "@/components/program";
import { FaCheckCircle } from "react-icons/fa";
import { useState, Fragment } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/20/solid";

import { createUrlToSearch, createUrlToGetById } from "@/components/vagalume";
import { motion } from "framer-motion";

interface Song {
  id: string;
  title: string;
  artist_or_author: string;
}

interface SlideDoc {
  id: string;
  title: string;
  author: string;
  url: string;
}

export default function Slider() {
  const [open, setOpen] = useState(false);
  const [musicName, setMusicName] = useState("");
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [authorAndTitle, setAuthorAndTitle] = useState<string[]>([]);
  const [lyrics, setLyrics] = useState("");
  const [show, setShow] = useState(false);

  const [docs, setDocs] = useState<SlideDoc[]>([]);

  const handleInputChange = (e: any) => {
    setMusicName(e.target.value);
  };

  const searchInternet = () => {
    const googleSearchURL = `https://www.google.com/search?q=letra da música ${encodeURIComponent(
      musicName
    )}`;
    window.open(googleSearchURL, "_blank");
  };

  const handleInformations = (title: string, author: string) => {
    setAuthorAndTitle([author, title]);
  };

  const handleSearch = async () => {
    const searchUrl = createUrlToSearch({ text: musicName });
    try {
      const response = await fetch(searchUrl);
      const data = await response.json();
      const songs: Song[] = [];

      for (const item of data.items) {
        const titleWithArtist = item.title.split("-");

        if (
          titleWithArtist[0] &&
          titleWithArtist[1] &&
          typeof titleWithArtist[0] === "string" &&
          typeof titleWithArtist[1] === "string"
        ) {
          const title = titleWithArtist[0].trim();
          const artist = titleWithArtist[1].replace(/\.\.\./g, "").trim();
          const id = `${title}#${artist}`;

          if (
            artist !== "fotos" &&
            artist !== "relacionados" &&
            artist !== "VAGALUME"
          ) {
            songs.push({
              id,
              title,
              artist_or_author: artist,
            });
          }
        }
      }

      setSearchResults(songs);
      setOpen(true);
    } catch (error) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        searchInternet();
      }, 2500);
      console.error("Erro na pesquisa:", error);
    }
  };

  const getSpecificSlide = async (name: string) => {
    console.log(name)
    try {
      const response = await fetch(`/api/getSpecificSlide?search=${encodeURIComponent(name)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      setDocs(data)
    } catch (error) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        searchInternet();
      }, 2500);
      console.error("Erro na pesquisa:", error);
    }
  };

  const handleSongSelect = async (id: string | null) => {
    const songUrl = createUrlToGetById(id);

    if (songUrl === null) {
      console.error("URL da música é nula. Verifique o ID.");
      return;
    }

    try {
      const response = await fetch(songUrl);
      const data = await response.json();
      setLyrics(`${data.mus[0].name}
${data.art.name}

${data.mus[0].text}`);
      console.log(data);
      setOpen(false);
    } catch (error) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
      console.error("Erro ao obter a música:", error);
    }
  };

  /*   const getAllSlides = async () => {
      try {
        const response = await fetch('/api/getAllSliders', {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
    
        if (!response.ok) {
          throw new Error('Erro na resposta do servidor');
        }
    
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Erro durante a requisição para o backend", error);
      }
    };
    
    useEffect(() => {
      getAllSlides()
    }, []); */

  return (
    <main className="bg-gray-900 xl:h-screen lg:h-screen md:h-full sm:h-full w-full lg:pt-14 pt-24">
      <div className="relative isolate overflow-hidden">
      <motion.div 
           animate={{
            y: [0, 800, 0], // de 0 a 100px e depois volta para 0
          }}
          transition={{
            duration: 20, // duração de cada ciclo de animação
            repeat: Infinity, // repetir infinitamente
            ease: "easeInOut", // suavização da animação
          }}>
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
        </motion.div>

        <div className="mx-auto xl:px-12 lg:px-12 md:px-12 sm:px-6 px-6 pt-2 flex flex-col gap-10 sm:flex-col md:flex-col lg:flex-row xl:flex-row justify-between">
          <div className="flex flex-col items-center sm:w-full md:w-full lg:w-[45%] xl:w-[45%] justify-start py-10 gap-6">
            <div className="flex gap-3 w-full">
              <Input
                type="text"
                value={musicName}
                className="py-2 px-3 border-b-[0.5px] border-gray-500 focus:border-0 w-full"
                onChange={handleInputChange}
                placeholder="Digite o nome da música ou do autor"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                    getSpecificSlide(musicName)
                  }
                }}
              />

              <Button
                className="h-10 w-40 p-2 rounded-2xl border-gray-500 border-[1px] bg-transparent hover:bg-white hover:text-black text-base font-semibold text-white"
                onClick={() => {
                  handleSearch()
                  getSpecificSlide(musicName)
                }}
                variant="outline"
              >
                Pesquisar
              </Button>
            </div>

           
          </div>

          <div className="xl:py-10 lg:py-10 md:py-10 sm:py-0 py-48 flex justify-start lg:w-[60%] w-full gap-6">
            <Program letraVagalume={lyrics} authorAndTitle={authorAndTitle} />
                      
          </div>
        </div>
      </div>
      
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 pt-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-full">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="h-full overflow-y-auto bg-white dark:bg-gray-900 px-8 pt-20 pb-10">
                      <div className="flex flex-col">
                        <div className="flex gap-2 items-center justify-center my-2">
                          <h3 className="px-1 font-medium text-center text-gray-900 text-xl dark:text-white">
                            Escolha uma opção de letra abaixo ou
                          </h3>
                          <Button
                            className="h-full w-fit text-black dark:text-white dark:hover:text-black px-4 py-1 rounded-2xl border-gray-500 border-[1px] bg-transparent hover:bg-gray-100 hover:text-black text-base font-semibold "
                            onClick={searchInternet}
                            variant="outline"
                          >
                            Pesquisar na internet
                          </Button>
                        </div>

                        <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200 border-[1px]">
                          <div className="flex text-black dark:text-white w-full justify-between py-2 bg-gray-200 dark:bg-gray-700 px-3">
                            <h1>Título da música</h1> <h1>Autor</h1>
                          </div>
                          {searchResults.map((song) => (
                            <div
                              key={song.id}
                              onClick={() => {
                                handleSongSelect(song.id);
                                handleInformations(
                                  song.title,
                                  song.artist_or_author
                                );
                              }}
                              className="px-3 flex justify-between py-3 text-sm font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500"
                            >
                              <dt className="text-gray-500 dark:text-white">
                                {song.title.replace(" - VAGALUME", "")}
                              </dt>
                              <dd className="text-gray-900 dark:text-white">
                                {song.artist_or_author}
                              </dd>
                            </div>
                          ))}
                        </dl>

                        {docs.length > 0 && (
                          <div>
                            <h3 className="px-1 font-medium text-center text-gray-900 text-xl dark:text-white mt-4 mb-2">
                              Slides já criados disponíveis para download:
                            </h3>

                            <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200 border-[1px]">
                              <div className="flex text-black dark:text-white w-full justify-between py-2 bg-gray-200 dark:bg-gray-700 px-3">
                                <h1>Título da música</h1> <h1>Autor</h1>
                              </div>
                              {docs?.map((doc) => (
                                <a
                                  key={doc.id}
                                  href={`${doc.url}`}
                                  className="px-3 flex justify-between py-3 text-sm font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500"
                                >
                                  <dt className="text-gray-500 dark:text-white">
                                    {doc.title}
                                  </dt>
                                  <dd className="text-gray-900 dark:text-white">
                                    {doc.author}
                                  </dd>
                                </a>
                              ))}
                            </dl>
                          </div>
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div
        aria-live="assertive"
        className="pointer-events-none fixed z-50 bottom-0 w-full flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-700 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <XCircleIcon
                      className="h-6 w-6 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      Ocorreu algum erro...
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Faça o procedimento de forma manual
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </main >
  );
}
