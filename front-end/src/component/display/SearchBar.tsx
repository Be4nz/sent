import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { UserModel } from '../../model';
import { get } from '../../api/Api';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../type/AppRoute';
import { Box, InputAdornment, Paper, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const CustomPaper = (props: any) => {
	const Theme = useTheme();
	return (
		<Paper
			elevation={0}
			{...props}
			sx={{
				backgroundColor: Theme.palette.background.default,
				border: `1px solid ${Theme.palette.text.secondary}`,
				color: Theme.palette.text.secondary,
				maxHeight: '150px',
				marginTop: '10px',
			}}
		/>
	);
};

export default function SearchBar() {
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState<readonly UserModel[]>([]);
	const [value, setValue] = React.useState(null);

	const User = useUserContext();
	const navigate = useNavigate();

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await get<UserModel[]>(`/users/searchall`, User.token);
				if (Array.isArray(response.data)) {
					setOptions(response.data);
				} else {
					setOptions([]);
				}
			} catch (error) {
				console.error('Error fetching search results:', error);
			}
		};

		fetchData();
	}, [User.token]);

	return (
		<Box style={{ display: 'flex', alignItems: 'center' }}>
			<Autocomplete
				value={value}
				autoHighlight={true}
				forcePopupIcon={false}
				id='size-small-standard'
				size='small'
				sx={{ width: 200 }}
				open={open}
				onOpen={() => {
					setOpen(true);
				}}
				onClose={() => {
					setOpen(false);
				}}
				getOptionLabel={(option) => option.username}
				options={options}
				onChange={(e, value) => {
					if (value) {
						navigate(`${AppRoute.PROFILE}/${value.username}`);
					}
				}}
				blurOnSelect={true}
				PaperComponent={CustomPaper}
				renderInput={(params) => (
					<TextField
						{...params}
						label=''
						placeholder='Search'
						InputLabelProps={{ shrink: false }}
						InputProps={{
							...params.InputProps,
							startAdornment: (
								<InputAdornment position='start'>
									<SearchIcon />
								</InputAdornment>
							),
							endAdornment: <React.Fragment>{params.InputProps.endAdornment}</React.Fragment>,
						}}
					/>
				)}
			/>
		</Box>
	);
}
