import { Typography, Box, Avatar } from '@mui/material';
import { useUserContext } from '../../context/UserContext';

const Profile = () => {
	const User = useUserContext();

	return (
		<>
			{!User.isLoading && (
				<div>
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<Typography variant='h2'>Profile</Typography>
						<Avatar src={User.picture} alt='Profile' sx={{ width: 200, height: 200, my: 2 }} />
						<Typography>Id: {User.id}</Typography>
						<Typography>Auth0: {User.auth0_id}</Typography>
						<Typography>Username: {User.username}</Typography>
						<Typography>Name: {User.name}</Typography>
						<Typography>Email: {User.email}</Typography>
						<Typography>Role: {User.role}</Typography>
						<Typography>Created at: {User.created_at.toString()}</Typography>
						<Typography>Followers: {User.followers}</Typography>
						<Typography>Following: {User.following}</Typography>
						<Typography>IsNewUser: {User.isNewUser.toString()}</Typography>
						<Box sx={{ width: 300, height: 200, my: 2 }}>
							<Typography sx={{ overflow: 'auto', whiteSpace: 'pre' }}>Token: {User.token}</Typography>
						</Box>
					</Box>
				</div>
			)}
		</>
	);
};

export default Profile;
