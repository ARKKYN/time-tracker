import React, { useEffect, useState } from 'react';

export default function SearchBox({onSearch}) {
	const [input, setInput] = useState("");

	const onChange = (e) => {
		setInput(e.target.value);
	}


	useEffect(() => {
		onSearch(input);
	},[input, onSearch]);

	return (
		<div className="mt-4 overflow-hidden">
			<input
				className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
				placeholder="Search"
				value={input}
				onChange={onChange}
			/>
		</div>
	);
}
