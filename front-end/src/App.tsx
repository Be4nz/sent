import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute } from './type/AppRoute';
import Home from './page/Home';
import Signup from './page/Signup';
import BaseLayout from './component/layout/BaseLayout';
import LoadingDisplay from './component/display/LoadingDisplay';
import { useEffect, useState } from 'react';

const App = () => {
	const { isAuthenticated, loginWithRedirect } = useAuth0();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			// Simulate loading time for visuals
			setIsLoading(false);
		}, 2500);

		return () => clearTimeout(timer);
	}, []);

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
