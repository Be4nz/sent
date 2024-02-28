import { Grid } from '@mui/material';
import ProfileDisplay from '../component/display/ProfileDisplay';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../type/AppRoute';

const Home = () => {
	const User = useUserContext();
	const Navigate = useNavigate();

	if (User.isNewUser) Navigate(AppRoute.SIGNUP);

	return (
		<Grid>
			<ProfileDisplay />
		</Grid>
	);
};

export default Home;
