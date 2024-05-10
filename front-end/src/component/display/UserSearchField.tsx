import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { UserModel } from '../../model';
import { get } from '../../api/Api';
import { Avatar, Box, Grid, IconButton, Typography, useTheme, CircularProgress, LinearProgress } from '@mui/material';
import { AppRoute } from '../../type/AppRoute';
import SearchIcon from '@mui/icons-material/Search';

const UserSearchField = () => {
	const User = useUserContext();
	const Theme = useTheme();
	const Navigate = useNavigate();

	const [isJustOpened, setIsJustOpened] = useState(true);
	const [searchValue, setSearchValue] = useState('');
	const [searchResult, setSearchResult] = useState<readonly UserModel[]>([]);
	const [loading, setLoading] = useState(false);
	const previousSearchValueRef = useRef<string>('');
	const [lastSubmitTime, setLastSubmitTime] = useState(0);

	const handleSearch = async () => {
		if (searchValue === '') {
			return;
		}

		const currentTime = Date.now();
		if (currentTime - lastSubmitTime < 2000) {
			return;
		}

		setLastSubmitTime(currentTime);

		try {
			setLoading(true);
			setIsJustOpened(false);
			const response = await get<UserModel[]>(`/users/search/${searchValue}`, User.token);
			if (Array.isArray(response.data)) {
				setSearchResult(response.data);
			} else {
				setSearchResult([]);
			}
		} catch (error) {
			console.error('Error fetching search results:', error);
		} finally {
			setLoading(false);
		}
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.keyCode === 13) {
			handleSearch();
		}
	};

	function handleProfileClick(username: string) {
		Navigate(`${AppRoute.PROFILE}/${username}`);
	}

	// Auto-submit timer
	useEffect(() => {
		if (searchValue !== previousSearchValueRef.current) {
			const timer = setTimeout(() => {
				handleSearch();
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [searchValue]);

	useEffect(() => {
		previousSearchValueRef.current = searchValue;
	}, [searchValue]);

	return (
		<Box>
			<Box style={{ display: 'flex', alignItems: 'center', textAlign: 'center', marginBottom: '40px' }}>
				<TextField
					label=''
					variant='outlined'
					value={searchValue}
					onChange={onChange}
					onKeyDown={keyPress}
					placeholder='Search'
					InputLabelProps={{ shrink: false }}
					sx={{
						'& .MuiOutlinedInput-root': {
							color: Theme.palette.text.primary,
							borderRadius: '20px',
							'& .MuiOutlinedInput-notchedOutline': {
								borderColor: Theme.palette.text.secondary,
								borderWidth: '1px',
							},
							'&.Mui-focused': {
								'& .MuiOutlinedInput-notchedOutline': {
									borderColor: Theme.palette.primary.main,
									borderWidth: '2px',
								},
							},
						},
					}}
					fullWidth={true}
				/>
				<Box style={{ marginLeft: '20px', width: '30px' }}>
					<IconButton color='primary' onClick={handleSearch} style={{ fontSize: '30px' }}>
						<SearchIcon />
					</IconButton>
				</Box>
			</Box>
			{/* {loading && (
				<Box
					textAlign='center'
					height='5px'
					style={{
						marginLeft: 'auto',
						marginRight: 'auto',
						marginTop: '-15px',
						marginBottom: '10px',
						alignItems: 'center',
					}}
				>
					<LinearProgress />
				</Box>
			)} */}

			{loading && (
				<Box
					style={{
						marginLeft: 'auto',
						marginRight: 'auto',
						alignItems: 'center',
					}}
				>
					<CircularProgress />{' '}
				</Box>
			)}
			{!loading && searchResult.length === 0 && <Typography>{isJustOpened ? '' : 'No results found.'}</Typography>}
			{searchResult.map((user) => (
				<Grid
					container
					direction={'row'}
					columnGap={'2vw'}
					key={user.id}
					alignItems={'center'}
					px={'4%'}
					py={'4%'}
					borderRadius={'20px'}
					sx={{
						':hover': {
							cursor: 'pointer',
							backgroundColor: Theme.palette.action.hover,
						},
					}}
					onClick={() => handleProfileClick(user.username)}
				>
					<Grid item>
						<Avatar
							src={user.picture}
							sx={{
								backgroundColor: Theme.palette.background.default,
							}}
						/>
					</Grid>
					<Grid item>
						<Typography>{user.name}</Typography>
						<Typography fontWeight={'bold'}>@{user.username}</Typography>
					</Grid>
				</Grid>
			))}
		</Box>
	);
};

export default UserSearchField;
