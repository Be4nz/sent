import { useUserContext } from '../context/UserContext';
import { useEffect, useState } from 'react';
import { PostModel } from '../model';
import LoadingDisplay from '../component/display/LoadingDisplay';
import { Grid, Typography, useTheme } from '@mui/material';
import PostListDisplay from '../component/display/PostListDisplay';
import { get } from '../api/Api';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

interface Props {}

const Saved: React.FC<Props> = (props) => {
	const Theme = useTheme();
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

	if (posts.length === 0)
		return (
			<div style={{ paddingTop: '150px' }}>
				<BookmarksIcon className='page-icon' />
				<Typography className='profile-typography-name' style={{ fontWeight: 'bold' }}>
					Saved Page is Empty
				</Typography>
				<Typography style={{ color: Theme.palette.text.secondary }}>
					Looks like you haven't saved any posts yet.
					<br /> Start saving posts now!
				</Typography>
			</div>
		);

	return (
		<div style={{ width: '100%', paddingTop: '125px' }}>
			<Grid item minWidth='360px' maxWidth='752px' mx='auto'>
				<PostListDisplay posts={posts} />
			</Grid>
		</div>
	);
};

export default Saved;
