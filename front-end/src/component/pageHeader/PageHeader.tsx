import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { LogoSvg } from '../svg/LogoSvg';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useUserContext } from '../../context/UserContext';
import {
	Avatar,
	Drawer,
	Hidden,
	Icon,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../type/AppRoute';
import { IconButton } from '@mui/material';
import UserDropdownMenu from './UserDropdownMenu';
import MenuIcon from '@mui/icons-material/Menu';

export default function PageHeader() {
	// Used for opening and closing dropdown menu
	const [dropdownAnchorEl, setDropdownAnchorEl] = React.useState<null | HTMLElement>(null);
	const dropdownOpen = Boolean(dropdownAnchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setDropdownAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setDropdownAnchorEl(null);
	};
	// ------------------------------

	const Theme = useTheme();

	const User = useUserContext();
	const navigate = useNavigate();

	const handleNewPostClick = () => {
		/* TODO: Open create post module */
	};

	return (
		<Box>
			<AppBar position='fixed'>
				<Toolbar>
					<Box
						sx={{
							margin: {
								xs: 'auto',
							},
							paddingLeft: '1.4vw',
							paddingTop: '1%',
							paddingBottom: '1%',
							flexGrow: { xs: 0, lg: 1 },
						}}
					>
						<IconButton onClick={() => navigate(AppRoute.HOME)} style={{ margin: 0, backgroundColor: 'transparent' }}>
							<LogoSvg height='40px' width='40px' />
						</IconButton>
					</Box>

					<Hidden lgUp>
						<IconButton
							id='basic-button'
							aria-controls={dropdownOpen ? 'basic-menu' : undefined}
							aria-haspopup='true'
							aria-expanded={dropdownOpen ? 'true' : undefined}
							onClick={handleClick}
							edge='end'
						>
							<MenuIcon style={{ color: Theme.palette.text.secondary }} />
						</IconButton>
						<UserDropdownMenu anchorEl={dropdownAnchorEl} open={dropdownOpen} onClose={handleClose} User={User} />
					</Hidden>

					<Hidden lgDown>
						<Box style={{ display: 'flex', alignItems: 'center', marginRight: '1.4vw' }}>
							<Box style={{ marginRight: '1em' }}>
								<IconButton onClick={handleNewPostClick}>
									<EditNoteIcon style={{ color: '#888888', fontSize: '40px' }} />
								</IconButton>
							</Box>
							<Box>
								<IconButton
									id='basic-button'
									aria-controls={dropdownOpen ? 'basic-menu' : undefined}
									aria-haspopup='true'
									aria-expanded={dropdownOpen ? 'true' : undefined}
									onClick={handleClick}
								>
									<Avatar src={User.picture} alt='Profile' style={{ width: '40px', height: '40px' }} />
								</IconButton>
								<UserDropdownMenu anchorEl={dropdownAnchorEl} open={dropdownOpen} onClose={handleClose} User={User} />
							</Box>
						</Box>
					</Hidden>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
