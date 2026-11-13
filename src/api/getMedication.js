
import axios from "axios";
import keycloak from "../keycloack.js";
import BASE_URL from "../services/Api.js";

export async function getMedication(){
    await keycloak.updateToken(30);
    const response = await axios.get(`${BASE_URL}/medications`, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`
            }
        }
    )
    return response.data
}