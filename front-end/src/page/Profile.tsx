import ProfileDisplay from '../component/display/ProfileDisplay';
import { PostModel } from '../model';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { get } from '../api/Api';
import { useUserContext } from '../context/UserContext';
import LoadingDisplay from '../component/display/LoadingDisplay';
import { usePostContext } from '../context/PostContext';
import PostListDisplay from '../component/display/PostListDisplay';

interface Props {}

const Profile: React.FC<Props> = (props) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [posts, setPosts] = useState<PostModel[]>([]);

	const User = useUserContext();
	const Posts = usePostContext();

	useEffect(() => {
		if (Posts.statusUpdate) {
			setPosts((prevPosts) => [Posts.getPost(), ...prevPosts]);
		}
	}, [Posts]);

	useEffect(() => {
		const fetchPosts = async () => {
			setIsLoading(true);
			try {
				console.log(User.id);
				const response = await get<PostModel[]>(`/posts/?user_id=${User.id}`, User.token);
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
				<ProfileDisplay my='4vh' />
				<PostListDisplay posts={posts} />
			</Grid>
		</div>
	);
};

export default Profile;
