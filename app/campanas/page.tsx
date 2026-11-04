"use client";

import { useEffect, useState } from "react";
import { translations } from "../translations";
import { getLanguage } from "../../lib/language";

export default function Campanas() {
  const [objetivo, setObjetivo] = useState("");
  const [duracion, setDuracion] = useState("");
  const [objetivoPersonalizado, setObjetivoPersonalizado] = useState("");
  const [language, setLanguage] = useState("es");

    useEffect(() => {
      setLanguage(getLanguage());
    }, []);

    const t =
      translations[language as keyof typeof translations];

  const generarCampana = () => {

  const objetivoFinal =
    objetivo === "Objetivo Personalizado"
      ? objetivoPersonalizado
      : objetivo;

  localStorage.setItem(
    "campanaData",
    JSON.stringify({
      objetivo: objetivoFinal,
      duracion,
    })
  );

  window.location.href = "/propuesta-campana";
};

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-4">
          🚀 {t.campanasTitulo}
        </h1>

        <p className="text-slate-400 mb-8">
          {t.campanasDescripcion}
        </p>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">

          <div>
            <label className="block mb-2 font-semibold">
              {t.objetivoTexto}
            </label>

            <select
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              className="w-full p-3 rounded-lg bg-white text-black"
            >
              <option>{t.seleccionaObjetivo}</option>
              <option>{t.crecimientoComercial}</option>
              <option>{t.posicionamientoMarca}</option>
              <option>{t.objetivoPersonalizado}</option>
              </select>
              {objetivo === "Objetivo Personalizado" && (
                <div className="mt-4">
                <label className="block mb-2 font-semibold">
                 {t.objetivoPersonalizadoLabel}
                 </label>

                    <textarea
                 placeholder={t.describeObjetivo}
                value={objetivoPersonalizado}
                onChange={(e) => {
              setObjetivoPersonalizado(e.target.value);
                 }}
                rows={4}
                className="w-full p-3 rounded-lg bg-white text-black"
                />
                </div>
                )}
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              {t.duracionTexto}
            </label>

            <select
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              className="w-full p-3 rounded-lg bg-white text-black"
            >
              <option>{t.seleccionaDuracion}</option>
             <option>{t.duracion3}</option>
            <option>{t.duracion7}</option>
            <option>{t.duracion15}</option>
            </select>
          </div>

          <button
            onClick={generarCampana}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-bold"
          >
            {t.generarCampana}
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