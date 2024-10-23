import { createContext, useState, Dispatch, SetStateAction } from "react";

interface Auth {
    username?: string;
    accessToken?: string;
}

interface AuthContextType {
    auth: Auth;
    setAuth: Dispatch<SetStateAction<Auth>>;
    persistentAuth: boolean;
    setPersistentAuth: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
    auth: { username: '', accessToken: '' },
    setAuth: () => {},
    persistentAuth: false,
    setPersistentAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<Auth>({ username: '', accessToken: '' });
    const [persistentAuth, setPersistentAuth] = useState<boolean>(JSON.parse(localStorage.getItem('persistentAuth') || 'false'));

    return (
        <AuthContext.Provider value={{ auth, setAuth, persistentAuth, setPersistentAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;