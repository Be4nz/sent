import { useState, useEffect } from 'react';

export default function useAppbarHeight() {
	const [appbarHeight, setAppbarHeight] = useState(0);

	useEffect(() => {
		const appBar = document.querySelector('header.MuiAppBar-root');
		setAppbarHeight(appBar?.clientHeight || 0);

		function handleResize() {
			setAppbarHeight(appBar?.clientHeight || 0);
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return appbarHeight;
}
