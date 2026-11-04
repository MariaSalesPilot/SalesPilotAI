"use client";

import { useEffect, useState } from "react";
import { translations } from "../translations";
import { getLanguage } from "../../lib/language";

export default function Propuesta() {
  const [empresa, setEmpresa] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [canales, setCanales] = useState<string[]>([]);
  const [opinion, setOpinion] = useState("");
  const [language, setLanguage] = useState("es");
  const [resultadoIA, setResultadoIA] = useState("");
  const [cargando, setCargando] = useState(false);

  const t =
    translations[language as keyof typeof translations];

  useEffect(() => {
    setLanguage(getLanguage());
    const data = localStorage.getItem("salespilotData");

    if (data) {
      const parsed = JSON.parse(data);

      setEmpresa(parsed.empresa || "");
      setDescripcion(parsed.descripcion || "");
      setObjetivo(parsed.objetivo || "");
      setCanales(parsed.canalesSeleccionados || []);
      generarConIA(
          parsed.empresa || "",
          parsed.descripcion || "",
          parsed.objetivo || "",
          parsed.canalesSeleccionados || []
        );
    }
  }, []);
const enviarOpinion = () => {
  const asunto = encodeURIComponent(
    "Feedback SalesPilotAI"
  );

  const mensaje = encodeURIComponent(opinion);

  window.location.href =
    `mailto:maria.dietmeyer@salespilotaiweb.com?subject=${asunto}&body=${mensaje}`;
};

const generarConIA = async (
  empresa: string,
  descripcion: string,
  objetivo: string,
  canales: string[]
) => {
  try {
    setCargando(true);

    const response = await fetch("/api/generar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        empresa,
        descripcion,
        objetivo,
        canalesSeleccionados: canales,
      }),
    });

    const data = await response.json();

    setResultadoIA(data.result || "");
  } catch (error) {
    console.error(error);
  } finally {
    setCargando(false);
  }
};

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          📊 {t.resumenEstrategico}
        </h1>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

            {cargando && (
            <div className="bg-slate-800 p-4 rounded-xl mb-6">
            🤖 Generando propuesta con IA...
              </div>
            )}

            {resultadoIA && (
              <div className="bg-slate-800 p-6 rounded-xl mb-8 whitespace-pre-wrap">
              {resultadoIA}
              </div>
            )}

          <h2 className="text-2xl font-bold mb-4">
            📋 {t.propuesta}: {empresa}
          </h2>

          <p className="text-slate-300 mb-6">
            {t.estrategiaDescripcion}
          </p>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              🎯 {t.objetivoPrincipal}
            </h3>

            <div className="bg-slate-800 rounded-xl p-4">
              {objetivo}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              🏢 {t.sobreNegocio}
            </h3>

            <div className="bg-slate-800 rounded-xl p-4">
              {descripcion}
            </div>
          </div>

          {canales.includes("Instagram") && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">
                📸 {t.instagram}
              </h3>

              <div className="bg-slate-800 rounded-xl p-4">
                 {t.instagramTexto1}

                <br /><br />

                {t.descubreEmpresa} {empresa}.

                <br /><br />

                {descripcion}

                <br /><br />

                ✅ {t.instagramBeneficio1}
                <br />
                ✅ {t.instagramBeneficio2}
                <br />
                ✅ {t.instagramBeneficio3}
              </div>
            </div>
          )}

          {canales.includes("Facebook") && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">
                📘 {t.facebook}
              </h3>

              <div className="bg-slate-800 rounded-xl p-4">
                {t.facebookPregunta}

                <br /><br />

                {empresa} {t.facebookOfrece}

                <br /><br />

                {descripcion}

                <br /><br />

                {t.facebookContacto}
              </div>
            </div>
          )}

          {canales.includes("WhatsApp") && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                💬 {t.whatsapp}
              </h3>
              <div className="bg-slate-800 rounded-xl p-4">
                {t.whatsappHola}
                <br /><br />
                {t.whatsappGracias} {empresa}.
                <br /><br />
                {descripcion}
                <br /><br />
                {t.whatsappAyuda}
              </div>
            </div>
          )}

        </div>
<div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-6">

  <h2 className="text-2xl font-bold mb-4">
    💬 {t.opinionTitulo}
  </h2>

  <p className="text-slate-300 mb-4">
    {t.opinionDescripcion}
  </p>

  <textarea
  placeholder={t.opinionPlaceholder}
  value={opinion}
  onChange={(e) => setOpinion(e.target.value)}
  className="w-full p-4 rounded-xl bg-slate-800 text-white border border-slate-700"
  rows={5}
/>

  <button
  onClick={() => {
    const asunto = encodeURIComponent(
      "Feedback SalesPilotAI"
    );

    const mensaje = encodeURIComponent(opinion);

    window.location.href =
      `mailto:maria.dietmeyer@salespilotaiweb.com?subject=${asunto}&body=${mensaje}`;
  }}
  className="mt-4 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold"
>
  📩 {t.enviarOpinion}
</button>

</div>

<div className="mt-8 flex justify-center">
  <button
    onClick={() => window.location.href = "/"}
    className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
  >
    {t.volverInicio}
  </button>
</div>
      </div>
    </main>
  );
}