import styles from './App.module.css';
import {AppBar} from './components/AppBar/AppBar.tsx';
import {ReactKeycloakProvider} from '@react-keycloak/web';
import keycloak from './keycloak.ts';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {DeckProvider} from './components/DeckProvider/DeckProvider.tsx';

const queryClient = new QueryClient();

function App() {
    return (
        <ReactKeycloakProvider
            authClient={keycloak}
            initOptions={{
                onLoad: 'login-required',
                checkLoginIframe: false
            }}
            LoadingComponent={<></>}
        >
            <QueryClientProvider client={queryClient}>
                <div className={styles.root}>
                    <div className={styles.container}>
                        <div className={styles.top}>
                            <AppBar />
                        </div>
                        <div className={styles.mid}>
                            <DeckProvider />
                        </div>
                    </div>
                </div>
            </QueryClientProvider>
        </ReactKeycloakProvider>
    );
}

export default App;
