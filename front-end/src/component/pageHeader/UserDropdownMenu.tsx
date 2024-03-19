import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../type/AppRoute';
import { useAuth0 } from '@auth0/auth0-react';
import { useThemeContext } from '../../context/ThemeContext';
import { Divider, ListItemIcon, useTheme } from '@mui/material';
import { Person, Logout } from '@mui/icons-material';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

type Props = {
	anchorEl: any;
	open: any;
	onClose: any;
	User: any;
};

const UserDropdownMenu: React.FC<Props> = ({ anchorEl, open, onClose, User }) => {
	const Theme = useTheme();
	const { update } = useThemeContext();

	const navigate = useNavigate();

	const { logout } = useAuth0();

	const onProfileClick = () => {
		navigate(AppRoute.PROFILE);
		onClose();
	};

	const onLogoutClick = () => {
		onClose();
		logout();
	};

	const onThemeClick = () => {
		update();
	};

	const elementStyle = { color: Theme.palette.text.primary, marginRight: '0.4em', width: '0.7em' };

	return (
		<Menu
			id='basic-menu'
			anchorEl={anchorEl}
			open={open}
			onClose={onClose}
			disableScrollLock={true}
			MenuListProps={{
				'aria-labelledby': 'basic-button',
			}}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
		>
			<MenuItem onClick={onProfileClick}>
				<ListItemIcon>
					<Person style={elementStyle} />
				</ListItemIcon>
				Profile
			</MenuItem>
			<MenuItem onClick={onThemeClick}>
				<ListItemIcon>
					{Theme.palette.mode === 'dark' ? (
						<LightModeIcon style={elementStyle} />
					) : (
						<DarkModeIcon style={elementStyle} />
					)}
				</ListItemIcon>
				{Theme.palette.mode === 'dark' ? 'Light mode' : 'Dark mode'}
			</MenuItem>
			<Divider style={{ borderBottom: '1px solid #888888' }} />
			<MenuItem onClick={onLogoutClick}>
				<ListItemIcon>
					<Logout style={elementStyle} />
				</ListItemIcon>
				Logout
			</MenuItem>
		</Menu>
	);
};

export default UserDropdownMenu;
