"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { translations } from "./translations";
import { getLanguage } from "../lib/language";
import { supabase } from "../lib/supabase";

export default function Home() { 
    const [empresa, setEmpresa] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [objetivo, setObjetivo] = useState("");
    const [canalesSeleccionados, setCanalesSeleccionados] = useState<string[]>([]);
    const [respuestaIA, setRespuestaIA] = useState("");
    const [openUserMenu, setOpenUserMenu] =
  useState(false);
    const toggleCanal = (canal: string) => {
    setCanalesSeleccionados((prev) =>
    prev.includes(canal)
    ? prev.filter((c) => c !== canal)
    : [...prev, canal]
    );
    };
    const [language, setLanguage] = useState("es");
    useEffect(() => {
        setLanguage(getLanguage());
      }, []);

    const t =
       translations[language as keyof typeof translations];
const generarContenido = () => {
  localStorage.setItem(
    "salespilotData",
    JSON.stringify({
      empresa,
      descripcion,
      objetivo,
      canalesSeleccionados,
    })
  );

  window.location.href = "/propuesta";
};
return (
  <main className="min-h-screen bg-slate-950 text-white">
    <div className="w-full max-w-6xl mx-auto p-8">
<div className="flex justify-end mb-2">

 <div className="flex items-center gap-2">

  <span className="text-white text-sm">
    {t.idiomaMenu}
  </span>

  <select
    value={language}
    onChange={(e) => {
      setLanguage(e.target.value);

      localStorage.setItem(
        "salespilotLanguage",
        e.target.value
      );
    }}
    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2"
  >
    <option value="es">ES</option>
    <option value="de">DE</option>
    <option value="en">EN</option>
  </select>
</div>
<div className="relative">

  <button
    onClick={() =>
      setOpenUserMenu(!openUserMenu)
    }
    className="bg-slate-800 px-4 py-2 rounded-lg flex items-center gap-2"
  >
    {t.user}
  </button>

  {openUserMenu && (

    <div className="absolute right-0 mt-2 w-56 bg-slate-900 rounded-xl shadow-xl border border-slate-700">

      <a
        href="/register"
        className="block px-4 py-3 hover:bg-slate-800"
      >
        {t.crearCuenta}
      </a>

      <a
        href="/login"
        className="block px-4 py-3 hover:bg-slate-800"
      >
       {t.iniciarSesion}
      </a>

      <button
        onClick={async () => {
          await supabase.auth.signOut();
          localStorage.clear();
          window.location.href = "/app";
        }}
        className="block w-full text-left px-4 py-3 hover:bg-slate-800"
      >
        🚪 {t.cerrarSesion}
      </button>

    </div>

  )}
</div>
</div>
      <div className="flex items-center justify-center gap-3 mb-4">
        <Image
          src="/logo1.png"
          alt="SalesPilot AI"
          width={150}
          height={150}
      ></Image>
      <h1 className="text-5xl font-bold text-center">
        SalesPilot AI
      </h1>
      </div>
      <p className="text-center mt-4 text-xl text-slate-300">
        {t.subtitle}
      </p>
      <p className="text-center mt-3 text-slate-400 max-w-2xl mx-auto">
        {t.description}
      </p>
    <div className="grid grid-cols-2 gap-4 mt-8">

  <div
  onClick={() => window.location.href = "/generador"} 
  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center cursor-pointer hover:border-blue-500 transition"
>
  <h3 className="text-lg font-bold">
    📢 {t.contenido}
  </h3>

  <p className="text-sm text-slate-400">
    {t.contenidoDesc}
  </p>
</div>

  <div 
  onClick={() => window.location.href = "/campanas"}
  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-slate-800 transition">
    <h3 className="text-lg font-semibold text-white">
  🚀 {t.campanas}
</h3>

<p className="text-sm text-slate-400 mt-1">
        {t.campanasDesc}
</p>
  </div>

  <div
  onClick={() => window.location.href = "/videos"}
  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center cursor-pointer hover:bg-slate-800 hover:border-blue-500 transition"
>

  <h3 className="text-lg font-semibold text-white">
    🎬 {t.videos}
  </h3>

  <p className="text-sm text-slate-400 mt-1">
    {t.videosDesc}
  </p>

</div>
<div
  onClick={() => window.location.href = "/calendario"}
  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center cursor-pointer hover:bg-slate-800 hover:border-blue-500 transition">
    <h3 className="text-lg font-semibold text-white">
  📅 {t.calendario}
</h3>

<p className="text-sm text-slate-400 mt-1">
  {t.calendarioDesc}
</p>
  </div>
  </div>
 <section className="mt-20">

  <h2 className="text-2xl font-bold text-center mb-4">
    {t.planesTitulo}
  </h2>

<p className="text-center text-slate-400 mb-10">
  {t.planesDescripcion}
  <span className="text-cyan-400">
    {" "}
    • {t.pruebaGratis}
  </span>
</p>
  <div className="text-center mb-8">
  
</div>

  <div className="grid md:grid-cols-3 gap-6">

    {/* Básico */}

    <div className="bg-slate-900 rounded-2xl p-5 border border-cyan-500">

      <h3 className="text-2xl font-bold">
        {t.planBasicoTitulo}
      </h3>

      <p className="text-cyan-400 text-2xl font-bold my-4">
        9,99€
      </p>

      <ul className="space-y-2">
        <li>✅ {t.planBasico10}</li>
        <li>✅ {t.generadorContenidoPlan}</li>
        <li>✅ {t.campanasPlan}</li>
        <li>✅ {t.calendarioPlan}</li>
      </ul>

    </div>

    {/* Profesional */}

    <div className="bg-slate-900 rounded-2xl p-5 border border-cyan-500">

      <h3 className="text-2xl font-bold">
        {t.planProfesionalTitulo}
      </h3>

      <p className="text-cyan-400 text-2xl font-bold my-4">
        14,99€
      </p>

      <ul className="space-y-2">
        <li>✅ {t.planProfesional30}</li>
        <li>✅ {t.generadorContenidoPlan}</li>
        <li>✅ {t.campanasPlan}</li>
        <li>✅ {t.calendarioPlan}</li>
        <li>✅ {t.videoMarketingPlan}</li>
      </ul>

    </div>

    {/* Empresa */}

    <div className="bg-slate-900 rounded-2xl p-5 border border-cyan-500">

      <h3 className="text-2xl font-bold">
        {t.planEmpresaTitulo}
      </h3>

      <p className="text-cyan-400 text-2xl font-bold my-4">
        39,99€
      </p>

      <ul className="space-y-2">
        <li>✅ {t.usoAmpliado}</li>
        <li>✅ {t.todasHerramientas}</li>
        <li>✅ {t.prioridadPlan}</li>
      </ul>

    </div>

  </div>

  <p className="text-center text-slate-400 mt-8">
    {t.cancelacionFlexible}
  </p>

</section> 
<div className="mt-16 flex justify-center">

  <div className="relative w-[500px] h-[350px]">

    <div className="group absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer">

      <div className="w-24 h-24 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-3xl hover:border-blue-500 hover:shadow-blue-500/20 hover:shadow-lg hover:scale-110 transition-all duration-300">
        ⚡
      </div>

      <p className="mt-6 font-semibold text-center">
        {t.howItWorks}
      </p>

      <div className="opacity-0 group-hover:opacity-100 transition mt-2 text-xs text-slate-400 text-center max-w-[180px]">
        {t.how1}<br />
        {t.how2}<br />
        {t.how3}
      </div>

    </div>

    <div className="group absolute bottom-0 left-0 flex flex-col items-center cursor-pointer">

      <div className="w-24 h-24 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-3xl hover:border-blue-500 hover:shadow-blue-500/20 hover:shadow-lg hover:scale-110 transition-all duration-300">
        🚀
      </div>

      <p className="mt-6 font-semibold text-center">
        {t.benefits}
      </p>

      <div className="opacity-0 group-hover:opacity-100 transition mt-2 text-xs text-slate-400 text-center max-w-[180px]">
        {t.benefit1}<br />
        {t.benefit2}<br />
        {t.benefit3}
      </div>

    </div>

    <div className="group absolute bottom-0 right-0 flex flex-col items-center cursor-pointer">

      <div className="w-24 h-24 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-3xl hover:border-blue-500 hover:shadow-blue-500/20 hover:shadow-lg hover:scale-110 transition-all duration-300">
        <span className="text-2xl font-bold text-blue-400">
          SA
        </span>
      </div>

      <p className="mt-6 font-semibold text-center">
        {t.whySalesPilot}
      </p>

      <div className="opacity-0 group-hover:opacity-100 transition mt-2 text-xs text-slate-400 text-center max-w-[180px]">
        {t.why1}<br />
        {t.why2}<br />
        {t.why3}
      </div>

    </div>
  </div>

</div>
</div>
<footer className="col-span-3 mt-16 border-t border-slate-800 pt-6 text-center text-sm text-slate-400">

  <div className="flex justify-center gap-6">

    <a
      href="/impressum"
      className="hover:text-white transition"
    >
      Impressum
    </a>

    <a
      href="/datenschutz"
      className="hover:text-white transition"
    >
      Datenschutz
    </a>

  </div>

  <p className="mt-4">
    © 2026 SalesPilot AI
  </p>

</footer>
</main>
);
}
