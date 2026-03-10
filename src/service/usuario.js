import BASE_URL from "./restapi.js";

export async function obtenerUsuario(username, token) {
    const response = await fetch(`${BASE_URL}/usuario/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        let error;
        try {
            error = await response.json();
        } catch {
            error = { message: "Error al obtener usuario" };
        }
        throw error;
    }

    return response.json();
}

export async function actualizarUsuario(username, datos, token) {
    const response = await fetch(`${BASE_URL}/modificar/${username}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(datos)
    });

    if (!response.ok) {
        let error;
        try {
            error = await response.json();
        } catch {
            error = { message: "Error al actualizar usuario" };
        }
        throw error;
    }

    return response.json();
}

export async function eliminarUsuario(username, datos, token) {
    const response = await fetch(`${BASE_URL}/eliminar/${username}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(datos)
    });

    if (!response.ok) {
        let error;
        try {
            error = await response.json();
        } catch {
            error = { message: "Error al eliminar usuario" };
        }
        throw error;
    }

    return true;
}