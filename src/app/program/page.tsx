import React, { useState } from "react";
import pptxgen from "pptxgenjs";

export default function LyricsToPPTX() {
  const [lyrics, setLyrics] = useState("");

  const applyFormatting = (slide: any) => {
    const background = slide.background;
    background.fill.solid();
    background.fill.foreColor.rgb = "000000"; // Fundo preto
  };

  const createSlide = (content: any) => {
    let pptx = new pptxgen();
    let slide = pptx.addSlide();
    applyFormatting(slide);
    const titleShape = slide.addText(content, { x: 0.5, y: 0.5, w: 9, h: 5 });
    titleShape.color = "ffffff";
    /*  titleShape.fontSize(44) */
    /*  titleShape.wordWrap = true; */
  };

  const handleLyricsChange = (event: any) => {
    setLyrics(event.target.value);
  };

  const handleGeneratePPTX = () => {
    if (lyrics) {
      let pres = new pptxgen();
      let slide = pres.addSlide();

      const parts = lyrics.split("\n\n");

      for (const part of parts) {
        createSlide(part);
      }

      pres.writeFile({ fileName: "Sample Presentation.pptx" });
    }
  };

  return (
    <div>
      <h1>Conversor de Letras para Apresentação PPTX</h1>
      <textarea
        value={lyrics}
        onChange={handleLyricsChange}
        placeholder="Insira a letra da música..."
        rows={10}
        cols={50}
      />
      <button onClick={handleGeneratePPTX}>Gerar PPTX</button>
    </div>
  );
}
