import axios from "axios";
import keycloak from "../keycloack.js";
import BASE_URL from "../services/Api.js";
export async function deleteOneMedicationInventory(Id){
    await keycloak.updateToken(30);
    const response = await axios.delete(`${BASE_URL}/medicationinventories/${Id}`, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`
            }
        }
    )
    return response.data
}
