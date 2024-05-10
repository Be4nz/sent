import { Box, Container, CssBaseline, Hidden, useTheme } from '@mui/material';
import PageHeader from '../pageHeader/PageHeader';
import NavMenu from '../navigationMenu/navMenu';
import BottomNavMenu from '../navigationMenu/bottomNavMenu';

interface Props {
	children?: React.ReactNode;
}

const BaseLayout: React.FC<Props> = ({ children }) => {
	const Theme = useTheme();

	return (
		<Box minHeight='100vh' sx={{ backgroundColor: Theme.palette.background.default }}>
			<CssBaseline />
			<PageHeader />
			<Hidden lgDown>
				<NavMenu />
			</Hidden>
			<Hidden lgUp>
				<BottomNavMenu />
			</Hidden>

			<Box>
				<Container
					maxWidth={false}
					style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', padding: '0' }}
				>
					{children}
				</Container>
			</Box>
		</Box>
	);
};

export default BaseLayout;
