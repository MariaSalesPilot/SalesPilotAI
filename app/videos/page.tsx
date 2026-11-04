"use client";

import { useEffect, useState } from "react";
import { translations } from "../translations";
import { getLanguage } from "../../lib/language";

export default function Videos() {

  const [formato, setFormato] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [duracion, setDuracion] = useState("");
  const [imagenes, setImagenes] = useState<FileList | null>(null);
  const [language, setLanguage] = useState("es");

    useEffect(() => {
      setLanguage(getLanguage());
    }, []);

    const t =
      translations[language as keyof typeof translations];
      const generarVideo = async () => {

  const response = await fetch(
    "/api/generar-video",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        formato,
        descripcion,
        duracion,
        cantidadImagenes:
          imagenes?.length || 0,
      }),
    }
  );

  const data =
    await response.json();

  localStorage.setItem(
    "videoData",
    JSON.stringify(data)
  );

  window.location.href =
    "/propuesta-video";
};

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-4">
          🎬 {t.crearVideoPromocional}
        </h1>

        <p className="text-slate-400 mb-8">
          {t.videoDescripcion}
        </p>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">

          <div>

            <label className="block mb-2 font-semibold">
              {t.formatoVideo}
            </label>

            <select
              value={formato}
              onChange={(e) => setFormato(e.target.value)}
              className="w-full p-3 rounded-lg bg-white text-black"
            >
              <option>{t.seleccionaFormato}</option>
              <option>{t.fotoTexto}</option>
              <option>{t.variasFotosTexto}</option>
              <option>{t.videoTexto}</option>
              <option>{t.presentacionPersonalizada}</option>
            </select>

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              📸 {t.subirImagenes}
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImagenes(e.target.files)}
              className="w-full p-3 rounded-lg bg-white text-black"
            />

            {imagenes && (
              <p className="mt-2 text-slate-400 text-sm">
                {imagenes.length} {t.imagenesSeleccionadas}
              </p>
            )}

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              {t.describeProducto}
            </label>

            <textarea
              placeholder={t.ejemploProducto}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={4}
              className="w-full p-3 rounded-lg bg-white text-black"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              {t.duracionVideo}
            </label>

            <select
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              className="w-full p-3 rounded-lg bg-white text-black"
            >
              <option>{t.seleccionaDuracion}</option>
              <option>{t.segundos15}</option>
              <option>{t.segundos30}</option>
              <option>{t.segundos60}</option>
            </select>

          </div>

          <button
            onClick={generarVideo}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-bold"
          >
            {t.generarVideo}
          </button>

        </div>

        <div className="mt-8 flex justify-center">

          <button
            onClick={() => window.location.href = "/"}
            className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl font-semibold"
          >
            {t.volverInicio}
          </button>

        </div>

      </div>

    </main>
  );
}