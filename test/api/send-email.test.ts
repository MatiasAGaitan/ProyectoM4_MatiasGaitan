import { describe, expect, test, vi, beforeEach } from "vitest"
import type { VercelRequest, VercelResponse } from "@vercel/node"
import handler from "../../api/send-email"

const { sendMock } = vi.hoisted(() => ({
    sendMock: vi.fn(),
}))

vi.mock("@aws-sdk/client-ses", () => ({
    SESClient: vi.fn().mockImplementation(function () {
        return {
            send: sendMock,
        }
    }),
    SendEmailCommand: vi.fn(),
}))

function createMockRes() {
    return {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
    }
}

describe("send-email api", () => {
    beforeEach(() => {
        vi.clearAllMocks()

        sendMock.mockResolvedValue({
            MessageId: "message-123",
        })

        process.env.AWS_REGION = "us-east-1"
        process.env.SES_FROM_EMAIL = "test@test.com"
    })

    test("devuelve 405 si el metodo no es POST", async () => {
        const req = {
            method: "GET",
            body: {},
        }

        const res = createMockRes()

        await handler(
            req as unknown as VercelRequest,
            res as unknown as VercelResponse
        )

        expect(res.status).toHaveBeenCalledWith(405)
        expect(res.json).toHaveBeenCalledWith({
            error: "Método no permitido",
        })
    })

    test("devuelve 400 si el body es invalido", async () => {
        const req = {
            method: "POST",
            body: {
                name: null,
                email: "test@test.com",
                message: "Mensaje valido",
            },
        }

        const res = createMockRes()

        await handler(
            req as unknown as VercelRequest,
            res as unknown as VercelResponse
        )

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            error: "El cuerpo de la petición es inválido",
        })
    })

    test("devuelve 400 si el email no es valido", async () => {
        const req = {
            method: "POST",
            body: {
                name: "Usuario",
                email: "email-invalido",
                message: "Mensaje valido",
            },
        }

        const res = createMockRes()

        await handler(
            req as unknown as VercelRequest,
            res as unknown as VercelResponse
        )

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            error: "El correo no es válido",
        })
    })

    test("devuelve 500 si faltan variables de entorno", async () => {
        delete process.env.AWS_REGION
        delete process.env.SES_FROM_EMAIL

        const req = {
            method: "POST",
            body: {
                name: "Usuario",
                email: "test@test.com",
                message: "Mensaje valido",
            },
        }

        const res = createMockRes()

        await handler(
            req as unknown as VercelRequest,
            res as unknown as VercelResponse
        )

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({
            error: "El servidor no está configurado correctamente",
        })
    })

    test("devuelve 200 si el email se envia correctamente", async () => {
        const req = {
            method: "POST",
            body: {
                name: "Usuario",
                email: "test@test.com",
                message: "Mensaje valido",
            },
        }

        const res = createMockRes()

        await handler(
            req as unknown as VercelRequest,
            res as unknown as VercelResponse
        )

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            message: "Correo enviado correctamente",
            messageId: "message-123",
        })
    })
})
