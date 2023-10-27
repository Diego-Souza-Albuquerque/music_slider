"use client";
import React, { useState } from "react";
import pptxgen from "pptxgenjs";

type SlideType = {
  id: number;
  content: string;
};

export default function Program() {
  const [lyrics, setLyrics] = useState("");
  const [slides, setSlides] = useState<SlideType[]>([]);
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

    // Crie uma cópia do array de slides e adicione o novo slide
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
        <textarea
          value={lyrics}
          onChange={handleLyricsChange}
          placeholder="Insira a letra da música..."
          className="block w-[40vh] h-[70vh] resize-none rounded border-0 bg-white py-1.5 px-3 text-gray-900 placeholder:text-gray-400 text-base sm:leading-6"
        />

        <div className="mt-2 flex justify-center gap-10">
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
      {/* <div className="h-[80vh] flex flex-col items-center">
        <h1>Pré visualização</h1>
        <div className="flex flex-col gap-2 px-40 h-full overflow-y-scroll">
          {slides.map((slide) => (
            <div key={slide.id} className="bg-black text-white w-72 h-40 p-3">
              <h1>Slide {slide.id + 1}</h1> {slide.content}
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
