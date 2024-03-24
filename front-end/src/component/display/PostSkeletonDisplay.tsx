import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Avatar, Grid, IconButton, ListItem, useTheme } from '@mui/material';

const PostSkeletonDisplay: React.FC<{
	minWidth?: string;
	maxWidth?: string;
	my?: string;
	mx?: string;
}> = ({ minWidth, maxWidth, my, mx }) => {
	const Theme = useTheme();

	return (
		<ListItem divider>
			<Grid container direction='column' minWidth={minWidth} maxWidth={maxWidth} my={my} mx={mx} width={'100%'}>
				<Grid container direction='row'>
					<Grid item xs={1.5}>
						<Avatar />
					</Grid>
					<Grid item xs={10.5} />
				</Grid>
				<Grid container direction='row'>
					<Grid item xs={1.5} />
					<Grid item xs={10.5}>
						<Grid container direction='row'>
							<Grid item xs={2.5}>
								<IconButton>
									<FavoriteBorderIcon sx={{ color: Theme.palette.text.secondary }} />
								</IconButton>
							</Grid>
							<Grid item xs={2.5}>
								<IconButton>
									<ModeCommentOutlinedIcon sx={{ color: Theme.palette.text.secondary }} />
								</IconButton>
							</Grid>
							<Grid item xs={2.5}>
								<IconButton>
									<BookmarkBorderIcon sx={{ color: Theme.palette.text.secondary }} />
								</IconButton>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</ListItem>
	);
};

export default PostSkeletonDisplay;
