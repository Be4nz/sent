import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import { AppRoute } from './type/AppRoute';
import Home from './page/Home';
import { CircularProgress } from '@mui/material';
import Signup from './page/Signup';
import { ThemeContextProvider } from './context/ThemeContext';
import BaseLayout from './component/layout/BaseLayout';

const App = () => {
	const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

	if (isLoading) {
		return <CircularProgress />;
	}

	if (!isAuthenticated) {
		loginWithRedirect();
		return <CircularProgress />;
	}

	return (
		<ThemeContextProvider>
			<UserContextProvider>
				<BrowserRouter>
					<BaseLayout>
						<Routes>
							<Route path={AppRoute.HOME} element={<Home />} />
							<Route path={AppRoute.SIGNUP} element={<Signup />} />
						</Routes>
					</BaseLayout>
				</BrowserRouter>
			</UserContextProvider>
		</ThemeContextProvider>
	);
};

export default App;
