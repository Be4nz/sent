import { useUserContext } from '../../context/UserContext';
import { useEffect, useState } from 'react';
import { UserModel } from '../../../../back-end/src/models';
import { Button, Grid, TextField, Typography, useTheme } from '@mui/material';
import { post } from '../../api/Api';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../type/AppRoute';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LogoTextSvg } from '../svg/LogoTextSvg';

interface Props {
	minWidth: string;
	maxWidth: string;
	py: string;
}

const SignupForm: React.FC<Props> = (props) => {
	const User = useUserContext();
	const Theme = useTheme();
	const Navigate = useNavigate();

	const [submited, setSubmited] = useState<boolean>(false);
	const [isHovered, setIsHovered] = useState<boolean>(false);

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
			picture: data.picture !== undefined ? data.picture : User.picture,
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

	const handlePicture = () => {};

	const handleHover = () => {
		setIsHovered(!isHovered);
	};

	useEffect(() => {
		if (submited) Navigate(AppRoute.HOME);
	}, [submited, Navigate]);

	return (
		<>
			<form onSubmit={handleSubmit(submit)}>
				<Grid
					container
					direction={'column'}
					rowGap={2}
					alignItems={'center'}
					minWidth={props.minWidth}
					maxWidth={props.maxWidth}
					py={props.py}
				>
					<Grid width={'300px'}>
						<LogoTextSvg width={'100%'} />
					</Grid>
					<Grid item width={'300px'}>
						<Typography textAlign={'center'} my={'0.5rem'} className='signup-typography'>
							Let's get started with your profile.
						</Typography>
					</Grid>
					<Grid item>
						<Button
							onClick={handlePicture}
							onMouseEnter={handleHover}
							onMouseLeave={handleHover}
							sx={{
								width: '144px',
								height: '144px',
								borderRadius: '100%',
								backgroundImage: `url(${User.picture})`,
								backgroundSize: 'cover',
								position: 'relative',
								overflow: 'hidden',
								backgroundBlendMode: 'overlay',
								':hover': {
									backgroundColor: 'rgba(0, 0, 0, 0.4)',
								},
								'.MuiTouchRipple-child': {
									color: Theme.palette.primary.main,
								},
							}}
						>
							{isHovered && (
								<Typography color='white' className='signup-typography'>
									Change
								</Typography>
							)}
						</Button>
						{/* <TextField
							fullWidth
							type='text'
							label='Picture'
							{...register('picture')}
							error={errors.picture ? true : false}
							helperText={errors.picture?.message}
						/> */}
					</Grid>
					<Grid item width={'300px'}>
						<TextField
							fullWidth
							type='text'
							label='Name'
							{...register('name')}
							required
							error={errors.name ? true : false}
							helperText={errors.name?.message}
						/>
					</Grid>
					<Grid width={'300px'}>
						<Typography className='signup-typography'>
							Introduce yourself to the world! Share something unique, inspiring, or simply tell us about your passions
							and interests.
						</Typography>
					</Grid>
					<Grid item width={'300px'}>
						<TextField
							fullWidth
							type='text'
							label='Description'
							{...register('description')}
							error={errors.description ? true : false}
							helperText={errors.description?.message}
						/>
					</Grid>
					<Grid item width={'300px'}>
						<Button
							fullWidth
							type='submit'
							sx={{
								backgroundColor: Theme.palette.primary.main,
								':hover': {
									backgroundColor: Theme.palette.primary.light,
								},
								'.MuiTouchRipple-child': {
									color: Theme.palette.primary.main,
								},
							}}
						>
							<Typography color='white' className='signup-typography'>
								Submit
							</Typography>
						</Button>
					</Grid>
				</Grid>
			</form>
		</>
	);
};

export default SignupForm;
