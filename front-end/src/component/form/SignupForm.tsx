import { useUserContext } from '../../context/UserContext';
import { useEffect, useState } from 'react';
import { UserModel } from '../../../../back-end/src/models';
import { Button, TextField } from '@mui/material';
import { post } from '../../api/Api';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../type/AppRoute';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const SignupForm = () => {
	const User = useUserContext();
	const Navigate = useNavigate();

	const [submited, setSubmited] = useState<boolean>(false);

	type FormData = {
		name: string;
		description?: string;
		picture?: string;
	};

	const schema: ZodType<FormData> = z.object({
		name: z.string().min(2).max(20),
		description: z.string().max(255).optional(),
		picture: z.string().max(255).optional(),
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	const submit = async (data: FormData) => {
		const newUser: UserModel = {
			auth0_id: User.auth0_id,
			username: User.username,
			name: data.name,
			email: User.email,
			description: data.description !== '' ? data.description : undefined,
			picture: data.picture !== '' ? data.picture : undefined,
		};

		try {
			const response = await post<UserModel>(`/users/${User.auth0_id}`, newUser, User.token);
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
			<form onSubmit={handleSubmit(submit)}>
				<TextField
					type='text'
					label='Name'
					{...register('name')}
					required
					error={errors.name ? true : false}
					helperText={errors.name?.message}
				/>
				<br />
				<TextField
					type='text'
					label='Description'
					{...register('description')}
					error={errors.description ? true : false}
					helperText={errors.description?.message}
				/>
				<br />
				<TextField
					type='text'
					label='Picture'
					{...register('picture')}
					error={errors.picture ? true : false}
					helperText={errors.picture?.message}
				/>
				<br />
				<Button type='submit'>Submit</Button>
			</form>
		</>
	);
};

export default SignupForm;
