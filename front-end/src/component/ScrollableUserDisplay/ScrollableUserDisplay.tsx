import { Avatar, Box, CircularProgress, Grid, IconButton, Link, Modal, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useRef } from 'react';
import { UserModel } from '../../model';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../type/AppRoute';

interface Props {
	minWidth?: string;
	maxWidth?: string;
	minHeight?: string;
	maxHeight?: string;
	my?: string;
	mx?: string;
	title?: string;
	users: UserModel[];
	open: boolean;
	isLoading: boolean;
	disabled: boolean;
	handleClose: () => void;
	handleScroll: () => void;
}

const ScrollableUserDisplay: React.FC<Props> = (props) => {
	const Theme = useTheme();
	const Navigate = useNavigate();

	const modalContentRef = useRef<HTMLDivElement>(null);

	const handleScroll = () => {
		if (!props.isLoading && !props.disabled) {
			const scrollTop = modalContentRef.current?.scrollTop || 0;
			const clientHeight = modalContentRef.current?.clientHeight || 0;
			const scrollHeight = modalContentRef.current?.scrollHeight || 0;
			if (scrollTop + clientHeight === scrollHeight) {
				props.handleScroll();
			}
		}
	};

	function handleProfileClick(username: string) {
		Navigate(`${AppRoute.PROFILE}/${username}`);
	}

	return (
		<React.Fragment>
			<Modal
				open={props.open}
				onClose={props.handleClose}
				sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			>
				<Box
					minWidth={props.minWidth}
					maxWidth={props.maxWidth}
					minHeight={props.minHeight}
					maxHeight={props.maxHeight}
					mx={props.mx}
					width={'100%'}
					height={'100%'}
				>
					<Box
						sx={{
							border: `1px solid ${Theme.palette.text.secondary}`,
							borderRadius: '30px 30px 0 0',
							padding: '4%',
							backgroundColor: Theme.palette.background.default,
						}}
					>
						<Grid container direction='row' justifyContent='center'>
							<Grid item xs={8.1}>
								<Typography className='follow-typography' textAlign='right'>
									{props.title}
								</Typography>
							</Grid>
							<Grid item xs={3.9} textAlign='right'>
								<IconButton onClick={props.handleClose}>
									<CloseIcon />
								</IconButton>
							</Grid>
						</Grid>
					</Box>
					<Box
						sx={{
							overflowY: 'scroll',
							height: '90%',
							border: `1px solid ${Theme.palette.text.secondary}`,
							borderRadius: '0 0 30px 30px',
							padding: '4%',
							backgroundColor: Theme.palette.background.default,
						}}
						onScroll={handleScroll}
						ref={modalContentRef}
					>
						<Grid container direction={'column'} rowGap={'2vh'} alignItems={'center'}>
							{props.disabled && props.users.length === 0 && (
								<Typography sx={{ textAlign: 'center' }}>No Users</Typography>
							)}
							{props.users.map((user) => (
								<Grid container direction={'row'} columnGap={'1vw'} key={user.id}>
									<Grid item>
										<Avatar
											onClick={() => handleProfileClick(user.username)}
											src={user.picture}
											sx={{
												backgroundColor: Theme.palette.background.default,
												transition: 'filter 0.3s',
												':hover': {
													filter: 'brightness(70%)',
													cursor: 'pointer',
												},
											}}
										/>
									</Grid>
									<Grid item>
										<Grid container direction={'column'}>
											<Grid item>
												<Typography>{user.name}</Typography>
											</Grid>
											<Grid item>
												<Typography fontWeight={'bold'}>
													<Link
														color='none'
														underline='hover'
														onClick={() => handleProfileClick(user.username)}
														sx={{
															':hover': {
																cursor: 'pointer',
															},
														}}
													>
														@{user.username}
													</Link>
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							))}
							{props.isLoading && <CircularProgress />}
						</Grid>
					</Box>
				</Box>
			</Modal>
		</React.Fragment>
	);
};

export default ScrollableUserDisplay;
