import { Grid, Modal } from '@mui/material';
import React from 'react';
import PostForm from '../form/PostForm';

interface Props {
	minWidth?: string;
	maxWidth?: string;
	my?: string;
	mx?: string;
	open: boolean;
	handleClose: () => void;
}

const PostModal: React.FC<Props> = (props) => {
	const handleSubmit = () => {
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
					<PostForm disabled={false} onSubmit={handleSubmit} />
				</Grid>
			</Modal>
		</React.Fragment>
	);
};

export default PostModal;
