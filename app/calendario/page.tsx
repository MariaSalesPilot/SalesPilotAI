"use client";

import { useEffect, useState } from "react";
import { translations } from "../translations";
import { getLanguage } from "../../lib/language";

export default function Calendario() {
  const [negocio, setNegocio] = useState("");
  const [language, setLanguage] = useState("es");

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  const t =
    translations[language as keyof typeof translations];

  const generarCalendario = () => {
    localStorage.setItem(
      "calendarioData",
      JSON.stringify({
        negocio,
      })
    );

    window.location.href = "/propuesta-calendario";
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-4">
          📅 {t.calendarioTitulo}
        </h1>

        <p className="text-slate-400 mb-8">
          {t.calendarioDescripcion}
        </p>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">

          <div>
            <label className="block mb-2 font-semibold">
              {t.describeNegocio}
            </label>

            <textarea
              placeholder={t.ejemploCalendario}
              value={negocio}
              onChange={(e) => setNegocio(e.target.value)}
              rows={4}
              className="w-full p-3 rounded-lg bg-white text-black"
            />
          </div>

          <button
            onClick={generarCalendario}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-bold"
          >
            {t.generarCalendario}
          </button>

        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl font-semibold"
          >
            {t.volverInicio}
          </button>
        </div>

      </div>
    </main>
  );
}