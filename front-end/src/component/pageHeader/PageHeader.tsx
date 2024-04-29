import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { LogoSvg } from '../svg/LogoSvg';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useUserContext } from '../../context/UserContext';
import { Avatar, Hidden, Icon, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../type/AppRoute';
import { IconButton } from '@mui/material';
import UserDropdownMenu from './UserDropdownMenu';
import MenuIcon from '@mui/icons-material/Menu';
import PostModal from '../display/PostModal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PageHeader() {
	// Used for opening and closing dropdown menu
	const [dropdownAnchorEl, setDropdownAnchorEl] = React.useState<null | HTMLElement>(null);
	const [modalOpen, setModalOpen] = React.useState(false);
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
	const location = useLocation();

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
	};

	const handleBacking = () => {
		navigate(AppRoute.HOME);
	};

	// Check if the current pathname is post/:id
	const shouldRenderBackButton = /^\/post\/.*/.test(location.pathname);

	return (
		<Box>
			<AppBar position='fixed'>
				<Toolbar>
					<Hidden lgUp>
						{shouldRenderBackButton ? (
							<IconButton id='basic-button' onClick={handleBacking} edge='start'>
								<ArrowBackIcon style={{ color: Theme.palette.text.secondary }} />
							</IconButton>
						) : (
							<IconButton edge='start' disabled>
								<Icon />
							</IconButton>
						)}
					</Hidden>

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
						<UserDropdownMenu anchorEl={dropdownAnchorEl} open={dropdownOpen} onClose={handleClose} />
					</Hidden>

					<Hidden lgDown>
						<Box style={{ display: 'flex', alignItems: 'center', marginRight: '1.4vw' }}>
							<Box style={{ marginRight: '1em' }}>
								<IconButton onClick={handleModalOpen}>
									<EditNoteIcon style={{ color: '#888888', fontSize: '40px' }} />
								</IconButton>
								<PostModal open={modalOpen} handleClose={handleModalClose} />
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
								<UserDropdownMenu anchorEl={dropdownAnchorEl} open={dropdownOpen} onClose={handleClose} />
							</Box>
						</Box>
					</Hidden>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
