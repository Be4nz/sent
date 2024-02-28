import { CircularProgress, Grid } from '@mui/material';
import ProfileDisplay from '../component/display/ProfileDisplay';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../type/AppRoute';
import { useEffect } from 'react';

const Home = () => {
	const User = useUserContext();
	const Navigate = useNavigate();

	useEffect(() => {
		if (!User.isLoading && User.isNewUser) Navigate(AppRoute.SIGNUP);
	}, [User.isLoading, User.isNewUser, Navigate])

	if (User.isLoading || User.isNewUser) return (<CircularProgress />);

	return (
		<Grid>
			<ProfileDisplay />
		</Grid>
	);
};

export default Home;
