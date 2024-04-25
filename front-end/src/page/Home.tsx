import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../type/AppRoute';
import { useEffect, useRef, useState } from 'react';
import { PaginatedModel, PostModel } from '../model';
import LoadingDisplay from '../component/display/LoadingDisplay';
import { Grid, useTheme } from '@mui/material';
import PostForm from '../component/form/PostForm';
import { usePostContext } from '../context/PostContext';
import PostModal from '../component/display/PostModal';
import PostListDisplay from '../component/display/PostListDisplay';
import { get } from '../api/Api';
import { AxiosError } from 'axios';

interface Props {}

const Home: React.FC<Props> = (props) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [posts, setPosts] = useState<PostModel[]>([]);
	const [page, setPage] = useState<number>(1);
	const [disabled, setDisabled] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const feedContentRef = useRef<HTMLDivElement>(null);

	const User = useUserContext();
	const Posts = usePostContext();
	const Theme = useTheme();
	const Navigate = useNavigate();

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
	};

	const handlePageChange = () => {
		if (!isLoading && !disabled) {
			const scrollTop = feedContentRef.current?.scrollTop || 0;
			const clientHeight = feedContentRef.current?.clientHeight || 0;
			const scrollHeight = feedContentRef.current?.scrollHeight || 0;
			if (scrollTop + clientHeight === scrollHeight) {
				setPage((prevPage) => prevPage + 1);
			}
		}
	};

	useEffect(() => {
		if (Posts.statusUpdate) {
			setPosts((prevPosts) => [Posts.getPost(), ...prevPosts]);
		}
	}, [Posts]);

	useEffect(() => {
		const abortController = new AbortController();

		const fetchPosts = async () => {
			setIsLoading(true);
			try {
				const response = await get<PaginatedModel<PostModel>>(`/posts/${page}/10`, User.token);
				if (response.status === 200) {
					if (response.data.data.length === 0) setDisabled(true);

					if (page > 1) {
						setPosts((prevPosts) => [...prevPosts, ...response.data.data]);
					} else {
						setPosts(response.data.data);
					}
				}
			} catch (error) {
				if ((error as AxiosError).response?.status === 404) {
					setDisabled(true);
				} else {
					console.error(error);
				}
			}
			setIsLoading(false);
		};

		if (!User.isLoading && User.isNewUser) Navigate(AppRoute.SIGNUP);
		else fetchPosts();

		return () => abortController.abort();
	}, [User, Navigate, page]);

	if (User.isLoading || User.isNewUser) return <LoadingDisplay />;

	return (
		<div style={{ width: '100%', height: '100vh', overflow: 'auto' }} onScroll={handlePageChange} ref={feedContentRef}>
			<Grid item minWidth='360px' maxWidth='752px' mx='auto'>
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
					<PostForm disabled={true} />
				</Grid>

				<PostModal open={modalOpen} handleClose={handleModalClose} />

				<PostListDisplay posts={posts} />
			</Grid>
		</div>
	);
};

export default Home;
