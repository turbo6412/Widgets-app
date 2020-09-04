import { useState, useEffect } from 'react';

const Route = ({ path, children }) => {
	const [currentPath, setCurrentPath] = useState(window.location.pathname);

	useEffect(() => {
		const onLocationChanged = () => {
			/* rerenders Route allowing us to know the NEW current url */
			setCurrentPath(window.location.pathname);
		};
		/* listening once at inital render for a Navigation Event (url changed) */
		window.addEventListener('popstate', onLocationChanged);
		return () => {
			window.removeEventListener('popstate', onLocationChanged);
		};
	}, []);
	/* we don't have to use currentPath, window.location.pathanme works too b/c rerenders */
	return currentPath === path ? children : null;
};

export default Route;
