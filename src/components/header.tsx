import { useState, Dispatch, setStateAction } from "react";
import SearchBox from "./search-box.tsx";

interface Props {
	setSearchKeyword: Dispatch<setStateAction<string>>;
}

const Header = ({ setSearchKeyword }: Props) => {
	return (
	    <header className="flex p-2">
	        <SearchBox setSearchKeyword={setSearchKeyword}/>
	</header>
	);
};

export default Header;
