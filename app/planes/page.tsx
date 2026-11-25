"use client";

import { useEffect, useState } from "react";
import { translations } from "../translations";
import { getLanguage } from "../../lib/language";

export default function PlanesPage() {
  const [language, setLanguage] = useState("es");

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  const t =
    translations[language as keyof typeof translations];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-4">
          {t.planesTitulo}
        </h1>

        <p className="text-center text-slate-400 mb-12">
          {t.planesDescripcion}
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          {/* GRATIS */}

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">

            <h2 className="text-2xl font-bold mb-4">
              🆓 {t.planGratis}
            </h2>

            <ul className="space-y-3 text-slate-300">
              <li>{t.gratisLinea1}</li>
              <li>{t.gratisLinea2}</li>
              <li>{t.gratisLinea3}</li>
              <li>{t.gratisLinea4}</li>
            </ul>

            <div className="mt-6 bg-yellow-500/10 border border-yellow-500 rounded-xl p-4 text-sm text-yellow-200">

              <p className="mb-3">
                {t.gratisNota1}
              </p>

              <p>
                {t.gratisNota2}
              </p>

            </div>

            <p className="text-4xl font-bold mt-6">
              {t.precioGratis}
            </p>

            <button
              className="w-full mt-6 bg-slate-700 hover:bg-slate-600 py-3 rounded-xl font-semibold"
            >
              {t.planGratisTitulo}
            </button>

          </div>

          {/* BÁSICO */}

          <div className="bg-slate-900 rounded-2xl p-6 border border-cyan-500">

            <h2 className="text-2xl font-bold mb-4">
              💼 {t.planBasico}
            </h2>

            <ul className="space-y-3 text-slate-300">

              <li>{t.basicoLinea1}</li>
              <li>{t.basicoLinea2}</li>
              <li>{t.basicoLinea3}</li>
              <li>{t.basicoLinea4}</li>

            </ul>

            <p className="text-4xl font-bold mt-10">
              {t.precioBasico}
            </p>

            <button
              className="w-full mt-6 bg-cyan-600 hover:bg-cyan-700 py-3 rounded-xl font-semibold"
            >
              {t.planBasicoTitulo}
            </button>

          </div>

          {/* PROFESIONAL */}

          <div className="bg-slate-900 rounded-2xl p-6 border border-green-500">

            <h2 className="text-2xl font-bold mb-4">
              🚀 {t.planProfesional}
            </h2>

            <ul className="space-y-3 text-slate-300">

              <li>{t.profesionalLinea1}</li>
              <li>{t.profesionalLinea2}</li>
              <li>{t.profesionalLinea3}</li>
              <li>{t.profesionalLinea4}</li>

            </ul>

            <p className="text-4xl font-bold mt-10">
              {t.precioProfesional}
            </p>

            <button
              className="w-full mt-6 bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold"
            >
              {t.planProfesionalTitulo}
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}