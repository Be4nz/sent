import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, ListItem, useTheme } from '@mui/material';
import { Home, Person, Favorite, Bookmark } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../type/AppRoute';
import ThemeSwitchButton from '../utilities/themeSwitchButton';

const NavMenu: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const Theme = useTheme();
	const activeColor = Theme.palette.text.primary;

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
			<List style={{ marginTop: '100px' }}>
				{renderListItemButton(AppRoute.HOME, <Home />, 'Home')}
				{renderListItemButton(AppRoute.PROFILE, <Person />, 'Profile')}
				{renderListItemButton(AppRoute.FOLLOWING, <Favorite />, 'Following')}
				{renderListItemButton(AppRoute.SAVED, <Bookmark />, 'Saved')}
			</List>
			<Box sx={{ position: 'fixed', bottom: 30 }}>
				<ThemeSwitchButton />
			</Box>
		</Drawer>
	);
};

export default NavMenu;