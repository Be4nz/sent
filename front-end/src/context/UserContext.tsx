import { useAuth0 } from '@auth0/auth0-react';
import { get } from '../api/Api';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import { User } from '../../../back-end/src/models';

interface UserContextProps {
	id: string;
	auth0_id: string;
	username: string;
	name: string;
	email: string;
	role: string;
	picture: string;
	created_at: Date;
	followers: number;
	following: number;
	token: string;
	isNewUser: boolean;
	isLoading: boolean;
}

const UserContext = createContext<UserContextProps>({
	id: '',
	auth0_id: '',
	username: '',
	name: '',
	email: '',
	role: '',
	picture: '',
	created_at: new Date(),
	followers: 0,
	following: 0,
	token: '',
	isNewUser: false,
	isLoading: true,
});

export const useUserContext = () => useContext(UserContext);

interface Props {
	children?: React.ReactNode;
}

export const UserContextProvider: React.FC<Props> = ({ children }) => {
	const { user, isAuthenticated, getIdTokenClaims, getAccessTokenSilently, loginWithRedirect } = useAuth0();

	const [id, setId] = useState<string>('');
	const auth0_idRef = useRef<string>('');
	const [username, setUsername] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [role, setRole] = useState<string>('');
	const [picture, setPicture] = useState<string>('');
	const [created_at, setCreated_at] = useState<Date>(new Date());
	const [followers, setFollowers] = useState<number>(0);
	const [following, setFollowing] = useState<number>(0);
	const tokenRef = useRef<string>('');
	const [isNewUser, setIsNewUser] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const getClaims = async () => {
			try {
				const claims = await getIdTokenClaims();
				if (claims) {
					auth0_idRef.current = claims.sub;
					setUsername(claims.nickname ?? '');
					setEmail(claims.email ?? '');
				}
			} catch (error) {
				loginWithRedirect();
			}
		};

		const getToken = async () => {
			try {
				const token = await getAccessTokenSilently();
				if (token) tokenRef.current = token;
			} catch (error) {
				loginWithRedirect();
			}
		};

		const getUserData = async () => {
			setIsLoading(true);
			await getClaims();
			await getToken();

			try {
				const response = await get<User>(`/users/auth0/${auth0_idRef.current}`, tokenRef.current);
				if (response.id) setId(response.id);
				if (response.username) setUsername(response.username);
				if (response.name) setName(response.name);
				if (response.email) setEmail(response.email);
				if (response.role) setRole(response.role);
				if (response.picture) setPicture(response.picture);
				if (response.created_at) setCreated_at(response.created_at);
				if (response.followers) setFollowers(response.followers);
				if (response.following) setFollowing(response.following);
				setIsLoading(false);
			} catch (error) {
				if (error instanceof AxiosError) {
					if (error.response?.status === 404) {
						setIsNewUser(true);
					}
				} else {
					console.log(error);
				}
				setIsLoading(false);
			}
		};

		if (isAuthenticated) {
			getUserData();
		}
	}, [getAccessTokenSilently, getIdTokenClaims, isAuthenticated, loginWithRedirect, user]);

	const UserContextValue: UserContextProps = {
		id,
		auth0_id: auth0_idRef.current,
		username,
		name,
		email,
		role,
		picture,
		created_at,
		followers,
		following,
		token: tokenRef.current,
		isNewUser,
		isLoading,
	};

	return <UserContext.Provider value={UserContextValue}>{children}</UserContext.Provider>;
};
