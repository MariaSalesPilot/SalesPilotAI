import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const {
      empresa,
      descripcion,
      objetivo,
      canalesSeleccionados,
    } = await req.json();

    const prompt = `
Eres un experto en marketing digital, redes sociales y generación de contenido comercial.

Información del negocio:

Empresa: ${empresa}

Descripción:
${descripcion}

Objetivo:
${objetivo}

Canales seleccionados:
${canalesSeleccionados.join(", ")}

Genera una propuesta profesional incluyendo:

1. Resumen estratégico.
2. Objetivo principal.
3. Una publicación para cada canal seleccionado.
4. Llamado a la acción.
5. 5 hashtags relevantes.
6. Recomendaciones para mejorar el alcance.

Devuelve el texto bien organizado y atractivo para el cliente.
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
        "No se pudo generar contenido.",
    });
  } catch (error) {
    console.error("Error OpenAI:", error);

    return Response.json(
      {
        error: "Error al generar contenido.",
      },
      {
        status: 500,
      }
    );
  }
}