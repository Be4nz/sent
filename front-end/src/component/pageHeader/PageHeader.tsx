import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default function PageHeader() {
	return (
		<Box>
			<AppBar position='fixed'>
				<Toolbar>Sent</Toolbar>
			</AppBar>
		</Box>
	);
}
