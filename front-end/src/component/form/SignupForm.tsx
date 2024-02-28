import { useUserContext } from '../../context/UserContext';
import { useEffect, useState } from 'react';
import { User } from '../../../../back-end/src/models';
import { Button, TextField } from '@mui/material';
import { post } from '../../api/Api';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../type/AppRoute';

const SignupForm = () => {
	const User = useUserContext();
	const Navigate = useNavigate();

	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [picture, setPicture] = useState<string>('');

	const [submited, setSubmited] = useState<boolean>(false);

	const handleSubmit = async () => {
		const newUser: User = {
			auth0_id: User.auth0_id,
			username: User.username,
			name: name,
			email: User.email,
			description: description !== '' ? description : undefined,
			picture: picture !== '' ? picture : undefined,
		};

		try {
			const response = await post<User>('/users', newUser, User.token);
			if (response.status === 201) {
				await User.update();
				setSubmited(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (submited) Navigate(AppRoute.HOME);
	}, [submited, Navigate]);

	return (
		<>
			<TextField
				label='Name'
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setName(event.target.value);
				}}
			/>
			<br/>
			<TextField
				label='Description'
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setDescription(event.target.value);
				}}
			/>
			<br/>
			<TextField
				label='Picture'
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setPicture(event.target.value);
				}}
			/>
			<br/>
			<Button onClick={handleSubmit}>Submit</Button>
		</>
	);
};

export default SignupForm;
