import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { UserModel } from '../../model';
import { get } from '../../api/Api';
import { useUserContext } from '../../context/UserContext';

export default function SearchBar() {
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState<readonly UserModel[]>([]);
	const [search, setSearch] = React.useState('');

	const loading = open && options.length === 0;

	const User = useUserContext();

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await get<UserModel[]>(`/users/search/user`, User.token);
				if (Array.isArray(response.data)) {
					console.log(response.data);
					setOptions(response.data);
				} else {
					console.error('API response is not an array:', response.data);
					console.log(response.data);
					console.log(response);
					setOptions([]);
				}
			} catch (error) {
				console.error('Error fetching search results:', error);
			}
		};

		fetchData();
	}, [loading, search]);

	return (
		<Autocomplete
			id='asynchronous-demo'
			sx={{ width: 300 }}
			open={open}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			getOptionLabel={(option) => option.username}
			options={options}
			loading={loading}
			renderInput={(params) => (
				<TextField
					{...params}
					label='Asynchronous'
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<React.Fragment>
								{loading ? <CircularProgress color='inherit' size={20} /> : null}
								{params.InputProps.endAdornment}
							</React.Fragment>
						),
					}}
				/>
			)}
		/>
	);
}
