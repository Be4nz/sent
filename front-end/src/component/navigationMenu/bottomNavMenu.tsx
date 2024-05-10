import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Home, Person, Favorite, Bookmark, EditNote, Search } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../type/AppRoute';
import PostModal from '../display/PostModal';
import { useUserContext } from '../../context/UserContext';
import { useEffect } from 'react';

export default function BottomNavMenu() {
	const iconStyles = { fontSize: 30 };

	const User = useUserContext();
	const location = useLocation();
	const navigate = useNavigate();

	const [prev, setPrev] = React.useState(location.pathname);
	const [value, setValue] = React.useState(location.pathname);
	const [modalOpen, setModalOpen] = React.useState(false);

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
		setValue(prev);
	};

	const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
		setPrev(value);
		setValue(newValue);
	};

	useEffect(() => {
		setValue(location.pathname);
	}, [location.pathname]);

	return (
		<Box>
			<BottomNavigation value={value} onChange={handleChange}>
				<BottomNavigationAction
					value={AppRoute.HOME}
					icon={<Home style={iconStyles} />}
					onClick={() => navigate(AppRoute.HOME)}
				/>
				{/* <BottomNavigationAction
					value={`${AppRoute.PROFILE}/${User.username}`}
					icon={<Person style={iconStyles} />}
					onClick={() => navigate(`${AppRoute.PROFILE}/${User.username}`)}
				/> */}
				<BottomNavigationAction
					value={AppRoute.SEARCH}
					icon={<Search style={iconStyles} />}
					onClick={() => navigate(AppRoute.SEARCH)}
				/>
				<BottomNavigationAction onClick={handleModalOpen} icon={<EditNote style={{ fontSize: 40 }} />} />
				<PostModal open={modalOpen} handleClose={handleModalClose} />
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
