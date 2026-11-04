"use client";

import { useEffect, useState } from "react";
import { translations } from "../translations";
import { getLanguage } from "../../lib/language";

export default function Generador() {

  const [empresa, setEmpresa] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [canalesSeleccionados, setCanalesSeleccionados] = useState<string[]>([]);
  const [language, setLanguage] = useState("es");

useEffect(() => {
  setLanguage(getLanguage());
}, []);

const t =
  translations[language as keyof typeof translations];

  const toggleCanal = (canal: string) => {
    setCanalesSeleccionados((prev) =>
      prev.includes(canal)
        ? prev.filter((c) => c !== canal)
        : [...prev, canal]
    );
  };

  const generarContenido = () => {
    localStorage.setItem(
      "salespilotData",
      JSON.stringify({
        empresa,
        descripcion,
        categoria,
        objetivo,
        canalesSeleccionados,
      })
    );

    window.location.href = "/propuesta";
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          📢 {t.generadorTitulo}
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder={t.empresa}
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            className="w-full p-3 rounded-lg bg-white text-black"
          />

          <textarea
            placeholder={t.descripcionNegocio}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-lg bg-white text-black"
          />

          <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full p-3 rounded-lg bg-white text-black"
        >
          <option>{t.categoria}</option>
          <option>{t.servicios}</option>
          <option>{t.comercio}</option>
          <option>{t.construccion}</option>
          <option>{t.transporteLogistica}</option>
          <option>{t.inmobiliario}</option>
          <option>{t.energia}</option>
          <option>{t.tecnologia}</option>
          <option>{t.marketingPublicidad}</option>
          <option>{t.eventos}</option>
          <option>{t.saludBienestar}</option>
          <option>{t.educacion}</option>
          <option>{t.restauracionAlimentacion}</option>
          <option>{t.bellezaEstetica}</option>
          <option>{t.reparacionesMantenimiento}</option>
          <option>{t.fabricacionIndustria}</option>
          <option>{t.otraCategoria}</option>
        </select>

          <select
            value={objetivo}
            onChange={(e) => setObjetivo(e.target.value)}
            className="w-full p-3 rounded-lg bg-white text-black"
          >
            <option value="">
              {t.objetivo}
            </option>

            <option>{t.crecimientoComercial}</option>
            <option>{t.masReuniones}</option>
            <option>{t.fidelizarClientes}</option>
            <option>{t.generarLeads}</option>
            <option>{t.otro}</option>
          </select>

          <div>
            <label className="block mb-3 font-semibold text-white">
              {t.canales}
            </label>

            <div className="flex gap-2 flex-wrap">

              <button
                type="button"
                onClick={() => toggleCanal("Instagram")}
                className={`px-3 py-2 rounded-xl font-medium transition ${
                  canalesSeleccionados.includes("Instagram")
                    ? "bg-pink-600 text-white"
                    : "bg-slate-700 text-slate-200"
                }`}
              >
                📸 {t.instagram}
              </button>

              <button
                type="button"
                onClick={() => toggleCanal("Facebook")}
                className={`px-3 py-2 rounded-xl font-medium transition ${
                  canalesSeleccionados.includes("Facebook")
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-200"
                }`}
              >
                📘{t.facebook}
              </button>

              <button
                type="button"
                onClick={() => toggleCanal("WhatsApp")}
                className={`px-3 py-2 rounded-xl font-medium transition ${
                  canalesSeleccionados.includes("WhatsApp")
                    ? "bg-green-600 text-white"
                    : "bg-slate-700 text-slate-200"
                }`}
              >
                💬 {t.whatsapp}
              </button>

            </div>

            {canalesSeleccionados.length > 0 && (
              <div className="mt-3 text-sm text-slate-300">
                {t.selected} {canalesSeleccionados.join(" • ")}
              </div>
            )}
          </div>

          <button
            onClick={generarContenido}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-bold"
          >
            {t.generarContenidoBtn}
          </button>
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