import { Box, Button, Container, CssBaseline, Grid, useTheme } from '@mui/material';
import { useThemeContext } from '../../context/ThemeContext';
import PageHeader from '../pageHeader/PageHeader';
import HeaderHeight from '../../function/AppBarHeight';

interface Props {
	children?: React.ReactNode;
}

const BaseLayout: React.FC<Props> = ({ children }) => {
	const Theme = useTheme();
	const { update } = useThemeContext();

	return (
		<Box>
			<PageHeader />

			<Box
				style={{
					backgroundColor: Theme.palette.background.default,
				}}
			>
				<CssBaseline />

				<Container maxWidth='lg' style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
					{children}
				</Container>

				<Button
					style={{ minWidth: '100%' }}
					onClick={() => {
						update();
					}}
				>
					Change color mode
				</Button>
			</Box>
		</Box>
	);
};

export default BaseLayout;
