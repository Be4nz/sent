import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../type/AppRoute';
import SignupForm from '../component/form/SignupForm';
import { useEffect, useState } from 'react';
import LoadingDisplay from '../component/display/LoadingDisplay';

const Signup = () => {
	const User = useUserContext();
	const Navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate loading time for visuals
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		if (!User.isLoading && !User.isNewUser) Navigate(AppRoute.HOME);

		return () => clearTimeout(timer);
	}, [User.isLoading, User.isNewUser, Navigate]);

	if (isLoading || User.isLoading || !User.isNewUser) return <LoadingDisplay />;

	return <SignupForm />;
};

export default Signup;
