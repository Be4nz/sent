import React from 'react';
import { PostModel } from '../../model';
import PostDisplay from './PostDisplay';
import { Box, List, Typography, useTheme } from '@mui/material';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';

interface Props {
	posts: PostModel[];
}

const PostListDisplay: React.FC<Props> = (props) => {
	const Theme = useTheme();

	if (props.posts.length === 0) {
		return (
			<Box style={{ textAlign: 'center', paddingTop: '5em' }}>
				<CancelScheduleSendIcon
					sx={{
						fontSize: { xs: '50px', lg: '70px' },
						color: Theme.palette.text.secondary,
					}}
				/>
				<Typography style={{ textAlign: 'center', color: Theme.palette.text.secondary }}>No posts sent yet</Typography>
			</Box>
		);
	}

	return (
		<List>
			{props.posts.map((post) => {
				return <PostDisplay key={post.id} postData={post} my='2vh' />;
			})}
		</List>
	);
};

export default PostListDisplay;
