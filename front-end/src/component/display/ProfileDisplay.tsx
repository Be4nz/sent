import { Typography, Avatar, Button, Grid, useTheme } from '@mui/material';
import { useUserContext } from '../../context/UserContext';
import { useEffect, useState } from 'react';

interface Props {
	minWidth: string;
	maxWidth: string;
	py: string;
}

const ProfileDisplay: React.FC<Props> = (props) => {
	const [isEditing, setIsEditing] = useState(false);

	const User = useUserContext();
	const Theme = useTheme();

	// TODO connect edit button to edit profile form
	const handleEditClick = () => {
		setIsEditing(!isEditing);
	};

	// TODO connect followers button to followers list
	const handleFollowersClick = () => {};

	// TODO connect following button to following list
	const handleFollowingClick = () => {};

	return (
		<Grid container direction='row' minWidth={props.minWidth} maxWidth={props.maxWidth} py={props.py}>
			<Grid item xs={3}>
				<Avatar className='profile-avatar' src={User.picture}></Avatar>
			</Grid>
			<Grid item xs={9}>
				<Grid container direction='column'>
					<Grid container direction='row'>
						<Grid item xs={8.4}>
							<Typography className='profile-typography-name'>{User.name}</Typography>
						</Grid>
						<Grid item xs={3.6} textAlign='right' my='auto'>
							<Button
								onClick={handleEditClick}
								sx={{
									border: `2px solid ${Theme.palette.text.secondary}`,
									backgroundColor: isEditing ? Theme.palette.text.secondary : 'none',
									':hover': {
										backgroundColor: Theme.palette.text.secondary,
									},
									'.MuiTouchRipple-child': {
										color: Theme.palette.secondary.main,
									},
								}}
							>
								<Typography color={Theme.palette.secondary.main}>Edit Profile</Typography>
							</Button>
						</Grid>
					</Grid>
					<Grid container direction='column' rowGap={1}>
						<Grid item>
							<Typography>@{User.username}</Typography>
						</Grid>
						<Grid item>
							<Typography>{User.description}</Typography>
						</Grid>
						<Grid container direction='row'>
							<Grid item xs={4}>
								<Button
									onClick={handleFollowersClick}
									disableRipple
									sx={{
										padding: '0px',
										'&:hover': {
											backgroundColor: Theme.palette.background.default,
										},
									}}
								>
									<Grid container direction='row' columnSpacing={1}>
										<Grid item>
											<Typography color={Theme.palette.text.primary} fontWeight={'bold'}>
												{User.followers}
											</Typography>
										</Grid>
										<Grid item>
											<Typography color={Theme.palette.text.secondary}>followers</Typography>
										</Grid>
									</Grid>
								</Button>
							</Grid>
							<Grid item xs={4}>
								<Button
									onClick={handleFollowingClick}
									disableRipple
									sx={{
										padding: '0px',
										'&:hover': {
											backgroundColor: Theme.palette.background.default,
										},
									}}
								>
									<Grid container direction='row' columnSpacing={1}>
										<Grid item>
											<Typography color={Theme.palette.text.primary} fontWeight={'bold'}>
												{User.following}
											</Typography>
										</Grid>
										<Grid item>
											<Typography color={Theme.palette.text.secondary}>following</Typography>
										</Grid>
									</Grid>
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);

	// return (
	// 	<>
	// 		{!User.isLoading && (
	// 			<div>
	// 				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
	// 					<Typography variant='h2'>Profile</Typography>
	// 					<Avatar src={User.picture} alt='Profile' sx={{ width: 200, height: 200, my: 2 }} />
	// 					<Typography>Id: {User.id}</Typography>
	// 					<Typography>Auth0: {User.auth0_id}</Typography>
	// 					<Typography>Username: {User.username}</Typography>
	// 					<Typography>Name: {User.name}</Typography>
	// 					<Typography>Email: {User.email}</Typography>
	// 					<Typography>Description: {User.description}</Typography>
	// 					<Typography>Role: {User.role}</Typography>
	// 					<Typography>Created at: {User.created_at.toString()}</Typography>
	// 					<Typography>Followers: {User.followers}</Typography>
	// 					<Typography>Following: {User.following}</Typography>
	// 					<Typography>IsNewUser: {User.isNewUser.toString()}</Typography>
	// 					<Box sx={{ width: 300, height: 200, my: 2 }}>
	// 						<Typography sx={{ overflow: 'auto', whiteSpace: 'pre' }}>Token: {User.token}</Typography>
	// 					</Box>
	// 					<Button
	// 						onClick={() => {
	// 							update();
	// 						}}
	// 					>
	// 						Change color mode
	// 					</Button>
	// 				</Box>
	// 			</div>
	// 		)}
	// 	</>
	// );
};

export default ProfileDisplay;
