import { Typography, Avatar, Button, Grid, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { UserModel, FollowModelDTO } from '../../model';
import { countToDisplay } from '../../function/CountToDisplay';
import { useUserContext } from '../../context/UserContext';
import { del, get, post } from '../../api/Api';
import ProfileSkeletonDisplay from './ProfileSkeletonDisplay';

interface Props {
	user: UserModel;
	minWidth?: string;
	maxWidth?: string;
	my?: string;
	mx?: string;
}

const ProfileDisplay: React.FC<Props> = (props) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isProfile, setIsProfile] = useState(true);
	const [isFollowing, setIsFollowing] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const Theme = useTheme();
	const User = useUserContext();

	// TODO connect edit button to edit profile form
	const handleEditClick = () => {
		setIsEditing(!isEditing);
	};

	// TODO connect followers button to followers list
	const handleFollowersClick = () => {};

	// TODO connect following button to following list
	const handleFollowingClick = () => {};

	const handleFollowClick = async () => {
		try {
			let response;
			if (isFollowing) {
				response = await del<FollowModelDTO>(`/follows/?user_id=${props.user.id}&follower_id=${User.id}`, User.token);
				props.user.followers -= 1;
			} else {
				response = await post<FollowModelDTO>('/follows', { user_id: props.user.id, follower_id: User.id }, User.token);
				props.user.followers += 1;
			}

			if (response.status === 201 || response.status === 200) {
				setIsFollowing(!isFollowing);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const fetchFollowing = async () => {
			setIsLoading(true);
			if (User.id !== props.user.id) {
				setIsProfile(false);
				try {
					const response = await get(`/follows?user_id=${props.user.id}&follower_id=${User.id}`, User.token);
					if (response.status === 200) setIsFollowing(true);
				} catch (error) {
					console.error(error);
				}
			}
			setIsLoading(false);
		};

		fetchFollowing();
	}, [User.id, props.user.id, User.token]);

	if (isLoading) return <ProfileSkeletonDisplay my='4vh' />;

	return (
		<Grid container direction='row' minWidth={props.minWidth} maxWidth={props.maxWidth} my={props.my} mx={props.mx}>
			<Grid item xs={3}>
				<Avatar className='profile-avatar' src={props.user.picture}></Avatar>
			</Grid>
			<Grid item xs={9}>
				<Grid container direction='column'>
					<Grid container direction='row'>
						<Grid item xs={8.4}>
							<Typography className='profile-typography-name'>{props.user.name}</Typography>
						</Grid>
						<Grid item xs={3.6} textAlign='right' my='auto'>
							{isProfile ? (
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
							) : (
								<Button
									onClick={handleFollowClick}
									sx={{
										backgroundColor: isFollowing ? Theme.palette.text.secondary : Theme.palette.primary.main,
										':hover': {
											backgroundColor: Theme.palette.primary.light,
										},
										'.MuiTouchRipple-child': {
											color: Theme.palette.primary.main,
										},
									}}
								>
									<Typography sx={{ px: '0.8vw' }} color='white'>
										{isFollowing ? 'Following' : 'Follow'}
									</Typography>
								</Button>
							)}
						</Grid>
					</Grid>
					<Grid container direction='column' rowGap={1}>
						<Grid item>
							<Typography>@{props.user.username}</Typography>
						</Grid>
						<Grid item>
							<Typography sx={{ wordBreak: 'break-word' }}>{props.user.description}</Typography>
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
												{countToDisplay(props.user.followers)}
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
												{countToDisplay(props.user.following)}
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
};

export default ProfileDisplay;
