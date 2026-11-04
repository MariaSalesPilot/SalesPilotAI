import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const {
      objetivo,
      duracion,
      language = "es",
    } = await req.json();

    const idioma =
      language === "de"
        ? "alemán"
        : language === "en"
        ? "inglés"
        : "español";

    const prompt = `
Eres un experto en marketing digital y campañas comerciales para pequeñas y medianas empresas.

Idioma de respuesta:
${idioma}

Objetivo:
${objetivo}

Duración:
${duracion}

Genera una campaña profesional incluyendo:

1. Resumen estratégico.
2. Objetivo principal.
3. Plan de campaña.
4. Acciones recomendadas.
5. Publicaciones sugeridas.
6. Llamada a la acción.
7. Consejos para mejorar resultados.

La respuesta debe estar completamente en ${idioma}.

Devuelve el contenido bien organizado y profesional.
`;

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Eres un especialista en marketing digital para pequeñas y medianas empresas.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 1500,
      });

    return Response.json({
      result:
        completion.choices[0].message.content ||
        "No se pudo generar la campaña.",
    });

  } catch (error) {

    console.error("Error OpenAI:", error);

    return Response.json(
      {
        error: "Error al generar la campaña.",
      },
      {
        status: 500,
      }
    );
  }
}