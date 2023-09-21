import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    realm: 'GoInventory',
    url: 'http://localhost:8082/auth',
    clientId: 'goinventory-auth',
});

export default keycloak;
