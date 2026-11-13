import axios from "axios";
import keycloak from "../keycloack.js";
import BASE_URL from "../services/Api.js";

export async function getOneCow(id) {
    await keycloak.updateToken(30);

    const response = await axios.get(`${BASE_URL}/cows/${id}`, {
        headers: {
            Authorization: `Bearer ${keycloak.token}`,
        },
    });

    console.log("Response van backend:", response.data);

    return response.data;
}