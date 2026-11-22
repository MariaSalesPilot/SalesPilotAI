"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { translations } from "../translations";
import { getLanguage } from "../../lib/language";
import { supabase } from "../../lib/supabase";

export default function AppPage() {
  const [language, setLanguage] = useState("es");
  const [plan, setPlan] = useState("");
const [publicacionesRestantes, setPublicacionesRestantes] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  useEffect(() => {
    setLanguage(getLanguage());
    obtenerUsuario();
  }, []);

  async function obtenerUsuario() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  setUser(user);

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", user.email)
    .single();

  if (profile) {
    setPlan(profile.plan || "Gratis");

    setPublicacionesRestantes(
      profile.publicaciones_restantes || 0
    );
  }

  if (error) {
    console.log(error);
  }
}

  async function cerrarSesion() {
    await supabase.auth.signOut();
    localStorage.clear();
    window.location.href = "/";
  }

  const t =
    translations[language as keyof typeof translations];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="w-full max-w-6xl mx-auto p-8">

        {/* Idioma y menú */}
        <div className="flex justify-end gap-4 mb-6">

          <div className="flex items-center gap-2">
            <span className="text-sm">
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
              className="bg-slate-800 px-4 py-2 rounded-lg"
            >
              {t.user}
            </button>

            {openUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 rounded-xl border border-slate-700 shadow-xl">

                <a
                  href="/mi-perfil"
                  className="block px-4 py-3 hover:bg-slate-800"
                >
                  👤 {t.user}
                </a>

                <a
                  href="/planes"
                  className="block px-4 py-3 hover:bg-slate-800"
                >
                  💳 {t.miPlan}
                </a>

                <button
                  onClick={cerrarSesion}
                  className="block w-full text-left px-4 py-3 hover:bg-slate-800"
                >
                  🚪 {t.cerrarSesion}
                </button>

              </div>
            )}
          </div>

        </div>

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Image
            src="/logo1.png"
            alt="SalesPilot AI"
            width={150}
            height={150}
          />

          <h1 className="text-5xl font-bold">
            SalesPilot AI
          </h1>
        </div>

        <p className="text-center mt-4 text-xl text-slate-300">
          {t.subtitle}
        </p>

        <p className="text-center mt-3 text-slate-400 max-w-2xl mx-auto">
          {t.description}
        </p>

        {/* Perfil */}
        <div className="bg-slate-900 border border-red-500 rounded-2xl p-6 mt-8 mb-8 max-w-3xl mx-auto">

          <h2 className="text-2xl font-bold mb-4">
            {t.dashboardTitle1}
          </h2>

          <p className="text-slate-300">
            {user?.email}
          </p>

          <p className="mt-4">
          <strong>{t.miPlan}:</strong> {plan}
            </p>

          <p>
          <strong>{t.publicacionesRestantes}:</strong> {publicacionesRestantes}
          </p>

        </div>

        {/* Módulos */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">

          <div
            onClick={() =>
              (window.location.href = "/generador")
            }
            className="bg-slate-900 border border-red-500 rounded-2xl p-6 text-center cursor-pointer hover:bg-slate-800"
          >
            <h3 className="text-lg font-bold">
              📢 {t.contenido}
            </h3>

            <p className="text-sm text-slate-400 mt-2">
              {t.contenidoDesc}
            </p>
          </div>

          <div
            onClick={() =>
              (window.location.href = "/campanas")
            }
            className="bg-slate-900 border border-red-500 rounded-2xl p-6 text-center cursor-pointer hover:bg-slate-800"
          >
            <h3 className="text-lg font-bold">
              🚀 {t.campanas}
            </h3>

            <p className="text-sm text-slate-400 mt-2">
              {t.campanasDesc}
            </p>
          </div>

          <div
            onClick={() =>
              (window.location.href = "/videos")
            }
            className="bg-slate-900 border border-red-500 rounded-2xl p-6 text-center cursor-pointer hover:bg-slate-800"
          >
            <h3 className="text-lg font-bold">
              🎬 {t.videos}
            </h3>

            <p className="text-sm text-slate-400 mt-2">
              {t.videosDesc}
            </p>
          </div>

          <div
            onClick={() =>
              (window.location.href = "/calendario")
            }
            className="bg-slate-900 border border-red-500 rounded-2xl p-6 text-center cursor-pointer hover:bg-slate-800"
          >
            <h3 className="text-lg font-bold">
              📅 {t.calendario}
            </h3>

            <p className="text-sm text-slate-400 mt-2">
              {t.calendarioDesc}
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}