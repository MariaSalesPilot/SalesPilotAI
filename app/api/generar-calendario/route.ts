import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {

    const {
      negocio,
      language = "es",
    } = await req.json();

    const idioma =
      language === "de"
        ? "alemán"
        : language === "en"
        ? "inglés"
        : "español";

    const prompt = `
Eres un experto en marketing digital y planificación de contenidos.

Idioma de respuesta:
${idioma}

Información del negocio:
${negocio}

Genera:

1. Resumen estratégico.
2. Calendario semanal.
3. Ideas para lunes.
4. Ideas para martes.
5. Ideas para miércoles.
6. Ideas para jueves.
7. Ideas para viernes.
8. Ideas para sábado.
9. Ideas para domingo.
10. Consejos para aumentar el alcance.

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
              "Eres un especialista en marketing digital y creación de calendarios de contenido.",
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
        "No se pudo generar el calendario.",
    });

  } catch (error) {

    console.error("Error OpenAI:", error);

    return Response.json(
      {
        error: "Error al generar el calendario.",
      },
      {
        status: 500,
      }
    );
  }
}