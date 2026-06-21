import {useKeycloak} from "@react-keycloak/web";
import styles from './Login.module.css';

export function Login() {
    const {keycloak} = useKeycloak();

    return (
        keycloak.authenticated ?
            <div className="logout">
                <div>

                    <button className={styles.button} onClick={() => keycloak.logout()}>
                        {keycloak.tokenParsed?.preferred_username}<br/>
                        Logout
                    </button>
                </div>
            </div>
            :
            <div className="login">
                <button className={styles.button} onClick={() => keycloak.login()}>Login</button>
            </div>
    );
}