import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Home, Person, Favorite, Bookmark, EditNote } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../type/AppRoute';

export default function BottomNavMenu() {
	const iconStyles = { fontSize: 30 };

	const location = useLocation();
	const navigate = useNavigate();

	const [value, setValue] = React.useState(location.pathname);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
		setValue(newValue);
	};

	return (
		<Box>
			<BottomNavigation value={value} onChange={handleChange}>
				<BottomNavigationAction
					value={AppRoute.HOME}
					icon={<Home style={iconStyles} />}
					onClick={() => navigate(AppRoute.HOME)}
				/>
				<BottomNavigationAction
					value={AppRoute.PROFILE}
					icon={<Person style={iconStyles} />}
					onClick={() => navigate(AppRoute.PROFILE)}
				/>
				<BottomNavigationAction icon={<EditNote style={{ fontSize: 40 }} />} />
				<BottomNavigationAction
					value={AppRoute.FOLLOWING}
					icon={<Favorite style={iconStyles} />}
					onClick={() => navigate(AppRoute.FOLLOWING)}
				/>
				<BottomNavigationAction
					value={AppRoute.SAVED}
					icon={<Bookmark style={iconStyles} />}
					onClick={() => navigate(AppRoute.SAVED)}
				/>
			</BottomNavigation>
		</Box>
	);
}
