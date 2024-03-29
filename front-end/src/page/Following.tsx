import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PostModel } from '../model';
import LoadingDisplay from '../component/display/LoadingDisplay';
import { Grid, useTheme } from '@mui/material';
import PostForm from '../component/form/PostForm';
import { usePostContext } from '../context/PostContext';
import PostModal from '../component/display/PostModal';
import PostListDisplay from '../component/display/PostListDisplay';
import { get } from '../api/Api';

interface Props {}

const Home: React.FC<Props> = (props) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [posts, setPosts] = useState<PostModel[]>([]);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

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

	useEffect(() => {
		const fetchPosts = async () => {
			setIsLoading(true);
			try {
				const response = await get<PostModel[]>('/posts/following/', User.token);
				if (response.status === 200) {
					setPosts(response.data);
				}
			} catch (error) {
				console.log(error);
			}
			setIsLoading(false);
		};

		fetchPosts();
	}, [User, Navigate]);

	if (isLoading || User.isLoading || User.isNewUser) return <LoadingDisplay />;

	return (
		<div style={{ width: '100%' }}>
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
