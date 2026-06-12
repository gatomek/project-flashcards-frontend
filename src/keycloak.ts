import Keycloak from 'keycloak-js';

const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL;
const keycloakRealm = import.meta.env.VITE_KEYCLOAK_REALM;
const keycloakClientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;

if (!keycloakUrl) {
    throw new Error('Missing required environment variable: VITE_KEYCLOAK_URL');
}
if (!keycloakRealm) {
    throw new Error('Missing required environment variable: VITE_KEYCLOAK_REALM');
}
if (!keycloakClientId) {
    throw new Error('Missing required environment variable: VITE_KEYCLOAK_CLIENT_ID');
}

const keycloak = new Keycloak({
    url: keycloakUrl,
    realm: keycloakRealm,
    clientId: keycloakClientId
});

export default keycloak;
