"use client";

import { useEffect, useState } from "react";
import { translations } from "../translations";
import { getLanguage } from "../../lib/language";

export default function PropuestaCalendario() {
  const [negocio, setNegocio] = useState("");
  const [language, setLanguage] = useState("es");
  const usarIA = false;
  const [calendarioIA, setCalendarioIA] = useState("");

  useEffect(() => {
    setLanguage(getLanguage());

    const data = localStorage.getItem("calendarioData");

    if (data) {
      const parsed = JSON.parse(data);
      setNegocio(parsed.negocio || "");
    }
  }, []);

        if (usarIA) {
          // llamar a OpenAI
        } else {
          // mostrar calendario predefinido
        }


  const t =
    translations[language as keyof typeof translations];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          📅 {t.calendarioTitulo}
        </h1>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            {negocio}
          </h2>

          <p className="text-slate-300 mb-8">
            {t.planSemanalSugerido}
          </p>

          <div className="grid gap-4">

            <div className="bg-slate-800 rounded-xl p-4">
              <strong>📌 {t.lunes}</strong>
              <p>{t.ideaLunes}</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <strong>💡 {t.miercoles}</strong>
              <p>{t.ideaMiercoles}</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <strong>🚀 {t.viernes}</strong>
              <p>{t.ideaViernes}</p>
            </div>

          </div>

        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
          >
            {t.volverInicio}
          </button>
        </div>

      </div>
    </main>
  );
}