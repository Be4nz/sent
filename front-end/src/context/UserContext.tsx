import { useAuth0 } from '@auth0/auth0-react';
import { get } from '../api/Api';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import { UserModel } from '../model';

interface UserContextProps {
	id: string;
	auth0_id: string;
	username: string;
	name: string;
	email: string;
	description: string;
	role: string;
	picture: string;
	created_at: Date;
	followers: number;
	following: number;
	token: string;
	isNewUser: boolean;
	isLoading: boolean;
	update: () => Promise<void>;
}

const UserContext = createContext<UserContextProps>({
	id: '',
	auth0_id: '',
	username: '',
	name: '',
	email: '',
	description: '',
	role: '',
	picture: '',
	created_at: new Date(),
	followers: 0,
	following: 0,
	token: '',
	isNewUser: false,
	isLoading: true,
	update: async () => {},
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
	const [description, setDescription] = useState<string>('');
	const [role, setRole] = useState<string>('');
	const [picture, setPicture] = useState<string>('');
	const [created_at, setCreated_at] = useState<Date>(new Date());
	const [followers, setFollowers] = useState<number>(0);
	const [following, setFollowing] = useState<number>(0);
	const tokenRef = useRef<string>('');

	const [isNewUser, setIsNewUser] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [contextUpdate, setContextUpdate] = useState<boolean>(false);

	const update = async () => {
		setContextUpdate(!contextUpdate);
	};

	useEffect(() => {
		const getUserData = async () => {
			setIsLoading(true);

			const getAuth0 = async () => {
				try {
					const token = await getAccessTokenSilently();
					if (token) tokenRef.current = token;

					const claims = await getIdTokenClaims();
					if (claims) {
						auth0_idRef.current = claims.sub;
						setUsername(claims.nickname ?? '');
						setEmail(claims.email ?? '');
						setPicture(claims.picture ?? '');
					}
				} catch (error) {
					loginWithRedirect();
				}
			};

			await getAuth0();

			try {
				const response = await get<UserModel>(`/users/auth0_id/${auth0_idRef.current}`, tokenRef.current);
				if (response.status === 200) {
					const data = response.data;
					if (data.id) setId(data.id);
					if (data.username) setUsername(data.username);
					if (data.name) setName(data.name);
					if (data.email) setEmail(data.email);
					if (data.description) setDescription(data.description);
					else setDescription('');
					if (data.role) setRole(data.role);
					if (data.picture) setPicture(data.picture);
					if (data.created_at) setCreated_at(data.created_at);
					if (data.followers) setFollowers(data.followers);
					if (data.following) setFollowing(data.following);
				}

				setIsNewUser(false);
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

		if (isAuthenticated) getUserData();
	}, [getAccessTokenSilently, getIdTokenClaims, isAuthenticated, loginWithRedirect, user, contextUpdate]);

	const UserContextValue: UserContextProps = {
		id,
		auth0_id: auth0_idRef.current,
		username,
		name,
		email,
		description,
		role,
		picture,
		created_at,
		followers,
		following,
		token: tokenRef.current,
		isNewUser,
		isLoading,
		update,
	};

	return <UserContext.Provider value={UserContextValue}>{children}</UserContext.Provider>;
};
