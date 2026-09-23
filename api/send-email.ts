
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"

import type { VercelRequest, VercelResponse } from "@vercel/node"

type ContactBody = {
    name: string
    email: string
    message: string
};

function isValidEmail(value: string): boolean {
    // regex o expresiones regulares
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default async function handler(req: VercelRequest, res: VercelResponse,): Promise<void> {
    if (req.method !== "POST") {
        res.status(405).json({
            error: "Método no permitido"
        })

        return
    }

    const { name, email, message } = req.body as ContactBody;
    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof message !== "string"
    ) {
        res.status(400).json({
            error: "El cuerpo de la petición es inválido"
        })

        return
    }

    const normalizedName = name.trim()
    const normalizedEmail = email.trim()
    const normalizedMessage = message.trim()

    if (normalizedName.length < 2 || normalizedName.length > 100) {
        res.status(400).json({
            error: "El nombre debe tener entre 2 y 100 caracteres"
        })

        return
    }

    if (!isValidEmail(normalizedEmail)) {
        res.status(400).json({
            error: "El correo no es válido"
        })

        return
    }

    if (normalizedMessage.length < 10 || normalizedMessage.length > 3000) {
        res.status(400).json({
            error: "El mensaje debe tener entre 10 y 3000 caracteres"
        })

        return
    }

    const region = process.env.AWS_REGION?.trim()
    const from = process.env.SES_FROM_EMAIL?.trim()

    if (!region || !from) {
        console.error("Faltan variables de entorno de SES")

        res.status(500).json({
            error: "El servidor no está configurado correctamente"
        })

        return
    }

    const sesClient = new SESClient({
        region
    })

    try {
        const command = new SendEmailCommand({
            Source: from,

            Destination: {
                ToAddresses: [normalizedEmail],
            },

            Message: {
                Subject: {
                    Data: 'Resumen de tareas',
                    Charset: "UTF-8"
                },

                Body: {
                    Text: {
                        Data: [
                            `Hola ${normalizedName}`,
                            "",
                            normalizedMessage
                        ].join("\n"),

                        Charset: "UTF-8"
                    }
                }
            }
        })

        const result = await sesClient.send(command)

        console.log("result", result)

        res.status(200).json({
            message: "Correo enviado correctamente",
            messageId: result.MessageId,
        })
    } catch (error: unknown) {
        console.error("Error enviando correo con SES:", error)

        res.status(500).json({
            error: "No se pudo enviar el correo",
            detail: error instanceof Error ? error.message : String(error)
        })
    }
}
