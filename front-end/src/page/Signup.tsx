import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../type/AppRoute';
import SignupForm from '../component/form/SignupForm';
import { useEffect } from 'react';
import LoadingDisplay from '../component/display/LoadingDisplay';

const Signup = () => {
	const User = useUserContext();
	const Navigate = useNavigate();

	useEffect(() => {
		if (!User.isLoading && !User.isNewUser) Navigate(AppRoute.HOME);
	}, [User.isLoading, User.isNewUser, Navigate]);

	if (User.isLoading || !User.isNewUser) return <LoadingDisplay />;

	return <SignupForm />;
};

export default Signup;
