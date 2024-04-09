import { Avatar, Grid, Link, ListItem, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { get } from '../../api/Api';
import { useUserContext } from '../../context/UserContext';
import { timeSince } from '../../function/TimeSince';
import PostSkeletonDisplay from './PostSkeletonDisplay';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../type/AppRoute';
import { convertToLocalTime } from '../../function/ConvertToLocalTime';
import { CommentModel } from '../../model/CommentModel';
import { UserModel } from '../../model';

const CommentDisplay: React.FC<{
	comment: CommentModel;
	minWidth?: string;
	maxWidth?: string;
	my?: string;
	mx?: string;
}> = ({ comment, minWidth, maxWidth, my, mx }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [creator, setCreator] = useState<UserModel>();

	const Theme = useTheme();
	const User = useUserContext();
	const navigate = useNavigate();

	const handleProfileClick = () => {
		navigate(`${AppRoute.PROFILE}/${creator?.username}`);
	};

	const getCreatorData = async () => {
		setIsLoading(true);
		try {
			const response = await get<UserModel>(`/users/profile/${comment.user_id}`, User.token);
			setCreator(response.data);
		} catch (error) {
			console.error(error);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		getCreatorData();
	}, [User.token, comment.user_id]);

	if (isLoading) return <PostSkeletonDisplay minWidth={minWidth} maxWidth={maxWidth} my={my} mx={mx} />;

	return (
		<ListItem divider>
			<Grid container direction='row' minWidth={minWidth} maxWidth={maxWidth} my={my} mx={mx} width={'100%'}>
				<Grid item xs={1.5}>
					<Avatar
						onClick={handleProfileClick}
						src={creator?.picture}
						sx={{
							transition: 'filter 0.3s',
							':hover': {
								filter: 'brightness(70%)',
								cursor: 'pointer',
							},
						}}
					/>
				</Grid>
				<Grid item xs={10.5}>
					<Grid container direction='column'>
						<Grid container direction='row'>
							<Grid item xs={7}>
								<Typography fontWeight='bold'>
									<Link
										color='none'
										underline='hover'
										onClick={handleProfileClick}
										sx={{
											':hover': {
												cursor: 'pointer',
											},
										}}
									>
										@{creator?.username}
									</Link>
								</Typography>
							</Grid>
							<Grid item xs={5}>
								<Typography textAlign='right' color={Theme.palette.text.secondary}>
									{timeSince(convertToLocalTime(comment.created_at))}
								</Typography>
							</Grid>
						</Grid>
						<Grid item>
							<Typography sx={{ wordBreak: 'break-word' }}>{comment.content}</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</ListItem>
	);
};

export default CommentDisplay;
