import { Container, Grid, LinearProgress } from '@mui/material';
import { LogoTextSvg } from '../svg/LogoTextSvg';

interface Props {
	minWidth?: string;
	maxWidth?: string;
	padding?: string;
	margin?: string;
}

const LoadingDisplay: React.FC<Props> = (props) => {
	return (
		<Grid
			container
			direction='column'
			rowSpacing={5}
			minWidth={props.minWidth || '100px'}
			maxWidth={props.maxWidth || '376px'}
			padding={props.padding || '20px'}
			mx={props.margin || 'auto'}
			my={props.margin || '20vh'}
		>
			<Grid item style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
				<div id='loading-logo-icon' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<LogoTextSvg width='70%' />
				</div>
			</Grid>
			<Grid item width='100%'>
				<LinearProgress />
			</Grid>
		</Grid>
	);
};

export default LoadingDisplay;
