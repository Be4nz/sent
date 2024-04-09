import React from 'react';

import { Box, List, Typography, useTheme } from '@mui/material';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import { CommentModel } from '../../model/CommentModel';
import CommentDisplay from './CommentDisplay';

interface Props {
	comments: CommentModel[];
}

const CommentListDisplay: React.FC<Props> = (props) => {
	const Theme = useTheme();

	if (props.comments.length === 0) {
		return (
			<Box style={{ textAlign: 'center', paddingTop: '5em' }}>
				<CancelScheduleSendIcon
					sx={{
						fontSize: { xs: '50px', lg: '70px' },
						color: Theme.palette.text.secondary,
					}}
				/>
				<Typography style={{ textAlign: 'center', color: Theme.palette.text.secondary }}>
					Be the first to comment.
				</Typography>
			</Box>
		);
	}

	return (
		<List>
			{props.comments.map((comment) => {
				return <CommentDisplay key={comment.id} comment={comment} my='2vh' />;
			})}
		</List>
	);
};

export default CommentListDisplay;
