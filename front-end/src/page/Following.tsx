import { useUserContext } from '../context/UserContext';
import { useEffect, useState } from 'react';
import { PostModel } from '../model';
import LoadingDisplay from '../component/display/LoadingDisplay';
import { Grid, Typography, useTheme } from '@mui/material';
import PostListDisplay from '../component/display/PostListDisplay';
import { get } from '../api/Api';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

interface Props {}

const Home: React.FC<Props> = (props) => {
	const Theme = useTheme();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [posts, setPosts] = useState<PostModel[]>([]);

	const User = useUserContext();

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
	}, [User]);

	if (isLoading) return <LoadingDisplay />;

	if (posts.length === 0)
		return (
			<div style={{ paddingTop: '5%' }}>
				<HeartBrokenIcon className='page-icon' />
				<Typography className='profile-typography-name' style={{ fontWeight: 'bold' }}>
					Following Feed is Empty
				</Typography>
				<Typography style={{ color: Theme.palette.text.secondary }}>
					There are no new posts from users you follow.
					<br /> Discover new posts by following more users!
				</Typography>
			</div>
		);

	return (
		<div style={{ width: '100%' }}>
			<Grid item minWidth='360px' maxWidth='752px' mx='auto'>
				<PostListDisplay posts={posts} />
			</Grid>
		</div>
	);
};

export default Home;
