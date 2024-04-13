import { useUserContext } from '../context/UserContext';
import { useEffect, useState } from 'react';
import { PostModel } from '../model';
import LoadingDisplay from '../component/display/LoadingDisplay';
import { Grid } from '@mui/material';
import PostListDisplay from '../component/display/PostListDisplay';
import { get } from '../api/Api';

interface Props {}

const Saved: React.FC<Props> = (props) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [posts, setPosts] = useState<PostModel[]>([]);

	const User = useUserContext();

	useEffect(() => {
		const fetchPosts = async () => {
			setIsLoading(true);
			try {
				const response = await get<PostModel[]>('/posts/saved/', User.token);
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

	return (
		<div style={{ width: '100%' }}>
			<Grid item minWidth='360px' maxWidth='752px' mx='auto'>
				<PostListDisplay posts={posts} />
			</Grid>
		</div>
	);
};

export default Saved;
