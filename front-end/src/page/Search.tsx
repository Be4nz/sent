import { useUserContext } from '../context/UserContext';
import { useEffect, useState } from 'react';
import { PostModel } from '../model';
import { Container, Grid, Typography, useTheme } from '@mui/material';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import UserSearchField from '../component/display/UserSearchField';

interface Props {}

const Search: React.FC<Props> = (props) => {
	return (
		<Container maxWidth='sm'>
			<div style={{ paddingTop: '125px' }}>
				<Typography className='profile-typography-name' style={{ fontWeight: 'bold', paddingBottom: '2rem' }}>
					Search users
				</Typography>
				<UserSearchField />
			</div>
		</Container>
	);
};

export default Search;
