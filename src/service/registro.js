import BASE_URL from "./restapi.js";

export async function registrarUsuario(datos) {
    const response = await fetch(`${BASE_URL}/registro`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
    });

    if (!response.ok) {
        let error;
        try {
            error = await response.json();
        } catch {
            error = { message: "Error de validación" };
        }
        throw error;
    }

    return response.json();
}