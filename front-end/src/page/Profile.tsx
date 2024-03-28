import ProfileDisplay from '../component/display/ProfileDisplay';
import { PostModel, UserModel } from '../model';
import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { get } from '../api/Api';
import { useUserContext } from '../context/UserContext';
import LoadingDisplay from '../component/display/LoadingDisplay';
import { usePostContext } from '../context/PostContext';
import PostListDisplay from '../component/display/PostListDisplay';
import { useParams } from 'react-router-dom';

interface Props {}

const Profile: React.FC<Props> = (props) => {
	const { username } = useParams<'username'>();

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [profile, setProfile] = useState<UserModel>();
	const [posts, setPosts] = useState<PostModel[]>([]);

	const User = useUserContext();
	const Posts = usePostContext();

	useEffect(() => {
		if (Posts.statusUpdate) {
			setPosts((prevPosts) => [Posts.getPost(), ...prevPosts]);
		}
	}, [Posts]);

	useEffect(() => {
		const fetchProfile = async () => {
			setIsLoading(true);
			try {
				const response = await get<UserModel>(`/users/profile/username/${username}`, User.token);
				if (response.status === 200) {
					setProfile(response.data);
				}
			} catch (error) {
				console.log(error);
			}
			setIsLoading(false);
		};

		fetchProfile();
	}, [User, username]);

	useEffect(() => {
		const fetchPosts = async () => {
			setIsLoading(true);
			try {
				const response = await get<PostModel[]>(`/posts/?user_id=${profile?.id}`, User.token);
				if (response.status === 200) {
					setPosts(response.data);
				}
			} catch (error) {
				console.log(error);
			}
			setIsLoading(false);
		};

		fetchPosts();
	}, [User, profile]);

	//if (isLoading) return <LoadingDisplay />;

	return profile ? (
		<div style={{ width: '100%' }}>
			<Grid item minWidth='360px' maxWidth='752px' mx='auto'>
				<ProfileDisplay user={profile} my='4vh' />
				<PostListDisplay posts={posts} />
			</Grid>
		</div>
	) : (
		<Typography>This user does not exist</Typography>
	);
};

export default Profile;
