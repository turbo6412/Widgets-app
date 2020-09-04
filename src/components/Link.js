import React from 'react';

/* 'custom' anchor tag component */
const Link = ({ href, className, children }) => {
	const onClick = event => {
		if (event.metaKey || event.ctrlKey) {
			return;
		}

		event.preventDefault(); /* disable page reload */
		window.history.pushState({}, '', href); /* updates url pathname */

		/*Navigation Event - detect/notify (components listening) when url has changed */
		const navEvent = new PopStateEvent('popstate');
		window.dispatchEvent(navEvent);
	};
	return (
		<a onClick={onClick} href={href} className={className}>
			{children}
		</a>
	);
};

export default Link;
