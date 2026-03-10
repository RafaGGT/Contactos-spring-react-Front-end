import BASE_URL from "./restapi.js";

const url = BASE_URL + "/listas-contactos/red";

export function getAuthHeaders() {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
}

export async function añadirRed(data) {
    const response = await fetch(`${url}/añadir-red`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const text = await response.text();
        console.error("ERROR BACKEND:", text);
        throw new Error("Error al añadir red");
    }

    return true;
}

export async function modificarRed(data) {
    const response = await fetch(`${url}/modificar-red`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const text = await response.text();
        console.error("ERROR BACKEND:", text);
        throw new Error("Error al modificar red");
    }

    return true;
}

// ✅ ELIMINAR RED
export async function eliminarRed(data) {
    const response = await fetch(`${url}/eliminar-red`, {
        method: "DELETE",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const text = await response.text();
        console.error("ERROR BACKEND:", text);
        throw new Error("Error al eliminar red");
    }

    return true;
}