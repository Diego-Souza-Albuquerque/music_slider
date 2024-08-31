"use client";
import React, { useState, Fragment, useEffect } from "react";
import pptxgen from "pptxgenjs";
import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";
import { useAuth } from "@/contexts/userContext";
import uploadToS3 from "./send-to-s3";
import { FaCheckCircle } from "react-icons/fa";

type SlideType = {
  id: number;
  content: string;
};

export default function Program(props: any) {
  const [lyrics, setLyrics] = useState("");
  const [slides, setSlides] = useState<SlideType[]>([]);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [pptxBlob, setPptxBlob] = useState<Blob | null>(null);
  const [author, setAuthor] = useState(props?.authorAndTitle ? props.authorAndTitle[0] : '');
  const [title, setTitle] = useState(props?.authorAndTitle ? props.authorAndTitle[1] : '');
  const [create, setCreate] = useState(false)
  const pptx = new pptxgen();
  const { user } = useAuth();

  const createSlide = (letra: string) => {
    const slide = pptx.addSlide();
    slide.background = { color: `${checked ? "ffffff" : "000000"}` };
    slide.addImage({
      x: "78%",
      y: "62%",
      w: 2,
      h: 2,
      transparency: 50,
      path: "/vercel.svg",
    });
    slide.addText(letra, {
      x: 0.5,
      y: 0.1,
      w: 9,
      h: 3,
      fontSize: 36,
      align: "center",
      color: `${checked ? "000000" : "ffffff"}`,
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

  const handleAuthorChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAuthor(event.target.value);
  };

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTitle(event.target.value);
  };

  const handlePreview = () => {
    const parts = lyrics.split("\n\n");

    for (const part of parts) {
      createSlide(part);
    }
    setOpen(true);
  };

  const handleGeneratePPTX = async () => {
    setCreate(true)
    const parts = lyrics.split("\n\n");

    for (const part of parts) {
      createSlide(part);
    }

    // Obtém o conteúdo do PPTX como string
    const pptxContent = await pptx.write();

    // Converte a string em Blob
    const pptxBlob = new Blob([pptxContent], {
      type: "application/octet-stream",
    });

    // Salva o arquivo na maquina do usuário pelo frontEnd:
    saveAs(pptxBlob, `${props?.authorAndTitle[1]} - ${props?.authorAndTitle[0]}.pptx`);

    // Salvando no servidor (mongo + s3):
    const s3Url = await uploadToS3(pptxBlob, { title, author });
    if (s3Url) { sendToMongo(s3Url) }

  };

  const sendToMongo = async (s3Url: string | undefined) => {
    const data = {
      title: props?.authorAndTitle[1],
      author: props?.authorAndTitle[0],
      url: s3Url
    };
    try {
      const response = await fetch(`/api/createSlide`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        alert("Arquivo salvo no sistema com sucesso");
      }
    } catch (error) {
      console.error("Erro durante a requisição para o backend", error);
    }
  };

  useEffect(() => {
    setAuthor(props.authorAndTitle[0])
    setTitle(props.authorAndTitle[1])
  }, [lyrics]);

  return (
    <>
    <div className="flex flex-col sm:flex-row justify-start w-full gap-10">
      <div className="flex flex-col">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 50,
          }}
          className="w-full sm:w-[60vh] h-full relative"
        >
          <Textarea
            onChange={handleLyricsChange}
            defaultValue={props?.letraVagalume}
            className="block w-full h-[80vh] resize-none border-b-[0.5px] border-gray-500 py-2 px-3 placeholder:text-gray-400 text-lg sm:leading-6"
          />            
        
        </motion.div>
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

    <ol className="text-white text-lg px-0 space-y-8 mt-6 w-content list-decimal absolute left-12 top-24">
      <li className="flex gap-2 items-center justify-start">1. Pesquise a música no campo acima {props.letraVagalume && (<span className="text-green-300"><FaCheckCircle /></span>)}</li>
      <li className="flex gap-2 items-center justify-start">2. Defina o espaço de 1 linha para separar cada slide {lyrics && (<span className="text-green-300"><FaCheckCircle /></span>)}</li>
      <li className="flex gap-2 items-center justify-start">3. Clique em criar arquivo {create && (<span className="text-green-300"><FaCheckCircle /></span>)}</li>
    </ol>

    {lyrics && ( <div className="flex flex-col gap-2 w-full">
      <div className="w-full flex items-center">
        <span className="w-24 text-white">Título:</span>
        <Textarea
          onChange={handleTitleChange}
          defaultValue={props?.authorAndTitle[1]}
          className="block w-full h-10 resize-none border-b-[0.5px] border-gray-500 px-3 placeholder:text-gray-400 text-base sm:leading-6"
        />
      </div>
      <div className="w-full flex items-center">
        <span className="w-24 text-white">Autor:</span>
        <Textarea
          onChange={handleAuthorChange}
          defaultValue={props?.authorAndTitle[0]}
          className="block w-full h-10 resize-none border-b-[0.5px] border-gray-500 px-3 placeholder:text-gray-400 text-base sm:leading-6"
        />
      </div>
      {title && ( 
               <div className="mt-10 ml-16 pl-2 flex flex-col justify-center items-start gap-10">
            <Button
              className="h-full w-40 p-2 rounded-2xl border-gray-500 border-[1px] bg-transparent hover:bg-white hover:text-black text-base font-semibold text-white"
              onClick={handlePreview}
              variant="outline"
            >
              Pré Visualizar
            </Button>
            <Button
              className="h-full w-40 p-2 rounded-2xl border-gray-500 border-[1px] bg-green-500/70 hover:bg-green-500/90 hover:text-white text-base font-semibold text-white"
              onClick={handleGeneratePPTX}
              variant="outline"
            >
              Gerar arquivo
            </Button>
            <Button
              className="h-10 w-40 p-2 rounded-2xl border-gray-500 border-[1px] text-base font-semibold"
              onClick={()=>{window.location.reload()}}
              variant="destructive"
            >
              Limpar
            </Button>
          </div>)}
      
    </div>)}
</>
  );
}
