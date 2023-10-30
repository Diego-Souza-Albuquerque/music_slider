"use client";
import React, { useState, Fragment } from "react";
import pptxgen from "pptxgenjs";
import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type SlideType = {
  id: number;
  content: string;
};

export default function Program() {
  const [lyrics, setLyrics] = useState("");
  const [slides, setSlides] = useState<SlideType[]>([]);
  const [open, setOpen] = useState(false);
  const pptx = new pptxgen();

  const createSlide = (letra: string) => {
    const slide = pptx.addSlide();
    slide.background = { color: "000000" };
    slide.addText(letra, {
      x: 0.5,
      y: 0.1,
      w: 9,
      h: 3,
      fontSize: 36,
      align: "center",
      color: "ffffff",
    });

    setSlides((prevSlides) => [
      ...prevSlides,
      { id: prevSlides.length, content: letra },
    ]);
  };

  const handleLyricsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setLyrics(event.target.value);
  };

  const handlePreview = () => {
    const parts = lyrics.split("\n\n");

    for (const part of parts) {
      createSlide(part);
    }
    setOpen(true);
  };

  const handleGeneratePPTX = () => {
    const parts = lyrics.split("\n\n");

    for (const part of parts) {
      createSlide(part);
    }

    pptx.writeFile({ fileName: "musica.pptx" });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center w-full">
      <div className="flex flex-col">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="w-full sm:w-[60vh] h-[70vh] relative"
        >
          <textarea
            value={lyrics}
            onChange={handleLyricsChange}
            className="block w-full h-full resize-none rounded border-0 bg-white py-1.5 px-3 text-gray-900 placeholder:text-gray-400 text-lg sm:leading-6"
          />
        </motion.div>

        <div className="mt-6 flex justify-center gap-20">
          <button
            className="bg-black text-white p-2 rounded-lg border-[1px] border-white hover:bg-gray-600"
            onClick={handlePreview}
          >
            Pré Visualizar
          </button>
          <button
            className="bg-black text-white p-2 rounded-lg border-[1px] border-white hover:bg-gray-600"
            onClick={handleGeneratePPTX}
          >
            Fazer Download
          </button>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0" />

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
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                            Pré visualização do arquivo
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 px-4 sm:px-6 -ml-28">
                        <div className="flex flex-col gap-2 px-40">
                          {slides.map((slide) => (
                            <div
                              key={slide.id}
                              className="bg-black text-white w-72 h-40 p-3"
                            >
                              <h1>Slide {slide.id + 1}</h1> {slide.content}
                            </div>
                          ))}
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
    </div>
  );
}
