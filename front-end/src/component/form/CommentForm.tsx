import { useUserContext } from '../../context/UserContext';
import { useEffect, useState } from 'react';
import { Avatar, Button, FormControl, FormHelperText, Grid, Input, Typography, useTheme } from '@mui/material';
import { post } from '../../api/Api';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CommentModel, CommentModelDTO } from '../../model/CommentModel';
import { useCommentContext } from '../../context/CommentContext';

interface Props {
	minWidth?: string;
	maxWidth?: string;
	my?: string;
	mx?: string;
	disabled: boolean;
	postId?: string;
	onSubmit?: () => void;
}

const CommentForm: React.FC<Props> = (props) => {
	const User = useUserContext();
	const Comments = useCommentContext();
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
		if (props.postId) {
			const newComment: CommentModelDTO = {
				content: content,
				user_id: User.id,
				post_id: props.postId ? props.postId : '',
			};

			reset();

			try {
				const response = await post<CommentModelDTO>('/comments/', newComment, User.token);
				if (response.status === 201) {
					setSubmited(true);
					Comments.setComment(response.data as CommentModel);
				}
			} catch (error) {
				console.log(error);
			}
		}

		props.onSubmit && props.onSubmit();
	};

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
									placeholder={'Add a comment...'}
									onChange={(event) => setContent(event.target.value)}
									disabled={props.disabled}
								></Input>
							</Grid>
							<Grid container direction={'row'}>
								<Grid item xs={12} my={'auto'}>
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

export default CommentForm;
