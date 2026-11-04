import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const {
      formato,
      descripcion,
      duracion,
      cantidadImagenes,
    } = await req.json();

    const prompt = `
Eres un experto en Video Marketing.

Información recibida:

Formato:
${formato}

Descripción del negocio:
${descripcion}

Duración:
${duracion}

Cantidad de imágenes:
${cantidadImagenes}

Genera:

1. Título del vídeo.
2. Guion completo.
3. Escena por escena.
4. Texto para Instagram.
5. Texto para Facebook.
6. Texto para WhatsApp.
7. Llamada a la acción.
8. 5 hashtags.

Devuelve el contenido bien estructurado.
`;

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Eres un especialista en Video Marketing y contenido para redes sociales.",
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

    console.error(error);

    return Response.json(
      {
        error: "Error generando vídeo.",
      },
      {
        status: 500,
      }
    );
  }
}