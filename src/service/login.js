import BASE_URL from "./restapi.js";

export async function loginUsuario(datos) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
    });

    if (!response.ok) {
        throw new Error("Usuario o contraseña incorrectos");
    }

    return response.json();
}