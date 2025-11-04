import { Dispatch, SetStateAction, useState } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { TiWeatherSunny } from "react-icons/ti";
import SearchBar from "./SearchBar";

export default function Navbar({setSearchCity}: {setSearchCity: Dispatch<SetStateAction<string>>}){
	const [city, setCity] = useState<string>("");
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
	
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if ((city.length < 3) || (suggestions.length <= 0)) {
			setSuggestions(['Location not found']);
			setShowSuggestions(true);
			return;
		}
		setSearchCity(city);
	}

	async function handleInputChange(value: string) {
		setCity(value);
		if (value.length >= 3) {
			let suggestionsTemp: string[] = [];
			try {
				const res = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_API_KEY}`);
				const data = await res.json();
				suggestionsTemp = data.list.map((item: {name: string, sys: {country: string}}) => item.name + ", " + item.sys.country);
			} catch(error) {
				suggestionsTemp = [];
				suggestionsTemp.push(String(error));
			}
			setSuggestions(suggestionsTemp);
			setShowSuggestions(true);
		}
		else setShowSuggestions(false);
	}

	return (
		<nav className="shadow-sn sticky top-0 left-0 z-50 bg-blue-500">
			<div id="navbar" className="h-16 w-full flex justify-between items-center px-5 mx-auto text-3xl text-white">
				<section id="navTitle" className="flex justify-between items-center gap-1 min-h-screen">
					<TiWeatherSunny className="text-yellow-300 text-5xl"/>
					<h2 className="font-goorm pl-2">Weather</h2>
				</section>
				<section id="navSearch" className="flex w-72 items-center gap-2">
					<MdOutlineLocationOn className="text-4xl"/>
					<div className="relative w-full">
						<SearchBar
							value={city}
							onChange={(e) => {e.preventDefault();handleInputChange(e.target.value)}}
							onSubmit={(e) => {handleSubmit(e)}}
						/>
						<SuggestionBox
						{...{
							showSuggestions,
							suggestions,
							handleSuggestionClick: (value) => {
								setCity(value);
								setShowSuggestions(false);
							}
						}}
						/>
					</div>
				</section>
				{/* <section id="navMenu" className="flex items-center">
					<button className="border-2 border-gray-300 
					focus:bg-white focus:text-gray-500 focus:border-white 
					hover:bg-gray-400
					rounded-sm h-full p-1">
						<RiMenuFill/>
					</button>
				</section> */}
			</div>
		</nav>
	)
}

function SuggestionBox({
	showSuggestions,
	suggestions,
	handleSuggestionClick
}:
{
	showSuggestions: boolean,
	suggestions: string[],
	handleSuggestionClick: (item: string) => void
}) {
	return (
		<div className="bg-gray-300 w-full absolute rounded-sm opacity-95">
			{/* {(()=>{console.log(suggestions, showSuggestions);return 1})()} */}
			{(showSuggestions && suggestions.length >= 1) && (
				<ul>
					{suggestions.map((item, i) => (
						<li key={i} className="text-black p-0.5 text-2xl cursor-pointer" onClick={() => handleSuggestionClick(item) }>{item}</li>
					))}
				</ul>
			)}
		</div>
	)
}