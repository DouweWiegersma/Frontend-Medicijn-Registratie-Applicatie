import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "https://auth.melkveebedrijfbuitenwiek.nl",
    realm: "DairyFarmManagementSystem",
    clientId: "DairyFarmManagementFrontend"
});

export default keycloak;

