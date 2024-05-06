import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Avatar, Grid, IconButton, Link, ListItem, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { get, post, del } from '../../api/Api';
import { useUserContext } from '../../context/UserContext';
import { timeSince } from '../../function/TimeSince';
import { countToDisplay } from '../../function/CountToDisplay';
import { LikeModel, PostModel, UserModel } from '../../model';
import PostSkeletonDisplay from './PostSkeletonDisplay';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../type/AppRoute';
import { convertToLocalTime } from '../../function/ConvertToLocalTime';
import { SaveModel } from '../../model/SaveModel';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { reverse } from 'dns';

const PostDisplay: React.FC<{
	postData: PostModel;
	minWidth?: string;
	maxWidth?: string;
	my?: string;
	mx?: string;
}> = ({ postData, minWidth, maxWidth, my, mx }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isLiked, setIsLiked] = useState(false);
	const [isCommentSelected, setIsCommentSelected] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const [creator, setCreator] = useState<UserModel>();
	const [displayedPost, setDisplayedPost] = useState<PostModel>(postData);

	const Theme = useTheme();
	const User = useUserContext();
	const navigate = useNavigate();

	// Regular expression pattern to match '/post/:id'
	const postPattern = /^\/post\/\d+$/;

	const updatePost = async () => {
		setIsLoading(true);
		fetchPost();
		setIsLoading(false);
	};

	const fetchPost = async () => {
		try {
			const response = await get<PostModel>('/posts/' + postData.id, User.token);
			if (response.status === 200) {
				setDisplayedPost(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	//TODO connect liking to database
	const handleLikeClick = async () => {
		const newLike: LikeModel = {
			post_id: postData.id,
			user_id: User.id,
		};

		try {
			let response;
			if (isLiked) {
				response = await del<LikeModel>(`/likes/?user_id=${User.id}&post_id=${postData.id}`, User.token);
			} else {
				response = await post<LikeModel>('/likes', newLike, User.token);
			}

			if (response.status === 201 || response.status === 200) {
				setIsLiked(!isLiked);
			}
		} catch (error) {
			console.error(error);
		}

		updatePost();
	};

	//TODO implement comment section
	const handleCommentClick = () => {
		// Check if the current URL does not match the pattern "/post/:id"
		if (!postPattern.test(window.location.pathname)) {
			setIsCommentSelected(!isCommentSelected);

			navigate('/post/' + postData.id);
		}
	};

	const handleDeleteClick = async () => {
		try {
			let response = await del<PostModel>(`/posts/` + postData.id, User.token);

			if (response.status === 201 || response.status === 200) {
				navigate(AppRoute.HOME);
			}
		} catch (error) {
			console.error(error);
		}
	};

	//TODO connect saving to database
	const handleSaveClick = async () => {
		const newSave: SaveModel = {
			user_id: User.id,
			post_id: postData.id,
		};

		try {
			let response;
			if (isSaved) {
				response = await del<SaveModel>(`/saves/?user_id=${User.id}&post_id=${postData.id}`, User.token);
			} else {
				response = await post<SaveModel>('/saves', newSave, User.token);
			}

			if (response.status === 201 || response.status === 200) {
				setIsSaved(!isSaved);
			}
		} catch (error) {
			console.error(error);
		}

		updatePost();
	};

	const handleProfileClick = () => {
		navigate(`${AppRoute.PROFILE}/${creator?.username}`);
	};

	//TODO recieve like status from database if current user is already liked
	const getLikeStatus = async () => {
		try {
			const response = await get<LikeModel>(`/likes/?user_id=${User.id}&post_id=${postData.id}`, User.token);

			if (response) {
				setIsLiked(true);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getSaveStatus = async () => {
		try {
			const response = await get<SaveModel>(`/saves/?user_id=${User.id}&post_id=${postData.id}`, User.token);
			if (response) {
				setIsSaved(true);
			}
		} catch (error) {
			// Do nothing, because it usually just means the user hasn't saved the post
		}
	};

	const getCreatorData = async () => {
		setIsLoading(true);
		try {
			const response = await get<UserModel>(`/users/profile/${postData.user_id}`, User.token);
			setCreator(response.data);
		} catch (error) {
			console.error(error);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		if (postPattern.test(window.location.pathname)) {
			setIsCommentSelected(true);
		}
		getLikeStatus();
		getSaveStatus();
		getCreatorData();
	}, [User.token, postData.user_id]);

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
									{timeSince(convertToLocalTime(displayedPost.created_at))}
								</Typography>
							</Grid>
						</Grid>
						<Grid item>
							<Typography sx={{ wordBreak: 'break-word' }}>{displayedPost.content}</Typography>
						</Grid>
						<Grid container direction='row'>
							<Grid item xs={2.5}>
								<Grid container direction='row'>
									<Grid item>
										<IconButton onClick={handleLikeClick}>
											{!isLiked && <FavoriteBorderIcon sx={{ color: Theme.palette.text.secondary }} />}
											{isLiked && <FavoriteIcon sx={{ color: Theme.palette.primary.main }} />}
										</IconButton>
									</Grid>
									<Grid item sx={{ my: 'auto' }}>
										<Typography color={Theme.palette.text.secondary}>
											{countToDisplay(displayedPost.like_count)}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={2.5}>
								<Grid container direction='row'>
									<Grid item>
										<IconButton onClick={handleCommentClick}>
											{!isCommentSelected && <ModeCommentOutlinedIcon sx={{ color: Theme.palette.text.secondary }} />}
											{isCommentSelected && <ModeCommentIcon sx={{ color: Theme.palette.primary.main }} />}
										</IconButton>
									</Grid>
									<Grid item sx={{ my: 'auto' }}>
										<Typography color={Theme.palette.text.secondary}>
											{countToDisplay(displayedPost.comment_count)}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={2.5}>
								<Grid container direction='row'>
									<Grid item>
										<IconButton onClick={handleSaveClick}>
											{!isSaved && <BookmarkBorderIcon sx={{ color: Theme.palette.text.secondary }} />}
											{isSaved && <BookmarkIcon sx={{ color: Theme.palette.primary.main }} />}
										</IconButton>
									</Grid>
									<Grid item sx={{ my: 'auto' }}>
										<Typography color={Theme.palette.text.secondary}>
											{countToDisplay(displayedPost.save_count)}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							{postPattern.test(window.location.pathname) && (
								<Grid container item xs={4} justifyContent='flex-end'>
									<IconButton onClick={handleDeleteClick}>
										<DeleteOutlineIcon sx={{ color: Theme.palette.text.secondary }} />
									</IconButton>
								</Grid>
							)}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</ListItem>
	);
};

export default PostDisplay;
