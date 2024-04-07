import { Grid, Modal } from '@mui/material';
import React from 'react';
import CommentForm from '../form/CommentForm';

interface Props {
	minWidth?: string;
	maxWidth?: string;
	my?: string;
	mx?: string;
	open: boolean;
	postId?: string;
	handleClose: () => void;
	fetchPost: () => void;
}

const CommentModal: React.FC<Props> = (props) => {
	const handleSubmit = () => {
		props.fetchPost();
		props.handleClose();
	};

	return (
		<React.Fragment>
			<Modal
				open={props.open}
				onClose={props.handleClose}
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
				}}
			>
				<Grid item minWidth='360px' maxWidth='752px' width={'100%'}>
					<CommentForm disabled={false} onSubmit={handleSubmit} postId={props.postId} />
				</Grid>
			</Modal>
		</React.Fragment>
	);
};

export default CommentModal;
