import axios from "axios";
import keycloak from "../keycloack.js";
import BASE_URL from "../services/Api.js";

export async function createClawTreatment(request){
    await keycloak.updateToken(30);
    const response = await axios.post(`${BASE_URL}/clawtreatments`, request, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`
            }
        }
    )

    return response.data
}