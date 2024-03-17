import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute } from './type/AppRoute';
import Home from './page/Home';
import Signup from './page/Signup';
import BaseLayout from './component/layout/BaseLayout';
import LoadingDisplay from './component/display/LoadingDisplay';

const App = () => {
	const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

	if (isLoading) {
		return <LoadingDisplay />;
	}

	if (!isAuthenticated) {
		loginWithRedirect();
		return <LoadingDisplay />;
	}

	return (
		<BrowserRouter>
			<BaseLayout>
				<Routes>
					<Route path={AppRoute.HOME} element={<Home />} />
					<Route path={AppRoute.SIGNUP} element={<Signup />} />
					<Route path='*' element={<Navigate to={AppRoute.HOME} replace />} />
				</Routes>
			</BaseLayout>
		</BrowserRouter>
	);
};

export default App;
