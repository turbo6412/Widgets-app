import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
	const [term, setTerm] = useState('programming');
	const [results, setResults] = useState([]);

	const renderedResults = results.map(result => {
		return (
			<div className="item" key={result.pageid}>
				<div className="right floated content">
					<a
						className="ui button"
						href={`http://en.wikipedia.org?curid=${result.pageid}`}
					>
						Go
					</a>
				</div>
				<div className="content">
					<div className="header">{result.title}</div>
					<span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
				</div>
			</div>
		);
	});

	useEffect(() => {
		const search = async () => {
			const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
				params: {
					action: 'query',
					list: 'search',
					format: 'json',
					origin: '*',
					srsearch: term
				}
			});
			setResults(data.query.search);
		};
		if (term && !results.length) {
			search();
		} else {
			const timeoutId = setTimeout(() => {
				if (term) {
					search();
				}
			}, 1000);

			return () => {
				clearTimeout(timeoutId);
			};
		}
	}, [term]);

	return (
		<div>
			<div className="ui form">
				<div className="field">
					<label>Enter Search Term</label>
					<input
						value={term}
						onChange={e => setTerm(e.target.value)}
						className="input"
					/>
				</div>
			</div>
			<div className="ui celled list">{renderedResults}</div>
		</div>
	);
};

export default Search;
