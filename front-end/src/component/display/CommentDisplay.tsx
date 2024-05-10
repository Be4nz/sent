import { Avatar, Grid, IconButton, Link, ListItem, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { del, get, post } from '../../api/Api';
import { useUserContext } from '../../context/UserContext';
import { timeSince } from '../../function/TimeSince';
import PostSkeletonDisplay from './PostSkeletonDisplay';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../type/AppRoute';
import { convertToLocalTime } from '../../function/ConvertToLocalTime';
import { CommentModel } from '../../model/CommentModel';
import { UserModel } from '../../model';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { countToDisplay } from '../../function/CountToDisplay';
import { CommentLikeModel } from '../../../../back-end/src/models/commentLikeModel';

const CommentDisplay: React.FC<{
	comment: CommentModel;
	minWidth?: string;
	maxWidth?: string;
	my?: string;
	mx?: string;
}> = ({ comment, minWidth, maxWidth, my, mx }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [creator, setCreator] = useState<UserModel>();
	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState<number>(0);
	const [displayedComment, setDisplayedComment] = useState<CommentModel>(comment);

	const Theme = useTheme();
	const User = useUserContext();
	const navigate = useNavigate();

	const handleProfileClick = () => {
		navigate(`${AppRoute.PROFILE}/${creator?.username}`);
	};

	const updateComment = async () => {
		setIsLoading(true);
		getLikeCount();
		fetchComment();
		setIsLoading(false);
	};

	const fetchComment = async () => {
		try {
			const response = await get<CommentModel>('/comments/' + displayedComment.id, User.token);
			if (response.status === 200) {
				setDisplayedComment(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleLikeClick = async () => {
		const newLike: CommentLikeModel = {
			comment_id: displayedComment.id.toString(),
			user_id: User.id,
		};

		try {
			let response;

			if (isLiked) {
				response = await del<CommentLikeModel>(
					`/commentlikes/?user_id=${User.id}&comment_id=${displayedComment.id}`,
					User.token
				);
			} else {
				response = await post<CommentLikeModel>('/commentlikes', newLike, User.token);
			}

			if (response.status === 200 || response.status === 201) {
				setIsLiked(!isLiked);

				updateComment();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getCreatorData = async () => {
		setIsLoading(true);
		try {
			const response = await get<UserModel>(`/users/profile/${displayedComment.user_id}`, User.token);
			setCreator(response.data);
		} catch (error) {
			console.error(error);
		}
		setIsLoading(false);
	};

	const getLikeStatus = async () => {
		try {
			const response = await get<CommentLikeModel>(
				`/commentlikes/?user_id=${User.id}&comment_id=${displayedComment.id}`,
				User.token
			);

			if (response) {
				setIsLiked(true);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getLikeCount = async () => {
		try {
			const response = await get(`/commentlikes/count/?comment_id=${displayedComment.id}`, User.token);

			if (response) {
				const data = response.data as { 'count(`user_id`)': number }[];
				const count = data[0]['count(`user_id`)'];
				setLikeCount(count);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getLikeCount();
		getCreatorData();
		getLikeStatus();
	}, [User.token, displayedComment.user_id]);

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
									{timeSince(convertToLocalTime(displayedComment.created_at))}
								</Typography>
							</Grid>
						</Grid>
						<Grid item>
							<Typography sx={{ wordBreak: 'break-word', marginTop: '6px' }}>{displayedComment.content}</Typography>
						</Grid>
						<Grid container direction='row'>
							<Grid item xs={2.5}>
								<Grid container direction='row' style={{ marginLeft: '-10px', marginTop: '8px' }}>
									<Grid item>
										<IconButton onClick={handleLikeClick}>
											{!isLiked && <FavoriteBorderIcon sx={{ color: Theme.palette.text.secondary }} />}
											{isLiked && <FavoriteIcon sx={{ color: Theme.palette.primary.main }} />}
										</IconButton>
									</Grid>
									<Grid item sx={{ my: 'auto' }}>
										<Typography color={Theme.palette.text.secondary}>{countToDisplay(likeCount)}</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</ListItem>
	);
};

export default CommentDisplay;
