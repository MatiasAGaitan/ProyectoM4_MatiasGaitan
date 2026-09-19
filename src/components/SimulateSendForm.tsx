const simulateSendForm = () => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            const hasError = false

            if (hasError) {
                reject(new Error("Error al enviar el formulario"))
                return
            }
            resolve()
        }, 2000)
    })
}

export default simulateSendForm