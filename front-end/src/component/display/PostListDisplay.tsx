import React from 'react';
import { PostModel } from '../../model';
import PostDisplay from './PostDisplay';
import { List } from '@mui/material';

interface Props {
	posts: PostModel[];
}

const PostListDisplay: React.FC<Props> = (props) => {
	return (
		<List>
			{props.posts.map((post) => {
				return <PostDisplay key={post.id} post={post} my='2vh' />;
			})}
		</List>
	);
};

export default PostListDisplay;
