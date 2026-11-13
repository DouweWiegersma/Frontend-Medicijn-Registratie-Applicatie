import { createContext, useContext, useEffect, useState} from "react";
import keycloak from "../keycloack.js";

const AuthContext = createContext(null);

let initPromise;

function initializeKeycloak() {
    if (!initPromise) {
        initPromise = keycloak.init({
            onLoad: "login-required",
            pkceMethod: "S256",
            checkLoginIframe: false,
        });
    }

return initPromise;

}

export function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);


useEffect(() => {
    let active = true;

    initializeKeycloak()
        .then((isAuthenticated) => {
            if (active) {
                setAuthenticated(isAuthenticated);
                setLoading(false);
            }
        })
        .catch((error) => {
            console.error("Keycloak initialisatie mislukt:", error);

            if (active) {
                setLoading(false);
            }
        });

    return () => {
        active = false;
    };
}, []);

if (loading) {
    return <p className='flex justify-center items-center'>Bezig met inloggen...</p>;
}

if (!authenticated) {
    return <p className='flex justify-center items-center'>Inloggen is niet gelukt. Controleer de console.</p>;
}

return (
    <AuthContext.Provider value={keycloak}>
        {children}
    </AuthContext.Provider>
);


}

export function useAuth() {
    return useContext(AuthContext);
}
