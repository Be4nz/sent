import React, { useEffect, useState } from 'react';
import { UserModel } from '../../model';
import { get } from '../../api/Api';
import { useUserContext } from '../../context/UserContext';
import { AxiosError } from 'axios';
import ScrollableUserDisplay from '../ScrollableUserDisplay/ScrollableUserDisplay';

interface Props {
	follower_id: string;
	open: boolean;
	handleClose: () => void;
}

const FollowingModal: React.FC<Props> = (props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [disabled, setDisabled] = useState<boolean>(false);
	const [page, setPage] = useState<number>(1);
	const [users, setUsers] = useState<UserModel[]>([]);

	const User = useUserContext();

	const handlePageChange = () => {
		setPage((prevPage) => prevPage + 1);
	};

	useEffect(() => {
		const abortController = new AbortController();

		const fetchFollowing = async () => {
			try {
				setIsLoading(true);
				const response = await get<UserModel[]>(
					`/users/follow/profile/${page}/10/?follower_id=${props.follower_id}`,
					User.token
				);
				if (page > 1) {
					setUsers((prevUsers) => [...prevUsers, ...response.data]);
				} else {
					setUsers(response.data);
				}
			} catch (error) {
				if ((error as AxiosError).response?.status === 404) {
					setDisabled(true);
				} else {
					console.error(error);
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchFollowing();

		return () => abortController.abort();
	}, [User.token, props.follower_id, page]);

	return (
		<ScrollableUserDisplay
			open={props.open}
			handleClose={props.handleClose}
			handleScroll={handlePageChange}
			minWidth='360px'
			maxWidth='400px'
			minHeight='288px'
			maxHeight='500px'
			mx='auto'
			title='Following'
			users={users}
			isLoading={isLoading}
			disabled={disabled}
		/>
	);
};

export default FollowingModal;
