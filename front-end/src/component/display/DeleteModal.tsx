import { Box, Button, Grid, Modal, Typography, useTheme } from '@mui/material';
import React from 'react';
import { get, post, del } from '../../api/Api';
import { PostModel } from '../../model';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../type/AppRoute';

interface Props {
	open: boolean;
	postData: PostModel;
	handleClose: () => void;
}

const PostModal: React.FC<Props> = (props) => {
	const User = useUserContext();
	const navigate = useNavigate();
	const Theme = useTheme();

	const handleDelete = async () => {
		try {
			let response = await del<PostModel>(`/posts/` + props.postData.id, User.token);

			if (response.status === 201 || response.status === 200) {
				navigate(-1);
			}
		} catch (error) {
			console.error(error);
		}
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
				<Box
					sx={{
						border: `1px solid ${Theme.palette.text.secondary}`,
						borderRadius: '30px',
						paddingLeft: '2%',
						paddingRight: '2%',
						paddingTop: '1%',
						paddingBottom: '1%',
						backgroundColor: Theme.palette.background.default,
						width: '30%',
					}}
				>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Typography style={{ fontSize: '1.4rem', fontWeight: 500 }} textAlign='center'>
								Delete post
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography>
								Are you sure you want to delete post{' '}
								<span style={{ color: '#FF124B', fontWeight: 'bold' }}>#{props.postData.id}</span>? This action cannot
								be undone.
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Box display='flex' justifyContent='flex-end'>
								<Button
									onClick={props.handleClose}
									type='submit'
									sx={{
										backgroundColor: Theme.palette.background.default,
										border: '1px solid ' + Theme.palette.text.primary,
										color: Theme.palette.text.primary,
										marginBottom: '5px',
										marginTop: '12px',
										height: '40px',
										width: '20%',
										marginRight: '10px',
										':hover': {
											border: '2px solid ' + Theme.palette.text.primary,
										},
										'.MuiTouchRipple-child': {
											color: Theme.palette.secondary.main,
										},
									}}
								>
									<Typography>Cancel</Typography>
								</Button>
								<Button
									onClick={handleDelete}
									type='submit'
									sx={{
										backgroundColor: '#FF124B',
										color: '#FFFFFF',
										marginBottom: '5px',
										marginTop: '12px',
										height: '40px',
										width: '20%',
										':hover': {
											backgroundColor: '#9e0e30',
										},
										'.MuiTouchRipple-child': {
											color: Theme.palette.primary.main,
										},
									}}
								>
									<Typography>Delete</Typography>
								</Button>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Modal>
		</React.Fragment>
	);
};

export default PostModal;
