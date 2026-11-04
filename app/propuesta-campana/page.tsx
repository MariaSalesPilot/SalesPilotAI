"use client";

import { useEffect, useState } from "react";
import { translations } from "../translations";
import { getLanguage } from "../../lib/language";

export default function PropuestaCampana() {

  const [objetivo, setObjetivo] = useState("");
  const [duracion, setDuracion] = useState("");
 
  const [language, setLanguage] = useState("es");
  const t =
  translations[language as keyof typeof translations];

  useEffect(() => {
    setLanguage(getLanguage());
    const data = localStorage.getItem("campanaData");

    if (data) {
      const parsed = JSON.parse(data);
     

      setObjetivo(parsed.objetivo || "");
      setDuracion(parsed.duracion || "");
        }
        }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          🚀 {t.campanaRecomendada}
        </h1>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-4">
             {t.objetivoTexto}: {objetivo}
                </h2>

           <p className="text-slate-300 mb-6">
              {t.duracionRecomendada}: {duracion}
            </p>

            <div className="bg-blue-950 border border-blue-700 rounded-xl p-6 mb-6">

              <h3 className="text-xl font-semibold mb-4">
                🤖 {t.planCampanaIA}
              </h3>

              <div className="whitespace-pre-wrap">
                {t.campanaIAPendiente}
              </div>

            </div>

<div className="bg-slate-800 rounded-xl p-6">

  <h3 className="text-xl font-semibold mb-4">
    📅 {t.estrategiaSugerida}
  </h3>

  {duracion.includes("3") && (
    <>
      <p>{t.dia1}</p>
      <p>{t.dia2}</p>
      <p>{t.dia3}</p>
    </>
  )}

  {duracion.includes("7") && (
    <>
      <p>{t.dia1}</p>
      <p>{t.dia3}</p>
      <p>{t.dia5}</p>
      <p>{t.dia7}</p>
    </>
  )}

  {duracion.includes("15") && (
    <>
      <p>{t.semana1}</p>
      <p>{t.semana2}</p>
    </>
  )}

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