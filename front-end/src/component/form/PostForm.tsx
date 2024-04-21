import { useUserContext } from '../../context/UserContext';
import { useEffect, useState } from 'react';
import { PostModel, PostModelDTO } from '../../model';
import {
	Avatar,
	Button,
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	Input,
	Typography,
	useTheme,
} from '@mui/material';
import { post } from '../../api/Api';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import TagIcon from '@mui/icons-material/Tag';
import { usePostContext } from '../../context/PostContext';

interface Props {
	minWidth?: string;
	maxWidth?: string;
	my?: string;
	mx?: string;
	disabled: boolean;
	onSubmit?: () => void;
}

const PostForm: React.FC<Props> = (props) => {
	const User = useUserContext();
	const Posts = usePostContext();
	const Theme = useTheme();

	const [submited, setSubmited] = useState<boolean>(false);
	const [content, setContent] = useState<string>('');
	const [sentUnavailable, setSentUnavailable] = useState<boolean>(false);

	type FormData = {
		content: string;
	};

	const schema: ZodType<FormData> = z.object({
		content: z.string().min(1).max(255),
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	const submit = async () => {
		const newPost: PostModelDTO = {
			content: content,
			user_id: User.id,
		};

		reset();

		try {
			const response = await post<PostModelDTO>('/posts/', newPost, User.token);
			console.log(response);
			if (response.status === 201) {
				setSubmited(true);
				Posts.setPost(response.data as PostModel);
			}
		} catch (error) {
			console.log(error);
		}

		props.onSubmit && props.onSubmit();
	};

	// TODO implement picture and tag functionality
	const handlePicture = () => {};
	const handleTag = () => {};

	useEffect(() => {
		if (content.length > 255) setSentUnavailable(true);
		else setSentUnavailable(false);

		if (submited) {
			setContent('');
			setSubmited(false);
		}
	}, [content, submited]);

	return (
		<form onSubmit={handleSubmit(submit)}>
			<FormControl fullWidth error={sentUnavailable} disabled={props.disabled}>
				<Grid
					container
					direction={'row'}
					minWidth={props.minWidth}
					maxWidth={props.maxWidth}
					my={props.my}
					mx={props.mx}
					width={'100%'}
					sx={{
						border: `1px solid ${Theme.palette.text.secondary}`,
						borderRadius: '15px',
						padding: '2%',
						backgroundColor: !props.disabled ? Theme.palette.background.default : 'none',
					}}
				>
					<Grid item xs={1.5} mx={'auto'}>
						<Avatar src={User.picture} />
					</Grid>
					<Grid item xs={10.5}>
						<Grid container direction={'column'}>
							<Grid item>
								<Input
									{...register('content')}
									error={errors.content ? true : false}
									multiline
									minRows={1}
									disableUnderline
									fullWidth
									sx={{
										resize: 'vertical',
										whiteSpace: 'pre-wrap',
										overflowWrap: 'break-word',
										'& .MuiInputBase-input': {
											fontFamily: 'Poppins',
											textAlign: 'justify',
											'@media (min-width: 0px)': {
												// xs
												fontSize: '0.6rem',
											},
											'@media (min-width: 600px)': {
												// sm
												fontSize: '1rem',
											},
										},
									}}
									placeholder={'Send your message to the world...'}
									onChange={(event) => setContent(event.target.value)}
									disabled={props.disabled}
								></Input>
							</Grid>
							<Grid container direction={'row'}>
								<Grid item xs={4} my={'auto'}>
									<Grid container direction={'row'}>
										<Grid item>
											<IconButton onClick={handlePicture} disabled={props.disabled}>
												<CropOriginalIcon
													fontSize='large'
													style={{ fontSize: '1.5rem', color: Theme.palette.primary.main }}
												/>
											</IconButton>
										</Grid>
										<Grid item>
											<IconButton onClick={handleTag} disabled={props.disabled}>
												<TagIcon fontSize='large' style={{ fontSize: '1.5rem', color: Theme.palette.primary.main }} />
											</IconButton>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={8} my={'auto'}>
									<Grid container direction={'row-reverse'} columnGap={1}>
										<Grid item>
											<Button
												type='submit'
												disabled={props.disabled || sentUnavailable}
												sx={{
													backgroundColor: sentUnavailable ? Theme.palette.text.secondary : Theme.palette.primary.main,
													':hover': {
														backgroundColor: Theme.palette.primary.light,
													},
													'.MuiTouchRipple-child': {
														color: Theme.palette.primary.main,
													},
												}}
											>
												<Typography color='white'>Send</Typography>
											</Button>
										</Grid>
										<Grid item my={'auto'}>
											<FormHelperText sx={{ m: '0px' }}>
												<Typography>
													{sentUnavailable ? 'Message too long ' : ''}
													{255 - content.length}/255
												</Typography>
											</FormHelperText>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</FormControl>
		</form>
	);
};

export default PostForm;
