import { useAuth } from "../context/AuthContext";
import { RiLogoutCircleRLine } from "react-icons/ri";
function AuthButtons() {
    const keycloak = useAuth();

    if (keycloak.authenticated) {
        return (
            <button onClick={() => keycloak.logout({
                redirectUri: window.location.origin
            })} >
                <RiLogoutCircleRLine className='h-10 w-10 text-wit hover:text-licht-groen'/>
            </button>
        );
    }

    return (
        <button onClick={() => keycloak.login()} className='h-20 w-20 bg-wit text-black'>
            Inloggen  <a href="https://www.flaticon.com/free-icons/login" title="login icons">Login icons created by Magnific - Flaticon</a>
        </button>
    );
}

export default AuthButtons;