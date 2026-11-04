"use client";

import { useEffect, useState } from "react";
import { translations } from "../translations";
import { getLanguage } from "../../lib/language";


export default function PropuestaVideo() {

  const [resultadoIA, setResultadoIA] = useState("");
  
const [language, setLanguage] = useState("es");

const t =
  translations[language as keyof typeof translations];
      
  useEffect(() => {

    setLanguage(getLanguage());

    const data = localStorage.getItem("videoData");

   if (data) {

        const parsed = JSON.parse(data);

        setResultadoIA(parsed.result || "");

      }

  }, []);

  return (
    
    <main className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          🎬 {t.videoPromocional}
        </h1>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">
              🤖 {t.guionIA}
            </h2>
          <div className="bg-slate-800 rounded-xl p-6 whitespace-pre-wrap">

            {resultadoIA}

          </div>

          <div className="bg-slate-800 rounded-xl p-6">

            <h3 className="text-xl font-semibold mb-4">
              🚧 {t.videoDesarrollo}
            </h3>

            <p>
              {t.imagenesRecibidas}
            </p>

            <p className="mt-3">
              {t.proximamenteVideo}
            </p>

            <ul className="mt-4 space-y-2">
              <li>✅ {t.mp4Video}</li>
              <li>✅ {t.instagramTexto}</li>
              <li>✅ {t.facebookTexto}</li>
              <li>✅ {t.whatsappTexto}</li>
            </ul>

          </div>

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