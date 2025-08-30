import { Dispatch, setStateAction, useState } from "react";
import { Search } from "lucide-react";

interface Props {
	setSearchKeyword: Dispatch<setStateAction<string>>;
}

const SearchBox = ({ setSearchKeyword }: Props) => {
	return (
		<div className="flex items-center gap-2 border-2 rounded-lg bg-whte">
			<Search size="16" />
			<input placeholder="search for property" className="outline-0" />
			<button
				type="button"
				className="bg-black text-white px-3 py-0.5 rounded-lg"
			>
				Filter
			</button>
		</div>
	);
};

export default SearchBox;
