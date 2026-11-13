
import axios from "axios";
import keycloak from "../keycloack.js";
import BASE_URL from "../services/Api.js";

export async function getTreatmentHistory(){
    await keycloak.updateToken(30);
    const response = await axios.get(`${BASE_URL}/treatments`, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`
            }
        }
    )
    return response.data
}