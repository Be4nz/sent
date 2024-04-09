import React, { createContext, useContext, useState } from 'react';
import { CommentModel } from '../model/CommentModel';

interface CommentContextProps {
	getComment: () => CommentModel;
	setComment: (post: CommentModel) => void;
	statusUpdate: boolean;
}

const CommentContext = createContext<CommentContextProps>({
	getComment: () => ({} as CommentModel),
	setComment: () => {},
	statusUpdate: false,
});

export const useCommentContext = () => useContext(CommentContext);

interface Props {
	children?: React.ReactNode;
}

export const CommentContextProvider: React.FC<Props> = ({ children }) => {
	const [comment, setComment] = useState<CommentModel>({} as CommentModel);
	const [statusUpdate, setStatusUpdate] = useState<boolean>(false);

	const setStatusUpdateFalse = () => {
		setStatusUpdate(false);
		return comment;
	};

	const setStatusUpdateTrue = (comment: CommentModel) => {
		setComment(comment);
		setStatusUpdate(true);
	};

	const CommentContextValue: CommentContextProps = {
		getComment: setStatusUpdateFalse,
		setComment: setStatusUpdateTrue,
		statusUpdate,
	};

	return <CommentContext.Provider value={CommentContextValue}>{children}</CommentContext.Provider>;
};
