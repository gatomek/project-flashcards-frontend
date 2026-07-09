import {useKeycloak} from '@react-keycloak/web';
import {SquareButton} from '../SquareButton/SquareButton.tsx';

export function Login() {
    const {keycloak} = useKeycloak();

    return keycloak.authenticated ? (
        <div className="logout">
            <div>
                <SquareButton onClick={() => keycloak.logout()}>
                    {keycloak.tokenParsed?.preferred_username}
                    <br />
                    Logout
                </SquareButton>
            </div>
        </div>
    ) : (
        <div className="login">
            <SquareButton onClick={() => keycloak.login()}>Login</SquareButton>
        </div>
    );
}
