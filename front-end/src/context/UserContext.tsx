import { useAuth0 } from '@auth0/auth0-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserContextProps {
    id: string;
    username: string;
    name: string;
    email: string;
    picture: string;
    role: string;
    token: string;
};

const UserContext = createContext<UserContextProps>({
    id: '',
    username: '',
    name: '',
    email: '',
    picture: '',
    role: '',
    token: '',
});

export const useUserContext = () => useContext(UserContext);

interface Props {
    children?: React.ReactNode;
}

export const UserContextProvider: React.FC<Props> = ({children}) => {
    const { user, isAuthenticated, getIdTokenClaims, getAccessTokenSilently, loginWithRedirect } = useAuth0();

    const [id, setId] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [picture, setPicture] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        const getClaims = async () => {
            try {
                const claims = await getIdTokenClaims();
                if (claims) {
                    setId(claims.sub);
                    setUsername(claims.nickname ?? '');
                    setName(claims.name ?? '');
                    setEmail(claims.email ?? '');
                    setPicture(claims.picture ?? '');
                    setRole(claims.role ?? '');
                }
            } catch (error) {
                loginWithRedirect();
            }
        };

        const getToken = async () => {
            try {
                const token = await getAccessTokenSilently();
                if (token) setToken(token);
            } catch (error) {
                loginWithRedirect();
            }
        };

        if (isAuthenticated) {
            getClaims();
            getToken();
        }
    }, [isAuthenticated, user])

    const UserContextValue: UserContextProps = {
        id,
        username,
        name,
        email,
        picture,
        role,
        token,
    };
    
    return (
        <UserContext.Provider value={UserContextValue}>
            {children}
        </UserContext.Provider>
    );
}