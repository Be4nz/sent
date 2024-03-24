import React, { createContext, useContext, useState } from 'react';
import { PostModel } from '../model';

interface PostContextProps {
	getPost: () => PostModel;
	setPost: (post: PostModel) => void;
	statusUpdate: boolean;
}

const PostContext = createContext<PostContextProps>({
	getPost: () => ({} as PostModel),
	setPost: () => {},
	statusUpdate: false,
});

export const usePostContext = () => useContext(PostContext);

interface Props {
	children?: React.ReactNode;
}

export const PostContextProvider: React.FC<Props> = ({ children }) => {
	const [post, setPost] = useState<PostModel>({} as PostModel);
	const [statusUpdate, setStatusUpdate] = useState<boolean>(false);

	const setStatusUpdateFalse = () => {
		setStatusUpdate(false);
		return post;
	};

	const setStatusUpdateTrue = (post: PostModel) => {
		setPost(post);
		setStatusUpdate(true);
	};

	const PostContextValue: PostContextProps = {
		getPost: setStatusUpdateFalse,
		setPost: setStatusUpdateTrue,
		statusUpdate,
	};

	return <PostContext.Provider value={PostContextValue}>{children}</PostContext.Provider>;
};
