import { useUserContext } from '../../context/UserContext';
import { useEffect, useState } from 'react';
import { UserModelDTO } from '../../model';
import { Button, Grid, TextField, Typography, useTheme } from '@mui/material';
import { put } from '../../api/Api';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface Props {
	minWidth: string;
	maxWidth: string;
	py: string;
	onSubmit: () => void;
	onClose: () => void;
}

const ProfileEditForm: React.FC<Props> = (props) => {
	const User = useUserContext();
	const Theme = useTheme();

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
		setValue,
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	const submit = async (data: FormData) => {
		const newUser: UserModelDTO = {
			auth0_id: User.auth0_id,
			username: User.username,
			name: data.name,
			email: User.email,
			description: data.description !== '' ? data.description : '',
			picture: data.picture !== undefined ? data.picture : User.picture,
		};

		try {
			const response = await put<UserModelDTO>(`/users/${User.id}`, newUser, User.token);
			if (response.status === 200) {
				await User.update();
				props.onSubmit();
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
		setValue('name', User.name);
		setValue('description', User.description);
	}, [User.name, User.description, setValue]);

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
					sx={{
						border: `1px solid ${Theme.palette.text.secondary}`,
						borderRadius: '30px',
						padding: '4%',
						backgroundColor: Theme.palette.background.default,
					}}
				>
					<Grid item width={'300px'}>
						<Typography textAlign={'center'} my={'0.5rem'} style={{ fontSize: '1.4rem', fontWeight: 500 }}>
							Profile edit
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
					{/* <Grid width={'300px'}>
						<Typography className='signup-typography'>Came up with a new description?</Typography>
					</Grid> */}
					<Grid item width={'300px'}>
						<TextField
							fullWidth
							type='text'
							label='Description'
							{...register('description')}
							error={errors.description ? true : false}
							helperText={errors.description?.message}
							multiline
							maxRows={5}
						/>
					</Grid>
					<Grid item width={'300px'}>
						<Button
							fullWidth
							type='submit'
							sx={{
								backgroundColor: Theme.palette.primary.main,
								marginBottom: '5px',
								marginTop: '12px',
								height: '40px',
								':hover': {
									backgroundColor: Theme.palette.primary.light,
								},
								'.MuiTouchRipple-child': {
									color: Theme.palette.primary.main,
								},
							}}
						>
							<Typography color='white' className='signup-typography'>
								Save
							</Typography>
						</Button>
					</Grid>
					<Grid item width={'300px'}>
						<Button
							fullWidth
							onClick={props.onClose}
							sx={{
								border: `2px solid ${Theme.palette.text.secondary}`,
								backgroundColor: Theme.palette.text.secondary,
								height: '40px',
								marginBottom: '5px',
								':hover': {
									backgroundColor: '#b2b2b2',
									border: `2px solid #b2b2b2`,
								},
								'.MuiTouchRipple-child': {
									color: Theme.palette.secondary.main,
								},
							}}
						>
							<Typography color='white' className='signup-typography'>
								Cancel
							</Typography>
						</Button>
					</Grid>
				</Grid>
			</form>
		</>
	);
};

export default ProfileEditForm;
