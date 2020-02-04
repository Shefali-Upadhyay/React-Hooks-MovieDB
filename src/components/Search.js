import React, { useState } from 'react';

const Search = ({ search }) => {
	const [searchValue, setSearchValue] = useState('');
	const [inputIsValid, setInputIsValid] = useState(true);
	const inputValueHandler = evt => {
		setSearchValue(evt.target.value);
	};
	const resetInputField = () => {
		setSearchValue('');
	};
	const searchQueryHandler = evt => {
		evt.preventDefault();
		if (!searchValue.replace(/\s/, '').length) {
			messageValidator();
			return;
		}
		search(searchValue.toString());
		resetInputField();
	};

	const messageValidator = () => {
		setInputIsValid(false);
		setTimeout(() => {
			setInputIsValid(true);
		}, 1000);
	};
	return (
		<div>
			<form onSubmit={searchQueryHandler}>
				<div className="input-group">
					<input className="form-control py-2 border-right-0 border" value={searchValue} onChange={inputValueHandler} type="text" />
					<span className="input-group-append">
						<button className="btn btn-outline-primary" type="button" onClick={searchQueryHandler}>
							<i className="fa fa-search"></i>
						</button>
					</span>
				</div>
			</form>
			{inputIsValid ? (
				''
			) : (
				<h4 className="text-center text-danger mt-2">Please type before search</h4>
			)}
		</div>
	);
};
export default Search;