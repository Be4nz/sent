import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useThemeContext } from '../../context/ThemeContext';
import { useTheme } from '@mui/material';

export default function ThemeSwitchButton() {
	const Theme = useTheme();
	const { update } = useThemeContext();

	return (
		<Box
			sx={{
				color: '#888888',
				borderRadius: 1,
			}}
		>
			<IconButton onClick={update} color='inherit'>
				{Theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
			</IconButton>
		</Box>
	);
}
