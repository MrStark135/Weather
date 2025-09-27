import { MdMyLocation, MdOutlineLocationOn } from "react-icons/md";
import { RiMenuFill } from "react-icons/ri";
import { TiWeatherSunny } from "react-icons/ti";
import SearchBar from "./SearchBar";

type props = {};

export default function Navbar({}: props){
	return (
		<nav className="shadow-sn sticky top-0 left-0 z-50 bg-blue-500">
			<div className="h-16 w-full flex justify-between items-center max-w-7xl px-5 mx-auto text-3xl text-white gap-12">
				<section className="flex justify-between items-center gap-1 min-h-screen">
					<TiWeatherSunny className="text-yellow-300 text-5xl"/>
					<h2 className="font-goorm pl-2">Weather</h2>
				</section>
				<section id="navSearch" className="flex items-center gap-2">
					<MdMyLocation className="opacity-50"/>
					<MdOutlineLocationOn className="text-4xl"/>
					<SearchBar />
				</section>
				<section id="navMenu" className="flex items-center">
					<button className="border-2 border-gray-300 
					focus:bg-white focus:text-gray-500 focus:border-white 
					hover:bg-gray-400
					rounded-sm h-full p-1">
						<RiMenuFill/>
					</button>
				</section>
			</div>
		</nav>
	)
}

