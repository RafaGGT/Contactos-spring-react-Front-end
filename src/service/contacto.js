import BASE_URL from "./restapi.js";

const url = BASE_URL + "/listas-contactos";

export function getAuthHeaders() {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
}


export async function crearContacto(data) {

    const response = await fetch(
        `${url}/crear-contacto`,
        {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        }
    );

    console.log("STATUS:", response.status);

    if (!response.ok) {
        const text = await response.text();
        console.error("ERROR BACKEND:", text);
        throw new Error("Error al crear contacto");
    }

    return response.headers.get("Location");
}

export async function obtenerContactos() {
    const response = await fetch(
        `${url}/ver-contactos`,
        {
            method: "GET",
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Error al obtener contactos");
    }

    return await response.json();
}

export async function modificarContacto(data) {
    const response = await fetch(
        `${url}/modificar-contacto`,
        {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        }
    );

    console.log("STATUS:", response.status);

    if (!response.ok) {
        const text = await response.text();
        console.error("ERROR BACKEND:", text);
        throw new Error("Error al modificar contacto");
    }

    return true; // tu backend devuelve 200 OK sin body
}
export async function eliminarContacto(id) {
    const response = await fetch(
        `${url}/eliminar-contacto`,
        {
            method: "DELETE",
            headers: getAuthHeaders(),
            body: JSON.stringify({ id: id }),
        }
    );

    console.log("STATUS:", response.status);

    if (!response.ok) {
        const text = await response.text();
        console.error("ERROR BACKEND:", text);
        throw new Error("Error al eliminar contacto");
    }

    return true; // backend devuelve 204 No Content
}
