import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useThemeContext } from '../../context/ThemeContext';

export default function ThemeSwitchButton() {
	const Theme = useTheme();
	const { update } = useThemeContext();

	const handleThemeSwitch = () => {
		update(); // Update the theme
		window.location.reload(); // Refresh the page because some components rely on the theme values and are not updated properly
	};

	return (
		<Box
			sx={{
				color: '#888888',
				borderRadius: 1,
			}}
		>
			<IconButton onClick={handleThemeSwitch} color='inherit'>
				{Theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
			</IconButton>
		</Box>
	);
}
