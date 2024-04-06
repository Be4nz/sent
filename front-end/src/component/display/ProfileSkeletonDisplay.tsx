import { Typography, Avatar, Button, Grid, useTheme } from '@mui/material';

interface Props {
	minWidth?: string;
	maxWidth?: string;
	my?: string;
	mx?: string;
}

const ProfileSkeletonDisplay: React.FC<Props> = (props) => {
	const Theme = useTheme();

	return (
		<Grid container direction='row' minWidth={props.minWidth} maxWidth={props.maxWidth} my={props.my} mx={props.mx}>
			<Grid item xs={3}>
				<Avatar className='profile-avatar' />
			</Grid>
			<Grid item xs={9}>
				<Grid container direction='column' rowGap={10}>
					<Grid container />
					<Grid container direction='row'>
						<Grid item xs={4}>
							<Button
								disableRipple
								sx={{
									padding: '0px',
									'&:hover': {
										backgroundColor: Theme.palette.background.default,
									},
								}}
							>
								<Grid item>
									<Typography color={Theme.palette.text.secondary}>followers</Typography>
								</Grid>
							</Button>
						</Grid>
						<Grid item xs={4}>
							{' '}
							<Button
								disableRipple
								sx={{
									padding: '0px',
									'&:hover': {
										backgroundColor: Theme.palette.background.default,
									},
								}}
							>
								<Grid item>
									<Typography color={Theme.palette.text.secondary}>following</Typography>
								</Grid>
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ProfileSkeletonDisplay;
