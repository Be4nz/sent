import { Grid, Typography } from '@mui/material';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../type/AppRoute';
import SignupForm from '../component/form/SignupForm';

const Signup = () => {
	const User = useUserContext();
	const Navigate = useNavigate();

	if (!User.isNewUser) Navigate(AppRoute.HOME);

	return (
		<Grid>
			<SignupForm />
		</Grid>
	);
};

export default Signup;
