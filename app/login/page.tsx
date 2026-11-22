"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { translations } from "../translations";

export default function LoginPage() {

  const router = useRouter();

  const [language, setLanguage] =
    useState("es");

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

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

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    setMessage("");

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {

      setMessage(error.message);

      setLoading(false);

      return;

    }

    setMessage(
  t.loginCorrecto
);

    router.push("/app");

    setLoading(false);

  };

  return (

    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-slate-900 rounded-2xl p-8">

        <h1 className="text-3xl font-bold mb-6 text-center">

          {t.iniciarSesion}

        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder={
              t.correoElectronico
            }
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
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
              setPassword(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-slate-800"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold"
          >

            {loading
              ? t.entrando
              : t.iniciarSesion}

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