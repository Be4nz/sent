import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { LogoSvg } from '../svg/LogoSvg';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useUserContext } from '../../context/UserContext';
import { Avatar, Hidden, Icon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../type/AppRoute';
import { IconButton } from '@mui/material';
import ThemeSwitchButton from '../utilities/themeSwitchButton';

export default function PageHeader() {
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
							paddingLeft: '40px',
							flexGrow: { xs: 0, lg: 1 },
						}}
					>
						<IconButton onClick={() => navigate(AppRoute.HOME)} style={{ margin: 0, backgroundColor: 'transparent' }}>
							<LogoSvg height='40px' width='40px' />
						</IconButton>
					</Box>
					<Hidden lgUp>
						<ThemeSwitchButton />
					</Hidden>
					<Hidden lgDown>
						<Box style={{ display: 'flex', alignItems: 'center', marginRight: '45px' }}>
							<Box style={{ marginRight: '1em' }}>
								<IconButton onClick={handleNewPostClick}>
									<EditNoteIcon style={{ color: '#888888', fontSize: '40px' }} />
								</IconButton>
							</Box>
							<Box>
								<IconButton>
									<Avatar src={User.picture} alt='Profile' style={{ width: '40px', height: '40px' }} />
								</IconButton>
							</Box>
						</Box>
					</Hidden>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
