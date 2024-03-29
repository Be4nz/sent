import React from 'react';
import { PostModel } from '../../model';
import PostDisplay from './PostDisplay';
import { List, Typography } from '@mui/material';

interface Props {
	posts: PostModel[];
}

const PostListDisplay: React.FC<Props> = (props) => {
	if (props.posts.length === 0) {
		return <Typography textAlign={'center'}>No posts found</Typography>;
	}

	return (
		<List>
			{props.posts.map((post) => {
				return <PostDisplay key={post.id} post={post} my='2vh' />;
			})}
		</List>
	);
};

export default PostListDisplay;
