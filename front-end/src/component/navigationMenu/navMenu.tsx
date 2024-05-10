import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, useTheme, Typography } from '@mui/material';
import { Home, Person, Favorite, Bookmark, Search } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../type/AppRoute';
import { useUserContext } from '../../context/UserContext';
import Link from '@mui/material/Link';

const NavMenu: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const User = useUserContext();

	const Theme = useTheme();
	const activeColor = Theme.palette.text.primary;

	const linkStyles = {
		color: Theme.palette.text.secondary,
		fontSize: '0.8em !important',
		textDecoration: 'none',
		':hover': {
			textDecoration: 'underline',
		},
	};

	const renderListItemButton = (route: string, icon: React.ReactNode, text: string) => (
		<ListItemButton
			onClick={() => navigate(route)}
			style={location.pathname === route ? { color: activeColor, fontWeight: '600' } : {}}
		>
			<ListItemIcon style={location.pathname === route ? { color: activeColor, fontWeight: '600' } : {}}>
				{icon}
			</ListItemIcon>
			<ListItemText primary={text} disableTypography />
		</ListItemButton>
	);

	return (
		<Drawer variant='permanent'>
			<List style={{ marginTop: '150px' }}>
				{renderListItemButton(AppRoute.HOME, <Home />, 'Home')}
				{renderListItemButton(`${AppRoute.PROFILE}/${User.username}`, <Person />, 'Profile')}
				{renderListItemButton(AppRoute.FOLLOWING, <Favorite />, 'Following')}
				{renderListItemButton(AppRoute.SAVED, <Bookmark />, 'Saved')}
				{renderListItemButton(AppRoute.SEARCH, <Search />, 'Search')}
			</List>
			<Box sx={{ position: 'fixed', bottom: '2vh', color: Theme.palette.text.secondary }}>
				<Typography style={{ fontSize: '0.8em' }}>© {new Date().getFullYear()} sent by Sourcerers</Typography>
				<Link sx={linkStyles} href='https://github.com/Be4nz/sent'>
					Github
				</Link>
				{' | '}
				<Link sx={linkStyles} href='https://github.com/Be4nz/sent/blob/main/LICENSE'>
					License
				</Link>
			</Box>
		</Drawer>
	);
};

export default NavMenu;
