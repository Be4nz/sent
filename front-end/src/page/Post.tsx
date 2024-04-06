import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PostModel } from '../model';
import { get } from '../api/Api';
import { useUserContext } from '../context/UserContext';
import PostDisplay from '../component/display/PostDisplay';
import styled from '@emotion/styled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, Hidden, IconButton, useTheme } from '@mui/material';
import { AppRoute } from '../type/AppRoute';
import LoadingDisplay from '../component/display/LoadingDisplay';
import CommentForm from '../component/form/CommentForm';
import CommentModal from '../component/display/CommentModal';
import CommentListDisplay from '../component/display/CommentListDisplay';
import { CommentModel } from '../model/CommentModel';

const BackButton = styled(IconButton)`
	background: none;
	border: none;
	color: white;
	font-size: 40px;
	display: flex;
	align-items: center;
	:hover {
		cursor: pointer;
	}
	margin-right: 20px;
`;

const Title = styled('div')`
	font-size: 35px;
	:hover {
		cursor: default;
	}
`;

const TitleBar = styled('div')`
	display: flex;
	flex-direction: row;
	align-content: center;
`;

const ContentContainer = styled('div')`
	margin-top: 20px;
`;

const Container = styled('div')`
	width: 100%;
	min-width: 360px;
	max-width: 752px;
`;

interface Props {}

export const Post: React.FC<Props> = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [post, setPost] = useState<PostModel>();
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [comments, setComments] = useState<CommentModel[]>([]);
	const { id } = useParams();

	const User = useUserContext();
	const navigate = useNavigate();
	const Theme = useTheme();

	const handleBacking = () => {
		navigate(AppRoute.HOME);
	};

	const fetchPost = async () => {
		try {
			const response = await get<PostModel>('/posts/' + id, User.token);
			if (response.status === 200) {
				setPost(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchComments = async () => {
		try {
			const response = await get<CommentModel[]>('/comments/', User.token);
			if (response.status === 200) {
				setComments(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchPost();
		fetchComments();
		setIsLoading(false);
	}, [User]);

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleModalClose = () => {
		fetchComments();
		setModalOpen(false);
	};

	return isLoading ? (
		<LoadingDisplay />
	) : post ? (
		<div style={{ width: '100%' }}>
			<Grid item minWidth='360px' maxWidth='752px' mx='auto'>
				<Container>
					<Hidden lgDown>
						<TitleBar>
							<BackButton onClick={handleBacking}>
								<ArrowBackIcon />
							</BackButton>
							<Title>Post</Title>
						</TitleBar>
					</Hidden>
					<ContentContainer>
						<PostDisplay post={post} />
					</ContentContainer>
					<Grid
						onClick={handleModalOpen}
						my='4vh'
						sx={{
							borderRadius: '15px',
							':hover': {
								cursor: 'pointer',
								backgroundColor: Theme.palette.background.paper,
							},
						}}
					>
						<CommentForm disabled={true} />
					</Grid>

					<CommentModal open={modalOpen} handleClose={handleModalClose} postId={id} />
				</Container>
				<CommentListDisplay comments={comments} />
			</Grid>
		</div>
	) : (
		<>This post does not exist</>
	);
};