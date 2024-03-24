import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeContextProvider } from './context/ThemeContext';
import { UserContextProvider } from './context/UserContext';
import { PostContextProvider } from './context/PostContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<Auth0Provider
			domain={process.env.REACT_APP_AUTH0_DOMAIN ?? ''}
			clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? ''}
			authorizationParams={{
				audience: process.env.REACT_APP_AUTH0_AUDIENCE,
				redirect_uri: window.location.origin,
				scope: 'openid profile email',
			}}
			useRefreshTokens={true}
			cacheLocation='localstorage'
		>
			<ThemeContextProvider>
				<UserContextProvider>
					<PostContextProvider>
						<App />
					</PostContextProvider>
				</UserContextProvider>
			</ThemeContextProvider>
		</Auth0Provider>
	</React.StrictMode>
);
