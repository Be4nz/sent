import React, { useEffect } from 'react';
import ProfileEditForm from '../form/ProfileEditForm';
import { Grid, Modal } from '@mui/material';

interface Props {
	open: boolean;
	handleClose: () => void;
}

const ProfileEditModal: React.FC<Props> = (props) => {
	useEffect(() => {
		const abortController = new AbortController();

		return () => abortController.abort();
	}, []);

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
				<Grid>
					<ProfileEditForm minWidth='360px' maxWidth='400px' py='auto' onSubmit={props.handleClose} />
				</Grid>
			</Modal>
		</React.Fragment>
	);
};

export default ProfileEditModal;
