"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { translations } from "../translations";

export default function RegisterPage() {
  const [language, setLanguage] =
    useState("es");

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
const [plan, setPlan] =
  useState("free");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem(
        "salespilotLanguage"
      );

    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t =
    translations[
      language as keyof typeof translations
    ];

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    setMessage("");

    try {
      const {
        data,
        error,
      } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);

        setLoading(false);

        return;
      }

      if (data.user) {
  await supabase
    .from("profiles")
    .insert([
      {
        id: data.user.id,
        email,
        nombre,
        plan,
        publicaciones_restantes:
          plan === "free"
            ? 1
            : plan === "basic"
            ? 10
            : plan === "professional"
            ? 30
            : 9999,
      },
    ]);

        setMessage(
        t.registroPendienteConfirmacion
      );

      setNombre("");
      setEmail("");
      setPassword("");

}
    } catch {
      setMessage(
        t.errorGeneral
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-slate-900 rounded-2xl p-8">

        <h1 className="text-3xl font-bold mb-6 text-center">
          {t.registerTitle}
        </h1>

        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder={t.nombre}
            value={nombre}
            onChange={(e) =>
              setNombre(
                e.target.value
              )
            }
            className="w-full p-3 rounded-lg bg-slate-800"
            required
          />

          <input
            type="email"
            placeholder={
              t.correoElectronico
            }
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full p-3 rounded-lg bg-slate-800"
            required
          />

          <input
            type="password"
                        placeholder={
              t.contrasena
            }
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full p-3 rounded-lg bg-slate-800"
            required
          />
          <div>

              <label className="block mb-2">
                {t.seleccionaPlan}
              </label>

              <select
                value={plan}
                onChange={(e) =>
                  setPlan(e.target.value)
                }
                className="w-full p-3 rounded-lg bg-slate-800"
              >

                <option value="free">
                  {t.planGratis}
                </option>

                <option value="basic">
                  {t.planBasico}
                </option>

                <option value="professional">
                  {t.planProfesional}
                </option>

                <option value="enterprise">
                  {t.planEmpresa}
                </option>

              </select>

            </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-700 p-3 rounded-lg font-semibold"
          >

            {loading
              ? t.registrando
              : t.crearCuenta}

          </button>

        </form>

        {message && (
          <p className="mt-4 text-center">
            {message}
          </p>
        )}

      </div>

    </main>
  );
}