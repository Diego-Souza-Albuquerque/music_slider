"use client";
import { useState, Fragment } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Dialog, Transition } from "@headlessui/react";
import { HeartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PencilIcon, PlusIcon } from "@heroicons/react/20/solid";

import { createUrlToSearch, createUrlToGetById } from "./vagalume";

interface Song {
  id: string;
  title: string;
  artist_or_author: string;
}

export default function Search() {
  const [open, setOpen] = useState(true);
  const [musicName, setMusicName] = useState("");
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");
  const [lyrics, setLyrics] = useState("");

  const handleInputChange = (e: any) => {
    setMusicName(e.target.value);
  };

  /*   const handleSearch = () => {
    const googleSearchURL = `https://www.google.com/search?q=letra da música ${encodeURIComponent(
      musicName
    )}`;
    window.open(googleSearchURL, "_blank");
  }; */

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
          const artist = titleWithArtist[1].trim();
          const id = `${title}#${artist}`;

          songs.push({
            id,
            title,
            artist_or_author: artist,
          });
        }
      }

      setSearchResults(songs);
    } catch (error) {
      console.error("Erro na pesquisa:", error);
    }
  };

  const handleSongSelect = async (id: string | null) => {
    const songUrl = createUrlToGetById(id);

    if (songUrl === null) {
      console.error("URL da música é nula. Verifique o ID.");
      return; // ou lance uma exceção ou trate de outra forma, conforme apropriado
    }

    try {
      const response = await fetch(songUrl);
      const data = await response.json();
      setSelectedSong(data.mus[0].name);
      setSelectedArtist(data.art);
      setLyrics(data.mus[0].text);
    } catch (error) {
      console.error("Erro ao obter a música:", error);
    }
  };

  console.log(lyrics);

  return (
    <>
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

      {searchResults.map((song) => (
        <ul className="text-white space-y-4 h-full w-full">
          <li
            className="cursor-pointer border-b-[1px] border-transparent hover:border-white hover:border-b-[1px] text-start"
            key={song.id}
            onClick={() => handleSongSelect(song.id)}
          >
            {song.title.replace(" - VAGALUME", "")}
            {song.id}
          </li>
        </ul>
      ))}
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
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-96">
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
                    <div className="h-full overflow-y-auto bg-white p-8">
                      <div className="space-y-6 pb-16">
                        <div>
                          <div className="aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg">
                            <img
                              src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
                              alt=""
                              className="object-cover"
                            />
                          </div>
                          <div className="mt-4 flex items-start justify-between">
                            <div>
                              <h2 className="text-base font-semibold leading-6 text-gray-900">
                                <span className="sr-only">Details for </span>
                                IMG_4985.HEIC
                              </h2>
                              <p className="text-sm font-medium text-gray-500">
                                3.9 MB
                              </p>
                            </div>
                            <button
                              type="button"
                              className="relative ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <span className="absolute -inset-1.5" />
                              <HeartIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                              <span className="sr-only">Favorite</span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Information
                          </h3>
                          <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">Uploaded by</dt>
                              <dd className="text-gray-900">Marie Culver</dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">Created</dt>
                              <dd className="text-gray-900">June 8, 2020</dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">Last modified</dt>
                              <dd className="text-gray-900">June 8, 2020</dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">Dimensions</dt>
                              <dd className="text-gray-900">4032 x 3024</dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">Resolution</dt>
                              <dd className="text-gray-900">72 x 72</dd>
                            </div>
                          </dl>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Description
                          </h3>
                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-sm italic text-gray-500">
                              Add a description to this image.
                            </p>
                            <button
                              type="button"
                              className="relative -mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <span className="absolute -inset-1.5" />
                              <PencilIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                              <span className="sr-only">Add description</span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Shared with
                          </h3>
                          <ul
                            role="list"
                            className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200"
                          >
                            <li className="flex items-center justify-between py-3">
                              <div className="flex items-center">
                                <img
                                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                                  alt=""
                                  className="h-8 w-8 rounded-full"
                                />
                                <p className="ml-4 text-sm font-medium text-gray-900">
                                  Aimee Douglas
                                </p>
                              </div>
                              <button
                                type="button"
                                className="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                Remove
                                <span className="sr-only"> Aimee Douglas</span>
                              </button>
                            </li>
                            <li className="flex items-center justify-between py-3">
                              <div className="flex items-center">
                                <img
                                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  alt=""
                                  className="h-8 w-8 rounded-full"
                                />
                                <p className="ml-4 text-sm font-medium text-gray-900">
                                  Andrea McMillan
                                </p>
                              </div>
                              <button
                                type="button"
                                className="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                Remove
                                <span className="sr-only">
                                  {" "}
                                  Andrea McMillan
                                </span>
                              </button>
                            </li>
                            <li className="flex items-center justify-between py-2">
                              <button
                                type="button"
                                className="group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              >
                                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400">
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                                <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
                                  Share
                                </span>
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div className="flex">
                          <button
                            type="button"
                            className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Download
                          </button>
                          <button
                            type="button"
                            className="ml-3 flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
